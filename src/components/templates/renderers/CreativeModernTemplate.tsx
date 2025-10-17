import React from 'react';
import { TemplateRendererProps } from '@/types/templates';
import EditableField from '../../EditableField';

/**
 * Creative Modern Template
 * Based on research: Creative professionals need balance between creativity and ATS compatibility
 * Focus: Portfolio links, creative achievements, visual design skills, project showcases
 * ATS-optimized: Single column, standard headings, but with creative elements that don't break ATS
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
      className='max-w-4xl mx-auto p-8 bg-white'
      style={{
        fontFamily: customization.fontFamily,
        fontSize: `${customization.fontSize.body}px`,
        lineHeight: `${customization.spacing.line * 3}px`,
        color: customization.theme.colors?.textSecondary || '#374151',
      }}
    >
      {/* Header - Creative Style: Modern, Clean */}
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

      {/* Creative Summary - Focus on Design & Innovation */}
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
            CREATIVE PROFILE
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
              placeholder='Creative professional with 6+ years of experience in visual design, brand identity, and digital marketing. Specialized in creating compelling visual narratives that increase brand engagement by 45% and drive user conversion rates. Passionate about innovative design solutions and user-centered experiences.'
              multiline
            />
          </div>
        </div>
      )}

      {/* Creative Skills - Design & Tools */}
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
          CREATIVE SKILLS
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
          <div
            className='grid grid-cols-1 md:grid-cols-2'
            style={{ gap: `${customization.spacing.line}px` }}
          >
            {data.skills.map((skill, index) => (
              <div
                key={index}
                className='border-l-2'
                style={{
                  borderColor: getHeaderColor(),
                  paddingLeft: `${customization.spacing.line}px`,
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
                    placeholder='Design Software'
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
                    placeholder='Adobe Creative Suite, Figma, Sketch, InVision'
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Professional Experience - Creative Focus */}
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
                        placeholder='Senior Graphic Designer'
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
                        placeholder='Creative Agency'
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
                    placeholder='Los Angeles, CA'
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
                            placeholder='Designed brand identity system that increased brand recognition by 60% and won 3 design awards'
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

      {/* Creative Projects - Portfolio Focus */}
      {data.projects && data.projects.length > 0 && (
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
            CREATIVE PROJECTS
          </h2>
          <div className='space-y-4'>
            {data.projects.map((project, index) => (
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
                    value={project.name}
                    onChange={value => {
                      const newProjects = [...(data.projects || [])];
                      newProjects[index] = {
                        ...newProjects[index],
                        name: value,
                      };
                      onUpdate && onUpdate({ ...data, projects: newProjects });
                    }}
                    placeholder='Brand Identity Design'
                  />
                </h3>
                <div
                  style={{
                    fontSize: `${customization.fontSize.body}px`,
                    lineHeight: `${customization.spacing.line * 2.5}px`,
                    marginBottom: `${customization.spacing.line}px`,
                  }}
                >
                  <EditableField
                    value={project.description}
                    onChange={value => {
                      const newProjects = [...(data.projects || [])];
                      newProjects[index] = {
                        ...newProjects[index],
                        description: value,
                      };
                      onUpdate && onUpdate({ ...data, projects: newProjects });
                    }}
                    placeholder='Created comprehensive brand identity for tech startup including logo, color palette, typography, and marketing materials'
                    multiline
                  />
                </div>
                <div
                  className='text-sm'
                  style={{
                    fontSize: `${customization.fontSize.small}px`,
                    color:
                      customization.theme.colors?.textTertiary || '#6B7280',
                  }}
                >
                  <strong>Tools:</strong>{' '}
                  <EditableField
                    value={project.technologies.join(', ')}
                    onChange={value => {
                      const newProjects = [...(data.projects || [])];
                      newProjects[index] = {
                        ...newProjects[index],
                        technologies: value
                          .split(',')
                          .map(tech => tech.trim())
                          .filter(tech => tech),
                      };
                      onUpdate && onUpdate({ ...data, projects: newProjects });
                    }}
                    placeholder='Adobe Illustrator, Photoshop, InDesign'
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
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
                        placeholder='Bachelor of Fine Arts in Graphic Design'
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
                        placeholder='Art Institute of Design'
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
                      placeholder='2018'
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

export default CreativeModernTemplate;
