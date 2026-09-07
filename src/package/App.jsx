import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { PackagesPage } from './pages/PackagesPage';

export function App() {
  return (
    <ThemeProvider>
      <PackagesPage />
    </ThemeProvider>
  );
}

export default App;
