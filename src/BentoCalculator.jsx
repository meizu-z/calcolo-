'use client';

import React, { useState, useMemo } from 'react';
import InputSection from './components/InputSection.jsx';
import ResultsGrid from './components/ResultsGrid.jsx';

/**
 * BentoCalculator - Main Container Component
 * Landscape-oriented dashboard for Calcolo Statistics
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
    <div className="w-full">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-5xl font-bold text-white mb-2 tracking-tight font-['Urbanist']">
          Calcolo Statistics
        </h1>
        <p className="text-slate-300 text-lg font-['Urbanist']">
          Descriptive Statistics Dashboard
        </p>
      </div>

      {/* Landscape Grid Layout */}
      <div className="flex gap-8 w-full">
        {/* Input Section - Far Left */}
        <div className="w-1/4 flex-shrink-0">
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

        {/* Results Section - Right (2x2 or 3x2 grid) */}
        <div className="flex-1">
          {isDataValid ? (
            <ResultsGrid
              mode={mode}
              rawData={rawData}
              intervals={intervals}
              frequencies={frequencies}
            />
          ) : (
            <div className="bg-[#D8DFE9] rounded-2xl p-12 text-center h-full flex items-center justify-center min-h-96">
              <div>
                <p className="text-black text-lg font-semibold mb-2 font-['Urbanist']">
                  Enter data to see statistics
                </p>
                <p className="text-black/70 text-sm font-['Urbanist']">
                  Choose "Raw Data" for comma-separated values or "Frequency Table" for grouped data
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
