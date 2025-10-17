"use client";

import React, { useState } from "react";
import { CVTemplate } from "@/types/templates";

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
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Get unique categories
  const categories = ["all", ...Array.from(new Set(templates.map(t => t.category)))];

  // Filter templates by category
  const filteredTemplates = selectedCategory === "all" 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  // Get current template info
  const currentTemplateInfo = templates.find(t => t.id === currentTemplate);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h3 className="text-sm font-bold mb-2 text-gray-900">CV Template</h3>
        {currentTemplateInfo && (
          <p className="text-xs text-gray-600 mb-3">
            Current: <span className="font-medium">{currentTemplateInfo.name}</span>
          </p>
        )}
      </div>

      {/* Category Filter */}
      <div>
        <div className="flex flex-wrap gap-1 mb-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                selectedCategory === category
                  ? "bg-indigo-100 text-indigo-700 border border-indigo-200"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {category === "all" ? "All" : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Template Grid */}
      <div className="max-h-80 overflow-y-auto pr-2">
        <div className="grid grid-cols-1 gap-3">
          {filteredTemplates.map((template) => (
            <button
              key={template.id}
              onClick={() => onTemplateChange(template.id)}
              className={`p-3 rounded-lg border-2 transition-all text-left hover:scale-[1.02] ${
                currentTemplate === template.id
                  ? "border-indigo-600 bg-indigo-50 shadow-md"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
              }`}
            >
              {/* Template Header */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-sm text-gray-900 mb-1">
                    {template.name}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {template.description}
                  </p>
                </div>
                {currentTemplate === template.id && (
                  <div className="ml-2 flex-shrink-0">
                    <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              {/* Template Features */}
              <div className="flex flex-wrap gap-1 mb-2">
                {template.features.slice(0, 3).map((feature, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
                {template.features.length > 3 && (
                  <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">
                    +{template.features.length - 3} more
                  </span>
                )}
              </div>

              {/* Template Meta */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="capitalize">{template.category}</span>
                <span className="capitalize">{template.region}</span>
              </div>

              {/* Layout Indicator */}
              <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded ${
                    template.layout.type === 'single-column' ? 'bg-blue-500' :
                    template.layout.type === 'two-column' ? 'bg-green-500' : 'bg-purple-500'
                  }`} />
                  <span className="capitalize">
                    {template.layout.type.replace('-', ' ')}
                  </span>
                </div>
                <span>•</span>
                <span className="capitalize">{template.layout.spacing}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Template Info */}
      {currentTemplateInfo && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <h4 className="text-xs font-semibold text-gray-900 mb-2">
            Template Details
          </h4>
          <div className="space-y-1 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Layout:</span>
              <span className="capitalize">{currentTemplateInfo.layout.type.replace('-', ' ')}</span>
            </div>
            <div className="flex justify-between">
              <span>Header Style:</span>
              <span className="capitalize">{currentTemplateInfo.layout.headerStyle.replace('-', ' ')}</span>
            </div>
            <div className="flex justify-between">
              <span>Sections:</span>
              <span>{currentTemplateInfo.sections.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Region:</span>
              <span className="capitalize">{currentTemplateInfo.region}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
