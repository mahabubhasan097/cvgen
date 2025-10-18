# CVGen - Advanced Resume Builder for IT Professionals

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](CHANGELOG.md)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![Live Demo](https://img.shields.io/badge/demo-live-success.svg)](https://cvgen-ecru.vercel.app/)

**🌐 Live Demo**: [https://cvgen-ecru.vercel.app/](https://cvgen-ecru.vercel.app/)

A modern, production-grade resume builder with powerful customization features. Create beautiful, ATS-friendly resumes with inline editing, instant PDF download, and advanced styling options.

## ✨ Key Features

### 🎨 **Multiple Professional Templates**
- **6 Unique Templates**: Professional Standard, Executive Minimal, Technical Two-Column, Creative Modern, Academic Comprehensive, European Standard
- **Template-Specific Sections**: Each template has optimized sections for different industries
- **Research-Based Design**: Templates follow international CV standards and industry best practices
- **Easy Template Switching**: Change templates instantly with preserved content

### 🎨 **Advanced Customization System**
- **Quick Customizer Toolbar**: Floating toolbar with instant access to common options
- **Full Customization Sidebar**: 3 tabs (Quick, Advanced, Sections) for detailed control
- **Live Preview**: See changes instantly as you customize
- **Toast Notifications**: Visual feedback for every change
- **Template-Aware Customization**: Settings adapt to each template's design

### ✏️ **Powerful Editing**
- **Inline Editing**: Click any text to edit directly
- **Add/Remove Functionality**: Add or remove experience, education, skills, certifications, and projects
- **Auto-Save**: Changes saved automatically to browser
- **Import/Export**: Save and load resume data as JSON
- **Multiple Sections**: Summary, Experience, Education, Skills, Certifications, Projects

### 📥 **Professional Export**
- **PDF Download**: High-quality PDF with clickable links
- **Print Option**: Browser print dialog with custom styling
- **ATS-Optimized**: All templates optimized for 90+ ATS scores
- **A4 Layout**: Perfect for printing and PDF generation

### 🎨 **Professional Templates**

#### Template Options
- **Professional Standard**: Classic single-column layout, perfect for most industries
- **Executive Minimal**: Clean, centered design for C-suite executives and senior leadership
- **Technical Two-Column**: Sidebar layout highlighting technical skills and certifications
- **Creative Modern**: Asymmetrical design with visual elements for creative professionals
- **Academic Comprehensive**: Traditional academic CV format for researchers and educators
- **European Standard**: Europass format compliant with European CV standards

#### Template Features
- **Industry-Specific**: Each template optimized for different career paths
- **ATS-Optimized**: All templates score 90+ on ATS systems
- **International Standards**: Based on research of global CV best practices
- **Dynamic Sections**: Template-specific section configurations and ordering

### 🎨 **Customization Features**

#### Layout & Typography
- **3 Preset Layouts**: Compact, Normal, Spacious
- **Font Sizes**: Adjustable name (24-40px), headings (14-24px), body (10-16px)
- **Spacing Controls**: Section spacing, line height, letter spacing, page margins
- **Font Family**: 7 ATS-safe fonts (Inter, Arial, Helvetica, Calibri, Georgia, Times New Roman, Verdana)

#### Colors & Themes
- **5 Built-in Themes**: Classic Black, Professional Blue, Modern Purple, Tech Green, Executive Gray
- **Custom Accent Color**: Color picker for unlimited customization
- **Theme Colors**: Primary, secondary, text, and border colors

#### Styling Options
- **Bullet Styles**: 5 options (Disc, Circle, Square, Arrow, Chevron)
- **Header Styles**: 3 options (Underline, Background, Border)
- **Heading Case**: Normal, UPPERCASE, Title Case
- **Section Dividers**: Toggle on/off
- **Contact Icons**: Show/hide with size control
- **Border Width**: Adjustable (1-4px)

#### Sections Management
- **Show/Hide Sections**: Toggle visibility for any section
- **Reorder Sections**: Move sections up/down
- **Rename Sections**: Customize section titles
- **6 Available Sections**: Summary, Experience, Education, Skills, Certifications, Projects

### 💾 **Data Management**
- **Auto-Save**: Every change saved to localStorage
- **Export JSON**: Backup your resume data
- **Import JSON**: Load saved resumes
- **Reset**: Return to default template
- **Multiple Versions**: Create and save different resume versions

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.4 (App Router)
- **Frontend**: React 18.3.1
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4.1
- **PDF**: react-to-print, jsPDF, html2pdf.js
- **Storage**: Browser LocalStorage
- **Deployment**: Vercel-ready

## 📋 Prerequisites

- Node.js 20+
- npm/yarn/pnpm
- Modern web browser

## 🚀 Quick Start

### Try It Live
**No installation needed!** Try CVGen now: **[https://cvgen-ecru.vercel.app/](https://cvgen-ecru.vercel.app/)**

### Local Development

```bash
# Install dependencies
npm install

# Run development server
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

Open [http://localhost:3000](http://localhost:3000) to use the app.

## 📁 Project Structure

```
cvgen/
├── docs/                        # Documentation
│   ├── ADD_REMOVE_GUIDE.md     # Component guide
│   ├── CONTRIBUTING.md         # Contribution guidelines
│   ├── DEPLOYMENT.md           # Deployment instructions
│   ├── FEATURES.md             # Feature documentation
│   ├── GET_STARTED.md          # Getting started guide
│   ├── PROJECT_STRUCTURE.md    # Architecture overview
│   └── QUICK_START.md          # Quick reference
├── public/                      # Static assets
│   ├── apple-icon.png          # App icon
│   └── icon.svg                # SVG icon
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── globals.css         # Global styles & print CSS
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Main page with state management
│   ├── components/             # React components
│   │   ├── ActionButtons.tsx           # Reusable action buttons
│   │   ├── CustomizationPanel.tsx      # Customization panel
│   │   ├── CustomizationSidebar.tsx    # Full customization sidebar
│   │   ├── CustomizationToast.tsx      # Toast notifications
│   │   ├── EditableField.tsx           # Inline editable text
│   │   ├── PDFInstructions.tsx         # PDF download modal
│   │   ├── QuickCustomizer.tsx         # Floating quick toolbar
│   │   ├── Resume.tsx                  # Main resume component
│   │   ├── ResumeSection.tsx           # Section wrapper
│   │   ├── templates/                  # Template system
│   │   │   ├── TemplateEngine.tsx      # Template selection engine
│   │   │   ├── TemplateSelector.tsx    # Template selector component
│   │   │   └── renderers/              # Individual template renderers
│   │   │       ├── ProfessionalStandardTemplate.tsx
│   │   │       ├── ExecutiveMinimalTemplate.tsx
│   │   │       ├── TechnicalTwoColumnTemplate.tsx
│   │   │       ├── CreativeModernTemplate.tsx
│   │   │       ├── AcademicComprehensiveTemplate.tsx
│   │   │       └── EuropeanStandardTemplate.tsx
│   ├── constants/              # App constants
│   │   ├── defaultResume.ts    # Default resume template
│   │   ├── templates.ts        # Template definitions
│   │   └── templateSections.ts # Template-specific section configs
│   ├── types/                  # TypeScript interfaces
│   │   ├── customization.ts    # Customization types
│   │   ├── resume.ts           # Resume data types
│   │   └── templates.ts        # Template type definitions
│   └── utils/                  # Utility functions
│       ├── pdfGenerator.ts     # PDF generation logic
│       ├── sectionRenderer.tsx # Shared section rendering utility
│       └── storage.ts          # LocalStorage helpers
├── .eslintrc.json              # ESLint configuration
├── .gitignore                  # Git ignore rules
├── next.config.js              # Next.js configuration
├── package.json                # Dependencies & scripts
├── postcss.config.mjs          # PostCSS configuration
├── README.md                   # This file
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── vercel.json                 # Vercel deployment config
```

## 🎯 How to Use

### Template Selection
1. **Choose Template**: Select from 6 professional templates in the template selector
2. **Template-Specific Features**: Each template has optimized sections and layouts
3. **Switch Anytime**: Change templates while preserving your content
4. **Auto-Adaptation**: Customization settings adapt to each template's design

### Basic Editing
1. Click any text on the resume to edit
2. Changes auto-save to browser
3. Press Enter to finish, Escape to cancel
4. Use add/remove buttons to manage sections

### Quick Customization (Bottom Toolbar)
- **Layout**: Choose Compact, Normal, or Spacious
- **Theme**: Pick from 5 color themes
- **Font**: Select ATS-safe font
- **Size**: Quick A-/A+ font adjustment
- **Headers**: Change header style
- **Icons**: Toggle contact icons on/off
- **More Options**: Open full customization sidebar

### Advanced Customization (Sidebar)
Click "Customize" or "More Options" to access:
- **Quick Tab**: Themes, bullets, heading styles, colors
- **Advanced Tab**: Font sizes, line heights, spacing, borders
- **Sections Tab**: Show/hide, reorder, rename sections

### Export Options
- **Save as PDF**: Download with clickable links
- **Export JSON**: Backup your data
- **Import JSON**: Load saved resume
- **Reset**: Return to default template

## 🎨 Customization Tips

### For Different Industries
- **Corporate**: Classic Black theme, underline headers, normal case
- **Startup**: Modern Purple theme, show projects, compact layout
- **Traditional**: Executive Gray theme, formal titles, spacious layout
- **Tech**: Tech Green or Professional Blue, arrow bullets, show GitHub

### Length Optimization
- **Too Long**: Use compact preset, reduce spacing, hide less relevant sections
- **Too Short**: Use spacious preset, increase spacing, show projects/certifications

### ATS Best Practices
✅ Use underline header style for maximum compatibility  
✅ Keep body font 12-14px  
✅ Stick to preset themes  
✅ Use disc or circle bullets  
✅ Maintain single-column layout  

## 📤 Deployment

### Deploy to Vercel (Recommended)
1. Push code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy with one click!

Or use Vercel CLI:
```bash
npm i -g vercel
vercel
```

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed instructions.

## 🧪 Development

### Code Quality
- ✅ TypeScript for type safety
- ✅ ESLint for code quality
- ✅ Prettier for formatting
- ✅ Clean, documented code
- ✅ Reusable components
- ✅ Production-ready

### Best Practices
- DRY (Don't Repeat Yourself)
- KISS (Keep It Simple)
- Component-based architecture
- Proper state management
- Optimized performance

## 📚 Documentation

- **[Templates Guide](docs/TEMPLATES.md)** - Complete guide to all 6 professional templates
- **[Features](docs/FEATURES.md)** - Complete feature guide
- **[Quick Start](docs/QUICK_START.md)** - Get started in 2 minutes
- **[Get Started](docs/GET_STARTED.md)** - Detailed setup guide
- **[Project Structure](docs/PROJECT_STRUCTURE.md)** - Architecture overview
- **[Deployment](docs/DEPLOYMENT.md)** - Deployment instructions
- **[Contributing](docs/CONTRIBUTING.md)** - Contribution guidelines
- **[Release Notes](docs/RELEASE_NOTES.md)** - What's new in each version

## 📋 Versioning

CVGen follows [Semantic Versioning](https://semver.org/). See [CHANGELOG.md](CHANGELOG.md) for version history.

**Current Version**: 1.0.0  
**Latest Release**: [Release Notes](docs/RELEASE_NOTES.md)  

### Version in UI
- Check the footer: "v1.0.0 - What's New?"
- Click to view release notes modal
- Quick Customizer toolbar shows version
- First-time visitors see "What's New" automatically

## 🤝 Contributing

Contributions are welcome! Please check [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) for guidelines.

## 📝 License

MIT License - feel free to use for personal or commercial purposes.

## 🎉 What Makes This Special

### Powerful Features
- ✅ Most advanced open-source resume builder
- ✅ 30+ customization options
- ✅ Professional quality output
- ✅ No premium tiers or paywalls

### Privacy & Control
- ✅ All data stays in your browser
- ✅ No account required
- ✅ Export and own your data
- ✅ Works offline after first load

### Production Ready
- ✅ Clean, maintainable code
- ✅ Full TypeScript coverage
- ✅ Optimized performance
- ✅ Responsive design
- ✅ ATS-friendly output

## 🙏 Acknowledgments

Built with ❤️ for the developer community. Designed for IT professionals who need:
- ATS-friendly resumes
- Professional customization
- Complete control over their data
- Modern, efficient tools

---

**Made with ❤️ for IT Professionals | Star ⭐ if you find this useful!**
