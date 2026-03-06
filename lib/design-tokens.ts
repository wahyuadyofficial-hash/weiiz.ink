// lib/design-tokens.ts
// Sumber kebenaran semua design token — import di mana pun dibutuhkan

export const colors = {
  bg: {
    page:    '#040d1a',
    card:    '#071428',
    panel:   '#050f20',
    surface: '#0a1628',
  },
  primary:      '#38bdf8',
  primaryDim:   'rgba(56,189,248,0.12)',
  primaryHover: 'rgba(56,189,248,0.2)',
  primaryGlow:  'rgba(56,189,248,0.35)',
  border:       'rgba(56,189,248,0.15)',
  borderHover:  'rgba(56,189,248,0.3)',
  borderMuted:  'rgba(255,255,255,0.06)',
  text: {
    primary:   '#f0f6ff',
    secondary: '#7a95b4',
    muted:     '#3d5a7a',
  },
  status: {
    success: '#22c55e',
    warning: '#f59e0b',
    danger:  '#ef4444',
    info:    '#38bdf8',
  },
} as const

export const radius = {
  card:   '16px',
  button: '10px',
  input:  '10px',
  badge:  '6px',
  full:   '9999px',
} as const

export const font = {
  body:    "'Plus Jakarta Sans', sans-serif",
  display: "'Syne', sans-serif",
} as const

export const transition = '150ms ease'

// Plan badge styles
export const planBadge = {
  FREE:    { bg: 'rgba(107,114,128,0.15)', color: '#9ca3af', border: 'rgba(107,114,128,0.2)',  label: 'FREE'    },
  STARTER: { bg: 'rgba(56,189,248,0.10)',  color: '#38bdf8', border: 'rgba(56,189,248,0.2)',   label: 'STARTER' },
  PRO:     { bg: 'rgba(56,189,248,0.18)',  color: '#7dd3fc', border: 'rgba(56,189,248,0.35)',  label: '✦ PRO'   },
  ELITE:   { bg: 'rgba(168,85,247,0.12)',  color: '#c084fc', border: 'rgba(168,85,247,0.25)',  label: '✦ ELITE' },
} as const

// Status badge styles
export const statusBadge = {
  success: { bg: 'rgba(34,197,94,0.1)',   color: '#4ade80', border: 'rgba(34,197,94,0.2)',  dot: '#22c55e', label: 'Sukses'     },
  pending: { bg: 'rgba(245,158,11,0.1)',  color: '#fbbf24', border: 'rgba(245,158,11,0.2)', dot: '#f59e0b', label: 'Pending'    },
  failed:  { bg: 'rgba(239,68,68,0.1)',   color: '#f87171', border: 'rgba(239,68,68,0.2)',  dot: '#ef4444', label: 'Gagal'      },
  expired: { bg: 'rgba(107,114,128,0.1)', color: '#6b7280', border: 'rgba(107,114,128,0.15)',dot: '#6b7280', label: 'Kadaluarsa' },
} as const

// Consistent card style
export const cardStyle = {
  background: colors.bg.card,
  border: `1px solid ${colors.border}`,
  borderRadius: radius.card,
} as const

// Consistent input style
export const inputStyle = {
  background: colors.bg.surface,
  border: `1px solid ${colors.borderMuted}`,
  borderRadius: radius.input,
  color: colors.text.primary,
  fontFamily: font.body,
} as const
