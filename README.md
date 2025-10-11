# CVGen - ATS-Friendly Resume Generator for IT Professionals

A modern, production-grade resume builder specifically designed for IT professionals. Create beautiful, ATS-friendly resumes with inline editing and instant PDF download.

## 🚀 Features

- **✏️ Inline Editing**: Click any text to edit directly on the resume
- **📥 PDF Download**: Export your resume as a professional PDF
- **💾 Auto-Save**: Changes are automatically saved to browser storage
- **📤 Import/Export**: Save and load resume data as JSON
- **🎯 ATS-Optimized**: Single-column layout that passes Applicant Tracking Systems
- **🎨 Clean Design**: Professional, readable formatting
- **⚡ Fast Performance**: Built with Next.js 15 and optimized for speed
- **📱 Responsive**: Works on all devices

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **PDF Generation**: react-to-print
- **Storage**: Browser LocalStorage
- **Deployment**: Vercel-ready

## 📋 Prerequisites

- Node.js 20+ and npm/yarn/pnpm
- Modern web browser

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📁 Project Structure

```
cvgen/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Main page component
│   │   └── globals.css        # Global styles
│   ├── components/             # Reusable components
│   │   ├── Resume.tsx         # Main resume component
│   │   ├── ResumeSection.tsx  # Section wrapper
│   │   └── EditableField.tsx  # Inline editable field
│   ├── types/                  # TypeScript types
│   │   └── resume.ts          # Resume data interfaces
│   ├── constants/              # App constants
│   │   └── defaultResume.ts   # Default template data
│   └── utils/                  # Utility functions
│       └── storage.ts         # LocalStorage helpers
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

## 🎯 Code Quality

This project follows industry best practices:

- **DRY (Don't Repeat Yourself)**: Reusable components and utilities
- **KISS (Keep It Simple, Stupid)**: Simple, maintainable solutions
- **Clean Code**: Well-documented, readable code
- **Type Safety**: Full TypeScript coverage
- **Production-Ready**: Optimized for performance and scalability

## 🎨 Customization

### Modifying the Template

Edit `src/constants/defaultResume.ts` to change the default resume template.

### Styling

Customize colors and styles in:
- `tailwind.config.ts` - Tailwind configuration
- `src/app/globals.css` - Global styles
- Component files - Component-specific styles

## 📤 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy with one click!

Or use Vercel CLI:

```bash
npm i -g vercel
vercel
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- Built for IT professionals by understanding ATS requirements
- Optimized for readability and parsing by recruiting systems
- Designed with modern web technologies for best user experience

---

**Made with ❤️ for the developer community**

