import React from 'react';
import { ArrowLeft } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface InfoPageProps {
  onClose: () => void;
}

export function InfoPage({ onClose }: InfoPageProps) {
  return (
    <div className="fixed inset-0 bg-gray-100 dark:bg-gray-900 z-50 overflow-y-auto">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-6 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Rankings
        </button>

        <div className="max-w-4xl mx-auto space-y-8 mb-16">
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">How Scores Are Computed</h1>
            
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Each company's score is calculated based on four key factors, each normalized to a 0-1 scale:
              </p>

              <ul className="list-disc pl-6 mb-8 text-gray-600 dark:text-gray-300">
                <li>Distance Score: Proximity to a central location</li>
                <li>CEI Score: Deviation from an ideal value (0)</li>
                <li>English Score: Proximity to target English-speaking ratio (0.566)</li>
                <li>Income Score: Proximity to target income ($125,371)</li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Distance Score</h2>
              <div className="mb-8">
                <p className="mb-4 text-gray-600 dark:text-gray-300">The Distance Score rewards companies that are closer to a central location:</p>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <BlockMath>
                    {`\\text{Average Distance}_i = \\frac{\\sum_{j=1}^n \\text{distance1.4}_j}{n}`}
                  </BlockMath>
                  <BlockMath>
                    {`\\text{distanceScore} = \\left(1 - \\frac{\\text{Average Distance}_i - \\text{minDistance}}{\\text{maxDistance} - \\text{minDistance}}\\right)`}
                  </BlockMath>
                </div>
              </div>

              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">CEI Score</h2>
              <div className="mb-8">
                <p className="mb-4 text-gray-600 dark:text-gray-300">The CEI Score measures deviation from the ideal value of 0:</p>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <BlockMath>
                    {`\\text{CEI Absolute Deviation}_i = |\\text{CEI}_i - 0|`}
                  </BlockMath>
                  <BlockMath>
                    {`\\text{ceiScore} = \\left(1 - \\frac{\\text{CEI Absolute Deviation}_i}{\\text{maxDeviation}}\\right)`}
                  </BlockMath>
                </div>
              </div>

              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">English Score</h2>
              <div className="mb-8">
                <p className="mb-4 text-gray-600 dark:text-gray-300">The English Score evaluates proximity to the target ratio of 0.566:</p>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <BlockMath>
                    {`\\text{English Ratio Deviation}_i = |\\text{English Ratio}_i - 0.566|`}
                  </BlockMath>
                  <BlockMath>
                    {`\\text{englishScore} = \\left(1 - \\frac{\\text{English Ratio Deviation}_i}{\\text{maxDeviation}}\\right)`}
                  </BlockMath>
                </div>
              </div>

              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Income Score</h2>
              <div className="mb-8">
                <p className="mb-4 text-gray-600 dark:text-gray-300">The Income Score measures proximity to the target income of $125,371:</p>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <BlockMath>
                    {`\\text{Income Deviation}_i = |\\text{Income}_i - 125,371|`}
                  </BlockMath>
                  <BlockMath>
                    {`\\text{mhiScore} = \\left(1 - \\frac{\\text{Income Deviation}_i}{\\text{maxDeviation}}\\right)`}
                  </BlockMath>
                </div>
              </div>

              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Overall Score</h2>
              <div>
                <p className="mb-4 text-gray-600 dark:text-gray-300">The overall score is calculated as a weighted average:</p>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <BlockMath>
                    {`\\text{Overall Score} = w_d \\cdot \\text{distanceScore} + w_c \\cdot \\text{ceiScore} + w_e \\cdot \\text{englishScore} + w_m \\cdot \\text{mhiScore}`}
                  </BlockMath>
                </div>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  Where <InlineMath>{`w_d + w_c + w_e + w_m = 1`}</InlineMath> and weights can be adjusted using the sliders.
                </p>
              </div>
            </div>
          </section>

          <footer className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
            <p>Developed by:</p>
            <div className="flex justify-center gap-4 mt-2">
              <a href="mailto:reben80@gmail.com" className="hover:text-blue-500 transition-colors">Rebin (reben80@gmail.com)</a>
              <span>&bull;</span>
              <a href="mailto:a.veremeychik@gmail.com" className="hover:text-blue-500 transition-colors">A. Veremeychik (a.veremeychik@gmail.com)</a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}