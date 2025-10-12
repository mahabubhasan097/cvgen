# Changelog

All notable changes to CVGen will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned Features
- AI-powered content suggestions
- Multiple resume templates
- Cloud storage integration
- Resume analytics dashboard
- A/B testing for applications
- Export to DOCX format
- Keyboard shortcuts
- Dark mode support

---

## [1.0.0] - 2025-10-12

### 🎉 Major Release - Advanced Customization System

This release transforms CVGen from a basic resume editor to a professional-grade resume builder with 30+ customization options.

### ✨ Added

#### Customization System
- **QuickCustomizer Toolbar** - Floating bottom toolbar with instant access to common options
  - Layout presets (Compact, Normal, Spacious) with emoji indicators
  - 5 theme color swatches with visual preview
  - Font family dropdown (7 ATS-safe fonts)
  - Quick font size adjustment (A-/A+ buttons)
  - Header style toggle (Underline, Background, Border)
  - Icons toggle with visual ON/OFF indicator
  - "More Options" button to open full sidebar

- **CustomizationSidebar** - Comprehensive 3-tab customization panel
  - **Quick Tab**: Themes, fonts, header styles, bullet styles, colors, dividers
  - **Advanced Tab**: Font sizes, line heights, spacing, borders, icon sizes
  - **Sections Tab**: Show/hide sections, reorder, rename

- **Visual Feedback System**
  - Toast notifications for all customization changes
  - Slide-in animation from right
  - Auto-dismiss after 2 seconds
  - Shows exactly what changed

#### Styling Options
- **5 Bullet Styles**: Disc, Circle, Square, Arrow (→), Chevron (›)
- **3 Header Styles**: Underline, Background, Border
- **3 Heading Cases**: Normal, UPPERCASE, Title Case
- **Custom Accent Color**: Color picker + hex input with theme reset
- **Section Dividers**: Toggle subtle dividers between sections
- **Border Width Control**: 1-4px adjustable borders
- **Icon Size Control**: 10-20px customizable icons

#### Typography System
- **Font Size Controls**: Name (24-40px), Heading (14-24px), Body (10-16px)
- **Line Height Controls**: Heading, Body, List independently adjustable
- **Spacing Controls**: Section spacing, letter spacing, page margins
- **7 ATS-Safe Fonts**: Inter, Arial, Helvetica, Calibri, Georgia, Times New Roman, Verdana
- **3 Layout Presets**: Compact, Normal, Spacious with coordinated settings

