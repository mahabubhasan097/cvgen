# Project Structure

## 📁 Complete File Tree

```
cvgen/
├── .vscode/
│   ├── extensions.json          # Recommended VS Code extensions
│   └── settings.json             # VS Code workspace settings
│
├── public/
│   └── favicon.ico               # App favicon
│
├── src/
│   ├── app/
│   │   ├── globals.css           # Global styles & print styles
│   │   ├── layout.tsx            # Root layout with metadata
│   │   └── page.tsx              # Main page with controls & resume
│   │
│   ├── components/
│   │   ├── EditableField.tsx     # Inline editable text component
│   │   ├── Resume.tsx            # Main resume layout component
│   │   └── ResumeSection.tsx     # Section wrapper component
│   │
│   ├── constants/
│   │   └── defaultResume.ts      # Default resume template data
│   │
│   ├── types/
│   │   └── resume.ts             # TypeScript interfaces
│   │
│   └── utils/
│       └── storage.ts            # LocalStorage utilities
│
├── .eslintrc.json                # ESLint configuration
├── .gitignore                    # Git ignore rules
├── .prettierrc                   # Prettier configuration
├── CONTRIBUTING.md               # Contribution guidelines
├── DEPLOYMENT.md                 # Deployment guide
├── next.config.js                # Next.js configuration
├── package.json                  # Dependencies & scripts
├── postcss.config.mjs            # PostCSS configuration
├── PROJECT_STRUCTURE.md          # This file
├── QUICK_START.md                # Quick start guide
├── README.md                     # Main documentation
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── vercel.json                   # Vercel deployment config
```

## 📦 Key Files Explained

### Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies, scripts, and project metadata |
| `tsconfig.json` | TypeScript compiler configuration |
| `tailwind.config.ts` | Tailwind CSS customization |
| `next.config.js` | Next.js framework configuration |
| `vercel.json` | Vercel deployment settings |
| `.eslintrc.json` | Code linting rules |
| `.prettierrc` | Code formatting rules |

### Application Files

#### `/src/app/`
- **layout.tsx**: Root layout, sets up fonts and metadata
- **page.tsx**: Main application page with all functionality
- **globals.css**: Global styles including print-specific CSS

#### `/src/components/`
- **EditableField.tsx**: Reusable inline editable text field
  - Handles content editable behavior
  - Manages focus states
  - Prevents formatting issues on paste
  
- **Resume.tsx**: Main resume component
  - ATS-friendly single-column layout
  - Sections: Contact, Summary, Experience, Education, Skills, Certifications
  - Editable and non-editable modes
  
- **ResumeSection.tsx**: Section wrapper
  - Consistent section styling
  - Reusable across resume

#### `/src/types/`
- **resume.ts**: TypeScript interfaces for:
  - ContactInfo
  - WorkExperience
  - Education
  - Skill
  - Certification
  - Project
  - ResumeData (main interface)

#### `/src/constants/`
- **defaultResume.ts**: Default template
  - Sample data for IT professional
  - Complete example with all sections
  - Easy to customize

#### `/src/utils/`
- **storage.ts**: Browser storage utilities
  - Save/load resume data
  - Export/import JSON
  - Clear storage

### Documentation Files

| File | Description |
|------|-------------|
| `README.md` | Main documentation with features and usage |
| `QUICK_START.md` | Get started in 2 minutes |
| `DEPLOYMENT.md` | Complete deployment guide for Vercel |
| `CONTRIBUTING.md` | Guidelines for contributors |
| `PROJECT_STRUCTURE.md` | This file - project overview |

### VS Code Configuration

- **settings.json**: Auto-format on save, ESLint integration
- **extensions.json**: Recommended extensions for better DX

## 🎯 Code Organization Principles

### Component Hierarchy
```
App (page.tsx)
└── Resume (Resume.tsx)
    ├── Header (inline)
    └── ResumeSection (ResumeSection.tsx)
        └── EditableField (EditableField.tsx)
```

### Data Flow
```
page.tsx (state) → Resume (props) → EditableField (props)
EditableField (onChange) → Resume (callback) → page.tsx (setState)
```

### State Management
- **Local State**: React useState for resume data
- **Persistence**: LocalStorage via utils/storage.ts
- **Auto-save**: useEffect watches for changes

## 🔧 Key Technologies

### Core
- **Next.js 15**: React framework with App Router
- **React 19**: UI library
- **TypeScript 5**: Type safety

### Styling
- **Tailwind CSS**: Utility-first CSS
- **Custom CSS**: Print-specific styles

### Features
- **react-to-print**: PDF generation
- **LocalStorage API**: Data persistence

### Development
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **TypeScript**: Type checking

## 📊 File Statistics

- **Total Files**: ~20
- **TypeScript Files**: 8
- **Configuration Files**: 8
- **Documentation Files**: 5
- **Lines of Code**: ~1,500

## 🚀 Build Output

After running `npm run build`:
```
.next/
├── cache/              # Build cache
├── server/             # Server components
├── static/             # Static assets
└── standalone/         # Standalone build
```

## 🎨 Styling Architecture

### Tailwind Utilities
- Layout: `flex`, `grid`, `space-y`
- Typography: `text-*`, `font-*`
- Spacing: `p-*`, `m-*`, `gap-*`
- Colors: `bg-*`, `text-*`, `border-*`

### Custom CSS
- Print styles (media queries)
- Content editable placeholders
- Scrollbar customization

## 🔐 Security

### Built-in
- ✅ Next.js security headers
- ✅ No exposed API keys
- ✅ Client-side only storage
- ✅ XSS protection via React

### Best Practices
- No sensitive data stored
- Content Security Policy ready
- HTTPS enforced on Vercel

## 📱 Responsive Design

### Breakpoints (Tailwind)
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px

### Mobile-First
All styles are mobile-first, with larger screens enhanced.

## 🧪 Testing Strategy (Future)

Recommended testing setup:
- **Unit**: Jest + React Testing Library
- **E2E**: Playwright or Cypress
- **Type Checking**: TypeScript (already set up)

## 📈 Performance

### Optimizations
- ✅ React 19 automatic optimizations
- ✅ Next.js automatic code splitting
- ✅ Tailwind CSS purging unused styles
- ✅ Optimized font loading
- ✅ Minimal dependencies

### Lighthouse Score Target
- Performance: 90+
- Accessibility: 90+
- Best Practices: 100
- SEO: 100

## 🔄 Future Enhancements

Potential additions:
- Multiple resume templates
- Real-time collaboration
- Cloud storage integration
- More export formats (DOCX, HTML)
- AI-powered content suggestions
- Analytics dashboard
- User authentication
- Resume sharing links

---

**This structure follows industry best practices for production-grade applications! 🚀**

