import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CompanyCard } from './components/CompanyCard';
import { WeightControls } from './components/WeightControls';
import { InfoPage } from './components/InfoPage';
import { towingCompanies } from './data/companies';
import { getSortedCompanies } from './utils/sorting';
import { redistributeWeights } from './utils/weights';
import type { SortOption, ScoreWeights, LockedWeights, ScoreType } from './types';

const DEFAULT_WEIGHTS: ScoreWeights = {
  mhi: 0.25,
  distance: 0.25,
  cei: 0.25,
  english: 0.25
};

const DEFAULT_LOCKS: LockedWeights = {
  mhi: false,
  distance: false,
  cei: false,
  english: false
};

function App() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  
  const [sortBy, setSortBy] = useState<SortOption>('average');
  const [weights, setWeights] = useState<ScoreWeights>(DEFAULT_WEIGHTS);
  const [lockedWeights, setLockedWeights] = useState<LockedWeights>(DEFAULT_LOCKS);
  const [showInfo, setShowInfo] = useState(false);
  const [scoreType, setScoreType] = useState<ScoreType>('general');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const updateWeight = (key: keyof ScoreWeights, value: number) => {
    const newWeights = redistributeWeights(weights, lockedWeights, key, value);
    setWeights(newWeights);
  };

  const toggleLock = (key: keyof LockedWeights) => {
    setLockedWeights(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const resetWeights = () => {
    setWeights(DEFAULT_WEIGHTS);
    setLockedWeights(DEFAULT_LOCKS);
  };

  if (showInfo) {
    return <InfoPage onClose={() => setShowInfo(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <Header 
        sortBy={sortBy} 
        onSortChange={setSortBy}
        isDark={isDark}
        onThemeToggle={() => setIsDark(!isDark)}
        onInfoClick={() => setShowInfo(true)}
        scoreType={scoreType}
        onScoreTypeChange={setScoreType}
      />

      <main className="container mx-auto px-4 py-8">
        <WeightControls
          weights={weights}
          lockedWeights={lockedWeights}
          onWeightChange={updateWeight}
          onLockToggle={toggleLock}
          onReset={resetWeights}
          scoreType={scoreType}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getSortedCompanies(towingCompanies, sortBy, weights, scoreType).map((company, index) => (
            <CompanyCard
              key={company.tradeName}
              company={company}
              rank={index + 1}
              weights={weights}
              scoreType={scoreType}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;