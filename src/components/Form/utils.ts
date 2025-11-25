import type { FormVariant } from './types'

const outlinedVars = {
  '--form-control-bg': 'var(--bg-color)',
  '--form-control-border': 'var(--border-color-base)',
  '--form-control-hover-border': 'var(--border-color-light)',
  '--form-control-focus-border': 'var(--primary-color)',
  '--form-control-focus-shadow': '0 0 0 2px rgba(64, 158, 255, 0.1)',
  '--form-control-border-width': '1px',
  '--form-control-radius': 'var(--border-radius-base)',
} as const

const filledVars = {
  '--form-control-bg': 'var(--bg-color-light)',
  '--form-control-border': 'transparent',
  '--form-control-hover-border': 'transparent',
  '--form-control-focus-border': 'var(--primary-color)',
  '--form-control-focus-shadow': '0 0 0 2px rgba(64, 158, 255, 0.15)',
  '--form-control-border-width': '1px',
  '--form-control-radius': 'var(--border-radius-base)',
} as const

const borderlessVars = {
  '--form-control-bg': 'transparent',
  '--form-control-border': 'transparent',
  '--form-control-hover-border': 'transparent',
  '--form-control-focus-border': 'transparent',
  '--form-control-focus-shadow': 'none',
  '--form-control-border-width': '0',
  '--form-control-radius': '0',
} as const

const underlinedVars = {
  '--form-control-bg': 'transparent',
  '--form-control-border': 'transparent',
  '--form-control-hover-border': 'transparent',
  '--form-control-focus-border': 'var(--primary-color)',
  '--form-control-focus-shadow': 'none',
  '--form-control-border-width': '0 0 2px 0',
  '--form-control-radius': '0',
} as const

const variantMap = {
  outlined: outlinedVars,
  filled: filledVars,
  borderless: borderlessVars,
  underlined: underlinedVars,
} satisfies Record<FormVariant, Record<string, string>>

export const getVariantCssVars = (variant: FormVariant) => ({ ...variantMap[variant] })
