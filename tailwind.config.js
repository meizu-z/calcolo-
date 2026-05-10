/**
 * Advanced Tailwind Configuration for Bento Statistics Calculator
 */

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        slate: {
          950: '#03051a',
          900: '#0f172a',
        },
      },
      backdropBlur: {
        xl: '20px',
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgb(59 130 246 / 0.5)',
        'glow-amber': '0 0 20px rgb(251 146 60 / 0.5)',
      },
      animation: {
        'pulse-glow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-subtle': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
  safelist: [
    // Mean (Blue)
    'bg-blue-500/40',
    'border-blue-400/60',
    'text-blue-100',
    'text-blue-300',
    'from-blue-500',
    'via-blue-400',
    'to-blue-500',
    'border-t-blue-400',
    'bg-blue-400/30',
    
    // Standard Deviation (Amber)
    'bg-amber-500',
    'bg-amber-400',
    'text-amber-300',
    'from-amber-500/40',
    'to-amber-500',
    'shadow-amber-400/50',
    
    // Median (Emerald)
    'bg-emerald-500/50',
    'border-emerald-400/80',
    'text-emerald-100',
    'text-emerald-300',
    'scale-125',
    'shadow-lg',
    'shadow-emerald-500/50',
    
    // Mode (Pink)
    'bg-pink-500/40',
    'border-pink-400/60',
    'text-pink-100',
    'text-pink-300',
    'from-pink-500/40',
    'to-pink-500',
    
    // UI (Purple)
    'bg-purple-500/40',
    'border-purple-400/60',
    'text-purple-100',
    'bg-purple-500/50',
    'border-purple-400/80',
    
    // Delete
    'text-red-400/60',
    'text-red-300',
  ],
};
