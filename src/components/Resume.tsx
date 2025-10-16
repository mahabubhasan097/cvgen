"use client";

import React, { forwardRef } from "react";
import { ResumeData, WorkExperience, Education, Skill, Certification, Project } from "@/types/resume";
import { CustomizationSettings } from "@/types/customization";
import ResumeSection from "./ResumeSection";
import EditableField from "./EditableField";
import ActionButtons from "./ActionButtons";

interface ResumeProps {
  data: ResumeData;
  onUpdate: (data: ResumeData) => void;
  isEditable?: boolean;
  customization: CustomizationSettings;
}

/**
 * Resume Component
 * Main ATS-friendly single-column resume layout
 */
const Resume = forwardRef<HTMLDivElement, ResumeProps>(
  ({ data, onUpdate, isEditable = true, customization }, ref) => {
    // Helper function to get effective header color
    const getHeaderColor = () => {
      // If accentColor is set to a custom value (not the theme's primary), use it
      if (customization.accentColor && customization.accentColor !== customization.theme.primary) {
        return customization.accentColor;
      }
      // Otherwise, use theme's primary color
      return customization.theme.primary;
    };
    const updateContact = (field: keyof typeof data.contact, value: string) => {
      onUpdate({
        ...data,
        contact: { ...data.contact, [field]: value },
      });
    };

    const updateSummary = (value: string) => {
      onUpdate({ ...data, summary: value });
    };

    const updateExperience = (index: number, updatedExp: WorkExperience) => {
      const newExperience = [...data.experience];
      newExperience[index] = updatedExp;
      onUpdate({ ...data, experience: newExperience });
    };

    const updateExperienceAchievement = (
      expIndex: number,
      achIndex: number,
      value: string
    ) => {
      const newExperience = [...data.experience];
      const achievements = [...newExperience[expIndex].achievements];
      achievements[achIndex] = value;
      newExperience[expIndex] = {
        ...newExperience[expIndex],
        achievements,
      };
      onUpdate({ ...data, experience: newExperience });
    };

    const updateEducation = (index: number, field: string, value: string) => {
      const newEducation = [...data.education];
      newEducation[index] = { ...newEducation[index], [field]: value };
      onUpdate({ ...data, education: newEducation });
    };

    const updateSkillCategory = (index: number, value: string) => {
      const newSkills = [...data.skills];
      newSkills[index] = { ...newSkills[index], category: value };
      onUpdate({ ...data, skills: newSkills });
    };

    const updateSkillItems = (index: number, value: string) => {
      const newSkills = [...data.skills];
      const items = value.split(",").map((item) => item.trim());
      newSkills[index] = { ...newSkills[index], items };
      onUpdate({ ...data, skills: newSkills });
    };

    const updateCertification = (
      index: number,
      field: string,
      value: string
    ) => {
      const newCerts = [...(data.certifications || [])];
      newCerts[index] = { ...newCerts[index], [field]: value };
      onUpdate({ ...data, certifications: newCerts });
    };

    // Add/Remove functions
    const addExperience = () => {
      const newExp: WorkExperience = {
        id: `exp${Date.now()}`,
        company: "Company Name",
        position: "Job Title",
        location: "City, State",
        startDate: "Month Year",
        endDate: "Present",
        isCurrently: true,
        achievements: ["Achievement description"],
      };
      onUpdate({ ...data, experience: [...data.experience, newExp] });
    };

    const removeExperience = (index: number) => {
      if (data.experience.length <= 1) {
        alert("You must have at least one experience entry!");
        return;
      }
      const newExperience = data.experience.filter((_, i) => i !== index);
      onUpdate({ ...data, experience: newExperience });
    };

    const addAchievement = (expIndex: number) => {
      const newExperience = [...data.experience];
      newExperience[expIndex].achievements.push("New achievement");
      onUpdate({ ...data, experience: newExperience });
    };

    const removeAchievement = (expIndex: number, achIndex: number) => {
      const newExperience = [...data.experience];
      if (newExperience[expIndex].achievements.length <= 1) {
        alert("You must have at least one achievement!");
        return;
      }
      newExperience[expIndex].achievements = newExperience[expIndex].achievements.filter((_, i) => i !== achIndex);
      onUpdate({ ...data, experience: newExperience });
    };

    const addEducation = () => {
      const newEdu: Education = {
        id: `edu${Date.now()}`,
        institution: "University Name",
        degree: "Bachelor of Science",
        field: "Computer Science",
        location: "City, State",
        graduationDate: "Month Year",
      };
      onUpdate({ ...data, education: [...data.education, newEdu] });
    };

    const removeEducation = (index: number) => {
      if (data.education.length <= 1) {
        alert("You must have at least one education entry!");
        return;
      }
      const newEducation = data.education.filter((_, i) => i !== index);
      onUpdate({ ...data, education: newEducation });
    };

    const addSkill = () => {
      const newSkill: Skill = {
        id: `skill${Date.now()}`,
        category: "New Category",
        items: ["Skill 1", "Skill 2", "Skill 3"],
      };
      onUpdate({ ...data, skills: [...data.skills, newSkill] });
    };

    const removeSkill = (index: number) => {
      if (data.skills.length <= 1) {
        alert("You must have at least one skill category!");
        return;
      }
      const newSkills = data.skills.filter((_, i) => i !== index);
      onUpdate({ ...data, skills: newSkills });
    };

    const addCertification = () => {
      const newCert: Certification = {
        id: `cert${Date.now()}`,
        name: "Certification Name",
        issuer: "Issuing Organization",
        date: "Month Year",
      };
      onUpdate({ ...data, certifications: [...(data.certifications || []), newCert] });
    };

    const removeCertification = (index: number) => {
      const newCerts = (data.certifications || []).filter((_, i) => i !== index);
      onUpdate({ ...data, certifications: newCerts });
    };

    const addProject = () => {
      const newProject: Project = {
        id: `proj${Date.now()}`,
        name: "Project Name",
        description: "Project description",
        technologies: ["Tech 1", "Tech 2"],
      };
      onUpdate({ ...data, projects: [...(data.projects || []), newProject] });
    };

    const removeProject = (index: number) => {
      const newProjects = (data.projects || []).filter((_, i) => i !== index);
      onUpdate({ ...data, projects: newProjects });
    };

    const toggleContactField = (field: keyof typeof data.contact) => {
      const currentValue = data.contact[field];
      if (currentValue) {
        // Remove field
        onUpdate({
          ...data,
          contact: { ...data.contact, [field]: undefined },
        });
      } else {
        // Add field
        const defaultValues: Record<string, string> = {
          linkedin: "linkedin.com/in/yourprofile",
          github: "github.com/yourusername",
          portfolio: "yourportfolio.com",
        };
        onUpdate({
          ...data,
          contact: { ...data.contact, [field]: defaultValues[field] || "" },
        });
      }
    };

    const getSectionComponent = (sectionId: string) => {
      const section = customization.sections.find((s) => s.id === sectionId);
      if (!section || !section.visible) return null;

      const sectionStyle = {
        marginBottom: `${customization.spacing.section}px`,
      };

      switch (sectionId) {
        case "summary":
          return (
            <ResumeSection
              key="summary"
              title={section.title}
              customization={customization}
              style={sectionStyle}
            >
              {isEditable ? (
                <EditableField
                  value={data.summary}
                  onChange={updateSummary}
                  className="leading-relaxed"
                  style={{ fontSize: `${customization.fontSize.body}px` }}
                  multiline
                  as="p"
                />
              ) : (
                <p
                  className="leading-relaxed"
                  style={{ fontSize: `${customization.fontSize.body}px` }}
                >
                  {data.summary}
                </p>
              )}
            </ResumeSection>
          );
        case "experience":
          return (
            <ResumeSection
              key="experience"
              title={section.title}
              customization={customization}
              style={sectionStyle}
            >
              {data.experience.map((exp, index) => (
                <div key={exp.id} className="mb-4 last:mb-0 group relative">
                  {isEditable && (
                    <div className="absolute -left-8 top-0 opacity-0 group-hover:opacity-100 transition-opacity no-print">
                      <ActionButtons
                        onRemove={() => removeExperience(index)}
                        showAdd={false}
                      />
                    </div>
                  )}
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex-1">
                      {isEditable ? (
                        <EditableField
                          value={exp.position}
                          onChange={(value) =>
                            updateExperience(index, { ...exp, position: value })
                          }
                          className="font-bold"
                          style={{ 
                            fontSize: `${customization.fontSize.subheading || customization.fontSize.body + 2}px`,
                            color: customization.accentColor || customization.theme.primary
                          }}
                          as="h3"
                        />
                      ) : (
                        <h3
                          className="font-bold"
                          style={{ 
                            fontSize: `${customization.fontSize.subheading || customization.fontSize.body + 2}px`,
                            color: customization.accentColor || customization.theme.primary
                          }}
                        >
                          {exp.position}
                        </h3>
                      )}
                      <div>
                        {isEditable ? (
                          <>
                            <EditableField
                              value={exp.company}
                              onChange={(value) =>
                                updateExperience(index, { ...exp, company: value })
                              }
                              className="inline-block font-semibold"
                              style={{ 
                                fontSize: `${customization.fontSize.body}px`,
                                color: "#6B7280"
                              }}
                              as="span"
                            />
                            <span className="mx-1" style={{ fontSize: `${customization.fontSize.small || customization.fontSize.body}px` }}>|</span>
                            <EditableField
                              value={exp.location}
                              onChange={(value) =>
                                updateExperience(index, { ...exp, location: value })
                              }
                              className="inline-block"
                              style={{ 
                                fontSize: `${customization.fontSize.small || customization.fontSize.body}px`,
                                color: "#9CA3AF"
                              }}
                              as="span"
                            />
                          </>
                        ) : (
                          <>
                            <span 
                              className="font-semibold"
                              style={{ 
                                fontSize: `${customization.fontSize.body}px`,
                                color: "#6B7280"
                              }}
                            >
                              {exp.company}
                            </span>
                            <span className="mx-1" style={{ fontSize: `${customization.fontSize.small || customization.fontSize.body}px` }}>|</span>
                            <span
                              style={{ 
                                fontSize: `${customization.fontSize.small || customization.fontSize.body}px`,
                                color: "#9CA3AF"
                              }}
                            >
                              {exp.location}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div
                      className="text-right ml-4"
                      style={{ 
                        fontSize: `${customization.fontSize.small || customization.fontSize.body}px`,
                        color: "#9CA3AF"
                      }}
                    >
                      {isEditable ? (
                        <>
                          <EditableField
                            value={exp.startDate}
                            onChange={(value) =>
                              updateExperience(index, { ...exp, startDate: value })
                            }
                            className="inline-block"
                            as="span"
                          />
                          <span> - </span>
                          <EditableField
                            value={exp.endDate}
                            onChange={(value) =>
                              updateExperience(index, { ...exp, endDate: value })
                            }
                            className="inline-block"
                            as="span"
                          />
                        </>
                      ) : (
                        <>
                          {exp.startDate} - {exp.endDate}
                        </>
                      )}
                    </div>
                  </div>
                  <ul
                    className={`list-outside ml-5 ${
                      customization.bulletStyle === "disc" ? "list-disc" :
                      customization.bulletStyle === "circle" ? "list-circle" :
                      customization.bulletStyle === "square" ? "list-square" :
                      "list-none"
                    }`}
                    style={{
                      fontSize: `${customization.fontSize.body}px`,
                      lineHeight: `${customization.spacing.line * 3}px`,
                    }}
                  >
                    {exp.achievements.map((achievement, achIndex) => (
                      <li key={achIndex} className="group-item relative">
                        {(customization.bulletStyle === "arrow" || customization.bulletStyle === "chevron") && (
                          <span 
                            className="inline-block mr-2" 
                            style={{ color: "#6B7280" }}
                          >
                            {customization.bulletStyle === "arrow" ? "→" : "›"}
                          </span>
                        )}
                        {isEditable && (
                          <span className="absolute -left-6 top-0 opacity-0 group-item-hover:opacity-100">
                            <button
                              onClick={() => removeAchievement(index, achIndex)}
                              className="p-0.5 hover:bg-red-100 rounded no-print"
                              title="Remove"
                            >
                              <svg className="w-3 h-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </span>
                        )}
                        {isEditable ? (
                          <EditableField
                            value={achievement}
                            onChange={(value) =>
                              updateExperienceAchievement(index, achIndex, value)
                            }
                            className="inline"
                            multiline
                            as="span"
                          />
                        ) : (
                          achievement
                        )}
                      </li>
                    ))}
                    {isEditable && (
                      <li className="list-none mt-2 no-print">
                        <button
                          onClick={() => addAchievement(index)}
                          className="text-xs   flex items-center gap-1 font-medium"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Add Achievement
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
              ))}
              {isEditable && (
                <button
                  onClick={addExperience}
                  className="mt-4 w-full py-2 border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 rounded-lg text-sm font-medium  hover: transition-all no-print flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Experience
                </button>
              )}
            </ResumeSection>
          );
        case "education":
          return (
            <ResumeSection
              key="education"
              title={section.title}
              customization={customization}
              style={sectionStyle}
            >
              {data.education.map((edu, index) => (
                <div key={edu.id} className="mb-3 last:mb-0 group relative">
                  {isEditable && (
                    <div className="absolute -left-8 top-0 opacity-0 group-hover:opacity-100 transition-opacity no-print">
                      <ActionButtons
                        onRemove={() => removeEducation(index)}
                        showAdd={false}
                      />
                    </div>
                  )}
                  <div className="flex justify-between items-start">
                    <div>
                      {isEditable ? (
                        <>
                          <EditableField
                            value={edu.institution}
                            onChange={(value) =>
                              updateEducation(index, "institution", value)
                            }
                            className="font-bold"
                            style={{ 
                              fontSize: `${customization.fontSize.subheading || customization.fontSize.body + 2}px`,
                              color: customization.accentColor || customization.theme.primary
                            }}
                            as="h3"
                          />
                          <div>
                            <EditableField
                              value={edu.degree}
                              onChange={(value) =>
                                updateEducation(index, "degree", value)
                              }
                              className="inline-block"
                              style={{ 
                                fontSize: `${customization.fontSize.body}px`,
                                color: "#6B7280"
                              }}
                              as="span"
                            />
                            <span style={{ fontSize: `${customization.fontSize.body}px` }}> in </span>
                            <EditableField
                              value={edu.field}
                              onChange={(value) =>
                                updateEducation(index, "field", value)
                              }
                              className="inline-block"
                              style={{ 
                                fontSize: `${customization.fontSize.body}px`,
                                color: "#6B7280"
                              }}
                              as="span"
                            />
                            {edu.gpa && (
                              <>
                                <span style={{ fontSize: `${customization.fontSize.caption || customization.fontSize.body}px` }}> | GPA: </span>
                                <EditableField
                                  value={edu.gpa}
                                  onChange={(value) =>
                                    updateEducation(index, "gpa", value)
                                  }
                                  className="inline-block"
                                  style={{ 
                                    fontSize: `${customization.fontSize.caption || customization.fontSize.body}px`,
                                    color: "#D1D5DB"
                                  }}
                                  as="span"
                                />
                                <button
                                  onClick={() => {
                                    const newEducation = [...data.education];
                                    newEducation[index] = { ...newEducation[index], gpa: undefined };
                                    onUpdate({ ...data, education: newEducation });
                                  }}
                                  className="ml-1 text-red-500 hover:text-red-700 no-print"
                                  title="Remove GPA"
                                >
                                  <svg className="w-3 h-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </>
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          <h3
                            className="font-bold"
                            style={{ 
                              fontSize: `${customization.fontSize.subheading || customization.fontSize.body + 2}px`,
                              color: customization.accentColor || customization.theme.primary
                            }}
                          >
                            {edu.institution}
                          </h3>
                          <div>
                            <span style={{ 
                              fontSize: `${customization.fontSize.body}px`,
                              color: customization.theme.colors?.textSecondary || customization.theme.secondary
                            }}>
                              {edu.degree} in {edu.field}
                            </span>
                            {edu.gpa && (
                              <span style={{ 
                                fontSize: `${customization.fontSize.caption || customization.fontSize.body}px`,
                                color: "#D1D5DB"
                              }}>
                                {` | GPA: ${edu.gpa}`}
                              </span>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                    <div
                      className="ml-4"
                      style={{ 
                        fontSize: `${customization.fontSize.small || customization.fontSize.body}px`,
                        color: "#9CA3AF"
                      }}
                    >
                      {isEditable ? (
                        <EditableField
                          value={edu.graduationDate}
                          onChange={(value) =>
                            updateEducation(index, "graduationDate", value)
                          }
                          className="inline-block"
                          as="span"
                        />
                      ) : (
                        edu.graduationDate
                      )}
                    </div>
                  </div>
                  {/* Add GPA button if missing */}
                  {isEditable && !edu.gpa && (
                    <button
                      onClick={() => {
                        const newEducation = [...data.education];
                        newEducation[index] = { ...newEducation[index], gpa: "3.5/4.0" };
                        onUpdate({ ...data, education: newEducation });
                      }}
                      className="mt-1 text-xs   flex items-center gap-1 no-print"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Add GPA
                    </button>
                  )}
                </div>
              ))}
              {isEditable && (
                <button
                  onClick={addEducation}
                  className="mt-4 w-full py-2 border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 rounded-lg text-sm font-medium  hover: transition-all no-print flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Education
                </button>
              )}
            </ResumeSection>
          );
        case "skills":
          return (
            <ResumeSection
              key="skills"
              title={section.title}
              customization={customization}
              style={sectionStyle}
            >
              <div
                style={{
                  fontSize: `${customization.fontSize.body}px`,
                  lineHeight: `${customization.spacing.line * 3}px`,
                }}
              >
                {data.skills.map((skill, index) => (
                  <div key={skill.id} className="mb-2 group relative">
                    {isEditable && (
                      <div className="absolute -left-8 top-0 opacity-0 group-hover:opacity-100 transition-opacity no-print">
                        <ActionButtons
                          onRemove={() => removeSkill(index)}
                          showAdd={false}
                        />
                      </div>
                    )}
                    {isEditable ? (
                      <>
                        <EditableField
                          value={skill.category}
                          onChange={(value) => updateSkillCategory(index, value)}
                          className="inline-block font-semibold"
                          as="span"
                        />
                        <span>: </span>
                        <EditableField
                          value={skill.items.join(", ")}
                          onChange={(value) => updateSkillItems(index, value)}
                          className="inline"
                          multiline
                          as="span"
                        />
                      </>
                    ) : (
                      <>
                        <span className="font-semibold">{skill.category}:</span>
                        <span> {skill.items.join(", ")}</span>
                      </>
                    )}
                  </div>
                ))}
              </div>
              {isEditable && (
                <button
                  onClick={addSkill}
                  className="mt-4 w-full py-2 border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 rounded-lg text-sm font-medium  hover: transition-all no-print flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Skill Category
                </button>
              )}
            </ResumeSection>
          );
        case "certifications":
          return (
            <ResumeSection
              key="certifications"
              title={section.title}
              customization={customization}
              style={sectionStyle}
            >
              <div
                style={{
                  fontSize: `${customization.fontSize.body}px`,
                  lineHeight: `${customization.spacing.line * 3}px`,
                }}
              >
                {(data.certifications && data.certifications.length > 0) ? data.certifications.map((cert, index) => (
                  <div key={cert.id} className="mb-2 group relative">
                    {isEditable && (
                      <div className="absolute -left-8 top-0 opacity-0 group-hover:opacity-100 transition-opacity no-print">
                        <ActionButtons
                          onRemove={() => removeCertification(index)}
                          showAdd={false}
                        />
                      </div>
                    )}
                    {isEditable ? (
                      <>
                        <EditableField
                          value={cert.name}
                          onChange={(value) =>
                            updateCertification(index, "name", value)
                          }
                          className="inline-block font-semibold"
                          as="span"
                        />
                        <span> - </span>
                        <EditableField
                          value={cert.issuer}
                          onChange={(value) =>
                            updateCertification(index, "issuer", value)
                          }
                          className="inline-block"
                          as="span"
                        />
                        <span> | </span>
                        <EditableField
                          value={cert.date}
                          onChange={(value) =>
                            updateCertification(index, "date", value)
                          }
                          className="inline-block"
                          as="span"
                        />
                        {cert.credentialId && (
                          <>
                            <span> | ID: </span>
                            <EditableField
                              value={cert.credentialId}
                              onChange={(value) =>
                                updateCertification(index, "credentialId", value)
                              }
                              className="inline-block"
                              as="span"
                            />
                            <button
                              onClick={() => {
                                const newCerts = [...(data.certifications || [])];
                                newCerts[index] = { ...newCerts[index], credentialId: undefined };
                                onUpdate({ ...data, certifications: newCerts });
                              }}
                              className="ml-1 text-red-500 hover:text-red-700 no-print"
                              title="Remove Credential ID"
                            >
                              <svg className="w-3 h-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </>
                        )}
                        {!cert.credentialId && (
                          <button
                            onClick={() => {
                              const newCerts = [...(data.certifications || [])];
                              newCerts[index] = { ...newCerts[index], credentialId: "CERT-12345" };
                              onUpdate({ ...data, certifications: newCerts });
                            }}
                            className="ml-2 text-xs   no-print"
                          >
                            + Add ID
                          </button>
                        )}
                      </>
                    ) : (
                      <>
                        <span className="font-semibold">{cert.name}</span>
                        <span> - </span>
                        <span>{cert.issuer}</span>
                        <span> | {cert.date}</span>
                        {cert.credentialId && <span> | ID: {cert.credentialId}</span>}
                      </>
                    )}
                  </div>
                )) : isEditable && (
                  <p className="text-sm italic" style={{ color: customization.theme.colors?.textMuted || "#9CA3AF" }}>No certifications added yet. Click "Add Certification" below.</p>
                )}
              </div>
              {isEditable && (
                <button
                  onClick={addCertification}
                  className="mt-4 w-full py-2 border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 rounded-lg text-sm font-medium  hover: transition-all no-print flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Certification
                </button>
              )}
            </ResumeSection>
          );
        case "projects":
          return (
            <ResumeSection
              key="projects"
              title={section.title}
              customization={customization}
              style={sectionStyle}
            >
              <div
                style={{
                  fontSize: `${customization.fontSize.body}px`,
                  lineHeight: `${customization.spacing.line * 2.5}px`,
                }}
              >
                {(data.projects && data.projects.length > 0) ? data.projects.map((project, index) => (
                  <div key={project.id} className="mb-3 last:mb-0 group relative">
                    {isEditable && (
                      <div className="absolute -left-8 top-0 opacity-0 group-hover:opacity-100 transition-opacity no-print">
                        <ActionButtons
                          onRemove={() => removeProject(index)}
                          showAdd={false}
                        />
                      </div>
                    )}
                    {isEditable ? (
                      <>
                        <div className="flex items-start justify-between gap-2">
                          <EditableField
                            value={project.name}
                            onChange={(value) => {
                              const newProjects = [...(data.projects || [])];
                              newProjects[index] = { ...newProjects[index], name: value };
                              onUpdate({ ...data, projects: newProjects });
                            }}
                            className="font-bold flex-1"
                            style={{ fontSize: `${customization.fontSize.body + 2}px` }}
                            as="h3"
                          />
                          {project.link && (
                            <a 
                              href={project.link.startsWith('http') ? project.link : `https://${project.link}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className=" hover:underline text-xs flex items-center gap-1"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                              Link
                            </a>
                          )}
                        </div>
                        <div className="mt-2">
                          <EditableField
                            value={project.description}
                            onChange={(value) => {
                              const newProjects = [...(data.projects || [])];
                              newProjects[index] = { ...newProjects[index], description: value };
                              onUpdate({ ...data, projects: newProjects });
                            }}
                            className="leading-relaxed"
                            style={{ lineHeight: '1.6' }}
                            multiline
                            as="p"
                          />
                        </div>
                        <div className="text-sm  mt-2">
                          <span className="font-semibold">Technologies: </span>
                          <EditableField
                            value={project.technologies.join(", ")}
                            onChange={(value) => {
                              const newProjects = [...(data.projects || [])];
                              newProjects[index] = { 
                                ...newProjects[index], 
                                technologies: value.split(",").map(t => t.trim()) 
                              };
                              onUpdate({ ...data, projects: newProjects });
                            }}
                            className="inline"
                            as="span"
                          />
                        </div>
                        {project.link && (
                          <div className="text-sm  mt-1">
                            <span className="font-semibold">Link: </span>
                            <EditableField
                              value={project.link}
                              onChange={(value) => {
                                const newProjects = [...(data.projects || [])];
                                newProjects[index] = { ...newProjects[index], link: value };
                                onUpdate({ ...data, projects: newProjects });
                              }}
                              className="inline "
                              as="span"
                            />
                            <button
                              onClick={() => {
                                const newProjects = [...(data.projects || [])];
                                newProjects[index] = { ...newProjects[index], link: undefined };
                                onUpdate({ ...data, projects: newProjects });
                              }}
                              className="ml-1 text-red-500 hover:text-red-700 no-print"
                              title="Remove Link"
                            >
                              <svg className="w-3 h-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        )}
                        {!project.link && (
                          <button
                            onClick={() => {
                              const newProjects = [...(data.projects || [])];
                              newProjects[index] = { ...newProjects[index], link: "https://project-url.com" };
                              onUpdate({ ...data, projects: newProjects });
                            }}
                            className="mt-2 text-xs   flex items-center gap-1 no-print"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                            Add Project Link
                          </button>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-bold flex-1" style={{ fontSize: `${customization.fontSize.body + 2}px` }}>
                            {project.name}
                          </h3>
                          {project.link && (
                            <a 
                              href={project.link.startsWith('http') ? project.link : `https://${project.link}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className=" hover:underline text-xs flex items-center gap-1"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                              Link
                            </a>
                          )}
                        </div>
                        <p className="mt-1.5 leading-relaxed" style={{ lineHeight: '1.6', color: "#374151" }}>{project.description}</p>
                        <div className="text-sm mt-2" style={{ color: "#9CA3AF" }}>
                          <span className="font-semibold">Technologies: </span>
                          {project.technologies.join(", ")}
                        </div>
                      </>
                    )}
                  </div>
                )) : isEditable && (
                  <p className="text-sm italic" style={{ color: customization.theme.colors?.textMuted || "#9CA3AF" }}>No projects added yet. Click "Add Project" below.</p>
                )}
              </div>
              {isEditable && (
                <button
                  onClick={addProject}
                  className="mt-4 w-full py-2 border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 rounded-lg text-sm font-medium  hover: transition-all no-print flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Project
                </button>
              )}
            </ResumeSection>
          );
        default:
          return null;
      }
    };

    const visibleSections = customization.sections
      .filter((s) => s.visible)
      .sort((a, b) => a.order - b.order);

    return (
      <div
        ref={ref}
        className="max-w-[8.5in] mx-auto bg-white shadow-lg print:shadow-none print:p-0"
        style={{
          minHeight: "11in",
          color: "#374151", // Neutral gray for body text
          fontFamily: customization.fontFamily,
          letterSpacing: `${customization.spacing.letterSpacing}px`,
          padding: `${customization.spacing.pageMargin}px`,
        }}
      >
        {/* Header / Contact Section */}
        <header className="mb-5">
          {isEditable ? (
            <EditableField
              value={data.contact.fullName}
              onChange={(value) => updateContact("fullName", value)}
              className="font-bold mb-1.5"
              style={{
                fontSize: `${customization.fontSize.name}px`,
                color: getHeaderColor(),
              }}
              as="h1"
            />
          ) : (
            <h1
              className="font-bold mb-1.5"
              style={{
                fontSize: `${customization.fontSize.name}px`,
                color: getHeaderColor(),
              }}
            >
              {data.contact.fullName}
            </h1>
          )}

          <div 
            className="flex flex-wrap gap-3 items-center print:hidden"
            style={{ 
              fontSize: `${customization.fontSize.caption || 11}px`,
              color: customization.theme.colors?.textMuted || "#9CA3AF"
            }}
          >
            {isEditable ? (
              <>
                <span className="flex items-center gap-1">
                  {customization.showIcons && (
                    <svg style={{ width: `${customization.iconSize}px`, height: `${customization.iconSize}px`, color: customization.theme.colors?.textMuted || "#9CA3AF" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )}
                  <EditableField
                    value={data.contact.email}
                    onChange={(value) => updateContact("email", value)}
                    className="inline-block"
                    as="span"
                  />
                </span>
                <span className="flex items-center gap-1">
                  {customization.showIcons && (
                    <svg style={{ width: `${customization.iconSize}px`, height: `${customization.iconSize}px`, color: customization.theme.colors?.textMuted || "#9CA3AF" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  )}
                  <EditableField
                    value={data.contact.phone}
                    onChange={(value) => updateContact("phone", value)}
                    className="inline-block"
                    as="span"
                  />
                </span>
                <span className="flex items-center gap-1">
                  {customization.showIcons && (
                    <svg style={{ width: `${customization.iconSize}px`, height: `${customization.iconSize}px`, color: customization.theme.colors?.textMuted || "#9CA3AF" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                  <EditableField
                    value={data.contact.location}
                    onChange={(value) => updateContact("location", value)}
                    className="inline-block"
                    as="span"
                  />
                </span>
                {data.contact.linkedin && (
                  <span className="flex items-center gap-1">
                    {customization.showIcons && (
                      <svg style={{ width: `${customization.iconSize}px`, height: `${customization.iconSize}px`, color: customization.theme.colors?.textMuted || "#9CA3AF" }} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    )}
                    <EditableField
                      value={data.contact.linkedin}
                      onChange={(value) => updateContact("linkedin", value)}
                      className="inline-block"
                      as="span"
                    />
                  </span>
                )}
                {data.contact.github && (
                  <span className="flex items-center gap-1">
                    {customization.showIcons && (
                      <svg style={{ width: `${customization.iconSize}px`, height: `${customization.iconSize}px`, color: customization.theme.colors?.textMuted || "#9CA3AF" }} fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    )}
                    <EditableField
                      value={data.contact.github}
                      onChange={(value) => updateContact("github", value)}
                      className="inline-block"
                      as="span"
                    />
                  </span>
                )}
                {data.contact.portfolio && (
                  <span className="flex items-center gap-1">
                    {customization.showIcons && (
                      <svg style={{ width: `${customization.iconSize}px`, height: `${customization.iconSize}px`, color: customization.theme.colors?.textMuted || "#9CA3AF" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    )}
                    <EditableField
                      value={data.contact.portfolio}
                      onChange={(value) => updateContact("portfolio", value)}
                      className="inline-block"
                      as="span"
                    />
                  </span>
                )}
              </>
            ) : (
              <>
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href={`mailto:${data.contact.email}`} className="hover:underline">{data.contact.email}</a>
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{data.contact.phone}</span>
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{data.contact.location}</span>
                </span>
                {data.contact.linkedin && (
                  <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 " fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      <a 
                        href={data.contact.linkedin.startsWith('http') ? data.contact.linkedin : `https://${data.contact.linkedin}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {data.contact.linkedin}
                      </a>
                    </span>
                )}
                {data.contact.github && (
                  <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 " fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                      <a 
                        href={data.contact.github.startsWith('http') ? data.contact.github : `https://${data.contact.github}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {data.contact.github}
                      </a>
                    </span>
                )}
                {data.contact.portfolio && (
                  <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      <a 
                        href={data.contact.portfolio.startsWith('http') ? data.contact.portfolio : `https://${data.contact.portfolio}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {data.contact.portfolio}
                      </a>
                    </span>
                )}
              </>
            )}
          </div>

          {/* Print-only version with clickable links */}
          <div 
            className="hidden print:flex flex-wrap gap-3 items-center" 
            style={{ 
              marginTop: '0.25rem',
              fontSize: `${customization.fontSize.caption || 11}px`,
              color: customization.theme.colors?.textMuted || "#9CA3AF"
            }}
          >
            <span className="flex items-center gap-1">
              {customization.showIcons && (
                <svg style={{ width: `${customization.iconSize}px`, height: `${customization.iconSize}px`, color: customization.theme.colors?.textMuted || "#9CA3AF" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              )}
              <a href={`mailto:${data.contact.email}`}>{data.contact.email}</a>
            </span>
            <span className="flex items-center gap-1">
              {customization.showIcons && (
                <svg style={{ width: `${customization.iconSize}px`, height: `${customization.iconSize}px`, color: customization.theme.colors?.textMuted || "#9CA3AF" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              )}
              <span>{data.contact.phone}</span>
            </span>
            <span className="flex items-center gap-1">
              {customization.showIcons && (
                <svg style={{ width: `${customization.iconSize}px`, height: `${customization.iconSize}px`, color: customization.theme.colors?.textMuted || "#9CA3AF" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
              <span>{data.contact.location}</span>
            </span>
            {data.contact.linkedin && (
              <span className="flex items-center gap-1">
                {customization.showIcons && (
                  <svg style={{ width: `${customization.iconSize}px`, height: `${customization.iconSize}px`, color: customization.theme.colors?.textMuted || "#9CA3AF" }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                )}
                <a 
                  href={data.contact.linkedin.startsWith('http') ? data.contact.linkedin : `https://${data.contact.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {data.contact.linkedin}
                </a>
              </span>
            )}
            {data.contact.github && (
              <span className="flex items-center gap-1">
                {customization.showIcons && (
                  <svg style={{ width: `${customization.iconSize}px`, height: `${customization.iconSize}px`, color: customization.theme.colors?.textMuted || "#9CA3AF" }} fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                )}
                <a 
                  href={data.contact.github.startsWith('http') ? data.contact.github : `https://${data.contact.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {data.contact.github}
                </a>
              </span>
            )}
            {data.contact.portfolio && (
              <span className="flex items-center gap-1">
                {customization.showIcons && (
                  <svg style={{ width: `${customization.iconSize}px`, height: `${customization.iconSize}px`, color: customization.theme.colors?.textMuted || "#9CA3AF" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                )}
                <a 
                  href={data.contact.portfolio.startsWith('http') ? data.contact.portfolio : `https://${data.contact.portfolio}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {data.contact.portfolio}
                </a>
              </span>
            )}
          </div>

          {/* Add Missing Contact Fields */}
          {isEditable && (
            <div className="mt-3 flex flex-wrap gap-2 no-print">
              {!data.contact.linkedin && (
                <button
                  onClick={() => toggleContactField("linkedin")}
                  className="text-xs px-3 py-1.5 bg-blue-50 hover:bg-blue-100 rounded-full font-medium transition-colors flex items-center gap-1"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  + Add LinkedIn
                </button>
              )}
              {!data.contact.github && (
                <button
                  onClick={() => toggleContactField("github")}
                  className="text-xs px-3 py-1.5 bg-gray-50 hover:bg-gray-100  rounded-full font-medium transition-colors flex items-center gap-1"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  + Add GitHub
                </button>
              )}
              {!data.contact.portfolio && (
                <button
                  onClick={() => toggleContactField("portfolio")}
                  className="text-xs px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-full font-medium transition-colors flex items-center gap-1"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  + Add Portfolio
                </button>
              )}
            </div>
          )}
        </header>

        {/* Dynamic Sections */}
        {visibleSections.map((section) => getSectionComponent(section.id))}
      </div>
    );
  }
);

Resume.displayName = "Resume";

export default Resume;
