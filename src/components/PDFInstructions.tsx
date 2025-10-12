"use client";

import React from "react";

interface PDFInstructionsProps {
  onClose: () => void;
  onProceed: () => void;
}

const PDFInstructions: React.FC<PDFInstructionsProps> = ({ onClose, onProceed }) => {
  return (
    <div className="no-print fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-scaleIn border border-gray-200">
        {/* Header */}
        <div className="p-6 bg-blue-600">
          <h2 className="text-2xl font-bold text-white mb-1">Download as PDF</h2>
          <p className="text-white/80 text-sm">With clickable links! 🔗</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
            <p className="text-sm text-gray-700 font-medium mb-3">
              ✨ To get a PDF with <strong>clickable links</strong>:
            </p>
            <ol className="space-y-2 text-sm text-gray-700">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">1</span>
                <span>Click <strong>"Proceed"</strong> below</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">2</span>
                <span>In the print dialog, select <strong>"Save as PDF"</strong> as destination</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">3</span>
                <span>Set margins to <strong>"Default"</strong> or <strong>"Minimum"</strong></span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">4</span>
                <span>Enable <strong>"Background graphics"</strong> (if available)</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">5</span>
                <span>Click <strong>"Save"</strong></span>
              </li>
            </ol>
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
            <div className="flex gap-3">
              <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm text-green-800">
                <p className="font-semibold mb-1">Why this method?</p>
                <p>Using browser's Print-to-PDF preserves <strong>clickable links, selectable text,</strong> and produces <strong>smaller file sizes</strong> compared to image-based PDFs!</p>
              </div>
            </div>
          </div>

          <div className="text-xs text-gray-500 text-center">
            💡 Best browsers: Chrome, Edge, or Firefox
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onClose();
              // Wait for modal to close before opening print
              setTimeout(() => {
                onProceed();
              }, 300);
            }}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
          >
            Proceed to Print Dialog
          </button>
        </div>
      </div>
    </div>
  );
};

export default PDFInstructions;

