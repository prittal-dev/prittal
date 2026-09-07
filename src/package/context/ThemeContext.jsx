import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(undefined);

export const ThemeProvider = ({ children, isDark, onToggleTheme }) => {
  const [internalDark, setInternalDark] = useState(() => {
    if (typeof isDark === 'boolean') return isDark;
    if (typeof window !== 'undefined') {
      const version = localStorage.getItem('prittal-theme-default-v2');
      if (!version) {
        return true;
      }
      const saved = localStorage.getItem('prittal-theme');
      if (saved === 'dark') return true;
      if (saved === 'light') return false;
      return document.documentElement.classList.contains('dark');
    }
    return true; // Default to dark theme
  });

  const activeIsDark = typeof isDark === 'boolean' ? isDark : internalDark;
  const theme = activeIsDark ? 'dark' : 'light';

  const toggleTheme = () => {
    if (onToggleTheme) {
      onToggleTheme();
    } else {
      setInternalDark(prev => {
        const next = !prev;
        const root = document.documentElement;
        if (next) {
          root.classList.add('dark');
          root.classList.remove('light');
          root.setAttribute('data-theme', 'dark');
        } else {
          root.classList.remove('dark');
          root.classList.add('light');
          root.setAttribute('data-theme', 'light');
        }
        localStorage.setItem('prittal-theme', next ? 'dark' : 'light');
        return next;
      });
    }
  };

  useEffect(() => {
    const root = document.documentElement;
    if (activeIsDark) {
      root.classList.add('dark');
      root.classList.remove('light');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      root.setAttribute('data-theme', 'light');
    }
    localStorage.setItem('prittal-theme', activeIsDark ? 'dark' : 'light');
  }, [activeIsDark]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: activeIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
