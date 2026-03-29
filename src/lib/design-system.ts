/**
 * Design System - Bio Maker
 *
 * Central location for all design tokens and component classes.
 * Change values here to update the entire application.
 *
 * Usage:
 * import { ds } from '@/lib/design-system';
 * <button className={ds.button.primary}>Click me</button>
 */

/**
 * Button variants - consistent button styles across the app
 */
export const buttonStyles = {
  // Primary CTA button (golden gradient)
  primary: `
    inline-flex items-center justify-center gap-2
    px-6 py-3
    bg-gradient-to-r from-amber-500 to-orange-500
    hover:from-amber-600 hover:to-orange-600
    text-white font-semibold
    rounded-xl
    shadow-lg hover:shadow-xl
    transition-all duration-200
    disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-lg
  `.replace(/\s+/g, ' ').trim(),

  // Primary button - larger variant
  primaryLg: `
    inline-flex items-center justify-center gap-2
    px-8 py-4
    bg-gradient-to-r from-amber-500 to-orange-500
    hover:from-amber-600 hover:to-orange-600
    text-white font-bold text-lg
    rounded-xl
    shadow-lg hover:shadow-xl
    transition-all duration-200
    disabled:opacity-60 disabled:cursor-not-allowed
  `.replace(/\s+/g, ' ').trim(),

  // Primary button - small variant
  primarySm: `
    inline-flex items-center justify-center gap-1.5
    px-4 py-2
    bg-gradient-to-r from-amber-500 to-orange-500
    hover:from-amber-600 hover:to-orange-600
    text-white font-semibold text-sm
    rounded-lg
    shadow-md hover:shadow-lg
    transition-all duration-200
    disabled:opacity-60 disabled:cursor-not-allowed
  `.replace(/\s+/g, ' ').trim(),

  // Secondary button (outline style)
  secondary: `
    inline-flex items-center justify-center gap-2
    px-6 py-3
    bg-ds-surface hover:bg-ds-surface-hover
    text-ds-text-primary
    border-2 border-ds-border hover:border-ds-accent
    font-semibold
    rounded-xl
    shadow-sm hover:shadow-md
    transition-all duration-200
    disabled:opacity-60 disabled:cursor-not-allowed
  `.replace(/\s+/g, ' ').trim(),

  // Ghost button (minimal style)
  ghost: `
    inline-flex items-center justify-center gap-2
    px-4 py-2
    bg-transparent hover:bg-ds-surface-hover
    text-ds-text-secondary hover:text-ds-text-primary
    font-medium
    rounded-lg
    transition-all duration-200
    disabled:opacity-60 disabled:cursor-not-allowed
  `.replace(/\s+/g, ' ').trim(),

  // Destructive button (for delete actions)
  destructive: `
    inline-flex items-center justify-center gap-2
    px-6 py-3
    bg-ds-error hover:bg-red-600
    text-white font-semibold
    rounded-xl
    shadow-md hover:shadow-lg
    transition-all duration-200
    disabled:opacity-60 disabled:cursor-not-allowed
  `.replace(/\s+/g, ' ').trim(),

  // Icon-only button
  icon: `
    inline-flex items-center justify-center
    w-10 h-10
    bg-ds-surface hover:bg-ds-surface-hover
    text-ds-text-secondary hover:text-ds-text-primary
    border border-ds-border hover:border-ds-accent
    rounded-lg
    transition-all duration-200
    disabled:opacity-60 disabled:cursor-not-allowed
  `.replace(/\s+/g, ' ').trim(),

  // Icon button - small
  iconSm: `
    inline-flex items-center justify-center
    w-8 h-8
    bg-ds-surface hover:bg-ds-surface-hover
    text-ds-text-secondary hover:text-ds-text-primary
    border border-ds-border hover:border-ds-accent
    rounded-md
    transition-all duration-200
    disabled:opacity-60 disabled:cursor-not-allowed
  `.replace(/\s+/g, ' ').trim(),
} as const;

