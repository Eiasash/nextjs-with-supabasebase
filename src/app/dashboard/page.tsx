'use client'

import { useState, useEffect } from 'react'
import { 
  Brain, 
  BookOpen, 
  Search, 
  TrendingUp, 
  FileText, 
  Users,
  Calendar,
  Target,
  Activity,
  AlertCircle,
  CheckCircle
} from 'lucide-react'

interface MedicalAnalysis {
  symptoms: Array<{ symptom: string; mentions: number }>
  medications: Array<{ international: string; hebrew?: string }>
  scores: Record<string, number>
  riskAssessment: {
    overall: { category: 'low' | 'moderate' | 'high'; score: number }
  }
  recommendations: string[]
}

export default function Dashboard() {
  const [clinicalText, setClinicalText] = useState('')
  const [analysis, setAnalysis] = useState<MedicalAnalysis | null>(null)
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [researchLoading, setResearchLoading] = useState(false)
  const [exportLoading, setExportLoading] = useState(false)

  const analyzeCase = async () => {
    if (!clinicalText.trim()) return
    
    setLoading(true)
    try {
      // Analyze with our existing geriatrics analyzer
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clinical_text: clinicalText,
          task: 'comprehensive'
        })
      })
      
      const data = await response.json()
      setAnalysis(data)
      
      // Also search for relevant literature
      await searchLiterature()
    } catch (error) {
      console.error('Analysis failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const searchLiterature = async () => {
    if (!clinicalText.trim()) return
    
    setResearchLoading(true)
    try {
      const response = await fetch('/api/medical-research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: extractKeyTerms(clinicalText),
          clinicalCase: clinicalText,
          language: 'he'
        })
      })
      
      const data = await response.json()
      if (data.success) {
        setArticles(data.articles || [])
      }
    } catch (error) {
      console.error('Literature search failed:', error)
    } finally {
      setResearchLoading(false)
    }
  }

  const extractKeyTerms = (text: string): string => {
    // Simple keyword extraction for search
    const keywords = text.match(/(?:נפילות|בלבול|דמנציה|דכאון|חולשה|falls|confusion|dementia|depression)/gi)
    return keywords?.slice(0, 3).join(' ') || 'geriatrics elderly'
  }

  const getRiskColor = (category: string) => {
    switch (category) {
      case 'high': return 'bg-red-100 border-red-300 text-red-800'
      case 'moderate': return 'bg-yellow-100 border-yellow-300 text-yellow-800'
      case 'low': return 'bg-green-100 border-green-300 text-green-800'
      default: return 'bg-gray-100 border-gray-300 text-gray-800'
    }
  }

  const exportMorningReport = async () => {
    setExportLoading(true)
    try {
      const reportData = {
        date: new Date().toLocaleDateString('he-IL'),
        analysis: analysis,
        clinicalText: clinicalText,
        articles: articles
      }
      
      // Create downloadable report
      const dataStr = JSON.stringify(reportData, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(dataBlob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = `geriatrics-report-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      
      alert('דוח הבוקר נוצר בהצלחה!')
    } catch (error) {
      console.error('Export failed:', error)
      alert('שגיאה ביצירת הדוח')
    } finally {
      setExportLoading(false)
    }
  }

  const showEmergencyProtocols = () => {
    const protocols = `
פרוטוקולי חירום - גריאטריה

🚨 נפילה עם חבלה:
• בדיקת הכרה ויציבות המטופל
• הערכת חבלות ראש/צוואר
• בדיקת שברים - במיוחד ירך ופרק כף יד
• צילומים לפי הצורך

🧠 בלבול אקוטי:
• זיהוי גורם מעורר (זיהום, תרופות, התייבשות)
• בדיקות מעבדה מורחבות
• הערכה נוירולוגית מהירה
• שינוי/הפסקת תרופות חשודות

💊 תופעות לוואי תרופתיות:
• זיהוי אינטראקציות תרופתיות
• התאמת מינונים לגיל ולתפקוד כליות
• מעקב אחר תרופות בעלות חלון טיפולי צר

📞 יצירת קשר: חדר מיון גריאטריה - 02-6777777
    `
    alert(protocols)
  }

  const clearAllData = () => {
    if (window.confirm('האם אתה בטוח שברצונך לנקות את כל הנתונים? פעולה זו אינה הפיכה.')) {
      setClinicalText('')
      setAnalysis(null)
      setArticles([])
      localStorage.clear()
      alert('כל הנתונים נוקו בהצלחה')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="p-2 bg-medical-600 rounded-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">לוח בקרה גריאטריה</h1>
                <p className="text-gray-600">ניתוח מקרים + ספרות רפואית SZMC</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="text-sm text-gray-600">
                <Calendar className="w-4 h-4 inline ml-1 rtl:ml-0 rtl:mr-1" />
                {new Date().toLocaleDateString('he-IL')}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <div className="medical-card p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Target className="w-5 h-5 ml-2 rtl:ml-0 rtl:mr-2 text-medical-600" />
              פעולות מהירות
            </h2>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={exportMorningReport}
                disabled={exportLoading}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
              >
                {exportLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2 rtl:ml-0 rtl:mr-2"></div>
                ) : (
                  <span className="ml-2 rtl:ml-0 rtl:mr-2">📊</span>
                )}
                יצוא דוח בוקר
              </button>
              
              <button
                onClick={showEmergencyProtocols}
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center"
              >
                <span className="ml-2 rtl:ml-0 rtl:mr-2">🚨</span>
                פרוטוקולי חירום
              </button>
              
              <button
                onClick={clearAllData}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center"
              >
                <span className="ml-2 rtl:ml-0 rtl:mr-2">🗑️</span>
                נקה את כל הנתונים
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Input Panel */}
          <div className="lg:col-span-2">
            <div className="medical-card p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <FileText className="w-5 h-5 ml-2 rtl:ml-0 rtl:mr-2 text-medical-600" />
                מקרה קליני
              </h2>
              <textarea
                value={clinicalText}
                onChange={(e) => setClinicalText(e.target.value)}
                className="w-full h-48 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-medical-500 focus:border-transparent"
                placeholder="הזן כאן את המקרה הקליני...
                
דוגמה:
מטופלת בת 78, מגיעה עם תלונות על נפילות חוזרות במהלך החודש האחרון. 
מאושפזת עקב בלבול אקוטי שהחל לפני שלושה ימים.
עברה: יתר לחץ דם, סוכרת סוג 2, פיברילציה פרוזדורית
תרופות: וורפרין 5 מ'ג, מטפורמין 500 מ'ג, לבדופה/קרבידופה
בבדיקה: MMSE 18/30, Barthel Index 55/100"
              />
              <div className="mt-4 flex space-x-4 rtl:space-x-reverse">
                <button
                  onClick={analyzeCase}
                  disabled={loading}
                  className="medical-btn-primary flex items-center"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2 rtl:ml-0 rtl:mr-2"></div>
                      מנתח...
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4 ml-2 rtl:ml-0 rtl:mr-2" />
                      ניתוח AI
                    </>
                  )}
                </button>
                <button
                  onClick={searchLiterature}
                  disabled={researchLoading}
                  className="medical-btn-secondary flex items-center"
                >
                  {researchLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 ml-2 rtl:ml-0 rtl:mr-2"></div>
                      מחפש...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 ml-2 rtl:ml-0 rtl:mr-2" />
                      חיפוש ספרות SZMC
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-4">
            <div className="medical-card p-4">
              <div className="flex items-center">
                <Target className="w-8 h-8 text-medical-600 ml-3 rtl:ml-0 rtl:mr-3" />
                <div>
                  <p className="text-sm text-gray-600">מקרים נותחו השבוע</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
              </div>
            </div>
            <div className="medical-card p-4">
              <div className="flex items-center">
                <BookOpen className="w-8 h-8 text-green-600 ml-3 rtl:ml-0 rtl:mr-3" />
                <div>
                  <p className="text-sm text-gray-600">מאמרים נקראו</p>
                  <p className="text-2xl font-bold text-gray-900">47</p>
                </div>
              </div>
            </div>
            <div className="medical-card p-4">
              <div className="flex items-center">
                <TrendingUp className="w-8 h-8 text-purple-600 ml-3 rtl:ml-0 rtl:mr-3" />
                <div>
                  <p className="text-sm text-gray-600">התקדמות</p>
                  <p className="text-2xl font-bold text-gray-900">85%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Results */}
        {analysis && (
          <div className="mt-8">
            <div className="medical-card p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Brain className="w-5 h-5 ml-2 rtl:ml-0 rtl:mr-2 text-medical-600" />
                תוצאות ניתוח AI
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Risk Assessment */}
                <div className={`p-4 rounded-lg border-2 ${getRiskColor(analysis.riskAssessment.overall.category)}`}>
                  <h3 className="font-semibold mb-2 flex items-center">
                    <AlertCircle className="w-4 h-4 ml-1 rtl:ml-0 rtl:mr-1" />
                    הערכת סיכון
                  </h3>
                  <p className="text-lg font-bold">
                    {analysis.riskAssessment.overall.category} 
                    <span className="text-sm font-normal mr-2 rtl:mr-0 rtl:ml-2">
                      (ציון: {analysis.riskAssessment.overall.score})
                    </span>
                  </p>
                </div>

                {/* Recommendations */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-semibold mb-2 text-blue-800 flex items-center">
                    <CheckCircle className="w-4 h-4 ml-1 rtl:ml-0 rtl:mr-1" />
                    המלצות טיפוליות
                  </h3>
                  <ul className="space-y-1 text-sm">
                    {analysis.recommendations.slice(0, 3).map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 ml-2 rtl:ml-0 rtl:mr-2">•</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Literature Results */}
        {articles.length > 0 && (
          <div className="mt-8">
            <div className="medical-card p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <BookOpen className="w-5 h-5 ml-2 rtl:ml-0 rtl:mr-2 text-medical-600" />
                ספרות רפואית רלוונטית - SZMC
              </h2>
              
              <div className="space-y-4">
                {articles.slice(0, 5).map((article, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {article.titleHe || article.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {article.authors.slice(0, 3).join(', ')} • {article.journal} • {article.publishedDate}
                    </p>
                    {article.abstract && (
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {article.abstract.substring(0, 200)}...
                      </p>
                    )}
                    {article.fullTextUrl && (
                      <a 
                        href={article.fullTextUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center mt-2 text-medical-600 hover:text-medical-700 text-sm"
                      >
                        קרא מאמר מלא
                        <FileText className="w-3 h-3 mr-1 rtl:mr-0 rtl:ml-1" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}