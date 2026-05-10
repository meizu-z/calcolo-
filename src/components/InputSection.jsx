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
    <div className="space-y-6 h-full flex flex-col">
      {/* Mode Toggle Buttons */}
      <div className="tile-honeydew rounded-2xl p-6">
        <p className="text-black text-sm font-semibold mb-4 uppercase tracking-wider font-['Urbanist']">
          Input Mode
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => setMode('raw')}
            className={`px-4 py-3 rounded-xl font-semibold transition-all duration-200 font-['Urbanist'] ${
              mode === 'raw'
                ? 'btn-active'
                : 'bg-black/20 text-black hover:bg-black/30'
            }`}
          >
            Raw Data
          </button>
          <button
            onClick={() => setMode('grouped')}
            className={`px-4 py-3 rounded-xl font-semibold transition-all duration-200 font-['Urbanist'] ${
              mode === 'grouped'
                ? 'btn-active'
                : 'bg-black/20 text-black hover:bg-black/30'
            }`}
          >
            Frequency Table
          </button>
        </div>
      </div>

      {/* Raw Data Input */}
      {mode === 'raw' && (
        <div className="tile-honeydew rounded-2xl p-6 flex-1 flex flex-col">
          <label className="block text-black text-sm font-semibold mb-3 uppercase tracking-wider font-['Urbanist']">
            Enter Data Points
          </label>
          <textarea
            value={rawData.join(', ')}
            onChange={handleRawDataChange}
            placeholder="e.g., 12, 15, 18, 22, 25"
            className="w-full bg-white/20 rounded-xl p-4 text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-black/40 transition-all resize-none flex-1 font-['Urbanist']"
            rows="6"
          />
          <p className="text-black/70 text-xs mt-3 font-['Urbanist']">
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
        <div className="tile-honeydew rounded-2xl p-6">
          <p className="text-black text-sm font-semibold mb-2 uppercase tracking-wider font-['Urbanist']">
            Summary
          </p>
          <p className="text-black/80 font-['Urbanist']">
            {mode === 'raw'
              ? `Data points: ${rawData.length}`
              : `Total frequency: ${frequencies.reduce((a, b) => a + b, 0)}`}
          </p>
        </div>
      )}
    </div>
  );
}
