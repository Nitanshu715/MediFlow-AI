import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MediFlow AI — Autonomous Healthcare Operations Agent',
  description:
    'PS-5 ET GenAI Hackathon 2026 · 5-agent autonomous pipeline for medical coding, compliance, prior authorization and claims adjudication',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
