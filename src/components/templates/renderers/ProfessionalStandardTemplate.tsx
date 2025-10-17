'use client';

import React from 'react';
import { TemplateRendererProps } from '@/types/templates';
import Resume from '../../Resume';

/**
 * Professional Standard Template
 * Clean, ATS-friendly single-column layout
 * Perfect for corporate environments and most industries
 * This is the original default template design
 */
const ProfessionalStandardTemplate: React.FC<TemplateRendererProps> = props => {
  const { data, customization, onUpdate } = props;

  return (
    <Resume
      data={data}
      onUpdate={onUpdate || (() => {})}
      customization={customization}
    />
  );
};

export default ProfessionalStandardTemplate;
