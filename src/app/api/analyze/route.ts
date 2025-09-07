import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Use the existing geriatrics analyzer from the other service
const ANALYZER_URL = process.env.ANALYZER_URL || 'http://localhost:8888'

const AnalyzeSchema = z.object({
  clinical_text: z.string().min(5, 'Clinical text must be at least 5 characters'),
  task: z.enum(['comprehensive', 'medication', 'cognitive', 'falls', 'nutrition']).optional()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validated = AnalyzeSchema.parse(body)

    // Call the existing geriatrics analyzer service
    const response = await fetch(`${ANALYZER_URL}/api/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        clinical_text: validated.clinical_text,
        task: validated.task || 'comprehensive'
      })
    })

    if (!response.ok) {
      throw new Error(`Analyzer service error: ${response.status}`)
    }

    const analysis = await response.json()

    // Enhance the analysis with Israeli-specific context
    const enhancedAnalysis = {
      ...analysis,
      israeliContext: {
        guidelines: await getIsraeliGuidelines(analysis),
        recommendations: enhanceWithIsraeliStandards(analysis.recommendations)
      }
    }

    return NextResponse.json(enhancedAnalysis)

  } catch (error) {
    console.error('Analysis API error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Analysis failed' },
      { status: 500 }
    )
  }
}

async function getIsraeliGuidelines(analysis: any): Promise<string[]> {
  const guidelines: string[] = []

  // Add Israeli-specific guidelines based on analysis
  if (analysis.riskAssessment?.overall?.category === 'high') {
    guidelines.push('יש לשקול התייעצות עם גריאטר בכיר על פי הנחיות משרד הבריאות')
  }

  if (analysis.patientData?.symptoms?.some((s: any) => s.symptom.includes('falls') || s.symptom.includes('נפילות'))) {
    guidelines.push('הנחיות האגודה הגריאטרית הישראלית למניעת נפילות - יישום פרוטוקול STEADI')
  }

  if (analysis.scores?.mmse && analysis.scores.mmse < 24) {
    guidelines.push('הערכה קוגניטיבית מעמיקה על פי פרוטוקול בית החולים הגריאטרי')
  }

  return guidelines
}

function enhanceWithIsraeliStandards(recommendations: string[]): string[] {
  const enhanced = [...recommendations]

  // Add Israeli healthcare system context
  enhanced.push('יש לתאם המלצות עם הצוות הרב-מקצועי במחלקה')
  enhanced.push('מומלץ לעדכן רופא המשפחה על המלצות הטיפול')

  return enhanced
}