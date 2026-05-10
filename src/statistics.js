/**
 * Bento Statistics Calculator - Math Engine
 * Pure JavaScript statistical calculations for raw and grouped data
 */

// ============================================
// RAW DATA STATISTICS
// ============================================

export const calculateRawStats = (data) => {
  if (!data || data.length === 0) {
    return {
      mean: 0,
      median: 0,
      mode: null,
      sd: 0,
      count: 0,
      sorted: [],
      frequency: {},
    };
  }

  const n = data.length;
  const sorted = [...data].sort((a, b) => a - b);

  // Mean: Sum of all values divided by count
  const mean = data.reduce((sum, val) => sum + val, 0) / n;

  // Median: Middle value when sorted
  const median =
    n % 2 === 0
      ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2
      : sorted[Math.floor(n / 2)];

  // Mode: Most frequently occurring value
  const frequency = {};
  data.forEach((val) => {
    frequency[val] = (frequency[val] || 0) + 1;
  });
  const maxFreq = Math.max(...Object.values(frequency));
  const modes = Object.keys(frequency)
    .filter((val) => frequency[val] === maxFreq)
    .map(Number);
  const mode =
    modes.length === Object.keys(frequency).length ? null : modes[0];

  // Standard Deviation: Measure of spread
  const variance =
    data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / n;
  const sd = Math.sqrt(variance);

  return {
    mean: parseFloat(mean.toFixed(4)),
    median: parseFloat(median.toFixed(4)),
    mode: mode !== null ? parseFloat(mode.toFixed(4)) : null,
    sd: parseFloat(sd.toFixed(4)),
    count: n,
    sorted,
    frequency,
  };
};

// ============================================
// GROUPED DATA STATISTICS (FDT)
// ============================================

export const calculateGroupedStats = (intervals, frequencies) => {
  if (!intervals || !frequencies || intervals.length === 0) {
    return {
      mean: 0,
      median: 0,
      mode: null,
      sd: 0,
      classMarks: [],
      fx: [],
      cf: [],
      deviationSq: [],
      fDeviationSq: [],
    };
  }

  const n = frequencies.reduce((a, b) => a + b, 0);

  // Class Marks: Midpoint of each interval
  const classMarks = intervals.map((interval) => {
    const [lower, upper] = interval;
    return (lower + upper) / 2;
  });

  // f*x: Frequency × Class Mark
  const fx = classMarks.map((mark, i) => mark * frequencies[i]);

  // Mean: Sum of (f*x) divided by total frequency
  const mean = fx.reduce((a, b) => a + b, 0) / n;

  // Cumulative Frequency: Running total of frequencies
  const cf = [];
  let cumSum = 0;
  frequencies.forEach((freq) => {
    cumSum += freq;
    cf.push(cumSum);
  });

  // Median: Using interpolation formula for grouped data
  const medianClass = cf.findIndex((cumFreq) => cumFreq >= n / 2);
  const medianInterval = intervals[medianClass];
  const [lowerMedian, upperMedian] = medianInterval;
  const classWidth = upperMedian - lowerMedian;
  const cfBefore = medianClass > 0 ? cf[medianClass - 1] : 0;
  const freqMedianClass = frequencies[medianClass];
  const median =
    lowerMedian +
    ((n / 2 - cfBefore) / freqMedianClass) * classWidth;

  // Mode: Class mark of highest frequency
  const maxFreqIdx = frequencies.indexOf(Math.max(...frequencies));
  const modeClassMark = classMarks[maxFreqIdx];

  // Standard Deviation: Measure of spread in grouped data
  const deviationSq = classMarks.map((mark) => Math.pow(mark - mean, 2));
  const fDeviationSq = deviationSq.map((dev, i) => dev * frequencies[i]);
  const variance = fDeviationSq.reduce((a, b) => a + b, 0) / n;
  const sd = Math.sqrt(variance);

  return {
    mean: parseFloat(mean.toFixed(4)),
    median: parseFloat(median.toFixed(4)),
    mode: parseFloat(modeClassMark.toFixed(4)),
    sd: parseFloat(sd.toFixed(4)),
    count: n,
    classMarks: classMarks.map((m) => parseFloat(m.toFixed(2))),
    fx: fx.map((f) => parseFloat(f.toFixed(2))),
    cf,
    deviationSq: deviationSq.map((d) => parseFloat(d.toFixed(4))),
    fDeviationSq: fDeviationSq.map((f) => parseFloat(f.toFixed(2))),
  };
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Convert raw data to Frequency Distribution Table
 * @param {number[]} data - Raw data array
 * @param {number} numClasses - Number of class intervals (default: 5)
 * @returns {Object} - { intervals, frequencies }
 */
export const convertToFDT = (data, numClasses = 5) => {
  if (data.length === 0) return { intervals: [], frequencies: [] };

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min;
  const classWidth = Math.ceil(range / numClasses);

  const intervals = [];
  const frequencies = Array(numClasses).fill(0);

  // Create class intervals
  for (let i = 0; i < numClasses; i++) {
    const lower = min + i * classWidth;
    const upper = lower + classWidth;
    intervals.push([lower, upper]);
  }

  // Distribute data into classes
  data.forEach((value) => {
    for (let i = 0; i < numClasses; i++) {
      const [lower, upper] = intervals[i];
      // For last class, include upper bound
      if (i === numClasses - 1) {
        if (value >= lower && value <= upper) {
          frequencies[i]++;
          break;
        }
      } else {
        if (value >= lower && value < upper) {
          frequencies[i]++;
          break;
        }
      }
    }
  });

  return { intervals, frequencies };
};

/**
 * Calculate quartiles for raw data
 * @param {number[]} data - Raw data array
 * @returns {Object} - { q1, q2, q3, iqr }
 */
export const calculateQuartiles = (data) => {
  if (data.length < 4) return { q1: null, q2: null, q3: null, iqr: null };

  const sorted = [...data].sort((a, b) => a - b);
  const n = sorted.length;

  const q1 = sorted[Math.floor(n / 4)];
  const q2 = sorted[Math.floor(n / 2)];
  const q3 = sorted[Math.floor((3 * n) / 4)];
  const iqr = q3 - q1;

  return {
    q1: parseFloat(q1.toFixed(4)),
    q2: parseFloat(q2.toFixed(4)),
    q3: parseFloat(q3.toFixed(4)),
    iqr: parseFloat(iqr.toFixed(4)),
  };
};

/**
 * Calculate range
 * @param {number[]} data - Data array
 * @returns {number} - Range (max - min)
 */
export const calculateRange = (data) => {
  if (data.length === 0) return 0;
  return Math.max(...data) - Math.min(...data);
};

/**
 * Calculate variance
 * @param {number[]} data - Data array
 * @returns {number} - Variance
 */
export const calculateVariance = (data) => {
  if (data.length === 0) return 0;
  const mean = data.reduce((a, b) => a + b, 0) / data.length;
  const variance =
    data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / data.length;
  return parseFloat(variance.toFixed(4));
};

/**
 * Calculate coefficient of variation (CV)
 * @param {number[]} data - Data array
 * @returns {number} - CV as percentage
 */
export const calculateCV = (data) => {
  const mean = data.reduce((a, b) => a + b, 0) / data.length;
  if (mean === 0) return 0;
  const sd = Math.sqrt(
    data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / data.length
  );
  return parseFloat(((sd / mean) * 100).toFixed(2));
};
