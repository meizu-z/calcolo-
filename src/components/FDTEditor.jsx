'use client';

import React, { useState } from 'react';

/**
 * FDTEditor - Frequency Distribution Table Editor
 * Allows input and editing of class intervals and frequencies
 * Enhanced: Paste from Clipboard feature with format validation
 */
export default function FDTEditor({
  intervals,
  frequencies,
  setIntervals,
  setFrequencies,
}) {
  const [toast, setToast] = useState(null);

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

  const showToast = (message, type = 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handlePasteFromClipboard = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      parseAndLoadClipboardData(clipboardText);
    } catch (error) {
      showToast('Unable to access clipboard. Please paste manually.', 'error');
    }
  };

  const parseAndLoadClipboardData = (data) => {
    // Expected format: "From,To,Freq|From,To,Freq|..."
    // Example: "10,20,5|20,30,8|30,40,12"
    
    if (!data || data.trim().length === 0) {
      showToast('Clipboard is empty. Please copy data first.', 'error');
      return;
    }

    try {
      const rows = data.trim().split('|').map((row) => row.trim());
      const newIntervals = [];
      const newFrequencies = [];

      for (const row of rows) {
        const parts = row.split(',').map((part) => part.trim());

        if (parts.length !== 3) {
          showToast(
            'Invalid format. Expected: From,To,Freq|From,To,Freq',
            'error'
          );
          return;
        }

        const lower = parseFloat(parts[0]);
        const upper = parseFloat(parts[1]);
        const freq = parseFloat(parts[2]);

        if (isNaN(lower) || isNaN(upper) || isNaN(freq)) {
          showToast('Invalid format. All values must be numbers.', 'error');
          return;
        }

        if (lower >= upper) {
          showToast('Invalid format. "From" must be less than "To".', 'error');
          return;
        }

        newIntervals.push([lower.toString(), upper.toString()]);
        newFrequencies.push(freq.toString());
      }

      setIntervals(newIntervals);
      setFrequencies(newFrequencies);
      showToast(
        `Successfully loaded ${newIntervals.length} rows from clipboard`,
        'success'
      );
    } catch (error) {
      showToast(
        'Invalid format. Please generate data from Raw mode first.',
        'error'
      );
    }
  };

  return (
    <div className="space-y-4 h-full">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`rounded-lg p-3 text-sm font-semibold font-['Urbanist'] animate-pulse ${
            toast.type === 'success'
              ? 'bg-green-100 text-green-800 border border-green-300'
              : 'bg-red-100 text-red-800 border border-red-300'
          }`}
        >
          {toast.message}
        </div>
      )}

      <div className="tile-honeydew rounded-2xl p-6 h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <label className="text-black text-sm font-semibold uppercase tracking-wider font-['Urbanist']">
            Frequency Distribution Table
          </label>
          <div className="flex gap-2">
            <button
              onClick={handlePasteFromClipboard}
              className="px-3 py-1 rounded-lg bg-black/20 text-black text-sm font-medium hover:bg-black/30 transition-all font-['Urbanist']"
              title="Paste data formatted as: From,To,Freq|From,To,Freq"
            >
              Paste Data
            </button>
            <button
              onClick={handleAddRow}
              className="px-3 py-1 rounded-lg btn-active text-sm font-medium hover:bg-[#E8E998] transition-all font-['Urbanist']"
            >
              Add Row
            </button>
          </div>
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
              No intervals yet. Click Add Row or Paste Data to start.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
