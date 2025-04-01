import React from 'react';
import { Link } from 'react-router-dom';
import ChatPreferences from '@/components/ChatPreferences';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

const PreferencesPage: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'reflection-gradient' : 'bg-gradient-to-br from-gray-50 to-gray-100'} flex flex-col items-center p-4 sm:p-6`}>
      {/* Header with navigation */}
      <header className="w-full max-w-xl flex justify-between items-center mb-6">
        <Link to="/chat">
          <Button 
            variant="ghost" 
            className={`${isDarkMode ? 'text-reflectbot-text hover:text-reflectbot-accent' : 'text-gray-700 hover:text-teal-600'}`}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Back to Chat
          </Button>
        </Link>
        <h1 className={`text-xl font-bold ${isDarkMode ? 'text-reflectbot-accent' : 'text-teal-600'}`}>
          Preferences
        </h1>
        <div className="w-[100px]"></div> {/* Empty div for balanced spacing */}
      </header>

      {/* Main content */}
      <main className="w-full max-w-xl flex-1 flex flex-col items-center justify-center">
        <ChatPreferences />
      </main>

      {/* Footer */}
      <footer className={`mt-6 text-sm ${isDarkMode ? 'text-reflectbot-text opacity-60' : 'text-gray-600'} text-center`}>
        <p>ReflectBot • A tool for mindful self-reflection</p>
        <p className="mt-1">
          © {new Date().getFullYear()} • 
          <span className={`ml-1 ${isDarkMode ? 'text-reflectbot-accent' : 'text-teal-600'}`}>
            Your mental health companion
          </span>
        </p>
      </footer>
    </div>
  );
};

export default PreferencesPage; 