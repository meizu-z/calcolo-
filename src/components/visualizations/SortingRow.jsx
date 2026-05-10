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
        <p className="text-black/60 font-['Urbanist']">No data available</p>
      </div>
    );
  }

  const displayData = sorted.slice(0, 11);
  const medianIndex = Math.floor(displayData.length / 2);

  return (
    <div className="space-y-6 w-full">
      {/* Pills Display */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {displayData.map((num, index) => (
          <div
            key={index}
            className={`px-3 py-2 rounded-full font-semibold text-sm transition-all duration-500 transform font-['Urbanist'] ${
              index === medianIndex
                ? 'bg-black text-white scale-125 shadow-lg shadow-black/50'
                : 'bg-black/20 text-black hover:bg-black/30'
            }`}
          >
            {num.toFixed(1)}
          </div>
        ))}
      </div>

      {/* Info Text */}
      <div className="space-y-2 text-center">
        <p className="text-black/70 text-sm font-['Urbanist']">
          {sorted.length} values, median at position {medianIndex + 1}
        </p>
        {sorted.length > 11 && (
          <p className="text-black/60 text-xs font-['Urbanist']">(Showing first 11 values)</p>
        )}
      </div>

      {/* Range Statistics */}
      <div className="bg-black/20 rounded-lg p-4">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-black/70 text-xs uppercase font-['Urbanist']">Min</p>
            <p className="text-black font-semibold font-['Urbanist']">
              {Math.min(...sorted).toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-black/70 text-xs uppercase font-['Urbanist']">Median</p>
            <p className="text-black font-semibold font-['Urbanist']">{value.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-black/70 text-xs uppercase font-['Urbanist']">Max</p>
            <p className="text-black font-semibold font-['Urbanist']">
              {Math.max(...sorted).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
