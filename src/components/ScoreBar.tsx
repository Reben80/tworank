import React from 'react';

interface ScoreBarProps {
  score: number;
  label: string;
  showExplanation?: boolean;
  type?: 'mhi' | 'distance' | 'cei';
  size?: 'normal' | 'large';
}

export function ScoreBar({ 
  score, 
  label, 
  size = 'normal' 
}: ScoreBarProps) {
  const percentage = score * 100;
  const isLarge = size === 'large';
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className={`text-gray-600 dark:text-gray-300 flex items-center ${isLarge ? 'text-base font-medium' : ''}`}>
          {label}
        </span>
        <span className={`font-medium text-gray-800 dark:text-gray-200 ${isLarge ? 'text-lg' : ''}`}>
          {percentage.toFixed(1)}%
        </span>
      </div>
      <div className={`bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${isLarge ? 'h-3' : 'h-2'}`}>
        <div 
          className={`h-full transition-all duration-300 rounded-full ${
            score >= 0.7 ? 'bg-green-500' :
            score >= 0.4 ? 'bg-yellow-500' :
            'bg-red-500'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}