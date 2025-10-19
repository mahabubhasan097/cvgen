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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResumeData } from '@/types/resume';

interface IframeChatInterfaceProps {
  resume: ResumeData;
  onSuggestionApply?: (suggestion: string) => void;
}

export const IframeChatInterface: React.FC<IframeChatInterfaceProps> = (
  {
    // resume,
    // onSuggestionApply,
  }
) => {
  const [activeService, setActiveService] = useState<
    'chatgpt' | 'deepseek' | 'claude'
  >('chatgpt');

  // Pre-filled prompts for resume building
  const resumePrompts = [
    {
      title: 'Generate Bullet Points',
      prompt:
        'Generate 5 professional bullet points for a software engineer resume. Focus on quantifiable achievements and technical skills.',
    },
    {
      title: 'Write Summary',
      prompt:
        'Write a professional summary for a marketing manager with 5 years of experience. Include key skills and achievements.',
    },
    {
      title: 'ATS Keywords',
      prompt:
        'Provide ATS-optimized keywords for a data analyst position. Include technical skills, tools, and soft skills.',
    },
    {
      title: 'Industry Insights',
      prompt:
        'What are the trending skills and keywords for product manager roles in 2024? Include technical and soft skills.',
    },
  ];

  const services = {
    chatgpt: {
      name: 'ChatGPT',
      url: 'https://chat.openai.com/',
      description: "OpenAI's ChatGPT - Great for general resume content",
      color: 'bg-green-500',
      icon: '🤖',
    },
    deepseek: {
      name: 'DeepSeek',
      url: 'https://chat.deepseek.com/',
      description: 'DeepSeek Chat - Excellent for technical content',
      color: 'bg-blue-500',
      icon: '🧠',
    },
    claude: {
      name: 'Claude',
      url: 'https://claude.ai/',
      description: "Anthropic's Claude - Great for detailed analysis",
      color: 'bg-purple-500',
      icon: '🎭',
    },
  };

  const handlePromptClick = (prompt: string) => {
    // This would ideally copy to clipboard or send to the iframe
    // For now, we'll show it in an alert
    navigator.clipboard.writeText(prompt);
    alert(
      `Prompt copied to clipboard:\n\n"${prompt}"\n\nYou can paste this into the chat interface below.`
    );
  };

  const currentService = services[activeService];

  return (
    <div className='space-y-6'>
      {/* Service Selection */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <span className='text-lg'>🌐</span>
            AI Chat Services
            <Badge variant='secondary' className='ml-auto'>
              External Services
            </Badge>
          </CardTitle>
          <CardDescription>
            Use powerful AI services directly in our interface. Choose your
            preferred AI assistant below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeService}
            onValueChange={value =>
              setActiveService(value as 'chatgpt' | 'deepseek' | 'claude')
            }
          >
            <TabsList className='grid w-full grid-cols-3'>
              <TabsTrigger value='chatgpt' className='flex items-center gap-2'>
                🤖 ChatGPT
              </TabsTrigger>
              <TabsTrigger value='deepseek' className='flex items-center gap-2'>
                🧠 DeepSeek
              </TabsTrigger>
              <TabsTrigger value='claude' className='flex items-center gap-2'>
                🎭 Claude
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeService} className='space-y-4'>
              <div className='p-4 border rounded-lg'>
                <div className='flex items-center gap-3 mb-2'>
                  <span className='text-2xl'>{currentService.icon}</span>
                  <div>
                    <h3 className='font-semibold'>{currentService.name}</h3>
                    <p className='text-sm text-gray-600'>
                      {currentService.description}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Quick Prompts */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <span className='text-lg'>💡</span>
            Quick Resume Prompts
          </CardTitle>
          <CardDescription>
            Click any prompt below to copy it to your clipboard, then paste it
            into the chat interface.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
            {resumePrompts.map((prompt, index) => (
              <Button
                key={index}
                variant='outline'
                className='h-auto p-4 text-left justify-start'
                onClick={() => handlePromptClick(prompt.prompt)}
              >
                <div>
                  <div className='font-medium text-sm'>{prompt.title}</div>
                  <div className='text-xs text-gray-600 mt-1'>
                    {prompt.prompt}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Iframe Container */}
      <Card className='h-[600px] flex flex-col'>
        <CardHeader className='pb-3'>
          <CardTitle className='flex items-center gap-2'>
            <span className='text-lg'>{currentService.icon}</span>
            {currentService.name} Chat Interface
          </CardTitle>
          <CardDescription>
            Chat with {currentService.name} directly in our interface. Use the
            prompts above or ask anything about your resume.
          </CardDescription>
        </CardHeader>
        <CardContent className='flex-1 p-0'>
          <div className='h-full border rounded-lg overflow-hidden'>
            <iframe
              src={currentService.url}
              className='w-full h-full border-0'
              title={`${currentService.name} Chat Interface`}
              sandbox='allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox'
              loading='lazy'
            />
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className='border-blue-200 bg-blue-50'>
        <CardHeader>
          <CardTitle className='text-blue-800 flex items-center gap-2'>
            📋 How to Use
          </CardTitle>
        </CardHeader>
        <CardContent className='text-blue-700 space-y-2'>
          <ol className='list-decimal list-inside space-y-1 text-sm'>
            <li>
              Choose your preferred AI service above (ChatGPT, DeepSeek, or
              Claude)
            </li>
            <li>
              Click any "Quick Resume Prompt" to copy it to your clipboard
            </li>
            <li>Paste the prompt into the chat interface below</li>
            <li>Get AI-generated content for your resume</li>
            <li>Copy the results and apply them to your resume sections</li>
          </ol>
          <div className='p-3 bg-blue-100 rounded-md mt-3'>
            <p className='text-sm font-medium'>
              💡 <strong>Pro Tip:</strong> You can ask for specific resume
              content like "Write bullet points for a software engineer with
              React experience" or "Generate keywords for ATS optimization in
              marketing roles."
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
