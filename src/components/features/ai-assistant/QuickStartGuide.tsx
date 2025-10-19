'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const QuickStartGuide: React.FC = () => {
  const [showGuide, setShowGuide] = useState(false);

  const examplePrompts = [
    {
      title: 'Content Generation',
      description: 'Generate professional content for your resume sections',
      examples: [
        '"Write bullet points for a software engineer role"',
        '"Create a professional summary for marketing manager"',
        '"Generate skills section for data analyst position"',
      ],
    },
    {
      title: 'Keyword Optimization',
      description: 'Get ATS-friendly keyword suggestions',
      examples: [
        '"Optimize keywords for software engineering role"',
        '"Add industry-specific terms for marketing position"',
        '"Include technical skills for data analyst role"',
      ],
    },
    {
      title: 'Resume Scoring',
      description: 'Get quality assessment and improvement tips',
      examples: [
        '"Score my resume for software engineer position"',
        '"Analyze resume quality and provide feedback"',
        '"Check ATS compatibility for marketing role"',
      ],
    },
  ];

  return (
    <Card className='border-blue-200 bg-blue-50'>
      <CardHeader className='pb-3'>
        <CardTitle className='text-blue-800 flex items-center gap-2'>
          🚀 Quick Start Guide
          <Button
            variant='ghost'
            size='sm'
            onClick={() => setShowGuide(!showGuide)}
            className='ml-auto text-blue-600 hover:text-blue-700'
          >
            {showGuide ? 'Hide Guide' : 'Show Guide'}
          </Button>
        </CardTitle>
      </CardHeader>
      {showGuide && (
        <CardContent className='text-blue-700 space-y-4'>
          <div>
            <h4 className='font-semibold mb-2'>🎯 How to Get Started:</h4>
            <ol className='list-decimal list-inside space-y-1 ml-2 text-sm'>
              <li>
                Choose a tab above (Content, Keywords, Score, or Insights)
              </li>
              <li>Type what you want to improve or generate</li>
              <li>Click the action button to get AI suggestions</li>
              <li>Review suggestions and click "Apply" on ones you like</li>
              <li>Changes are automatically added to your resume!</li>
            </ol>
          </div>

          <div>
            <h4 className='font-semibold mb-2'>💡 Example Prompts to Try:</h4>
            {examplePrompts.map((section, index) => (
              <div key={index} className='mb-3'>
                <h5 className='font-medium text-sm mb-1'>{section.title}</h5>
                <p className='text-xs text-blue-600 mb-1'>
                  {section.description}
                </p>
                <ul className='list-disc list-inside space-y-0.5 ml-3 text-xs'>
                  {section.examples.map((example, idx) => (
                    <li
                      key={idx}
                      className='font-mono bg-blue-100 px-1 rounded'
                    >
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className='p-3 bg-blue-100 rounded-md'>
            <p className='text-sm font-medium'>
              🆓 <strong>Free Feature:</strong> All AI suggestions work without
              any setup or API keys!
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
