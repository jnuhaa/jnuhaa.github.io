/**
 * Case Study Design System Tokens
 * Override these or use className for customization.
 *
 * Typography: 4 styles — title, subtitle, body, caption.
 * Uses Aspekta (lighter geometric sans) with Helvetica fallback; monospace for captions.
 */

const FONT = 'font-["Aspekta","Helvetica_Neue",Helvetica,Arial,sans-serif]';
const FONT_MONO = 'font-mono';

export const TYPOGRAPHY = {
  /** Font stack for title, subtitle, body */
  font: FONT,
  /** Monospace for captions */
  fontMono: FONT_MONO,
  /** Titles (h1, h2) — font + weight; add size per context */
  title: `${FONT} font-normal tracking-tight leading-[1.15] text-slate-900`,
  /** Subtitles (h3) */
  subtitle: `${FONT} text-lg md:text-xl font-normal tracking-tight text-slate-900`,
  /** Body text */
  body: `${FONT} text-[15px] md:text-base font-light leading-[1.7] text-slate-700`,
  /** Captions, labels, metadata (default: dark; contexts override as needed) */
  caption: `${FONT_MONO} text-[11px] uppercase tracking-wider font-normal text-slate-400`,
};

export const SPACING = {
  section: 'my-16 md:my-24',
  container: 'space-y-6',
  tight: 'space-y-4',
  loose: 'space-y-10'
};

export const CONTENT = {
  maxWidth: 'max-w-4xl',
  maxWidthWide: 'max-w-5xl',
  maxWidthNarrow: 'max-w-2xl'
};

export const LABEL = {
  base: 'text-[11px] uppercase tracking-wider font-normal text-slate-400 font-mono'
};

export const COLORS = {
  background: {
    none: '',
    subtle: 'bg-slate-50/50',
    grey: 'bg-slate-100',
    dark: 'bg-slate-900'
  },
  border: 'border-slate-200',
  borderDark: 'border-slate-700'
};

export const GAP = {
  sm: 'gap-3',
  md: 'gap-4 md:gap-6',
  lg: 'gap-6 md:gap-8',
  xl: 'gap-8 md:gap-12'
};
