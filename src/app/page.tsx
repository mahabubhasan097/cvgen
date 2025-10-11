"use client";

import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Resume from "@/components/Resume";
import CustomizationPanel from "@/components/CustomizationPanel";
import { ResumeData } from "@/types/resume";
import { CustomizationSettings, DEFAULT_CUSTOMIZATION } from "@/types/customization";
import { DEFAULT_RESUME } from "@/constants/defaultResume";
import {
  saveResumeToStorage,
  loadResumeFromStorage,
  clearResumeFromStorage,
  exportResumeAsJson,
  importResumeFromJson,
  saveCustomizationToStorage,
  loadCustomizationFromStorage,
} from "@/utils/storage";
import { generatePDF, handlePrintResume } from "@/utils/pdfGenerator";

export default function Home() {
  const [resumeData, setResumeData] = useState<ResumeData>(DEFAULT_RESUME);
  const [customization, setCustomization] = useState<CustomizationSettings>(DEFAULT_CUSTOMIZATION);
  const [isMounted, setIsMounted] = useState(false);
  const [showSaveNotification, setShowSaveNotification] = useState(false);
  const [showCustomizationPanel, setShowCustomizationPanel] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load data from storage on mount
  useEffect(() => {
    setIsMounted(true);
    const savedData = loadResumeFromStorage();
    if (savedData) {
      setResumeData(savedData);
    }
    const savedCustomization = loadCustomizationFromStorage();
    if (savedCustomization) {
      setCustomization(savedCustomization);
    }
  }, []);

  // Auto-save to localStorage on data change
  useEffect(() => {
    if (isMounted) {
      saveResumeToStorage(resumeData);
      saveCustomizationToStorage(customization);
      setShowSaveNotification(true);
      const timer = setTimeout(() => setShowSaveNotification(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [resumeData, customization, isMounted]);

  const handlePrint = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: `${resumeData.contact.fullName}_Resume`,
    pageStyle: `
      @page {
        size: letter;
        margin: 0.5in;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    `,
  });

  const handleDownloadPDF = async () => {
    if (resumeRef.current) {
      await generatePDF(
        resumeRef.current,
        `${resumeData.contact.fullName.replace(/\s+/g, "_")}_Resume.pdf`
      );
    }
  };

  const handleReset = () => {
    if (
      window.confirm(
        "Are you sure you want to reset to default template? This will clear all your current data."
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
        alert("Failed to import file. Please check the file format.");
      }
    }
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen gradient-bg py-8">
      {/* Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Two Column Layout */}
      <div className="max-w-[120rem] mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-[450px_1fr] gap-6 items-start">
          
          {/* LEFT COLUMN - Controls & Actions */}
          <div className="no-print space-y-6 xl:sticky xl:top-8">
            <div className="glass rounded-2xl shadow-2xl p-6 animate-fadeIn">
              {/* Hero Section */}
              <div className="text-center mb-6">
                <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 mb-1">
                  CVGen
                </h1>
                <p className="text-xs text-gray-600 font-medium">
                  ✨ Resume Builder for IT Pros ✨
                </p>
              </div>

              <div className="mb-6 text-center">
                {showSaveNotification ? (
                  <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium animate-scaleIn shadow-md">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Saved</span>
                  </div>
                ) : (
                  <p className="text-sm text-gray-700 font-medium flex items-center justify-center gap-2">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Click text to edit • Auto-save
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => setShowCustomizationPanel(true)}
                  className="group w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                  <span className="relative z-10">Customize</span>
                </button>

                <button
                  onClick={handleDownloadPDF}
                  className="group w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                  </svg>
                  <span className="relative z-10">Download PDF</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="group w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  <span className="relative z-10">Print</span>
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleExport}
                    className="group flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                    <span className="relative z-10">Export</span>
                  </button>

                  <label className="group flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-700 to-rose-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="relative z-10">Import</span>
                    <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
                  </label>
                </div>

                <button
                  onClick={handleReset}
                  className="group w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="relative z-10">Reset</span>
                </button>
              </div>
            </div>

            {/* Tips Card */}
            <div className="glass rounded-2xl p-6 shadow-xl animate-fadeIn">
              <div className="flex items-start gap-3 mb-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-base text-gray-900 mb-3">
                    💡 ATS Tips
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>Simple formatting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>Include keywords</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>Standard headings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>Quantify achievements</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer - in left column */}
            <div className="glass-dark rounded-2xl p-6 backdrop-blur-lg text-center">
              <p className="text-white font-medium mb-2 text-base">
                ✨ Built for IT Professionals ✨
              </p>
              <p className="text-white/80 text-xs">
                Next.js 15 • ATS-Optimized • Free Forever
              </p>
              <div className="flex flex-wrap justify-center gap-3 mt-4 text-xs text-white/70">
                <span className="hover:text-white transition-colors cursor-pointer">🎨 Modern</span>
                <span className="hover:text-white transition-colors cursor-pointer">⚡ Fast</span>
                <span className="hover:text-white transition-colors cursor-pointer">🔒 Private</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Resume Preview */}
          <div className="animate-fadeIn">
            <Resume
              ref={resumeRef}
              data={resumeData}
              onUpdate={setResumeData}
              customization={customization}
              isEditable={true}
            />
          </div>
        </div>
      </div>

      {/* Customization Panel */}
      {showCustomizationPanel && (
        <CustomizationPanel
          settings={customization}
          onUpdate={setCustomization}
          onClose={() => setShowCustomizationPanel(false)}
        />
      )}

    </main>
  );
}

