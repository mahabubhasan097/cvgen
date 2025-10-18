# 📁 CVGen - Project Structure

## Complete File Tree

```
cvgen/
├── docs/                              # Documentation
│   ├── ADD_REMOVE_GUIDE.md           # Adding/removing features
│   ├── CONTRIBUTING.md               # Contribution guidelines
│   ├── DEPLOYMENT.md                 # Deployment instructions
│   ├── FEATURES.md                   # Complete feature guide
│   ├── GET_STARTED.md                # Getting started
│   ├── PROJECT_STRUCTURE.md          # This file
│   ├── QUICK_START.md                # Quick reference
│   ├── TEMPLATES.md                  # Template system guide
│   └── RELEASE_NOTES.md              # Release notes

├── public/                            # Static assets
│   ├── apple-icon.png                # iOS app icon
│   └── icon.svg                      # SVG icon

├── src/                               # Source code
│   ├── app/                          # Next.js App Router
│   │   ├── globals.css               # Global styles & print CSS
│   │   ├── layout.tsx                # Root layout with metadata
│   │   └── page.tsx                  # Main page with state management
│   │
│   ├── components/                   # React components
│   │   ├── ActionButtons.tsx         # Reusable add/remove buttons
│   │   ├── CustomizationPanel.tsx    # Legacy panel component
│   │   ├── CustomizationSidebar.tsx  # Full customization sidebar (3 tabs)
│   │   ├── CustomizationToast.tsx    # Toast notification component
│   │   ├── EditableField.tsx         # Inline editable text field
│   │   ├── PDFInstructions.tsx       # PDF download modal
│   │   ├── QuickCustomizer.tsx       # Floating quick toolbar
│   │   ├── Resume.tsx                # Main resume layout (default template)
│   │   ├── ResumeSection.tsx         # Section wrapper with styling
│   │   ├── TemplateSelector.tsx      # Template selection component
│   │   └── templates/                # Template system
│   │       ├── TemplateEngine.tsx    # Template rendering engine
│   │       ├── BaseTemplate.tsx      # Base template component
│   │       ├── shared/               # Shared template components
│   │       │   └── ResumeSections.tsx # Legacy shared sections
│   │       └── renderers/            # Individual template renderers
│   │           ├── ProfessionalStandardTemplate.tsx
│   │           ├── ExecutiveMinimalTemplate.tsx
│   │           ├── TechnicalTwoColumnTemplate.tsx
│   │           ├── CreativeModernTemplate.tsx
│   │           ├── AcademicComprehensiveTemplate.tsx
│   │           └── EuropeanStandardTemplate.tsx
│   │
│   ├── constants/                    # Application constants
│   │   ├── defaultResume.ts          # Default resume template data
│   │   ├── templates.ts              # Template definitions and metadata
│   │   └── templateSections.ts       # Template-specific section configurations
│   │
│   ├── types/                        # TypeScript interfaces
│   │   ├── customization.ts          # Customization types & defaults
│   │   ├── resume.ts                 # Resume data interfaces
│   │   └── templates.ts              # Template type definitions
│   │
│   └── utils/                        # Utility functions
│       ├── pdfGenerator.ts           # PDF generation logic
│       ├── sectionRenderer.tsx       # Shared section rendering utility
│       └── storage.ts                # LocalStorage helpers & template switching

├── .eslintrc.json                    # ESLint configuration
├── .gitignore                        # Git ignore rules
├── next.config.js                    # Next.js configuration
├── package.json                      # Dependencies & scripts
├── postcss.config.mjs                # PostCSS configuration
├── README.md                         # Main documentation
├── tailwind.config.ts                # Tailwind CSS configuration
├── tsconfig.json                     # TypeScript configuration
├── vercel.json                       # Vercel deployment configuration
└── VERSION                           # Current version file
```

---

## 🏗️ Architecture Overview

### Core System Components

#### 1. **Template System** (`src/components/templates/`)
The template system is the heart of CVGen, providing multiple professional resume layouts:

- **TemplateEngine.tsx**: Central template rendering engine that manages template selection and rendering
- **TemplateSelector.tsx**: UI component for template selection
- **Individual Renderers**: Each template has its own renderer component with unique design and layout

#### 2. **Shared Section Renderer** (`src/utils/sectionRenderer.tsx`)
Centralized utility for rendering resume sections consistently across all templates:

- **Unified Rendering**: All templates use the same section rendering logic
- **Add/Remove Functionality**: Comprehensive editing capabilities
- **Customization Integration**: Responds to all customization settings
- **Consistent Behavior**: Ensures uniform functionality across templates

#### 3. **Customization System** (`src/components/CustomizationSidebar.tsx`)
Advanced customization interface with three main tabs:

- **Quick Tab**: Common customization options
- **Advanced Tab**: Detailed typography and spacing controls
- **Sections Tab**: Section visibility and ordering management

#### 4. **Template-Specific Configurations** (`src/constants/templateSections.ts`)
Each template has its own section configuration:

- **Section Ordering**: Templates define their own section order
- **Section Visibility**: Some sections are hidden by default in certain templates
- **Template Identity**: Each template maintains its unique characteristics

---

## 📂 Detailed Component Structure

### Template System Architecture

