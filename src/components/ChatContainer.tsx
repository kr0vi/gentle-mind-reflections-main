import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Message from './Message';
import UserInput from './UserInput';
import MoodSelector from './MoodSelector';
import { getMoodPrompt } from '../utils/reflectionData';
import { exportConversation } from '../utils/exportUtils';
import { getGeminiResponse } from '../utils/geminiService';
import { toast } from '@/components/ui/use-toast';
import { useTheme } from '@/context/ThemeContext';
import { useChatPreferences } from '@/context/ChatPreferencesContext';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

interface Message {
  sender: 'ai' | 'user';
  text: string;
}

interface UserData {
  name: string;
  age?: string;
  mood: string;
}

const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const { isDarkMode } = useTheme();
  const { preferences } = useChatPreferences();
  const navigate = useNavigate();
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Load user data from localStorage on component mount
  useEffect(() => {
    const storedUserData = localStorage.getItem('reflectbot_user');
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      setUserData(parsedData);
      setSelectedMood(parsedData.mood);
      // Start chat with the pre-selected mood
      startNewChat(parsedData.mood);
    } else {
      // If no user data, show mood selector (fallback)
      setShowMoodSelector(true);
    }
  }, []);

  // Handle mood selection
  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    setShowMoodSelector(false);
    startNewChat(mood);
  };

  // Navigate to preferences page
  const handleOpenPreferences = () => {
    navigate('/preferences');
  };

  // Start a new chat with an initial AI prompt
  const startNewChat = (mood: string | null = null) => {
    let initialPrompt = getMoodPrompt(mood);
    
    // Personalize the prompt with preferences
    let userName = userData?.name || preferences.userName || '';
    if (userName) {
      initialPrompt = initialPrompt.replace('there', userName);
    }
    
    // Add personalization based on therapy style if applicable
    if (preferences.therapyStyle === 'empathetic') {
      initialPrompt = `I'll be here to listen with empathy and understanding. ${initialPrompt}`;
    } else if (preferences.therapyStyle === 'solution-focused') {
      initialPrompt = `I'll help you identify practical solutions. ${initialPrompt}`;
    }
    
    setMessages([{ sender: 'ai', text: initialPrompt }]);
    setIsSessionActive(true);
  };

  // Handle user message submission
  const handleUserInput = async (text: string) => {
    // Add user message
    const updatedMessages = [...messages, { sender: 'user', text }];
    setMessages(updatedMessages);
    setIsThinking(true);

    try {
      // Get response from Gemini API
      const aiResponse = await getGeminiResponse(updatedMessages, preferences, selectedMood);
      
      // Add AI response
      setMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
      
      // Check if we should end the session after many exchanges (e.g., 10)
      if (updatedMessages.length > 20) {
        setIsSessionActive(false);
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      toast({
        title: "Communication Error",
        description: "There was a problem connecting to the AI. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsThinking(false);
    }
  };

  // Handle saving the reflection
  const handleSaveReflection = () => {
    const success = exportConversation(messages);
    if (success) {
      toast({
        title: "Reflection saved",
        description: "Your reflection has been downloaded as a text file.",
      });
    } else {
      toast({
        title: "Error saving reflection",
        description: "There was a problem downloading your reflection.",
        variant: "destructive",
      });
    }
  };

  // Reset conversation and show mood selector
  const handleNewReflection = () => {
    setMessages([]);
    setShowMoodSelector(true);
    setIsSessionActive(false);
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto w-full p-4">
      {/* Chat header */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-center flex-1">
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-reflectbot-accent' : 'text-teal-600'} mb-2`}>ReflectBot</h1>
          <p className={isDarkMode ? 'text-reflectbot-text opacity-80' : 'text-gray-600'}>
            A safe space for mindful self-reflection
          </p>
          {(userData?.name || preferences.userName) && (
            <p className={`mt-1 ${isDarkMode ? 'text-reflectbot-text' : 'text-gray-700'}`}>
              Welcome, <span className={isDarkMode ? 'text-reflectbot-accent' : 'text-teal-600'}>
                {userData?.name || preferences.userName}
              </span>
            </p>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleOpenPreferences}
          className={`${isDarkMode ? 'text-reflectbot-text hover:text-reflectbot-accent hover:bg-gray-800' : 'text-gray-600 hover:text-teal-600 hover:bg-gray-100'}`}
          title="Chat Preferences"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>

      {/* Mood selector or chat area */}
      {showMoodSelector ? (
        <div className="flex-1 flex items-center justify-center">
          <MoodSelector onMoodSelect={handleMoodSelect} />
        </div>
      ) : (
        <>
          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto mb-4 p-2 space-y-2 flex flex-col">
            {messages.map((message, index) => (
              <Message
                key={index}
                text={message.text}
                sender={message.sender}
                isLatest={index === messages.length - 1}
                mood={message.sender === 'ai' ? selectedMood : undefined}
              />
            ))}
            {isThinking && (
              <div className={`chat-bubble-ai inline-flex gap-1 items-center w-auto ${!isDarkMode && 'bg-gray-100 text-gray-800'}`}>
                <span className="animate-pulse">•</span>
                <span className="animate-pulse delay-100">•</span>
                <span className="animate-pulse delay-200">•</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input area */}
          {isSessionActive ? (
            <UserInput onSubmit={handleUserInput} disabled={isThinking} />
          ) : (
            <div className="flex flex-wrap gap-3 justify-center mt-4">
              <button
                onClick={handleNewReflection}
                className={`reflection-button ${!isDarkMode && 'bg-teal-600 hover:bg-teal-700'}`}
              >
                New Reflection
              </button>
              <button
                onClick={handleSaveReflection}
                className={`reflection-button ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-500 hover:bg-gray-600'}`}
              >
                Save Reflection
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ChatContainer;
