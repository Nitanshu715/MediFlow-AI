'use client'

import { type AgentState } from '@/lib/data'
import styles from './AgentStep.module.css'

interface Props {
  icon: React.ReactNode
  name: string
  sub: string
  state: AgentState
  output?: string
  last?: boolean
}

const statusLabel: Record<AgentState, string> = {
  idle:    'idle',
  running: 'running...',
  done:    'complete',
  error:   'error',
}

export default function AgentStep({ icon, name, sub, state, output, last }: Props) {
  return (
    <div className={styles.step}>
      {!last && <div className={styles.connector} />}

      <div className={`${styles.icon} ${styles[state]}`}>
        {state === 'running' ? <span className={styles.spinner} /> : icon}
      </div>

      <div className={styles.body}>
        <div className={styles.header}>
          <div>
            <div className={styles.name}>{name}</div>
            <div className={styles.sub}>{sub}</div>
          </div>
          <div className={`${styles.badge} ${styles['badge_' + state]}`}>
            {statusLabel[state]}
          </div>
        </div>

        {output && (
          <div className={`${styles.output} ${state === 'done' ? styles.outputVisible : ''}`}>
            {output}
          </div>
        )}
      </div>
    </div>
  )
}
