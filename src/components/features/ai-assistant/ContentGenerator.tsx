'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ContentSuggestion } from '@/types/aiAssistant';
import { ResumeData } from '@/types/resume';
import { aiService } from '@/services/aiService';

interface ContentGeneratorProps {
  resume: ResumeData;
  suggestions: ContentSuggestion[];
  onSuggestionApply: (suggestion: ContentSuggestion) => void;
  isGenerating: boolean;
}

export const ContentGenerator: React.FC<ContentGeneratorProps> = ({
  resume,
  suggestions,
  onSuggestionApply,
}) => {
  const [prompt, setPrompt] = useState('');
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);
  const [generatedSuggestions, setGeneratedSuggestions] = useState<
    ContentSuggestion[]
  >([]);
  const [showHelp, setShowHelp] = useState(false);

  const handleGenerateContent = async () => {
    if (!prompt.trim()) return;

    setIsGeneratingContent(true);
    try {
      const newSuggestions = await aiService.generateContentSuggestions(
        {
          type: 'generate_content',
          context: {
            section: 'custom_generation',
            industry: 'general',
          },
          text: prompt,
        },
        resume
      );

      setGeneratedSuggestions(newSuggestions);
    } catch {
      // Error handled silently for better UX
    } finally {
      setIsGeneratingContent(false);
    }
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'bullet_point':
        return '•';
      case 'description':
        return '📝';
      case 'skill':
        return '💡';
      case 'achievement':
        return '🏆';
      default:
        return '✨';
    }
  };

  const getSuggestionColor = (type: string) => {
    switch (type) {
      case 'bullet_point':
        return 'bg-blue-100 text-blue-800';
      case 'description':
        return 'bg-green-100 text-green-800';
      case 'skill':
        return 'bg-purple-100 text-purple-800';
      case 'achievement':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const allSuggestions = [...suggestions, ...generatedSuggestions];

  return (
    <div className='space-y-6'>
      {/* Help Section */}
      <Card className='border-blue-200 bg-blue-50'>
        <CardHeader className='pb-3'>
          <CardTitle className='text-lg flex items-center gap-2'>
            <span>💡</span>
            <span>How to Use Content Generator</span>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => setShowHelp(!showHelp)}
              className='ml-auto text-blue-600 hover:text-blue-700'
            >
              {showHelp ? 'Hide Help' : 'Show Help'}
            </Button>
          </CardTitle>
        </CardHeader>
        {showHelp && (
          <CardContent className='text-sm text-blue-800 space-y-3'>
            <div>
              <h4 className='font-semibold mb-2'>🎯 What This Does:</h4>
              <p>
                Generate professional content for your resume sections using
                AI-powered suggestions.
              </p>
            </div>
            <div>
              <h4 className='font-semibold mb-2'>📝 Example Prompts:</h4>
              <ul className='list-disc list-inside space-y-1 ml-2'>
                <li>
                  <strong>
                    "Write bullet points for a software engineer role"
                  </strong>
                </li>
                <li>
                  <strong>
                    "Create a professional summary for marketing manager"
                  </strong>
                </li>
                <li>
                  <strong>
                    "Generate skills section for data analyst position"
                  </strong>
                </li>
                <li>
                  <strong>
                    "Write achievement statements for project manager"
                  </strong>
                </li>
              </ul>
            </div>
            <div>
              <h4 className='font-semibold mb-2'>✅ How It Works:</h4>
              <ol className='list-decimal list-inside space-y-1 ml-2'>
                <li>Type what you want to generate in the text box below</li>
                <li>Click "Generate Content" to get AI suggestions</li>
                <li>
                  Review the suggestions and click "Apply" on ones you like
                </li>
                <li>The content will be added to your resume automatically</li>
              </ol>
            </div>
            <div className='p-3 bg-blue-100 rounded-md'>
              <p className='font-medium'>
                🆓 <strong>Free Feature:</strong> This works without any API key
                or setup!
              </p>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Custom Content Generation */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <svg
              className='w-5 h-5 text-purple-500'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 6v6m0 0v6m0-6h6m-6 0H6'
              />
            </svg>
            Generate Custom Content
          </CardTitle>
          <CardDescription>
            Describe what you want to improve or generate, and our AI will
            create professional content for your resume.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <Textarea
            placeholder="Examples:
• 'Write bullet points for a software engineer role'
• 'Create a professional summary for marketing manager'  
• 'Generate skills section for data analyst position'
• 'Write achievement statements for project manager'"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            className='min-h-[120px]'
          />
          <Button
            onClick={handleGenerateContent}
            disabled={!prompt.trim() || isGeneratingContent}
            className='w-full'
          >
            {isGeneratingContent ? (
              <>
                <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2'></div>
                🤖 Generating Content...
              </>
            ) : (
              <>
                <svg
                  className='w-4 h-4 mr-2'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M13 10V3L4 14h7v7l9-11h-7z'
                  />
                </svg>
                ✨ Generate Content
              </>
            )}
          </Button>

          {/* Status Message */}
          {isGeneratingContent && (
            <div className='p-3 bg-blue-50 border border-blue-200 rounded-md'>
              <p className='text-sm text-blue-800'>
                <span className='animate-spin inline-block mr-2'>⏳</span>
                AI is analyzing your request and generating content...
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Suggestions */}
      {allSuggestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <svg
                className='w-5 h-5 text-green-500'
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
              AI Suggestions
            </CardTitle>
            <CardDescription>
              Review the AI-generated suggestions below. Click "Apply" on any
              suggestion to add it to your resume.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              {allSuggestions.map(suggestion => (
                <div
                  key={suggestion.id}
                  className='p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200'
                >
                  <div className='flex items-start justify-between'>
                    <div className='flex-1'>
                      <div className='flex items-center gap-2 mb-2'>
                        <span className='text-lg'>
                          {getSuggestionIcon(suggestion.type)}
                        </span>
                        <Badge className={getSuggestionColor(suggestion.type)}>
                          {suggestion.type.replace('_', ' ')}
                        </Badge>
                        <Badge variant='outline' className='text-xs'>
                          {Math.round(suggestion.confidence * 100)}% confidence
                        </Badge>
                      </div>
                      <p className='text-sm text-gray-700 mb-2 leading-relaxed'>
                        {suggestion.content}
                      </p>
                      {suggestion.originalText && (
                        <div className='text-xs text-gray-500 bg-gray-50 p-2 rounded border-l-2 border-gray-300'>
                          <span className='font-medium'>Original:</span>{' '}
                          {suggestion.originalText}
                        </div>
                      )}
                    </div>
                    <Button
                      size='sm'
                      className='ml-4 bg-green-600 hover:bg-green-700'
                      onClick={() => onSuggestionApply(suggestion)}
                    >
                      ✅ Apply
                    </Button>
                  </div>
                  <div className='mt-2 text-xs text-gray-500'>
                    💡 Click "Apply" to add this content to your resume
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Generate content for specific sections of your resume.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-2 gap-3'>
            <Button
              variant='outline'
              onClick={() =>
                setPrompt(
                  'Write a professional summary for a software engineer'
                )
              }
              className='h-auto p-4 text-left'
            >
              <div>
                <div className='font-medium'>Professional Summary</div>
                <div className='text-xs text-gray-500'>
                  Generate a compelling summary
                </div>
              </div>
            </Button>
            <Button
              variant='outline'
              onClick={() =>
                setPrompt(
                  'Write achievement-focused bullet points for work experience'
                )
              }
              className='h-auto p-4 text-left'
            >
              <div>
                <div className='font-medium'>Work Experience</div>
                <div className='text-xs text-gray-500'>
                  Create impactful bullet points
                </div>
              </div>
            </Button>
            <Button
              variant='outline'
              onClick={() =>
                setPrompt('List relevant technical skills and certifications')
              }
              className='h-auto p-4 text-left'
            >
              <div>
                <div className='font-medium'>Skills Section</div>
                <div className='text-xs text-gray-500'>
                  Add technical skills
                </div>
              </div>
            </Button>
            <Button
              variant='outline'
              onClick={() =>
                setPrompt(
                  'Write project descriptions with quantifiable results'
                )
              }
              className='h-auto p-4 text-left'
            >
              <div>
                <div className='font-medium'>Projects</div>
                <div className='text-xs text-gray-500'>
                  Describe key projects
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
