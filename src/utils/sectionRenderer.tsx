import React from 'react';
import {
  ResumeData,
  WorkExperience,
  Education,
  Skill,
  Certification,
  Project,
} from '@/types/resume';
import { CustomizationSettings } from '@/types/customization';
import EditableField from '@/components/EditableField';
import ActionButtons from '@/components/ActionButtons';

interface SectionRendererProps {
  data: ResumeData;
  customization: CustomizationSettings;
  onUpdate?: (data: ResumeData) => void;
  getHeaderColor: () => string;
  isEditable?: boolean;
}

/**
 * Shared section renderer for all templates
 * This ensures consistent section handling across all templates
 */
export const renderSections = ({
  data,
  customization,
  onUpdate,
  getHeaderColor,
  isEditable = true,
}: SectionRendererProps) => {
  // Add/Remove functions
  const addExperience = () => {
    const newExp: WorkExperience = {
      id: `exp${Date.now()}`,
      company: 'Company Name',
      position: 'Job Title',
      location: 'City, State',
      startDate: 'Month Year',
      endDate: 'Month Year',
      isCurrently: false,
      achievements: ['Achievement 1', 'Achievement 2', 'Achievement 3'],
    };
    onUpdate && onUpdate({ ...data, experience: [...data.experience, newExp] });
  };

  const removeExperience = (index: number) => {
    if (data.experience.length <= 1) {
      alert('You must have at least one experience entry!');
      return;
    }
    const newExperience = data.experience.filter((_, i) => i !== index);
    onUpdate && onUpdate({ ...data, experience: newExperience });
  };

  const addAchievement = (expIndex: number) => {
    const newExperience = [...data.experience];
    newExperience[expIndex].achievements = [
      ...newExperience[expIndex].achievements,
      'New Achievement',
    ];
    onUpdate && onUpdate({ ...data, experience: newExperience });
  };

  const removeAchievement = (expIndex: number, achIndex: number) => {
    const newExperience = [...data.experience];
    if (newExperience[expIndex].achievements.length <= 1) {
      alert('You must have at least one achievement!');
      return;
    }
    newExperience[expIndex].achievements = newExperience[
      expIndex
    ].achievements.filter((_, i) => i !== achIndex);
    onUpdate && onUpdate({ ...data, experience: newExperience });
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: `edu${Date.now()}`,
      institution: 'University Name',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      location: 'City, State',
      graduationDate: 'Month Year',
    };
    onUpdate && onUpdate({ ...data, education: [...data.education, newEdu] });
  };

  const removeEducation = (index: number) => {
    if (data.education.length <= 1) {
      alert('You must have at least one education entry!');
      return;
    }
    const newEducation = data.education.filter((_, i) => i !== index);
    onUpdate && onUpdate({ ...data, education: newEducation });
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: `skill${Date.now()}`,
      category: 'New Category',
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
    const newCert: Certification = {
      id: `cert${Date.now()}`,
      name: 'Certification Name',
      issuer: 'Issuing Organization',
      date: 'Month Year',
    };
    onUpdate &&
      onUpdate({
        ...data,
        certifications: [...(data.certifications || []), newCert],
      });
  };

  const removeCertification = (index: number) => {
    if (!data.certifications) return;
    const newCertifications = data.certifications.filter((_, i) => i !== index);
    onUpdate && onUpdate({ ...data, certifications: newCertifications });
  };

  const addProject = () => {
    const newProject: Project = {
      id: `proj${Date.now()}`,
      name: 'Project Name',
      description: 'Project description...',
      technologies: ['Technology 1', 'Technology 2'],
    };
    onUpdate &&
      onUpdate({ ...data, projects: [...(data.projects || []), newProject] });
  };

  const removeProject = (index: number) => {
    if (!data.projects) return;
    const newProjects = data.projects.filter((_, i) => i !== index);
    onUpdate && onUpdate({ ...data, projects: newProjects });
  };

  const updateProjectTechnologies = (index: number, value: string) => {
    if (!data.projects) return;
    const newProjects = [...data.projects];
    newProjects[index] = {
      ...newProjects[index],
      technologies: value
        .split(',')
        .map(tech => tech.trim())
        .filter(tech => tech),
    };
    onUpdate && onUpdate({ ...data, projects: newProjects });
  };

  const renderSectionHeader = (title: string) => (
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
      {title}
    </h2>
  );

  const renderSummarySection = () => {
    if (!data.summary) return null;

    return (
      <div style={{ marginBottom: `${customization.spacing.section}px` }}>
        {renderSectionHeader('PROFESSIONAL SUMMARY')}
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
            placeholder='Professional summary...'
            multiline
          />
        </div>
      </div>
    );
  };

  const renderExperienceSection = () => {
    return (
      <div style={{ marginBottom: `${customization.spacing.section}px` }}>
        {renderSectionHeader('PROFESSIONAL EXPERIENCE')}
        {data.experience.length === 0 ? (
          isEditable && (
            <p
              className='text-gray-500 italic'
              style={{
                fontSize: `${customization.fontSize.body}px`,
                color: customization.theme.colors?.textMuted || '#9CA3AF',
              }}
            >
              No experience added yet
            </p>
          )
        ) : (
          <div className='space-y-6'>
            {data.experience.map((exp, index) => (
              <div
                key={index}
                style={{
                  marginBottom: `${customization.spacing.line * 3}px`,
                }}
              >
                <div className='flex justify-between items-start'>
                  <div className='flex-1'>
                    <div
                      className='flex justify-between items-start'
                      style={{
                        marginBottom: `${customization.spacing.line}px`,
                      }}
                    >
                      <div className='flex-1'>
                        <h3
                          className='font-semibold'
                          style={{
                            fontSize: `${customization.fontSize.subheading || customization.fontSize.body + 2}px`,
                            color: getHeaderColor(),
                            marginBottom: `${customization.spacing.line * 0.5}px`,
                          }}
                        >
                          <EditableField
                            value={exp.position}
                            onChange={value => {
                              const newExp = [...data.experience];
                              newExp[index] = {
                                ...newExp[index],
                                position: value,
                              };
                              onUpdate &&
                                onUpdate({ ...data, experience: newExp });
                            }}
                            placeholder='Job Title'
                          />
                        </h3>
                        <div
                          className='font-medium'
                          style={{
                            fontSize: `${customization.fontSize.body}px`,
                            color:
                              customization.theme.colors?.textSecondary ||
                              '#6B7280',
                            marginBottom: `${customization.spacing.line * 0.5}px`,
                          }}
                        >
                          <EditableField
                            value={exp.company}
                            onChange={value => {
                              const newExp = [...data.experience];
                              newExp[index] = {
                                ...newExp[index],
                                company: value,
                              };
                              onUpdate &&
                                onUpdate({ ...data, experience: newExp });
                            }}
                            placeholder='Company Name'
                          />
                        </div>
                      </div>
                      <div
                        className='text-right ml-4'
                        style={{
                          fontSize: `${customization.fontSize.small || customization.fontSize.body}px`,
                          color:
                            customization.theme.colors?.textMuted || '#9CA3AF',
                        }}
                      >
                        <EditableField
                          value={exp.startDate}
                          onChange={value => {
                            const newExp = [...data.experience];
                            newExp[index] = {
                              ...newExp[index],
                              startDate: value,
                            };
                            onUpdate &&
                              onUpdate({ ...data, experience: newExp });
                          }}
                          placeholder='Start Date'
                          className='inline-block'
                        />
                        <span className='mx-1'>-</span>
                        <EditableField
                          value={exp.endDate}
                          onChange={value => {
                            const newExp = [...data.experience];
                            newExp[index] = {
                              ...newExp[index],
                              endDate: value,
                            };
                            onUpdate &&
                              onUpdate({ ...data, experience: newExp });
                          }}
                          placeholder='End Date'
                          className='inline-block'
                        />
                      </div>
                    </div>
                    {exp.achievements && exp.achievements.length > 0 && (
                      <ul
                        className={`list-outside ml-5 ${
                          customization.bulletStyle === 'disc'
                            ? 'list-disc'
                            : customization.bulletStyle === 'circle'
                              ? 'list-circle'
                              : customization.bulletStyle === 'square'
                                ? 'list-square'
                                : 'list-none'
                        }`}
                        style={{
                          fontSize: `${customization.fontSize.body}px`,
                          lineHeight: `${customization.spacing.line * 3}px`,
                        }}
                      >
                        {exp.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className='group-item relative'>
                            {(customization.bulletStyle === 'arrow' ||
                              customization.bulletStyle === 'chevron') && (
                              <span
                                className='inline-block mr-2'
                                style={{ color: getHeaderColor() }}
                              >
                                {customization.bulletStyle === 'arrow'
                                  ? '→'
                                  : '›'}
                              </span>
                            )}
                            {isEditable && (
                              <span className='absolute -left-6 top-0 opacity-0 group-item-hover:opacity-100'>
                                <button
                                  onClick={() =>
                                    removeAchievement(index, achIndex)
                                  }
                                  className='p-0.5 hover:bg-red-100 rounded no-print'
                                  title='Remove'
                                >
                                  <svg
                                    className='w-3 h-3 text-red-600'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'
                                  >
                                    <path
                                      strokeLinecap='round'
                                      strokeLinejoin='round'
                                      strokeWidth={2}
                                      d='M6 18L18 6M6 6l12 12'
                                    />
                                  </svg>
                                </button>
                              </span>
                            )}
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
                              placeholder='Achievement description...'
                              multiline
                              as='span'
                            />
                          </li>
                        ))}
                      </ul>
                    )}
                    {isEditable && (
                      <button
                        onClick={() => addAchievement(index)}
                        className='mt-2 text-xs px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-full font-medium transition-colors flex items-center gap-1 no-print'
                      >
                        <svg
                          className='w-3 h-3'
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
                        Add Achievement
                      </button>
                    )}
                  </div>
                  {isEditable && (
                    <div className='ml-4'>
                      <ActionButtons
                        onRemove={() => removeExperience(index)}
                        showAdd={false}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        {isEditable && (
          <button
            onClick={addExperience}
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
            Add Experience
          </button>
        )}
      </div>
    );
  };

  const renderEducationSection = () => {
    return (
      <div style={{ marginBottom: `${customization.spacing.section}px` }}>
        {renderSectionHeader('EDUCATION')}
        {data.education.length === 0 ? (
          isEditable && (
            <p
              className='text-gray-500 italic'
              style={{
                fontSize: `${customization.fontSize.body}px`,
                color: customization.theme.colors?.textMuted || '#9CA3AF',
              }}
            >
              No education added yet
            </p>
          )
        ) : (
          <div className='space-y-4'>
            {data.education.map((edu, index) => (
              <div
                key={index}
                style={{
                  marginBottom: `${customization.spacing.line * 3}px`,
                }}
              >
                <div className='flex justify-between items-start'>
                  <div className='flex-1'>
                    <div
                      className='flex justify-between items-start'
                      style={{
                        marginBottom: `${customization.spacing.line}px`,
                      }}
                    >
                      <div className='flex-1'>
                        <h3
                          className='font-semibold'
                          style={{
                            fontSize: `${customization.fontSize.subheading || customization.fontSize.body + 2}px`,
                            color: getHeaderColor(),
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
                              onUpdate &&
                                onUpdate({ ...data, education: newEdu });
                            }}
                            placeholder='Institution Name'
                          />
                        </h3>
                        <div
                          className='font-medium'
                          style={{
                            fontSize: `${customization.fontSize.body}px`,
                            color:
                              customization.theme.colors?.textSecondary ||
                              '#6B7280',
                            marginBottom: `${customization.spacing.line * 0.5}px`,
                          }}
                        >
                          <EditableField
                            value={edu.degree}
                            onChange={value => {
                              const newEdu = [...data.education];
                              newEdu[index] = {
                                ...newEdu[index],
                                degree: value,
                              };
                              onUpdate &&
                                onUpdate({ ...data, education: newEdu });
                            }}
                            placeholder='Degree'
                          />
                        </div>
                        {edu.gpa && (
                          <div
                            className='text-sm'
                            style={{
                              fontSize: `${customization.fontSize.small}px`,
                              color:
                                customization.theme.colors?.textMuted ||
                                '#9CA3AF',
                            }}
                          >
                            Grade:{' '}
                            <EditableField
                              value={edu.gpa}
                              onChange={value => {
                                const newEdu = [...data.education];
                                newEdu[index] = {
                                  ...newEdu[index],
                                  gpa: value,
                                };
                                onUpdate &&
                                  onUpdate({ ...data, education: newEdu });
                              }}
                              placeholder='GPA'
                            />
                          </div>
                        )}
                      </div>
                      <div
                        className='text-right ml-4'
                        style={{
                          fontSize: `${customization.fontSize.small || customization.fontSize.body}px`,
                          color:
                            customization.theme.colors?.textMuted || '#9CA3AF',
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
                            onUpdate &&
                              onUpdate({ ...data, education: newEdu });
                          }}
                          placeholder='Graduation Date'
                          className='inline-block'
                        />
                      </div>
                    </div>
                  </div>
                  {isEditable && (
                    <div className='ml-4'>
                      <ActionButtons
                        onRemove={() => removeEducation(index)}
                        showAdd={false}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        {isEditable && (
          <button
            onClick={addEducation}
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
            Add Education
          </button>
        )}
      </div>
    );
  };

  const renderSkillsSection = () => {
    return (
      <div style={{ marginBottom: `${customization.spacing.section}px` }}>
        {renderSectionHeader('SKILLS')}
        {data.skills.length === 0 ? (
          isEditable && (
            <p
              className='text-gray-500 italic'
              style={{
                fontSize: `${customization.fontSize.body}px`,
                color: customization.theme.colors?.textMuted || '#9CA3AF',
              }}
            >
              No skills added yet
            </p>
          )
        ) : (
          <div className='space-y-4'>
            {data.skills.map((skill, index) => (
              <div
                key={index}
                style={{
                  marginBottom: `${customization.spacing.line * 3}px`,
                }}
              >
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
                        value={skill.category}
                        onChange={value => {
                          const newSkills = [...data.skills];
                          newSkills[index] = {
                            ...newSkills[index],
                            category: value,
                          };
                          onUpdate && onUpdate({ ...data, skills: newSkills });
                        }}
                        placeholder='Skill Category'
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
                        placeholder='Skill items separated by commas...'
                      />
                    </div>
                  </div>
                  {isEditable && (
                    <div className='ml-4'>
                      <ActionButtons
                        onRemove={() => removeSkill(index)}
                        showAdd={false}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        {isEditable && (
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
        )}
      </div>
    );
  };

  const renderCertificationsSection = () => {
    return (
      <div style={{ marginBottom: `${customization.spacing.section}px` }}>
        {renderSectionHeader('CERTIFICATIONS')}
        {!data.certifications || data.certifications.length === 0 ? (
          isEditable && (
            <p
              className='text-gray-500 italic'
              style={{
                fontSize: `${customization.fontSize.body}px`,
                color: customization.theme.colors?.textMuted || '#9CA3AF',
              }}
            >
              No certifications added yet
            </p>
          )
        ) : (
          <div className='space-y-3'>
            {data.certifications?.map((cert, index) => (
              <div
                key={index}
                className='flex justify-between items-start'
                style={{
                  marginBottom: `${customization.spacing.line}px`,
                }}
              >
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
                        if (!data.certifications) return;
                        const newCerts = [...data.certifications];
                        newCerts[index] = { ...newCerts[index], name: value };
                        onUpdate &&
                          onUpdate({ ...data, certifications: newCerts });
                      }}
                      placeholder='Certification Name'
                    />
                  </h3>
                  <div
                    className='font-medium'
                    style={{
                      fontSize: `${customization.fontSize.body}px`,
                      color:
                        customization.theme.colors?.textSecondary || '#6B7280',
                    }}
                  >
                    <EditableField
                      value={cert.issuer}
                      onChange={value => {
                        if (!data.certifications) return;
                        const newCerts = [...data.certifications];
                        newCerts[index] = { ...newCerts[index], issuer: value };
                        onUpdate &&
                          onUpdate({ ...data, certifications: newCerts });
                      }}
                      placeholder='Issuing Organization'
                    />
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <div
                    className='text-right'
                    style={{
                      fontSize: `${customization.fontSize.small}px`,
                      color: customization.theme.colors?.textMuted || '#9CA3AF',
                    }}
                  >
                    <EditableField
                      value={cert.date}
                      onChange={value => {
                        if (!data.certifications) return;
                        const newCerts = [...data.certifications];
                        newCerts[index] = { ...newCerts[index], date: value };
                        onUpdate &&
                          onUpdate({ ...data, certifications: newCerts });
                      }}
                      placeholder='Date'
                      className='inline-block'
                    />
                  </div>
                  {isEditable && (
                    <ActionButtons
                      onRemove={() => removeCertification(index)}
                      showAdd={false}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        {isEditable && (
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
        )}
      </div>
    );
  };

  const renderProjectsSection = () => {
    return (
      <div style={{ marginBottom: `${customization.spacing.section}px` }}>
        {renderSectionHeader('PROJECTS')}
        {!data.projects || data.projects.length === 0 ? (
          isEditable && (
            <p
              className='text-gray-500 italic'
              style={{
                fontSize: `${customization.fontSize.body}px`,
                color: customization.theme.colors?.textMuted || '#9CA3AF',
              }}
            >
              No projects added yet
            </p>
          )
        ) : (
          <div className='space-y-4'>
            {data.projects?.map((project, index) => (
              <div
                key={index}
                style={{
                  marginBottom: `${customization.spacing.line * 3}px`,
                }}
              >
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
                        value={project.name}
                        onChange={value => {
                          if (!data.projects) return;
                          const newProjects = [...data.projects];
                          newProjects[index] = {
                            ...newProjects[index],
                            name: value,
                          };
                          onUpdate &&
                            onUpdate({ ...data, projects: newProjects });
                        }}
                        placeholder='Project Name'
                      />
                    </h3>
                    <div
                      style={{
                        fontSize: `${customization.fontSize.body}px`,
                        lineHeight: `${customization.spacing.line * 3}px`,
                        marginBottom: `${customization.spacing.line}px`,
                      }}
                    >
                      <EditableField
                        value={project.description}
                        onChange={value => {
                          if (!data.projects) return;
                          const newProjects = [...data.projects];
                          newProjects[index] = {
                            ...newProjects[index],
                            description: value,
                          };
                          onUpdate &&
                            onUpdate({ ...data, projects: newProjects });
                        }}
                        placeholder='Project description...'
                        multiline
                      />
                    </div>
                    {project.technologies &&
                      project.technologies.length > 0 && (
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
                            value={project.technologies.join(', ')}
                            onChange={value =>
                              updateProjectTechnologies(index, value)
                            }
                            placeholder='Technologies used...'
                          />
                        </div>
                      )}
                  </div>
                  {isEditable && (
                    <div className='ml-4'>
                      <ActionButtons
                        onRemove={() => removeProject(index)}
                        showAdd={false}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        {isEditable && (
          <button
            onClick={addProject}
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
            Add Project
          </button>
        )}
      </div>
    );
  };

  // Render sections based on customization settings
  return customization.sections
    .filter(section => section.visible)
    .sort((a, b) => a.order - b.order)
    .map(section => {
      switch (section.id) {
        case 'summary':
          return (
            <React.Fragment key={section.id}>
              {renderSummarySection()}
            </React.Fragment>
          );
        case 'experience':
          return (
            <React.Fragment key={section.id}>
              {renderExperienceSection()}
            </React.Fragment>
          );
        case 'education':
          return (
            <React.Fragment key={section.id}>
              {renderEducationSection()}
            </React.Fragment>
          );
        case 'skills':
          return (
            <React.Fragment key={section.id}>
              {renderSkillsSection()}
            </React.Fragment>
          );
        case 'certifications':
          return (
            <React.Fragment key={section.id}>
              {renderCertificationsSection()}
            </React.Fragment>
          );
        case 'projects':
          return (
            <React.Fragment key={section.id}>
              {renderProjectsSection()}
            </React.Fragment>
          );
        default:
          return null;
      }
    });
};
