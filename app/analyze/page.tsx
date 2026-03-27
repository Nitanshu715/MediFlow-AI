'use client'

import { useState, useRef } from 'react'
import Navbar from '@/components/Navbar'
import AgentStep from '@/components/AgentStep'
import {
  IconDna, IconShield, IconFileText, IconScale, IconArchive,
  IconTag, IconCheck, IconAlertTriangle,
} from '@/components/Icons'
import {
  SAMPLE_NOTE, MOCK_CODES, MOCK_COMPLIANCE, MOCK_AUTH_LETTER,
  type AgentState, type CodeResult, type ComplianceResult,
} from '@/lib/data'
import styles from './analyze.module.css'

type AgentStates = [AgentState, AgentState, AgentState, AgentState, AgentState]
type AgentOutputs = [string, string, string, string, string]

export default function AnalyzePage() {
  const [note, setNote] = useState('')
  const [states, setStates] = useState<AgentStates>(['idle','idle','idle','idle','idle'])
  const [outputs, setOutputs] = useState<AgentOutputs>(['','','','',''])
  const [running, setRunning] = useState(false)
  const [procText, setProcText] = useState('')
  const [progress, setProgress] = useState(0)
  const [codes, setCodes] = useState<CodeResult[]>([])
  const [compliance, setCompliance] = useState<ComplianceResult[]>([])
  const [authLetter, setAuthLetter] = useState('')
  const [showDecision, setShowDecision] = useState(false)
  const [auditLog, setAuditLog] = useState<{time:string;agent:string;msg:string;detail?:string}[]>([])
  const [activeTab, setActiveTab] = useState<'pipeline' | 'results' | 'audit'>('pipeline')

  const metrics = {
    time: codes.length > 0 ? '28s' : '—',
    codes: codes.length,
    rules: compliance.length,
    decisions: auditLog.length,
  }

  function sleep(ms: number) {
    return new Promise<void>((r) => setTimeout(r, ms))
  }

  function setState(i: number, s: AgentState) {
    setStates((prev) => {
      const n = [...prev] as AgentStates
      n[i] = s
      return n
    })
  }

  function setOutput(i: number, text: string) {
    setOutputs((prev) => {
      const n = [...prev] as AgentOutputs
      n[i] = text
      return n
    })
  }

  function addAudit(agent: string, msg: string, detail?: string) {
    const time = new Date().toTimeString().slice(0, 8)
    setAuditLog((prev) => [...prev, { time, agent, msg, detail }])
  }

  async function runPipeline() {
    if (!note.trim()) { alert('Please paste a clinical note first.'); return }
    if (running) return
    setRunning(true)
    setStates(['idle','idle','idle','idle','idle'])
    setOutputs(['','','','',''])
    setCodes([]); setCompliance([]); setAuthLetter(''); setShowDecision(false)
    setAuditLog([]); setProgress(0)

    // ── Agent 0: Clinical NLP ───────────────────────
    setState(0, 'running'); setProcText('Clinical NLP Agent extracting entities...')
    setProgress(10)
    addAudit('ClinicalNLPAgent', 'Received note. Tokenizing and extracting medical entities.', `Input: ${note.split(' ').length} tokens`)
    await sleep(1300)
    setState(0, 'done')
    setOutput(0, `${MOCK_CODES.length} codes mapped (ICD-10 + CPT) · avg confidence 92.5%`)
    setCodes(MOCK_CODES)
    addAudit('ClinicalNLPAgent', `Extraction complete. Codes: ${MOCK_CODES.map(c=>c.code).join(', ')}.`, 'Passing to Compliance Guardian Agent')

    // ── Agent 1: Compliance ─────────────────────────
    setState(1, 'running'); setProcText('Compliance Guardian scanning 2,847 policy rules...')
    setProgress(30)
    addAudit('ComplianceGuardianAgent', 'Initiating policy check against IRDAI, NHA, Apollo TPA.', 'Rule DB: 2,847 active policies · v2026-Q1')
    await sleep(1600)
    setState(1, 'done')
    setOutput(1, '5 rules evaluated · 4 passed · 1 clinical warning · 0 hard blocks · PROCEED')
    setCompliance(MOCK_COMPLIANCE)
    addAudit('ComplianceGuardianAgent', 'Scan complete. CSII authorized under IRDAI Sec 3.2.1.', 'CG-RENAL-02 flagged — nephrology co-management mandatory')

    // ── Agent 2: Prior Auth ─────────────────────────
    setState(2, 'running'); setProcText('Prior Auth Agent drafting authorization letter...')
    setProgress(55)
    addAudit('PriorAuthAgent', 'Drafting letter using ICD codes + compliance clearances.', 'Approval probability model: 91.4%')
    await sleep(1400)
    setState(2, 'done')
    setOutput(2, 'Auth letter generated · Approval probability: 91.4% · Alt path logged: 97.8%')
    setAuthLetter(MOCK_AUTH_LETTER)
    addAudit('PriorAuthAgent', 'Letter finalized. Dispatched to Apollo TPA queue.', 'Ref: MF-2026-0341 · Alt: CPT 99213 + insulin init → 97.8%')

    // ── Agent 3: Adjudication ───────────────────────
    setState(3, 'running'); setProcText('Claims Adjudication Agent running fraud check...')
    setProgress(75)
    addAudit('ClaimsAdjudicationAgent', 'Completeness check passed. Running fraud signal detection.', 'Fraud score: 0.04/1.0 · Threshold: 0.30 · Status: CLEAN')
    await sleep(1100)
    setState(3, 'done')
    setOutput(3, 'Claim complete · Fraud: 0.04 (clean) · Decision: AUTO-APPROVE · ₹1,24,500')
    setShowDecision(true)
    addAudit('ClaimsAdjudicationAgent', 'Decision: AUTO-APPROVE. Routed to Apollo TPA.', 'Claim: ₹1,24,500 · Processing: 2 business days')

    // ── Agent 4: Audit ──────────────────────────────
    setState(4, 'running'); setProcText('Audit Trail Agent sealing immutable log...')
    setProgress(95)
    await sleep(700)
    setState(4, 'done')
    setOutput(4, 'All decisions sealed · SHA-256 integrity · 0 errors · pipeline complete')
    addAudit('AuditTrailAgent', 'All agent decisions recorded. Audit log sealed.', 'Integrity: SHA-256 · Status: SEALED · Regulatory-ready')
    setProgress(100)

    setProcText(''); setRunning(false)
  }

  function clearAll() {
    setNote(''); setStates(['idle','idle','idle','idle','idle']); setOutputs(['','','','',''])
    setCodes([]); setCompliance([]); setAuthLetter(''); setShowDecision(false)
    setAuditLog([]); setProgress(0); setProcText(''); setRunning(false)
  }

  const agentDefs = [
    { icon: <IconDna size={17} strokeWidth={1.4} />, name: 'Clinical NLP Agent', sub: 'entity extraction · ICD-10/CPT mapping · confidence scoring' },
    { icon: <IconShield size={17} strokeWidth={1.4} />, name: 'Compliance Guardian Agent', sub: 'IRDAI · NHA · TPA policies · clause citation · guardrail enforcement' },
    { icon: <IconFileText size={17} strokeWidth={1.4} />, name: 'Prior Authorization Agent', sub: 'auth letter generation · approval probability · alternative routing' },
    { icon: <IconScale size={17} strokeWidth={1.4} />, name: 'Claims Adjudication Agent', sub: 'completeness validation · fraud scoring · routing decision' },
    { icon: <IconArchive size={17} strokeWidth={1.4} />, name: 'Audit Trail Agent', sub: 'immutable log · decision provenance · SHA-256 integrity' },
  ]

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.topBar}>
          <div>
            <h1 className={styles.pageTitle}>Live Agent Demo</h1>
            <p className={styles.pageSub}>Paste a clinical note — 5 agents run autonomously and produce a full compliance output</p>
          </div>
          <div className={styles.topTabs}>
            {(['pipeline','results','audit'] as const).map((t) => (
              <button key={t} className={`${styles.topTab} ${activeTab===t ? styles.topTabActive : ''}`} onClick={() => setActiveTab(t)}>
                {t === 'pipeline' ? 'Agent Pipeline' : t === 'results' ? 'Results' : 'Audit Trail'}
              </button>
            ))}
          </div>
        </div>

        {/* PROGRESS BAR */}
        {running && (
          <div className={styles.progressWrap}>
            <div className={styles.progressBar} style={{ width: `${progress}%` }} />
          </div>
        )}

        <div className={styles.layout}>

          {/* ── LEFT: INPUT + PIPELINE ──────────────── */}
          <div className={styles.left}>

            {/* NOTE INPUT */}
            <div className={styles.card}>
              <div className={styles.cardHead}>
                <div className={styles.cardTitle}>
                  <IconFileText size={15} strokeWidth={1.5} />
                  Clinical Note Input
                </div>
                <button className={styles.btnGhost} onClick={() => setNote(SAMPLE_NOTE)}>Load sample</button>
              </div>
              <div className={styles.cardBody}>
                <textarea
                  className={styles.textarea}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={`Paste doctor's clinical notes here...\n\nExample:\n"Patient presents with chest pain and shortness of breath.\nHistory of hypertension and T2DM. ECG shows ST changes.\nRequesting cardiac catheterization..."`}
                />
                <div className={styles.inputRow}>
                  <button className={styles.btnRun} onClick={runPipeline} disabled={running}>
                    {running ? (
                      <><span className={styles.spinnerSm} /> {procText || 'Running...'}</>
                    ) : (
                      <><IconDna size={14} strokeWidth={1.5} /> Run Agent Pipeline</>
                    )}
                  </button>
                  <button className={styles.btnGhost} onClick={clearAll}>Clear</button>
                </div>
              </div>
            </div>

            {/* METRICS ROW */}
            <div className={styles.metricsRow}>
              {[
                { label: 'Processing Time', val: metrics.time },
                { label: 'Codes Extracted', val: String(metrics.codes) },
                { label: 'Policy Rules Run', val: String(metrics.rules) },
                { label: 'Audit Decisions', val: String(metrics.decisions) },
              ].map((m) => (
                <div key={m.label} className={styles.metricTile}>
                  <div className={styles.metricVal}>{m.val}</div>
                  <div className={styles.metricLabel}>{m.label}</div>
                </div>
              ))}
            </div>

            {/* PIPELINE / AUDIT TABS */}
            {activeTab === 'pipeline' && (
              <div className={styles.card}>
                <div className={styles.cardHead}>
                  <div className={styles.cardTitle}>Multi-Agent Pipeline</div>
                  <div className={`${styles.pipeBadge} ${running ? styles.pipeRunning : states[4]==='done' ? styles.pipeDone : ''}`}>
                    {running ? 'running' : states[4]==='done' ? 'complete' : 'idle'}
                  </div>
                </div>
                <div className={styles.cardBodyPad}>
                  {agentDefs.map((a, i) => (
                    <AgentStep
                      key={a.name}
                      icon={a.icon}
                      name={a.name}
                      sub={a.sub}
                      state={states[i]}
                      output={outputs[i]}
                      last={i === 4}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'audit' && (
              <div className={styles.card}>
                <div className={styles.cardHead}>
                  <div className={styles.cardTitle}><IconArchive size={15} strokeWidth={1.5} /> Audit Trail</div>
                  <div className={styles.countBadge}>{auditLog.length} entries</div>
                </div>
                <div className={styles.cardBody}>
                  {auditLog.length === 0 ? (
                    <div className={styles.empty}>Run pipeline to generate audit entries</div>
                  ) : (
                    auditLog.map((e, i) => (
                      <div key={i} className={styles.auditRow}>
                        <div className={styles.auditTime}>{e.time}</div>
                        <div>
                          <div className={styles.auditAgent}>{e.agent}</div>
                          <div className={styles.auditMsg}>{e.msg}</div>
                          {e.detail && <div className={styles.auditDetail}>{e.detail}</div>}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT: RESULTS ─────────────────────── */}
          <div className={styles.right}>

            {/* CODES */}
            <div className={styles.card}>
              <div className={styles.cardHead}>
                <div className={styles.cardTitle}><IconTag size={14} strokeWidth={1.5} /> ICD-10 / CPT Codes</div>
                {codes.length > 0 && <div className={`${styles.countBadge} ${styles.countGreen}`}>{codes.length} extracted</div>}
              </div>
              <div className={styles.cardBody}>
                {codes.length === 0 ? (
                  <div className={styles.empty}>Run pipeline to extract codes</div>
                ) : (
                  codes.map((c) => (
                    <div key={c.code} className={styles.codeItem}>
                      <div className={styles.codeBadge}>{c.code}</div>
                      <div className={styles.codeInfo}>
                        <div className={styles.codeName}>{c.name}</div>
                        <div className={styles.codeType}>{c.type} · {c.confidence}% confidence</div>
                        <div className={styles.confBar}>
                          <div className={styles.confFill} style={{ width: `${c.confidence}%` }} />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* COMPLIANCE */}
            <div className={styles.card}>
              <div className={styles.cardHead}>
                <div className={styles.cardTitle}><IconShield size={14} strokeWidth={1.5} /> Compliance Check</div>
                {compliance.length > 0 && (
                  <div className={`${styles.countBadge} ${styles.countGreen}`}>
                    {compliance.filter(c=>c.status==='pass').length} passed · {compliance.filter(c=>c.status==='warn').length} warning
                  </div>
                )}
              </div>
              <div className={styles.cardBody}>
                {compliance.length === 0 ? (
                  <div className={styles.empty}>Awaiting compliance scan</div>
                ) : (
                  compliance.map((c, i) => (
                    <div key={i} className={styles.compItem}>
                      <div className={`${styles.compDot} ${c.status === 'pass' ? styles.dotPass : c.status === 'warn' ? styles.dotWarn : styles.dotFail}`} />
                      <div>
                        <div className={styles.compText}>{c.text}</div>
                        <div className={styles.compClause}>{c.clause}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* PRIOR AUTH LETTER */}
            <div className={styles.card}>
              <div className={styles.cardHead}>
                <div className={styles.cardTitle}><IconFileText size={14} strokeWidth={1.5} /> Prior Auth Letter</div>
              </div>
              <div className={styles.cardBody}>
                {!authLetter ? (
                  <div className={styles.empty}>Letter generated after compliance check</div>
                ) : (
                  <pre className={styles.letter}>{authLetter}</pre>
                )}
              </div>
            </div>

            {/* CLAIM DECISION */}
            <div className={styles.card}>
              <div className={styles.cardHead}>
                <div className={styles.cardTitle}><IconScale size={14} strokeWidth={1.5} /> Claim Decision</div>
              </div>
              <div className={styles.cardBody}>
                {!showDecision ? (
                  <div className={styles.empty}>Awaiting adjudication</div>
                ) : (
                  <>
                    <div className={styles.decisionBanner}>
                      <div className={styles.decisionIcon}>
                        <IconCheck size={20} strokeWidth={2.5} />
                      </div>
                      <div>
                        <div className={styles.decisionTitle}>Auto-Approved</div>
                        <div className={styles.decisionDesc}>
                          All clinical and policy criteria satisfied. No manual review required.
                          Routed to payer for payment processing.
                        </div>
                        <div className={styles.decisionMeta}>
                          Approval confidence: 91.4% &nbsp;·&nbsp; Fraud score: 0.04/1.0 &nbsp;·&nbsp; ₹1,24,500
                        </div>
                      </div>
                    </div>
                    <div className={styles.altPath}>
                      Alternative logged: CPT 99213 + insulin initiation → 97.8% approval rate if denied
                    </div>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  )
}
