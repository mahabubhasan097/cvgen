'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ResumeData } from '@/types/resume';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  resume: ResumeData;
  onSuggestionApply?: (suggestion: string) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = (
  {
    // resume,
    // onSuggestionApply,
  }
) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content:
        "Hi! I'm your free AI resume assistant. I can help you:\n\n• Generate professional bullet points\n• Optimize keywords for ATS systems\n• Improve resume content\n• Provide industry-specific advice\n\nWhat would you like help with?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Free built-in AI responses - no API costs!
  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Content generation responses
    if (
      lowerMessage.includes('bullet point') ||
      lowerMessage.includes('bullet')
    ) {
      return `Here are some professional bullet points for your resume:

**For Software Engineer:**
• Developed and maintained web applications using React and Node.js, serving 10,000+ daily active users
• Led a team of 3 developers to deliver a new feature that increased user engagement by 25%
• Implemented automated testing that reduced bug reports by 40% and improved code quality

**For Marketing Manager:**
• Managed digital marketing campaigns with $500K budget, achieving 15% ROI improvement
• Led cross-functional teams to launch 5 successful product campaigns, generating $2M in revenue
• Optimized SEO strategies resulting in 300% increase in organic website traffic

Would you like me to customize these for your specific role?`;
    }

    if (
      lowerMessage.includes('summary') ||
      lowerMessage.includes('objective')
    ) {
      return `Here's a professional summary template:

**Software Engineer Summary:**
"Results-driven Software Engineer with 5+ years of experience developing scalable web applications. Expertise in React, Node.js, and cloud technologies. Proven track record of leading development teams and delivering high-impact features that improve user experience and drive business growth."

**Marketing Manager Summary:**
"Strategic Marketing Manager with 7+ years of experience driving digital marketing initiatives. Specialized in campaign management, SEO optimization, and team leadership. Successfully managed multi-million dollar budgets and delivered measurable ROI improvements across diverse industries."

What's your target role? I can customize this further!`;
    }

    if (lowerMessage.includes('skill') || lowerMessage.includes('technical')) {
      return `Here are in-demand technical skills by category:

**Software Development:**
• Programming Languages: JavaScript, Python, Java, TypeScript
• Frameworks: React, Angular, Vue.js, Node.js, Express
• Databases: MySQL, PostgreSQL, MongoDB, Redis
• Cloud: AWS, Azure, Google Cloud, Docker, Kubernetes

**Data & Analytics:**
• Languages: Python, R, SQL
• Tools: Tableau, Power BI, Excel, Google Analytics
• Machine Learning: TensorFlow, PyTorch, scikit-learn

**Marketing & Business:**
• Digital Marketing: Google Ads, Facebook Ads, SEO, SEM
• Analytics: Google Analytics, HubSpot, Salesforce
• Design: Adobe Creative Suite, Figma, Canva

Which area interests you most?`;
    }

    if (lowerMessage.includes('keyword') || lowerMessage.includes('ats')) {
      return `Here are ATS-optimized keywords by industry:

**Software Engineering Keywords:**
• Technical: "Full-stack development", "API integration", "Database design"
• Soft Skills: "Team leadership", "Problem-solving", "Agile methodology"
• Tools: "Git", "CI/CD", "Microservices", "Cloud computing"

**Marketing Keywords:**
• Technical: "Digital marketing", "SEO optimization", "Campaign management"
• Metrics: "ROI improvement", "Lead generation", "Conversion rate optimization"
• Tools: "Google Analytics", "HubSpot", "Salesforce", "Adobe Creative Suite"

**General ATS Tips:**
• Use exact job title variations
• Include industry-specific terminology
• Mention relevant certifications
• Use action verbs consistently

What industry are you targeting?`;
    }

    if (
      lowerMessage.includes('help') ||
      lowerMessage.includes('what can you do')
    ) {
      return `I can help you with:

🎯 **Content Generation**
• Professional bullet points
• Resume summaries/objectives
• Skills sections
• Achievement statements

🔍 **Keyword Optimization**
• ATS-friendly keywords
• Industry-specific terms
• Action verb suggestions

📊 **Resume Analysis**
• Content improvement tips
• Formatting suggestions
• ATS compatibility advice

💡 **Industry Insights**
• Trending skills
• Salary benchmarks
• Career advice

Just ask me anything about your resume! What would you like to work on?`;
    }

    // Default response
    return `I understand you're asking about "${userMessage}". 

I'm your free AI assistant that can help with resume content generation, keyword optimization, and career advice - all without any API costs!

Here are some things you can ask me:
• "Generate bullet points for a software engineer role"
• "Help me write a professional summary"
• "What keywords should I include for marketing positions?"
• "How can I improve my resume for ATS systems?"

What specific help do you need with your resume?`;
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI typing delay
    setTimeout(() => {
      const aiResponse = getAIResponse(userMessage.content);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className='h-[600px] flex flex-col'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <span className='text-lg'>💬</span>
          Free AI Chat Assistant
          <Badge variant='secondary' className='ml-auto'>
            No API Costs
          </Badge>
        </CardTitle>
        <CardDescription>
          Chat freely with our AI assistant - completely free, no limits!
        </CardDescription>
      </CardHeader>

      <CardContent className='flex-1 flex flex-col space-y-4'>
        {/* Messages */}
        <div className='flex-1 overflow-y-auto space-y-4 pr-2'>
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <div className='whitespace-pre-wrap text-sm'>
                  {message.content}
                </div>
                <div
                  className={`text-xs mt-1 ${
                    message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className='flex justify-start'>
              <div className='bg-gray-100 p-3 rounded-lg'>
                <div className='flex items-center gap-2'>
                  <div className='flex space-x-1'>
                    <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'></div>
                    <div
                      className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
                      style={{ animationDelay: '0.1s' }}
                    ></div>
                    <div
                      className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
                      style={{ animationDelay: '0.2s' }}
                    ></div>
                  </div>
                  <span className='text-xs text-gray-500'>AI is typing...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className='flex gap-2'>
          <Textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder='Ask me anything about your resume...'
            className='flex-1 min-h-[60px] resize-none'
          />
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim() || isTyping}
            className='self-end'
          >
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
