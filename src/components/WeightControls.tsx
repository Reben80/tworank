import React from 'react';
import { RotateCcw } from 'lucide-react';
import { WeightSlider } from './WeightSlider';
import type { ScoreWeights, LockedWeights, ScoreType } from '../types';

interface WeightControlsProps {
  weights: ScoreWeights;
  lockedWeights: LockedWeights;
  onWeightChange: (key: keyof ScoreWeights, value: number) => void;
  onLockToggle: (key: keyof LockedWeights) => void;
  onReset: () => void;
  scoreType: ScoreType;
}

export function WeightControls({ 
  weights, 
  lockedWeights, 
  onWeightChange, 
  onLockToggle,
  onReset,
  scoreType
}: WeightControlsProps) {
  const getMaxAllowed = (key: keyof ScoreWeights) => {
    const lockedTotal = Object.entries(weights).reduce((sum, [k, value]) => {
      if (k === key || !lockedWeights[k as keyof LockedWeights]) return sum;
      return sum + value;
    }, 0);
    return 1 - lockedTotal;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold dark:text-white">Adjust Score Weights</h2>
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors duration-200"
        >
          <RotateCcw className="w-4 h-4" />
          Reset to Default
        </button>
      </div>
      <div className="grid gap-6 md:grid-cols-4">
        <WeightSlider
          label="MHI Score Weight"
          value={weights.mhi}
          onChange={(value) => onWeightChange('mhi', value)}
          isLocked={lockedWeights.mhi}
          onLockToggle={() => onLockToggle('mhi')}
          maxAllowed={getMaxAllowed('mhi')}
        />
        <WeightSlider
          label="Distance Score Weight"
          value={weights.distance}
          onChange={(value) => onWeightChange('distance', value)}
          isLocked={lockedWeights.distance}
          onLockToggle={() => onLockToggle('distance')}
          maxAllowed={getMaxAllowed('distance')}
        />
        <WeightSlider
          label="CEI Score Weight"
          value={weights.cei}
          onChange={(value) => onWeightChange('cei', value)}
          isLocked={lockedWeights.cei}
          onLockToggle={() => onLockToggle('cei')}
          maxAllowed={getMaxAllowed('cei')}
        />
        <WeightSlider
          label="English Score Weight"
          value={weights.english}
          onChange={(value) => onWeightChange('english', value)}
          isLocked={lockedWeights.english}
          onLockToggle={() => onLockToggle('english')}
          maxAllowed={getMaxAllowed('english')}
        />
      </div>
    </div>
  );
}