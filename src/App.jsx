import React from 'react';
import BentoCalculator from './components/BentoCalculator';
import './globals.css';

/**
 * Main App Component
 * Entry point for the Bento Statistics Calculator
 */
export default function App() {
  return (
    <main className="w-full">
      <BentoCalculator />
    </main>
  );
}
