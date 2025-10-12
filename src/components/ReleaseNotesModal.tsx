"use client";

import React from "react";

interface ReleaseNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  version: string;
}

const ReleaseNotesModal: React.FC<ReleaseNotesModalProps> = ({
  isOpen,
  onClose,
  version,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 no-print" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">What's New in CVGen</h2>
                  <p className="text-sm text-white/80">Version {version}</p>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="p-6 overflow-y-auto flex-1 min-h-0">
          {/* Version 1.0.0 Content */}
          {version === "1.0.0" && (
            <div className="space-y-6">
              {/* Highlights */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-2xl">🎉</span>
                  Major Release - Advanced Customization System
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  CVGen now features the most comprehensive customization system available in any open-source resume builder. 
                  With 30+ options, dual-interface controls, and real-time feedback, creating your perfect resume is easier than ever!
                </p>
              </div>

              {/* What's New */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">✨ What's New</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-indigo-50 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Quick Customizer Toolbar</h4>
                      <p className="text-sm text-gray-700 mt-1">
                        Always-visible floating toolbar at the bottom with instant access to layout presets, 
                        themes, fonts, font sizing, header styles, and icon toggles.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Advanced Customization Sidebar</h4>
                      <p className="text-sm text-gray-700 mt-1">
                        Comprehensive 3-tab panel (Quick, Advanced, Sections) with precise controls for fonts, 
                        spacing, bullets, colors, and section management.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">30+ Customization Options</h4>
                      <p className="text-sm text-gray-700 mt-1">
                        5 bullet styles, 3 header styles, custom accent colors, heading cases, dividers, 
                        7 fonts, 5 themes, 3 layouts, and full typography control.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Visual Feedback System</h4>
                      <p className="text-sm text-gray-700 mt-1">
                        Toast notifications appear for every customization change, showing exactly what was modified. 
                        Beautiful animations and auto-dismiss.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Features */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">🎨 Customization Options</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-600">✓</span>
                    <span>5 Color Themes</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-600">✓</span>
                    <span>5 Bullet Styles</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-600">✓</span>
                    <span>3 Layout Presets</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-600">✓</span>
                    <span>3 Header Styles</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-600">✓</span>
                    <span>7 ATS-Safe Fonts</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-600">✓</span>
                    <span>Custom Accent Color</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-600">✓</span>
                    <span>Font Size Controls</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-600">✓</span>
                    <span>Spacing Controls</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-600">✓</span>
                    <span>Section Management</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-600">✓</span>
                    <span>And More...</span>
                  </div>
                </div>
              </div>

              {/* Quick Tips */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-xl border-2 border-yellow-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-xl">💡</span>
                  Quick Start Tips
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold">1.</span>
                    <span>Look at the <strong>bottom toolbar</strong> for quick customization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold">2.</span>
                    <span>Try different <strong>layout presets</strong> (📄 📃 📰)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold">3.</span>
                    <span>Click <strong>"More Options"</strong> for advanced controls</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold">4.</span>
                    <span>All changes save automatically - experiment freely!</span>
                  </li>
                </ul>
              </div>

              {/* Bug Fixes */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">🐛 Bug Fixes</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Fixed icon visibility consistency across all contact fields</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Fixed toolbar overlap with footer on mobile devices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Fixed backward compatibility with old saved data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Improved responsive design across all screen sizes</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Fallback for other versions */}
          {version !== "1.0.0" && (
            <div className="text-center py-8">
              <p className="text-gray-600">Release notes for version {version}</p>
              <p className="text-sm text-gray-500 mt-2">Check CHANGELOG.md for details</p>
            </div>
          )}
        </div>

        {/* Footer - Always Visible */}
        <div className="border-t bg-gray-50 p-4 flex items-center justify-between flex-shrink-0">
          <div className="text-sm text-gray-600">
            Released: October 12, 2025
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors shadow-md"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReleaseNotesModal;

