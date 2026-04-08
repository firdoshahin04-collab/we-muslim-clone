import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeType, getThemeStyles } from '../lib/theme';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>(() => {
    const saved = localStorage.getItem('app_theme');
    return (saved as ThemeType) || 'minimalist-ink';
  });

  useEffect(() => {
    localStorage.setItem('app_theme', theme);
  }, [theme]);

  const styles = getThemeStyles(theme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div style={styles} className="min-h-screen transition-colors duration-500">
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
