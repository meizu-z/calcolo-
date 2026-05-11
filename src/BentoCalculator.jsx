'use client';

import React, { useState, useMemo } from 'react';
import InputSection from './components/InputSection.jsx';
import ResultsGrid from './components/ResultsGrid.jsx';

/**
 * BentoCalculator - Main Container Component
 * Two-row FDT-first dashboard for Calcolo Statistics
 * Row 1 (60%): Master Data Hub with FDT
 * Row 2 (40%): 4-column Statistical Insights
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
    <div className="w-full flex flex-col gap-8">
      {/* Header Section */}
      <div>
        <h1 className="text-5xl font-bold text-white mb-2 tracking-tight font-['Urbanist']">
          Calcolo Statistics
        </h1>
        <p className="text-slate-300 text-lg font-['Urbanist']">
          Descriptive Statistics Dashboard
        </p>
      </div>

      {/* Two-Row Grid Layout */}
      <div className="flex flex-col gap-6 h-screen">
        {/* Row 1: Master Data Hub (60% height) */}
        <div className="h-3/5 flex-shrink-0">
          {isDataValid ? (
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
          ) : (
            <div className="bg-[#CFDECA] rounded-2xl p-8 text-center h-full flex items-center justify-center">
              <div>
                <p className="text-black text-xl font-semibold mb-2 font-['Urbanist']">
                  Enter data to get started
                </p>
                <p className="text-black/70 text-sm font-['Urbanist']">
                  Choose "Raw Data" for comma-separated values or "Frequency Table" for grouped data
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Row 2: Statistical Insights (40% height, 4 columns) */}
        <div className="h-2/5 flex-shrink-0">
          {isDataValid ? (
            <ResultsGrid
              mode={mode}
              rawData={rawData}
              intervals={intervals}
              frequencies={frequencies}
            />
          ) : (
            <div className="grid grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((col) => (
                <div
                  key={col}
                  className="bg-[#EFF0A3] rounded-2xl p-6 flex items-center justify-center text-center"
                >
                  <p className="text-black/40 text-sm font-['Urbanist']">
                    {col === 1 ? 'Mean' : col === 2 ? 'Median' : col === 3 ? 'Mode' : 'SD'}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