/**
 * Card variants - consistent card styles
 */
export const cardStyles = {
  // Default card
  default: `
    bg-ds-surface
    border border-ds-border
    rounded-2xl
    shadow-ds
    transition-all duration-200
  `.replace(/\s+/g, ' ').trim(),

  // Interactive card (hover effects)
  interactive: `
    bg-ds-surface hover:bg-ds-surface-hover
    border border-ds-border hover:border-ds-accent
    rounded-2xl
    shadow-ds hover:shadow-ds-md
    transition-all duration-200
    cursor-pointer
  `.replace(/\s+/g, ' ').trim(),

  // Elevated card (more prominent shadow)
  elevated: `
    bg-ds-surface
    border border-ds-border
    rounded-2xl
    shadow-ds-lg
    transition-all duration-200
  `.replace(/\s+/g, ' ').trim(),

  // Glass card (backdrop blur)
  glass: `
    bg-ds-surface/70 backdrop-blur-md
    border border-ds-border/50
    rounded-2xl
    shadow-ds
    transition-all duration-200
  `.replace(/\s+/g, ' ').trim(),
} as const;

/**
 * Input variants - consistent form input styles
 */
export const inputStyles = {
  // Default input
  default: `
    w-full
    px-4 py-3
    bg-ds-surface
    text-ds-text-primary
    placeholder:text-ds-text-muted
    border border-ds-border
    focus:border-ds-accent focus:ring-2 focus:ring-ds-accent/20
    rounded-lg
    transition-all duration-200
    outline-none
  `.replace(/\s+/g, ' ').trim(),

  // Small input
  sm: `
    w-full
    px-3 py-2
    bg-ds-surface
    text-ds-text-primary text-sm
    placeholder:text-ds-text-muted
    border border-ds-border
    focus:border-ds-accent focus:ring-2 focus:ring-ds-accent/20
    rounded-md
    transition-all duration-200
    outline-none
  `.replace(/\s+/g, ' ').trim(),

  // Search input with icon space
  search: `
    w-full
    pl-10 pr-4 py-3
    bg-ds-surface
    text-ds-text-primary
    placeholder:text-ds-text-muted
    border border-ds-border
    focus:border-ds-accent focus:ring-2 focus:ring-ds-accent/20
    rounded-xl
    transition-all duration-200
    outline-none
  `.replace(/\s+/g, ' ').trim(),

  // Error state
  error: `
    w-full
    px-4 py-3
    bg-ds-error-bg/10
    text-ds-text-primary
    placeholder:text-ds-text-muted
    border-2 border-ds-error
    focus:ring-2 focus:ring-ds-error/20
    rounded-lg
    transition-all duration-200
    outline-none
  `.replace(/\s+/g, ' ').trim(),
} as const;

/**
 * Typography variants
 */
export const textStyles = {
  // Headings
  h1: 'text-4xl sm:text-5xl font-bold font-heading text-ds-text-primary',
  h2: 'text-2xl sm:text-3xl font-bold font-heading text-ds-text-primary',
  h3: 'text-xl sm:text-2xl font-semibold font-heading text-ds-text-primary',
  h4: 'text-lg font-semibold font-heading text-ds-text-primary',

  // Body text
  body: 'text-base text-ds-text-primary font-body',
  bodyLg: 'text-lg text-ds-text-primary font-body',
  bodySm: 'text-sm text-ds-text-primary font-body',

  // Secondary text
  secondary: 'text-base text-ds-text-secondary font-body',
  secondaryLg: 'text-lg text-ds-text-secondary font-body',
  secondarySm: 'text-sm text-ds-text-secondary font-body',

  // Muted text
  muted: 'text-base text-ds-text-muted font-body',
  mutedSm: 'text-sm text-ds-text-muted font-body',

  // Labels
  label: 'text-sm font-medium text-ds-text-primary',
  labelMuted: 'text-sm font-medium text-ds-text-secondary',

  // Links
  link: 'text-ds-accent hover:text-ds-accent-dark underline-offset-4 hover:underline transition-colors',
} as const;

