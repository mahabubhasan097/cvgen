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
import { Button } from '@/components/ui/button';

interface IndustryInsightsProps {
  insights: {
    trendingSkills: string[];
    recommendedKeywords: string[];
    commonMistakes: string[];
  } | null;
  isAnalyzing: boolean;
}

export const IndustryInsights: React.FC<IndustryInsightsProps> = ({
  insights,
  isAnalyzing,
}) => {
  if (isAnalyzing) {
    return (
      <Card>
        <CardContent className='flex items-center justify-center py-8'>
          <div className='flex items-center gap-2'>
            <div className='w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin'></div>
            <span className='text-sm text-gray-600'>
              Gathering industry insights...
            </span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!insights) {
    return (
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
                d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
              />
            </svg>
            Industry Insights
          </CardTitle>
          <CardDescription>
            Get industry-specific insights and recommendations for your resume.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='text-center py-8'>
            <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg
                className='w-8 h-8 text-blue-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
            <h3 className='text-lg font-semibold text-gray-900 mb-2'>
              No Insights Available
            </h3>
            <p className='text-gray-600 mb-4'>
              Industry insights will be generated when you analyze your resume.
            </p>
            <Button variant='outline'>Analyze Resume to Get Insights</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Trending Skills */}
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
                d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
              />
            </svg>
            Trending Skills
          </CardTitle>
          <CardDescription>
            Popular skills in your industry that can boost your resume
            visibility.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-wrap gap-2'>
            {insights.trendingSkills.map((skill, index) => (
              <Badge
                key={index}
                className='bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer'
              >
                <svg
                  className='w-3 h-3 mr-1'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M5 13l4 4L19 7'
                  />
                </svg>
                {skill}
              </Badge>
            ))}
          </div>
          <p className='text-sm text-gray-600 mt-3'>
            Consider adding these trending skills to your resume if they match
            your experience.
          </p>
        </CardContent>
      </Card>

      {/* Recommended Keywords */}
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
                d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z'
              />
            </svg>
            Recommended Keywords
          </CardTitle>
          <CardDescription>
            Industry-specific keywords that improve ATS compatibility and search
            visibility.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-wrap gap-2'>
            {insights.recommendedKeywords.map((keyword, index) => (
              <Badge
                key={index}
                variant='outline'
                className='hover:bg-blue-50 cursor-pointer'
              >
                <svg
                  className='w-3 h-3 mr-1'
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
                {keyword}
              </Badge>
            ))}
          </div>
          <p className='text-sm text-gray-600 mt-3'>
            Incorporate these keywords naturally into your job descriptions and
            skills section.
          </p>
        </CardContent>
      </Card>

      {/* Common Mistakes */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <svg
              className='w-5 h-5 text-red-500'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
              />
            </svg>
            Common Mistakes to Avoid
          </CardTitle>
          <CardDescription>
            Industry-specific mistakes that can hurt your resume's
            effectiveness.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-3'>
            {insights.commonMistakes.map((mistake, index) => (
              <div
                key={index}
                className='flex items-start gap-3 p-3 bg-red-50 rounded-lg'
              >
                <div className='w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0'>
                  !
                </div>
                <p className='text-sm text-red-800'>{mistake}</p>
              </div>
            ))}
          </div>
          <p className='text-sm text-gray-600 mt-3'>
            Review your resume to ensure you're avoiding these common pitfalls.
          </p>
        </CardContent>
      </Card>

      {/* Industry Tips */}
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
                d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
              />
            </svg>
            Pro Tips
          </CardTitle>
          <CardDescription>
            Expert recommendations for optimizing your resume in this industry.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-3'>
            <div className='p-3 bg-blue-50 rounded-lg'>
              <h4 className='font-medium text-blue-900 mb-1'>
                Quantify Your Achievements
              </h4>
              <p className='text-sm text-blue-700'>
                Use specific numbers, percentages, and metrics to demonstrate
                your impact and results.
              </p>
            </div>
            <div className='p-3 bg-green-50 rounded-lg'>
              <h4 className='font-medium text-green-900 mb-1'>
                Use Industry Terminology
              </h4>
              <p className='text-sm text-green-700'>
                Incorporate relevant industry terms and jargon that recruiters
                and ATS systems recognize.
              </p>
            </div>
            <div className='p-3 bg-purple-50 rounded-lg'>
              <h4 className='font-medium text-purple-900 mb-1'>
                Highlight Relevant Experience
              </h4>
              <p className='text-sm text-purple-700'>
                Emphasize experiences and skills that are most relevant to your
                target industry and role.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
