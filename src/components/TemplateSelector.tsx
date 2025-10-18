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
    <div className='space-y-6'>
      {/* Modern Header */}
      <div className='text-center'>
        <div className='flex items-center justify-center mb-3'>
          <div className='w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center'>
            <svg
              className='w-4 h-4 text-white'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'
              />
            </svg>
          </div>
        </div>
        <h3 className='text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2'>
          Choose Template
        </h3>
        {currentTemplateInfo && (
          <div className='inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full'>
            <span className='text-xs text-blue-600 font-medium'>Current:</span>
            <span className='text-xs text-blue-800 font-semibold'>
              {currentTemplateInfo.name}
            </span>
          </div>
        )}
      </div>

      {/* Modern Category Filter */}
      <div>
        <div className='flex flex-wrap gap-2 mb-4'>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-md hover:scale-102'
              }`}
            >
              <span className='flex items-center gap-2'>
                {category === 'all' && '🌟'}
                {category === 'professional' && '💼'}
                {category === 'creative' && '🎨'}
                {category === 'technical' && '⚙️'}
                {category === 'academic' && '🎓'}
                {category === 'modern' && '✨'}
                {category === 'all'
                  ? 'All Templates'
                  : category.charAt(0).toUpperCase() + category.slice(1)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Modern Template Grid */}
      <div className='max-h-80 overflow-y-auto pr-2'>
        <div className='grid grid-cols-1 gap-4'>
          {filteredTemplates.map(template => (
            <button
              key={template.id}
              onClick={() => onTemplateChange(template.id)}
              className={`group p-4 rounded-2xl border-2 transition-all duration-300 text-left hover:scale-[1.02] relative overflow-hidden ${
                currentTemplate === template.id
                  ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 shadow-xl'
                  : 'border-gray-200 hover:border-blue-300 hover:shadow-lg bg-white'
              }`}
            >
              {/* Modern Template Header */}
              <div className='flex items-start justify-between mb-3'>
                <div className='flex-1'>
                  <div className='flex items-center gap-2 mb-2'>
                    <div
                      className={`w-3 h-3 rounded-full ${
                        template.category === 'professional'
                          ? 'bg-blue-500'
                          : template.category === 'creative'
                            ? 'bg-purple-500'
                            : template.category === 'technical'
                              ? 'bg-green-500'
                              : template.category === 'academic'
                                ? 'bg-orange-500'
                                : 'bg-gray-500'
                      }`}
                    />
                    <h4 className='font-bold text-base text-gray-900 group-hover:text-blue-700 transition-colors'>
                      {template.name}
                    </h4>
                  </div>
                  <p className='text-sm text-gray-600 leading-relaxed mb-3'>
                    {template.description}
                  </p>
                </div>
                {currentTemplate === template.id && (
                  <div className='ml-3 flex-shrink-0'>
                    <div className='w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg animate-pulse'>
                      <svg
                        className='w-4 h-4 text-white'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              {/* Modern Template Features */}
              <div className='flex flex-wrap gap-2 mb-3'>
                {template.features.slice(0, 3).map((feature, index) => (
                  <span
                    key={index}
                    className='px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-full shadow-sm'
                  >
                    ✨ {feature}
                  </span>
                ))}
                {template.features.length > 3 && (
                  <span className='px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full shadow-sm'>
                    +{template.features.length - 3} more
                  </span>
                )}
              </div>

              {/* Modern Template Meta */}
              <div className='flex items-center justify-between text-xs text-gray-600 mb-3'>
                <div className='flex items-center gap-2'>
                  <span className='px-2 py-1 bg-gray-100 rounded-full font-medium capitalize'>
                    {template.category}
                  </span>
                  <span className='px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium capitalize'>
                    {template.region}
                  </span>
                </div>
              </div>

              {/* Modern Layout Indicator */}
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3 text-xs'>
                  <div className='flex items-center gap-2'>
                    <div
                      className={`w-3 h-3 rounded-full ${
                        template.layout.type === 'single-column'
                          ? 'bg-blue-500'
                          : template.layout.type === 'two-column'
                            ? 'bg-green-500'
                            : 'bg-purple-500'
                      }`}
                    />
                    <span className='font-medium text-gray-700 capitalize'>
                      {template.layout.type.replace('-', ' ')}
                    </span>
                  </div>
                  <div className='w-px h-3 bg-gray-300'></div>
                  <span className='font-medium text-gray-600 capitalize'>
                    {template.layout.spacing} spacing
                  </span>
                </div>
                <div className='text-xs text-gray-500 font-medium'>
                  ATS Friendly ✓
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Template Info */}
      {currentTemplateInfo && (
        <div className='mt-4 p-3 bg-gray-50 rounded-lg'>
          <h4 className='text-xs font-semibold text-gray-900 mb-2'>
            Template Details
          </h4>
          <div className='space-y-1 text-xs text-gray-600'>
            <div className='flex justify-between'>
              <span>Layout:</span>
              <span className='capitalize'>
                {currentTemplateInfo.layout.type.replace('-', ' ')}
              </span>
            </div>
            <div className='flex justify-between'>
              <span>Header Style:</span>
              <span className='capitalize'>
                {currentTemplateInfo.layout.headerStyle.replace('-', ' ')}
              </span>
            </div>
            <div className='flex justify-between'>
              <span>Sections:</span>
              <span>{currentTemplateInfo.sections.length}</span>
            </div>
            <div className='flex justify-between'>
              <span>Region:</span>
              <span className='capitalize'>{currentTemplateInfo.region}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
