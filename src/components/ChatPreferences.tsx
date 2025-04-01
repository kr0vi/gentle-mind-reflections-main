import React from 'react';
import { useChatPreferences, therapyStyles, topicOptions } from '@/context/ChatPreferencesContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTheme } from '@/context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const ChatPreferences: React.FC = () => {
  const { preferences, updateTherapyStyle, toggleTopic, setUserName, savePreferences } = useChatPreferences();
  const { isDarkMode, setThemeStyle } = useTheme();
  const navigate = useNavigate();

  const handleSavePreferences = () => {
    // Save preferences
    savePreferences();
    
    // Update theme style based on therapy style
    setThemeStyle(preferences.therapyStyle);
    
    toast({
      title: "Preferences saved",
      description: "Your therapy preferences have been updated.",
    });
    navigate('/chat');
  };

  return (
    <div className={`w-full max-w-xl mx-auto p-6 ${isDarkMode ? 'bg-reflectbot-background bg-opacity-70' : 'bg-white bg-opacity-90'} backdrop-blur-md rounded-xl shadow-lg border ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
      <h2 className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-reflectbot-accent' : 'text-teal-600'}`}>
        Chat Preferences
      </h2>
      <p className={`text-sm mb-6 ${isDarkMode ? 'text-reflectbot-text opacity-80' : 'text-gray-600'}`}>
        Customize your AI therapy experience
      </p>

      {/* Name Input */}
      <div className="mb-6">
        <label className={`block mb-2 text-sm font-medium ${isDarkMode ? 'text-reflectbot-text' : 'text-gray-700'}`}>
          Your Name
        </label>
        <Input
          value={preferences.userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your name"
          className={`w-full ${isDarkMode ? 'bg-reflectbot-ai-bubble text-reflectbot-text border-gray-700' : 'bg-gray-50 border-gray-300'}`}
        />
      </div>

      {/* AI Therapy Style Selection */}
      <div className="mb-6">
        <h3 className={`text-lg font-medium mb-3 ${isDarkMode ? 'text-reflectbot-text' : 'text-gray-800'}`}>
          AI Therapy Style
        </h3>
        <div className="flex flex-wrap gap-3">
          {therapyStyles.map((style) => (
            <button
              key={style.id}
              onClick={() => updateTherapyStyle(style.id)}
              className={`flex-1 py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 ${
                preferences.therapyStyle === style.id
                  ? (isDarkMode ? 'bg-reflectbot-accent text-white' : 'bg-teal-600 text-white')
                  : (isDarkMode ? 'bg-reflectbot-ai-bubble hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200')
              }`}
            >
              <span className="hidden sm:inline">{style.icon}</span>
              <span>{style.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Topics Selection */}
      <div className="mb-6">
        <h3 className={`text-lg font-medium mb-3 ${isDarkMode ? 'text-reflectbot-text' : 'text-gray-800'}`}>
          Topics
        </h3>
        <div className="flex flex-wrap gap-2">
          {topicOptions.map((topic) => {
            const isSelected = preferences.topics.includes(topic.id);
            return (
              <button
                key={topic.id}
                onClick={() => toggleTopic(topic.id)}
                className={`py-1 px-3 rounded-full text-sm transition-all ${
                  isSelected
                    ? (isDarkMode ? 'bg-reflectbot-accent text-white' : 'bg-teal-600 text-white')
                    : (isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300')
                }`}
              >
                {topic.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Save Button */}
      <Button
        onClick={handleSavePreferences}
        className={`w-full py-2 ${
          isDarkMode ? 'bg-reflectbot-accent hover:bg-reflectbot-accent-hover' : 'bg-purple-500 hover:bg-purple-600'
        } text-white font-medium rounded-lg transition-colors`}
      >
        Save Preferences
      </Button>
    </div>
  );
};

export default ChatPreferences; 