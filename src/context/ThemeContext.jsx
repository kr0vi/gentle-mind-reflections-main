import React, { createContext, useContext, useState, useEffect } from 'react';

// Define theme color palettes for different therapy styles
export const themeColors = {
  default: {
    dark: {
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      textColor: '#e9e9e9',
      accentColor: '#4da6ff',
      accentHover: '#3a95ff',
      aiBubble: '#2a2a3a',
      userBubble: '#0c4e96'
    },
    light: {
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e6eef8 100%)',
      textColor: '#2c3e50',
      accentColor: '#3498db',
      accentHover: '#2980b9',
      aiBubble: '#f1f1f1',
      userBubble: '#d1e8ff'
    }
  },
  balanced: {
    dark: {
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      textColor: '#e9e9e9',
      accentColor: '#4da6ff',
      accentHover: '#3a95ff',
      aiBubble: '#2a2a3a',
      userBubble: '#0c4e96'
    },
    light: {
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e6eef8 100%)',
      textColor: '#2c3e50',
      accentColor: '#3498db',
      accentHover: '#2980b9',
      aiBubble: '#f1f1f1',
      userBubble: '#d1e8ff'
    }
  },
  empathetic: {
    dark: {
      background: 'linear-gradient(135deg, #2c1a3b 0%, #37284d 100%)',
      textColor: '#f0e6ff',
      accentColor: '#b07aff',
      accentHover: '#9855ff',
      aiBubble: '#382a4d',
      userBubble: '#553585'
    },
    light: {
      background: 'linear-gradient(135deg, #f9f5ff 0%, #f0e5ff 100%)',
      textColor: '#4a2b6b',
      accentColor: '#8e44ad',
      accentHover: '#7d3c98',
      aiBubble: '#f5edff',
      userBubble: '#e1d0f5'
    }
  },
  'solution-focused': {
    dark: {
      background: 'linear-gradient(135deg, #1e3320 0%, #1e493c 100%)',
      textColor: '#e8f5e9',
      accentColor: '#4caf50',
      accentHover: '#388e3c',
      aiBubble: '#2c3c2e',
      userBubble: '#1b5e20'
    },
    light: {
      background: 'linear-gradient(135deg, #f1f8e9 0%, #e8f5e9 100%)',
      textColor: '#1b5e20',
      accentColor: '#43a047',
      accentHover: '#388e3c',
      aiBubble: '#f0f7f0',
      userBubble: '#c8e6c9'
    }
  }
};

// Create the context
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [themeStyle, setThemeStyle] = useState('balanced');

  // Initialize theme based on user preference
  useEffect(() => {
    // Check if user has previously set a theme preference
    const savedTheme = localStorage.getItem('reflectbot_theme');
    const savedThemeStyle = localStorage.getItem('reflectbot_theme_style') || 'balanced';
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    setIsDarkMode(savedTheme ? savedTheme === 'dark' : prefersDark);
    setThemeStyle(savedThemeStyle);
  }, []);

  // Apply theme colors
  useEffect(() => {
    const colors = themeColors[themeStyle] || themeColors.default;
    const modeColors = isDarkMode ? colors.dark : colors.light;
    
    document.documentElement.style.setProperty('--background', modeColors.background);
    document.documentElement.style.setProperty('--text-color', modeColors.textColor);
    document.documentElement.style.setProperty('--accent-color', modeColors.accentColor);
    document.documentElement.style.setProperty('--accent-hover', modeColors.accentHover);
    document.documentElement.style.setProperty('--ai-bubble', modeColors.aiBubble);
    document.documentElement.style.setProperty('--user-bubble', modeColors.userBubble);
    
    // Add or remove dark mode class
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Store user preference
    localStorage.setItem('reflectbot_theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('reflectbot_theme_style', themeStyle);
  }, [isDarkMode, themeStyle]);

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, setThemeStyle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
