'use client';

import React, { useMemo } from 'react';
import { calculateRawStats, calculateGroupedStats } from '../statistics';
import FulcrumBalance from './visualizations/FulcrumBalance';
import GlowEffect from './visualizations/GlowEffect';
import SortingRow from './visualizations/SortingRow';
import ModeDisplay from './visualizations/ModeDisplay';

/**
 * ResultsGrid - Displays all four statistics with their visualizations
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Mean: Fulcrum Balance */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
        <div className="mb-6">
          <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider">
            Mean (Average)
          </p>
          <p className="text-4xl font-bold text-blue-300 mt-2">{stats.mean}</p>
        </div>
        <FulcrumBalance value={stats.mean} min={minValue} max={maxValue} />
      </div>

      {/* Standard Deviation: Glow Effect */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
        <div className="mb-6">
          <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider">
            Standard Deviation
          </p>
          <p className="text-4xl font-bold text-amber-300 mt-2">{stats.sd}</p>
        </div>
        <GlowEffect value={stats.sd} />
      </div>

      {/* Median: Sorting Row */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
        <div className="mb-6">
          <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider">
            Median (Middle Value)
          </p>
          <p className="text-4xl font-bold text-emerald-300 mt-2">
            {stats.median}
          </p>
        </div>
        <SortingRow value={stats.median} sorted={stats.sorted || []} />
      </div>

      {/* Mode: Frequency Display */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
        <div className="mb-6">
          <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider">
            Mode (Most Frequent)
          </p>
          <p className="text-4xl font-bold text-pink-300 mt-2">
            {stats.mode !== null ? stats.mode : 'N/A'}
          </p>
        </div>
        <ModeDisplay value={stats.mode} frequency={stats.frequency} mode={mode} />
      </div>
    </div>
  );
}
