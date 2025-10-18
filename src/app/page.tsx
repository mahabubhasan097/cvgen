'use client';

import React, { useState, useEffect, useRef } from 'react';
import { TemplateRenderer } from '@/components/templates/TemplateEngine';
import CustomizationSidebar from '@/components/CustomizationSidebar';
import QuickCustomizer from '@/components/QuickCustomizer';
import CustomizationToast from '@/components/CustomizationToast';
import ReleaseNotesModal from '@/components/ReleaseNotesModal';
import PDFInstructions from '@/components/PDFInstructions';
import { ResumeData } from '@/types/resume';
import {
  CustomizationSettings,
  DEFAULT_CUSTOMIZATION,
} from '@/types/customization';
import { DEFAULT_RESUME } from '@/constants/defaultResume';
import { APP_VERSION, isNewVersion } from '@/constants/version';
import {
  saveResumeToStorage,
  loadResumeFromStorage,
  clearResumeFromStorage,
  exportResumeAsJson,
  importResumeFromJson,
  saveCustomizationToStorage,
  loadCustomizationFromStorage,
} from '@/utils/storage';
import { generatePDF } from '@/utils/pdfGenerator';

export default function Home() {
  const [resumeData, setResumeData] = useState<ResumeData>(DEFAULT_RESUME);
  const [customization, setCustomization] = useState<CustomizationSettings>(
    DEFAULT_CUSTOMIZATION
  );
  const [isMounted, setIsMounted] = useState(false);
  const [showSaveNotification, setShowSaveNotification] = useState(false);
  const [isCustomizationOpen, setIsCustomizationOpen] = useState(false);
  const [showPDFInstructions, setShowPDFInstructions] = useState(false);
  const [showLoadNotification, setShowLoadNotification] = useState(false);
  const [showReleaseNotes, setShowReleaseNotes] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const prevCustomizationRef = useRef<CustomizationSettings>(customization);

  // Load data from storage on mount
  useEffect(() => {
    setIsMounted(true);
    const savedData = loadResumeFromStorage();
    if (savedData) {
      setResumeData(savedData);
      setShowLoadNotification(true);
      // Resume data loaded successfully
      setTimeout(() => setShowLoadNotification(false), 4000);
    } else {
      // Using default template
    }
    const savedCustomization = loadCustomizationFromStorage();
    if (savedCustomization) {
      setCustomization(savedCustomization);
      // Customization loaded successfully
    }

    // Check if this is a new version
    const lastSeenVersion = localStorage.getItem('cvgen_last_version');
    if (isNewVersion(lastSeenVersion)) {
      // Show release notes for new version
      setTimeout(() => setShowReleaseNotes(true), 1500);
      localStorage.setItem('cvgen_last_version', APP_VERSION);
    }
  }, []);

  // Detect customization changes and show toast
  useEffect(() => {
    if (isMounted && prevCustomizationRef.current) {
      const prev = prevCustomizationRef.current;
      const current = customization;

      let changeMessage = '';

      if (prev.preset !== current.preset && current.preset) {
        changeMessage = `Layout: ${current.preset.charAt(0).toUpperCase() + current.preset.slice(1)}`;
      } else if (
        prev.theme?.name !== current.theme?.name &&
        current.theme?.name
      ) {
        changeMessage = `Theme: ${current.theme.name}`;
      } else if (prev.fontFamily !== current.fontFamily && current.fontFamily) {
        changeMessage = `Font: ${current.fontFamily}`;
      } else if (
        prev.headerStyle !== current.headerStyle &&
        current.headerStyle
      ) {
        changeMessage = `Header: ${current.headerStyle.charAt(0).toUpperCase() + current.headerStyle.slice(1)}`;
      } else if (prev.showIcons !== current.showIcons) {
        changeMessage = `Icons: ${current.showIcons ? 'ON' : 'OFF'}`;
      } else if (
        prev.bulletStyle !== current.bulletStyle &&
        current.bulletStyle
      ) {
        changeMessage = `Bullets: ${current.bulletStyle.charAt(0).toUpperCase() + current.bulletStyle.slice(1)}`;
      } else if (
        prev.headingCase !== current.headingCase &&
        current.headingCase
      ) {
        changeMessage = `Heading Case: ${current.headingCase.charAt(0).toUpperCase() + current.headingCase.slice(1)}`;
      } else if (prev.showDividers !== current.showDividers) {
        changeMessage = `Dividers: ${current.showDividers ? 'ON' : 'OFF'}`;
      } else if (
        prev.accentColor !== current.accentColor &&
        current.accentColor
      ) {
        changeMessage = `Accent Color Updated`;
      } else if (
        prev.fontSize?.name !== current.fontSize?.name ||
        prev.fontSize?.heading !== current.fontSize?.heading ||
        prev.fontSize?.body !== current.fontSize?.body
      ) {
        changeMessage = 'Font Size Adjusted';
      } else if (
        prev.spacing?.section !== current.spacing?.section ||
        prev.spacing?.pageMargin !== current.spacing?.pageMargin
      ) {
        changeMessage = 'Spacing Adjusted';
      }

      if (changeMessage) {
        setToastMessage(changeMessage);
        setShowToast(true);
      }

      prevCustomizationRef.current = current;
    }
  }, [customization, isMounted]);

  // Auto-save to localStorage on data change
  useEffect(() => {
    if (isMounted) {
      saveResumeToStorage(resumeData);
      saveCustomizationToStorage(customization);
      // Auto-saved to localStorage
      setShowSaveNotification(true);
      const timer = setTimeout(() => setShowSaveNotification(false), 2000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [resumeData, customization, isMounted]);

  // Print functionality available via PDF generation

  const handleDownloadPDF = () => {
    setShowPDFInstructions(true);
  };

  const handleThemeReset = () => {
    if (
      window.confirm(
        'Are you sure you want to reset all styling and customization settings to defaults? Your resume content will remain unchanged.'
      )
    ) {
      setCustomization(DEFAULT_CUSTOMIZATION);
      // Keep resume data unchanged
    }
  };

  const handleContentReset = () => {
    if (
      window.confirm(
        'Are you sure you want to reset all resume content to default template? Your styling settings will remain unchanged.'
      )
    ) {
      setResumeData(DEFAULT_RESUME);
      // Keep customization unchanged
    }
  };

  const handleFullReset = () => {
    if (
      window.confirm(
        'Are you sure you want to reset EVERYTHING to default? This will clear all your content AND styling settings.'
      )
    ) {
      setResumeData(DEFAULT_RESUME);
      setCustomization(DEFAULT_CUSTOMIZATION);
      clearResumeFromStorage();
    }
  };

  const handleExport = () => {
    exportResumeAsJson(resumeData);
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const data = await importResumeFromJson(file);
      if (data) {
        setResumeData(data);
      } else {
        alert('Failed to import file. Please check the file format.');
      }
    }
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (!isMounted) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='text-center'>
          <div className='inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
          <p className='mt-4 text-gray-600'>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <main className='min-h-screen gradient-bg py-8 pb-40'>
      {/* Two Column Layout */}
      <div className='max-w-[120rem] mx-auto px-4 relative z-10'>
        <div className='grid grid-cols-1 xl:grid-cols-[450px_1fr] gap-6 items-start'>
          {/* LEFT COLUMN - Controls & Actions */}
          <div className='no-print space-y-6 xl:sticky xl:top-8 pb-4 xl:pb-0'>
            <div className='glass rounded-2xl shadow-2xl p-6 animate-fadeIn'>
              {/* Hero Section */}
              <div className='text-center mb-6'>
                <h1 className='text-4xl font-extrabold text-indigo-600 mb-1'>
                  CVGen
                </h1>
                <p className='text-xs text-gray-600 font-medium'>
                  ✨ Resume Builder for IT Pros ✨
                </p>
              </div>

              {/* Save Status Banner */}
              <div className='mb-6'>
                {showLoadNotification ? (
                  <div className='bg-blue-50 border-2 border-blue-300 rounded-xl p-4 text-center animate-scaleIn'>
                    <div className='flex items-center justify-center gap-2 text-blue-700 font-medium'>
                      <svg
                        className='w-5 h-5'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                        />
                      </svg>
                      <span className='text-sm'>
                        Previous work restored! 🎉
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className='bg-green-50 border-2 border-green-200 rounded-xl p-4 text-center'>
                    {showSaveNotification ? (
                      <div className='flex items-center justify-center gap-2 text-green-700 font-medium animate-scaleIn'>
                        <svg
                          className='w-5 h-5'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M5 13l4 4L19 7'
                          />
                        </svg>
                        <span className='text-sm'>All changes saved!</span>
                      </div>
                    ) : (
                      <div className='flex items-center justify-center gap-2 text-gray-700'>
                        <svg
                          className='w-5 h-5 text-green-600'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
                          />
                        </svg>
                        <div className='text-sm'>
                          <div className='font-semibold'>
                            Auto-Save Active 💾
                          </div>
                          <div className='text-xs text-gray-600'>
                            Safe to refresh anytime
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className='space-y-3'>
                <button
                  onClick={() => setIsCustomizationOpen(!isCustomizationOpen)}
                  className='w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 relative'
                >
                  <svg
                    className='w-5 h-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4'
                    />
                  </svg>
                  <span>{isCustomizationOpen ? 'Close' : 'Customize'}</span>
                  <span className='absolute -top-1 -right-1 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full animate-pulse'>
                    NEW
                  </span>
                </button>

                <button
                  onClick={handleDownloadPDF}
                  className='w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200'
                >
                  <svg
                    className='w-5 h-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10'
                    />
                  </svg>
                  <span>Save as PDF</span>
                  <span className='text-xs opacity-75'>(with links)</span>
                </button>

                <div className='grid grid-cols-2 gap-3'>
                  <button
                    onClick={handleExport}
                    className='flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200'
                  >
                    <svg
                      className='w-5 h-5'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4'
                      />
                    </svg>
                    <span>Export</span>
                  </button>

                  <label className='flex items-center justify-center gap-2 px-4 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 cursor-pointer'>
                    <svg
                      className='w-5 h-5'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                      />
                    </svg>
                    <span>Import</span>
                    <input
                      ref={fileInputRef}
                      type='file'
                      accept='.json'
                      onChange={handleImport}
                      className='hidden'
                    />
                  </label>
                </div>

                {/* Reset Options */}
                <div className='space-y-3'>
                  <h4 className='text-sm font-bold text-gray-700 text-center'>
                    Reset Options
                  </h4>

                  {/* Theme Reset */}
                  <button
                    onClick={handleThemeReset}
                    title='Reset all styling, themes, fonts, and customization settings to defaults. Keeps your content unchanged.'
                    className='w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200'
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
                        d='M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z'
                      />
                    </svg>
                    <span>Theme Reset</span>
                  </button>

                  {/* Content Reset */}
                  <button
                    onClick={handleContentReset}
                    title='Reset all resume content (personal info, experience, education, skills) to default template. Keeps your styling unchanged.'
                    className='w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200'
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
                        d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                      />
                    </svg>
                    <span>Content Reset</span>
                  </button>

                  {/* Full Reset */}
                  <button
                    onClick={handleFullReset}
                    title='Reset EVERYTHING to default - both content and styling. This will clear all your work and start fresh.'
                    className='w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200'
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
                        d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                      />
                    </svg>
                    <span>Full Reset</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Tips Card */}
            <div className='glass rounded-2xl p-6 shadow-xl animate-fadeIn'>
              <div className='flex items-start gap-3 mb-4'>
                <div className='flex-shrink-0'>
                  <div className='w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg'>
                    <svg
                      className='w-5 h-5 text-white'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
                      />
                    </svg>
                  </div>
                </div>
                <div className='flex-1'>
                  <h3 className='font-bold text-base text-gray-900 mb-3'>
                    💡 ATS Tips
                  </h3>
                  <ul className='space-y-2 text-sm text-gray-700'>
                    <li className='flex items-start gap-2'>
                      <span className='text-green-600 mt-0.5'>✓</span>
                      <span>Simple formatting</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span className='text-green-600 mt-0.5'>✓</span>
                      <span>Include keywords</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span className='text-green-600 mt-0.5'>✓</span>
                      <span>Standard headings</span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span className='text-green-600 mt-0.5'>✓</span>
                      <span>Quantify achievements</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer - in left column */}
            <div className='bg-gray-800 rounded-2xl p-6 text-center'>
              <p className='text-white font-medium mb-2 text-base'>
                ✨ Built for IT Professionals ✨
              </p>
              <p className='text-gray-300 text-xs'>
                Next.js 15 • ATS-Optimized • Free Forever
              </p>
              <div className='flex flex-wrap justify-center gap-3 mt-4 text-xs text-gray-400'>
                <span className='hover:text-white transition-colors cursor-pointer'>
                  🎨 Modern
                </span>
                <span className='hover:text-white transition-colors cursor-pointer'>
                  ⚡ Fast
                </span>
                <span className='hover:text-white transition-colors cursor-pointer'>
                  🔒 Private
                </span>
              </div>
              <div className='mt-4 pt-4 border-t border-gray-700'>
                <button
                  onClick={() => setShowReleaseNotes(true)}
                  className='text-xs text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-1 mx-auto'
                >
                  <svg
                    className='w-3.5 h-3.5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                  <span>v{APP_VERSION} - What's New?</span>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Resume Preview */}
          <div className='animate-fadeIn'>
            <TemplateRenderer
              ref={resumeRef}
              templateId={customization.template}
              data={resumeData}
              onUpdate={setResumeData}
              customization={customization}
              isEditable={true}
            />
          </div>
        </div>
      </div>

      {/* Quick Customizer Toolbar */}
      <QuickCustomizer
        settings={customization}
        onUpdate={setCustomization}
        onOpenFullPanel={() => setIsCustomizationOpen(true)}
      />

      {/* Customization Sidebar */}
      <CustomizationSidebar
        settings={customization}
        onUpdate={setCustomization}
        isOpen={isCustomizationOpen}
        onToggle={() => setIsCustomizationOpen(!isCustomizationOpen)}
      />

      {/* Customization Toast */}
      <CustomizationToast
        message={toastMessage}
        visible={showToast}
        onHide={() => setShowToast(false)}
      />

      {/* Release Notes Modal */}
      <ReleaseNotesModal
        isOpen={showReleaseNotes}
        onClose={() => setShowReleaseNotes(false)}
        version={APP_VERSION}
      />

      {/* PDF Instructions Modal */}
      {showPDFInstructions && (
        <PDFInstructions
          onClose={() => setShowPDFInstructions(false)}
          onProceed={generatePDF}
        />
      )}
    </main>
  );
}
