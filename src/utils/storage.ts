import { ResumeData } from '@/types/resume';
import {
  CustomizationSettings,
  DEFAULT_CUSTOMIZATION,
  getCustomizationForTemplate,
} from '@/types/customization';
import { logger } from './logger';

const STORAGE_KEY = 'cvgen_resume_data';
const CUSTOMIZATION_KEY = 'cvgen_customization';

/**
 * Local Storage Utility
 * Handles saving and loading resume data
 */

export const saveResumeToStorage = (data: ResumeData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    logger.error('Failed to save resume to storage:', error);
  }
};

export const loadResumeFromStorage = (): ResumeData | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    logger.error('Failed to load resume from storage:', error);
    return null;
  }
};

export const clearResumeFromStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    logger.error('Failed to clear resume from storage:', error);
  }
};

export const exportResumeAsJson = (data: ResumeData): void => {
  const dataStr = JSON.stringify(data, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `resume_${data.contact.fullName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  URL.revokeObjectURL(url);
};

export const importResumeFromJson = (
  file: File
): Promise<ResumeData | null> => {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const data = JSON.parse(e.target?.result as string);
        resolve(data);
      } catch (error) {
        logger.error('Failed to parse JSON file:', error);
        resolve(null);
      }
    };
    reader.onerror = () => {
      logger.error('Failed to read file');
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
    logger.error('Failed to save customization to storage:', error);
  }
};

export const loadCustomizationFromStorage =
  (): CustomizationSettings | null => {
    try {
      const data = localStorage.getItem(CUSTOMIZATION_KEY);
      if (!data) return null;

      const savedSettings = JSON.parse(data);

      // Get template-specific customization
      const templateId = savedSettings.template || 'professional-standard';
      const templateCustomization = getCustomizationForTemplate(templateId);

      // Merge with template-specific settings to ensure all new properties exist (backward compatibility)
      const merged = {
        ...templateCustomization,
        ...savedSettings,
        fontSize: {
          ...templateCustomization.fontSize,
          ...savedSettings.fontSize,
        },
        spacing: { ...templateCustomization.spacing, ...savedSettings.spacing },
        lineHeight: {
          ...templateCustomization.lineHeight,
          ...savedSettings.lineHeight,
        },
        theme: {
          ...templateCustomization.theme,
          ...savedSettings.theme,
          // Ensure extended colors exist (new in v1.0.0+)
          colors: {
            ...templateCustomization.theme.colors,
            ...savedSettings.theme?.colors,
          },
        },
        // Ensure sections are template-specific
        sections: templateCustomization.sections,
      };

      return merged;
    } catch (error) {
      logger.error('Failed to load customization from storage:', error);
      return null;
    }
  };

/**
 * Update customization settings when template changes
 * This ensures sections are updated to match the new template
 */
export const updateCustomizationForTemplate = (
  currentSettings: CustomizationSettings,
  newTemplateId: string
): CustomizationSettings => {
  const templateCustomization = getCustomizationForTemplate(newTemplateId);

  return {
    ...currentSettings,
    template: newTemplateId,
    sections: templateCustomization.sections,
  };
};
