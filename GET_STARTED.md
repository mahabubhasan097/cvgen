# 🚀 Get Started with CVGen

## ✅ Your Project is Ready!

Everything is set up and ready to go. Follow these simple steps to start building resumes!

---

## 📋 Step-by-Step Instructions

### 1️⃣ Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

This will install:
- Next.js 15.0.2
- React 19
- TypeScript
- Tailwind CSS
- react-to-print
- All necessary dev dependencies

⏱️ **Time**: ~2-3 minutes

---

### 2️⃣ Start Development Server

```bash
npm run dev
```

You should see:
```
▲ Next.js 15.0.2
- Local:        http://localhost:3000
- Ready in 2.1s
```

✅ **Project running at**: http://localhost:3000

---

### 3️⃣ Open in Browser

1. Open **http://localhost:3000**
2. You'll see the resume builder with a sample IT professional resume
3. Click any text to edit it inline!

---

## 🎯 Quick Feature Tour

### Edit Your Resume
1. **Click any text** on the resume
2. The field will highlight with a blue border
3. **Type** to edit
4. **Press Enter** or click outside to save
5. Changes **auto-save** to browser storage!

### Download PDF
1. Click **"Download PDF"** button
2. Use your browser's print dialog
3. Save as PDF - done! 📥

### Export/Import
- **Export JSON**: Save your resume data as a backup
- **Import JSON**: Load a previously saved resume
- **Reset**: Go back to the default template

### Customize Template
Edit `src/constants/defaultResume.ts` to change the default content!

---

## 🛠️ Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Check code for issues |
| `npm run format` | Format code with Prettier |

---

## 📁 Project Structure Overview

```
cvgen/
├── src/
│   ├── app/                    # Pages
│   ├── components/             # React components
│   ├── types/                  # TypeScript types
│   ├── constants/              # Default data
│   └── utils/                  # Helper functions
├── public/                     # Static assets
└── [config files]              # Configuration
```

---

## 🎨 Customization Quick Start

### Change Colors
Edit `tailwind.config.ts`:
```typescript
theme: {
  extend: {
    colors: {
      primary: '#3B82F6',  // Change this!
    },
  },
}
```

### Modify Resume Sections
Edit `src/components/Resume.tsx` to:
- Add new sections
- Remove sections
- Change layout
- Adjust styling

### Update Default Content
Edit `src/constants/defaultResume.ts` to change the template.

---

## 🚀 Deploy to Vercel (Free)

### Quick Deploy
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Or via GitHub
1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repo
5. Deploy!

🎉 **Your app will be live in ~2 minutes!**

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

---

## 📚 Documentation

- **[README.md](./README.md)** - Main documentation
- **[QUICK_START.md](./QUICK_START.md)** - Quick reference
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deployment guide
- **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** - Architecture
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Contribution guide

---

## 🎯 What Makes This Resume ATS-Friendly?

✅ **Single Column Layout** - No tables or multi-column designs
✅ **Simple Formatting** - No graphics, images, or fancy fonts
✅ **Standard Sections** - Clear, recognizable section headers
✅ **Plain Text** - All content is parseable by ATS systems
✅ **PDF Export** - Preserves formatting across systems

---

## 💡 Tips for IT Professionals

### Content Tips
- Use **action verbs** (Developed, Architected, Led)
- Include **metrics** (Improved performance by 40%)
- List **technologies** and tools used
- Show **impact** on business/users

### Formatting Tips
- Keep it **one page** if possible (2 max)
- Use **consistent date formats**
- Include **relevant keywords** from job descriptions
- Proofread for **grammar and spelling**

---

## 🐛 Troubleshooting

### Port 3000 Already in Use?
```bash
# Use a different port
npm run dev -- -p 3001
```

### Build Errors?
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

### Changes Not Appearing?
- Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
- Check browser console for errors

---

## 🆘 Need Help?

### Check Documentation
All questions answered in the docs folder!

### Common Issues
1. **LocalStorage not working**: Check browser settings
2. **PDF looks wrong**: Use Chrome/Edge for best results
3. **Text won't edit**: Ensure JavaScript is enabled

---

## 🎉 You're All Set!

### Next Steps:
1. ✅ Install dependencies: `npm install`
2. ✅ Start server: `npm run dev`
3. ✅ Open http://localhost:3000
4. ✅ Start editing your resume!
5. ✅ Deploy to Vercel when ready

---

## 🌟 Features at a Glance

| Feature | Status |
|---------|--------|
| Inline Editing | ✅ Ready |
| PDF Download | ✅ Ready |
| Auto-Save | ✅ Ready |
| Import/Export | ✅ Ready |
| ATS-Optimized | ✅ Ready |
| Mobile Responsive | ✅ Ready |
| Type Safety | ✅ TypeScript |
| Clean Code | ✅ Documented |

---

## 📞 Support

- Check the [README.md](./README.md)
- Review code comments
- Check console for errors
- All components are documented

---

**Ready to create your perfect resume? Let's go! 🚀**

```bash
npm install
npm run dev
```

**Happy Resume Building! 🎯**

