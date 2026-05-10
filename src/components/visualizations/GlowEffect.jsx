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
    <div className="space-y-6 w-full">
      {/* Glow Circle with Variable Blur */}
      <div className="relative h-32 flex items-center justify-center">
        {/* Outer glow layer */}
        <div
          className="absolute w-24 h-24 bg-black rounded-full transition-all duration-700"
          style={{
            filter: `blur(${blurAmount}px)`,
            opacity: glowOpacity * 0.4,
          }}
        ></div>

        {/* Middle glow layer */}
        <div
          className="absolute w-20 h-20 bg-black rounded-full transition-all duration-700"
          style={{
            filter: `blur(${Math.max(blurAmount - 5, 0)}px)`,
            opacity: glowOpacity * 0.6,
          }}
        ></div>

        {/* Core circle */}
        <div className="relative w-16 h-16 bg-black rounded-full shadow-lg shadow-black/50"></div>
      </div>

      {/* Legend and Indicators */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-black/70 font-['Urbanist']">Spread Indicator</span>
          <span className="text-black font-semibold font-['Urbanist']">{glowIntensity}</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-black/20 rounded-lg h-2 overflow-hidden">
          <div
            className="h-full bg-black/60 transition-all duration-500"
            style={{ width: `${Math.min((value / maxSD) * 100, 100)}%` }}
          ></div>
        </div>

        {/* Interpretation */}
        <p className="text-black/60 text-xs font-['Urbanist']">
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
