'use client';

import React from 'react';
import FDTEditor from './FDTEditor.jsx';

/**
 * InputSection - Handles both raw data and FDT input modes
 */
export default function InputSection({
  mode,
  setMode,
  rawData,
  setRawData,
  intervals,
  setIntervals,
  frequencies,
  setFrequencies,
}) {
  const handleRawDataChange = (e) => {
    const text = e.target.value;
    try {
      const numbers = text.split(',').map((x) => {
        const num = parseFloat(x.trim());
        return isNaN(num) ? null : num;
      });
      const filtered = numbers.filter((x) => x !== null);
      setRawData(filtered);
    } catch (error) {
      console.error('Invalid input', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Mode Toggle Buttons */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6">
        <p className="text-slate-300 text-sm font-semibold mb-4 uppercase tracking-wider">
          Input Mode
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => setMode('raw')}
            className={`flex-1 px-4 py-3 rounded-2xl font-medium transition-all duration-200 ${
              mode === 'raw'
                ? 'bg-blue-500/40 border border-blue-400/60 text-blue-100'
                : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10'
            }`}
          >
            Raw Data
          </button>
          <button
            onClick={() => setMode('grouped')}
            className={`flex-1 px-4 py-3 rounded-2xl font-medium transition-all duration-200 ${
              mode === 'grouped'
                ? 'bg-purple-500/40 border border-purple-400/60 text-purple-100'
                : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10'
            }`}
          >
            Frequency Table
          </button>
        </div>
      </div>

      {/* Raw Data Input */}
      {mode === 'raw' && (
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6">
          <label className="block text-slate-300 text-sm font-semibold mb-3 uppercase tracking-wider">
            Enter Data Points
          </label>
          <textarea
            value={rawData.join(', ')}
            onChange={handleRawDataChange}
            placeholder="e.g., 12, 15, 18, 22, 25"
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-400/60 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
            rows="6"
          />
          <p className="text-slate-400 text-xs mt-3">
            Comma-separated values. {rawData.length} values detected.
          </p>
        </div>
      )}

      {/* FDT Input */}
      {mode === 'grouped' && (
        <FDTEditor
          intervals={intervals}
          frequencies={frequencies}
          setIntervals={setIntervals}
          setFrequencies={setFrequencies}
        />
      )}

      {/* Data Summary */}
      {(rawData.length > 0 || frequencies.length > 0) && (
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6">
          <p className="text-slate-300 text-sm font-semibold mb-2 uppercase tracking-wider">
            Summary
          </p>
          <p className="text-slate-400">
            {mode === 'raw'
              ? `Data points: ${rawData.length}`
              : `Total frequency: ${frequencies.reduce((a, b) => a + b, 0)}`}
          </p>
        </div>
      )}
    </div>
  );
}
