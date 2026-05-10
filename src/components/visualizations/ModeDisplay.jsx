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
    <div className="space-y-6 w-full">
      {/* Mode Value Box */}
      {value !== null ? (
        <div className="bg-black/20 rounded-lg p-4 text-center">
          <p className="text-black/70 text-xs uppercase mb-2 font-['Urbanist']">Mode Value</p>
          <p className="text-3xl font-bold text-black font-['Urbanist']">{value.toFixed(2)}</p>
        </div>
      ) : (
        <div className="bg-black/20 rounded-lg p-4 text-center">
          <p className="text-black/60 text-sm font-['Urbanist']">No mode (all values unique)</p>
        </div>
      )}

      {/* Frequency Bars */}
      {frequencyEntries.length > 0 && (
        <div className="space-y-3">
          <p className="text-black/70 text-xs font-semibold uppercase font-['Urbanist']">
            Top Frequencies
          </p>
          {frequencyEntries.map(([val, freq]) => (
            <div key={val} className="space-y-1">
              <div className="flex justify-between items-center text-sm">
                <span className="text-black font-['Urbanist']">
                  {parseFloat(val).toFixed(2)}
                </span>
                <span className="text-black font-semibold font-['Urbanist']">{freq}x</span>
              </div>
              <div className="w-full bg-black/20 rounded h-2 overflow-hidden">
                <div
                  className="h-full bg-black/60 transition-all duration-300"
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
