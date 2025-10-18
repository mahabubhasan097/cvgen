import React from 'react';
import { TemplateRendererProps } from '@/types/templates';
import EditableField from '../../EditableField';
import ActionButtons from '../../ActionButtons';
import { renderSections } from '@/utils/sectionRenderer';

/**
 * Technical Two-Column Template
 * Based on research: Technical professionals need to showcase skills prominently
 * Focus: Technical skills, projects, code repositories, certifications
 * ATS-optimized: Two-column layout, skill-heavy, project-focused
 */
const TechnicalTwoColumnTemplate: React.FC<TemplateRendererProps> = props => {
  const { data, customization, onUpdate } = props;

  const getHeaderColor = () => {
    return (
      customization.accentColor ||
      customization.theme.colors?.textPrimary ||
      customization.theme.primary
    );
  };

  // Add/Remove functions for Technical template sidebar sections

  const addSkill = () => {
    const newSkill = {
      id: `skill${Date.now()}`,
      category: 'Skill Category',
      items: ['Skill 1', 'Skill 2', 'Skill 3'],
    };
    onUpdate && onUpdate({ ...data, skills: [...data.skills, newSkill] });
  };

  const removeSkill = (index: number) => {
    if (data.skills.length <= 1) {
      alert('You must have at least one skill category!');
      return;
    }
    const newSkills = data.skills.filter((_, i) => i !== index);
    onUpdate && onUpdate({ ...data, skills: newSkills });
  };

  const addCertification = () => {
    const newCert = {
      id: `cert${Date.now()}`,
      name: 'Certification Name',
      issuer: 'Issuing Organization',
      date: 'Date',
    };
    onUpdate &&
      onUpdate({ ...data, certifications: [...data.certifications, newCert] });
  };

  const removeCertification = (index: number) => {
    if (!data.certifications) return;
    const newCerts = data.certifications.filter((_, i) => i !== index);
    onUpdate && onUpdate({ ...data, certifications: newCerts });
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
      {/* Header - Technical Style: Modern, Clean */}
      <div style={{ marginBottom: `${customization.spacing.section}px` }}>
        <h1
          className='font-bold text-center'
          style={{
            fontSize: `${customization.fontSize.name}px`,
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
          {data.contact.linkedin && (
            <EditableField
              value={data.contact.linkedin}
              onChange={value =>
                onUpdate?.({
                  ...data,
                  contact: { ...data.contact, linkedin: value },
                })
              }
              placeholder='LinkedIn'
            />
          )}
          {data.contact.github && (
            <EditableField
              value={data.contact.github}
              onChange={value =>
                onUpdate?.({
                  ...data,
                  contact: { ...data.contact, github: value },
                })
              }
              placeholder='GitHub'
            />
          )}
          {data.contact.portfolio && (
            <EditableField
              value={data.contact.portfolio}
              onChange={value =>
                onUpdate?.({
                  ...data,
                  contact: { ...data.contact, portfolio: value },
                })
              }
              placeholder='Portfolio'
            />
          )}
        </div>
      </div>

      {/* Two-Column Layout */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Left Column - Skills & Contact Info */}
        <div className='lg:col-span-1 space-y-6'>
          {/* Technical Skills - Prominent in sidebar */}
          {customization.sections.find(s => s.id === 'skills')?.visible &&
            data.skills.length > 0 && (
              <div>
                <h2
                  className='font-bold uppercase tracking-wider border-b-2 mb-4'
                  style={{
                    fontSize: `${customization.fontSize.heading}px`,
                    color: getHeaderColor(),
                    borderColor: getHeaderColor(),
                    paddingBottom: `${customization.spacing.line}px`,
                  }}
                >
                  TECHNICAL SKILLS
                </h2>
                <div className='space-y-3'>
                  {data.skills.map((skill, index) => (
                    <div key={index}>
                      <div className='flex justify-between items-start'>
                        <div className='flex-1'>
                          <h3
                            className='font-semibold mb-2'
                            style={{
                              fontSize: `${customization.fontSize.subheading}px`,
                              color: getHeaderColor(),
                            }}
                          >
                            <EditableField
                              value={skill.category}
                              onChange={value => {
                                const newSkills = [...data.skills];
                                newSkills[index] = {
                                  ...newSkills[index],
                                  category: value,
                                };
                                onUpdate &&
                                  onUpdate({ ...data, skills: newSkills });
                              }}
                              placeholder='Skill Category'
                            />
                          </h3>
                          <div
                            style={{
                              fontSize: `${customization.fontSize.body}px`,
                              lineHeight: customization.lineHeight.body,
                            }}
                          >
                            <EditableField
                              value={skill.items.join(', ')}
                              onChange={value => {
                                const newSkills = [...data.skills];
                                newSkills[index] = {
                                  ...newSkills[index],
                                  items: value
                                    .split(',')
                                    .map(item => item.trim())
                                    .filter(item => item),
                                };
                                onUpdate &&
                                  onUpdate({ ...data, skills: newSkills });
                              }}
                              placeholder='Skill items separated by commas...'
                            />
                          </div>
                        </div>
                        <div className='ml-2'>
                          <ActionButtons
                            onRemove={() => removeSkill(index)}
                            showAdd={false}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={addSkill}
                  className='mt-4 w-full py-2 border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 rounded-lg text-sm font-medium hover:transition-all no-print flex items-center justify-center gap-2'
                >
                  <svg
                    className='w-4 h-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 4v16m8-8H4'
                    />
                  </svg>
                  Add Skill Category
                </button>
              </div>
            )}

          {/* Certifications - Sidebar */}
          {customization.sections.find(s => s.id === 'certifications')
            ?.visible &&
            data.certifications && data.certifications.length > 0 && (
              <div>
                <h2
                  className='font-bold uppercase tracking-wider border-b-2 mb-4'
                  style={{
                    fontSize: `${customization.fontSize.heading}px`,
                    color: getHeaderColor(),
                    borderColor: getHeaderColor(),
                    paddingBottom: `${customization.spacing.line}px`,
                  }}
                >
                  CERTIFICATIONS
                </h2>
                <div className='space-y-3'>
                  {data.certifications?.map((cert, index) => (
                    <div key={index}>
                      <div className='flex justify-between items-start'>
                        <div className='flex-1'>
                          <h3
                            className='font-semibold'
                            style={{
                              fontSize: `${customization.fontSize.subheading}px`,
                              color: getHeaderColor(),
                              marginBottom: `${customization.spacing.line * 0.5}px`,
                            }}
                          >
                            <EditableField
                              value={cert.name}
                              onChange={value => {
                                const newCerts = [...data.certifications];
                                newCerts[index] = {
                                  ...newCerts[index],
                                  name: value,
                                };
                                onUpdate &&
                                  onUpdate({
                                    ...data,
                                    certifications: newCerts,
                                  });
                              }}
                              placeholder='Certification Name'
                            />
                          </h3>
                          <div
                            className='text-sm'
                            style={{
                              fontSize: `${customization.fontSize.small}px`,
                              color:
                                customization.theme.colors?.textMuted ||
                                '#9CA3AF',
                            }}
                          >
                            <EditableField
                              value={cert.issuer}
                              onChange={value => {
                                const newCerts = [...data.certifications];
                                newCerts[index] = {
                                  ...newCerts[index],
                                  issuer: value,
                                };
                                onUpdate &&
                                  onUpdate({
                                    ...data,
                                    certifications: newCerts,
                                  });
                              }}
                              placeholder='Issuing Organization'
                            />
                          </div>
                          <div
                            className='text-xs'
                            style={{
                              fontSize: `${customization.fontSize.small - 1}px`,
                              color:
                                customization.theme.colors?.textMuted ||
                                '#9CA3AF',
                            }}
                          >
                            <EditableField
                              value={cert.date}
                              onChange={value => {
                                const newCerts = [...data.certifications];
                                newCerts[index] = {
                                  ...newCerts[index],
                                  date: value,
                                };
                                onUpdate &&
                                  onUpdate({
                                    ...data,
                                    certifications: newCerts,
                                  });
                              }}
                              placeholder='Date'
                              className='inline-block'
                            />
                          </div>
                        </div>
                        <div className='ml-2'>
                          <ActionButtons
                            onRemove={() => removeCertification(index)}
                            showAdd={false}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={addCertification}
                  className='mt-4 w-full py-2 border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 rounded-lg text-sm font-medium hover:transition-all no-print flex items-center justify-center gap-2'
                >
                  <svg
                    className='w-4 h-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 4v16m8-8H4'
                    />
                  </svg>
                  Add Certification
                </button>
              </div>
            )}
        </div>

        {/* Right Column - Main Content */}
        <div className='lg:col-span-2 space-y-6'>
          {/* Dynamic Sections */}
          {renderSections({
            data,
            customization,
            onUpdate,
            getHeaderColor,
            isEditable: true,
          })}
        </div>
      </div>
    </div>
  );
};

export default TechnicalTwoColumnTemplate;
