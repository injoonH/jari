import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'

import { pretendard } from '@/ui/styles/fonts'

export const metadata: Metadata = {
  title: 'Jari',
  description:
    'KAIST Unified Reservation Service (URS) with extra convenience features',
}

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="ko" className={pretendard.className}>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

export default RootLayout
