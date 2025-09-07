// SZMC E-Library Integration
import { z } from 'zod'

// SZMC Library API Types
export interface SZMCLibraryConfig {
  baseUrl: string
  apiKey?: string
  institutionId?: string
  accessToken?: string
}

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

export interface LibrarySearchParams {
  query: string
  specialty?: 'geriatrics' | 'internal-medicine' | 'cardiology' | 'neurology'
  language?: 'he' | 'en' | 'both'
  dateFrom?: string
  dateTo?: string
  limit?: number
}

// SZMC Library Client
export class SZMCLibraryClient {
  private config: SZMCLibraryConfig
  private baseHeaders: Record<string, string>

  constructor(config: SZMCLibraryConfig) {
    this.config = {
      baseUrl: 'https://library.szmc.org.il/api',
      ...config
    }
    
    this.baseHeaders = {
      'Content-Type': 'application/json',
      'User-Agent': 'Israeli-Geriatrics-Education/1.0'
    }

    if (config.apiKey) {
      this.baseHeaders['X-API-Key'] = config.apiKey
    }
    
    if (config.accessToken) {
      this.baseHeaders['Authorization'] = `Bearer ${config.accessToken}`
    }
  }

  async searchArticles(params: LibrarySearchParams): Promise<MedicalArticle[]> {
    try {
      const searchParams = new URLSearchParams({
        q: params.query,
        specialty: params.specialty || 'geriatrics',
        lang: params.language || 'both',
        limit: (params.limit || 20).toString(),
        ...(params.dateFrom && { from: params.dateFrom }),
        ...(params.dateTo && { to: params.dateTo })
      })

      const response = await fetch(`${this.config.baseUrl}/search?${searchParams}`, {
        method: 'GET',
        headers: this.baseHeaders
      })

      if (!response.ok) {
        throw new Error(`SZMC Library API error: ${response.status}`)
      }

      const data = await response.json()
      return this.transformArticles(data.articles || [])
    } catch (error) {
      console.error('SZMC Library search failed:', error)
      return []
    }
  }

  async getArticleById(id: string): Promise<MedicalArticle | null> {
    try {
      const response = await fetch(`${this.config.baseUrl}/articles/${id}`, {
        method: 'GET',
        headers: this.baseHeaders
      })

      if (!response.ok) {
        return null
      }

      const data = await response.json()
      return this.transformArticle(data)
    } catch (error) {
      console.error('SZMC Library article fetch failed:', error)
      return null
    }
  }

  async getGeriatricsGuidelines(): Promise<MedicalArticle[]> {
    return this.searchArticles({
      query: 'geriatrics guidelines Israel ministry health',
      specialty: 'geriatrics',
      language: 'both',
      limit: 50
    })
  }

  async searchBySymptom(symptom: string, language: 'he' | 'en' = 'he'): Promise<MedicalArticle[]> {
    const hebrewSymptoms = {
      'נפילות': 'falls elderly',
      'בלבול': 'confusion delirium',
      'דמנציה': 'dementia alzheimer',
      'דכאון': 'depression elderly',
      'חולשה': 'weakness frailty',
      'סחרחורת': 'dizziness vertigo elderly'
    }

    const searchTerm = language === 'he' && hebrewSymptoms[symptom as keyof typeof hebrewSymptoms] 
      ? hebrewSymptoms[symptom as keyof typeof hebrewSymptoms]
      : symptom

    return this.searchArticles({
      query: `${searchTerm} geriatrics elderly`,
      specialty: 'geriatrics',
      language: 'both',
      limit: 15
    })
  }

  private transformArticles(articles: any[]): MedicalArticle[] {
    return articles.map(article => this.transformArticle(article))
  }

  private transformArticle(article: any): MedicalArticle {
    return {
      id: article.id || article._id,
      title: article.title,
      titleHe: article.title_he || article.titleHebrew,
      authors: Array.isArray(article.authors) ? article.authors : [article.author],
      journal: article.journal || article.source,
      publishedDate: article.published_date || article.date,
      pmid: article.pmid,
      doi: article.doi,
      abstract: article.abstract || '',
      abstractHe: article.abstract_he || article.abstractHebrew,
      fullTextUrl: article.full_text_url || article.url,
      pdfUrl: article.pdf_url,
      keywords: Array.isArray(article.keywords) ? article.keywords : [],
      specialty: Array.isArray(article.specialty) ? article.specialty : [article.specialty || 'general'],
      relevanceScore: article.relevance_score || article.score
    }
  }
}

// Environment-based configuration
export function createSZMCClient(): SZMCLibraryClient {
  const config: SZMCLibraryConfig = {
    baseUrl: process.env.SZMC_LIBRARY_BASE_URL || 'https://library.szmc.org.il/api',
    apiKey: process.env.SZMC_LIBRARY_API_KEY,
    institutionId: process.env.SZMC_INSTITUTION_ID,
    accessToken: process.env.SZMC_ACCESS_TOKEN
  }
  
  return new SZMCLibraryClient(config)
}

// Validation schemas
export const LibrarySearchSchema = z.object({
  query: z.string().min(2, 'Search query must be at least 2 characters'),
  specialty: z.enum(['geriatrics', 'internal-medicine', 'cardiology', 'neurology']).optional(),
  language: z.enum(['he', 'en', 'both']).optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  limit: z.number().min(1).max(100).optional()
})

export type LibrarySearchInput = z.infer<typeof LibrarySearchSchema>