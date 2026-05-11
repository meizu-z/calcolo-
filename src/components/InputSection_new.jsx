'use client';

import React, { useMemo, useState } from 'react';
import FDTEditor from './FDTEditor.jsx';

/**
 * InputSection - Master Data Hub Component
 * Two-column layout: Left (Inputs), Right (FDT Table - Expanded)
 */

// ============================================
// STURGES' RULE IMPLEMENTATION
// ============================================

const calculateOptimalClasses = (n) => {
  if (n <= 1) return 1;
  return Math.ceil(1 + 3.32 * Math.log10(n));
};

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

    const lowerBound = lower - 0.5;
    const upperBound = upper + 0.5;

    const freq = data.filter((x) => x >= lowerBound && x <= upperBound).length;
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
    <div className="tile-honeydew rounded-2xl p-8 h-full flex flex-col gap-6">
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

      {/* Two-Column Layout */}
      <div className="flex gap-8 h-full">
        {/* Left Column: Inputs (Compact) */}
        <div className="w-1/4 flex-shrink-0 flex flex-col gap-4 overflow-y-auto">
          {/* Mode Toggle */}
          <div>
            <p className="text-black text-sm font-semibold mb-3 uppercase tracking-wider font-['Urbanist']">
              Input Mode
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setMode('raw')}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 font-['Urbanist'] ${
                  mode === 'raw'
                    ? 'btn-active'
                    : 'bg-black/20 text-black hover:bg-black/30'
                }`}
              >
                Raw Data
              </button>
              <button
                onClick={() => setMode('grouped')}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 font-['Urbanist'] ${
                  mode === 'grouped'
                    ? 'btn-active'
                    : 'bg-black/20 text-black hover:bg-black/30'
                }`}
              >
                Frequency Table
              </button>
            </div>
          </div>

          {/* Raw Data Input (Compact) */}
          {mode === 'raw' && (
            <div>
              <label className="block text-black text-xs font-semibold mb-2 uppercase tracking-wider font-['Urbanist']">
                Data Points
              </label>
              <textarea
                value={rawData.join(', ')}
                onChange={handleRawDataChange}
                placeholder="e.g., 12, 15, 18, 22, 25"
                className="w-full h-24 bg-black/15 rounded-lg p-2 text-black text-xs placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-black/40 transition-all resize-none overflow-y-auto font-['Urbanist']"
              />
              <p className="text-black/60 text-xs mt-1 font-['Urbanist']">
                {rawData.length} values
              </p>
            </div>
          )}

          {/* FDT Editor (Compact) */}
          {mode === 'grouped' && (
            <div className="flex-1 overflow-y-auto">
              <FDTEditor
                intervals={intervals}
                frequencies={frequencies}
                setIntervals={setIntervals}
                setFrequencies={setFrequencies}
              />
            </div>
          )}

          {/* Summary */}
          {(rawData.length > 0 || frequencies.length > 0) && (
            <div className="bg-black/10 rounded-lg p-3 mt-auto">
              <p className="text-black text-xs font-semibold uppercase font-['Urbanist']">
                Summary
              </p>
              <p className="text-black/80 text-xs font-['Urbanist'] mt-1">
                {mode === 'raw'
                  ? `${rawData.length} values`
                  : `Total: ${frequencies.reduce((a, b) => a + (Number(b) || 0), 0)}`}
              </p>
            </div>
          )}
        </div>

        {/* Right Column: FDT Table (Expanded) */}
        <div className="flex-1 overflow-y-auto pr-4">
          {generatedFDT && mode === 'raw' ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between sticky top-0 bg-[#CFDECA] py-2">
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

              {/* Expanded FDT Table */}
              <div className="bg-black/5 rounded-xl p-4 border border-black/10">
                <div className="space-y-0 text-xs font-['Urbanist']">
                  {/* Table Header - High Contrast */}
                  <div className="grid grid-cols-5 gap-3 pb-3 border-b-2 border-black font-bold text-black bg-black/10 p-3 rounded mb-2">
                    <div>CI</div>
                    <div>LB – UB</div>
                    <div className="text-center">f</div>
                    <div className="text-center">x</div>
                    <div className="text-right">cf</div>
                  </div>

                  {/* Table Rows */}
                  {generatedFDT.intervals.map((interval, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-5 gap-3 py-2 px-3 border-b border-black/10 text-black hover:bg-black/5 rounded transition-colors"
                    >
                      <div className="font-semibold">
                        {interval[0]}-{interval[1]}
                      </div>
                      <div>
                        {generatedFDT.lb[idx].toFixed(1)}–{generatedFDT.ub[idx].toFixed(1)}
                      </div>
                      <div className="text-center font-bold">
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
                  <div className="grid grid-cols-5 gap-3 py-3 px-3 border-t-2 border-black font-bold text-black bg-black/10 rounded mt-3">
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
          ) : mode === 'grouped' && intervals.length > 0 ? (
            <div className="space-y-3">
              <p className="text-black text-sm font-semibold uppercase tracking-wider font-['Urbanist'] sticky top-0 bg-[#CFDECA] py-2">
                Current FDT ({intervals.length} classes)
              </p>

              {/* Display Current FDT */}
              <div className="bg-black/5 rounded-xl p-4 border border-black/10">
                <div className="space-y-0 text-xs font-['Urbanist']">
                  {/* Table Header */}
                  <div className="grid grid-cols-5 gap-3 pb-3 border-b-2 border-black font-bold text-black bg-black/10 p-3 rounded mb-2">
                    <div>CI</div>
                    <div>Lower</div>
                    <div className="text-center">Upper</div>
                    <div className="text-center">f</div>
                    <div className="text-right">Σf</div>
                  </div>

                  {/* Table Rows */}
                  {intervals.map((interval, idx) => {
                    const freq = Number(frequencies[idx]) || 0;
                    const cumulativeFreq = frequencies
                      .slice(0, idx + 1)
                      .reduce((a, b) => a + (Number(b) || 0), 0);

                    return (
                      <div
                        key={idx}
                        className="grid grid-cols-5 gap-3 py-2 px-3 border-b border-black/10 text-black hover:bg-black/5 rounded transition-colors"
                      >
                        <div className="font-semibold">
                          {interval[0]}-{interval[1]}
                        </div>
                        <div>{interval[0]}</div>
                        <div className="text-center">{interval[1]}</div>
                        <div className="text-center font-bold">{freq}</div>
                        <div className="text-right">{cumulativeFreq}</div>
                      </div>
                    );
                  })}

                  {/* Summary Row */}
                  <div className="grid grid-cols-5 gap-3 py-3 px-3 border-t-2 border-black font-bold text-black bg-black/10 rounded mt-3">
                    <div></div>
                    <div>Σf =</div>
                    <div></div>
                    <div className="text-center">
                      {frequencies.reduce((a, b) => a + (Number(b) || 0), 0)}
                    </div>
                    <div className="text-right">
                      {frequencies.reduce((a, b) => a + (Number(b) || 0), 0)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-black/40 text-sm font-['Urbanist']">
                FDT will appear here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
