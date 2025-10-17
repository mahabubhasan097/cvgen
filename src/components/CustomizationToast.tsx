"use client";

import React, { useEffect } from "react";

interface CustomizationToastProps {
  message: string;
  visible: boolean;
  onHide: () => void;
}

const CustomizationToast: React.FC<CustomizationToastProps> = ({
  message,
  visible,
  onHide,
}) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onHide();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [visible, onHide]);

  if (!visible) return null;

  return (
    <div className="fixed top-24 right-6 z-50 animate-slideInRight no-print">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 min-w-[300px]">
        <div className="flex-shrink-0">
          <svg
            className="w-5 h-5 animate-pulse"
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
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomizationToast;

