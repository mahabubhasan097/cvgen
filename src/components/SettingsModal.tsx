'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { aiService } from '@/services/aiService';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [apiKey, setApiKey] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationStatus, setValidationStatus] = useState<
    'idle' | 'valid' | 'invalid'
  >('idle');
  const [isAIAvailable, setIsAIAvailable] = useState(false);
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

  useEffect(() => {
    // Check AI provider status when modal opens
    const checkProviderStatus = async () => {
      setIsAIAvailable(aiService.isAvailable());
      const status = await aiService.getAIProviderStatus();
      setAiProviderStatus(status);
    };

    if (isOpen) {
      checkProviderStatus();
    }
  }, [isOpen]);

  const handleSaveApiKey = async () => {
    if (!apiKey.trim()) return;

    setIsValidating(true);
    setValidationStatus('idle');

    try {
      // Test the API key by making a simple request
      const response = await fetch('https://api.openai.com/v1/models', {
        headers: {
          Authorization: `Bearer ${apiKey.trim()}`,
        },
      });

      if (response.ok) {
        // API key is valid
        aiService.setApiKey(apiKey.trim());
        setValidationStatus('valid');
        setIsAIAvailable(true);

        // Store in localStorage for persistence
        localStorage.setItem('openai_api_key', apiKey.trim());

        // Show success message briefly
        setTimeout(() => {
          setValidationStatus('idle');
        }, 2000);
      } else {
        setValidationStatus('invalid');
      }
    } catch {
      setValidationStatus('invalid');
    } finally {
      setIsValidating(false);
    }
  };

  const handleRemoveApiKey = () => {
    aiService.setApiKey('');
    setApiKey('');
    setIsAIAvailable(false);
    setValidationStatus('idle');
    localStorage.removeItem('openai_api_key');
  };

  const handleClearApiKey = () => {
    setApiKey('');
    setValidationStatus('idle');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-md max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='text-xl font-bold'>Settings</DialogTitle>
        </DialogHeader>

        <div className='space-y-4'>
          {/* AI Service Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <span className='text-lg'>🤖 AI Assistant</span>
                <Badge variant={isAIAvailable ? 'default' : 'secondary'}>
                  {isAIAvailable ? 'Active' : 'Inactive'}
                </Badge>
              </CardTitle>
              <CardDescription>
                Configure your OpenAI API key to enable AI-powered resume
                suggestions and analysis.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='api-key'>OpenAI API Key</Label>
                <div className='flex gap-2'>
                  <Input
                    id='api-key'
                    type='password'
                    placeholder='sk-...'
                    value={apiKey}
                    onChange={e => setApiKey(e.target.value)}
                    className='flex-1'
                  />
                  <Button
                    onClick={handleClearApiKey}
                    variant='outline'
                    size='sm'
                    disabled={!apiKey}
                  >
                    Clear
                  </Button>
                </div>
                <p className='text-xs text-gray-500'>
                  Your API key is stored locally and never sent to our servers.
                </p>
              </div>

              <div className='flex gap-2'>
                <Button
                  onClick={handleSaveApiKey}
                  disabled={!apiKey.trim() || isValidating}
                  className='flex-1'
                >
                  {isValidating ? 'Validating...' : 'Save & Test'}
                </Button>
                {isAIAvailable && (
                  <Button
                    onClick={handleRemoveApiKey}
                    variant='destructive'
                    size='sm'
                  >
                    Remove
                  </Button>
                )}
              </div>

              {/* Validation Status */}
              {validationStatus === 'valid' && (
                <div className='p-3 bg-green-50 border border-green-200 rounded-md'>
                  <p className='text-sm text-green-800 font-medium'>
                    ✅ API key is valid! AI features are now active.
                  </p>
                </div>
              )}

              {validationStatus === 'invalid' && (
                <div className='p-3 bg-red-50 border border-red-200 rounded-md'>
                  <p className='text-sm text-red-800 font-medium'>
                    ❌ Invalid API key. Please check and try again.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI Provider Status */}
          <Card>
            <CardHeader className='pb-3'>
              <CardTitle className='text-base flex items-center gap-2'>
                <span>🔍 AI Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-2'>
              <div className='grid grid-cols-1 gap-1'>
                <div className='flex items-center justify-between p-2 rounded-md bg-gray-50'>
                  <span className='flex items-center gap-2'>
                    <span>🖥️</span>
                    <span className='text-sm font-medium'>Local Ollama</span>
                  </span>
                  <Badge
                    variant={aiProviderStatus.ollama ? 'default' : 'secondary'}
                    className='text-xs'
                  >
                    {aiProviderStatus.ollama ? 'Available' : 'Not Found'}
                  </Badge>
                </div>

                <div className='flex items-center justify-between p-2 rounded-md bg-gray-50'>
                  <span className='flex items-center gap-2'>
                    <span>☁️</span>
                    <span className='text-sm font-medium'>OpenAI API</span>
                  </span>
                  <Badge
                    variant={aiProviderStatus.openai ? 'default' : 'secondary'}
                    className='text-xs'
                  >
                    {aiProviderStatus.openai ? 'Available' : 'Not Configured'}
                  </Badge>
                </div>

                <div className='flex items-center justify-between p-2 rounded-md bg-gray-50'>
                  <span className='flex items-center gap-2'>
                    <span>🛠️</span>
                    <span className='text-sm font-medium'>Built-in AI</span>
                  </span>
                  <Badge variant='default' className='text-xs'>
                    Always Available
                  </Badge>
                </div>
              </div>

              <div className='p-2 bg-blue-50 border border-blue-200 rounded-md'>
                <p className='text-xs text-blue-800 font-medium'>
                  🎯 <strong>Current:</strong>{' '}
                  {aiProviderStatus.currentProvider === 'ollama'
                    ? 'Local Ollama (Free & Private)'
                    : aiProviderStatus.currentProvider === 'openai'
                      ? 'OpenAI API (Paid)'
                      : 'Built-in AI (Free)'}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Cost Warning */}
          <Card className='border-orange-200 bg-orange-50'>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm text-orange-800 flex items-center gap-2'>
                ⚠️ API Costs Money
              </CardTitle>
            </CardHeader>
            <CardContent className='text-xs text-orange-700 space-y-1'>
              <p>
                <strong>OpenAI API is NOT free.</strong> You'll need to:
              </p>
              <ul className='list-disc list-inside space-y-0.5 ml-2'>
                <li>Add a payment method to your OpenAI account</li>
                <li>Pay per API call (typically $0.002-0.02 per request)</li>
                <li>Set usage limits to control costs</li>
              </ul>
              <p className='text-xs mt-1'>
                💡 <strong>Alternative:</strong> Our built-in suggestions work
                without any API key!
              </p>
            </CardContent>
          </Card>

          {/* How to Get API Key */}
          <Card>
            <CardHeader className='pb-2'>
              <CardTitle className='text-sm'>
                How to get your OpenAI API key:
              </CardTitle>
            </CardHeader>
            <CardContent className='text-xs text-gray-600 space-y-1'>
              <ol className='list-decimal list-inside space-y-0.5'>
                <li>
                  Visit{' '}
                  <a
                    href='https://platform.openai.com/api-keys'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-600 hover:underline'
                  >
                    platform.openai.com/api-keys
                  </a>
                </li>
                <li>Sign in to your OpenAI account</li>
                <li>Add a payment method (required)</li>
                <li>Click "Create new secret key"</li>
                <li>Copy the key and paste it above</li>
              </ol>
            </CardContent>
          </Card>

          {/* Close Button */}
          <div className='flex justify-end pt-2 border-t border-gray-200'>
            <Button onClick={onClose} variant='outline' size='sm'>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
