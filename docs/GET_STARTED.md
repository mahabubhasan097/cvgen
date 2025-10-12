# 🚀 Get Started with CVGen

## ✅ Complete Setup Guide

Welcome to CVGen! This guide will walk you through setting up and using the most advanced open-source resume builder.

---

## 📋 Prerequisites

Before you begin, ensure you have:
- ✅ **Node.js 20+** installed
- ✅ **npm** (comes with Node.js)
- ✅ Modern web browser (Chrome, Edge, Firefox, Safari)
- ✅ Code editor (VS Code recommended)

### Check Your Setup
```bash
node --version    # Should show v20.x.x or higher
npm --version     # Should show v9.x.x or higher
```

---

## 🎬 Step-by-Step Installation

### Step 1: Install Dependencies

```bash
cd cvgen
npm install
```

**What gets installed:**
- Next.js 15.5.4 (React framework)
- React 18.3.1 (UI library)
- TypeScript 5 (type safety)
- Tailwind CSS 3.4.1 (styling)
- react-to-print, jsPDF, html2pdf (PDF generation)
- Development tools (ESLint, Prettier)

⏱️ **Time**: ~2-3 minutes

---

### Step 2: Start Development Server

```bash
npm run dev
```

**You should see:**
```
▲ Next.js 15.5.4
- Local:        http://localhost:3000
- Ready in 2.1s
```

✅ **Server running!**

---

### Step 3: Open in Browser

1. Navigate to **http://localhost:3000**
2. You'll see the CVGen interface with:
   - Left sidebar with controls
   - Resume preview in the center
   - Quick Customizer toolbar at bottom
3. Sample IT professional resume loaded

🎉 **You're ready to start editing!**

---

## 🎯 First-Time User Guide

### 1. Understand the Interface

#### Left Sidebar
- **CVGen Header**: App branding
- **Auto-Save Status**: Green = saved, blue = loading
- **Customize Button**: Opens full customization panel
- **Save as PDF**: Download your resume
- **Export/Import**: Backup and restore
- **Reset**: Return to default template
- **ATS Tips Card**: Best practices
- **Footer**: App info

#### Resume Preview (Center/Right)
- Live preview of your resume
- Click any text to edit
- Changes appear instantly
- What you see is what you get

#### Quick Customizer (Bottom)
- Always visible floating toolbar
- Instant access to common options
- Changes apply immediately
- "More Options" opens full sidebar

#### Customization Sidebar (Right, Hidden)
- Opens when you click "Customize" or "More Options"
- 3 tabs for different controls
- Slide-in animation
- Close by clicking backdrop or toggle button

---

### 2. Edit Your Resume Content

#### Edit Text Fields
1. **Click** any text on the resume
2. Field highlights with blue border
3. **Type** your content
4. **Press Enter** to save or **Escape** to cancel
5. See "Saved!" notification

#### Edit Complex Fields

**Contact Information**:
- Click name, email, phone, location to edit
- Add LinkedIn, GitHub, Portfolio with "+ Add" buttons
- Remove optional fields with X button

**Experience Achievements**:
- Click any bullet point to edit
- Click "+ Add Achievement" to add more
- Hover and click X to remove

**Skills**:
- Click category name to edit
- Click skill list to edit (comma-separated)
- Add categories with "+ Add Skill Category"

**Education**:
- Click institution, degree, field to edit
- Add GPA with "+ Add GPA" button
- Remove GPA with X button

---

### 3. Customize Your Resume

#### Using Quick Customizer (Easiest)

**Change Layout** (Bottom toolbar):
- Click 📄 for Compact layout
- Click 📃 for Normal layout
- Click 📰 for Spacious layout

**Change Theme** (Bottom toolbar):
- Click any color swatch
- Instant preview
- 5 professional themes

**Adjust Font Size** (Bottom toolbar):
- Click A- to decrease
- Click A+ to increase
- Affects name, headings, and body

**Toggle Features** (Bottom toolbar):
- Icons button: Show/hide contact icons
- Header buttons: Change section header style

#### Using Full Customization Sidebar (Advanced)

**Open the sidebar**:
- Click "Customize" in left panel
- OR click "More Options" in bottom toolbar

**Quick Tab**:
- All features from bottom toolbar
- PLUS: Bullet styles, heading case, dividers, custom colors

**Advanced Tab**:
- Precise font size sliders
- Line height controls
- Spacing adjustments
- Border width
- Icon size

**Sections Tab**:
- Toggle section visibility (ON/OFF buttons)
- Reorder sections (⬆️⬇️ arrows)
- Rename section titles (click to edit)

---

### 4. Export Your Resume

#### Method 1: Save as PDF (Recommended)
1. Click **"Save as PDF"** button
2. Read the instructions modal
3. Click **"Print Now"**
4. In print dialog:
   - Destination: Save as PDF
   - Layout: Portrait
   - Margins: Default
   - Options: Background graphics ON
5. Click **"Save"**
6. Choose location and save

✅ **Result**: Professional PDF with clickable links!

#### Method 2: Export JSON (Backup)
1. Click **"Export"** button
2. JSON file downloads automatically
3. Save in a safe location
4. Use to restore or share

#### Method 3: Import JSON
1. Click **"Import"** button
2. Select your .json file
3. Resume loads instantly
4. All customization preserved

---

## 🎨 Customization Deep Dive

### Typography System

#### Font Sizes
- **Name**: Your name at top (24-40px recommended: 28-32px)
- **Headings**: Section headers (14-24px recommended: 16-18px)
- **Body**: Main content (10-16px recommended: 12-14px)

#### Line Heights
- **Headings**: Tighter for impact (1.0-1.3)
- **Body**: Readable (1.4-1.6)
- **Lists**: Extra space for clarity (1.5-1.8)

