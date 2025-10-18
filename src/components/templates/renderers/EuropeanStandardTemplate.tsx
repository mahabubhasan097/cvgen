import React from 'react';
import { TemplateRendererProps } from '@/types/templates';
import EditableField from '../../EditableField';
import { renderSections } from '@/utils/sectionRenderer';

/**
 * European Standard Template
 * Based on research: Europass CV format - European standard for CVs
 * Focus: Personal statement, work experience, education, skills, languages
 * ATS-optimized: Europass format, standardized sections, European compliance
 */
const EuropeanStandardTemplate: React.FC<TemplateRendererProps> = props => {
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
      {/* Header - European Style: Standard, Professional */}
      <div style={{ marginBottom: `${customization.spacing.section}px` }}>
        <h1
          className='font-bold'
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
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <div
              className='text-sm'
              style={{
                fontSize: `${customization.fontSize.caption}px`,
                color: customization.theme.colors?.textMuted || '#9CA3AF',
                marginBottom: `${customization.spacing.line * 0.5}px`,
              }}
            >
              <strong>Email:</strong>{' '}
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
              <strong>Phone:</strong>{' '}
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
          </div>
          <div>
            <div
              className='text-sm'
              style={{
                fontSize: `${customization.fontSize.caption}px`,
                color: customization.theme.colors?.textMuted || '#9CA3AF',
                marginBottom: `${customization.spacing.line * 0.5}px`,
              }}
            >
              <strong>Address:</strong>{' '}
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
                <strong>LinkedIn:</strong>{' '}
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

export default EuropeanStandardTemplate;
