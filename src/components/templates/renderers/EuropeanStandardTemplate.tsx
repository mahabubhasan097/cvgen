import React from 'react';
import { TemplateRendererProps } from '@/types/templates';
import EditableField from '../../EditableField';

/**
 * European Standard Template
 * Based on research: European CV format follows Europass structure
 * Focus: Personal statement, work experience, education, skills, languages
 * ATS-optimized: Single column, standard headings, European CV conventions
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
      className='max-w-4xl mx-auto p-8 bg-white'
      style={{
        fontFamily: customization.fontFamily,
        fontSize: `${customization.fontSize.body}px`,
        lineHeight: `${customization.spacing.line * 3}px`,
        color: customization.theme.colors?.textSecondary || '#374151',
      }}
    >
      {/* Header - European Style: Formal, Structured */}
      <div style={{ marginBottom: `${customization.spacing.section}px` }}>
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
          />
        </h1>
        <div
          className='flex flex-wrap gap-4 text-sm'
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

      {/* Personal Statement - European CV Standard */}
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
            PERSONAL STATEMENT
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
              placeholder='Experienced professional with 8+ years in international business development and project management. Proven track record of leading cross-cultural teams and delivering successful projects across European markets. Fluent in English, German, and French with strong analytical and communication skills.'
              multiline
            />
          </div>
        </div>
      )}

      {/* Work Experience - European CV Standard */}
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
          WORK EXPERIENCE
        </h2>
        {data.experience.length === 0 ? (
          <p
            className='text-gray-500 italic'
            style={{
              fontSize: `${customization.fontSize.body}px`,
              color: customization.theme.colors?.textMuted || '#9CA3AF',
            }}
          >
            No work experience added yet
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
                        placeholder='Senior Business Development Manager'
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
                        placeholder='European Technology Solutions GmbH'
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
                      placeholder='01/2020'
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
                    placeholder='Berlin, Germany'
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
                            placeholder='Led expansion into 5 new European markets, resulting in 35% revenue growth and 200+ new client acquisitions'
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

      {/* Education and Training - European CV Standard */}
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
          EDUCATION AND TRAINING
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
                        placeholder='ESADE Business School'
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
                        Grade:{' '}
                        <EditableField
                          value={edu.gpa}
                          onChange={value => {
                            const newEdu = [...data.education];
                            newEdu[index] = { ...newEdu[index], gpa: value };
                            onUpdate &&
                              onUpdate({ ...data, education: newEdu });
                          }}
                          placeholder='Distinction (1.2)'
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
                      placeholder='2018'
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Personal Skills - European CV Standard */}
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
          PERSONAL SKILLS
        </h2>
        {data.skills.length === 0 ? (
          <p
            className='text-gray-500 italic'
            style={{
              fontSize: `${customization.fontSize.body}px`,
              color: customization.theme.colors?.textMuted || '#9CA3AF',
            }}
          >
            No skills added yet
          </p>
        ) : (
          <div className='space-y-4'>
            {data.skills.map((skill, index) => (
              <div
                key={index}
                style={{
                  marginBottom: `${customization.spacing.line * 3}px`,
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
                    value={skill.category}
                    onChange={value => {
                      const newSkills = [...data.skills];
                      newSkills[index] = {
                        ...newSkills[index],
                        category: value,
                      };
                      onUpdate && onUpdate({ ...data, skills: newSkills });
                    }}
                    placeholder='Communication Skills'
                  />
                </h3>
                <div
                  style={{
                    fontSize: `${customization.fontSize.body}px`,
                    lineHeight: `${customization.spacing.line * 3}px`,
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
                      onUpdate && onUpdate({ ...data, skills: newSkills });
                    }}
                    placeholder='Public speaking, negotiation, cross-cultural communication, team leadership'
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Languages - European CV Standard */}
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
          LANGUAGES
        </h2>
        <div className='space-y-2'>
          <div
            className='flex flex-col sm:flex-row sm:justify-between sm:items-center'
            style={{
              fontSize: `${customization.fontSize.body}px`,
              lineHeight: `${customization.spacing.line * 3}px`,
            }}
          >
            <div>
              <strong>English</strong> - Native speaker
            </div>
            <div
              className='text-sm'
              style={{
                fontSize: `${customization.fontSize.small}px`,
                color: customization.theme.colors?.textTertiary || '#6B7280',
              }}
            >
              CEFR Level: C2
            </div>
          </div>
          <div
            className='flex flex-col sm:flex-row sm:justify-between sm:items-center'
            style={{
              fontSize: `${customization.fontSize.body}px`,
              lineHeight: `${customization.spacing.line * 3}px`,
            }}
          >
            <div>
              <strong>German</strong> - Fluent
            </div>
            <div
              className='text-sm'
              style={{
                fontSize: `${customization.fontSize.small}px`,
                color: customization.theme.colors?.textTertiary || '#6B7280',
              }}
            >
              CEFR Level: C1
            </div>
          </div>
          <div
            className='flex flex-col sm:flex-row sm:justify-between sm:items-center'
            style={{
              fontSize: `${customization.fontSize.body}px`,
              lineHeight: `${customization.spacing.line * 3}px`,
            }}
          >
            <div>
              <strong>French</strong> - Intermediate
            </div>
            <div
              className='text-sm'
              style={{
                fontSize: `${customization.fontSize.small}px`,
                color: customization.theme.colors?.textTertiary || '#6B7280',
              }}
            >
              CEFR Level: B2
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information - European CV Standard */}
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
          ADDITIONAL INFORMATION
        </h2>
        <div
          style={{
            fontSize: `${customization.fontSize.body}px`,
            lineHeight: `${customization.spacing.line * 3}px`,
          }}
        >
          <EditableField
            value=''
            onChange={() => {}}
            placeholder='Available for relocation within the European Union. Valid driving license. Willing to travel for business purposes.'
            multiline
          />
        </div>
      </div>
    </div>
  );
};

export default EuropeanStandardTemplate;