#### Font Families
All fonts are ATS-safe:
- **Inter**: Modern, clean (default)
- **Arial**: Universal standard
- **Helvetica**: Clean, professional
- **Calibri**: Microsoft standard
- **Georgia**: Serif, elegant
- **Times New Roman**: Traditional
- **Verdana**: High readability

---

### Color System

#### Built-in Themes
Each theme includes coordinated colors:
- Primary (name, headers)
- Secondary (accents)
- Text (body content)
- Border (lines, dividers)

#### Custom Accent Color
- Pick any color with color picker
- Enter hex code manually
- Applied to: name, headers, bullets, borders
- Reset to theme color anytime

---

### Styling Options

#### Bullet Styles
- **● Disc**: Classic, ATS-friendly (default)
- **○ Circle**: Light, modern
- **■ Square**: Structured, formal
- **→ Arrow**: Dynamic, tech-forward (uses accent color)
- **› Chevron**: Sleek, minimal (uses accent color)

#### Header Styles
- **Underline**: Bottom border, most ATS-safe
- **Background**: Filled background, bold
- **Border**: Full border, structured

#### Section Features
- **Heading Case**: Normal, UPPERCASE, Title Case
- **Dividers**: Subtle lines between sections
- **Visibility**: Show/hide entire sections
- **Ordering**: Reorder with arrows
- **Renaming**: Custom section titles

---

### Layout Presets

#### 📄 Compact
**Best for**: Fitting lots of content
- Smaller fonts (28/16/12px)
- Tight spacing (12px sections, 36px margins)
- Compact line heights (1.1/1.4/1.5)

#### 📃 Normal (Default)
**Best for**: Balanced professional look
- Medium fonts (30/18/14px)
- Standard spacing (16px sections, 48px margins)
- Comfortable line heights (1.2/1.5/1.6)

#### 📰 Spacious
**Best for**: Emphasizing content, shorter resumes
- Larger fonts (34/20/15px)
- Generous spacing (24px sections, 60px margins)
- Relaxed line heights (1.3/1.6/1.7)

---

## 💡 Pro Tips

### Quick Workflow
1. Start with a preset layout (📄📃📰)
2. Pick a theme that matches industry
3. Edit content inline
4. Fine-tune with sidebar if needed
5. Export as PDF

### For Different Jobs
Create multiple versions:
```bash
1. Edit resume for "Backend Developer"
2. Click Export JSON → save as "backend.json"
3. Click Reset
4. Edit for "Tech Lead"
5. Click Export JSON → save as "techlead.json"
6. Import whichever you need for each application
```

### ATS Optimization
- Use Compact or Normal preset
- Choose Classic Black or Professional Blue theme
- Underline header style
- Disc or Circle bullets
- Arial or Calibri font
- Body text 12-14px

### Visual Impact
- Use Spacious preset
- Modern Purple or Tech Green theme
- Background header style
- Arrow or Chevron bullets
- Inter or Helvetica font
- Show Projects section

---

## 🛠️ Development Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server (http://localhost:3000) |
| `npm run build` | Build optimized production bundle |
| `npm start` | Start production server |
| `npm run lint` | Check code for issues |
| `npm run format` | Auto-format code |

---

## 🎓 Learning the Interface

### First 5 Minutes
1. ✅ Click some text and edit it
2. ✅ Try the bottom toolbar - change layout
3. ✅ Click a theme color
4. ✅ Toggle icons OFF and ON
5. ✅ See the green "Saved!" notification

### Next 10 Minutes
1. ✅ Click "More Options"
2. ✅ Explore the 3 tabs
3. ✅ Try different bullet styles
4. ✅ Adjust some spacing sliders
5. ✅ Reorder a section

### Next 15 Minutes
1. ✅ Add a new experience entry
2. ✅ Add some achievements
3. ✅ Customize all sections
4. ✅ Export as PDF
5. ✅ Export as JSON

### Mastery (30+ Minutes)
1. ✅ Create multiple resume versions
2. ✅ Perfect your customization
3. ✅ Understand all options
4. ✅ Deploy to Vercel
5. ✅ Share with friends

---

## 🚀 Deploy to Production

### Quick Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Via GitHub (Recommended)
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Click "Deploy"
6. Live in ~2 minutes! 🎉

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

---

## 🆘 Troubleshooting

### Issue: Toolbar overlapping content
**Solution**: Scroll down - there's extra padding at bottom

### Issue: Changes not saving
**Solution**: Check browser console, ensure localStorage enabled

### Issue: PDF looks different than screen
**Solution**: Use Chrome/Edge for best results

### Issue: Icons not showing
**Solution**: Check Icons toggle in bottom toolbar (should be ON)

### Issue: Underline not visible
**Solution**: 
```javascript
// Open browser console and run:
localStorage.removeItem('cvgen_customization');
location.reload();
```

### Issue: Build errors
```bash
rm -rf node_modules .next
npm install
npm run build
```

---

## 📞 Need More Help?

### Documentation
- **[README.md](../README.md)** - Overview
- **[FEATURES.md](./FEATURES.md)** - All features explained
- **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** - How it works
- **[ADD_REMOVE_GUIDE.md](./ADD_REMOVE_GUIDE.md)** - Modify features

### Check the Code
- All components are well-documented
- TypeScript provides type hints
- Console logs show save status

---

## 🎉 You're All Set!

### Summary Checklist
- ✅ Dependencies installed: `npm install`
- ✅ Server running: `npm run dev`
- ✅ Browser open: http://localhost:3000
- ✅ Understand the interface
- ✅ Know how to edit content
- ✅ Know how to customize
- ✅ Know how to export PDF
- ✅ Ready to create amazing resumes! 🚀

---

**Start building your perfect resume now! 💼**

**Questions? Check the docs folder for detailed guides!**
