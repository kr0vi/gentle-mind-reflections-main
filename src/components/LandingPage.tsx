
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';
import { useTheme } from '@/context/ThemeContext';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();

  const handleGetStarted = () => {
    navigate('/onboarding');
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'reflection-gradient' : 'bg-gradient-to-br from-gray-50 to-gray-100'}`}>
      <header className="w-full p-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-reflectbot-accent">ReflectBot</div>
        <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-4xl mx-auto">
        <div className={`bg-opacity-50 backdrop-blur-md rounded-xl p-8 shadow-xl border ${isDarkMode ? 'bg-reflectbot-background border-gray-800' : 'bg-white border-gray-200'}`}>
          <h1 className={`text-4xl sm:text-5xl font-bold mb-6 ${isDarkMode ? 'text-reflectbot-text' : 'text-gray-800'}`}>
            Your Personal Reflection Companion
          </h1>
          
          <p className={`text-xl mb-8 max-w-2xl ${isDarkMode ? 'text-reflectbot-text opacity-80' : 'text-gray-600'}`}>
            Discover mindful self-reflection with ReflectBot, an AI guide designed to help you process your thoughts and feelings in a safe, supportive space.
          </p>
          
          <div className="animate-fade-in mb-10">
            <Button 
              onClick={handleGetStarted}
              className={`text-lg py-6 px-8 rounded-xl shadow-lg transition-all duration-300 ${
                isDarkMode ? 'bg-reflectbot-accent hover:bg-reflectbot-accent-hover' : 'bg-teal-600 hover:bg-teal-700'
              } text-white`}
            >
              Begin Your Reflection Journey
            </Button>
          </div>
          
          <div className={`mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 ${isDarkMode ? 'text-reflectbot-text' : 'text-gray-700'}`}>
            <div className={`p-5 rounded-lg ${isDarkMode ? 'bg-reflectbot-ai-bubble' : 'bg-white shadow-md'}`}>
              <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-reflectbot-accent' : 'text-teal-600'}`}>Guided Reflection</h3>
              <p>Thoughtful prompts tailored to your current mood and emotional state</p>
            </div>
            
            <div className={`p-5 rounded-lg ${isDarkMode ? 'bg-reflectbot-ai-bubble' : 'bg-white shadow-md'}`}>
              <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-reflectbot-accent' : 'text-teal-600'}`}>Safe Space</h3>
              <p>A private environment to process your thoughts without judgment</p>
            </div>
            
            <div className={`p-5 rounded-lg ${isDarkMode ? 'bg-reflectbot-ai-bubble' : 'bg-white shadow-md'}`}>
              <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-reflectbot-accent' : 'text-teal-600'}`}>Track Progress</h3>
              <p>Save your reflections to observe patterns and growth over time</p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className={`p-6 text-center ${isDarkMode ? 'text-reflectbot-text opacity-60' : 'text-gray-600'}`}>
        <p>ReflectBot • A tool for mindful self-reflection</p>
        <p className="mt-1">
          © {new Date().getFullYear()} • 
          <span className={`ml-1 ${isDarkMode ? 'text-reflectbot-accent' : 'text-teal-600'}`}>
            Share your thoughts, track your mood over time
          </span>
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
