export type SortOption = 'average' | 'mhi' | 'distance' | 'cei' | 'english';
export type ScoreType = 'general' | 'nop';

interface BaseScores {
  mhiScore: number;
  distanceScore: number;
  ceiScore: number;
  englishScore: number;
}

export type CompanyScores = BaseScores;
export type NOPScores = BaseScores;

export interface CompanyData {
  tradeName: string;
  general: CompanyScores;
  nop: NOPScores;
}

export interface ScoreWeights {
  mhi: number;
  distance: number;
  cei: number;
  english: number;
}

export interface LockedWeights {
  mhi: boolean;
  distance: boolean;
  cei: boolean;
  english: boolean;
}

export interface Theme {
  isDark: boolean;
}