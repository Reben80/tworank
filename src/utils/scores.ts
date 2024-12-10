import { ScoreWeights, CompanyScores, NOPScores, ScoreType } from '../types';

export function getScoreColor(score: number): string {
  if (score >= 0.7) return 'text-green-600';
  if (score >= 0.4) return 'text-yellow-600';
  return 'text-red-600';
}

export function formatScore(score: number): string {
  return (score * 100).toFixed(1) + '%';
}

export function calculateWeightedScore(
  scores: CompanyScores | NOPScores,
  weights: ScoreWeights,
  scoreType: ScoreType
): number {
  // Calculate total weight
  const totalWeight = weights.mhi + weights.distance + weights.english + weights.cei;
  
  if (totalWeight === 0) return 0;

  // Calculate weighted sum directly (higher scores are better)
  const weightedSum = 
    scores.mhiScore * weights.mhi +
    scores.distanceScore * weights.distance +
    scores.ceiScore * weights.cei +
    scores.englishScore * weights.english;
  
  // Return weighted average
  return weightedSum / totalWeight;
}