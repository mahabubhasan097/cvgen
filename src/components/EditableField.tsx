"use client";

import React, { useState, useRef, useEffect } from "react";

interface EditableFieldProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  multiline?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  style?: React.CSSProperties;
}

/**
 * EditableField Component
 * Reusable inline editable text field with proper content editable handling
 */
const EditableField: React.FC<EditableFieldProps> = ({
  value,
  onChange,
  className = "",
  placeholder = "Click to edit",
  multiline = false,
  as: Component = "div",
  style,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current && isEditing) {
      contentRef.current.focus();
      // Place cursor at end
      const range = document.createRange();
      const sel = window.getSelection();
      if (contentRef.current.childNodes.length > 0) {
        range.setStart(
          contentRef.current.childNodes[0],
          contentRef.current.textContent?.length || 0
        );
        range.collapse(true);
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    if (contentRef.current) {
      const newValue = contentRef.current.textContent || "";
      if (newValue !== value) {
        onChange(newValue);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!multiline && e.key === "Enter") {
      e.preventDefault();
      contentRef.current?.blur();
    }
    if (e.key === "Escape") {
      if (contentRef.current) {
        contentRef.current.textContent = value;
      }
      contentRef.current?.blur();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  };

  return (
    <Component
      ref={contentRef}
      contentEditable
      suppressContentEditableWarning
      onFocus={() => setIsEditing(true)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      style={style}
      className={`${className} ${
        isEditing ? "outline outline-2 outline-blue-400 bg-blue-50" : ""
      } ${!value && !isEditing ? "text-gray-400" : ""} 
      cursor-text transition-all duration-150 rounded px-1 -mx-1`}
      data-placeholder={!value ? placeholder : ""}
    >
      {value}
    </Component>
  );
};

export default EditableField;

