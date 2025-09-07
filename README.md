# 🏥 Israeli Geriatrics Education Platform

**פלטפורמה חינוכית מתקדמת למתמחים בגריאטריה בישראל**

## ✨ Features

### 🔬 AI-Powered Analysis
- **Claude Integration**: Advanced clinical case analysis
- **Symptom Recognition**: Bilingual Hebrew/English detection
- **Risk Assessment**: Automated scoring with Israeli medical standards
- **Treatment Recommendations**: Evidence-based suggestions

### 📚 SZMC Library Integration
- **Medical Literature Search**: Direct access to SZMC e-library
- **Automated Research**: Find relevant articles for clinical cases
- **Hebrew/English Support**: Bilingual medical content
- **Citation Management**: Proper academic references

### 🎯 Educational Features
- **Case Studies**: Interactive clinical scenarios
- **Progress Tracking**: Residency milestone monitoring
- **Israeli Guidelines**: Updated local medical protocols
- **Peer Learning**: Collaborative features for residents

## 🚀 Quick Start

### Prerequisites
```bash
Node.js 18+ 
npm or yarn
Claude API key
SZMC library access credentials
```

### Installation
```bash
# Clone and install
cd israeli-geriatrics-edu
npm install

# Environment setup
cp .env.example .env.local
# Edit .env.local with your credentials

# Start development
npm run dev
```

### Open [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Required API Keys

1. **Claude API (Anthropic)**
   ```
   ANTHROPIC_API_KEY=sk-ant-your-key
   ```

2. **SZMC Library Access**
   ```
   SZMC_LIBRARY_API_KEY=your-szmc-key
   SZMC_ACCESS_TOKEN=your-access-token
   ```

3. **Optional: Supabase (for user management)**
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
   ```

## 📁 Project Structure

```
israeli-geriatrics-edu/
├── src/
│   ├── app/              # Next.js 13+ app directory
│   │   ├── dashboard/    # Main dashboard
│   │   ├── cases/        # Clinical cases
│   │   └── api/          # API routes
│   ├── components/       # Reusable components
│   ├── lib/             # Utilities & integrations
│   │   ├── szmc-library.ts  # SZMC API client
│   │   └── claude.ts     # Claude AI integration
│   └── types/           # TypeScript definitions
```

## 🏥 Medical Features

### Clinical Analysis Engine
```typescript
// Analyze clinical case
const analysis = await fetch('/api/analyze', {
  method: 'POST',
  body: JSON.stringify({
    clinical_text: 'מטופלת בת 78 עם נפילות חוזרות...',
    task: 'comprehensive'
  })
})
```

### SZMC Library Search
```typescript
// Search medical literature
const research = await fetch('/api/medical-research', {
  method: 'POST', 
  body: JSON.stringify({
    query: 'falls elderly prevention',
    language: 'he'
  })
})
```

## 🎯 Use Cases

### For Geriatrics Residents
- **Case Analysis**: Upload clinical cases for AI-powered insights
- **Literature Review**: Automatic research based on patient symptoms  
- **Learning Tracking**: Monitor educational progress
- **Exam Preparation**: Practice with realistic scenarios

### For Medical Educators
- **Curriculum Design**: Track resident progress
- **Case Library**: Build repository of teaching cases
- **Assessment Tools**: Evaluate clinical reasoning
- **Research Integration**: Link cases to current literature

## 🔒 Security & Privacy

- **No PHI Storage**: Patient data never stored permanently
- **Secure API Calls**: All external requests encrypted
- **Local Processing**: Core analysis runs locally when possible
- **Israeli Compliance**: Follows local medical data regulations

## 🌟 Advanced Features

### Bilingual Support
- **RTL Layout**: Proper Hebrew text rendering
- **Medical Translation**: Hebrew ↔ English medical terms
- **Cultural Context**: Israeli medical practice considerations

### AI Integration
- **Claude Analysis**: Advanced clinical reasoning
- **Contextual Learning**: Personalized educational content
- **Evidence-Based**: Recommendations backed by literature
- **Continuous Updates**: Latest medical knowledge integration

## 🔧 Development

### Local Development
```bash
npm run dev          # Start development server
npm run build        # Build for production  
npm run start        # Start production server
npm run lint         # Run linting
```

### Cursor Integration
This project is optimized for **Cursor IDE**:
- IntelliSense for medical terminology
- AI-assisted coding for healthcare features
- Automated code reviews for medical accuracy

## 📊 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Environment Variables on Vercel
Add all `.env.local` variables to Vercel dashboard

## 🤝 Contributing

This platform is built specifically for Israeli geriatrics residency education. 

### Medical Content Guidelines
- All content must be evidence-based
- Hebrew translations should be medically accurate
- Israeli medical guidelines take precedence
- SZMC institutional standards apply

## 📞 Support

For technical support or medical content questions:
- **Technical**: Open GitHub issue
- **Medical**: Contact SZMC residency program
- **API Issues**: Check SZMC library documentation

## 📄 License

Educational use for Israeli medical institutions. See LICENSE file.

---

**Built with ❤️ for Israeli geriatrics residents using:**
- Next.js 14 + TypeScript
- Claude AI for medical analysis  
- SZMC e-library integration
- Tailwind CSS for Hebrew/RTL support
- Optimized for Cursor IDE development