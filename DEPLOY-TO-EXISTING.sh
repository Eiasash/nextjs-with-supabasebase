#!/bin/bash

# Deploy Israeli Geriatrics Platform to existing Vercel site
# Site: nextjs-with-supabasenew-ochre.vercel.app

echo "🏥 Deploying Israeli Geriatrics Education Platform..."
echo "Target: nextjs-with-supabasenew-ochre.vercel.app"
echo ""

# Check if logged in to Vercel
if ! vercel whoami > /dev/null 2>&1; then
    echo "❌ Please login to Vercel first:"
    echo "   vercel login"
    exit 1
fi

echo "✅ Vercel authentication confirmed"
echo ""

# Deploy to production
echo "🚀 Deploying to production..."
vercel --prod --yes --name nextjs-with-supabasenew-ochre

echo ""
echo "🎉 Deployment complete!"
echo ""
echo "Your Israeli Geriatrics Platform is now live at:"
echo "👉 https://nextjs-with-supabasenew-ochre.vercel.app"
echo ""
echo "📋 Next steps:"
echo "1. Add environment variables in Vercel dashboard:"
echo "   - ANTHROPIC_API_KEY (Claude AI)"
echo "   - SZMC_LIBRARY_API_KEY (Medical research)"
echo "   - SZMC_ACCESS_TOKEN (SZMC access)"
echo ""
echo "2. Test your platform:"
echo "   - Visit the homepage"
echo "   - Try the dashboard: /dashboard"
echo "   - Test clinical analysis features"
echo ""
echo "🏥 Your complete medical education platform is ready!"