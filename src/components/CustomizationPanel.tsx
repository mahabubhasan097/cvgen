"use client";

import React, { useState } from "react";
import {
  CustomizationSettings,
  DEFAULT_THEMES,
  SectionConfig,
} from "@/types/customization";

interface CustomizationPanelProps {
  settings: CustomizationSettings;
  onUpdate: (settings: CustomizationSettings) => void;
  onClose: () => void;
}

const CustomizationPanel: React.FC<CustomizationPanelProps> = ({
  settings,
  onUpdate,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<"theme" | "sections" | "spacing">(
    "theme"
  );

  const updateTheme = (themeName: string) => {
    const theme = DEFAULT_THEMES.find((t) => t.name === themeName);
    if (theme) {
      onUpdate({ ...settings, theme });
    }
  };

  const updateCustomColor = (field: keyof typeof settings.theme, color: string) => {
    onUpdate({
      ...settings,
      theme: { ...settings.theme, [field]: color },
    });
  };

  const toggleSection = (sectionId: string) => {
    const newSections = settings.sections.map((section) =>
      section.id === sectionId
        ? { ...section, visible: !section.visible }
        : section
    );
    onUpdate({ ...settings, sections: newSections });
  };

  const moveSectionUp = (index: number) => {
    if (index === 0) return;
    const newSections = [...settings.sections];
    [newSections[index - 1], newSections[index]] = [
      newSections[index],
      newSections[index - 1],
    ];
    newSections.forEach((section, idx) => {
      section.order = idx + 1;
    });
    onUpdate({ ...settings, sections: newSections });
  };

  const moveSectionDown = (index: number) => {
    if (index === settings.sections.length - 1) return;
    const newSections = [...settings.sections];
    [newSections[index], newSections[index + 1]] = [
      newSections[index + 1],
      newSections[index],
    ];
    newSections.forEach((section, idx) => {
      section.order = idx + 1;
    });
    onUpdate({ ...settings, sections: newSections });
  };

  const updateSectionTitle = (sectionId: string, title: string) => {
    const newSections = settings.sections.map((section) =>
      section.id === sectionId ? { ...section, title } : section
    );
    onUpdate({ ...settings, sections: newSections });
  };

  const updateFontSize = (field: keyof typeof settings.fontSize, value: number) => {
    onUpdate({
      ...settings,
      fontSize: { ...settings.fontSize, [field]: value },
    });
  };

  const updateSpacing = (field: keyof typeof settings.spacing, value: number) => {
    onUpdate({
      ...settings,
      spacing: { ...settings.spacing, [field]: value },
    });
  };

  const updateHeaderStyle = (style: typeof settings.headerStyle) => {
    onUpdate({ ...settings, headerStyle: style });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-scaleIn border border-purple-100">
        {/* Header */}
        <div className="flex items-center justify-between p-8 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
          <div>
            <h2 className="text-3xl font-bold text-white mb-1">Customize Resume</h2>
            <p className="text-white/80 text-sm">Make it uniquely yours ✨</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-all hover:rotate-90 duration-300 bg-white/10 hover:bg-white/20 p-2 rounded-full"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-50 px-4 pt-4">
          <button
            onClick={() => setActiveTab("theme")}
            className={`flex-1 px-6 py-4 font-semibold transition-all relative rounded-t-2xl ${
              activeTab === "theme"
                ? "bg-white text-purple-600 shadow-lg -mb-px"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              🎨 Theme & Colors
            </span>
            {activeTab === "theme" && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab("sections")}
            className={`flex-1 px-6 py-4 font-semibold transition-all relative rounded-t-2xl ${
              activeTab === "sections"
                ? "bg-white text-purple-600 shadow-lg -mb-px"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              📋 Sections
            </span>
            {activeTab === "sections" && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab("spacing")}
            className={`flex-1 px-6 py-4 font-semibold transition-all relative rounded-t-2xl ${
              activeTab === "spacing"
                ? "bg-white text-purple-600 shadow-lg -mb-px"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              📐 Typography
            </span>
            {activeTab === "spacing" && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
            )}
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Theme Tab */}
          {activeTab === "theme" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Preset Themes</h3>
                <div className="grid grid-cols-2 gap-3">
                  {DEFAULT_THEMES.map((theme) => (
                    <button
                      key={theme.name}
                      onClick={() => updateTheme(theme.name)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        settings.theme.name === theme.name
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded"
                          style={{ backgroundColor: theme.primary }}
                        />
                        <span className="font-medium">{theme.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Custom Colors</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="font-medium">Primary Color</label>
                    <input
                      type="color"
                      value={settings.theme.primary}
                      onChange={(e) => updateCustomColor("primary", e.target.value)}
                      className="w-16 h-10 rounded cursor-pointer"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="font-medium">Border Color</label>
                    <input
                      type="color"
                      value={settings.theme.border}
                      onChange={(e) => updateCustomColor("border", e.target.value)}
                      className="w-16 h-10 rounded cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Header Style</h3>
                <div className="grid grid-cols-3 gap-3">
                  {(["underline", "background", "border"] as const).map((style) => (
                    <button
                      key={style}
                      onClick={() => updateHeaderStyle(style)}
                      className={`p-3 rounded-lg border-2 capitalize transition-all ${
                        settings.headerStyle === style
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Sections Tab */}
          {activeTab === "sections" && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 mb-4">
                Toggle visibility, reorder sections, and customize titles
              </p>
              {settings.sections.map((section, index) => (
                <div
                  key={section.id}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => moveSectionUp(index)}
                      disabled={index === 0}
                      className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => moveSectionDown(index)}
                      disabled={index === settings.sections.length - 1}
                      className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" />
                      </svg>
                    </button>
                  </div>

                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                  />

                  <button
                    onClick={() => toggleSection(section.id)}
                    className={`px-4 py-2 rounded-md font-medium transition-colors ${
                      section.visible
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {section.visible ? "Visible" : "Hidden"}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Typography Tab */}
          {activeTab === "spacing" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Font Sizes</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Name Size: {settings.fontSize.name}px
                    </label>
                    <input
                      type="range"
                      min="24"
                      max="40"
                      value={settings.fontSize.name}
                      onChange={(e) =>
                        updateFontSize("name", parseInt(e.target.value))
                      }
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Heading Size: {settings.fontSize.heading}px
                    </label>
                    <input
                      type="range"
                      min="14"
                      max="24"
                      value={settings.fontSize.heading}
                      onChange={(e) =>
                        updateFontSize("heading", parseInt(e.target.value))
                      }
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Body Size: {settings.fontSize.body}px
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="16"
                      value={settings.fontSize.body}
                      onChange={(e) =>
                        updateFontSize("body", parseInt(e.target.value))
                      }
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Spacing</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Section Spacing: {settings.spacing.section}px
                    </label>
                    <input
                      type="range"
                      min="8"
                      max="32"
                      value={settings.spacing.section}
                      onChange={(e) =>
                        updateSpacing("section", parseInt(e.target.value))
                      }
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Line Spacing: {settings.spacing.line}px
                    </label>
                    <input
                      type="range"
                      min="2"
                      max="12"
                      value={settings.spacing.line}
                      onChange={(e) =>
                        updateSpacing("line", parseInt(e.target.value))
                      }
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Changes are applied instantly • Auto-saved
          </p>
          <button
            onClick={onClose}
            className="group px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Done
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizationPanel;