#### Color Themes
- **Classic Black** - Traditional, timeless (#000000)
- **Professional Blue** - Corporate, trustworthy (#1E40AF)
- **Modern Purple** - Creative, innovative (#7C3AED)
- **Tech Green** - Fresh, tech-forward (#059669)
- **Executive Gray** - Sophisticated, elegant (#374151)

#### Section Management
- Show/hide any of 6 sections
- Reorder sections with up/down arrows
- Rename section titles
- Dynamic rendering based on visibility
- Order persistence in localStorage

#### Components Added
- `QuickCustomizer.tsx` - Floating quick toolbar component
- `CustomizationSidebar.tsx` - Full customization panel with tabs
- `CustomizationToast.tsx` - Toast notification component
- `CustomizationPanel.tsx` - Legacy panel (may be deprecated)
- `ActionButtons.tsx` - Reusable add/remove buttons
- `PDFInstructions.tsx` - PDF download guide modal

#### Types & Interfaces
- Extended `CustomizationSettings` interface with 14 properties
- Added `SectionConfig` interface for section management
- Added `ColorTheme` interface for theme definitions
- `DEFAULT_THEMES` constant (5 themes)
- `PRESET_CONFIGS` constant (3 presets)
- `ATS_SAFE_FONTS` constant (7 fonts)

### 🔧 Changed

#### UI/UX Improvements
- Reorganized layout with better spacing
- Added bottom padding (40px) to prevent toolbar overlap
- Smart positioning of Quick Customizer (centered on resume on desktop)
- Responsive toolbar wrapping on mobile devices
- Hidden dividers on small screens for cleaner look
- Improved icon consistency across all contact fields

#### Resume Component
- Applied custom bullet styles to achievement lists
- Applied accent color to name, headers, and custom bullets
- Applied heading text transform (normal/uppercase/capitalize)
- Conditional rendering of section dividers
- All contact icons now respect showIcons setting
- Icon size customization applied consistently

#### Storage System
- Backward compatibility for loading old customization data
- Automatic migration of old saves to new structure
- Merged defaults ensure all properties exist
- Separate storage for resume data and customization

#### Performance
- Optimized re-renders
- Efficient change detection for toast notifications
- Debounced auto-save
- Conditional component rendering

### 🐛 Fixed

#### Critical Fixes
- **Runtime TypeError**: Fixed undefined property access in toast detection
- **Icon Inconsistency**: All contact icons now show/hide together
- **Storage Compatibility**: Old saves now work with new properties
- **Toolbar Overlap**: Fixed Quick Customizer overlapping footer on mobile
- **Print View Icons**: Icons in PDF now respect settings

#### UI Fixes
- Proper spacing between Quick Customizer and page content
- Responsive wrapping of toolbar controls
- Consistent icon sizing across editable and print views
- Section header underlines now apply accent color
- Border width properly applied to all header styles

### 📚 Documentation

#### New Documentation
- Created `docs/INDEX.md` - Complete documentation index
- Created comprehensive CHANGELOG.md (this file)

#### Updated Documentation
- Updated `README.md` with all current features
- Updated `docs/FEATURES.md` with 30+ customization options
- Updated `docs/PROJECT_STRUCTURE.md` with all 9 components
- Updated `docs/QUICK_START.md` with Quick Customizer guide
- Updated `docs/GET_STARTED.md` with current interface

#### Documentation Organization
- Moved 7 docs to `docs/` folder for clean root
- Deleted 7 unnecessary session note files
- Added cross-references between docs
- Added time estimates for reading
- Added learning paths for different users

---

## [0.1.0] - 2025-10-01 (Initial Release)

### ✨ Added - Core Features

#### Resume Builder
- Single-column ATS-friendly resume layout
- Inline editing for all text fields
- 6 resume sections: Summary, Experience, Education, Skills, Certifications, Projects
- Contact information with optional fields (LinkedIn, GitHub, Portfolio)

#### Editing Features
- Click-to-edit inline editing
- EditableField component with focus management
- Enter to save, Escape to cancel
- Paste as plain text (formatting stripped)
- Multiline text support

#### Content Management
- Add/remove experience entries
- Add/remove achievement bullets
- Add/remove education entries
- Add/remove skill categories
- Add/remove certifications
- Add/remove projects
- Add/remove optional contact fields
- Minimum entry requirements (safety features)

#### Export Options
- PDF download via browser print
- Export resume data as JSON
- Import resume data from JSON
- Reset to default template
- Clickable links in PDF output

#### Data Persistence
- Auto-save to localStorage
- Save notifications
- Resume data persistence
- Works offline after first load
- No account required

#### Components (Initial)
- `Resume.tsx` - Main resume component
- `ResumeSection.tsx` - Section wrapper
- `EditableField.tsx` - Inline editable field
- `page.tsx` - Main application page

#### Types & Interfaces
- `ResumeData` interface
- `ContactInfo` interface
- `WorkExperience` interface
- `Education` interface
- `Skill` interface
- `Certification` interface
- `Project` interface

#### UI/UX
- Clean, professional design
- Responsive layout
- Glass morphism effects
- Smooth animations
- Hover effects
- Loading state

#### Tech Stack
- Next.js 15.5.4
- React 18.3.1
- TypeScript 5
- Tailwind CSS 3.4.1
- react-to-print 3.1.1

---

## Version History Summary

| Version | Date | Major Changes | Files Changed |
|---------|------|---------------|---------------|
| 1.0.0 | 2025-10-12 | Advanced Customization System | 15+ files |
| 0.1.0 | 2025-10-01 | Initial Release | Core app |

---

## Semantic Versioning Guide

CVGen follows [Semantic Versioning](https://semver.org/):

### Version Format: MAJOR.MINOR.PATCH

- **MAJOR** (1.x.x): Breaking changes, major feature overhauls
- **MINOR** (x.1.x): New features, backward-compatible additions
- **PATCH** (x.x.1): Bug fixes, minor improvements

### Examples:
- `1.0.0` → `1.1.0`: Added new customization options (minor)
- `1.1.0` → `1.1.1`: Fixed toast notification bug (patch)
- `1.1.1` → `2.0.0`: Changed data structure (major, breaking)

---

## Release Notes Format

Each release includes:
- **Version number** and **date**
- **Added**: New features
- **Changed**: Modifications to existing features
- **Fixed**: Bug fixes
- **Deprecated**: Features being phased out
- **Removed**: Deleted features
- **Security**: Security improvements

---

## How to Update Version

### For Developers

1. **Update package.json**:
```bash
npm version patch   # 1.0.0 → 1.0.1 (bug fixes)
npm version minor   # 1.0.0 → 1.1.0 (new features)
npm version major   # 1.0.0 → 2.0.0 (breaking changes)
```

2. **Update CHANGELOG.md**:
- Add new version section at top
- Document all changes
- Move items from [Unreleased] to version section

3. **Commit and Tag**:
```bash
git add .
git commit -m "Release v1.1.0: Add new features"
git tag -a v1.1.0 -m "Version 1.1.0"
git push origin main --tags
```

---

## Contributing

When adding features:
1. Add to [Unreleased] section
2. Use appropriate category (Added, Changed, Fixed, etc.)
3. Describe user-facing changes clearly
4. Link to PR or issue if applicable

---

## Links

- **Repository**: [GitHub](https://github.com/yourusername/cvgen)
- **Documentation**: [docs/INDEX.md](docs/INDEX.md)
- **Issues**: [GitHub Issues](https://github.com/yourusername/cvgen/issues)
- **Releases**: [GitHub Releases](https://github.com/yourusername/cvgen/releases)

---

**Last Updated**: October 12, 2025  
**Current Version**: 1.0.0  
**Status**: Stable ✅

