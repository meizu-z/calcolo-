import React from 'react';
import BentoCalculator from './BentoCalculator.jsx';
import './globals.css';

/**
 * Main App Component
 * Entry point for the Calcolo Statistics Calculator
 */
export default function App() {
  return (
    <main className="min-h-screen bg-black p-8 font-['Urbanist']">
      <BentoCalculator />
    </main>
  );
}
