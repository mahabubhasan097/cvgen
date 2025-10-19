import {
  ContentSuggestion,
  KeywordOptimization,
  ResumeScore,
  AIPrompt,
} from '@/types/aiAssistant';
import { ResumeData } from '@/types/resume';

export class AIService {
  private apiKey: string | null = null;
  private baseUrl = 'https://api.openai.com/v1';
  private ollamaUrl = 'http://localhost:11434';
  private currentOllamaModel = 'mistral:7b';

  constructor() {
    // Check for API key in localStorage first, then environment variables
    if (typeof window !== 'undefined') {
      this.apiKey =
        localStorage.getItem('openai_api_key') ||
        process.env.NEXT_PUBLIC_OPENAI_API_KEY ||
        null;
    } else {
      this.apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || null;
    }
  }

  /**
   * Set API key for AI service
   */
  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Check if AI service is available
   */
  isAvailable(): boolean {
    return this.apiKey !== null;
  }

  /**
   * Check if Ollama is available locally
   */
  async isOllamaAvailable(): Promise<boolean> {
    try {
      const response = await fetch(`${this.ollamaUrl}/api/tags`, {
        method: 'GET',
        signal: AbortSignal.timeout(2000), // 2 second timeout
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * Get available Ollama models
   */
  async getOllamaModels(): Promise<string[]> {
    try {
      const response = await fetch(`${this.ollamaUrl}/api/tags`);
      const data = await response.json();
      return data.models?.map((model: { name: string }) => model.name) || [];
    } catch {
      return [];
    }
  }

  /**
   * Set current Ollama model
   */
  setOllamaModel(model: string) {
    this.currentOllamaModel = model;
  }

  /**
   * Get current AI provider status
   */
  async getAIProviderStatus(): Promise<{
    ollama: boolean;
    openai: boolean;
    builtin: boolean;
    currentProvider: 'ollama' | 'openai' | 'builtin';
  }> {
    const ollama = await this.isOllamaAvailable();
    const openai = this.isAvailable();
    const builtin = true; // Always available

    let currentProvider: 'ollama' | 'openai' | 'builtin' = 'builtin';
    if (ollama) {
      currentProvider = 'ollama';
    } else if (openai) {
      currentProvider = 'openai';
    }

    return {
      ollama,
      openai,
      builtin,
      currentProvider,
    };
  }

  /**
   * Generate content using Ollama
   */
  async generateWithOllama(
    prompt: AIPrompt,
    resume: ResumeData
  ): Promise<ContentSuggestion[]> {
    try {
      const systemPrompt = this.getSystemPrompt(prompt.type);
      const userPrompt = this.buildUserPrompt(prompt, resume);

      const response = await fetch(`${this.ollamaUrl}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: this.currentOllamaModel,
          prompt: `${systemPrompt}\n\n${userPrompt}`,
          stream: false,
          options: {
            temperature: 0.7,
            top_p: 0.9,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.status}`);
      }

      const data = await response.json();
      return this.parseContentSuggestions(data.response || '');
    } catch (error) {
      // Ollama generation failed, will fallback to OpenAI
      throw error;
    }
  }

  /**
   * Generate content suggestions using AI with hybrid fallback
   */
  async generateContentSuggestions(
    prompt: AIPrompt,
    resume: ResumeData
  ): Promise<ContentSuggestion[]> {
    // Try Ollama first (local, free, private)
    if (await this.isOllamaAvailable()) {
      try {
        return await this.generateWithOllama(prompt, resume);
      } catch {
        // Ollama failed, will try OpenAI next
      }
    }

    // Fallback to OpenAI (cloud, paid, fast)
    if (this.isAvailable()) {
      try {
        return await this.generateWithOpenAI(prompt, resume);
      } catch {
        // OpenAI failed, will use built-in next
      }
    }

    // Final fallback to built-in suggestions (always available, free)
    return this.getFallbackSuggestions(prompt);
  }

  /**
   * Generate content suggestions using OpenAI
   */
  async generateWithOpenAI(
    prompt: AIPrompt,
    resume: ResumeData
  ): Promise<ContentSuggestion[]> {
    if (!this.isAvailable()) {
      throw new Error('OpenAI API key not available');
    }

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: this.getSystemPrompt(prompt.type),
            },
            {
              role: 'user',
              content: this.buildUserPrompt(prompt, resume),
            },
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      return this.parseContentSuggestions(
        data.choices[0]?.message?.content || ''
      );
    } catch (error) {
      // OpenAI generation failed, will fallback to built-in
      throw error;
    }
  }

  /**
   * Optimize keywords for ATS compatibility
   */
  async optimizeKeywords(
    resume: ResumeData,
    jobDescription?: string
  ): Promise<KeywordOptimization[]> {
    // Client-side keyword analysis
    const keywords = this.extractKeywords(resume);
    const jobKeywords = jobDescription
      ? this.extractJobKeywords(jobDescription)
      : [];

    return keywords.map(keyword => ({
      keyword: keyword.word,
      currentCount: keyword.count,
      recommendedCount: this.getRecommendedCount(keyword.word, jobKeywords),
      status: this.getKeywordStatus(
        keyword.count,
        this.getRecommendedCount(keyword.word, jobKeywords)
      ),
      suggestions: this.getKeywordSuggestions(keyword.word, jobKeywords),
    }));
  }

  /**
   * Score resume quality
   */
  async scoreResume(resume: ResumeData): Promise<ResumeScore> {
    const sections = this.analyzeSections(resume);
    const atsScore = this.calculateATSScore(resume);
    const keywordScore = this.calculateKeywordScore(resume);
    const readabilityScore = this.calculateReadabilityScore(resume);

    return {
      overall: Math.round(
        (sections.overall + atsScore + keywordScore + readabilityScore) / 4
      ),
      sections,
      atsCompatibility: atsScore,
      keywordDensity: keywordScore,
      readability: readabilityScore,
      suggestions: this.generateScoreSuggestions(
        sections,
        atsScore,
        keywordScore,
        readabilityScore
      ),
    };
  }

  /**
   * Get industry insights
   */
  async getIndustryInsights(industry: string): Promise<{
    trendingSkills: string[];
    recommendedKeywords: string[];
    commonMistakes: string[];
  }> {
    // Client-side industry insights based on common patterns
    const insights = {
      tech: {
        trendingSkills: [
          'AI/ML',
          'Cloud Computing',
          'DevOps',
          'Cybersecurity',
          'React',
          'Python',
        ],
        recommendedKeywords: [
          'agile',
          'scrum',
          'kubernetes',
          'docker',
          'microservices',
        ],
        commonMistakes: [
          'Using outdated technologies',
          'Not quantifying achievements',
          'Generic descriptions',
        ],
      },
      healthcare: {
        trendingSkills: [
          'Telemedicine',
          'Electronic Health Records',
          'Patient Care',
          'Medical Coding',
        ],
        recommendedKeywords: [
          'patient care',
          'clinical',
          'healthcare',
          'medical',
          'treatment',
        ],
        commonMistakes: [
          'Not including certifications',
          'Vague patient outcomes',
          'Missing compliance experience',
        ],
      },
      finance: {
        trendingSkills: [
          'Fintech',
          'Risk Management',
          'Data Analysis',
          'Compliance',
          'Blockchain',
        ],
        recommendedKeywords: [
          'financial analysis',
          'risk management',
          'compliance',
          'audit',
          'budgeting',
        ],
        commonMistakes: [
          'Not showing quantifiable results',
          'Missing regulatory experience',
          'Generic financial terms',
        ],
      },
    };

    return insights[industry as keyof typeof insights] || insights.tech;
  }

  // Private helper methods
  private getSystemPrompt(type: string): string {
    const prompts = {
      improve_text:
        'You are a professional resume writer. Improve the given text to be more impactful, specific, and ATS-friendly.',
      generate_content:
        'You are a career expert. Generate professional, specific, and quantifiable content for resumes.',
      optimize_keywords:
        'You are an ATS optimization expert. Suggest keywords and phrases that improve resume visibility.',
      score_resume:
        'You are a resume reviewer. Analyze the resume and provide specific improvement suggestions.',
    };
    return prompts[type as keyof typeof prompts] || prompts.generate_content;
  }

  private buildUserPrompt(prompt: AIPrompt, resume: ResumeData): string {
    const { context, text, requirements } = prompt;

    let userPrompt = `Context: ${context.section}`;
    if (context.industry) userPrompt += `\nIndustry: ${context.industry}`;
    if (context.jobTitle) userPrompt += `\nTarget Job: ${context.jobTitle}`;
    if (text) userPrompt += `\nText to improve: "${text}"`;
    if (requirements?.length)
      userPrompt += `\nRequirements: ${requirements.join(', ')}`;

    // Add resume context for better AI suggestions
    userPrompt += `\n\nResume Context:`;
    if (resume.contact?.fullName)
      userPrompt += `\nName: ${resume.contact.fullName}`;
    if (resume.summary)
      userPrompt += `\nSummary: ${resume.summary.substring(0, 200)}...`;
    if (resume.experience?.length) {
      userPrompt += `\nExperience: ${resume.experience.length} positions`;
      const recentExp = resume.experience[0];
      if (recentExp) {
        userPrompt += `\nMost Recent: ${recentExp.position} at ${recentExp.company}`;
      }
    }
    if (resume.skills?.length) {
      const allSkills = resume.skills
        .flatMap(skill => skill.items)
        .slice(0, 10);
      userPrompt += `\nSkills: ${allSkills.join(', ')}`;
    }

    return userPrompt;
  }

  private parseContentSuggestions(content: string): ContentSuggestion[] {
    // Parse AI response into structured suggestions
    const lines = content.split('\n').filter(line => line.trim());
    return lines.map((line, index) => ({
      id: `suggestion-${Date.now()}-${index}`,
      type: 'bullet_point',
      content: line.replace(/^[-•*]\s*/, '').trim(),
      confidence: 0.8,
      category: 'AI Generated',
      originalText: '',
      improvedText: line.replace(/^[-•*]\s*/, '').trim(),
    }));
  }

  private getFallbackSuggestions(prompt: AIPrompt): ContentSuggestion[] {
    // Fallback suggestions when AI is not available
    const fallbacks = {
      improve_text: [
        'Use action verbs to start each bullet point',
        'Include specific numbers and metrics',
        'Focus on achievements rather than duties',
        'Use industry-specific keywords',
      ],
      generate_content: [
        'Led team of X members to achieve Y% improvement',
        'Implemented new process resulting in $X cost savings',
        'Managed projects worth $X with Y% success rate',
        'Collaborated with cross-functional teams to deliver X',
      ],
      optimize_keywords: [
        'Add more industry-specific terminology',
        'Include relevant technical skills',
        'Use action verbs consistently',
        'Quantify achievements with numbers',
      ],
      score_resume: [
        'Add more quantifiable achievements',
        'Improve section organization',
        'Include relevant keywords',
        'Enhance readability and formatting',
      ],
    };

    return (
      fallbacks[prompt.type as keyof typeof fallbacks] ||
      fallbacks.generate_content
    ).map((suggestion, index) => ({
      id: `fallback-${Date.now()}-${index}`,
      type: 'bullet_point',
      content: suggestion,
      confidence: 0.6,
      category: 'Fallback Suggestion',
      originalText: '',
      improvedText: suggestion,
    }));
  }

  private extractKeywords(
    resume: ResumeData
  ): { word: string; count: number }[] {
    // Simple keyword extraction from resume text
    const text = JSON.stringify(resume).toLowerCase();
    const commonKeywords = [
      'leadership',
      'management',
      'project',
      'team',
      'development',
      'analysis',
      'strategy',
      'implementation',
      'collaboration',
      'communication',
      'problem-solving',
    ];

    return commonKeywords.map(keyword => ({
      word: keyword,
      count: (text.match(new RegExp(keyword, 'g')) || []).length,
    }));
  }

  private extractJobKeywords(jobDescription: string): string[] {
    return jobDescription
      .toLowerCase()
      .split(/\W+/)
      .filter(word => word.length > 3)
      .slice(0, 20);
  }

  private getRecommendedCount(keyword: string, jobKeywords: string[]): number {
    const isJobKeyword = jobKeywords.includes(keyword.toLowerCase());
    return isJobKeyword ? 3 : 1;
  }

  private getKeywordStatus(
    current: number,
    recommended: number
  ): 'missing' | 'low' | 'optimal' | 'excessive' {
    if (current === 0) return 'missing';
    if (current < recommended) return 'low';
    if (current > recommended * 2) return 'excessive';
    return 'optimal';
  }

  private getKeywordSuggestions(
    keyword: string,
    jobKeywords: string[]
  ): string[] {
    return jobKeywords
      .filter(
        jobKeyword =>
          jobKeyword.includes(keyword) || keyword.includes(jobKeyword)
      )
      .slice(0, 3);
  }

  private analyzeSections(resume: ResumeData): {
    contact: number;
    summary: number;
    experience: number;
    education: number;
    skills: number;
    overall: number;
  } {
    // Analyze each section of the resume
    const sections = {
      contact: resume.contact ? 85 : 0,
      summary: resume.summary ? 80 : 0,
      experience: resume.experience?.length ? 75 : 0,
      education: resume.education?.length ? 70 : 0,
      skills: resume.skills?.length ? 80 : 0,
      overall: 0,
    };

    sections.overall = Math.round(
      (sections.contact +
        sections.summary +
        sections.experience +
        sections.education +
        sections.skills) /
        5
    );

    return sections;
  }

  private calculateATSScore(resume: ResumeData): number {
    let score = 0;

    // Check for ATS-friendly elements
    if (resume.contact?.email) score += 20;
    if (resume.contact?.phone) score += 20;
    if (resume.summary) score += 20;
    if (resume.experience?.length) score += 20;
    if (resume.education?.length) score += 20;

    return score;
  }

  private calculateKeywordScore(resume: ResumeData): number {
    const keywords = this.extractKeywords(resume);
    const totalKeywords = keywords.reduce((sum, kw) => sum + kw.count, 0);
    return Math.min(totalKeywords * 5, 100);
  }

  private calculateReadabilityScore(resume: ResumeData): number {
    // Simple readability calculation
    const text = JSON.stringify(resume);
    const words = text.split(/\s+/).length;
    const sentences = text.split(/[.!?]+/).length;
    const avgWordsPerSentence = words / sentences;

    // Score based on average words per sentence (optimal: 15-20)
    if (avgWordsPerSentence >= 15 && avgWordsPerSentence <= 20) return 100;
    if (avgWordsPerSentence >= 10 && avgWordsPerSentence <= 25) return 80;
    return 60;
  }

  private generateScoreSuggestions(
    sections: {
      contact: number;
      summary: number;
      experience: number;
      education: number;
      skills: number;
      overall: number;
    },
    ats: number,
    keywords: number,
    readability: number
  ): string[] {
    const suggestions = [];

    if (sections.contact < 80)
      suggestions.push('Improve contact information section');
    if (sections.summary < 80)
      suggestions.push('Add or enhance professional summary');
    if (sections.experience < 80)
      suggestions.push('Add more detailed work experience');
    if (ats < 80) suggestions.push('Improve ATS compatibility');
    if (keywords < 60) suggestions.push('Add more relevant keywords');
    if (readability < 70)
      suggestions.push('Improve readability and formatting');

    return suggestions;
  }
}

// Export singleton instance
export const aiService = new AIService();
