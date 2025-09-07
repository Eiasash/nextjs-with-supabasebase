'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { 
  BookOpen, 
  Users, 
  Brain, 
  TrendingUp, 
  Calendar, 
  FileText,
  Heart,
  Activity,
  Target,
  Award
} from 'lucide-react'

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="p-3 bg-medical-600 rounded-xl">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  פלטפורמת גריאטריה ישראל
                </h1>
                <p className="text-gray-600">מערכת חינוך למתמחים בגריאטריה</p>
              </div>
            </div>
            <nav className="flex space-x-6 rtl:space-x-reverse">
              <Link href="/dashboard" className="medical-btn-primary">
                לוח בקרה
              </Link>
              <Link href="/cases" className="medical-btn-secondary">
                מקרים קליניים
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            חינוך מתקדם בגריאטריה
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            פלטפורמה חדשנית המשלבת בינה מלאכותית וחוויה מותאמת למתמחים בגריאטריה בישראל. 
            למד מקרים קליניים, עקוב אחר ההתקדמות שלך ותישאר מעודכן בהנחיות הרפואיות העדכניות ביותר.
          </p>
          <div className="flex justify-center space-x-4 rtl:space-x-reverse">
            <Link href="/dashboard" className="medical-btn-primary inline-flex items-center">
              <TrendingUp className="w-5 h-5 ml-2 rtl:ml-0 rtl:mr-2" />
              התחל עכשיו
            </Link>
            <Link href="/cases" className="medical-btn-secondary inline-flex items-center">
              <BookOpen className="w-5 h-5 ml-2 rtl:ml-0 rtl:mr-2" />
              מקרים קליניים
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            תכונות המערכת
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* AI Analysis */}
            <div className="medical-card p-6 text-center">
              <div className="p-4 bg-medical-100 rounded-full w-fit mx-auto mb-4">
                <Brain className="w-8 h-8 text-medical-600" />
              </div>
              <h4 className="text-xl font-semibold mb-3">ניתוח AI מתקדם</h4>
              <p className="text-gray-600">
                ניתוח אוטומטי של מקרים קליניים באמצעות Claude AI. 
                זיהוי תסמינים, תרופות והערכת סיכונים.
              </p>
            </div>

            {/* Hebrew/English Support */}
            <div className="medical-card p-6 text-center">
              <div className="p-4 bg-green-100 rounded-full w-fit mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold mb-3">תמיכה דו-לשונית</h4>
              <p className="text-gray-600">
                עבודה חלקה בעברית ובאנגלית. תרגום אוטומטי של מונחים רפואיים 
                ותאימות מלאה לתרבות הרפואית הישראלית.
              </p>
            </div>

            {/* Case Studies */}
            <div className="medical-card p-6 text-center">
              <div className="p-4 bg-purple-100 rounded-full w-fit mx-auto mb-4">
                <FileText className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold mb-3">מקרים קליניים</h4>
              <p className="text-gray-600">
                אוסף נרחב של מקרים קליניים אמיתיים מבתי החולים הישראליים. 
                תרגול מעשי ולמידה אינטראקטיבית.
              </p>
            </div>

            {/* Progress Tracking */}
            <div className="medical-card p-6 text-center">
              <div className="p-4 bg-yellow-100 rounded-full w-fit mx-auto mb-4">
                <Target className="w-8 h-8 text-yellow-600" />
              </div>
              <h4 className="text-xl font-semibold mb-3">מעקב התקדמות</h4>
              <p className="text-gray-600">
                מערכת מעקב מתקדמת אחר ההתקדמות שלך בהתמחות. 
                יעדים אישיים וחזות מוחית של הישגים.
              </p>
            </div>

            {/* Israeli Guidelines */}
            <div className="medical-card p-6 text-center">
              <div className="p-4 bg-red-100 rounded-full w-fit mx-auto mb-4">
                <Activity className="w-8 h-8 text-red-600" />
              </div>
              <h4 className="text-xl font-semibold mb-3">הנחיות ישראליות</h4>
              <p className="text-gray-600">
                עדכונים שוטפים של הנחיות משרד הבריאות הישראלי 
                והגופים המקצועיים בתחום הגריאטריה.
              </p>
            </div>

            {/* Certification */}
            <div className="medical-card p-6 text-center">
              <div className="p-4 bg-indigo-100 rounded-full w-fit mx-auto mb-4">
                <Award className="w-8 h-8 text-indigo-600" />
              </div>
              <h4 className="text-xl font-semibold mb-3">הכרה מקצועית</h4>
              <p className="text-gray-600">
                תעודות השתלמות מוכרות על ידי האגודה הגריאטרית הישראלית 
                ונקודות זכות להתפתחות מקצועית.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-medical-gradient">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-white mb-6">
            מוכן להתחיל את המסע שלך?
          </h3>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            הצטרף לקהילת המתמחים המובילים בגריאטריה ושפר את הכישורים הקליניים שלך
          </p>
          <Link href="/dashboard" className="inline-flex items-center px-8 py-4 bg-white text-medical-600 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200">
            <Calendar className="w-5 h-5 ml-2 rtl:ml-0 rtl:mr-2" />
            לוח הבקרה שלי
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 פלטפורמת גריאטריה ישראל. כל הזכויות שמורות.</p>
          <p className="text-gray-400 mt-2 text-sm">
            מופעל על ידי Claude AI • נבנה במיוחד עבור מתמחי גריאטריה בישראל
          </p>
        </div>
      </footer>
    </div>
  )
}