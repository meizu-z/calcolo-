'use client';

import React from 'react';

/**
 * FDTEditor - Frequency Distribution Table Editor
 * Allows input and editing of class intervals and frequencies
 */
export default function FDTEditor({
  intervals,
  frequencies,
  setIntervals,
  setFrequencies,
}) {
  const handleAddRow = () => {
    setIntervals([...intervals, [0, 0]]);
    setFrequencies([...frequencies, 0]);
  };

  const handleRemoveRow = (index) => {
    setIntervals(intervals.filter((_, i) => i !== index));
    setFrequencies(frequencies.filter((_, i) => i !== index));
  };

  const handleIntervalChange = (index, field, value) => {
    const newIntervals = [...intervals];
    const num = parseFloat(value) || 0;
    newIntervals[index][field] = num;
    setIntervals(newIntervals);
  };

  const handleFrequencyChange = (index, value) => {
    const newFrequencies = [...frequencies];
    newFrequencies[index] = Math.max(0, parseInt(value) || 0);
    setFrequencies(newFrequencies);
  };

  return (
    <div className="space-y-4">
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6">
        <div className="flex items-center justify-between mb-4">
          <label className="text-slate-300 text-sm font-semibold uppercase tracking-wider">
            Frequency Distribution Table
          </label>
          <button
            onClick={handleAddRow}
            className="px-3 py-1 rounded-lg bg-purple-500/40 border border-purple-400/60 text-purple-100 text-sm font-medium hover:bg-purple-500/50 transition-all"
          >
            Add Row
          </button>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-2 px-2 pb-2 border-b border-white/10">
            <div className="col-span-4 text-slate-400 text-xs font-semibold uppercase">
              From
            </div>
            <div className="col-span-4 text-slate-400 text-xs font-semibold uppercase">
              To
            </div>
            <div className="col-span-3 text-slate-400 text-xs font-semibold uppercase">
              Frequency
            </div>
            <div className="col-span-1"></div>
          </div>

          {/* Table Rows */}
          {intervals.map((interval, index) => (
            <div key={index} className="grid grid-cols-12 gap-2 items-center">
              <input
                type="number"
                value={interval[0]}
                onChange={(e) => handleIntervalChange(index, 0, e.target.value)}
                className="col-span-4 bg-white/5 border border-white/10 rounded-lg px-2 py-2 text-white text-sm focus:outline-none focus:border-purple-400/60 transition-all"
                placeholder="Lower"
              />
              <input
                type="number"
                value={interval[1]}
                onChange={(e) => handleIntervalChange(index, 1, e.target.value)}
                className="col-span-4 bg-white/5 border border-white/10 rounded-lg px-2 py-2 text-white text-sm focus:outline-none focus:border-purple-400/60 transition-all"
                placeholder="Upper"
              />
              <input
                type="number"
                value={frequencies[index]}
                onChange={(e) => handleFrequencyChange(index, e.target.value)}
                className="col-span-3 bg-white/5 border border-white/10 rounded-lg px-2 py-2 text-white text-sm focus:outline-none focus:border-purple-400/60 transition-all"
                placeholder="Freq"
                min="0"
              />
              <button
                onClick={() => handleRemoveRow(index)}
                className="col-span-1 text-red-400/60 hover:text-red-300 transition-colors text-lg"
              >
                ✕
              </button>
            </div>
          ))}

          {intervals.length === 0 && (
            <p className="text-slate-400 text-sm text-center py-4">
              No intervals yet. Click Add Row to start.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
