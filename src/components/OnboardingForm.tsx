
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { moods } from '@/utils/reflectionData';

interface OnboardingFormData {
  name: string;
  age: string;
  mood: string;
}

const OnboardingForm: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  
  const form = useForm<OnboardingFormData>({
    defaultValues: {
      name: '',
      age: '',
      mood: '',
    },
  });

  const onSubmit = (data: OnboardingFormData) => {
    // Store user data in localStorage for the chat to use
    localStorage.setItem('reflectbot_user', JSON.stringify({
      ...data,
      mood: selectedMood
    }));
    
    // Navigate to the chat
    navigate('/chat');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'reflection-gradient' : 'bg-gradient-to-br from-gray-50 to-gray-100'} flex justify-center items-center p-4`}>
      <div className={`w-full max-w-md ${isDarkMode ? 'bg-reflectbot-background bg-opacity-50' : 'bg-white'} backdrop-blur-md rounded-xl shadow-xl p-6 border ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <h2 className={`text-2xl font-bold mb-6 text-center ${isDarkMode ? 'text-reflectbot-accent' : 'text-teal-600'}`}>
          Before We Begin
        </h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={isDarkMode ? 'text-reflectbot-text' : 'text-gray-700'}>
                    What should we call you?
                  </FormLabel>
                  <FormControl>
                    <Input 
                      required
                      placeholder="Your name" 
                      className={isDarkMode ? 'bg-reflectbot-ai-bubble text-reflectbot-text border-gray-700' : 'bg-gray-50 border-gray-300'} 
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={isDarkMode ? 'text-reflectbot-text' : 'text-gray-700'}>
                    Your age (optional)
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Age" 
                      className={isDarkMode ? 'bg-reflectbot-ai-bubble text-reflectbot-text border-gray-700' : 'bg-gray-50 border-gray-300'} 
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <div>
              <p className={`mb-3 ${isDarkMode ? 'text-reflectbot-text' : 'text-gray-700'}`}>
                How are you feeling today?
              </p>
              
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                {moods.map((mood) => (
                  <Button
                    key={mood.id}
                    type="button"
                    onClick={() => setSelectedMood(mood.id)}
                    className={`
                      mood-button h-auto 
                      ${selectedMood === mood.id ? 
                        (isDarkMode ? 'bg-reflectbot-accent text-white' : 'bg-teal-600 text-white') : 
                        (isDarkMode ? 'bg-reflectbot-ai-bubble' : 'bg-gray-100')}
                      ${isDarkMode ? 'hover:bg-reflectbot-accent-hover' : 'hover:bg-teal-500 hover:text-white'}
                      transition-all duration-300
                    `}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <span className="text-xl">{mood.emoji}</span>
                      <span>{mood.label}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
            
            <Button 
              type="submit" 
              disabled={!selectedMood}
              className={`w-full py-2 ${
                isDarkMode ? 'bg-reflectbot-accent hover:bg-reflectbot-accent-hover' : 'bg-teal-600 hover:bg-teal-700'
              } text-white font-medium rounded-lg transition-colors`}
            >
              Start Reflection
            </Button>
          </form>
        </Form>
        
        <div className="mt-4 text-center">
          <button 
            onClick={() => navigate('/')}
            className={`text-sm ${isDarkMode ? 'text-reflectbot-text hover:text-reflectbot-accent' : 'text-gray-600 hover:text-teal-600'} underline`}
          >
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingForm;
