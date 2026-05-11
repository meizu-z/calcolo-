'use client';

import React, { useMemo, useState } from 'react';
import FDTEditor from './FDTEditor.jsx';

/**
 * InputSection - Handles both raw data and FDT input modes
 * Enhanced: Sturges' Rule FDT Generator with professional calculations
 */

// ============================================
// STURGES' RULE IMPLEMENTATION
// ============================================

/**
 * Calculate optimal number of classes using Sturges' Rule
 * k = ceil(1 + 3.32 * log10(n))
 */
const calculateOptimalClasses = (n) => {
  if (n <= 1) return 1;
  return Math.ceil(1 + 3.32 * Math.log10(n));
};

/**
 * Generate FDT (Frequency Distribution Table) using Sturges' Rule
 * Returns: { intervals, frequencies, classMarks, cf, lb, ub }
 */
const generateFDTBySturgesRule = (data) => {
  if (!data || data.length === 0) return null;

  const n = data.length;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const k = calculateOptimalClasses(n);
  const i = Math.ceil(range / k);

  const intervals = [];
  const frequencies = [];
  const classMarks = [];
  const lb = [];
  const ub = [];
  const cf = [];
  let cumulativeFreq = 0;

  for (let j = 0; j < k; j++) {
    const lower = min + j * i;
    const upper = lower + i - 1;

    // Calculate boundaries (±0.5)
    const lowerBound = lower - 0.5;
    const upperBound = upper + 0.5;

    // Count frequencies in this interval
    const freq = data.filter((x) => x >= lowerBound && x <= upperBound).length;

    // Calculate class mark (midpoint)
    const mark = (lower + upper) / 2;

    if (freq > 0) {
      intervals.push([lower, upper]);
      frequencies.push(freq);
      classMarks.push(mark);
      lb.push(lowerBound);
      ub.push(upperBound);
      cumulativeFreq += freq;
      cf.push(cumulativeFreq);
    }
  }

  return {
    intervals,
    frequencies,
    classMarks,
    cf,
    lb,
    ub,
    k: intervals.length,
    classWidth: i,
  };
};

/**
 * Format FDT data for clipboard copying
 * Format: "From,To,Freq|From,To,Freq"
 */
