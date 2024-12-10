import { CompanyData, SortOption, ScoreWeights, ScoreType } from '../types';
import { calculateWeightedScore } from './scores';

export function getSortedCompanies(
  companies: CompanyData[],
  sortBy: SortOption,
  weights: ScoreWeights,
  scoreType: ScoreType
): CompanyData[] {
  return [...companies].sort((a, b) => {
    const aScores = a[scoreType];
    const bScores = b[scoreType];

    switch (sortBy) {
      case 'mhi':
        return bScores.mhiScore - aScores.mhiScore;
      case 'distance':
        return bScores.distanceScore - aScores.distanceScore;
      case 'cei':
        if (scoreType === 'general') {
          return bScores.ceiScore - aScores.ceiScore;
        }
        return 0;
      case 'english':
        return bScores.englishScore - aScores.englishScore;
      default:
        const scoreA = calculateWeightedScore(aScores, weights, scoreType);
        const scoreB = calculateWeightedScore(bScores, weights, scoreType);
        return scoreB - scoreA;
    }
  });
}