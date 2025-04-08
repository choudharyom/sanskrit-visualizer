import React from 'react';

interface LoadingIndicatorProps {
  message?: string;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ 
  message = 'Loading...' 
}) => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="animate-spin h-5 w-5 border-2 border-indigo-500 rounded-full border-t-transparent" />
      <span className="text-gray-400">{message}</span>
    </div>
  );
};
