import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'פלטפורמת חינוך גריאטריה - ישראל',
  description: 'פלטפורמה חינוכית למתמחים בגריאטריה בישראל',
  keywords: ['גריאטריה', 'רפואה', 'התמחות', 'ישראל', 'חינוך רפואי'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="hebrew-text bg-gray-50 antialiased">
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}