const formatFDTForClipboard = (intervals, frequencies) => {
  return intervals
    .map((interval, idx) => `${interval[0]},${interval[1]},${frequencies[idx]}`)
    .join('|');
};

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
  const [toast, setToast] = useState(null);

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

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Generate FDT using Sturges' Rule
  const generatedFDT = useMemo(() => {
    if (rawData.length < 2) return null;
    return generateFDTBySturgesRule(rawData);
  }, [rawData]);

  const handleCopyFDT = () => {
    if (!generatedFDT) {
      showToast('No FDT to copy. Enter more data points.', 'error');
      return;
    }

    const clipboardText = formatFDTForClipboard(
      generatedFDT.intervals,
      generatedFDT.frequencies
    );
    navigator.clipboard
      .writeText(clipboardText)
      .then(() => {
        showToast('FDT copied to clipboard!', 'success');
      })
      .catch(() => {
        showToast('Failed to copy to clipboard', 'error');
      });
  };

  const handlePasteToFDT = () => {
    if (!generatedFDT) {
      showToast('No FDT to paste. Enter more data points.', 'error');
      return;
    }

    // Convert to string format for FDTEditor state
    const newIntervals = generatedFDT.intervals.map((interval) => [
      interval[0].toString(),
      interval[1].toString(),
    ]);
    const newFrequencies = generatedFDT.frequencies.map((freq) =>
      freq.toString()
    );

    setIntervals(newIntervals);
    setFrequencies(newFrequencies);
    setMode('grouped');
    showToast(
      `Loaded ${generatedFDT.intervals.length} classes from Sturges' Rule`,
      'success'
    );
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`rounded-lg p-2 text-xs font-semibold font-['Urbanist'] animate-pulse ${
            toast.type === 'success'
              ? 'bg-green-100 text-green-800 border border-green-300'
              : toast.type === 'error'
                ? 'bg-red-100 text-red-800 border border-red-300'
                : 'bg-blue-100 text-blue-800 border border-blue-300'
          }`}
        >
          {toast.message}
        </div>
      )}

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
        <div className="tile-honeydew rounded-2xl p-6 flex flex-col">
          <label className="block text-black text-sm font-semibold mb-3 uppercase tracking-wider font-['Urbanist']">
            Enter Data Points
          </label>
          <textarea
            value={rawData.join(', ')}
            onChange={handleRawDataChange}
            placeholder="e.g., 12, 15, 18, 22, 25"
            className="w-full h-40 bg-black/15 rounded-xl p-4 text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-black/40 transition-all resize-none overflow-y-auto font-['Urbanist']"
          />
          <p className="text-black/70 text-xs mt-3 font-['Urbanist']">
            Comma-separated values. {rawData.length} values detected.
          </p>

          {/* Generated FDT from Sturges' Rule */}
          {generatedFDT && (
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-black text-sm font-semibold uppercase tracking-wider font-['Urbanist']">
                  Sturges' Rule FDT ({generatedFDT.k} classes)
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopyFDT}
                    className="px-2 py-1 rounded-lg bg-black/20 text-black text-xs font-medium hover:bg-black/30 transition-all font-['Urbanist']"
                  >
                    Copy
                  </button>
                  <button
                    onClick={handlePasteToFDT}
                    className="px-2 py-1 rounded-lg btn-active text-xs font-medium hover:bg-[#E8E998] transition-all font-['Urbanist']"
                  >
                    Paste to FDT
                  </button>
                </div>
              </div>

              {/* Generated FDT Table */}
              <div className="bg-black/5 rounded-xl p-3 max-h-52 overflow-y-auto border border-black/10">
                <div className="space-y-1 text-xs font-['Urbanist']">
                  {/* Table Header */}
                  <div className="grid grid-cols-5 gap-1 pb-1 border-b border-black/20 font-semibold text-black/70">
                    <div>CI</div>
                    <div>LB-UB</div>
                    <div className="text-center">f</div>
                    <div className="text-center">x</div>
                    <div className="text-right">cf</div>
                  </div>

                  {/* Table Rows */}
                  {generatedFDT.intervals.map((interval, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-5 gap-1 py-1 border-b border-black/10 text-black"
                    >
                      <div>
                        {interval[0]}-{interval[1]}
                      </div>
                      <div className="text-xs">
                        {generatedFDT.lb[idx].toFixed(1)}-
                        {generatedFDT.ub[idx].toFixed(1)}
                      </div>
                      <div className="text-center font-semibold">
                        {generatedFDT.frequencies[idx]}
                      </div>
                      <div className="text-center">
                        {generatedFDT.classMarks[idx].toFixed(1)}
                      </div>
                      <div className="text-right">
                        {generatedFDT.cf[idx]}
                      </div>
                    </div>
                  ))}

                  {/* Summary Row */}
                  <div className="grid grid-cols-5 gap-1 py-1 border-t-2 border-black/30 font-semibold text-black">
                    <div></div>
                    <div>Σf =</div>
                    <div className="text-center">
                      {generatedFDT.frequencies.reduce((a, b) => a + b, 0)}
                    </div>
                    <div></div>
                    <div className="text-right">
                      {generatedFDT.frequencies.reduce((a, b) => a + b, 0)}
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-black/60 text-xs font-['Urbanist']">
                Class Width (i) = {generatedFDT.classWidth}
              </p>
            </div>
          )}
        </div>
      )}

      {/* FDT Input */}
      {mode === 'grouped' && (
        <div className="flex-1 flex flex-col">
          <FDTEditor
            intervals={intervals}
            frequencies={frequencies}
            setIntervals={setIntervals}
            setFrequencies={setFrequencies}
          />
        </div>
      )}

      {/* Data Summary */}
      {(rawData.length > 0 || frequencies.length > 0) && (
        <div className="tile-honeydew rounded-2xl p-6 mt-auto">
          <p className="text-black text-sm font-semibold mb-2 uppercase tracking-wider font-['Urbanist']">
            Summary
          </p>
          <p className="text-black/80 font-['Urbanist']">
            {mode === 'raw'
              ? `Data points: ${rawData.length}`
              : `Total frequency: ${frequencies.reduce((a, b) => a + (Number(b) || 0), 0)}`}
          </p>
        </div>
      )}
    </div>
  );
}
