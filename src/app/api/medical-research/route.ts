import { NextRequest, NextResponse } from 'next/server'
import { createSZMCClient, LibrarySearchSchema } from '@/lib/szmc-library'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

const szmc = createSZMCClient()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { query, clinicalCase, language = 'he' } = body

    // Validate search parameters
    const searchParams = LibrarySearchSchema.parse({
      query,
      specialty: 'geriatrics',
      language: language === 'he' ? 'both' : 'en',
      limit: 10
    })

    // Search SZMC library
    const articles = await szmc.searchArticles(searchParams)

    // If we have a clinical case, use Claude to analyze relevance
    let analysisResults = null
    if (clinicalCase && articles.length > 0) {
      analysisResults = await analyzeWithClaude(clinicalCase, articles, language)
    }

    return NextResponse.json({
      success: true,
      articles,
      analysis: analysisResults,
      totalResults: articles.length
    })
  } catch (error) {
    console.error('Medical research API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to search medical literature' },
      { status: 500 }
    )
  }
}

async function analyzeWithClaude(clinicalCase: string, articles: any[], language: string) {
  try {
    const systemPrompt = language === 'he' 
      ? `אתה רופא גריאטר מומחה בישראל. נתח את המקרה הקליני והמאמרים הרלוונטיים וספק:
         1. המאמרים הרלוונטיים ביותר למקרה
         2. המלצות טיפוליות מבוססות על הספרות הרפואית
         3. הנחיות ישראליות רלוונטיות
         השב בעברית.`
      : `You are a geriatrician expert in Israel. Analyze the clinical case and relevant articles and provide:
         1. Most relevant articles to the case
         2. Evidence-based treatment recommendations
         3. Relevant Israeli guidelines
         Respond in English.`

    const articlesContext = articles.slice(0, 5).map(article => 
      `Title: ${article.title}\nAuthors: ${article.authors.join(', ')}\nAbstract: ${article.abstract.substring(0, 500)}...`
    ).join('\n\n---\n\n')

    const response = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1500,
      system: systemPrompt,
      messages: [{
        role: 'user',
        content: `Clinical Case:\n${clinicalCase}\n\nRelevant Literature:\n${articlesContext}\n\nPlease provide your analysis and recommendations.`
      }]
    })

    return {
      analysis: response.content[0].type === 'text' ? response.content[0].text : '',
      relevantArticles: articles.slice(0, 3).map(article => ({
        id: article.id,
        title: article.title,
        relevanceScore: article.relevanceScore || 0.8
      }))
    }
  } catch (error) {
    console.error('Claude analysis failed:', error)
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const symptom = searchParams.get('symptom')
    const language = searchParams.get('language') || 'he'

    if (!symptom) {
      return NextResponse.json(
        { success: false, error: 'Symptom parameter required' },
        { status: 400 }
      )
    }

    const articles = await szmc.searchBySymptom(symptom, language as 'he' | 'en')

    return NextResponse.json({
      success: true,
      articles,
      symptom,
      totalResults: articles.length
    })
  } catch (error) {
    console.error('Symptom research API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to research symptom' },
      { status: 500 }
    )
  }
}