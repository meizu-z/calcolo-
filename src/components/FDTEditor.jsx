'use client';

import React from 'react';

/**
 * FDTEditor - Frequency Distribution Table Editor
 * Allows input and editing of class intervals and frequencies
 * Fixed: Empty initial state, text selection on focus, proper number conversion
 */
export default function FDTEditor({
  intervals,
  frequencies,
  setIntervals,
  setFrequencies,
}) {
  const handleAddRow = () => {
    setIntervals([...intervals, ['', '']]);
    setFrequencies([...frequencies, '']);
  };

  const handleRemoveRow = (index) => {
    setIntervals(intervals.filter((_, i) => i !== index));
    setFrequencies(frequencies.filter((_, i) => i !== index));
  };

  const handleIntervalChange = (index, field, value) => {
    const newIntervals = [...intervals];
    newIntervals[index][field] = value;
    setIntervals(newIntervals);
  };

  const handleFrequencyChange = (index, value) => {
    const newFrequencies = [...frequencies];
    newFrequencies[index] = value;
    setFrequencies(newFrequencies);
  };

  const handleInputFocus = (e) => {
    e.target.select();
  };

  return (
    <div className="space-y-4 h-full">
      <div className="tile-honeydew rounded-2xl p-6 h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <label className="text-black text-sm font-semibold uppercase tracking-wider font-['Urbanist']">
            Frequency Distribution Table
          </label>
          <button
            onClick={handleAddRow}
            className="px-3 py-1 rounded-lg btn-active text-sm font-medium hover:bg-[#E8E998] transition-all font-['Urbanist']"
          >
            Add Row
          </button>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto flex-1">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-2 px-2 pb-2 border-b border-black/20">
            <div className="col-span-4 text-black/70 text-xs font-semibold uppercase font-['Urbanist']">
              From
            </div>
            <div className="col-span-4 text-black/70 text-xs font-semibold uppercase font-['Urbanist']">
              To
            </div>
            <div className="col-span-3 text-black/70 text-xs font-semibold uppercase font-['Urbanist']">
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
                onFocus={handleInputFocus}
                className="col-span-4 bg-black/10 rounded-lg px-2 py-2 text-black text-sm focus:outline-none focus:ring-2 focus:ring-black/40 transition-all font-['Urbanist'] placeholder-black/40"
                placeholder="Lower"
              />
              <input
                type="number"
                value={interval[1]}
                onChange={(e) => handleIntervalChange(index, 1, e.target.value)}
                onFocus={handleInputFocus}
                className="col-span-4 bg-black/10 rounded-lg px-2 py-2 text-black text-sm focus:outline-none focus:ring-2 focus:ring-black/40 transition-all font-['Urbanist'] placeholder-black/40"
                placeholder="Upper"
              />
              <input
                type="number"
                value={frequencies[index]}
                onChange={(e) => handleFrequencyChange(index, e.target.value)}
                onFocus={handleInputFocus}
                className="col-span-3 bg-black/10 rounded-lg px-2 py-2 text-black text-sm focus:outline-none focus:ring-2 focus:ring-black/40 transition-all font-['Urbanist'] placeholder-black/40"
                placeholder="Freq"
                min="0"
              />
              <button
                onClick={() => handleRemoveRow(index)}
                className="col-span-1 text-black/60 hover:text-black transition-colors text-lg font-['Urbanist']"
              >
                ✕
              </button>
            </div>
          ))}

          {intervals.length === 0 && (
            <p className="text-black/60 text-sm text-center py-4 font-['Urbanist']">
              No intervals yet. Click Add Row to start.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
