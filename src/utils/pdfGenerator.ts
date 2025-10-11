import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/**
 * PDF Generation Utility
 * Generates high-quality PDFs with clickable links
 */

export const generatePDF = async (
  element: HTMLElement,
  filename: string
): Promise<void> => {
  try {
    // Show loading state
    const loadingDiv = document.createElement("div");
    loadingDiv.innerHTML = `
      <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                  background: white; padding: 30px; border-radius: 10px; box-shadow: 0 10px 40px rgba(0,0,0,0.2); 
                  z-index: 9999; text-align: center;">
        <div style="font-size: 18px; font-weight: 600; margin-bottom: 10px;">Generating PDF...</div>
        <div style="color: #666;">Please wait a moment</div>
      </div>
      <div style="position: fixed; inset: 0; background: rgba(0,0,0,0.3); z-index: 9998;"></div>
    `;
    document.body.appendChild(loadingDiv);

    // Create canvas from HTML
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 0;

    pdf.addImage(
      imgData,
      "PNG",
      imgX,
      imgY,
      imgWidth * ratio,
      imgHeight * ratio
    );

    // Add clickable links
    const links = element.querySelectorAll('a[href]');
    links.forEach((link) => {
      const href = link.getAttribute("href");
      if (href) {
        const rect = link.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        const x = (rect.left - elementRect.left) * ratio + imgX;
        const y = (rect.top - elementRect.top) * ratio + imgY;
        const width = rect.width * ratio;
        const height = rect.height * ratio;
        
        pdf.link(x, y, width, height, { url: href });
      }
    });

    pdf.save(filename);

    // Remove loading state
    document.body.removeChild(loadingDiv);
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Failed to generate PDF. Please try again.");
  }
};

export const handlePrintResume = (): void => {
  window.print();
};

