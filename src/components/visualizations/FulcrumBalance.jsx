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
    <div className="space-y-6">
      {/* Balance Beam Visualization */}
      <div className="relative h-32 bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl p-6 flex items-center justify-center overflow-hidden border border-white/10">
        {/* Beam Line */}
        <div className="absolute w-full h-1 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 top-1/2 transform -translate-y-1/2"></div>

        {/* Fulcrum (Animated Pivot) */}
        <div
          className="absolute transform -translate-x-1/2 transition-all duration-500 ease-out"
          style={{ left: `${position}%` }}
        >
          {/* Triangle Pivot Point */}
          <div className="relative">
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-blue-400 mx-auto"></div>
            {/* Glow Effect Around Fulcrum */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-400/30 rounded-full blur-lg animate-pulse-subtle"></div>
          </div>
        </div>

        {/* Min/Max Labels */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 pl-3 text-slate-500 text-xs">
          {min.toFixed(1)}
        </div>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 pr-3 text-slate-500 text-xs">
          {max.toFixed(1)}
        </div>
      </div>

      {/* Position Information */}
      <div className="text-center">
        <p className="text-slate-400 text-sm">
          Balance Point: <span className="text-blue-300 font-semibold">{position.toFixed(1)}%</span>
        </p>
      </div>
    </div>
  );
}
