import { ReleaseNotesData } from '@/types/releaseNotes';

export const releaseNotesData: ReleaseNotesData = {
  latestVersion: '2.0.1',
  releases: [
    {
      version: '2.0.1',
      releaseDate: 'October 19, 2025',
      versionName: 'Quick Fixes',
      type: 'patch',
      highlights: {
        title: 'Quick Fixes - Version 2.0.1',
        description:
          'This patch release fixes version display issues and improves the loading experience. All the powerful features from Version 2.0.0 remain intact with these important fixes.',
        emoji: '🐛',
      },
      features: [
        {
          title: "🔧 What's Fixed",
          items: [
            {
              title: 'Version Display Fixed',
              description:
                'Footer and Quick Customizer toolbar now correctly display v2.0.1 instead of the old v1.0.0. All version references throughout the app are now consistent.',
              category: 'fix',
            },
            {
              title: 'Double Loader Fixed',
              description:
                'Removed duplicate spinner in the loading screen. Now shows a single, clean loading animation when the app is initializing.',
              category: 'fix',
            },
            {
              title: 'Version Constants Updated',
              description:
                'All version constants, package.json, and VERSION file are now properly synchronized to 2.0.1. This ensures consistency across the entire application.',
              category: 'fix',
            },
          ],
        },
      ],
      bugFixes: [
        'Fixed version display inconsistencies across UI components',
        'Removed duplicate loading spinner animation',
        'Synchronized all version constants and files',
      ],
    },
    {
      version: '2.0.0',
      releaseDate: 'October 19, 2025',
      versionName: 'Advanced Template System & Typography Overhaul',
      type: 'major',
      highlights: {
        title: 'Major Release - Advanced Template System & Typography Overhaul',
        description:
          'CVGen Version 2.0.0 introduces a revolutionary template system with 5 professional categories and a comprehensive typography system, transforming it into a professional-grade resume builder with world-class design standards that rival premium resume builders!',
        emoji: '🎉',
      },
      features: [
        {
          title: "✨ What's New in 2.0.0",
          items: [
            {
              title: 'Professional Typography System',
              description:
                'Perfect 1.25 mathematical scale with 18 typography utility classes for consistent visual hierarchy. Professional font stack with Inter/Geist and system fallbacks.',
              category: 'feature',
            },
            {
              title: 'Advanced Template System',
              description:
                'Completely redesigned template selection with 5 professional categories (Professional, Creative, Academic, Executive, Technical). Enhanced template preview, improved filtering, and streamlined selection process for better user experience.',
              category: 'feature',
            },
            {
              title: 'Complete UI/UX Overhaul',
              description:
                'Modern, clean interface with improved Customization Sidebar organization. Professional aesthetics throughout the application with better spacing, typography, and visual hierarchy.',
              category: 'feature',
            },
            {
              title: 'Typography Hierarchy Classes',
              description:
                'Display text, headings, body text, labels, captions, and monospace classes. Perfect visual hierarchy with mathematical precision for professional results.',
              category: 'feature',
            },
            {
              title: 'Accessibility & Performance',
              description:
                'WCAG 2.1 compliance with proper contrast ratios. Optimized font loading and efficient rendering. Mobile-first responsive design with smooth animations.',
              category: 'improvement',
            },
          ],
        },
        {
          title: '🎨 Template System Features',
          items: [
            {
              title: '5 Professional Categories',
              description:
                'Organized templates by industry: Professional, Creative, Academic, Executive, and Technical for targeted resume building',
              category: 'feature',
            },
            {
              title: 'Enhanced Template Preview',
              description:
                'Improved template visualization with better preview system and selection interface',
              category: 'feature',
            },
            {
              title: 'Streamlined Selection Process',
              description:
                'Clean, minimal template selector with improved filtering and category navigation',
              category: 'feature',
            },
            {
              title: 'Professional Template Design',
              description:
                'All templates redesigned with modern aesthetics and professional layouts',
              category: 'feature',
            },
          ],
        },
        {
          title: '🎨 Typography System Features',
          items: [
            {
              title: 'Perfect 1.25 Mathematical Scale',
              description:
                'Mathematical precision in typography scaling for professional results',
              category: 'feature',
            },
            {
              title: '18 Typography Utility Classes',
              description:
                'Complete set of typography classes for every use case',
              category: 'feature',
            },
            {
              title: 'Professional Font Stack',
              description:
                'Inter/Geist fonts with system fallbacks for optimal performance',
              category: 'feature',
            },
            {
              title: 'CSS Custom Properties',
              description:
                'Maintainable design tokens with CSS custom properties',
              category: 'feature',
            },
          ],
        },
      ],
      bugFixes: [
        'Fixed unused variable error in TemplateSelector.tsx',
        'Improved responsive typography across all components',
        'Enhanced category filter chip text sizing',
        'Consistent spacing and visual hierarchy',
      ],
      documentation: [
        'New TYPOGRAPHY_SYSTEM.md comprehensive guide',
        'Updated all documentation for version 2.0.0',
        'Enhanced README with typography system information',
        'Implementation examples and usage guidelines',
      ],
    },
    {
      version: '1.0.0',
      releaseDate: 'October 12, 2025',
      versionName: 'Advanced Customization System',
      type: 'major',
      highlights: {
        title: 'Major Release - Advanced Customization System',
        description:
          'CVGen now features the most comprehensive customization system available in any open-source resume builder. With 30+ options, dual-interface controls, and real-time feedback, creating your perfect resume is easier than ever!',
        emoji: '🎉',
      },
      features: [
        {
          title: "✨ What's New",
          items: [
            {
              title: 'Quick Customizer Toolbar',
              description:
                'Always-visible floating toolbar at the bottom with instant access to layout presets, themes, fonts, font sizing, header styles, and icon toggles.',
              category: 'feature',
            },
            {
              title: 'Advanced Customization Sidebar',
              description:
                'Comprehensive 3-tab panel (Quick, Advanced, Sections) with precise controls for fonts, spacing, bullets, colors, and section management.',
              category: 'feature',
            },
            {
              title: '30+ Customization Options',
              description:
                '5 bullet styles, 3 header styles, custom accent colors, heading cases, dividers, 7 fonts, 5 themes, 3 layouts, and full typography control.',
              category: 'feature',
            },
            {
              title: 'Visual Feedback System',
              description:
                'Toast notifications appear for every customization change, showing exactly what was modified. Beautiful animations and auto-dismiss.',
              category: 'feature',
            },
          ],
        },
        {
          title: '🎨 Customization Options',
          items: [
            {
              title: '5 Color Themes',
              description: 'Professional color schemes for every industry',
              category: 'feature',
            },
            {
              title: '5 Bullet Styles',
              description:
                'Multiple bullet point styles for different preferences',
              category: 'feature',
            },
            {
              title: '3 Layout Presets',
              description: 'Optimized layouts for different content types',
              category: 'feature',
            },
            {
              title: '7 ATS-Safe Fonts',
              description: 'Carefully selected fonts that pass ATS systems',
              category: 'feature',
            },
          ],
        },
      ],
      bugFixes: [
        'Fixed icon visibility consistency across all contact fields',
        'Fixed toolbar overlap with footer on mobile devices',
        'Fixed backward compatibility with old saved data',
        'Improved responsive design across all screen sizes',
      ],
    },
  ],
};
