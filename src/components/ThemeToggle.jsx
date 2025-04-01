import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const ThemeToggle = ({ isDarkMode, toggleTheme }) => {
  return (
    <div className="flex items-center gap-2 p-2 rounded-full bg-opacity-80 backdrop-blur-sm transition-all" 
         style={{ 
           backgroundColor: isDarkMode ? 'rgba(30, 30, 45, 0.7)' : 'rgba(255, 255, 255, 0.7)',
           boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
           border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)'
         }}>
      <Sun className={`h-4 w-4 ${isDarkMode ? 'text-gray-400' : 'text-yellow-500'}`} />
      <Switch 
        checked={isDarkMode} 
        onCheckedChange={toggleTheme}
        className={`${isDarkMode ? 'bg-indigo-600' : 'bg-gray-300'}`}
      />
      <Moon className={`h-4 w-4 ${isDarkMode ? 'text-indigo-300' : 'text-gray-400'}`} />
    </div>
  );
};

export default ThemeToggle; 