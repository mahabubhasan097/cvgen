'use client';

import React from 'react';
import { ResumeData } from '@/types/resume';
import { CustomizationSettings } from '@/types/customization';
import ResumeSection from '../../ResumeSection';
import EditableField from '../../EditableField';

interface ResumeSectionsProps {
  data: ResumeData;
  customization: CustomizationSettings;
  onUpdate?: (data: ResumeData) => void;
  getHeaderColor: () => string;
}

export const ResumeSections: React.FC<ResumeSectionsProps> = ({
  data,
  customization,
  onUpdate,
  getHeaderColor,
}) => {
  // Update handlers
  const updateSummary = (value: string) => {
    if (onUpdate) {
      onUpdate({ ...data, summary: value });
    }
  };

  const updateExperience = (index: number, field: string, value: string) => {
    if (onUpdate) {
      const newExperience = [...data.experience];
      newExperience[index] = { ...newExperience[index], [field]: value };
      onUpdate({ ...data, experience: newExperience });
    }
  };

  const updateExperienceAchievement = (
    expIndex: number,
    achIndex: number,
    value: string
  ) => {
    if (onUpdate) {
      const newExperience = [...data.experience];
      newExperience[expIndex].achievements[achIndex] = value;
      onUpdate({ ...data, experience: newExperience });
    }
  };

  const updateEducation = (index: number, field: string, value: string) => {
    if (onUpdate) {
      const newEducation = [...data.education];
      newEducation[index] = { ...newEducation[index], [field]: value };
      onUpdate({ ...data, education: newEducation });
    }
  };

  const updateSkillCategory = (index: number, value: string) => {
    if (onUpdate) {
      const newSkills = [...data.skills];
      newSkills[index] = { ...newSkills[index], category: value };
      onUpdate({ ...data, skills: newSkills });
    }
  };

  const updateSkillItems = (index: number, value: string) => {
    if (onUpdate) {
      const newSkills = [...data.skills];
      const itemsArray = value
        .split(',')
        .map(item => item.trim())
        .filter(item => item.length > 0);
      newSkills[index] = { ...newSkills[index], items: itemsArray };
      onUpdate({ ...data, skills: newSkills });
    }
  };

  const updateCertification = (index: number, field: string, value: string) => {
    if (onUpdate) {
      const newCertifications = [...(data.certifications || [])];
      newCertifications[index] = {
        ...newCertifications[index],
        [field]: value,
      };
      onUpdate({ ...data, certifications: newCertifications });
    }
  };

  const updateProject = (index: number, field: string, value: string) => {
    if (onUpdate) {
      const newProjects = [...(data.projects || [])];
      newProjects[index] = { ...newProjects[index], [field]: value };
      onUpdate({ ...data, projects: newProjects });
    }
  };

  const updateProjectDescription = (projIndex: number, value: string) => {
    if (onUpdate) {
      const newProjects = [...(data.projects || [])];
      newProjects[projIndex] = {
        ...newProjects[projIndex],
        description: value,
      };
      onUpdate({ ...data, projects: newProjects });
    }
  };

  const updateProjectTechnologies = (index: number, value: string) => {
    if (onUpdate) {
      const newProjects = [...(data.projects || [])];
      const technologiesArray = value
        .split(',')
        .map(tech => tech.trim())
        .filter(tech => tech.length > 0);
      newProjects[index] = {
        ...newProjects[index],
        technologies: technologiesArray,
      };
      onUpdate({ ...data, projects: newProjects });
    }
  };

  return (
    <>
      {/* Professional Summary */}
      <ResumeSection
        title='Professional Summary'
        customization={customization}
        className='mb-6'
      >
        <EditableField
          value={data.summary}
          onChange={updateSummary}
          placeholder='Write a compelling professional summary that highlights your key qualifications, experience, and career objectives...'
          multiline
          className='text-gray-700 leading-relaxed'
        />
      </ResumeSection>

      {/* Professional Experience */}
      <ResumeSection
        title='Professional Experience'
        customization={customization}
        className='mb-6'
      >
        {data.experience.length === 0 ? (
          <p className='text-gray-500 italic'>No experience added yet</p>
        ) : (
          <div className='space-y-6'>
            {data.experience.map((exp, index) => (
              <div key={index} className='border-l-2 border-gray-200 pl-4'>
                <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2'>
                  <div>
                    <h3
                      className='font-semibold text-lg'
                      style={{
                        color: getHeaderColor(),
                        fontSize: `${customization.fontSize.subheading}px`,
                      }}
                    >
                      <EditableField
                        value={exp.position}
                        onChange={value =>
                          updateExperience(index, 'position', value)
                        }
                        placeholder='Job Title'
                      />
                    </h3>
                    <div
                      className='font-medium'
                      style={{
                        color:
                          customization.theme.colors?.textSecondary ||
                          '#374151',
                        fontSize: `${customization.fontSize.body}px`,
                      }}
                    >
                      <EditableField
                        value={exp.company}
                        onChange={value =>
                          updateExperience(index, 'company', value)
                        }
                        placeholder='Company Name'
                      />
                    </div>
                  </div>
                  <div className='text-sm text-gray-600 mt-1 sm:mt-0'>
                    <EditableField
                      value={exp.startDate}
                      onChange={value =>
                        updateExperience(index, 'startDate', value)
                      }
                      placeholder='Start Date'
                    />
                    {' - '}
                    <EditableField
                      value={exp.endDate}
                      onChange={value =>
                        updateExperience(index, 'endDate', value)
                      }
                      placeholder='End Date'
                    />
                  </div>
                </div>
                {exp.location && (
                  <div
                    className='text-sm mb-3'
                    style={{
                      color:
                        customization.theme.colors?.textTertiary || '#6B7280',
                      fontSize: `${customization.fontSize.small}px`,
                    }}
                  >
                    <EditableField
                      value={exp.location}
                      onChange={value =>
                        updateExperience(index, 'location', value)
                      }
                      placeholder='Location'
                    />
                  </div>
                )}
                {exp.achievements.length > 0 && (
                  <ul className='list-disc list-inside space-y-1'>
                    {exp.achievements.map((achievement, achIndex) => (
                      <li
                        key={achIndex}
                        className='text-gray-700'
                        style={{ fontSize: `${customization.fontSize.body}px` }}
                      >
                        <EditableField
                          value={achievement}
                          onChange={value =>
                            updateExperienceAchievement(index, achIndex, value)
                          }
                          placeholder='Describe your achievement...'
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </ResumeSection>

      {/* Education */}
      <ResumeSection
        title='Education'
        customization={customization}
        className='mb-6'
      >
        {data.education.length === 0 ? (
          <p className='text-gray-500 italic'>No education added yet</p>
        ) : (
          <div className='space-y-4'>
            {data.education.map((edu, index) => (
              <div key={index} className='border-l-2 border-gray-200 pl-4'>
                <h3
                  className='font-semibold'
                  style={{
                    color: getHeaderColor(),
                    fontSize: `${customization.fontSize.subheading}px`,
                  }}
                >
                  <EditableField
                    value={edu.institution}
                    onChange={value =>
                      updateEducation(index, 'institution', value)
                    }
                    placeholder='Institution Name'
                  />
                </h3>
                <div
                  className='font-medium'
                  style={{
                    color:
                      customization.theme.colors?.textSecondary || '#374151',
                    fontSize: `${customization.fontSize.body}px`,
                  }}
                >
                  <EditableField
                    value={edu.degree}
                    onChange={value => updateEducation(index, 'degree', value)}
                    placeholder='Degree/Field of Study'
                  />
                </div>
                <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm'>
                  <span
                    style={{
                      color:
                        customization.theme.colors?.textTertiary || '#6B7280',
                      fontSize: `${customization.fontSize.small}px`,
                    }}
                  >
                    <EditableField
                      value={edu.graduationDate}
                      onChange={value =>
                        updateEducation(index, 'graduationDate', value)
                      }
                      placeholder='Graduation Date'
                    />
                  </span>
                  {edu.gpa && (
                    <span
                      className='font-medium'
                      style={{
                        color:
                          customization.theme.colors?.textMuted || '#9CA3AF',
                        fontSize: `${customization.fontSize.caption}px`,
                      }}
                    >
                      GPA:{' '}
                      <EditableField
                        value={edu.gpa}
                        onChange={value => updateEducation(index, 'gpa', value)}
                        placeholder='3.8'
                      />
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </ResumeSection>

      {/* Technical Skills */}
      <ResumeSection
        title='Technical Skills'
        customization={customization}
        className='mb-6'
      >
        {data.skills.length === 0 ? (
          <p className='text-gray-500 italic'>No skills added yet</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {data.skills.map((skill, index) => (
              <div key={index} className='border-l-2 border-gray-200 pl-4'>
                <h3
                  className='font-semibold mb-2'
                  style={{
                    color: getHeaderColor(),
                    fontSize: `${customization.fontSize.subheading}px`,
                  }}
                >
                  <EditableField
                    value={skill.category}
                    onChange={value => updateSkillCategory(index, value)}
                    placeholder='Skill Category'
                  />
                </h3>
                <div
                  className='text-gray-700'
                  style={{ fontSize: `${customization.fontSize.body}px` }}
                >
                  <EditableField
                    value={skill.items.join(', ')}
                    onChange={value => updateSkillItems(index, value)}
                    placeholder='List your skills separated by commas...'
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </ResumeSection>

      {/* Certifications */}
      <ResumeSection
        title='Certifications'
        customization={customization}
        className='mb-6'
      >
        {(data.certifications || []).length === 0 ? (
          <p className='text-gray-500 italic'>No certifications added yet</p>
        ) : (
          <div className='space-y-3'>
            {(data.certifications || []).map((cert, index) => (
              <div
                key={index}
                className='flex flex-col sm:flex-row sm:justify-between sm:items-center border-l-2 border-gray-200 pl-4'
              >
                <div>
                  <h3
                    className='font-semibold'
                    style={{
                      color: getHeaderColor(),
                      fontSize: `${customization.fontSize.subheading}px`,
                    }}
                  >
                    <EditableField
                      value={cert.name}
                      onChange={value =>
                        updateCertification(index, 'name', value)
                      }
                      placeholder='Certification Name'
                    />
                  </h3>
                  <div
                    className='text-gray-600'
                    style={{ fontSize: `${customization.fontSize.body}px` }}
                  >
                    <EditableField
                      value={cert.issuer}
                      onChange={value =>
                        updateCertification(index, 'issuer', value)
                      }
                      placeholder='Issuing Organization'
                    />
                  </div>
                </div>
                <span
                  className='text-sm text-gray-500 mt-1 sm:mt-0'
                  style={{ fontSize: `${customization.fontSize.small}px` }}
                >
                  <EditableField
                    value={cert.date}
                    onChange={value =>
                      updateCertification(index, 'date', value)
                    }
                    placeholder='Date'
                  />
                </span>
              </div>
            ))}
          </div>
        )}
      </ResumeSection>

      {/* Key Projects */}
      <ResumeSection
        title='Key Projects'
        customization={customization}
        className='mb-6'
      >
        {(data.projects || []).length === 0 ? (
          <p className='text-gray-500 italic'>No projects added yet</p>
        ) : (
          <div className='space-y-6'>
            {(data.projects || []).map((project, index) => (
              <div key={index} className='border-l-2 border-gray-200 pl-4'>
                <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2'>
                  <h3
                    className='font-semibold text-lg'
                    style={{
                      color: getHeaderColor(),
                      fontSize: `${customization.fontSize.subheading}px`,
                    }}
                  >
                    <EditableField
                      value={project.name}
                      onChange={value => updateProject(index, 'name', value)}
                      placeholder='Project Name'
                    />
                  </h3>
                  <span
                    className='text-sm text-gray-600 mt-1 sm:mt-0'
                    style={{ fontSize: `${customization.fontSize.small}px` }}
                  >
                    <span className='text-gray-600'>Project</span>
                  </span>
                </div>
                <div className='mb-3'>
                  <EditableField
                    value={project.description}
                    onChange={value => updateProjectDescription(index, value)}
                    placeholder='Describe the project...'
                    multiline={true}
                    className='text-gray-700'
                  />
                </div>
                {project.technologies && (
                  <div
                    className='text-sm text-gray-600'
                    style={{ fontSize: `${customization.fontSize.small}px` }}
                  >
                    <strong>Technologies:</strong>{' '}
                    <EditableField
                      value={project.technologies.join(', ')}
                      onChange={value =>
                        updateProjectTechnologies(index, value)
                      }
                      placeholder='List technologies used...'
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </ResumeSection>
    </>
  );
};
