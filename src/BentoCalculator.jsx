'use client';

import React, { useState, useMemo } from 'react';
import InputSection from './components/InputSection.jsx';
import ResultsGrid from './components/ResultsGrid.jsx';

/**
 * BentoCalculator - Main Container Component
 * Manages state for raw data and frequency distribution table modes
 */
export default function BentoCalculator() {
  const [mode, setMode] = useState('raw'); // 'raw' or 'grouped'
  const [rawData, setRawData] = useState([]);
  const [intervals, setIntervals] = useState([]);
  const [frequencies, setFrequencies] = useState([]);

  const isDataValid =
    (mode === 'raw' && rawData.length > 0) ||
    (mode === 'grouped' && intervals.length > 0 && frequencies.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
            Bento Statistics
          </h1>
          <p className="text-slate-400 text-base md:text-lg">
            Descriptive Statistics with Physical Visualizations
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Section - Left Column */}
          <div className="lg:col-span-1">
            <InputSection
              mode={mode}
              setMode={setMode}
              rawData={rawData}
              setRawData={setRawData}
              intervals={intervals}
              setIntervals={setIntervals}
              frequencies={frequencies}
              setFrequencies={setFrequencies}
            />
          </div>

          {/* Results Section - Right Columns */}
          <div className="lg:col-span-2">
            {isDataValid ? (
              <ResultsGrid
                mode={mode}
                rawData={rawData}
                intervals={intervals}
                frequencies={frequencies}
              />
            ) : (
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12 text-center h-full flex items-center justify-center min-h-96">
                <div>
                  <p className="text-slate-400 text-lg mb-2">
                    Enter data to see statistics visualizations
                  </p>
                  <p className="text-slate-500 text-sm">
                    Choose {'"'}Raw Data{'"'} for comma-separated values or {'"'}Frequency Table{'"'} for grouped data
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
