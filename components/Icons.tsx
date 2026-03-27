'use client'

interface IconProps {
  size?: number
  className?: string
  strokeWidth?: number
}

const base = (size: number, sw: number, children: React.ReactNode, className = '') => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={sw}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {children}
  </svg>
)

export function IconDna({ size = 16, strokeWidth = 1.5, className }: IconProps) {
  return base(size, strokeWidth,
    <>
      <path d="M2 15c6.667-6 13.333 0 20-6" />
      <path d="M9 22c1.798-1.998 2.518-3.995 2.757-5.993" />
      <path d="M15 2c-1.798 1.998-2.518 3.995-2.757 5.993" />
      <path d="m17 6-2.5-2.5" />
      <path d="m14 8-1-1" />
      <path d="m7 18 2.5 2.5" />
      <path d="m3.5 14.5.5.5" />
      <path d="m20 9 .5.5" />
      <path d="m6.5 12.5 1 1" />
      <path d="m16.5 10.5 1 1" />
      <path d="m10 16 1.5 1.5" />
    </>,
    className
  )
}

export function IconShield({ size = 16, strokeWidth = 1.5, className }: IconProps) {
  return base(size, strokeWidth,
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </>,
    className
  )
}

export function IconFileText({ size = 16, strokeWidth = 1.5, className }: IconProps) {
  return base(size, strokeWidth,
    <>
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </>,
    className
  )
}

export function IconScale({ size = 16, strokeWidth = 1.5, className }: IconProps) {
  return base(size, strokeWidth,
    <>
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z" />
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z" />
      <path d="M7 21h10" />
      <path d="M12 3v18" />
      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
    </>,
    className
  )
}

export function IconArchive({ size = 16, strokeWidth = 1.5, className }: IconProps) {
  return base(size, strokeWidth,
    <>
      <rect width="20" height="5" x="2" y="3" rx="1" />
      <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
      <path d="M10 12h4" />
    </>,
    className
  )
}

export function IconCheck({ size = 16, strokeWidth = 2, className }: IconProps) {
  return base(size, strokeWidth, <polyline points="20 6 9 17 4 12" />, className)
}

export function IconCircleCheck({ size = 16, strokeWidth = 1.5, className }: IconProps) {
  return base(size, strokeWidth,
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </>,
    className
  )
}

export function IconAlertTriangle({ size = 16, strokeWidth = 1.5, className }: IconProps) {
  return base(size, strokeWidth,
    <>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </>,
    className
  )
}

export function IconTag({ size = 16, strokeWidth = 1.5, className }: IconProps) {
  return base(size, strokeWidth,
    <>
      <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
      <path d="M7 7h.01" />
    </>,
    className
  )
}

export function IconPlay({ size = 16, strokeWidth = 1.5, className }: IconProps) {
  return base(size, strokeWidth,
    <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" stroke="none" />,
    className
  )
}

export function IconLoader({ size = 16, strokeWidth = 2, className }: IconProps) {
  return base(size, strokeWidth,
    <>
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
      <line x1="2" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
    </>,
    className
  )
}

export function IconArrowRight({ size = 16, strokeWidth = 1.5, className }: IconProps) {
  return base(size, strokeWidth,
    <>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </>,
    className
  )
}

export function IconClock({ size = 16, strokeWidth = 1.5, className }: IconProps) {
  return base(size, strokeWidth,
    <>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </>,
    className
  )
}

export function IconBarChart({ size = 16, strokeWidth = 1.5, className }: IconProps) {
  return base(size, strokeWidth,
    <>
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </>,
    className
  )
}

export function IconNetwork({ size = 16, strokeWidth = 1.5, className }: IconProps) {
  return base(size, strokeWidth,
    <>
      <rect x="16" y="16" width="6" height="6" rx="1" />
      <rect x="2" y="16" width="6" height="6" rx="1" />
      <rect x="9" y="2" width="6" height="6" rx="1" />
      <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
      <path d="M12 12V8" />
    </>,
    className
  )
}

export function IconBuilding({ size = 16, strokeWidth = 1.5, className }: IconProps) {
  return base(size, strokeWidth,
    <>
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </>,
    className
  )
}

export function IconX({ size = 16, strokeWidth = 2, className }: IconProps) {
  return base(size, strokeWidth,
    <>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </>,
    className
  )
}
