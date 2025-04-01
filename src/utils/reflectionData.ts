
// Define moods with emojis and labels
export const moods = [
  { id: 'happy', label: 'Happy', emoji: '😊' },
  { id: 'sad', label: 'Sad', emoji: '😔' },
  { id: 'stressed', label: 'Stressed', emoji: '😰' },
  { id: 'calm', label: 'Calm', emoji: '😌' },
  { id: 'anxious', label: 'Anxious', emoji: '😟' },
];

// Initial prompts based on mood
export const initialPromptsByMood = {
  happy: [
    "What's making you feel happy today?",
    "What's a positive moment you experienced recently?",
    "Which accomplishment are you most proud of this week?",
    "What's something you're looking forward to?",
    "Who has brought joy to your life recently?",
  ],
  sad: [
    "I notice you're feeling down. What's on your mind?",
    "What's weighing on your heart today?",
    "When did you start feeling this way?",
    "Is there something specific triggering these feelings?",
    "What typically helps when you're feeling sad?",
  ],
  stressed: [
    "What's causing you stress right now?",
    "On a scale of 1-10, how would you rate your stress level?",
    "What's one thing you could do to reduce your stress today?",
    "How is stress showing up in your body right now?",
    "What boundaries might you need to set to manage this stress?",
  ],
  calm: [
    "What helped you achieve this sense of calm?",
    "How can you bring more of this peaceful feeling into your daily life?",
    "What practices help you maintain this balanced state?",
    "When do you typically feel most at peace?",
    "How does being calm affect your relationships and decisions?",
  ],
  anxious: [
    "What's triggering your anxiety right now?",
    "What thoughts are running through your mind?",
    "How is anxiety showing up in your body?",
    "What has helped you manage anxiety in the past?",
    "Is there a specific worry that stands out the most?",
  ],
};

// Follow-up responses based on mood
export const followUpResponsesByMood = {
  happy: [
    "That sounds wonderful! What made this moment special for you?",
    "It's great that you're feeling positive. How can you carry this energy forward?",
    "Happiness often comes from within. What personal values does this reflect?",
    "That's something to celebrate! How might you savor this feeling?",
    "Joy is so important. How does this happiness connect to your broader life goals?",
  ],
  sad: [
    "I'm sorry you're feeling this way. What would comfort you right now?",
    "That sounds difficult. How have you coped with similar feelings before?",
    "Sometimes sadness has important messages. What might this feeling be telling you?",
    "It takes courage to acknowledge sadness. What support do you need?",
    "Would it help to explore what triggered these feelings?",
  ],
  stressed: [
    "That's a lot to handle. What's one small step you could take right now?",
    "Stress can be overwhelming. What boundaries might you need to set?",
    "I hear that you're under pressure. How are you taking care of yourself?",
    "Sometimes stress points to our values. What matters most in this situation?",
    "What would help make this situation more manageable?",
  ],
  calm: [
    "This balanced state is valuable. What practices help maintain it?",
    "Calmness creates space for clarity. What insights are emerging?",
    "How might you bring this peaceful energy to challenging situations?",
    "What does this calm state tell you about your needs?",
    "Mindfulness helps nurture calm. What are you noticing in this moment?",
  ],
  anxious: [
    "Anxiety can be really uncomfortable. What grounding technique might help right now?",
    "Sometimes our minds create worst-case scenarios. How realistic are these worries?",
    "That sounds challenging. What's one thing within your control?",
    "Anxiety often focuses on the future. What would help you be present?",
    "What would you say to a friend feeling this way?",
  ],
};

