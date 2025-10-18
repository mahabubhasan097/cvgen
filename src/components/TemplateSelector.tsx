'use client';

import React, { useState } from 'react';
import { CVTemplate } from '@/types/templates';

interface TemplateSelectorProps {
  templates: CVTemplate[];
  currentTemplate: string;
  onTemplateChange: (templateId: string) => void;
}

/**
 * Template Selector Component
 * Allows users to select from available CV templates
 */
const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  templates,
  currentTemplate,
  onTemplateChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Get unique categories
  const categories = [
    'all',
    ...Array.from(new Set(templates.map(t => t.category))),
  ];

  // Filter templates by category
  const filteredTemplates =
    selectedCategory === 'all'
      ? templates
      : templates.filter(t => t.category === selectedCategory);

  // Get current template info
  const currentTemplateInfo = templates.find(t => t.id === currentTemplate);

  return (
    <div className='space-y-4'>
      {/* Clean Header */}
      <div>
        <h3 className='text-base font-semibold text-gray-900 mb-1'>
          Templates
        </h3>
        <p className='text-sm text-gray-500'>Choose a template design</p>
      </div>

      {/* 2x3 Category Filter Grid */}
      <div>
        <div className='grid grid-cols-3 gap-2'>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-2 text-xs font-medium rounded-md transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-sm transform scale-105'
                  : 'bg-white border border-gray-300 text-gray-700 hover:border-blue-400 hover:text-blue-600 hover:shadow-sm'
              }`}
            >
              {category === 'all'
                ? 'All'
                : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Minimal Template List */}
      <div className='space-y-2'>
        {filteredTemplates.map(template => (
          <button
            key={template.id}
            onClick={() => onTemplateChange(template.id)}
            className={`w-full p-3 rounded-lg border text-left transition-colors ${
              currentTemplate === template.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className='flex items-center justify-between'>
              <div>
                <h4 className='font-medium text-gray-900'>{template.name}</h4>
                <p className='text-sm text-gray-500 mt-0.5'>
                  {template.description}
                </p>
              </div>
              {currentTemplate === template.id && (
                <div className='text-blue-600 font-medium text-sm'>
                  Selected
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
