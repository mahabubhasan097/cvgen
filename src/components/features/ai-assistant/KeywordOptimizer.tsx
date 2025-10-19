'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { KeywordOptimization } from '@/types/aiAssistant';

interface KeywordOptimizerProps {
  optimizations: KeywordOptimization[];
  isAnalyzing: boolean;
}

export const KeywordOptimizer: React.FC<KeywordOptimizerProps> = ({
  optimizations,
  isAnalyzing,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'missing':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'low':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'optimal':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'excessive':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'missing':
        return '❌';
      case 'low':
        return '⚠️';
      case 'optimal':
        return '✅';
      case 'excessive':
        return '🔍';
      default:
        return '📝';
    }
  };

  const getOptimizationScore = () => {
    if (optimizations.length === 0) return 0;
    const optimalCount = optimizations.filter(
      opt => opt.status === 'optimal'
    ).length;
    return Math.round((optimalCount / optimizations.length) * 100);
  };

  const optimizationScore = getOptimizationScore();

  if (isAnalyzing) {
    return (
      <Card>
        <CardContent className='flex items-center justify-center py-8'>
          <div className='flex items-center gap-2'>
            <div className='w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin'></div>
            <span className='text-sm text-gray-600'>Analyzing keywords...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Keyword Score Overview */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <svg
              className='w-5 h-5 text-blue-500'
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
            Keyword Optimization Score
          </CardTitle>
          <CardDescription>
            How well your resume uses relevant keywords for ATS systems.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <span className='text-2xl font-bold text-blue-600'>
                {optimizationScore}%
              </span>
              <Badge
                className={
                  optimizationScore >= 80
                    ? 'bg-green-100 text-green-800'
                    : optimizationScore >= 60
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                }
              >
                {optimizationScore >= 80
                  ? 'Excellent'
                  : optimizationScore >= 60
                    ? 'Good'
                    : 'Needs Improvement'}
              </Badge>
            </div>
            <Progress value={optimizationScore} className='h-2' />
            <p className='text-sm text-gray-600'>
              {optimizations.filter(opt => opt.status === 'optimal').length} of{' '}
              {optimizations.length} keywords are optimally used.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Keyword Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Keyword Analysis</CardTitle>
          <CardDescription>
            Detailed analysis of keyword usage in your resume.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {optimizations.map((optimization, index) => (
              <div key={index} className='p-4 border rounded-lg'>
                <div className='flex items-center justify-between mb-3'>
                  <div className='flex items-center gap-2'>
                    <span className='font-medium text-lg'>
                      {optimization.keyword}
                    </span>
                    <Badge className={getStatusColor(optimization.status)}>
                      {getStatusIcon(optimization.status)} {optimization.status}
                    </Badge>
                  </div>
                  <div className='text-sm text-gray-600'>
                    {optimization.currentCount} /{' '}
                    {optimization.recommendedCount} recommended
                  </div>
                </div>

                <div className='space-y-2'>
                  <div className='flex items-center gap-2 text-sm'>
                    <span className='font-medium'>Current usage:</span>
                    <span className='text-gray-600'>
                      {optimization.currentCount} times
                    </span>
                  </div>
                  <div className='flex items-center gap-2 text-sm'>
                    <span className='font-medium'>Recommended:</span>
                    <span className='text-gray-600'>
                      {optimization.recommendedCount} times
                    </span>
                  </div>

                  {optimization.suggestions.length > 0 && (
                    <div className='mt-3'>
                      <span className='text-sm font-medium text-gray-700'>
                        Related keywords:
                      </span>
                      <div className='flex flex-wrap gap-1 mt-1'>
                        {optimization.suggestions.map((suggestion, idx) => (
                          <Badge
                            key={idx}
                            variant='outline'
                            className='text-xs'
                          >
                            {suggestion}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Optimization Tips */}
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
            Optimization Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-3'>
            <div className='p-3 bg-blue-50 rounded-lg'>
              <h4 className='font-medium text-blue-900 mb-1'>
                Add Missing Keywords
              </h4>
              <p className='text-sm text-blue-700'>
                Include keywords that are missing from your resume. Use them
                naturally in your job descriptions and skills section.
              </p>
            </div>
            <div className='p-3 bg-green-50 rounded-lg'>
              <h4 className='font-medium text-green-900 mb-1'>
                Optimize Low-Usage Keywords
              </h4>
              <p className='text-sm text-green-700'>
                Increase the frequency of underused keywords by incorporating
                them into multiple sections of your resume.
              </p>
            </div>
            <div className='p-3 bg-yellow-50 rounded-lg'>
              <h4 className='font-medium text-yellow-900 mb-1'>
                Reduce Excessive Keywords
              </h4>
              <p className='text-sm text-yellow-700'>
                Avoid keyword stuffing. Use keywords naturally and focus on
                quality over quantity.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
