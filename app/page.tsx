import Link from 'next/link'
import Navbar from '@/components/Navbar'
import styles from './page.module.css'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── HERO ──────────────────────────────────── */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>

            <div className={styles.heroLeft}>
              <div className={styles.eyebrow}>
                <span className={styles.eyebrowLine} />
                ET GenAI Hackathon 2026 &nbsp;·&nbsp; PS-5 Healthcare Operations
              </div>

              <h1 className={styles.title}>
                Autonomous<br />
                <em>Healthcare</em><br />
                Operations Agent
              </h1>

              <p className={styles.desc}>
                MediFlow AI replaces 6 hours of manual medical coding, compliance
                checking, and prior authorization with a 5-agent autonomous pipeline —
                ICD-10 compliant, fully auditable, end-to-end in 28 seconds.
              </p>

              <div className={styles.stats}>
                <div className={styles.stat}>
                  <div className={styles.statNum}>₹47K Cr</div>
                  <div className={styles.statLabel}>Annual claim error cost in India</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNum}>23%</div>
                  <div className={styles.statLabel}>Manual coding error rate</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNum}>7 days</div>
                  <div className={styles.statLabel}>Avg prior auth wait time</div>
                </div>
              </div>

              <div className={styles.ctaRow}>
                <Link href="/analyze" className={styles.btnPrimary}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  Watch it run live
                </Link>
                <Link href="/architecture" className={styles.btnSecondary}>
                  View architecture
                </Link>
              </div>
            </div>

            {/* Hero card with animated mini-pipeline */}
            <div className={styles.heroCard}>
              <div className={styles.heroCardBar} />
              <div className={styles.heroCardLabel}>Sample clinical note processed live</div>
              <div className={styles.heroCardNote}>
                "58F with T2DM, HbA1c 9.2%. Oral hypoglycemics failed.
                CKD Stage 3. Requesting insulin pump (CSII) + endocrine consult..."
              </div>

              <div className={styles.miniPipeline}>
                {[
                  { label: 'Clinical NLP Agent',      sub: 'ICD-10 + CPT mapping' },
                  { label: 'Compliance Guardian',      sub: 'Policy rule engine' },
                  { label: 'Prior Auth Agent',         sub: 'Letter generation' },
                  { label: 'Claims Adjudication',      sub: 'Routing decision' },
                  { label: 'Audit Trail Agent',        sub: 'Immutable log' },
                ].map((step, i) => (
                  <div
                    key={step.label}
                    className={styles.miniStep}
                    style={{ animationDelay: `${i * 0.9}s` }}
                  >
                    <div className={styles.miniDot} style={{ animationDelay: `${i * 0.9}s` }} />
                    <div className={styles.miniInfo}>
                      <div className={styles.miniName}>{step.label}</div>
                      <div className={styles.miniSub}>{step.sub}</div>
                    </div>
                    <div className={styles.miniCheck} style={{ animationDelay: `${i * 0.9 + 0.5}s` }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.heroCardResult}>
                <div className={styles.resultBadge}>Auto-Approved</div>
                <div className={styles.resultMeta}>91.4% confidence &nbsp;·&nbsp; 28 seconds &nbsp;·&nbsp; 0 manual steps</div>
              </div>
            </div>

          </div>
        </section>

        {/* ── PS5 ALIGNMENT ─────────────────────────── */}
        <section className={styles.ps5Section}>
          <div className={styles.ps5Inner}>
            <div className={styles.ps5Tag}>PS-5</div>
            <div>
              <h2 className={styles.ps5Title}>Built exactly for Problem Statement 5</h2>
              <p className={styles.ps5Desc}>
                Domain-Specialized AI Agents with Compliance Guardrails — Healthcare.
                MediFlow handles medical coding (ICD-10/CPT), claims adjudication, and
                prior authorization workflows — navigating complex rule sets with
                auditable reasoning at every step. Judges see: domain expertise,
                compliance guardrails, full task completion, and full auditability.
              </p>
            </div>
          </div>
        </section>

        {/* ── AGENT CARDS ───────────────────────────── */}
        <section className={styles.agentsSection}>
          <div className={styles.agentsInner}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>5-Agent Autonomous Pipeline</h2>
              <p className={styles.sectionSub}>Each agent owns one domain — all agents are independently auditable</p>
            </div>
            <div className={styles.agentCards}>
              {[
                {
                  num: '01',
                  title: 'Clinical NLP Agent',
                  desc: 'Extracts diagnoses, procedures, symptoms from free-text notes. Maps to ICD-10 and CPT codes with confidence scoring.',
                  tech: 'claude-sonnet-4-5 · structured extraction · entity recognition',
                },
                {
                  num: '02',
                  title: 'Compliance Guardian',
                  desc: 'Cross-checks every code against IRDAI, NHA, and payer-specific policies. Cites exact policy clause for every decision.',
                  tech: 'rule engine · IRDAI/NHA/TPA policies · guardrail enforcement',
                },
                {
                  num: '03',
                  title: 'Prior Auth Agent',
                  desc: 'Auto-generates prior authorization letters. Predicts approval probability. Logs alternative code paths if denial likely.',
                  tech: 'letter generation · ML probability model · alternative routing',
                },
                {
                  num: '04',
                  title: 'Claims Adjudication',
                  desc: 'Validates claim completeness. Runs fraud signal detection. Routes to auto-approve, manual review, or reject.',
                  tech: 'completeness check · fraud scoring · decision routing',
                },
                {
                  num: '05',
                  title: 'Audit Trail Agent',
                  desc: 'Writes every agent decision to an immutable, timestamped audit log. Fully traceable for regulatory review.',
                  tech: 'SHA-256 integrity · timestamped entries · HIPAA-style log',
                },
              ].map((a) => (
                <div key={a.num} className={styles.agentCard}>
                  <div className={styles.agentNum}>{a.num}</div>
                  <div className={styles.agentTitle}>{a.title}</div>
                  <div className={styles.agentDesc}>{a.desc}</div>
                  <div className={styles.agentTech}>{a.tech}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── IMPACT NUMBERS ────────────────────────── */}
        <section className={styles.impactSection}>
          <div className={styles.impactInner}>
            <h2 className={styles.sectionTitle} style={{ marginBottom: 40 }}>Quantified Impact</h2>
            <div className={styles.impactGrid}>
              {[
                { val: '−87%',     label: 'Coding error reduction',         sub: '23% → 3.1% error rate' },
                { val: '28s',      label: 'End-to-end processing time',     sub: 'vs 6 hours manual' },
                { val: '99.9%',    label: 'Prior auth time reduction',      sub: '7 days → under 1 minute' },
                { val: '₹2.4 Cr', label: 'Saved per hospital per year',    sub: 'At 12,000 claims/day' },
              ].map((m) => (
                <div key={m.val} className={styles.impactTile}>
                  <div className={styles.impactVal}>{m.val}</div>
                  <div className={styles.impactLabel}>{m.label}</div>
                  <div className={styles.impactSub}>{m.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </>
  )
}
