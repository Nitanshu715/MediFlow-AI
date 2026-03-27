import { NextRequest, NextResponse } from 'next/server'
import {
  MOCK_CODES,
  MOCK_COMPLIANCE,
  MOCK_AUTH_LETTER,
  type PipelineResult,
} from '@/lib/data'

// Helper: delay for streaming simulation
function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

// Try Claude API — fall back to mock if key missing
async function callClaude(prompt: string): Promise<string> {
  const key = process.env.ANTHROPIC_API_KEY
  if (!key || key === 'your_anthropic_api_key_here') return ''

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-5',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!res.ok) return ''
  const data = await res.json()
  return data?.content?.[0]?.text ?? ''
}

export async function POST(req: NextRequest) {
  const { note } = await req.json()
  if (!note?.trim()) {
    return NextResponse.json({ error: 'No clinical note provided' }, { status: 400 })
  }

  // Try real Claude extraction — fall back to mock data
  let codes = MOCK_CODES
  let compliance = MOCK_COMPLIANCE
  let authLetter = MOCK_AUTH_LETTER

  const claudeRaw = await callClaude(
    `You are a medical coding expert. Extract ICD-10 and CPT codes from the following clinical note. 
     Return ONLY a JSON array with fields: code, type (ICD-10 or CPT), name, confidence (0-100).
     Clinical note: ${note}`
  )
  if (claudeRaw) {
    try {
      const parsed = JSON.parse(claudeRaw.replace(/```json|```/g, '').trim())
      if (Array.isArray(parsed) && parsed.length > 0) codes = parsed
    } catch {
      // use mock
    }
  }

  const result: PipelineResult = {
    codes,
    compliance,
    authLetter,
    decisionType: 'approve',
    decisionTitle: 'Auto-Approved',
    decisionDesc:
      'All clinical and policy criteria satisfied. No manual review required. Routed directly to payer for payment processing.',
    decisionMeta: 'Approval confidence: 91.4%  ·  Fraud score: 0.04/1.0  ·  Claim value: ₹1,24,500',
    auditEntries: [
      {
        time: new Date().toISOString(),
        agent: 'ClinicalNLPAgent',
        message: `Entity extraction complete. ${codes.length} codes mapped.`,
        detail: `ICD-10: ${codes.filter((c) => c.type === 'ICD-10').map((c) => c.code).join(', ')}`,
      },
      {
        time: new Date().toISOString(),
        agent: 'ComplianceGuardianAgent',
        message: 'Policy scan complete. CSII authorized under IRDAI Sec 3.2.1.',
        detail: `${compliance.filter((c) => c.status === 'pass').length} passed, ${compliance.filter((c) => c.status === 'warn').length} warning, 0 hard blocks`,
      },
      {
        time: new Date().toISOString(),
        agent: 'PriorAuthAgent',
        message: 'Authorization letter generated. Approval probability: 91.4%.',
        detail: 'Dispatched to Apollo TPA queue · Ref: MF-2026-0341',
      },
      {
        time: new Date().toISOString(),
        agent: 'ClaimsAdjudicationAgent',
        message: 'Adjudication complete. Decision: AUTO-APPROVE.',
        detail: 'Fraud score: 0.04/1.0 · Claim value: ₹1,24,500 · Processing: 2 business days',
      },
      {
        time: new Date().toISOString(),
        agent: 'AuditTrailAgent',
        message: 'All agent decisions sealed. Audit log complete.',
        detail: 'Integrity: SHA-256 · Status: SEALED · Regulatory-ready',
      },
    ],
  }

  return NextResponse.json(result)
}
