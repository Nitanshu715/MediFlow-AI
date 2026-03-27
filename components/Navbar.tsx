'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Navbar.module.css'

const links = [
  { href: '/',             label: 'Overview'     },
  { href: '/analyze',      label: 'Live Demo'    },
  { href: '/audit',        label: 'Audit Trail'  },
  { href: '/architecture', label: 'Architecture' },
]

export default function Navbar() {
  const path = usePathname()

  return (
    <header className={styles.nav}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoDot} />
          MediFlow <em>AI</em>
        </Link>

        <div className={styles.tag}>
          PS-5 &nbsp;·&nbsp; Healthcare Compliance Agent
        </div>

        <nav className={styles.links}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`${styles.link} ${path === l.href ? styles.active : ''}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
