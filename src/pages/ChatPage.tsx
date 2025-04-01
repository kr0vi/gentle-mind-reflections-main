
import React from 'react';
import ChatContainer from '@/components/ChatContainer';
import { useTheme } from '@/context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const ChatPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  
  // Check if user data exists, if not redirect to onboarding
  React.useEffect(() => {
    const userData = localStorage.getItem('reflectbot_user');
    if (!userData) {
      navigate('/onboarding');
    }
  }, [navigate]);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'reflection-gradient' : 'bg-gradient-to-br from-gray-50 to-gray-100'} flex flex-col justify-center items-center p-4 sm:p-6`}>
      <main className={`${isDarkMode ? 'bg-reflectbot-background bg-opacity-50' : 'bg-white bg-opacity-75'} backdrop-blur-md rounded-xl shadow-xl w-full max-w-2xl h-[80vh] min-h-[500px] overflow-hidden border ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <ChatContainer />
      </main>
      
      <footer className={`mt-6 text-sm ${isDarkMode ? 'text-reflectbot-text opacity-60' : 'text-gray-600'} text-center`}>
        <p>ReflectBot • A tool for mindful self-reflection</p>
        <p className="mt-1">
          © {new Date().getFullYear()} • 
          <span className={`ml-1 ${isDarkMode ? 'text-reflectbot-accent' : 'text-teal-600'}`}>
            Share your thoughts, track your mood over time
          </span>
        </p>
        <button 
          onClick={() => navigate('/')}
          className={`mt-2 text-sm ${isDarkMode ? 'text-reflectbot-text hover:text-reflectbot-accent' : 'text-gray-600 hover:text-teal-600'} underline`}
        >
          Back to home
        </button>
      </footer>
    </div>
  );
};

export default ChatPage;
