# Deployment Guide - Vercel

## 🚀 Deploy to Vercel (Recommended)

Vercel is the optimal platform for Next.js applications. Deployment is free and takes just a few minutes.

### Method 1: GitHub Integration (Easiest)

#### Step 1: Push to GitHub
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: CVGen resume builder"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/yourusername/cvgen.git

# Push
git push -u origin main
```

#### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click **"New Project"**
4. **Import** your GitHub repository
5. Configure project:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)
6. Click **"Deploy"** 🎉

#### Step 3: Done!
Your app will be live at: `https://your-project-name.vercel.app`

### Method 2: Vercel CLI

#### Install Vercel CLI
```bash
npm install -g vercel
```

#### Deploy
```bash
# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Method 3: Vercel Desktop App
1. Download [Vercel Desktop](https://vercel.com/download)
2. Drag and drop your project folder
3. Click Deploy

---

## ⚙️ Configuration

### Environment Variables
Currently, no environment variables are required. If you add any in the future:

1. Create `.env.local` for local development
2. Add to Vercel:
   - Project Settings → Environment Variables
   - Add each variable with appropriate scope (Production/Preview/Development)

### Custom Domain
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. SSL is automatic! 🔒

### Build Settings
Default settings work perfectly, but you can customize in `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs"
}
```

---

## 🔧 Advanced Configuration

### Node.js Version
Specify in `package.json`:
```json
{
  "engines": {
    "node": ">=20.0.0"
  }
}
```

### Headers and Redirects
Add to `next.config.js`:
```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ];
  },
};
```

### Performance Monitoring
Vercel automatically provides:
- ✅ Analytics
- ✅ Web Vitals
- ✅ Real-time logs
- ✅ Deployment history

Enable in: Project Settings → Analytics

---

## 🌍 Alternative Deployment Platforms

### Netlify
```bash
npm run build
# Deploy the .next folder
```

Add `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### AWS Amplify
1. Connect GitHub repository
2. Set build settings:
   - Build command: `npm run build`
   - Output directory: `.next`
3. Deploy

### Docker (Self-Hosted)
```dockerfile
FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t cvgen .
docker run -p 3000:3000 cvgen
```

---

## 📊 Post-Deployment Checklist

- [ ] Application loads correctly
- [ ] All features work (edit, download PDF, import/export)
- [ ] Mobile responsive
- [ ] PDF download generates properly
- [ ] LocalStorage saves data
- [ ] No console errors
- [ ] Performance is good (check Lighthouse)
- [ ] Custom domain configured (if applicable)
- [ ] Analytics enabled (optional)

---

## 🐛 Troubleshooting

### Build Fails
```bash
# Clear cache locally
rm -rf .next node_modules
npm install
npm run build
```

### Deployment Timeout
- Check for large dependencies
- Review build logs
- Contact Vercel support

### Runtime Errors
- Check Vercel Function Logs
- Verify environment variables
- Test locally with `npm run build && npm start`

### PDF Not Generating
- Ensure react-to-print is in dependencies (not devDependencies)
- Check browser compatibility
- Review console errors

---

## 🔄 Continuous Deployment

With GitHub integration, every push triggers automatic deployment:

- **main branch** → Production
- **other branches** → Preview deployments

### Preview Deployments
Each PR gets a unique URL for testing before merging!

---

## 📈 Monitoring & Analytics

### Vercel Analytics
```bash
npm install @vercel/analytics
```

Add to `src/app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Speed Insights
```bash
npm install @vercel/speed-insights
```

---

## 💰 Pricing

**Vercel Free Tier includes:**
- ✅ Unlimited deployments
- ✅ Automatic HTTPS
- ✅ 100GB bandwidth/month
- ✅ Serverless functions
- ✅ Preview deployments
- ✅ Custom domains

Perfect for personal projects! 🎉

---

## 🆘 Need Help?

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Discord](https://vercel.com/discord)
- [Vercel Support](https://vercel.com/support)

---

**Ready to deploy? Let's go! 🚀**