/**
 * Badge variants
 */
export const badgeStyles = {
  default: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-ds-bg-alt text-ds-text-secondary',
  success: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-ds-success-bg text-ds-success',
  error: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-ds-error-bg text-ds-error',
  warning: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-ds-warning-bg text-ds-warning',
  info: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-ds-info-bg text-ds-info',
  accent: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200',
} as const;

/**
 * Layout helpers
 */
export const layoutStyles = {
  // Page container
  pageContainer: 'min-h-screen bg-ds-bg transition-colors duration-300',

  // Content container
  container: 'max-w-6xl mx-auto px-4 sm:px-6',
  containerNarrow: 'max-w-3xl mx-auto px-4 sm:px-6',
  containerWide: 'max-w-7xl mx-auto px-4 sm:px-6',

  // Section spacing
  section: 'py-12 sm:py-16',
  sectionLg: 'py-16 sm:py-24',
  sectionSm: 'py-8 sm:py-12',

  // Flex layouts
  flexCenter: 'flex items-center justify-center',
  flexBetween: 'flex items-center justify-between',
  flexStart: 'flex items-center justify-start',
  flexCol: 'flex flex-col',
  flexColCenter: 'flex flex-col items-center',
} as const;

/**
 * Navigation styles
 */
export const navStyles = {
  // Main nav container
  nav: `
    py-4 px-6
    sticky top-0 z-50
  `.replace(/\s+/g, ' ').trim(),

  // Nav inner
  navInner: `
    max-w-6xl mx-auto
    flex justify-between items-center
    px-4 py-2
    rounded-2xl
    backdrop-blur-md
    bg-ds-surface/70
    shadow-lg
    border border-ds-border/50
  `.replace(/\s+/g, ' ').trim(),

  // Nav link
  navLink: `
    text-sm font-medium
    text-ds-text-secondary hover:text-ds-text-primary
    transition-colors duration-200
  `.replace(/\s+/g, ' ').trim(),

  // Nav link active
  navLinkActive: `
    text-sm font-medium
    text-ds-accent
    transition-colors duration-200
  `.replace(/\s+/g, ' ').trim(),
} as const;

/**
 * Divider styles
 */
export const dividerStyles = {
  horizontal: 'w-full h-px bg-ds-border',
  vertical: 'w-px h-full bg-ds-border',
  ornament: `
    flex items-center justify-center gap-4
    text-ds-accent
    before:content-[''] before:flex-1 before:h-px before:bg-gradient-to-r before:from-transparent before:to-ds-accent
    after:content-[''] after:flex-1 after:h-px after:bg-gradient-to-l after:from-transparent after:to-ds-accent
  `.replace(/\s+/g, ' ').trim(),
} as const;

/**
 * Combined design system export
 */
export const ds = {
  button: buttonStyles,
  card: cardStyles,
  input: inputStyles,
  text: textStyles,
  badge: badgeStyles,
  layout: layoutStyles,
  nav: navStyles,
  divider: dividerStyles,
} as const;

/**
 * CSS class names for common patterns
 * These can be used directly in className or combined with cn()
 */
export const patterns = {
  // Golden glow effect
  goldenGlow: 'shadow-[0_0_20px_rgba(212,175,55,0.3)]',

  // Glass morphism
  glass: 'bg-ds-surface/70 backdrop-blur-md border border-ds-border/50',

  // Focus ring
  focusRing: 'focus:outline-none focus:ring-2 focus:ring-ds-accent focus:ring-offset-2',

  // Smooth transitions
  transition: 'transition-all duration-200',
  transitionFast: 'transition-all duration-150',
  transitionSlow: 'transition-all duration-300',

  // Hover lift effect
  hoverLift: 'hover:-translate-y-1 hover:shadow-lg transition-all duration-200',

  // Gradient text
  gradientText: 'bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent',
} as const;

export default ds;
