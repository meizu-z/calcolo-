'use client';

import React from 'react';

/**
 * FulcrumBalance - Visualizes Mean as a sliding fulcrum on a balance beam
 * The fulcrum position represents the mean's position within the data range
 */
export default function FulcrumBalance({ value, min, max }) {
  const range = max - min || 1;
  const position = ((value - min) / range) * 100;

  return (
    <div className="space-y-6 w-full">
      {/* Balance Beam Visualization */}
      <div className="relative h-24 bg-black/20 rounded-xl p-4 flex items-center justify-center overflow-hidden">
        {/* Beam Line */}
        <div className="absolute w-full h-2 bg-black/50 top-1/2 transform -translate-y-1/2 rounded-full"></div>

        {/* Fulcrum (Animated Pivot) */}
        <div
          className="absolute transform -translate-x-1/2 transition-all duration-500 ease-out"
          style={{ left: `${position}%` }}
        >
          {/* Triangle Pivot Point */}
          <div className="relative">
            <div className="w-0 h-0 border-l-6 border-r-6 border-t-12 border-l-transparent border-r-transparent border-t-black mx-auto"></div>
            {/* Glow Effect Around Fulcrum */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-black/20 rounded-full blur-lg animate-pulse-subtle"></div>
          </div>
        </div>

        {/* Min/Max Labels */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 pl-3 text-black/60 text-xs font-['Urbanist']">
          {min.toFixed(1)}
        </div>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 pr-3 text-black/60 text-xs font-['Urbanist']">
          {max.toFixed(1)}
        </div>
      </div>

      {/* Position Information */}
      <div className="text-center">
        <p className="text-black/70 text-sm font-['Urbanist']">
          Balance Point: <span className="text-black font-semibold">{position.toFixed(1)}%</span>
        </p>
      </div>
    </div>
  );
}
