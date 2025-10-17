import React from 'react';
import { TemplateRendererProps } from '@/types/templates';
import EditableField from '../../EditableField';

/**
 * Academic Comprehensive Template
 * Based on research: Academic professionals need emphasis on publications, research, teaching
 * Focus: Publications, research experience, teaching experience, academic achievements, grants
 * ATS-optimized: Single column, standard headings, comprehensive academic sections
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
      className='max-w-4xl mx-auto p-8 bg-white'
      style={{
        fontFamily: customization.fontFamily,
        fontSize: `${customization.fontSize.body}px`,
        lineHeight: `${customization.spacing.line * 3}px`,
        color: customization.theme.colors?.textSecondary || '#374151',
      }}
    >
      {/* Header - Academic Style: Formal, Professional */}
      <div
        className='text-center'
        style={{ marginBottom: `${customization.spacing.section}px` }}
      >
        <h1
          className='font-bold'
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

      {/* Academic Summary - Research Focus */}
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
            RESEARCH INTERESTS
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
              placeholder='Research focuses on machine learning applications in healthcare, with particular emphasis on predictive modeling for early disease detection. Published 15+ peer-reviewed articles in top-tier journals including Nature Medicine and IEEE Transactions on Biomedical Engineering.'
              multiline
            />
          </div>
        </div>
      )}

      {/* Education - Academic Focus (Most Important) */}
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
                        placeholder='Doctor of Philosophy in Computer Science'
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
                        value={edu.institution}
                        onChange={value => {
                          const newEdu = [...data.education];
                          newEdu[index] = {
                            ...newEdu[index],
                            institution: value,
                          };
                          onUpdate && onUpdate({ ...data, education: newEdu });
                        }}
                        placeholder='Stanford University'
                      />
                    </div>
                    {edu.gpa && (
                      <div
                        className='text-sm'
                        style={{
                          fontSize: `${customization.fontSize.small}px`,
                          color:
                            customization.theme.colors?.textTertiary ||
                            '#6B7280',
                        }}
                      >
                        GPA:{' '}
                        <EditableField
                          value={edu.gpa}
                          onChange={value => {
                            const newEdu = [...data.education];
                            newEdu[index] = { ...newEdu[index], gpa: value };
                            onUpdate &&
                              onUpdate({ ...data, education: newEdu });
                          }}
                          placeholder='3.9/4.0'
                        />
                      </div>
                    )}
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
                      placeholder='2020'
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Research Experience - Academic Focus */}
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
          RESEARCH EXPERIENCE
        </h2>
        {data.experience.length === 0 ? (
          <p
            className='text-gray-500 italic'
            style={{
              fontSize: `${customization.fontSize.body}px`,
              color: customization.theme.colors?.textMuted || '#9CA3AF',
            }}
          >
            No research experience added yet
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
                        placeholder='Postdoctoral Research Fellow'
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
                        placeholder='MIT Computer Science and Artificial Intelligence Laboratory'
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
                      placeholder='Sep 2020'
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
                    placeholder='Cambridge, MA'
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
                            placeholder='Developed novel deep learning algorithms for medical image analysis, resulting in 3 publications in top-tier journals'
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

      {/* Publications - Academic Focus */}
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
          SELECTED PUBLICATIONS
        </h2>
        <div className='space-y-3'>
          <div
            style={{
              fontSize: `${customization.fontSize.body}px`,
              lineHeight: `${customization.spacing.line * 3}px`,
            }}
          >
            <EditableField
              value=''
              onChange={() => {}}
              placeholder='Smith, J., Johnson, A., & Williams, B. (2023). "Deep Learning Approaches for Medical Image Analysis." Nature Medicine, 29(4), 123-145.'
              multiline
            />
          </div>
          <div
            style={{
              fontSize: `${customization.fontSize.body}px`,
              lineHeight: `${customization.spacing.line * 3}px`,
            }}
          >
            <EditableField
              value=''
              onChange={() => {}}
              placeholder='Johnson, A., Smith, J., & Brown, C. (2022). "Machine Learning in Healthcare: A Comprehensive Review." IEEE Transactions on Biomedical Engineering, 69(8), 2345-2356.'
              multiline
            />
          </div>
        </div>
      </div>

      {/* Teaching Experience - Academic Focus */}
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
          TEACHING EXPERIENCE
        </h2>
        <div className='space-y-3'>
          <div
            style={{
              marginBottom: `${customization.spacing.line}px`,
            }}
          >
            <h3
              className='font-semibold'
              style={{
                fontSize: `${customization.fontSize.subheading}px`,
                color: getHeaderColor(),
                marginBottom: `${customization.spacing.line * 0.5}px`,
              }}
            >
              <EditableField
                value=''
                onChange={() => {}}
                placeholder='Teaching Assistant - Machine Learning (CS229)'
              />
            </h3>
            <div
              style={{
                fontSize: `${customization.fontSize.body}px`,
                color: customization.theme.colors?.textSecondary || '#374151',
                marginBottom: `${customization.spacing.line * 0.5}px`,
              }}
            >
              <EditableField
                value=''
                onChange={() => {}}
                placeholder='Stanford University, Fall 2022 - Spring 2023'
              />
            </div>
            <div
              style={{
                fontSize: `${customization.fontSize.body}px`,
                lineHeight: `${customization.spacing.line * 3}px`,
              }}
            >
              <EditableField
                value=''
                onChange={() => {}}
                placeholder='Led discussion sections for 30+ students, graded assignments, and provided office hours support'
                multiline
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grants and Awards - Academic Focus */}
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
          GRANTS AND AWARDS
        </h2>
        <div className='space-y-2'>
          <div
            style={{
              fontSize: `${customization.fontSize.body}px`,
              lineHeight: `${customization.spacing.line * 3}px`,
            }}
          >
            <EditableField
              value=''
              onChange={() => {}}
              placeholder='NSF Graduate Research Fellowship, 2020-2023 ($138,000)'
            />
          </div>
          <div
            style={{
              fontSize: `${customization.fontSize.body}px`,
              lineHeight: `${customization.spacing.line * 3}px`,
            }}
          >
            <EditableField
              value=''
              onChange={() => {}}
              placeholder='Best Paper Award, International Conference on Machine Learning, 2022'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicComprehensiveTemplate;
