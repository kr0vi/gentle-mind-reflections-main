
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, toggleTheme }) => {
  return (
    <div className="flex items-center gap-2">
      <Sun className="h-4 w-4 text-reflectbot-text" />
      <Switch 
        checked={isDarkMode} 
        onCheckedChange={toggleTheme} 
      />
      <Moon className="h-4 w-4 text-reflectbot-text" />
    </div>
  );
};

export default ThemeToggle;
