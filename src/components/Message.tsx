
import React from 'react';

interface MessageProps {
  text: string;
  sender: 'ai' | 'user';
  isLatest: boolean;
  mood?: string | null;
}

const Message: React.FC<MessageProps> = ({ text, sender, isLatest, mood }) => {
  // Get emoji based on mood for AI messages
  const getMoodEmoji = (mood: string | null) => {
    switch (mood) {
      case 'happy': return '😊 ';
      case 'sad': return '😔 ';
      case 'stressed': return '😰 ';
      case 'calm': return '😌 ';
      case 'anxious': return '😟 ';
      default: return '';
    }
  };

  return (
    <div 
      className={`mb-4 ${sender === 'ai' ? '' : 'self-end'}`}
    >
      <div 
        className={`
          ${sender === 'ai' ? 'chat-bubble-ai' : 'chat-bubble-user'}
          ${!isLatest ? 'opacity-90' : ''}
        `}
      >
        {sender === 'ai' && mood ? getMoodEmoji(mood) : ''}
        {text}
      </div>
    </div>
  );
};

export default Message;
