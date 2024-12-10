import React from 'react';
import type { CompanyData, ScoreWeights, ScoreType } from '../types';
import { calculateWeightedScore } from '../utils/scores';
import { ScoreBar } from './ScoreBar';

interface CompanyCardProps {
  company: CompanyData;
  rank: number;
  weights: ScoreWeights;
  scoreType: ScoreType;
}

export function CompanyCard({ company, rank, weights, scoreType }: CompanyCardProps) {
  const scores = company[scoreType];
  const weightedScore = calculateWeightedScore(scores, weights, scoreType);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:transform hover:scale-[1.02]">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">{company.tradeName}</h3>
        <span className="text-lg font-semibold text-gray-600 dark:text-gray-300">#{rank}</span>
      </div>

      <div className="mb-6">
        <ScoreBar 
          score={weightedScore}
          label="Overall Score"
          size="large"
        />
      </div>
      
      <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Individual Scores</h4>
        <ScoreBar score={scores.mhiScore} label="MHI Score" />
        <ScoreBar score={scores.distanceScore} label="Distance Score" />
        <ScoreBar score={scores.ceiScore} label="CEI Score" />
        <ScoreBar score={scores.englishScore} label="English Score" />
      </div>
    </div>
  );
}