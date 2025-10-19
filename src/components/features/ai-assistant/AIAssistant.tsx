'use client';

import React, { useState, useEffect, useCallback } from 'react';
//import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { aiService } from '@/services/aiService';
import { ResumeData } from '@/types/resume';
import { AIAssistantState, ContentSuggestion } from '@/types/aiAssistant';
import { ContentGenerator } from './ContentGenerator';
import { KeywordOptimizer } from './KeywordOptimizer';
import { ResumeScorer } from './ResumeScorer';
import { IndustryInsights } from './IndustryInsights';
import { QuickStartGuide } from './QuickStartGuide';
import { ChatInterface } from './ChatInterface';
import { IframeChatInterface } from './IframeChatInterface';

interface AIAssistantProps {
  resume: ResumeData;
  onSuggestionApply?: (suggestion: ContentSuggestion) => void;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({
  resume,
  onSuggestionApply,
  isOpen = false,
  onOpenChange,
}) => {
  const [state, setState] = useState<AIAssistantState>({
    isAnalyzing: false,
    analysis: null,
    selectedSuggestion: null,
    isGenerating: false,
    error: null,
  });

  const [activeTab, setActiveTab] = useState('content');
  const [aiProviderStatus, setAiProviderStatus] = useState<{
    ollama: boolean;
    openai: boolean;
    builtin: boolean;
    currentProvider: 'ollama' | 'openai' | 'builtin';
  }>({
    ollama: false,
    openai: false,
    builtin: true,
    currentProvider: 'builtin',
  });

  // Check AI provider status when component mounts
  useEffect(() => {
    const checkProviderStatus = async () => {
      const status = await aiService.getAIProviderStatus();
      setAiProviderStatus(status);
    };

    if (isOpen) {
      checkProviderStatus();
    }
  }, [isOpen]);

  // AI services are always available (at least built-in)
  // const isAIAvailable = aiProviderStatus.ollama || aiProviderStatus.openai || aiProviderStatus.builtin;

  const handleAnalyzeResume = useCallback(async () => {
    setState(prev => ({ ...prev, isAnalyzing: true, error: null }));

    try {
      const [suggestions, keywordOptimization, resumeScore] = await Promise.all(
        [
          aiService.generateContentSuggestions(
            {
              type: 'generate_content',
              context: { section: 'resume_analysis' },
            },
            resume
          ),
          aiService.optimizeKeywords(resume),
          aiService.scoreResume(resume),
        ]
      );

      setState(prev => ({
        ...prev,
        analysis: {
          suggestions,
          keywordOptimization,
          resumeScore,
          industryInsights: {
            trendingSkills: [],
            recommendedKeywords: [],
            commonMistakes: [],
          },
        },
        isAnalyzing: false,
      }));
    } catch {
      setState(prev => ({
        ...prev,
        error: 'Failed to analyze resume. Please try again.',
        isAnalyzing: false,
      }));
    }
  }, [resume]);

  const handleSuggestionApply = (suggestion: ContentSuggestion) => {
    if (onSuggestionApply) {
      onSuggestionApply(suggestion);
    }
    setState(prev => ({ ...prev, selectedSuggestion: suggestion }));
  };

  // Auto-analyze when component mounts
  useEffect(() => {
    if (isOpen && !state.analysis) {
      handleAnalyzeResume();
    }
  }, [isOpen, state.analysis, handleAnalyzeResume]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {/* <Button variant='outline' className='gap-2'>
          <svg
            className='w-4 h-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
            />
          </svg>
          AI Assistant
        </Button> */}
      </DialogTrigger>

      <DialogContent className='max-w-4xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <div className='w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center'>
              <svg
                className='w-5 h-5 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
                />
              </svg>
            </div>
            AI Resume Assistant
          </DialogTitle>
        </DialogHeader>

        {/* AI Provider Status */}
        <Card className='border-green-200 bg-green-50'>
          <CardHeader>
            <CardTitle className='text-green-800 flex items-center gap-2'>
              🎯 Current AI Provider:{' '}
              {aiProviderStatus.currentProvider === 'ollama'
                ? 'Local Ollama (Free & Private)'
                : aiProviderStatus.currentProvider === 'openai'
                  ? 'OpenAI API (Paid)'
                  : 'Built-in AI (Free)'}
            </CardTitle>
            <CardDescription className='text-green-700'>
              {aiProviderStatus.currentProvider === 'ollama' && (
                <>
                  <strong>🖥️ Local Ollama Active!</strong> You're using your own
                  AI model running locally. This provides the best privacy,
                  unlimited usage, and no costs.
                </>
              )}
              {aiProviderStatus.currentProvider === 'openai' && (
                <>
                  <strong>☁️ OpenAI API Active!</strong> You're using OpenAI's
                  cloud AI service. This provides advanced AI capabilities with
                  pay-per-use pricing.
                </>
              )}
              {aiProviderStatus.currentProvider === 'builtin' && (
                <>
                  <strong>🛠️ Built-in AI Active!</strong> You're using our free
                  built-in AI features. These work entirely in your browser with
                  no external dependencies.
                </>
              )}
            </CardDescription>
          </CardHeader>
        </Card>

        {/* How Free AI Works Explanation */}
        {aiProviderStatus.currentProvider === 'builtin' && (
          <Card className='border-blue-200 bg-blue-50'>
            <CardHeader>
              <CardTitle className='text-blue-800 flex items-center gap-2'>
                🆓 How Our Free AI Works
              </CardTitle>
            </CardHeader>
            <CardContent className='text-blue-700 space-y-3'>
              <div>
                <h4 className='font-semibold mb-2'>🎯 What You Get:</h4>
                <ul className='list-disc list-inside space-y-1 ml-2 text-sm'>
                  <li>
                    <strong>Content Generation:</strong> Professional bullet
                    points, summaries, and descriptions
                  </li>
                  <li>
                    <strong>Keyword Optimization:</strong> ATS-friendly keyword
                    suggestions and analysis
                  </li>
                  <li>
                    <strong>Resume Scoring:</strong> Overall quality assessment
                    with improvement tips
                  </li>
                  <li>
                    <strong>Industry Insights:</strong> Trending skills and
                    common mistakes to avoid
                  </li>
                </ul>
              </div>
              <div>
                <h4 className='font-semibold mb-2'>⚡ How It Works:</h4>
                <ol className='list-decimal list-inside space-y-1 ml-2 text-sm'>
                  <li>Our AI analyzes your resume content and structure</li>
                  <li>
                    It generates suggestions based on industry best practices
                  </li>
                  <li>You review and apply suggestions you like</li>
                  <li>Changes are automatically added to your resume</li>
                </ol>
              </div>
              <div className='p-3 bg-blue-100 rounded-md'>
                <p className='text-sm font-medium'>
                  💡 <strong>Tip:</strong> The more specific your prompts, the
                  better the AI suggestions will be!
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Start Guide */}
        <QuickStartGuide />

        {state.error && (
          <Card className='border-red-200 bg-red-50'>
            <CardHeader>
              <CardTitle className='text-red-800'>Error</CardTitle>
              <CardDescription className='text-red-700'>
                {state.error}
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
          <TabsList className='grid w-full grid-cols-6'>
            <TabsTrigger value='chat'>💬 Chat</TabsTrigger>
            <TabsTrigger value='iframe'>🌐 AI Services</TabsTrigger>
            <TabsTrigger value='content'>Content</TabsTrigger>
            <TabsTrigger value='keywords'>Keywords</TabsTrigger>
            <TabsTrigger value='score'>Score</TabsTrigger>
            <TabsTrigger value='insights'>Insights</TabsTrigger>
          </TabsList>

          <TabsContent value='chat' className='space-y-4'>
            <ChatInterface
              resume={resume}
              onSuggestionApply={suggestion => {
                if (onSuggestionApply) {
                  onSuggestionApply({
                    id: Date.now().toString(),
                    type: 'bullet_point',
                    content: suggestion,
                    confidence: 0.8,
                    category: 'Chat Suggestion',
                  });
                }
              }}
            />
          </TabsContent>

          <TabsContent value='iframe' className='space-y-4'>
            <IframeChatInterface
              resume={resume}
              onSuggestionApply={suggestion => {
                if (onSuggestionApply) {
                  onSuggestionApply({
                    id: Date.now().toString(),
                    type: 'bullet_point',
                    content: suggestion,
                    confidence: 0.9,
                    category: 'AI Service Suggestion',
                  });
                }
              }}
            />
          </TabsContent>

          <TabsContent value='content' className='space-y-4'>
            <ContentGenerator
              resume={resume}
              suggestions={state.analysis?.suggestions || []}
              onSuggestionApply={handleSuggestionApply}
              isGenerating={state.isGenerating}
            />
          </TabsContent>

          <TabsContent value='keywords' className='space-y-4'>
            <KeywordOptimizer
              optimizations={state.analysis?.keywordOptimization || []}
              isAnalyzing={state.isAnalyzing}
            />
          </TabsContent>

          <TabsContent value='score' className='space-y-4'>
            <ResumeScorer
              score={state.analysis?.resumeScore || null}
              isAnalyzing={state.isAnalyzing}
              onAnalyze={handleAnalyzeResume}
            />
          </TabsContent>

          <TabsContent value='insights' className='space-y-4'>
            <IndustryInsights
              insights={state.analysis?.industryInsights || null}
              isAnalyzing={state.isAnalyzing}
            />
          </TabsContent>
        </Tabs>

        {state.isAnalyzing && (
          <div className='flex items-center justify-center py-8'>
            <div className='flex items-center gap-2'>
              <div className='w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin'></div>
              <span className='text-sm text-gray-600'>
                Analyzing your resume...
              </span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
