import React, { useState } from 'react';
import { validateSanskritText } from '../../utils/validation';

interface SanskritInputProps {
  onTextChange: (text: string) => void;
  onValidationError?: (error: string) => void;
}

export const SanskritInput: React.FC<SanskritInputProps> = ({
  onTextChange,
  onValidationError
}) => {
  const [text, setText] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    const valid = validateSanskritText(newText);
    
    setText(newText);
    setIsValid(valid);

    if (valid) {
      onTextChange(newText);
    } else {
      onValidationError?.('Please enter valid Devanagari text only');
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="ॐ शान्ताकारं..."
        className={`w-full h-32 px-3 py-2 bg-gray-900 rounded-lg
          font-sanskrit text-lg leading-relaxed
          border ${isValid ? 'border-gray-700' : 'border-red-500'}
          focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
          placeholder-gray-500`}
        style={{
          fontFamily: "'Noto Sans Devanagari', sans-serif",
          letterSpacing: '0.025em'
        }}
      />
      {!isValid && (
        <p className="mt-2 text-sm text-red-400">
          Please enter valid Devanagari text only
        </p>
      )}
    </div>
  );
};
