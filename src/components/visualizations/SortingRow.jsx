'use client';

import React from 'react';

/**
 * SortingRow - Visualizes Median as sorted pills with center highlight
 * Shows the median's position in the sorted dataset
 */
export default function SortingRow({ value, sorted }) {
  if (!sorted || sorted.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-slate-400">No data available</p>
      </div>
    );
  }

  const displayData = sorted.slice(0, 11);
  const medianIndex = Math.floor(displayData.length / 2);

  return (
    <div className="space-y-6">
      {/* Pills Display */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {displayData.map((num, index) => (
          <div
            key={index}
            className={`px-3 py-2 rounded-full font-semibold text-sm transition-all duration-500 transform ${
              index === medianIndex
                ? 'bg-emerald-500/50 border border-emerald-400/80 text-emerald-100 scale-125 shadow-lg shadow-emerald-500/50'
                : 'bg-white/10 border border-white/20 text-slate-300 hover:bg-white/15'
            }`}
          >
            {num.toFixed(1)}
          </div>
        ))}
      </div>

      {/* Info Text */}
      <div className="space-y-2 text-center">
        <p className="text-slate-400 text-sm">
          {sorted.length} values, median at position {medianIndex + 1}
        </p>
        {sorted.length > 11 && (
          <p className="text-slate-500 text-xs">(Showing first 11 values)</p>
        )}
      </div>

      {/* Range Statistics */}
      <div className="bg-white/5 border border-white/10 rounded-lg p-4">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-slate-400 text-xs uppercase">Min</p>
            <p className="text-emerald-300 font-semibold">
              {Math.min(...sorted).toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-slate-400 text-xs uppercase">Median</p>
            <p className="text-emerald-300 font-semibold">{value.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-slate-400 text-xs uppercase">Max</p>
            <p className="text-emerald-300 font-semibold">
              {Math.max(...sorted).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
