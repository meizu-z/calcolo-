'use client';

import React from 'react';

/**
 * GlowEffect - Visualizes Standard Deviation through blur intensity
 * Higher SD = more blur (wider spread), Lower SD = sharper (tight clustering)
 */
export default function GlowEffect({ value }) {
  // Normalize SD for blur effect
  const maxSD = 50;
  const blurAmount = Math.min((value / maxSD) * 20, 20);
  const glowOpacity = Math.min(value / maxSD, 1);
  const glowIntensity =
    value > 10 ? 'Sharp' : value > 5 ? 'Moderate' : 'Blurry';

  return (
    <div className="space-y-6">
      {/* Glow Circle with Variable Blur */}
      <div className="relative h-40 flex items-center justify-center">
        {/* Outer glow layer */}
        <div
          className="absolute w-24 h-24 bg-amber-500 rounded-full transition-all duration-700"
          style={{
            filter: `blur(${blurAmount}px)`,
            opacity: glowOpacity * 0.5,
          }}
        ></div>

        {/* Middle glow layer */}
        <div
          className="absolute w-20 h-20 bg-amber-400 rounded-full transition-all duration-700"
          style={{
            filter: `blur(${Math.max(blurAmount - 5, 0)}px)`,
            opacity: glowOpacity * 0.7,
          }}
        ></div>

        {/* Core circle */}
        <div className="relative w-16 h-16 bg-amber-300 rounded-full shadow-lg shadow-amber-400/50"></div>
      </div>

      {/* Legend and Indicators */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Spread Indicator</span>
          <span className="text-amber-300 font-semibold">{glowIntensity}</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/5 border border-white/10 rounded-lg h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500/40 to-amber-500 transition-all duration-500"
            style={{ width: `${Math.min((value / maxSD) * 100, 100)}%` }}
          ></div>
        </div>

        {/* Interpretation */}
        <p className="text-slate-500 text-xs">
          {value < 3
            ? 'Data tightly clustered'
            : value < 8
              ? 'Moderate spread'
              : 'Wide distribution'}
        </p>
      </div>
    </div>
  );
}
