import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the therapy styles
export const therapyStyles = [
  { id: 'balanced', label: 'Balanced', icon: '⚖️' },
  { id: 'empathetic', label: 'Empathetic', icon: '❤️' },
  { id: 'solution-focused', label: 'Solution-focused', icon: '🎯' },
];

// Define topic options
export const topicOptions = [
  { id: 'anxiety', label: 'Anxiety' },
  { id: 'depression', label: 'Depression' },
  { id: 'stress', label: 'Stress' },
  { id: 'relationships', label: 'Relationships' },
  { id: 'sleep', label: 'Sleep' },
  { id: 'work-life-balance', label: 'Work-life Balance' },
];

// Create the context
const ChatPreferencesContext = createContext();

// Create the provider component
export const ChatPreferencesProvider = ({ children }) => {
  // Initialize state with default preferences or load from localStorage
  const [preferences, setPreferences] = useState(() => {
    const savedPrefs = localStorage.getItem('chat_preferences');
    if (savedPrefs) {
      return JSON.parse(savedPrefs);
    }
    return {
      therapyStyle: 'balanced',
      topics: ['anxiety', 'stress'],
      userName: '',
    };
  });

  // Load user name from existing user data if available
  useEffect(() => {
    const userData = localStorage.getItem('reflectbot_user');
    if (userData) {
      const { name } = JSON.parse(userData);
      if (name && !preferences.userName) {
        setPreferences(prev => ({ ...prev, userName: name }));
      }
    }
  }, []);

  // Update therapy style
  const updateTherapyStyle = (style) => {
    setPreferences(prev => ({ ...prev, therapyStyle: style }));
  };

  // Toggle a topic selection
  const toggleTopic = (topic) => {
    setPreferences(prev => {
      if (prev.topics.includes(topic)) {
        return { ...prev, topics: prev.topics.filter(t => t !== topic) };
      } else {
        return { ...prev, topics: [...prev.topics, topic] };
      }
    });
  };

  // Set user name
  const setUserName = (name) => {
    setPreferences(prev => ({ ...prev, userName: name }));
  };

  // Save preferences to localStorage
  const savePreferences = () => {
    localStorage.setItem('chat_preferences', JSON.stringify(preferences));
    
    // Also update the reflectbot_user data if it exists
    const userData = localStorage.getItem('reflectbot_user');
    if (userData) {
      const parsedData = JSON.parse(userData);
      localStorage.setItem('reflectbot_user', JSON.stringify({
        ...parsedData,
        name: preferences.userName,
      }));
    }
  };

  return (
    <ChatPreferencesContext.Provider value={{
      preferences,
      updateTherapyStyle,
      toggleTopic,
      setUserName,
      savePreferences,
    }}>
      {children}
    </ChatPreferencesContext.Provider>
  );
};

// Create a custom hook to use the context
export const useChatPreferences = () => {
  const context = useContext(ChatPreferencesContext);
  if (context === undefined) {
    throw new Error('useChatPreferences must be used within a ChatPreferencesProvider');
  }
  return context;
}; 