// Closing reflections based on mood
export const closingReflectionsByMood = {
  happy: [
    "It's been wonderful reflecting on these positive experiences with you. Remember this feeling of joy and the insights you've gained.",
    "Thank you for sharing these uplifting thoughts. Consider how you might intentionally create more moments like these.",
    "I've appreciated exploring your happiness with you. These positive reflections can be anchors during challenging times.",
    "What a positive session! Remember that acknowledging joy is as important as working through difficulties.",
    "Thank you for this uplifting conversation. Your capacity for joy is a strength worth celebrating.",
  ],
  sad: [
    "Thank you for sharing these difficult feelings. Remember that sadness, like all emotions, provides valuable insights and eventually passes.",
    "I've appreciated your openness during this challenging time. Consider what gentle self-care might help in the coming hours.",
    "These reflections on sadness show courage and self-awareness. Be patient with yourself as you process these feelings.",
    "Thank you for trusting this space with your sadness. Consider reaching out to someone who makes you feel safe and understood.",
    "I hope this reflection has helped lighten the burden slightly. Remember that seeking support is a sign of strength, not weakness.",
  ],
  stressed: [
    "Thank you for exploring these stressors. Remember that small steps toward self-care can make a significant difference.",
    "I hope naming these pressures has created some space. Consider what boundaries might help protect your energy.",
    "Thank you for this thoughtful reflection on your stress. Remember that you don't have to carry everything at once.",
    "I've appreciated your insights into these challenges. Consider scheduling specific time to address concerns rather than carrying them continuously.",
    "Thank you for sharing these pressures. Remember that managing stress is a practice, not a perfection.",
  ],
  calm: [
    "It's been wonderful to explore this peaceful state with you. Consider how you might intentionally create more moments of calm.",
    "Thank you for sharing these reflections on tranquility. This awareness of what brings you peace is valuable.",
    "I've appreciated exploring the elements that contribute to your sense of calm. May you carry this awareness forward.",
    "What a centering conversation. Remember that you can return to these practices whenever you need to restore balance.",
    "Thank you for sharing your experience of calmness. This self-awareness is a powerful resource for your wellbeing.",
  ],
  anxious: [
    "Thank you for exploring these anxious feelings. Remember that naming and understanding anxiety is often the first step in managing it.",
    "I hope this reflection has created some space around these worries. Consider what small action might help you feel more grounded.",
    "Thank you for sharing these challenging thoughts. Remember that anxiety often magnifies threats while minimizing our ability to cope.",
    "I've appreciated your openness about these concerns. Consider what has helped you navigate similar feelings in the past.",
    "Thank you for this thoughtful exploration. Remember that managing anxiety is a practice - be patient with yourself in the process.",
  ],
};

// Sample questions and responses for the ReflectBot
// In a real implementation, these would be replaced with AI-generated responses

// Initial prompts to start a reflection - used when no mood is selected
export const initialPrompts = [
  "What's on your mind today?",
  "How are you feeling right now?",
  "What's one thing you're proud of this week?",
  "What's something that challenged you recently?",
  "What's a small moment that brought you joy today?"
];

// Follow-up responses based on user input - used when no mood is selected
export const followUpResponses = [
  "That's interesting. Could you tell me more about why you feel that way?",
  "It sounds like this matters to you. What aspects of it resonated most?",
  "I appreciate you sharing that. How did that experience affect you?",
  "That's a thoughtful reflection. What did you learn from this situation?",
  "I see. How might this insight help you moving forward?",
  "Thank you for opening up. What emotions come up when you think about this?",
  "That's meaningful. How does this connect to your values or goals?",
  "I'm curious - what would you do differently if faced with this again?",
  "That sounds challenging. What helped you get through it?",
  "I hear you. What support do you need right now with this?"
];

// Closing reflections to end a session - used when no mood is selected
export const closingReflections = [
  "Thank you for reflecting with me today. I hope these insights serve you well.",
  "This has been a meaningful conversation. I hope you gained some clarity.",
  "Thank you for your openness. Remember to be kind to yourself as you process these thoughts.",
  "I've appreciated our reflection together. Consider revisiting these insights later.",
  "You've done some valuable reflection today. I hope it helps you moving forward."
];

// Get a random item from an array
export const getRandomItem = <T>(items: T[]): T => {
  return items[Math.floor(Math.random() * items.length)];
};

// Get a mood-specific random initial prompt
export const getMoodPrompt = (mood: string | null): string => {
  if (!mood || !initialPromptsByMood[mood as keyof typeof initialPromptsByMood]) {
    return getRandomItem(initialPrompts);
  }
  
  return getRandomItem(initialPromptsByMood[mood as keyof typeof initialPromptsByMood]);
};

// Get a mood-specific follow-up response
export const getMoodFollowUp = (mood: string | null): string => {
  if (!mood || !followUpResponsesByMood[mood as keyof typeof followUpResponsesByMood]) {
    return getRandomItem(followUpResponses);
  }
  
  return getRandomItem(followUpResponsesByMood[mood as keyof typeof followUpResponsesByMood]);
};

// Get a mood-specific closing reflection
export const getMoodClosing = (mood: string | null): string => {
  if (!mood || !closingReflectionsByMood[mood as keyof typeof closingReflectionsByMood]) {
    return getRandomItem(closingReflections);
  }
  
  return getRandomItem(closingReflectionsByMood[mood as keyof typeof closingReflectionsByMood]);
};
