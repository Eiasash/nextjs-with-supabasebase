# 🚀 Deployment Guide - Israeli Geriatrics Education Platform

## Quick Deploy to Vercel (Recommended)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Deploy
```bash
cd israeli-geriatrics-edu
vercel --prod
```

### Step 3: Configure Environment Variables

In your Vercel dashboard, add these environment variables:

#### Required API Keys:
```
ANTHROPIC_API_KEY=sk-ant-your-claude-api-key
SZMC_LIBRARY_API_KEY=your-szmc-library-key
SZMC_ACCESS_TOKEN=your-szmc-access-token
ANALYZER_URL=https://your-analyzer-url.vercel.app
```

#### Optional (for enhanced features):
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-key
```

---

## Alternative: Deploy via GitHub

### Step 1: Create GitHub Repository
```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit: Israeli Geriatrics Education Platform"

# Connect to GitHub (replace with your repo)
git remote add origin https://github.com/yourusername/israeli-geriatrics-edu.git
git push -u origin main
```

### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Connect your GitHub repository
4. Vercel will automatically detect Next.js
5. Add environment variables in dashboard

---

## Alternative: Deploy to Netlify

### Step 1: Build Settings
```
Build command: npm run build
Publish directory: .next
```

### Step 2: Environment Variables
Add the same environment variables as above in Netlify dashboard.

---

## Alternative: Deploy to Railway

### Step 1: Install Railway CLI
```bash
npm install -g @railway/cli
railway login
```

### Step 2: Deploy
```bash
railway deploy
```

---

## Environment Variables Explained

### Core API Keys:
- **ANTHROPIC_API_KEY**: Get from [console.anthropic.com](https://console.anthropic.com)
- **SZMC_LIBRARY_API_KEY**: Your SZMC e-library access key
- **SZMC_ACCESS_TOKEN**: Your SZMC authentication token

### Database (Optional):
- **SUPABASE_URL**: For user management and progress tracking
- **SUPABASE_ANON_KEY**: Supabase anonymous access key

### Service URLs:
- **ANALYZER_URL**: URL of the geriatrics analyzer service

---

## Post-Deployment Checklist

### ✅ Test Core Features:
1. Visit your deployed site
2. Test clinical case analysis
3. Test SZMC library search
4. Verify Hebrew/English language support

### ✅ Configure Domain (Optional):
```bash
vercel --prod --alias israeli-geriatrics.yourdomain.com
```

### ✅ Monitor Performance:
- Check Vercel analytics
- Monitor API response times
- Test mobile responsiveness

---

## Troubleshooting

### Build Errors:
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### API Issues:
1. Verify all environment variables are set
2. Check API key permissions
3. Ensure SZMC library access is active

### Performance Issues:
- Enable Vercel Pro for better performance
- Consider implementing caching for SZMC API calls
- Optimize images and assets

---

## Production URLs

After deployment, your platform will be available at:
- **Vercel**: `https://israeli-geriatrics-edu.vercel.app`
- **Custom Domain**: `https://your-custom-domain.com`

### API Endpoints:
- Analysis: `https://your-site.vercel.app/api/analyze`
- Medical Research: `https://your-site.vercel.app/api/medical-research`
- Health Check: `https://your-site.vercel.app/api/health`

---

## Security Considerations

### ✅ API Security:
- All API keys stored securely in environment variables
- No sensitive data in client-side code
- Rate limiting on API endpoints

### ✅ Data Privacy:
- No patient data stored permanently
- All analysis happens in real-time
- GDPR compliant (no cookies without consent)

### ✅ Israeli Compliance:
- Follows Israeli data protection laws
- Compatible with hospital security policies
- No unauthorized data transmission

---

Your Israeli Geriatrics Education Platform is now ready for deployment! 🏥✨