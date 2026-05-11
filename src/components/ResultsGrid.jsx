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
    <div className="grid grid-cols-4 gap-6 h-full">
      {/* Col 1: Mean - Fulcrum Balance - Alice Blue */}
      <div className="tile-alice rounded-2xl p-6 flex flex-col">
        <div className="mb-4">
          <p className="text-black text-xs font-semibold uppercase tracking-wider font-['Urbanist']">
            Mean
          </p>
          <p className="text-3xl font-bold text-black mt-2 font-['Urbanist']">{stats.mean.toFixed(2)}</p>
        </div>
        <div className="flex-1 flex items-center justify-center min-h-[120px]">
          <FulcrumBalance value={stats.mean} min={minValue} max={maxValue} />
        </div>
      </div>

      {/* Col 2: Median - Sorting Row - Vanilla Yellow */}
      <div className="tile-vanilla rounded-2xl p-6 flex flex-col">
        <div className="mb-4">
          <p className="text-black text-xs font-semibold uppercase tracking-wider font-['Urbanist']">
            Median
          </p>
          <p className="text-3xl font-bold text-black mt-2 font-['Urbanist']">
            {stats.median.toFixed(2)}
          </p>
        </div>
        <div className="flex-1 flex items-center justify-center min-h-[120px]">
          <SortingRow value={stats.median} sorted={stats.sorted || []} />
        </div>
      </div>

      {/* Col 3: Mode - Frequency Display - Alice Blue */}
      <div className="tile-alice rounded-2xl p-6 flex flex-col">
        <div className="mb-4">
          <p className="text-black text-xs font-semibold uppercase tracking-wider font-['Urbanist']">
            Mode
          </p>
          <p className="text-3xl font-bold text-black mt-2 font-['Urbanist']">
            {stats.mode !== null ? stats.mode : 'N/A'}
          </p>
        </div>
        <div className="flex-1 flex items-center justify-center min-h-[120px]">
          <ModeDisplay value={stats.mode} frequency={stats.frequency} mode={mode} />
        </div>
      </div>

      {/* Col 4: Standard Deviation - Glow Effect - Vanilla Yellow */}
      <div className="tile-vanilla rounded-2xl p-6 flex flex-col">
        <div className="mb-4">
          <p className="text-black text-xs font-semibold uppercase tracking-wider font-['Urbanist']">
            Std Dev
          </p>
          <p className="text-3xl font-bold text-black mt-2 font-['Urbanist']">{stats.sd.toFixed(2)}</p>
        </div>
        <div className="flex-1 flex items-center justify-center min-h-[120px]">
          <GlowEffect value={stats.sd} />
        </div>
      </div>
    </div>
  );
}
