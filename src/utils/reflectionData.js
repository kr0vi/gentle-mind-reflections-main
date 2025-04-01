export const moods = [
  { id: 'happy', label: 'Happy', emoji: '😊' },
  { id: 'calm', label: 'Calm', emoji: '😌' },
  { id: 'sad', label: 'Sad', emoji: '😢' },
  { id: 'anxious', label: 'Anxious', emoji: '😰' },
  { id: 'angry', label: 'Angry', emoji: '😠' },
  { id: 'neutral', label: 'Neutral', emoji: '😐' }
];

export const getMoodPrompt = (mood) => {
  const prompts = {
    happy: "I'm glad you're feeling happy! What's contributing to your positive mood today?",
    calm: "It's great that you're feeling calm. Would you like to explore what's helping you maintain this peaceful state?",
    sad: "I'm here to listen. Would you like to talk about what's making you feel sad?",
    anxious: "Anxiety can be challenging. Would you like to discuss what's causing these feelings?",
    angry: "It's okay to feel angry. Would you like to talk about what triggered these feelings?",
    neutral: "How are you experiencing this neutral state? Would you like to explore your current thoughts?"
  };
  return prompts[mood] || "How are you feeling today?";
}; 