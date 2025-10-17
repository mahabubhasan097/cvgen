import React from 'react';
import { TemplateRendererProps } from '@/types/templates';
import EditableField from '../../EditableField';

/**
 * Executive Minimal Template
 * Based on research: C-suite executives need clean, professional layouts
 * Focus: Leadership achievements, quantified results, strategic impact
 * ATS-optimized: Single column, standard headings, no graphics
 */
const ExecutiveMinimalTemplate: React.FC<TemplateRendererProps> = props => {
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
      className='max-w-4xl mx-auto p-8 bg-white'
      style={{
        fontFamily: customization.fontFamily,
        fontSize: `${customization.fontSize.body}px`,
        lineHeight: `${customization.spacing.line * 3}px`,
        color: customization.theme.colors?.textSecondary || '#374151',
      }}
    >
      {/* Header - Executive Style: Centered, Bold, Minimal */}
      <div
        className='text-center'
        style={{ marginBottom: `${customization.spacing.section}px` }}
      >
        <h1
          className='font-bold uppercase tracking-widest'
          style={{
            fontSize: `${customization.fontSize.name}px`,
            color: getHeaderColor(),
            letterSpacing: `${customization.spacing.letterSpacing}px`,
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
            className='text-center'
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
              onUpdate &&
              onUpdate({ ...data, contact: { ...data.contact, email: value } })
            }
            placeholder='Email'
          />
          <EditableField
            value={data.contact.phone}
            onChange={value =>
              onUpdate &&
              onUpdate({ ...data, contact: { ...data.contact, phone: value } })
            }
            placeholder='Phone'
          />
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
          {data.contact.linkedin && (
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
          )}
          {data.contact.github && (
            <EditableField
              value={data.contact.github}
              onChange={value =>
                onUpdate &&
                onUpdate({
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
                onUpdate &&
                onUpdate({
                  ...data,
                  contact: { ...data.contact, portfolio: value },
                })
              }
              placeholder='Portfolio'
            />
          )}
        </div>
      </div>

      {/* Executive Summary - Focus on Leadership & Results */}
      {data.summary && (
        <div style={{ marginBottom: `${customization.spacing.section}px` }}>
          <h2
            className='font-bold uppercase tracking-wider border-b-2'
            style={{
              fontSize: `${customization.fontSize.heading}px`,
              color: getHeaderColor(),
              borderColor: getHeaderColor(),
              paddingBottom: `${customization.spacing.line}px`,
              marginBottom: `${customization.spacing.line}px`,
            }}
          >
            EXECUTIVE SUMMARY
          </h2>
          <div
            style={{
              fontSize: `${customization.fontSize.body}px`,
              lineHeight: `${customization.spacing.line * 3}px`,
            }}
          >
            <EditableField
              value={data.summary}
              onChange={value =>
                onUpdate && onUpdate({ ...data, summary: value })
              }
              placeholder='Results-driven C-suite executive with 15+ years of experience leading Fortune 500 companies through digital transformation, achieving 40% revenue growth and $2B market expansion. Proven track record in strategic planning, operational excellence, and stakeholder management.'
              multiline
            />
          </div>
        </div>
      )}

      {/* Core Competencies - Executive Skills */}
      <div style={{ marginBottom: `${customization.spacing.section}px` }}>
        <h2
          className='font-bold uppercase tracking-wider border-b-2'
          style={{
            fontSize: `${customization.fontSize.heading}px`,
            color: getHeaderColor(),
            borderColor: getHeaderColor(),
            paddingBottom: `${customization.spacing.line}px`,
            marginBottom: `${customization.spacing.line}px`,
          }}
        >
          CORE COMPETENCIES
        </h2>
        <div
          className='grid grid-cols-1 md:grid-cols-2 gap-2'
          style={{
            fontSize: `${customization.fontSize.body}px`,
            lineHeight: `${customization.spacing.line * 3}px`,
          }}
        >
          <div>Strategic Planning & Execution</div>
          <div>Digital Transformation</div>
          <div>Financial Management & P&L</div>
          <div>Stakeholder Relations</div>
          <div>Operational Excellence</div>
          <div>Team Leadership & Development</div>
          <div>Mergers & Acquisitions</div>
          <div>Risk Management</div>
        </div>
      </div>

      {/* Professional Experience - Executive Focus */}
      <div style={{ marginBottom: `${customization.spacing.section}px` }}>
        <h2
          className='font-bold uppercase tracking-wider border-b-2'
          style={{
            fontSize: `${customization.fontSize.heading}px`,
            color: getHeaderColor(),
            borderColor: getHeaderColor(),
            paddingBottom: `${customization.spacing.line}px`,
            marginBottom: `${customization.spacing.line}px`,
          }}
        >
          PROFESSIONAL EXPERIENCE
        </h2>
        {data.experience.length === 0 ? (
          <p
            className='text-gray-500 italic'
            style={{
              fontSize: `${customization.fontSize.body}px`,
              color: customization.theme.colors?.textMuted || '#9CA3AF',
            }}
          >
            No experience added yet
          </p>
        ) : (
          <div className='space-y-6'>
            {data.experience.map((exp, index) => (
              <div
                key={index}
                style={{
                  marginBottom: `${customization.spacing.line * 3}px`,
                }}
              >
                <div
                  className='flex flex-col sm:flex-row sm:justify-between sm:items-start'
                  style={{ marginBottom: `${customization.spacing.line}px` }}
                >
                  <div>
                    <h3
                      className='font-semibold'
                      style={{
                        fontSize: `${customization.fontSize.subheading}px`,
                        color: getHeaderColor(),
                        marginBottom: `${customization.spacing.line * 0.5}px`,
                      }}
                    >
                      <EditableField
                        value={exp.position}
                        onChange={value => {
                          const newExp = [...data.experience];
                          newExp[index] = { ...newExp[index], position: value };
                          onUpdate && onUpdate({ ...data, experience: newExp });
                        }}
                        placeholder='Chief Executive Officer'
                      />
                    </h3>
                    <div
                      className='font-medium'
                      style={{
                        fontSize: `${customization.fontSize.body}px`,
                        color:
                          customization.theme.colors?.textSecondary ||
                          '#374151',
                        marginBottom: `${customization.spacing.line * 0.5}px`,
                      }}
                    >
                      <EditableField
                        value={exp.company}
                        onChange={value => {
                          const newExp = [...data.experience];
                          newExp[index] = { ...newExp[index], company: value };
                          onUpdate && onUpdate({ ...data, experience: newExp });
                        }}
                        placeholder='Fortune 500 Company'
                      />
                    </div>
                  </div>
                  <div
                    className='text-sm font-mono'
                    style={{
                      fontSize: `${customization.fontSize.small}px`,
                      color:
                        customization.theme.colors?.textTertiary || '#6B7280',
                    }}
                  >
                    <EditableField
                      value={exp.startDate}
                      onChange={value => {
                        const newExp = [...data.experience];
                        newExp[index] = { ...newExp[index], startDate: value };
                        onUpdate && onUpdate({ ...data, experience: newExp });
                      }}
                      placeholder='Jan 2020'
                    />
                    {' - '}
                    <EditableField
                      value={exp.endDate}
                      onChange={value => {
                        const newExp = [...data.experience];
                        newExp[index] = { ...newExp[index], endDate: value };
                        onUpdate && onUpdate({ ...data, experience: newExp });
                      }}
                      placeholder='Present'
                    />
                  </div>
                </div>
                <div
                  className='text-sm'
                  style={{
                    fontSize: `${customization.fontSize.small}px`,
                    color:
                      customization.theme.colors?.textTertiary || '#6B7280',
                    marginBottom: `${customization.spacing.line}px`,
                  }}
                >
                  <EditableField
                    value={exp.location}
                    onChange={value => {
                      const newExp = [...data.experience];
                      newExp[index] = { ...newExp[index], location: value };
                      onUpdate && onUpdate({ ...data, experience: newExp });
                    }}
                    placeholder='New York, NY'
                  />
                </div>
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className='space-y-1'>
                    {exp.achievements.map((achievement, achIndex) => (
                      <li
                        key={achIndex}
                        className='flex items-start'
                        style={{
                          fontSize: `${customization.fontSize.body}px`,
                          lineHeight: `${customization.spacing.line * 3}px`,
                        }}
                      >
                        <span
                          className='mr-2 mt-1 text-xs'
                          style={{ color: getHeaderColor() }}
                        >
                          •
                        </span>
                        <div className='flex-1'>
                          <EditableField
                            value={achievement}
                            onChange={value => {
                              const newExp = [...data.experience];
                              const newAchievements = [
                                ...(newExp[index].achievements || []),
                              ];
                              newAchievements[achIndex] = value;
                              newExp[index] = {
                                ...newExp[index],
                                achievements: newAchievements,
                              };
                              onUpdate &&
                                onUpdate({ ...data, experience: newExp });
                            }}
                            placeholder='Led digital transformation initiative resulting in 40% increase in operational efficiency and $2M annual cost savings'
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Education - Executive Focus */}
      <div style={{ marginBottom: `${customization.spacing.section}px` }}>
        <h2
          className='font-bold uppercase tracking-wider border-b-2'
          style={{
            fontSize: `${customization.fontSize.heading}px`,
            color: getHeaderColor(),
            borderColor: getHeaderColor(),
            paddingBottom: `${customization.spacing.line}px`,
            marginBottom: `${customization.spacing.line}px`,
          }}
        >
          EDUCATION
        </h2>
        {data.education.length === 0 ? (
          <p
            className='text-gray-500 italic'
            style={{
              fontSize: `${customization.fontSize.body}px`,
              color: customization.theme.colors?.textMuted || '#9CA3AF',
            }}
          >
            No education added yet
          </p>
        ) : (
          <div className='space-y-4'>
            {data.education.map((edu, index) => (
              <div
                key={index}
                style={{
                  marginBottom: `${customization.spacing.line * 3}px`,
                }}
              >
                <div
                  className='flex flex-col sm:flex-row sm:justify-between sm:items-start'
                  style={{ marginBottom: `${customization.spacing.line}px` }}
                >
                  <div>
                    <h3
                      className='font-semibold'
                      style={{
                        fontSize: `${customization.fontSize.subheading}px`,
                        color: getHeaderColor(),
                        marginBottom: `${customization.spacing.line * 0.5}px`,
                      }}
                    >
                      <EditableField
                        value={edu.degree}
                        onChange={value => {
                          const newEdu = [...data.education];
                          newEdu[index] = { ...newEdu[index], degree: value };
                          onUpdate && onUpdate({ ...data, education: newEdu });
                        }}
                        placeholder='Master of Business Administration'
                      />
                    </h3>
                    <div
                      className='font-medium'
                      style={{
                        fontSize: `${customization.fontSize.body}px`,
                        color:
                          customization.theme.colors?.textSecondary ||
                          '#374151',
                      }}
                    >
                      <EditableField
                        value={edu.institution}
                        onChange={value => {
                          const newEdu = [...data.education];
                          newEdu[index] = {
                            ...newEdu[index],
                            institution: value,
                          };
                          onUpdate && onUpdate({ ...data, education: newEdu });
                        }}
                        placeholder='Harvard Business School'
                      />
                    </div>
                  </div>
                  <div
                    className='text-sm font-mono'
                    style={{
                      fontSize: `${customization.fontSize.small}px`,
                      color:
                        customization.theme.colors?.textTertiary || '#6B7280',
                    }}
                  >
                    <EditableField
                      value={edu.graduationDate}
                      onChange={value => {
                        const newEdu = [...data.education];
                        newEdu[index] = {
                          ...newEdu[index],
                          graduationDate: value,
                        };
                        onUpdate && onUpdate({ ...data, education: newEdu });
                      }}
                      placeholder='2015'
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExecutiveMinimalTemplate;
