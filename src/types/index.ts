// Medical Analysis Types
export interface MedicalSymptom {
  symptom: string
  mentions: number
  severity?: 'mild' | 'moderate' | 'severe'
  category?: string
}

export interface MedicalMedication {
  international: string
  hebrew?: string
  dosage?: string
  frequency?: string
  riskLevel?: 'low' | 'moderate' | 'high'
}

export interface MedicalScores {
  mmse?: number
  moca?: number
  barthel?: number
  morse?: number
  gds?: number
  [key: string]: number | undefined
}

export interface RiskAssessment {
  category: 'low' | 'moderate' | 'high'
  score: number
  factors: string[]
}

export interface ClinicalAlert {
  type: 'risk' | 'falls' | 'cognitive' | 'medication' | 'general'
  message: string
  severity: 'info' | 'warning' | 'critical'
}

export interface MedicalAnalysis {
  task: string
  fallback: boolean
  patientData: {
    symptoms: MedicalSymptom[]
    medications: MedicalMedication[]
  }
  scores: MedicalScores
  riskAssessment: {
    overall: RiskAssessment
  }
  clinicalAlerts: ClinicalAlert[]
  recommendations: string[]
}

// SZMC Library Types
export interface MedicalArticle {
  id: string
  title: string
  titleHe?: string
  authors: string[]
  journal: string
  publishedDate: string
  pmid?: string
  doi?: string
  abstract: string
  abstractHe?: string
  fullTextUrl?: string
  pdfUrl?: string
  keywords: string[]
  specialty: string[]
  relevanceScore?: number
}

export interface LibrarySearchResult {
  success: boolean
  articles: MedicalArticle[]
  analysis?: {
    analysis: string
    relevantArticles: Array<{
      id: string
      title: string
      relevanceScore: number
    }>
  }
  totalResults: number
}

// User and Education Types
export interface ResidencyProgress {
  userId: string
  casesAnalyzed: number
  articlesRead: number
  progressPercentage: number
  competencies: {
    [key: string]: number
  }
  lastActive: string
}