"use client";

import React, { useState } from "react";
import {
  CustomizationSettings,
  DEFAULT_THEMES,
  PRESET_CONFIGS,
  ATS_SAFE_FONTS,
} from "@/types/customization";

interface CustomizationSidebarProps {
  settings: CustomizationSettings;
  onUpdate: (settings: CustomizationSettings) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const CustomizationSidebar: React.FC<CustomizationSidebarProps> = ({
  settings,
  onUpdate,
  isOpen,
  onToggle,
}) => {
  const [activeTab, setActiveTab] = useState<"quick" | "advanced" | "sections">("quick");

  const applyPreset = (preset: "compact" | "normal" | "spacious") => {
    const config = PRESET_CONFIGS[preset];
    onUpdate({
      ...settings,
      preset,
      fontSize: config.fontSize,
      spacing: { ...settings.spacing, ...config.spacing },
      lineHeight: config.lineHeight,
    });
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="fixed right-4 top-4 z-40 p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg transition-all no-print"
        title={isOpen ? "Close Customization" : "Open Customization"}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
      </button>

      {/* Sidebar Panel */}
      <div
        className={`fixed right-0 top-0 h-screen w-80 bg-white shadow-2xl transform transition-transform duration-300 z-30 no-print ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 bg-indigo-600 text-white">
            <h2 className="text-xl font-bold mb-1">Customize</h2>
            <p className="text-xs text-white/80">Live preview as you change</p>
          </div>

          {/* Tabs */}
          <div className="flex border-b bg-gray-50">
            <button
              onClick={() => setActiveTab("quick")}
              className={`flex-1 px-4 py-3 text-sm font-semibold transition-colors ${
                activeTab === "quick"
                  ? "bg-white text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Quick
            </button>
            <button
              onClick={() => setActiveTab("advanced")}
              className={`flex-1 px-4 py-3 text-sm font-semibold transition-colors ${
                activeTab === "advanced"
                  ? "bg-white text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Advanced
            </button>
            <button
              onClick={() => setActiveTab("sections")}
              className={`flex-1 px-4 py-3 text-sm font-semibold transition-colors ${
                activeTab === "sections"
                  ? "bg-white text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Sections
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Quick Tab */}
            {activeTab === "quick" && (
              <>
                {/* Presets */}
                <div>
                  <h3 className="text-sm font-bold mb-3 text-gray-900">Layout Presets</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {(["compact", "normal", "spacious"] as const).map((preset) => (
                      <button
                        key={preset}
                        onClick={() => applyPreset(preset)}
                        className={`p-3 rounded-lg border-2 capitalize text-xs font-semibold transition-all ${
                          settings.preset === preset
                            ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                            : "border-gray-200 hover:border-gray-300 text-gray-700"
                        }`}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Themes */}
                <div>
                  <h3 className="text-sm font-bold mb-3 text-gray-900">Color Theme</h3>
                  <div className="space-y-2">
                    {DEFAULT_THEMES.map((theme) => (
                      <button
                        key={theme.name}
                        onClick={() => onUpdate({ ...settings, theme })}
                        className={`w-full p-3 rounded-lg border-2 transition-all flex items-center gap-3 ${
                          settings.theme.name === theme.name
                            ? "border-indigo-600 bg-indigo-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div
                          className="w-6 h-6 rounded"
                          style={{ backgroundColor: theme.primary }}
                        />
                        <span className="text-sm font-medium">{theme.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Family */}
                <div>
                  <h3 className="text-sm font-bold mb-3 text-gray-900">Font Family</h3>
                  <select
                    value={settings.fontFamily}
                    onChange={(e) => onUpdate({ ...settings, fontFamily: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:border-indigo-600 focus:outline-none"
                  >
                    {ATS_SAFE_FONTS.map((font) => (
                      <option key={font} value={font}>
                        {font}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Header Style */}
                <div>
                  <h3 className="text-sm font-bold mb-3 text-gray-900">Header Style</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {(["underline", "background", "border"] as const).map((style) => (
                      <button
                        key={style}
                        onClick={() => onUpdate({ ...settings, headerStyle: style })}
                        className={`p-2 rounded-lg border-2 capitalize text-xs font-semibold transition-all ${
                          settings.headerStyle === style
                            ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                            : "border-gray-200 hover:border-gray-300 text-gray-700"
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Show Icons */}
                <div>
                  <label className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-900">Show Contact Icons</span>
                    <input
                      type="checkbox"
                      checked={settings.showIcons}
                      onChange={(e) => onUpdate({ ...settings, showIcons: e.target.checked })}
                      className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                    />
                  </label>
                </div>

                {/* Bullet Style */}
                <div>
                  <h3 className="text-sm font-bold mb-3 text-gray-900">Bullet Style</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {(["disc", "circle", "square"] as const).map((style) => (
                      <button
                        key={style}
                        onClick={() => onUpdate({ ...settings, bulletStyle: style })}
                        className={`p-3 rounded-lg border-2 capitalize text-xs font-semibold transition-all ${
                          settings.bulletStyle === style
                            ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                            : "border-gray-200 hover:border-gray-300 text-gray-700"
                        }`}
                      >
                        {style === "disc" && "● Disc"}
                        {style === "circle" && "○ Circle"}
                        {style === "square" && "■ Square"}
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {(["arrow", "chevron"] as const).map((style) => (
                      <button
                        key={style}
                        onClick={() => onUpdate({ ...settings, bulletStyle: style })}
                        className={`p-3 rounded-lg border-2 capitalize text-xs font-semibold transition-all ${
                          settings.bulletStyle === style
                            ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                            : "border-gray-200 hover:border-gray-300 text-gray-700"
                        }`}
                      >
                        {style === "arrow" && "→ Arrow"}
                        {style === "chevron" && "› Chevron"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Heading Case */}
                <div>
                  <h3 className="text-sm font-bold mb-3 text-gray-900">Section Heading Style</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {(["normal", "uppercase", "capitalize"] as const).map((caseStyle) => (
                      <button
                        key={caseStyle}
                        onClick={() => onUpdate({ ...settings, headingCase: caseStyle })}
                        className={`p-2 rounded-lg border-2 text-xs font-semibold transition-all ${
                          settings.headingCase === caseStyle
                            ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                            : "border-gray-200 hover:border-gray-300 text-gray-700"
                        }`}
                      >
                        {caseStyle === "normal" && "Normal"}
                        {caseStyle === "uppercase" && "UPPER"}
                        {caseStyle === "capitalize" && "Title"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Show Dividers */}
                <div>
                  <label className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-900">Section Dividers</span>
                    <input
                      type="checkbox"
                      checked={settings.showDividers}
                      onChange={(e) => onUpdate({ ...settings, showDividers: e.target.checked })}
                      className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                    />
                  </label>
                </div>

                {/* Accent Color Picker */}
                <div>
                  <h3 className="text-sm font-bold mb-3 text-gray-900">Custom Accent Color</h3>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={settings.accentColor}
                      onChange={(e) => onUpdate({ ...settings, accentColor: e.target.value })}
                      className="w-16 h-10 rounded-lg border-2 border-gray-200 cursor-pointer"
                    />
                    <div className="flex-1">
                      <input
                        type="text"
                        value={settings.accentColor}
                        onChange={(e) => onUpdate({ ...settings, accentColor: e.target.value })}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-sm font-mono focus:border-indigo-600 focus:outline-none"
                        placeholder="#000000"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => onUpdate({ ...settings, accentColor: settings.theme.primary })}
                    className="mt-2 w-full text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Reset to theme color
                  </button>
                </div>
              </>
            )}

            {/* Advanced Tab */}
            {activeTab === "advanced" && (
              <>
                {/* Font Sizes */}
                <div>
                  <h3 className="text-sm font-bold mb-3 text-gray-900">Font Sizes</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-gray-700 flex justify-between mb-1">
                        <span>Name</span>
                        <span className="text-indigo-600">{settings.fontSize.name}px</span>
                      </label>
                      <input
                        type="range"
                        min="24"
                        max="40"
                        value={settings.fontSize.name}
                        onChange={(e) =>
                          onUpdate({
                            ...settings,
                            fontSize: { ...settings.fontSize, name: parseInt(e.target.value) },
                          })
                        }
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-700 flex justify-between mb-1">
                        <span>Headings</span>
                        <span className="text-indigo-600">{settings.fontSize.heading}px</span>
                      </label>
                      <input
                        type="range"
                        min="14"
                        max="24"
                        value={settings.fontSize.heading}
                        onChange={(e) =>
                          onUpdate({
                            ...settings,
                            fontSize: { ...settings.fontSize, heading: parseInt(e.target.value) },
                          })
                        }
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-700 flex justify-between mb-1">
                        <span>Body</span>
                        <span className="text-indigo-600">{settings.fontSize.body}px</span>
                      </label>
                      <input
                        type="range"
                        min="10"
                        max="16"
                        value={settings.fontSize.body}
                        onChange={(e) =>
                          onUpdate({
                            ...settings,
                            fontSize: { ...settings.fontSize, body: parseInt(e.target.value) },
                          })
                        }
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Line Heights */}
                <div>
                  <h3 className="text-sm font-bold mb-3 text-gray-900">Line Heights</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-gray-700 flex justify-between mb-1">
                        <span>Headings</span>
                        <span className="text-indigo-600">{settings.lineHeight.heading.toFixed(1)}</span>
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="2"
                        step="0.1"
                        value={settings.lineHeight.heading}
                        onChange={(e) =>
                          onUpdate({
                            ...settings,
                            lineHeight: { ...settings.lineHeight, heading: parseFloat(e.target.value) },
                          })
                        }
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-700 flex justify-between mb-1">
                        <span>Body Text</span>
                        <span className="text-indigo-600">{settings.lineHeight.body.toFixed(1)}</span>
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="2"
                        step="0.1"
                        value={settings.lineHeight.body}
                        onChange={(e) =>
                          onUpdate({
                            ...settings,
                            lineHeight: { ...settings.lineHeight, body: parseFloat(e.target.value) },
                          })
                        }
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-700 flex justify-between mb-1">
                        <span>Lists</span>
                        <span className="text-indigo-600">{settings.lineHeight.list.toFixed(1)}</span>
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="2.5"
                        step="0.1"
                        value={settings.lineHeight.list}
                        onChange={(e) =>
                          onUpdate({
                            ...settings,
                            lineHeight: { ...settings.lineHeight, list: parseFloat(e.target.value) },
                          })
                        }
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Spacing */}
                <div>
                  <h3 className="text-sm font-bold mb-3 text-gray-900">Spacing</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-gray-700 flex justify-between mb-1">
                        <span>Section Spacing</span>
                        <span className="text-indigo-600">{settings.spacing.section}px</span>
                      </label>
                      <input
                        type="range"
                        min="8"
                        max="32"
                        value={settings.spacing.section}
                        onChange={(e) =>
                          onUpdate({
                            ...settings,
                            spacing: { ...settings.spacing, section: parseInt(e.target.value) },
                          })
                        }
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-700 flex justify-between mb-1">
                        <span>Letter Spacing</span>
                        <span className="text-indigo-600">{settings.spacing.letterSpacing}px</span>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="2"
                        step="0.1"
                        value={settings.spacing.letterSpacing}
                        onChange={(e) =>
                          onUpdate({
                            ...settings,
                            spacing: { ...settings.spacing, letterSpacing: parseFloat(e.target.value) },
                          })
                        }
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-700 flex justify-between mb-1">
                        <span>Page Margin</span>
                        <span className="text-indigo-600">{settings.spacing.pageMargin}px</span>
                      </label>
                      <input
                        type="range"
                        min="24"
                        max="72"
                        value={settings.spacing.pageMargin}
                        onChange={(e) =>
                          onUpdate({
                            ...settings,
                            spacing: { ...settings.spacing, pageMargin: parseInt(e.target.value) },
                          })
                        }
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Border Width */}
                <div>
                  <label className="text-xs font-medium text-gray-700 flex justify-between mb-1">
                    <span className="font-bold text-sm text-gray-900">Border Width</span>
                    <span className="text-indigo-600">{settings.borderWidth}px</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="4"
                    value={settings.borderWidth}
                    onChange={(e) =>
                      onUpdate({ ...settings, borderWidth: parseInt(e.target.value) })
                    }
                    className="w-full"
                  />
                </div>

                {/* Icon Size */}
                {settings.showIcons && (
                  <div>
                    <label className="text-xs font-medium text-gray-700 flex justify-between mb-1">
                      <span className="font-bold text-sm text-gray-900">Icon Size</span>
                      <span className="text-indigo-600">{settings.iconSize}px</span>
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="20"
                      value={settings.iconSize}
                      onChange={(e) =>
                        onUpdate({ ...settings, iconSize: parseInt(e.target.value) })
                      }
                      className="w-full"
                    />
                  </div>
                )}
              </>
            )}

            {/* Sections Tab */}
            {activeTab === "sections" && (
              <div className="space-y-3">
                {settings.sections.map((section, index) => (
                  <div
                    key={section.id}
                    className="p-3 bg-gray-50 rounded-lg border-2 border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) => {
                          const newSections = [...settings.sections];
                          newSections[index] = { ...newSections[index], title: e.target.value };
                          onUpdate({ ...settings, sections: newSections });
                        }}
                        className="flex-1 text-sm font-semibold bg-transparent border-none focus:outline-none"
                      />
                      <button
                        onClick={() => {
                          const newSections = settings.sections.map((s) =>
                            s.id === section.id ? { ...s, visible: !s.visible } : s
                          );
                          onUpdate({ ...settings, sections: newSections });
                        }}
                        className={`px-3 py-1 rounded-md text-xs font-semibold ${
                          section.visible
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {section.visible ? "ON" : "OFF"}
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          if (index === 0) return;
                          const newSections = [...settings.sections];
                          [newSections[index - 1], newSections[index]] = [
                            newSections[index],
                            newSections[index - 1],
                          ];
                          newSections.forEach((s, i) => (s.order = i + 1));
                          onUpdate({ ...settings, sections: newSections });
                        }}
                        disabled={index === 0}
                        className="flex-1 px-2 py-1 bg-white border border-gray-300 rounded text-xs hover:bg-gray-50 disabled:opacity-30"
                      >
                        ⬆️ Up
                      </button>
                      <button
                        onClick={() => {
                          if (index === settings.sections.length - 1) return;
                          const newSections = [...settings.sections];
                          [newSections[index], newSections[index + 1]] = [
                            newSections[index + 1],
                            newSections[index],
                          ];
                          newSections.forEach((s, i) => (s.order = i + 1));
                          onUpdate({ ...settings, sections: newSections });
                        }}
                        disabled={index === settings.sections.length - 1}
                        className="flex-1 px-2 py-1 bg-white border border-gray-300 rounded text-xs hover:bg-gray-50 disabled:opacity-30"
                      >
                        ⬇️ Down
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t bg-gray-50">
            <p className="text-xs text-gray-600 text-center">
              ⚡ Changes applied instantly
            </p>
          </div>
        </div>
      </div>

      {/* Overlay when open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-20 no-print"
          onClick={onToggle}
        />
      )}
    </>
  );
};

export default CustomizationSidebar;

