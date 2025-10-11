"use client";

import React, { forwardRef } from "react";
import { ResumeData, WorkExperience } from "@/types/resume";
import { CustomizationSettings } from "@/types/customization";
import ResumeSection from "./ResumeSection";
import EditableField from "./EditableField";

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
                <div key={exp.id} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex-1">
                      {isEditable ? (
                        <EditableField
                          value={exp.position}
                          onChange={(value) =>
                            updateExperience(index, { ...exp, position: value })
                          }
                          className="font-bold"
                          style={{ fontSize: `${customization.fontSize.body + 2}px` }}
                          as="h3"
                        />
                      ) : (
                        <h3
                          className="font-bold"
                          style={{ fontSize: `${customization.fontSize.body + 2}px` }}
                        >
                          {exp.position}
                        </h3>
                      )}
                      <div style={{ fontSize: `${customization.fontSize.body}px` }}>
                        {isEditable ? (
                          <>
                            <EditableField
                              value={exp.company}
                              onChange={(value) =>
                                updateExperience(index, { ...exp, company: value })
                              }
                              className="inline-block font-semibold"
                              as="span"
                            />
                            <span className="mx-1">|</span>
                            <EditableField
                              value={exp.location}
                              onChange={(value) =>
                                updateExperience(index, { ...exp, location: value })
                              }
                              className="inline-block"
                              as="span"
                            />
                          </>
                        ) : (
                          <>
                            <span className="font-semibold">{exp.company}</span>
                            <span className="mx-1">|</span>
                            <span>{exp.location}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div
                      className="text-right ml-4"
                      style={{ fontSize: `${customization.fontSize.body}px` }}
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
                    className="list-disc list-outside ml-5"
                    style={{
                      fontSize: `${customization.fontSize.body}px`,
                      lineHeight: `${customization.spacing.line * 3}px`,
                    }}
                  >
                    {exp.achievements.map((achievement, achIndex) => (
                      <li key={achIndex}>
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
                  </ul>
                </div>
              ))}
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
                <div key={edu.id} className="mb-3 last:mb-0">
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
                            style={{ fontSize: `${customization.fontSize.body + 2}px` }}
                            as="h3"
                          />
                          <div style={{ fontSize: `${customization.fontSize.body}px` }}>
                            <EditableField
                              value={edu.degree}
                              onChange={(value) =>
                                updateEducation(index, "degree", value)
                              }
                              className="inline-block"
                              as="span"
                            />
                            <span> in </span>
                            <EditableField
                              value={edu.field}
                              onChange={(value) =>
                                updateEducation(index, "field", value)
                              }
                              className="inline-block"
                              as="span"
                            />
                            {edu.gpa && (
                              <>
                                <span> | GPA: </span>
                                <EditableField
                                  value={edu.gpa}
                                  onChange={(value) =>
                                    updateEducation(index, "gpa", value)
                                  }
                                  className="inline-block"
                                  as="span"
                                />
                              </>
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          <h3
                            className="font-bold"
                            style={{ fontSize: `${customization.fontSize.body + 2}px` }}
                          >
                            {edu.institution}
                          </h3>
                          <div style={{ fontSize: `${customization.fontSize.body}px` }}>
                            {edu.degree} in {edu.field}
                            {edu.gpa && ` | GPA: ${edu.gpa}`}
                          </div>
                        </>
                      )}
                    </div>
                    <div
                      className="ml-4"
                      style={{ fontSize: `${customization.fontSize.body}px` }}
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
                </div>
              ))}
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
                  <div key={skill.id} className="mb-2">
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
            </ResumeSection>
          );
        case "certifications":
          return data.certifications && data.certifications.length > 0 ? (
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
                {data.certifications.map((cert, index) => (
                  <div key={cert.id} className="mb-2">
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
                          </>
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
                ))}
              </div>
            </ResumeSection>
          ) : null;
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
        className="max-w-[8.5in] mx-auto bg-white p-12 shadow-lg print:shadow-none print:p-0"
        style={{
          minHeight: "11in",
          color: customization.theme.text,
        }}
      >
        {/* Header / Contact Section */}
        <header className="mb-6">
          {isEditable ? (
            <EditableField
              value={data.contact.fullName}
              onChange={(value) => updateContact("fullName", value)}
              className="font-bold mb-2"
              style={{
                fontSize: `${customization.fontSize.name}px`,
                color: customization.theme.primary,
              }}
              as="h1"
            />
          ) : (
            <h1
              className="font-bold mb-2"
              style={{
                fontSize: `${customization.fontSize.name}px`,
                color: customization.theme.primary,
              }}
            >
              {data.contact.fullName}
            </h1>
          )}

          <div className="flex flex-wrap gap-3 text-sm text-gray-700">
            {isEditable ? (
              <>
                <EditableField
                  value={data.contact.email}
                  onChange={(value) => updateContact("email", value)}
                  className="inline-block"
                  as="span"
                />
                <span>•</span>
                <EditableField
                  value={data.contact.phone}
                  onChange={(value) => updateContact("phone", value)}
                  className="inline-block"
                  as="span"
                />
                <span>•</span>
                <EditableField
                  value={data.contact.location}
                  onChange={(value) => updateContact("location", value)}
                  className="inline-block"
                  as="span"
                />
                {data.contact.linkedin && (
                  <>
                    <span>•</span>
                    <EditableField
                      value={data.contact.linkedin}
                      onChange={(value) => updateContact("linkedin", value)}
                      className="inline-block"
                      as="span"
                    />
                  </>
                )}
                {data.contact.github && (
                  <>
                    <span>•</span>
                    <EditableField
                      value={data.contact.github}
                      onChange={(value) => updateContact("github", value)}
                      className="inline-block"
                      as="span"
                    />
                  </>
                )}
                {data.contact.portfolio && (
                  <>
                    <span>•</span>
                    <EditableField
                      value={data.contact.portfolio}
                      onChange={(value) => updateContact("portfolio", value)}
                      className="inline-block"
                      as="span"
                    />
                  </>
                )}
              </>
            ) : (
              <>
                <span>{data.contact.email}</span>
                <span>•</span>
                <span>{data.contact.phone}</span>
                <span>•</span>
                <span>{data.contact.location}</span>
                {data.contact.linkedin && (
                  <>
                    <span>•</span>
                    <span>{data.contact.linkedin}</span>
                  </>
                )}
                {data.contact.github && (
                  <>
                    <span>•</span>
                    <span>{data.contact.github}</span>
                  </>
                )}
                {data.contact.portfolio && (
                  <>
                    <span>•</span>
                    <span>{data.contact.portfolio}</span>
                  </>
                )}
              </>
            )}
          </div>
        </header>

        {/* Dynamic Sections */}
        {visibleSections.map((section) => getSectionComponent(section.id))}
      </div>
    );
  }
);

Resume.displayName = "Resume";

export default Resume;
