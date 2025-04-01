import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeContext';

const NotFound = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Page not found</p>
      <Button 
        onClick={() => navigate('/')}
        className={`${isDarkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-teal-600 hover:bg-teal-700'} text-white`}
      >
        Return Home
      </Button>
    </div>
  );
};

export default NotFound; 