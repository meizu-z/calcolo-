'use client';

import React, { useMemo } from 'react';

/**
 * ModeDisplay - Visualizes Mode and top frequencies as bar chart
 */
export default function ModeDisplay({ value, frequency, mode }) {
  const frequencyEntries = useMemo(() => {
    if (!frequency || typeof frequency !== 'object') return [];
    return Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [frequency]);

  const maxFreq = Math.max(...frequencyEntries.map(([_, freq]) => freq), 1);

  return (
    <div className="space-y-6">
      {/* Mode Value Box */}
      {value !== null ? (
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
          <p className="text-slate-400 text-xs uppercase mb-2">Mode Value</p>
          <p className="text-3xl font-bold text-pink-300">{value.toFixed(2)}</p>
        </div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
          <p className="text-slate-400 text-sm">No mode (all values unique)</p>
        </div>
      )}

      {/* Frequency Bars */}
      {frequencyEntries.length > 0 && (
        <div className="space-y-3">
          <p className="text-slate-400 text-xs font-semibold uppercase">
            Top Frequencies
          </p>
          {frequencyEntries.map(([val, freq]) => (
            <div key={val} className="space-y-1">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300">
                  {parseFloat(val).toFixed(2)}
                </span>
                <span className="text-pink-300 font-semibold">{freq}x</span>
              </div>
              <div className="w-full bg-white/5 border border-white/10 rounded h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-pink-500/40 to-pink-500 transition-all duration-300"
                  style={{ width: `${(freq / maxFreq) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
