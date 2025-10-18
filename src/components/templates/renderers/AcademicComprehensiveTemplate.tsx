import React from 'react';
import { TemplateRendererProps } from '@/types/templates';
import EditableField from '../../EditableField';
import { renderSections } from '@/utils/sectionRenderer';

/**
 * Academic Comprehensive Template
 * Based on research: Academic CVs need comprehensive sections for research, publications, grants
 * Focus: Education, research experience, publications, grants, academic achievements
 * ATS-optimized: Traditional academic format, comprehensive sections, detailed information
 */
const AcademicComprehensiveTemplate: React.FC<
  TemplateRendererProps
> = props => {
  const { data, customization, onUpdate } = props;

  const getHeaderColor = () => {
    return (
      customization.accentColor ||
      customization.theme.colors?.textPrimary ||
      customization.theme.primary
    );
  };

  return (
    <div
      className='max-w-4xl mx-auto p-6 bg-white'
      style={{
        fontFamily: customization.fontFamily,
        fontSize: `${customization.fontSize.body}px`,
        lineHeight: customization.lineHeight.body,
        color: customization.theme.colors?.textSecondary || '#374151',
        minHeight: '29.7cm', // A4 height
        width: '21cm', // A4 width
      }}
    >
      {/* Header - Academic Style: Traditional, Formal */}
      <div style={{ marginBottom: `${customization.spacing.section}px` }}>
        <h1
          className='font-bold text-center'
          style={{
            fontSize: `${customization.fontSize.name + 2}px`,
            color: getHeaderColor(),
            marginBottom: `${customization.spacing.line}px`,
          }}
        >
          <EditableField
            value={data.contact.fullName}
            onChange={value =>
              onUpdate &&
              onUpdate({
                ...data,
                contact: { ...data.contact, fullName: value },
              })
            }
            placeholder='Full Name'
          />
        </h1>
        <div
          className='flex flex-wrap justify-center gap-4 text-sm'
          style={{
            fontSize: `${customization.fontSize.caption}px`,
            color: customization.theme.colors?.textMuted || '#9CA3AF',
          }}
        >
          <EditableField
            value={data.contact.email}
            onChange={value =>
              onUpdate?.({ ...data, contact: { ...data.contact, email: value } })
            }
            placeholder='Email'
          />
          <EditableField
            value={data.contact.phone}
            onChange={value =>
              onUpdate?.({ ...data, contact: { ...data.contact, phone: value } })
            }
            placeholder='Phone'
          />
          <EditableField
            value={data.contact.location}
            onChange={value =>
              onUpdate?.({
                ...data,
                contact: { ...data.contact, location: value },
              })
            }
            placeholder='Location'
          />
        </div>
      </div>

      {/* Dynamic Sections with renderSections */}
      {renderSections({
        data,
        customization,
        onUpdate,
        getHeaderColor,
        isEditable: true,
      })}
    </div>
  );
};

export default AcademicComprehensiveTemplate;
