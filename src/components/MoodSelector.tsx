
import React from 'react';
import { Button } from '@/components/ui/button';
import { moods } from '@/utils/reflectionData';

interface MoodSelectorProps {
  onMoodSelect: (mood: string) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ onMoodSelect }) => {
  return (
    <div className="space-y-4 text-center">
      <h2 className="text-xl font-medium text-reflectbot-accent mb-2">
        How are you feeling today?
      </h2>
      <p className="text-reflectbot-text opacity-80 mb-6">
        Select your current mood to start your reflection journey
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {moods.map((mood) => (
          <Button
            key={mood.id}
            onClick={() => onMoodSelect(mood.id)}
            className="mood-button bg-reflectbot-ai-bubble hover:bg-reflectbot-accent hover:text-white transition-all duration-300 p-4 h-auto"
          >
            <div className="flex flex-col items-center space-y-2">
              <span className="text-xl">{mood.emoji}</span>
              <span>{mood.label}</span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
