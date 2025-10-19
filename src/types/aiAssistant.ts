export interface ContentSuggestion {
  id: string;
  type: 'bullet_point' | 'description' | 'skill' | 'achievement';
  content: string;
  confidence: number;
  category: string;
  originalText?: string;
  improvedText?: string;
}

export interface KeywordOptimization {
  keyword: string;
  currentCount: number;
  recommendedCount: number;
  status: 'missing' | 'low' | 'optimal' | 'excessive';
  suggestions: string[];
}

export interface ResumeScore {
  overall: number;
  sections: {
    contact: number;
    summary: number;
    experience: number;
    education: number;
    skills: number;
  };
  atsCompatibility: number;
  keywordDensity: number;
  readability: number;
  suggestions: string[];
}

export interface AIAnalysis {
  suggestions: ContentSuggestion[];
  keywordOptimization: KeywordOptimization[];
  resumeScore: ResumeScore;
  industryInsights: {
    trendingSkills: string[];
    recommendedKeywords: string[];
    commonMistakes: string[];
  };
}

export interface AIAssistantState {
  isAnalyzing: boolean;
  analysis: AIAnalysis | null;
  selectedSuggestion: ContentSuggestion | null;
  isGenerating: boolean;
  error: string | null;
}

export interface AIPrompt {
  type: 'improve_text' | 'generate_content' | 'optimize_keywords' | 'score_resume';
  context: {
    section: string;
    industry?: string;
    jobTitle?: string;
    experience?: string;
  };
  text?: string;
  requirements?: string[];
}
