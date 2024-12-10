import React from 'react';
import { HelpCircle } from 'lucide-react';

interface ScoreExplanationProps {
  type: 'mhi' | 'distance' | 'cei';
}

export function ScoreExplanation({ type }: ScoreExplanationProps) {
  const getExplanation = () => {
    switch (type) {
      case 'mhi':
        return "Median Household Income (MHI) Score: Represents the company's performance in serving areas across different income levels";
      case 'distance':
        return "Distance Score: Measures the company's proximity and response time to service areas";
      case 'cei':
        return "Customer Experience Index (CEI) Score: Measures customer satisfaction and service quality";
      default:
        return "";
    }
  };

  return (
    <div className="group relative inline-block">
      <HelpCircle className="w-4 h-4 text-gray-400 inline-block ml-1 cursor-help" />
      <div className="invisible group-hover:visible absolute z-10 w-64 p-2 mt-2 text-sm text-white bg-gray-800 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {getExplanation()}
      </div>
    </div>
  );
}