```
Template System/
├── TemplateEngine.tsx              # Main template engine
│   ├── Template Selection Logic    # Chooses appropriate template
│   ├── Props Management            # Passes data and customization
│   └── Rendering Coordination      # Coordinates template rendering
│
├── Individual Templates/           # Template-specific renderers
│   ├── ProfessionalStandardTemplate.tsx    # Default template
│   ├── ExecutiveMinimalTemplate.tsx        # Executive-focused design
│   ├── TechnicalTwoColumnTemplate.tsx      # Two-column with sidebar
│   ├── CreativeModernTemplate.tsx          # Creative, asymmetrical
│   ├── AcademicComprehensiveTemplate.tsx   # Academic CV format
│   └── EuropeanStandardTemplate.tsx        # Europass format
│
└── Shared Utilities/
    ├── sectionRenderer.tsx         # Centralized section rendering
    ├── templateSections.ts         # Template-specific configurations
    └── templates.ts                # Template metadata and definitions
```

### Customization System Architecture

```
Customization System/
├── CustomizationSidebar.tsx        # Main customization interface
│   ├── Quick Tab                   # Common options
│   ├── Advanced Tab                # Detailed controls
│   └── Sections Tab                # Section management
│
├── QuickCustomizer.tsx             # Floating toolbar
│   ├── Layout Presets              # Compact, Normal, Spacious
│   ├── Theme Selection             # Color theme picker
│   ├── Font Controls               # Font family and size
│   └── Quick Actions               # Common customization actions
│
└── Integration/
    ├── CustomizationToast.tsx      # Visual feedback
    ├── storage.ts                  # Settings persistence
    └── customization.ts            # Type definitions
```

---

## 🔄 Data Flow

### Template Selection Flow
1. **User Selects Template** → TemplateSelector.tsx
2. **Template Change** → TemplateEngine.tsx
3. **Section Configuration Update** → templateSections.ts
4. **Customization Reset** → storage.ts
5. **Template Render** → Individual Template Renderer
6. **Section Rendering** → sectionRenderer.tsx

### Customization Flow
1. **User Changes Setting** → CustomizationSidebar.tsx
2. **Setting Update** → storage.ts (persistence)
3. **Toast Notification** → CustomizationToast.tsx
4. **Template Re-render** → TemplateEngine.tsx
5. **Visual Update** → All templates respond to changes

### Content Editing Flow
1. **User Clicks Text** → EditableField.tsx
2. **Inline Editing** → EditableField.tsx
3. **Content Update** → storage.ts (auto-save)
4. **Section Update** → sectionRenderer.tsx
5. **Template Re-render** → Individual Template Renderer

---

## 🎨 Template Design Patterns

### Design Philosophy
Each template follows specific design patterns based on industry research:

#### Professional Standard
- **Pattern**: Classic, traditional business resume
- **Layout**: Single column, standard spacing
- **Focus**: Universal compatibility, ATS optimization

#### Executive Minimal
- **Pattern**: C-suite executive format
- **Layout**: Centered, minimal, generous whitespace
- **Focus**: Leadership, sophistication, results

#### Technical Two-Column
- **Pattern**: Technical professional format
- **Layout**: Two-column with sidebar
- **Focus**: Skills prominence, technical projects

#### Creative Modern
- **Pattern**: Creative professional format
- **Layout**: Asymmetrical, modern, visual elements
- **Focus**: Portfolio, creativity, visual impact

#### Academic Comprehensive
- **Pattern**: Academic CV format
- **Layout**: Traditional academic structure
- **Focus**: Research, education, publications

#### European Standard
- **Pattern**: Europass CV format
- **Layout**: European standard structure
- **Focus**: International compliance, standardization

---

## 🔧 Development Guidelines

### Adding New Templates
1. **Create Renderer**: Add new template renderer in `src/components/templates/renderers/`
2. **Define Sections**: Add section configuration in `src/constants/templateSections.ts`
3. **Add Metadata**: Update template definitions in `src/constants/templates.ts`
4. **Update Types**: Add template types in `src/types/templates.ts`
5. **Test Integration**: Ensure template works with customization system

### Template Development Best Practices
- **Use renderSections**: Always use the shared section renderer for consistency
- **Follow Design Patterns**: Maintain template-specific design characteristics
- **Customization Integration**: Ensure all templates respond to customization
- **A4 Compliance**: All templates must fit A4 paper format
- **ATS Optimization**: Maintain 90+ ATS scores

### Code Organization
- **Single Responsibility**: Each component has one clear purpose
- **Reusable Components**: Share common functionality across templates
- **Type Safety**: Full TypeScript coverage for all components
- **Performance**: Optimize for rendering and customization responsiveness

---

## 📊 Performance Considerations

### Template Rendering
- **Lazy Loading**: Templates are rendered on-demand
- **Memoization**: Customization changes are optimized
- **Efficient Updates**: Only changed sections re-render

### Customization System
- **Debounced Updates**: Settings changes are optimized
- **Selective Re-rendering**: Only affected components update
- **Storage Optimization**: Efficient localStorage usage

### Section Rendering
- **Shared Logic**: Centralized rendering reduces code duplication
- **Optimized Updates**: Add/remove operations are efficient
- **Memory Management**: Proper cleanup of event listeners

---

**🎯 This architecture provides a scalable, maintainable foundation for the CVGen template system!**