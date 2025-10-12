# 🔖 Versioning & Release Guide

## 📌 Current Version: 1.0.0

---

## 📋 Version Management Files

CVGen uses a comprehensive versioning system with multiple files:

### Core Version Files
1. **`package.json`** - NPM version (source of truth)
2. **`VERSION`** - Plain text version number
3. **`CHANGELOG.md`** - Complete version history with technical details
4. **`docs/RELEASE_NOTES.md`** - User-friendly release announcements

---

## 🎯 Semantic Versioning

CVGen follows [Semantic Versioning 2.0.0](https://semver.org/)

### Format: MAJOR.MINOR.PATCH

```
1.0.0
│ │ │
│ │ └─ PATCH: Bug fixes, small improvements
│ └─── MINOR: New features, backward-compatible
└───── MAJOR: Breaking changes, major overhauls
```

### Version Increment Rules

#### PATCH Version (1.0.0 → 1.0.1)
**When to use**: Bug fixes and small improvements

**Examples**:
- Fixed toast notification not appearing
- Fixed icon sizing issue
- Corrected typo in UI
- Performance optimization
- Documentation corrections

**Command**:
```bash
npm run version:patch
```

#### MINOR Version (1.0.0 → 1.1.0)
**When to use**: New features, backward-compatible changes

**Examples**:
- Added new color theme
- Added new bullet style option
- Added keyboard shortcuts
- Added new export format
- Enhanced existing feature

**Command**:
```bash
npm run version:minor
```

#### MAJOR Version (1.0.0 → 2.0.0)
**When to use**: Breaking changes, major redesigns

**Examples**:
- Changed data structure (breaks old saves)
- Removed or renamed major features
- Complete UI redesign
- Changed API/component interfaces
- Requires migration

**Command**:
```bash
npm run version:major
```

---

## 📝 Release Process

### Step-by-Step Release Workflow

#### 1. Prepare the Release

**Update CHANGELOG.md**:
```markdown
## [Unreleased]
### Added
- New feature description

## [1.1.0] - 2025-10-20
### Added
- Feature 1
- Feature 2
### Fixed
- Bug fix 1
```

**Update docs/RELEASE_NOTES.md**:
```markdown
## Version 1.1.0
**Released**: October 20, 2025

### Highlights
- User-friendly description of changes
```

#### 2. Update Version Number

```bash
# Choose one:
npm run version:patch   # Bug fixes (1.0.0 → 1.0.1)
npm run version:minor   # New features (1.0.0 → 1.1.0)
npm run version:major   # Breaking changes (1.0.0 → 2.0.0)
```

This automatically:
- ✅ Updates `package.json`
- ✅ Creates git commit
- ✅ Creates git tag

#### 3. Update VERSION File

```bash
echo "1.1.0" > VERSION
```

#### 4. Commit Documentation Changes

```bash
git add CHANGELOG.md docs/RELEASE_NOTES.md VERSION
git commit -m "docs: Update changelog and release notes for v1.1.0"
```

#### 5. Push to GitHub

```bash
git push origin main --tags
```

#### 6. Create GitHub Release

1. Go to GitHub → Releases
2. Click "Create a new release"
3. Choose tag (v1.1.0)
4. Title: "Version 1.1.0 - [Feature Name]"
5. Description: Copy from RELEASE_NOTES.md
6. Click "Publish release"

#### 7. Deploy to Vercel

Vercel auto-deploys from `main` branch:
- ✅ Push triggers deployment
- ✅ New version goes live
- ✅ Previous version remains accessible

---

## 📋 CHANGELOG.md Format

Use [Keep a Changelog](https://keepachangelog.com/) format:

### Categories
- **Added** - New features
- **Changed** - Changes to existing features
- **Deprecated** - Features being phased out
- **Removed** - Deleted features
- **Fixed** - Bug fixes
- **Security** - Security improvements

### Example Entry
```markdown
## [1.1.0] - 2025-10-20

### Added
- Dark mode support for entire application
- Keyboard shortcuts for common actions (Ctrl+P for PDF)
- Export to DOCX format

### Changed
- Improved Quick Customizer toolbar responsive design
- Enhanced toast notification positioning

### Fixed
- Fixed font size slider not updating on mobile
- Corrected section ordering bug in Safari

### Deprecated
- CustomizationPanel.tsx (use CustomizationSidebar instead)
```

---

## 📖 RELEASE_NOTES.md Format

User-friendly, marketing-focused:

### Structure
```markdown
## Version X.X.X
**Released**: Date

### 🌟 Highlights
Brief, exciting summary

### ✨ What's New
User-facing features with benefits

### 🔧 Improvements
How things got better

### 🐛 Bug Fixes
What was fixed

### 📚 Documentation
Doc updates

### 🎯 Migration Guide
How to upgrade (if needed)
```

---

## 🔢 Version History

| Version | Date | Type | Major Changes |
|---------|------|------|---------------|
| **1.0.0** | 2025-10-12 | Major | Advanced Customization System |
| 0.1.0 | 2025-10-01 | Initial | Core resume builder |

---

## 🎯 Versioning Best Practices

### DO:
✅ Update version for every release  
✅ Document all user-facing changes  
✅ Keep CHANGELOG.md updated  
✅ Write clear, descriptive release notes  
✅ Tag releases in git  
✅ Test before releasing  

### DON'T:
❌ Skip version numbers  
❌ Release without documentation  
❌ Forget to tag in git  
❌ Make breaking changes in MINOR versions  
❌ Release untested code  

---

## 🚀 Quick Commands

```bash
# Update version and create tag
npm run version:patch    # 1.0.0 → 1.0.1
npm run version:minor    # 1.0.0 → 1.1.0
npm run version:major    # 1.0.0 → 2.0.0

# Update VERSION file
echo "1.1.0" > VERSION

# Push with tags
git push origin main --tags

# View current version
cat VERSION
npm version
```

---

## 📊 Release Checklist

Before releasing a new version:

### Code
- [ ] All features tested
- [ ] No linter errors (`npm run lint`)
- [ ] Code formatted (`npm run format`)
- [ ] Build succeeds (`npm run build`)
- [ ] All components working

### Documentation
- [ ] CHANGELOG.md updated
- [ ] RELEASE_NOTES.md updated
- [ ] VERSION file updated
- [ ] README.md reflects changes (if needed)
- [ ] Relevant docs updated

### Git
- [ ] All changes committed
- [ ] Version bumped in package.json
- [ ] Git tag created
- [ ] Pushed to GitHub with tags

### Deployment
- [ ] Vercel deployment successful
- [ ] Live site tested
- [ ] No console errors
- [ ] Mobile tested

### Communication
- [ ] GitHub release created
- [ ] Release notes published
- [ ] Users can see changelog
- [ ] Breaking changes documented (if any)

---

## 🔮 Future Versioning Plans

### Stable Release Cycle
- **Patch**: As needed (bug fixes)
- **Minor**: Monthly (new features)
- **Major**: Quarterly or as needed (breaking changes)

### Pre-release Versions
Future support for:
- `1.1.0-alpha.1` - Alpha testing
- `1.1.0-beta.1` - Beta testing
- `1.1.0-rc.1` - Release candidate

---

## 📞 Questions?

### Where to Find Version Info
- **Current version**: `package.json` or `VERSION` file
- **Version history**: `CHANGELOG.md`
- **User-friendly notes**: `docs/RELEASE_NOTES.md`
- **Git tags**: `git tag -l`

### How to Check Version
```bash
# NPM version
npm version

# Package.json
cat package.json | grep version

# VERSION file
cat VERSION

# Git tags
git describe --tags
```

---

**CVGen follows industry-standard versioning practices! 🎯**

**Current Status**: Version 1.0.0 - Stable ✅

