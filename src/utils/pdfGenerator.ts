/**
 * PDF Generation Utility
 * Uses browser's native Print-to-PDF to preserve clickable links
 */

export const generatePDF = (): void => {
  // Store original title
  const originalTitle = document.title;
  
  // Update document title for the PDF filename
  document.title = "Resume";
  
  // Add a class to body to indicate print mode (for additional styling if needed)
  document.body.classList.add('printing-mode');
  
  // Trigger print dialog
  window.print();
  
  // Restore original title and remove class after print dialog closes
  setTimeout(() => {
    document.title = originalTitle;
    document.body.classList.remove('printing-mode');
  }, 1000);
};

export const handlePrintResume = (): void => {
  window.print();
};

