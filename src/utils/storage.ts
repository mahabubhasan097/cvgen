import { ResumeData } from "@/types/resume";
import { CustomizationSettings } from "@/types/customization";

const STORAGE_KEY = "cvgen_resume_data";
const CUSTOMIZATION_KEY = "cvgen_customization";

/**
 * Local Storage Utility
 * Handles saving and loading resume data
 */

export const saveResumeToStorage = (data: ResumeData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save resume to storage:", error);
  }
};

export const loadResumeFromStorage = (): ResumeData | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Failed to load resume from storage:", error);
    return null;
  }
};

export const clearResumeFromStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear resume from storage:", error);
  }
};

export const exportResumeAsJson = (data: ResumeData): void => {
  const dataStr = JSON.stringify(data, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `resume_${data.contact.fullName.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.json`;
  link.click();
  URL.revokeObjectURL(url);
};

export const importResumeFromJson = (
  file: File
): Promise<ResumeData | null> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        resolve(data);
      } catch (error) {
        console.error("Failed to parse JSON file:", error);
        resolve(null);
      }
    };
    reader.onerror = () => {
      console.error("Failed to read file");
      resolve(null);
    };
    reader.readAsText(file);
  });
};

// Customization Storage Functions
export const saveCustomizationToStorage = (
  settings: CustomizationSettings
): void => {
  try {
    localStorage.setItem(CUSTOMIZATION_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error("Failed to save customization to storage:", error);
  }
};

export const loadCustomizationFromStorage = (): CustomizationSettings | null => {
  try {
    const data = localStorage.getItem(CUSTOMIZATION_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Failed to load customization from storage:", error);
    return null;
  }
};

