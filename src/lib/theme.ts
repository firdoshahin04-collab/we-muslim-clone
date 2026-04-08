export type ThemeType = 'emerald-gold' | 'minimalist-ink';

export interface ThemeConfig {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
  patternOpacity: number;
}

export const THEMES: Record<ThemeType, ThemeConfig> = {
  'emerald-gold': {
    primary: '#10b981', // Emerald 500
    secondary: '#fbbf24', // Amber 400
    accent: '#d97706', // Amber 600
    background: '#064e3b', // Emerald 900
    surface: '#065f46', // Emerald 800
    text: '#ffffff',
    textMuted: '#a7f3d0', // Emerald 200
    border: 'rgba(255, 255, 255, 0.1)',
    patternOpacity: 0.1
  },
  'minimalist-ink': {
    primary: '#18181b', // Zinc 900
    secondary: '#71717a', // Zinc 500
    accent: '#27272a', // Zinc 800
    background: '#ffffff',
    surface: '#fafafa',
    text: '#09090b',
    textMuted: '#71717a',
    border: '#e4e4e7',
    patternOpacity: 0.03
  }
};

export function getThemeStyles(type: ThemeType) {
  const theme = THEMES[type];
  return {
    '--theme-primary': theme.primary,
    '--theme-secondary': theme.secondary,
    '--theme-accent': theme.accent,
    '--theme-background': theme.background,
    '--theme-surface': theme.surface,
    '--theme-text': theme.text,
    '--theme-text-muted': theme.textMuted,
    '--theme-border': theme.border,
    '--theme-pattern-opacity': theme.patternOpacity
  } as React.CSSProperties;
}
