import React from 'react';
import { Lock, Unlock } from 'lucide-react';

interface WeightSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  isLocked?: boolean;
  onLockToggle?: () => void;
  maxAllowed?: number;
}

export function WeightSlider({ 
  label, 
  value, 
  onChange,
  isLocked = false,
  onLockToggle,
  maxAllowed = 1
}: WeightSliderProps) {
  const handleChange = (newValue: number) => {
    const clampedValue = Math.min(maxAllowed, Math.max(0, newValue));
    onChange(clampedValue);
  };

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-600 dark:text-gray-300">{label}</label>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">{(value * 100).toFixed()}%</span>
          {onLockToggle && (
            <button
              onClick={onLockToggle}
              className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                isLocked ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'
              }`}
              aria-label={isLocked ? 'Unlock weight' : 'Lock weight'}
            >
              {isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>
      <input
        type="range"
        min="0"
        max={maxAllowed * 100}
        value={value * 100}
        onChange={(e) => handleChange(Number(e.target.value) / 100)}
        className={`w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600 ${
          isLocked ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={isLocked}
      />
    </div>
  );
}