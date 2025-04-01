/**
 * Simplified Gemini API service
 * This handles communication with the Gemini API or provides fallback responses
 */

// Check if API key is available
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const USE_FALLBACK = !API_KEY;

/**
 * Generate a system prompt based on user preferences
 */
export const generateSystemPrompt = (preferences, mood) => {
  const { therapyStyle, topics, userName } = preferences;
  
  let prompt = "You are ReflectBot, an AI mental health companion. ";
  
  // Add style instructions
  if (therapyStyle === 'empathetic') {
    prompt += "Focus on providing empathetic emotional support. ";
  } else if (therapyStyle === 'solution-focused') {
    prompt += "Focus on practical solutions and action steps. ";
  } else {
    prompt += "Provide a balanced approach to mental health support. ";
  }
  
  // Add personalization if name is available
  if (userName) {
    prompt += `Address the user by their name, ${userName}. `;
  }
  
  return prompt;
};

/**
 * Get a response from the Gemini API or fallback to canned responses
 */
export const getGeminiResponse = async (messages, preferences, mood) => {
  try {
    // Use fallbacks if no API key
    if (USE_FALLBACK) {
      return getFallbackResponse(preferences, mood);
    }
    
    const systemPrompt = generateSystemPrompt(preferences, mood);
    
    // Format conversation for Gemini API
    const formattedMessages = [
      { role: 'system', parts: [{ text: systemPrompt }] },
      ...messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }))
    ];
    
    // Call the API
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: formattedMessages,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
        }
      }),
    });
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
    
  } catch (error) {
    console.error('Error getting AI response:', error);
    return getFallbackResponse(preferences, mood);
  }
};

/**
 * Provide fallback responses when the API is not available
 */
const getFallbackResponse = (preferences, mood) => {
  const { therapyStyle, userName } = preferences;
  const greeting = userName ? `${userName}, ` : '';
  
  // Simple responses based on therapy style
  const responses = {
    empathetic: [
      `${greeting}I can see this is important to you. How does this make you feel?`,
      `${greeting}That sounds difficult. What emotions come up for you when you think about this?`,
      `${greeting}I'm here to listen. Tell me more about what you're experiencing.`
    ],
    'solution-focused': [
      `${greeting}Let's think about some possible steps forward. What's one small action you could take?`,
      `${greeting}What solutions have you tried before? We could explore some new approaches.`,
      `${greeting}I'm wondering what a good outcome would look like for you in this situation.`
    ],
    balanced: [
      `${greeting}Thank you for sharing that. Can you tell me more about what you're experiencing?`,
      `${greeting}I'm interested in understanding both how you feel and what you might do next.`,
      `${greeting}That's insightful. How has this been affecting your day-to-day life?`
    ]
  };
  
  // Select the appropriate response set or default to balanced
  const styleResponses = responses[therapyStyle] || responses.balanced;
  
  // Return a random response from the selected set
  return styleResponses[Math.floor(Math.random() * styleResponses.length)];
}; 