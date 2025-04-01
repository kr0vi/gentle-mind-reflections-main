import { ChatPreferences } from '@/context/ChatPreferencesContext';
import { GEMINI_API_KEY, GEMINI_API_URL, MAX_OUTPUT_TOKENS, USE_FALLBACK_RESPONSES } from './config';

interface Message {
  sender: 'ai' | 'user';
  text: string;
}

/**
 * Generate a system prompt based on user preferences
 */
export const generateSystemPrompt = (preferences: ChatPreferences, mood: string | null): string => {
  const { therapyStyle, topics, userName } = preferences;
  
  let systemPrompt = "You are ReflectBot, an AI mental health companion. ";
  
  // Add therapeutic style instruction
  if (therapyStyle === 'balanced') {
    systemPrompt += "Provide a balanced approach to mental health support, offering both emotional validation and practical advice. ";
  } else if (therapyStyle === 'empathetic') {
    systemPrompt += "Focus on providing empathetic emotional support, validation, and understanding. Show deep empathy and compassion. ";
  } else if (therapyStyle === 'solution-focused') {
    systemPrompt += "Focus on practical solutions and action-oriented guidance. Help identify concrete steps toward resolving issues. ";
  }
  
  // Add mood-specific guidance
  if (mood === 'happy') {
    systemPrompt += "The user is feeling happy. Help them savor this positive emotion and reflect on what contributed to it. ";
  } else if (mood === 'sad') {
    systemPrompt += "The user is feeling sad. Offer compassionate support and gentle exploration of these feelings. ";
  } else if (mood === 'stressed') {
    systemPrompt += "The user is feeling stressed. Help them identify sources of stress and practical coping strategies. ";
  } else if (mood === 'calm') {
    systemPrompt += "The user is feeling calm. Help them maintain and appreciate this peaceful state. ";
  } else if (mood === 'anxious') {
    systemPrompt += "The user is feeling anxious. Offer grounding techniques and help them examine their concerns. ";
  }
  
  // Add topic specialization if relevant topics are selected
  if (topics.length > 0) {
    systemPrompt += "Focus particularly on topics related to ";
    
    const topicNames = topics.map(topic => {
      if (topic === 'work-life-balance') return 'work-life balance';
      return topic;
    });
    
    if (topicNames.length === 1) {
      systemPrompt += topicNames[0] + ". ";
    } else {
      const lastTopic = topicNames.pop();
      systemPrompt += topicNames.join(', ') + ' and ' + lastTopic + ". ";
    }
  }
  
  // Add personalization instruction
  if (userName) {
    systemPrompt += `Address the user by their name, ${userName}. `;
  }
  
  // Add general guidelines
  systemPrompt += "Keep responses concise and conversational. Ask thoughtful follow-up questions. Never claim to diagnose or treat medical conditions. Suggest professional help when appropriate.";
  
  return systemPrompt;
};

/**
 * Get a response from the Gemini API
 */
export const getGeminiResponse = async (
  messages: Message[], 
  preferences: ChatPreferences,
  mood: string | null
): Promise<string> => {
  try {
    // Fall back to static responses if configured to do so
    if (USE_FALLBACK_RESPONSES) {
      console.warn('Using fallback responses (no API key provided).');
      return getFallbackResponse(messages, preferences, mood);
    }
    
    const systemPrompt = generateSystemPrompt(preferences, mood);
    
    // Format conversation history for Gemini API
    const formattedMessages = [
      { role: 'system', parts: [{ text: systemPrompt }] },
      ...messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }))
    ];
    
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: formattedMessages,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          }
        ]
      }),
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error('Unexpected API response format');
    }
  } catch (error) {
    console.error('Error getting Gemini response:', error);
    return 'I apologize, but I encountered an issue. Could you please try again?';
  }
};

/**
 * Get a fallback response when the API is not available
 */
const getFallbackResponse = (
  messages: Message[], 
  preferences: ChatPreferences, 
  mood: string | null
): string => {
  // Get the last user message
  const lastUserMessage = [...messages].reverse().find(msg => msg.sender === 'user')?.text || '';
  
  // Generate a personalized greeting if appropriate
  const personalizedGreeting = preferences.userName ? `${preferences.userName}, ` : '';
  
  // Simple fallback responses based on therapy style
  if (preferences.therapyStyle === 'empathetic') {
    return `${personalizedGreeting}I can see that's important to you. How does this situation make you feel?`;
  } else if (preferences.therapyStyle === 'solution-focused') {
    return `${personalizedGreeting}Let's think about steps you could take. What's one small action that might help with this situation?`;
  } else {
    // Balanced approach
    return `${personalizedGreeting}Thank you for sharing that. Can you tell me more about what you're experiencing?`;
  }
}; 