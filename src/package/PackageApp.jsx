import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { PackagesPage } from './pages/PackagesPage';
import './styles/index.css';

export default function PackageApp({ onNavigateHome, onNavigate, isDark, onToggleTheme }) {
  return (
    <ThemeProvider isDark={isDark} onToggleTheme={onToggleTheme}>
      <PackagesPage onNavigateHome={onNavigateHome} onNavigate={onNavigate} />
    </ThemeProvider>
  );
}
