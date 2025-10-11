# Quick Start Guide

## 🚀 Get Up and Running in 2 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Run Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
Visit **http://localhost:3000** and start editing your resume!

---

## 📝 How to Use

### Editing Your Resume
1. **Click any text** on the resume to edit it inline
2. Changes **auto-save** to your browser
3. Press **Enter** to finish editing (or click outside)
4. Press **Escape** to cancel editing

### Download as PDF
1. Click the **"Download PDF"** button
2. Choose your print settings (or use default)
3. Save as PDF - your ATS-friendly resume is ready!

### Import/Export
- **Export JSON**: Save your resume data as a JSON file
- **Import JSON**: Load a previously saved resume
- **Reset**: Return to the default template

---

## 🎯 Tips for IT Professionals

### What to Include
✅ **Quantifiable achievements** (e.g., "Improved performance by 40%")
✅ **Relevant technologies** and tools
✅ **Action verbs** (Led, Developed, Architected, Implemented)
✅ **Project impact** and business outcomes

### What to Avoid
❌ Fancy formatting, tables, or multi-column layouts
❌ Images, charts, or graphics
❌ Spelling or grammar errors
❌ Generic descriptions without metrics

### ATS Keywords
Include relevant keywords from job descriptions:
- Programming languages (JavaScript, Python, Java)
- Frameworks (React, Node.js, Django)
- Tools (Docker, Kubernetes, AWS)
- Methodologies (Agile, CI/CD, Microservices)

---

## 🚀 Deploy to Vercel

### Option 1: GitHub Integration (Recommended)
1. Push code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy" - Done! 🎉

### Option 2: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

---

## 🛠️ Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Format code
npm run format
```

---

## 📱 Features Overview

| Feature | Description |
|---------|-------------|
| 📝 Inline Editing | Click any text to edit directly |
| 💾 Auto-Save | Changes saved automatically |
| 📥 PDF Download | Professional PDF export |
| 🔄 Import/Export | Save/load resume data |
| 🎯 ATS-Optimized | Single-column, parser-friendly |
| ⚡ Fast | Built with Next.js 15 |
| 📱 Responsive | Works on all devices |

---

## 🆘 Troubleshooting

### Issue: Changes not saving
- Check browser console for errors
- Ensure localStorage is enabled
- Try clearing browser cache

### Issue: PDF looks different
- Use Chrome/Edge for best results
- Check print preview before saving
- Ensure all fonts are loaded

### Issue: Build errors
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

---

## 📞 Need Help?

- Check the main [README.md](./README.md)
- Review the code in `src/` directory
- All components are well-documented

**Happy job hunting! 🎯**

