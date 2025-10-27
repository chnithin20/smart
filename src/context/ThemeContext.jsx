import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const [accentColor, setAccentColor] = useState('blue');

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const savedAccent = localStorage.getItem('accentColor') || 'blue';
    setTheme(savedTheme);
    setAccentColor(savedAccent);
    applyTheme(savedTheme, savedAccent);
  }, []);

  const applyTheme = (newTheme, newAccent) => {
    const root = document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('theme-dark', 'theme-light');
    root.classList.add(`theme-${newTheme}`);
    
    // Apply accent color
    const accentColors = {
      blue: { primary: '59, 130, 246', secondary: '37, 99, 235' },
      purple: { primary: '168, 85, 247', secondary: '147, 51, 234' },
      green: { primary: '34, 197, 94', secondary: '22, 163, 74' },
      red: { primary: '239, 68, 68', secondary: '220, 38, 38' },
      orange: { primary: '249, 115, 22', secondary: '234, 88, 12' },
    };
    
    const colors = accentColors[newAccent] || accentColors.blue;
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-primary-dark', colors.secondary);
  };

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme, accentColor);
  };

  const changeAccentColor = (newAccent) => {
    setAccentColor(newAccent);
    localStorage.setItem('accentColor', newAccent);
    applyTheme(theme, newAccent);
  };

  const value = {
    theme,
    accentColor,
    changeTheme,
    changeAccentColor,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
