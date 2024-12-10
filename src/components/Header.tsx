import React from 'react';
import { Truck, ArrowUpDown, Info } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { SortOption, ScoreType } from '../types';

interface HeaderProps {
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
  isDark: boolean;
  onThemeToggle: () => void;
  onInfoClick: () => void;
  scoreType: ScoreType;
  onScoreTypeChange: (type: ScoreType) => void;
}

export function Header({ 
  sortBy, 
  onSortChange, 
  isDark, 
  onThemeToggle, 
  onInfoClick,
  scoreType,
  onScoreTypeChange
}: HeaderProps) {
  return (
    <header className="bg-blue-600 dark:bg-blue-900 text-white py-6 shadow-lg transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Truck className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Montgomery County Towing Rankings</h1>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <button
                onClick={() => onScoreTypeChange('general')}
                className={`px-3 py-1 rounded-l-md transition-colors ${
                  scoreType === 'general'
                    ? 'bg-white text-blue-600'
                    : 'bg-blue-700 hover:bg-blue-800'
                }`}
              >
                General
              </button>
              <button
                onClick={() => onScoreTypeChange('nop')}
                className={`px-3 py-1 rounded-r-md transition-colors ${
                  scoreType === 'nop'
                    ? 'bg-white text-blue-600'
                    : 'bg-blue-700 hover:bg-blue-800'
                }`}
              >
                NOP
              </button>
            </div>
            <button
              onClick={onInfoClick}
              className="flex items-center gap-2 text-white hover:text-blue-200 transition-colors"
              aria-label="View scoring information"
            >
              <Info className="w-5 h-5" />
              <span className="hidden sm:inline">About Scoring</span>
            </button>
            <div className="flex items-center gap-2">
              <span className="text-sm">Sort by:</span>
              <select
                className="bg-blue-700 dark:bg-blue-800 text-white px-3 py-1 rounded-md border border-blue-400 dark:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 hover:bg-blue-600 dark:hover:bg-blue-700"
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as SortOption)}
              >
                <option value="average">Weighted Score</option>
                <option value="mhi">MHI Score</option>
                <option value="distance">Distance Score</option>
                {scoreType === 'general' && <option value="cei">CEI Score</option>}
                <option value="english">English Score</option>
              </select>
              <ArrowUpDown className="w-5 h-5" />
            </div>
            <ThemeToggle isDark={isDark} onToggle={onThemeToggle} />
          </div>
        </div>
      </div>
    </header>
  );
}