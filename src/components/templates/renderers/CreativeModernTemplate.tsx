import React from 'react';
import { TemplateRendererProps } from '@/types/templates';
import EditableField from '../../EditableField';
import { renderSections } from '@/utils/sectionRenderer';

/**
 * Creative Modern Template
 * Based on research: Creative professionals need visually appealing layouts
 * Focus: Portfolio, creative projects, artistic achievements, visual impact
 * ATS-optimized: Modern design, project-heavy, creative language
 */
const CreativeModernTemplate: React.FC<TemplateRendererProps> = props => {
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
      {/* Header - Creative Style: Asymmetrical, Modern */}
      <div style={{ marginBottom: `${customization.spacing.section}px` }}>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 items-center'>
          {/* Name - Left side */}
          <div className='md:col-span-2'>
            <h1
              className='font-bold'
              style={{
                fontSize: `${customization.fontSize.name + 8}px`,
                color: getHeaderColor(),
                marginBottom: `${customization.spacing.line}px`,
                lineHeight: '1.1',
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
              className='text-lg'
              style={{
                fontSize: `${customization.fontSize.body + 2}px`,
                color: customization.theme.colors?.textSecondary || '#6B7280',
                fontStyle: 'italic',
              }}
            >
              <EditableField
                value={data.summary || 'Creative Professional'}
                onChange={value =>
                  onUpdate && onUpdate({ ...data, summary: value })
                }
                placeholder='Creative Professional'
              />
            </div>
          </div>

          {/* Contact - Right side */}
          <div className='space-y-2'>
            <div
              className='text-sm'
              style={{
                fontSize: `${customization.fontSize.caption}px`,
                color: customization.theme.colors?.textMuted || '#9CA3AF',
              }}
            >
              <EditableField
                value={data.contact.email}
                onChange={value =>
                  onUpdate &&
                  onUpdate({
                    ...data,
                    contact: { ...data.contact, email: value },
                  })
                }
                placeholder='Email'
              />
            </div>
            <div
              className='text-sm'
              style={{
                fontSize: `${customization.fontSize.caption}px`,
                color: customization.theme.colors?.textMuted || '#9CA3AF',
              }}
            >
              <EditableField
                value={data.contact.phone}
                onChange={value =>
                  onUpdate &&
                  onUpdate({
                    ...data,
                    contact: { ...data.contact, phone: value },
                  })
                }
                placeholder='Phone'
              />
            </div>
            <div
              className='text-sm'
              style={{
                fontSize: `${customization.fontSize.caption}px`,
                color: customization.theme.colors?.textMuted || '#9CA3AF',
              }}
            >
              <EditableField
                value={data.contact.location}
                onChange={value =>
                  onUpdate &&
                  onUpdate({
                    ...data,
                    contact: { ...data.contact, location: value },
                  })
                }
                placeholder='Location'
              />
            </div>
            {data.contact.linkedin && (
              <div
                className='text-sm'
                style={{
                  fontSize: `${customization.fontSize.caption}px`,
                  color: customization.theme.colors?.textMuted || '#9CA3AF',
                }}
              >
                <EditableField
                  value={data.contact.linkedin}
                  onChange={value =>
                    onUpdate &&
                    onUpdate({
                      ...data,
                      contact: { ...data.contact, linkedin: value },
                    })
                  }
                  placeholder='LinkedIn'
                />
              </div>
            )}
            {data.contact.portfolio && (
              <div
                className='text-sm'
                style={{
                  fontSize: `${customization.fontSize.caption}px`,
                  color: customization.theme.colors?.textMuted || '#9CA3AF',
                }}
              >
                <EditableField
                  value={data.contact.portfolio}
                  onChange={value =>
                    onUpdate &&
                    onUpdate({
                      ...data,
                      contact: { ...data.contact, portfolio: value },
                    })
                  }
                  placeholder='Portfolio'
                />
              </div>
            )}
          </div>
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

export default CreativeModernTemplate;
