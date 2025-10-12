"use client";

import React from "react";
import { CustomizationSettings, DEFAULT_THEMES, ATS_SAFE_FONTS } from "@/types/customization";
import { APP_VERSION } from "@/constants/version";

interface QuickCustomizerProps {
  settings: CustomizationSettings;
  onUpdate: (settings: CustomizationSettings) => void;
  onOpenFullPanel: () => void;
}

const QuickCustomizer: React.FC<QuickCustomizerProps> = ({
  settings,
  onUpdate,
  onOpenFullPanel,
}) => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 xl:left-[calc(50%+225px)] xl:-translate-x-1/2 z-30 no-print max-w-[95vw] xl:max-w-none">
      <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 p-3 xl:p-4 animate-fadeIn">
        <div className="flex items-center gap-2 xl:gap-4 flex-wrap lg:flex-nowrap justify-center">
          {/* Quick Style Presets */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-700">Layout</label>
            <div className="flex gap-1">
              {(["compact", "normal", "spacious"] as const).map((preset) => (
                <button
                  key={preset}
                  onClick={() => {
                    const config = {
                      compact: {
                        fontSize: { name: 28, heading: 16, body: 12 },
                        spacing: { section: 12, line: 4, letterSpacing: 0, pageMargin: 36, sectionPadding: 0 },
                        lineHeight: { heading: 1.1, body: 1.4, list: 1.5 },
                      },
                      normal: {
                        fontSize: { name: 30, heading: 18, body: 14 },
                        spacing: { section: 16, line: 6, letterSpacing: 0, pageMargin: 48, sectionPadding: 0 },
                        lineHeight: { heading: 1.2, body: 1.5, list: 1.6 },
                      },
                      spacious: {
                        fontSize: { name: 34, heading: 20, body: 15 },
                        spacing: { section: 24, line: 8, letterSpacing: 0.5, pageMargin: 60, sectionPadding: 8 },
                        lineHeight: { heading: 1.3, body: 1.6, list: 1.7 },
                      },
                    }[preset];
                    onUpdate({
                      ...settings,
                      preset,
                      fontSize: config.fontSize,
                      spacing: { ...settings.spacing, ...config.spacing },
                      lineHeight: config.lineHeight,
                    });
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    settings.preset === preset
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  title={`${preset.charAt(0).toUpperCase() + preset.slice(1)} layout`}
                >
                  {preset === "compact" && "📄"}
                  {preset === "normal" && "📃"}
                  {preset === "spacious" && "📰"}
                </button>
              ))}
            </div>
          </div>

          <div className="w-px h-10 bg-gray-300 hidden lg:block" />

          {/* Quick Color Themes */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-700">Theme</label>
            <div className="flex gap-1">
              {DEFAULT_THEMES.slice(0, 5).map((theme) => (
                <button
                  key={theme.name}
                  onClick={() => onUpdate({ ...settings, theme, accentColor: theme.primary })}
                  className={`w-8 h-8 rounded-lg border-2 transition-all hover:scale-110 ${
                    settings.theme.name === theme.name
                      ? "border-indigo-600 shadow-md scale-105"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: theme.primary }}
                  title={theme.name}
                />
              ))}
            </div>
          </div>

          <div className="w-px h-10 bg-gray-300 hidden lg:block" />

          {/* Font Family */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-700">Font</label>
            <select
              value={settings.fontFamily}
              onChange={(e) => onUpdate({ ...settings, fontFamily: e.target.value })}
              className="px-3 py-1.5 text-xs border-2 border-gray-200 rounded-lg focus:border-indigo-600 focus:outline-none bg-white font-medium"
            >
              {ATS_SAFE_FONTS.map((font) => (
                <option key={font} value={font}>
                  {font}
                </option>
              ))}
            </select>
          </div>

          <div className="w-px h-10 bg-gray-300 hidden lg:block" />

          {/* Font Size Quick Adjust */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-700">Size</label>
            <div className="flex gap-1">
              <button
                onClick={() =>
                  onUpdate({
                    ...settings,
                    fontSize: {
                      name: Math.max(24, settings.fontSize.name - 2),
                      heading: Math.max(14, settings.fontSize.heading - 1),
                      body: Math.max(10, settings.fontSize.body - 1),
                    },
                  })
                }
                className="px-2 py-1.5 text-xs font-bold bg-gray-100 hover:bg-gray-200 rounded-lg transition-all"
                title="Decrease font size"
              >
                A-
              </button>
              <button
                onClick={() =>
                  onUpdate({
                    ...settings,
                    fontSize: {
                      name: Math.min(40, settings.fontSize.name + 2),
                      heading: Math.min(24, settings.fontSize.heading + 1),
                      body: Math.min(16, settings.fontSize.body + 1),
                    },
                  })
                }
                className="px-2 py-1.5 text-xs font-bold bg-gray-100 hover:bg-gray-200 rounded-lg transition-all"
                title="Increase font size"
              >
                A+
              </button>
            </div>
          </div>

          <div className="w-px h-10 bg-gray-300 hidden lg:block" />

          {/* Header Style */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-700">Headers</label>
            <div className="flex gap-1">
              {(["underline", "background", "border"] as const).map((style) => (
                <button
                  key={style}
                  onClick={() => onUpdate({ ...settings, headerStyle: style })}
                  className={`px-2 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    settings.headerStyle === style
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  title={style}
                >
                  {style === "underline" && "═"}
                  {style === "background" && "▓"}
                  {style === "border" && "▭"}
                </button>
              ))}
            </div>
          </div>

          <div className="w-px h-10 bg-gray-300 hidden lg:block" />

          {/* Icons Toggle */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-700">Icons</label>
            <button
              onClick={() => onUpdate({ ...settings, showIcons: !settings.showIcons })}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                settings.showIcons
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {settings.showIcons ? "✓ ON" : "✗ OFF"}
            </button>
          </div>

          <div className="w-px h-10 bg-gray-300 hidden lg:block" />

          {/* More Options Button */}
          <button
            onClick={onOpenFullPanel}
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-semibold text-xs shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
            More Options
          </button>
        </div>

        {/* Info Text */}
        <div className="mt-2 text-center flex items-center justify-center gap-3">
          <p className="text-xs text-gray-500">
            ✨ <span className="font-semibold">Quick Customize</span> - Changes apply instantly
          </p>
          <span className="text-xs text-gray-400 font-mono">v{APP_VERSION}</span>
        </div>
      </div>
    </div>
  );
};

export default QuickCustomizer;

