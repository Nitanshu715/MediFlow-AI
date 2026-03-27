// ── Types ─────────────────────────────────────────────────────────────
export type AgentState = 'idle' | 'running' | 'done' | 'error'

export interface CodeResult {
  code: string
  type: 'ICD-10' | 'CPT'
  name: string
  confidence: number
}

export interface ComplianceResult {
  status: 'pass' | 'warn' | 'fail'
  text: string
  clause: string
}

export interface AuditEntry {
  time: string
  agent: string
  message: string
  detail?: string
}

export interface PipelineResult {
  codes: CodeResult[]
  compliance: ComplianceResult[]
  authLetter: string
  decisionType: 'approve' | 'review' | 'reject'
  decisionTitle: string
  decisionDesc: string
  decisionMeta: string
  auditEntries: AuditEntry[]
}

// ── Mock data ─────────────────────────────────────────────────────────
export const SAMPLE_NOTE = `Patient: Mrs. Ananya Sharma, 58F
Chief Complaint: Poorly controlled Type 2 Diabetes Mellitus

Clinical Summary:
Patient presents with T2DM diagnosed 12 years ago, on oral hypoglycemics
(Metformin 2g/day + Glipizide 10mg). HbA1c is 9.2% (target <7%). Also
has Stage 3 CKD (eGFR 42), hypertension (BP 148/92 on Amlodipine), and
diabetic retinopathy confirmed on last ophthalmology review.

Oral agents have failed to achieve glycemic control. Requesting:
1. Continuous subcutaneous insulin pump therapy (CSII)
2. Endocrinology consultation
3. Nephrology co-management given CKD progression risk

Relevant History: No prior insulin therapy. No hypoglycemic episodes.
BMI 31.2 kg/m2.

Physician: Dr. Ravi Mehta, MBBS MD (Internal Medicine)
Hospital: Apollo Hospitals, Hyderabad`

export const MOCK_CODES: CodeResult[] = [
  { code: 'E11.65', type: 'ICD-10', name: 'Type 2 Diabetes with hyperglycemia', confidence: 94 },
  { code: 'N18.3',  type: 'ICD-10', name: 'Chronic kidney disease, Stage 3',    confidence: 97 },
  { code: 'I10',    type: 'ICD-10', name: 'Essential (primary) hypertension',   confidence: 99 },
  { code: 'H36.03', type: 'ICD-10', name: 'Diabetic retinopathy, bilateral',    confidence: 88 },
  { code: 'Z79.4',  type: 'ICD-10', name: 'Long-term use of insulin (planned)', confidence: 91 },
  { code: '95249',  type: 'CPT',    name: 'CSII — ambulatory initiation',       confidence: 86 },
]

export const MOCK_COMPLIANCE: ComplianceResult[] = [
  {
    status: 'pass',
    text: 'HbA1c ≥ 9% documented — meets CSII coverage threshold',
    clause: 'IRDAI Policy Sec 3.2.1 — Insulin pump: HbA1c > 8.5% with oral agent failure',
  },
  {
    status: 'pass',
    text: 'Oral hypoglycemic failure documented (≥ 2 agents, ≥ 12 months)',
    clause: 'NHA guideline NH-2024-DM — prior therapy requirement satisfied',
  },
  {
    status: 'pass',
    text: 'BMI 31.2 within coverage range (25–45 kg/m²)',
    clause: 'Apollo TPA clause 7.4 — pump therapy BMI criterion met',
  },
  {
    status: 'warn',
    text: 'CKD Stage 3 — insulin dosing adjustment required; nephrology flag raised',
    clause: 'Clinical guardrail CG-RENAL-02 — dose adjustment mandatory',
  },
  {
    status: 'pass',
    text: 'Physician credentials verified (MBBS MD Internal Medicine)',
    clause: 'Sec 5.1 — specialist referral authority confirmed',
  },
]

export const MOCK_AUTH_LETTER = `To: Apollo TPA Authorization Desk
Date: ${new Date().toLocaleDateString('en-IN')}
Patient ID: MF-2026-0341
Ref: Prior Authorization Request — CSII Therapy

Dear Sir/Madam,

I am writing to request prior authorization for continuous subcutaneous
insulin infusion (CSII) therapy for Mrs. Ananya Sharma (DOB: 15-Mar-1967).

Clinical Justification:
  Diagnosis: T2DM (E11.65) with HbA1c 9.2% — above 8.5% threshold
  Oral hypoglycemics failed after 12 years (Metformin + Glipizide)
  Concurrent CKD Stage 3 requiring precise glucose management
  Nephrology co-management initiated per clinical protocol

Policy Compliance:
  IRDAI Sec 3.2.1 criteria fully met
  NHA guideline NH-2024-DM satisfied
  All clinical guardrails cleared per MediFlow Compliance Engine v1.0
  4 of 5 rules passed; 1 clinical caution flagged (CG-RENAL-02)

Predicted Approval Probability: 91.4%
Alternative Path (if denied): CPT 99213 + insulin initiation → 97.8%

Requesting authorization for: CPT 95249 — CSII initiation
                              Endocrinology consultation

Dr. Ravi Mehta, MD
Apollo Hospitals, Hyderabad | Reg: MCI-HYD-48821`
