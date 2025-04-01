
import React, { useState } from 'react';

interface UserInputProps {
  onSubmit: (text: string) => void;
  disabled: boolean;
}

const UserInput: React.FC<UserInputProps> = ({ onSubmit, disabled }) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSubmit(inputText);
      setInputText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mt-4">
      <div className="flex flex-col gap-3">
        <textarea
          className="input-field min-h-24 resize-none"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your reflection here..."
          disabled={disabled}
          rows={3}
        />
        <div className="flex justify-end gap-2">
          <button
            type="submit"
            className="reflection-button"
            disabled={disabled || !inputText.trim()}
          >
            Respond
          </button>
        </div>
      </div>
    </form>
  );
};

export default UserInput;
