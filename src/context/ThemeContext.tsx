import React, { createContext, useContext, useEffect } from 'react';

export type ThemeId = 'cream';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  icon: string;
  bgPreview: string;
  accentPreview: string;
  description: string;
}

export const THEMES: ThemeConfig[] = [
  {
    id: 'cream',
    name: 'Warm Sand',
    icon: '🌾',
    bgPreview: '#CAC5BA',
    accentPreview: '#E8FF2A',
    description: 'Original classic warm sand theme with vibrant yellow accents.',
  },
];

interface ThemeContextType {
  theme: ThemeId;
  setTheme: (id: ThemeId) => void;
  cycleTheme: () => void;
  currentThemeConfig: ThemeConfig;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme: ThemeId = 'cream';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'cream');
  }, []);

  const currentThemeConfig = THEMES[0];

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: () => {},
        cycleTheme: () => {},
        currentThemeConfig,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
