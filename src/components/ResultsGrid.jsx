'use client';

import React, { useMemo } from 'react';
import { calculateRawStats, calculateGroupedStats } from '../statistics.js';
import FulcrumBalance from './visualizations/FulcrumBalance.jsx';
import GlowEffect from './visualizations/GlowEffect.jsx';
import SortingRow from './visualizations/SortingRow.jsx';
import ModeDisplay from './visualizations/ModeDisplay.jsx';

/**
 * ResultsGrid - Displays all four statistics with their visualizations
 * 2x2 landscape grid layout
 */
export default function ResultsGrid({ mode, rawData, intervals, frequencies }) {
  const stats = useMemo(() => {
    if (mode === 'raw') {
      return calculateRawStats(rawData);
    } else {
      return calculateGroupedStats(intervals, frequencies);
    }
  }, [mode, rawData, intervals, frequencies]);

  const minValue =
    mode === 'raw'
      ? Math.min(...rawData)
      : Math.min(...intervals.map((i) => i[0]));
  const maxValue =
    mode === 'raw'
      ? Math.max(...rawData)
      : Math.max(...intervals.map((i) => i[1]));

  return (
    <div className="grid grid-cols-2 gap-6 h-full">
      {/* Mean: Fulcrum Balance - Alice Blue */}
      <div className="tile-alice rounded-2xl p-8 flex flex-col">
        <div className="mb-6">
          <p className="text-black text-sm font-semibold uppercase tracking-wider font-['Urbanist']">
            Mean (Average)
          </p>
          <p className="text-4xl font-bold text-black mt-2 font-['Urbanist']">{stats.mean.toFixed(2)}</p>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <FulcrumBalance value={stats.mean} min={minValue} max={maxValue} />
        </div>
      </div>

      {/* Mode: Frequency Display - Alice Blue */}
      <div className="tile-alice rounded-2xl p-8 flex flex-col">
        <div className="mb-6">
          <p className="text-black text-sm font-semibold uppercase tracking-wider font-['Urbanist']">
            Mode (Most Frequent)
          </p>
          <p className="text-4xl font-bold text-black mt-2 font-['Urbanist']">
            {stats.mode !== null ? stats.mode : 'N/A'}
          </p>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <ModeDisplay value={stats.mode} frequency={stats.frequency} mode={mode} />
        </div>
      </div>

      {/* Median: Sorting Row - Vanilla Yellow */}
      <div className="tile-vanilla rounded-2xl p-8 flex flex-col">
        <div className="mb-6">
          <p className="text-black text-sm font-semibold uppercase tracking-wider font-['Urbanist']">
            Median (Middle Value)
          </p>
          <p className="text-4xl font-bold text-black mt-2 font-['Urbanist']">
            {stats.median.toFixed(2)}
          </p>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <SortingRow value={stats.median} sorted={stats.sorted || []} />
        </div>
      </div>

      {/* Standard Deviation: Glow Effect - Vanilla Yellow */}
      <div className="tile-vanilla rounded-2xl p-8 flex flex-col">
        <div className="mb-6">
          <p className="text-black text-sm font-semibold uppercase tracking-wider font-['Urbanist']">
            Standard Deviation
          </p>
          <p className="text-4xl font-bold text-black mt-2 font-['Urbanist']">{stats.sd.toFixed(2)}</p>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <GlowEffect value={stats.sd} />
        </div>
      </div>
    </div>
  );
}
