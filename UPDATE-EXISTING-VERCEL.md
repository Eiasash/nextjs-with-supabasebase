# 🚀 Update Your Existing Vercel Project

## Your Existing Site: `nextjs-with-supabasenew-ochre.vercel.app`

Perfect! You already have a Vercel deployment. Here's how to update it with your new Israeli Geriatrics Platform:

---

## 🔥 Method 1: Direct Update (Recommended)

### Step 1: Connect to Your Existing Project
```bash
# In your israeli-geriatrics-edu folder
vercel --prod --name nextjs-with-supabasenew-ochre
```

### Step 2: Set Environment Variables
Go to: [vercel.com/dashboard](https://vercel.com/dashboard)
- Find your `nextjs-with-supabasenew-ochre` project
- Go to Settings > Environment Variables
- Add:

```
ANTHROPIC_API_KEY=sk-ant-your-claude-api-key
SZMC_LIBRARY_API_KEY=your-szmc-library-key  
SZMC_ACCESS_TOKEN=your-szmc-access-token
ANALYZER_URL=http://localhost:8888
```

### Step 3: Deploy
```bash
vercel --prod
```

---

## 🌐 Method 2: GitHub Integration

### Step 1: Create GitHub Repository
```bash
# Create new repo on GitHub first, then:
git remote add origin https://github.com/yourusername/israeli-geriatrics-edu.git
git branch -M main
git push -u origin main
```

### Step 2: Connect to Vercel
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Delete or rename your old project
3. Import your new GitHub repository
4. Vercel will auto-deploy on every push

---

## ⚡ Method 3: Quick Manual Deploy

### Step 1: Build Locally
```bash
npm run build
```

### Step 2: Deploy Build
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)  
2. Find your project settings
3. Connect to this folder
4. Upload the built files

---

## 🏥 What Your Updated Site Will Have:

### ✨ New Features:
- **🧠 AI Clinical Analysis**: Claude-powered case studies
- **📚 SZMC Library Integration**: Medical research access
- **🌐 Hebrew Interface**: RTL support for Israeli medical professionals
- **📱 Mobile Responsive**: Hospital-friendly design
- **⚡ Real-time Analysis**: Instant medical insights

### 🎯 Your Live URLs:
- **Homepage**: `https://nextjs-with-supabasenew-ochre.vercel.app/`
- **Medical Dashboard**: `https://nextjs-with-supabasenew-ochre.vercel.app/dashboard`
- **API Endpoint**: `https://nextjs-with-supabasenew-ochre.vercel.app/api/analyze`

---

## 🔧 Environment Variables Setup

### Required for Full Functionality:
```bash
# Claude AI (Medical Analysis)
ANTHROPIC_API_KEY=sk-ant-your-key-here

# SZMC Library (Medical Research)  
SZMC_LIBRARY_API_KEY=your-szmc-key
SZMC_ACCESS_TOKEN=your-access-token

# Analyzer Service
ANALYZER_URL=https://your-analyzer-service.vercel.app
```

### Optional (Enhanced Features):
```bash
# Supabase (User Management) - You might already have these
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
```

---

## 🚀 Quick Deploy Command

If you're already logged into Vercel:
```bash
cd israeli-geriatrics-edu
vercel --prod --yes
```

---

## 🏆 Result

Your existing Vercel site will be transformed into a complete **Israeli Geriatrics Education Platform** with:

- ✅ Advanced AI medical analysis
- ✅ Hebrew/English bilingual interface  
- ✅ SZMC medical library integration
- ✅ Interactive clinical case studies
- ✅ Responsive design for mobile use
- ✅ Production-ready security

**Perfect for Israeli medical residents! 🏥**