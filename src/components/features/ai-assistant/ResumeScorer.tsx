'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ResumeScore } from '@/types/aiAssistant';

interface ResumeScorerProps {
  score: ResumeScore | null;
  isAnalyzing: boolean;
  onAnalyze: () => void;
}

export const ResumeScorer: React.FC<ResumeScorerProps> = ({
  score,
  isAnalyzing,
  onAnalyze,
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80)
      return { text: 'Excellent', className: 'bg-green-100 text-green-800' };
    if (score >= 60)
      return { text: 'Good', className: 'bg-yellow-100 text-yellow-800' };
    return { text: 'Needs Improvement', className: 'bg-red-100 text-red-800' };
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return '🏆';
    if (score >= 60) return '👍';
    return '📈';
  };

  return (
    <div className='space-y-6'>
      {/* Help Section */}
      <Card className='border-green-200 bg-green-50'>
        <CardHeader>
          <CardTitle className='text-green-800 flex items-center gap-2'>
            📊 Resume Scoring Explained
          </CardTitle>
        </CardHeader>
        <CardContent className='text-green-700 space-y-2'>
          <p className='text-sm'>
            <strong>
              Our AI analyzes your resume across multiple dimensions:
            </strong>
          </p>
          <ul className='list-disc list-inside space-y-1 ml-2 text-sm'>
            <li>
              <strong>ATS Compatibility:</strong> How well your resume passes
              through Applicant Tracking Systems
            </li>
            <li>
              <strong>Keyword Density:</strong> Whether you have the right
              keywords for your industry
            </li>
            <li>
              <strong>Readability:</strong> How easy it is for recruiters to
              understand your content
            </li>
            <li>
              <strong>Section Quality:</strong> Individual assessment of each
              resume section
            </li>
          </ul>
          <p className='text-sm'>
            💡{' '}
            <strong>
              Click "Analyze Resume" below to get your personalized score and
              improvement suggestions!
            </strong>
          </p>
        </CardContent>
      </Card>

      {isAnalyzing && (
        <Card>
          <CardContent className='flex items-center justify-center py-8'>
            <div className='flex items-center gap-2'>
              <div className='w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin'></div>
              <span className='text-sm text-gray-600'>
                🔍 Analyzing resume quality...
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {!score && (
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
                  d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                />
              </svg>
              Resume Quality Score
            </CardTitle>
            <CardDescription>
              Get an AI-powered analysis of your resume quality and receive
              specific improvement suggestions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={onAnalyze} className='w-full'>
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
                  d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                />
              </svg>
              Analyze Resume Quality
            </Button>
          </CardContent>
        </Card>
      )}

      {score &&
        (() => {
          const overallBadge = getScoreBadge(score.overall);
          return (
            <>
              {/* Overall Score */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <span className='text-2xl'>
                      {getScoreIcon(score.overall)}
                    </span>
                    Overall Resume Score
                  </CardTitle>
                  <CardDescription>
                    Comprehensive analysis of your resume quality across
                    multiple dimensions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    <div className='flex items-center justify-between'>
                      <span
                        className={`text-4xl font-bold ${getScoreColor(score.overall)}`}
                      >
                        {score.overall}%
                      </span>
                      <Badge className={overallBadge.className}>
                        {overallBadge.text}
                      </Badge>
                    </div>
                    <Progress value={score.overall} className='h-3' />
                    <p className='text-sm text-gray-600'>
                      Your resume scores {score.overall}% overall, which is{' '}
                      {overallBadge.text.toLowerCase()}.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Section Scores */}
              <Card>
                <CardHeader>
                  <CardTitle>Section Analysis</CardTitle>
                  <CardDescription>
                    Detailed scores for each section of your resume.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    {Object.entries(score.sections).map(
                      ([section, sectionScore]) => (
                        <div
                          key={section}
                          className='flex items-center justify-between p-3 border rounded-lg'
                        >
                          <div className='flex items-center gap-3'>
                            <span className='font-medium capitalize'>
                              {section}
                            </span>
                            <Badge
                              className={getScoreBadge(sectionScore).className}
                            >
                              {sectionScore}%
                            </Badge>
                          </div>
                          <Progress value={sectionScore} className='w-24 h-2' />
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Metrics */}
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <Card>
                  <CardHeader className='pb-3'>
                    <CardTitle className='text-lg flex items-center gap-2'>
                      <svg
                        className='w-4 h-4 text-blue-500'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                        />
                      </svg>
                      ATS Compatibility
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold text-blue-600'>
                      {score.atsCompatibility}%
                    </div>
                    <Progress
                      value={score.atsCompatibility}
                      className='h-2 mt-2'
                    />
                    <p className='text-xs text-gray-600 mt-1'>
                      How well your resume passes through ATS systems
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className='pb-3'>
                    <CardTitle className='text-lg flex items-center gap-2'>
                      <svg
                        className='w-4 h-4 text-green-500'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z'
                        />
                      </svg>
                      Keyword Density
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold text-green-600'>
                      {score.keywordDensity}%
                    </div>
                    <Progress
                      value={score.keywordDensity}
                      className='h-2 mt-2'
                    />
                    <p className='text-xs text-gray-600 mt-1'>
                      How well you use relevant keywords
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className='pb-3'>
                    <CardTitle className='text-lg flex items-center gap-2'>
                      <svg
                        className='w-4 h-4 text-purple-500'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
                        />
                      </svg>
                      Readability
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold text-purple-600'>
                      {score.readability}%
                    </div>
                    <Progress value={score.readability} className='h-2 mt-2' />
                    <p className='text-xs text-gray-600 mt-1'>
                      How easy your resume is to read
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Improvement Suggestions */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <svg
                      className='w-5 h-5 text-yellow-500'
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
                    Improvement Suggestions
                  </CardTitle>
                  <CardDescription>
                    Specific recommendations to improve your resume score.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='space-y-3'>
                    {score.suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className='flex items-start gap-3 p-3 bg-yellow-50 rounded-lg'
                      >
                        <div className='w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0'>
                          {index + 1}
                        </div>
                        <p className='text-sm text-yellow-800'>{suggestion}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Re-analyze Button */}
              <Card>
                <CardContent className='pt-6'>
                  <Button
                    onClick={onAnalyze}
                    variant='outline'
                    className='w-full'
                  >
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
                        d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                      />
                    </svg>
                    Re-analyze Resume
                  </Button>
                </CardContent>
              </Card>
            </>
          );
        })()}
    </div>
  );
};
