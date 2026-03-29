'use client';

import React, { createContext, useContext } from 'react';
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';

interface DarkModeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isDark: boolean;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

function DarkModeProviderInner({ children }: { children: React.ReactNode }) {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const contextValue: DarkModeContextType = {
    theme: (resolvedTheme as 'light' | 'dark') || 'light',
    toggleTheme,
    isDark: resolvedTheme === 'dark',
    setTheme: setTheme as (theme: 'light' | 'dark' | 'system') => void,
  };

  return (
    <DarkModeContext.Provider value={contextValue}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange={false}
      storageKey="bio-maker-theme"
    >
      <DarkModeProviderInner>{children}</DarkModeProviderInner>
    </NextThemesProvider>
  );
}

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
}

// Export the ThemeProvider for use in other places if needed
export { useTheme } from 'next-themes';
