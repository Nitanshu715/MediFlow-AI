import Navbar from '@/components/Navbar'
import styles from './audit.module.css'

export default function AuditPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.head}>
          <h1 className={styles.title}>Audit Trail</h1>
          <p className={styles.sub}>Every agent decision is timestamped, attributed, and sealed with SHA-256 integrity</p>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.cardHead}>
              <div className={styles.cardTitle}>How the Audit System Works</div>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.explainGrid}>
                {[
                  {
                    num: '01',
                    title: 'Every Agent Decision Logged',
                    desc: 'Each of the 5 agents writes a structured entry to the audit log at every decision point — including policy citations, confidence scores, and reasoning.',
                  },
                  {
                    num: '02',
                    title: 'Immutable + Timestamped',
                    desc: 'Entries are written once and never modified. Each entry carries an ISO timestamp and agent identifier, forming a complete decision provenance chain.',
                  },
                  {
                    num: '03',
                    title: 'SHA-256 Sealed',
                    desc: 'At pipeline completion, the full log is hashed with SHA-256, producing an integrity seal. Any tampering invalidates the hash.',
                  },
                  {
                    num: '04',
                    title: 'Regulatory-Ready',
                    desc: 'The format mirrors HIPAA audit trail requirements and Indian health regulator (NHA) documentation standards for AI-assisted clinical workflows.',
                  },
                ].map((item) => (
                  <div key={item.num} className={styles.explainItem}>
                    <div className={styles.explainNum}>{item.num}</div>
                    <div className={styles.explainTitle}>{item.title}</div>
                    <div className={styles.explainDesc}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHead}>
              <div className={styles.cardTitle}>Sample Audit Entry Schema</div>
            </div>
            <div className={styles.cardBody}>
              <pre className={styles.code}>{`{
  "entry_id":   "AE-2026-0341-003",
  "timestamp":  "2026-03-27T10:14:32.841Z",
  "agent":      "ComplianceGuardianAgent",
  "action":     "POLICY_CHECK",
  "input": {
    "codes":    ["E11.65", "N18.3", "95249"],
    "policy_db": "IRDAI-2026-Q1"
  },
  "output": {
    "rules_evaluated": 5,
    "passed": 4,
    "warnings": 1,
    "hard_blocks": 0,
    "decision": "PROCEED_WITH_CAUTION"
  },
  "citations": [
    "IRDAI Sec 3.2.1",
    "NHA NH-2024-DM",
    "CG-RENAL-02"
  ],
  "integrity": {
    "prev_hash": "a3f8c2...",
    "this_hash": "d91e47..."
  }
}`}</pre>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHead}>
              <div className={styles.cardTitle}>Compliance with PS-5 Requirements</div>
            </div>
            <div className={styles.cardBody}>
              {[
                { req: 'Full task completion', how: 'Pipeline runs end-to-end: note → codes → compliance → auth → decision' },
                { req: 'Compliance guardrail enforcement', how: 'Every code checked against IRDAI, NHA, TPA rules. Hard blocks prevent non-compliant claims.' },
                { req: 'Edge case handling', how: 'CKD dosing warning, alternative code paths, denial-risk prediction all handled.' },
                { req: 'Domain expertise depth', how: 'ICD-10, CPT, IRDAI, NHA knowledge baked into agent prompts and rule engine.' },
                { req: 'Auditability of every agent decision', how: 'SHA-256 sealed, immutable log with full reasoning chain per agent.' },
              ].map((r, i) => (
                <div key={i} className={styles.reqRow}>
                  <div className={styles.reqIcon}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <div>
                    <div className={styles.reqTitle}>{r.req}</div>
                    <div className={styles.reqHow}>{r.how}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
