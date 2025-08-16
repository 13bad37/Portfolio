import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '../../hooks/useAnimation';
import { Play, RotateCcw, Pause, GitBranch } from 'lucide-react';

type Algorithm = 'bubble' | 'insertion' | 'selection' | 'merge' | 'quick';

interface Step {
  type: 'compare' | 'swap' | 'overwrite' | 'pivot' | 'merge-range';
  indices: number[];
  arraySnapshot: number[];
}

const DEFAULT_ARRAY = [38, 7, 23, 18, 52, 11, 9, 41, 2, 29, 14, 6];

function generateRandomArray(length: number): number[] {
  return Array.from({ length }, () => Math.floor(Math.random() * 99) + 1);
}

function clone(arr: number[]): number[] {
  return arr.slice();
}

function createBubbleSortSteps(input: number[]): Step[] {
  const arr = clone(input);
  const steps: Step[] = [];
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      steps.push({ type: 'compare', indices: [j, j + 1], arraySnapshot: clone(arr) });
      if (arr[j] > arr[j + 1]) {
        [ arr[j], arr[j + 1] ] = [ arr[j + 1], arr[j] ];
        steps.push({ type: 'swap', indices: [j, j + 1], arraySnapshot: clone(arr) });
      }
    }
  }
  return steps;
}

function createInsertionSortSteps(input: number[]): Step[] {
  const arr = clone(input);
  const steps: Step[] = [];
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      steps.push({ type: 'compare', indices: [j, j + 1], arraySnapshot: clone(arr) });
      arr[j + 1] = arr[j];
      steps.push({ type: 'overwrite', indices: [j + 1], arraySnapshot: clone(arr) });
      j--;
    }
    arr[j + 1] = key;
    steps.push({ type: 'overwrite', indices: [j + 1], arraySnapshot: clone(arr) });
  }
  return steps;
}

function createSelectionSortSteps(input: number[]): Step[] {
  const arr = clone(input);
  const steps: Step[] = [];
  for (let i = 0; i < arr.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      steps.push({ type: 'compare', indices: [minIdx, j], arraySnapshot: clone(arr) });
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      [ arr[i], arr[minIdx] ] = [ arr[minIdx], arr[i] ];
      steps.push({ type: 'swap', indices: [i, minIdx], arraySnapshot: clone(arr) });
    }
  }
  return steps;
}

function createMergeSortSteps(input: number[]): Step[] {
  const steps: Step[] = [];
  const arr = clone(input);

  function mergeSort(start: number, end: number) {
    if (start >= end) return;
    const mid = Math.floor((start + end) / 2);
    mergeSort(start, mid);
    mergeSort(mid + 1, end);
    // merge
    const temp = arr.slice(start, end + 1);
    let i = 0, j = mid - start + 1, k = start;
    while (i <= mid - start && j <= end - start) {
      steps.push({ type: 'compare', indices: [k, k], arraySnapshot: clone(arr) });
      if (temp[i] <= temp[j]) {
        arr[k] = temp[i++];
      } else {
        arr[k] = temp[j++];
      }
      steps.push({ type: 'overwrite', indices: [k], arraySnapshot: clone(arr) });
      k++;
    }
    while (i <= mid - start) {
      arr[k] = temp[i++];
      steps.push({ type: 'overwrite', indices: [k], arraySnapshot: clone(arr) });
      k++;
    }
    while (j <= end - start) {
      arr[k] = temp[j++];
      steps.push({ type: 'overwrite', indices: [k], arraySnapshot: clone(arr) });
      k++;
    }
  }

  mergeSort(0, arr.length - 1);
  return steps;
}

function createQuickSortSteps(input: number[]): Step[] {
  const steps: Step[] = [];
  const arr = clone(input);

  function partition(low: number, high: number): number {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      steps.push({ type: 'compare', indices: [j, high], arraySnapshot: clone(arr) });
      if (arr[j] < pivot) {
        i++;
        [ arr[i], arr[j] ] = [ arr[j], arr[i] ];
        steps.push({ type: 'swap', indices: [i, j], arraySnapshot: clone(arr) });
      }
    }
    [ arr[i + 1], arr[high] ] = [ arr[high], arr[i + 1] ];
    steps.push({ type: 'swap', indices: [i + 1, high], arraySnapshot: clone(arr) });
    return i + 1;
  }

  function quickSort(low: number, high: number) {
    if (low < high) {
      const p = partition(low, high);
      quickSort(low, p - 1);
      quickSort(p + 1, high);
    }
  }

  quickSort(0, arr.length - 1);
  return steps;
}

function getStepsForAlgorithm(algorithm: Algorithm, array: number[]): Step[] {
  switch (algorithm) {
    case 'bubble':
      return createBubbleSortSteps(array);
    case 'insertion':
      return createInsertionSortSteps(array);
    case 'selection':
      return createSelectionSortSteps(array);
    case 'merge':
      return createMergeSortSteps(array);
    case 'quick':
      return createQuickSortSteps(array);
    default:
      return [];
  }
}

function getPseudocode(algorithm: Algorithm, language: 'python' | 'javascript' | 'csharp'): string {
  const indent = (n: number) => '  '.repeat(n);
  if (language === 'python') {
    switch (algorithm) {
      case 'bubble':
        return [
          "def bubble_sort(arr):",
          indent(1) + "n = len(arr)",
          indent(1) + "for i in range(n-1):",
          indent(2) + "for j in range(n-i-1):",
          indent(3) + "if arr[j] > arr[j+1]:",
          indent(4) + "arr[j], arr[j+1] = arr[j+1], arr[j]",
        ].join('\n');
      case 'insertion':
        return [
          "def insertion_sort(arr):",
          indent(1) + "for i in range(1, len(arr)):",
          indent(2) + "key = arr[i]",
          indent(2) + "j = i - 1",
          indent(2) + "while j >= 0 and arr[j] > key:",
          indent(3) + "arr[j+1] = arr[j]",
          indent(3) + "j -= 1",
          indent(2) + "arr[j+1] = key",
        ].join('\n');
      case 'selection':
        return [
          "def selection_sort(arr):",
          indent(1) + "for i in range(len(arr)-1):",
          indent(2) + "min_idx = i",
          indent(2) + "for j in range(i+1, len(arr)):",
          indent(3) + "if arr[j] < arr[min_idx]:",
          indent(4) + "min_idx = j",
          indent(2) + "arr[i], arr[min_idx] = arr[min_idx], arr[i]",
        ].join('\n');
      case 'merge':
        return [
          "def merge_sort(arr):",
          indent(1) + "if len(arr) <= 1: return arr",
          indent(1) + "mid = len(arr)//2",
          indent(1) + "left = merge_sort(arr[:mid])",
          indent(1) + "right = merge_sort(arr[mid:])",
          indent(1) + "return merge(left, right)",
        ].join('\n');
      case 'quick':
        return [
          "def quick_sort(arr):",
          indent(1) + "if len(arr) <= 1: return arr",
          indent(1) + "pivot = arr[-1]",
          indent(1) + "less = [x for x in arr[:-1] if x < pivot]",
          indent(1) + "greater = [x for x in arr[:-1] if x >= pivot]",
          indent(1) + "return quick_sort(less) + [pivot] + quick_sort(greater)",
        ].join('\n');
    }
  }

  if (language === 'javascript') {
    return getPseudocode(algorithm, 'python')
      .replace(/def /g, 'function ')
      .replace(/:/g, ' {')
      .replace(/return /g, 'return ')
      + '\n}'.repeat(3);
  }

  // Simplified C#-style pseudocode
  return [
    '// C# pseudocode',
    '// See Python block for detailed logic'
  ].join('\n');
}

// Algorithm complexity helper functions
function getTimeComplexity(algorithm: Algorithm): string {
  switch (algorithm) {
    case 'bubble': return 'O(n²)';
    case 'insertion': return 'O(n²)';
    case 'selection': return 'O(n²)';
    case 'merge': return 'O(n log n)';
    case 'quick': return 'O(n log n) average, O(n²) worst';
    default: return 'O(n²)';
  }
}

function getSpaceComplexity(algorithm: Algorithm): string {
  switch (algorithm) {
    case 'bubble': return 'O(1)';
    case 'insertion': return 'O(1)';
    case 'selection': return 'O(1)';
    case 'merge': return 'O(n)';
    case 'quick': return 'O(log n) average';
    default: return 'O(1)';
  }
}

function getStability(algorithm: Algorithm): string {
  switch (algorithm) {
    case 'bubble': return 'Stable';
    case 'insertion': return 'Stable';
    case 'selection': return 'Unstable';
    case 'merge': return 'Stable';
    case 'quick': return 'Unstable';
    default: return 'Varies';
  }
}

const BAR_COLORS = {
  default: 'bg-primary-500',
  compare: 'bg-amber-400',
  swap: 'bg-rose-500',
  overwrite: 'bg-emerald-500',
  pivot: 'bg-cyan-400',
};

const Showcase: React.FC = () => {
  const [algorithm, setAlgorithm] = useState<Algorithm>('quick');
  const [array, setArray] = useState<number[]>(DEFAULT_ARRAY);
  const [language, setLanguage] = useState<'python' | 'javascript' | 'csharp'>('python');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMs, setSpeedMs] = useState(400);
  const [stepIndex, setStepIndex] = useState(0);

  const { ref: titleRef, controls: titleAnim } = fadeIn('up');
  const { ref: gridRef, controls: gridAnim } = fadeIn('up', 0.15);

  const steps = useMemo(() => getStepsForAlgorithm(algorithm, array), [algorithm, array]);

  useEffect(() => {
    if (!isPlaying) return;
    if (stepIndex >= steps.length) {
      setIsPlaying(false);
      return;
    }
    const id = window.setTimeout(() => setStepIndex((i) => i + 1), speedMs);
    return () => window.clearTimeout(id);
  }, [isPlaying, stepIndex, steps.length, speedMs]);

  const currentArray = useMemo(() => {
    if (stepIndex === 0) return array;
    const idx = Math.min(stepIndex - 1, steps.length - 1);
    return steps[idx]?.arraySnapshot ?? array;
  }, [array, steps, stepIndex]);

  function play() { setIsPlaying(true); }
  function pause() { setIsPlaying(false); }
  function reset() { setIsPlaying(false); setStepIndex(0); }
  function shuffle() { setArray(generateRandomArray(12)); setStepIndex(0); }

  return (
    <section id="showcase" className="py-20 relative">
      <div className="absolute inset-0 bg-dark-600 opacity-50" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div ref={titleRef as React.RefObject<HTMLDivElement>} animate={titleAnim} className="flex flex-col items-center mb-12 text-center">
          <span className="text-primary-500 font-mono text-sm uppercase tracking-wider mb-2">Interactive Showcase</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Algorithm Visualizer</h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-4" />
          <p className="max-w-2xl text-gray-300">Explore multiple sorting algorithms step-by-step with live visualization and pseudocode in different languages.</p>
        </motion.div>

        {/* Enhanced Controls with Mobile Optimization */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center mb-8">
          {/* Algorithm Selection */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <select
              value={algorithm}
              onChange={(e) => { setAlgorithm(e.target.value as Algorithm); reset(); }}
              className="bg-dark-700 text-white px-4 py-3 rounded-md border border-dark-500 touch-target text-responsive"
              aria-label="Choose algorithm"
            >
              <option value="bubble">Bubble Sort</option>
              <option value="insertion">Insertion Sort</option>
              <option value="selection">Selection Sort</option>
              <option value="merge">Merge Sort</option>
              <option value="quick">Quick Sort</option>
            </select>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Algorithm)}
              className="bg-dark-700 text-white px-4 py-3 rounded-md border border-dark-500 touch-target text-responsive"
              aria-label="Choose language for pseudocode"
            >
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
              <option value="csharp">C#</option>
            </select>
          </div>

          {/* Speed Control */}
          <div className="flex flex-col gap-2 w-full sm:w-auto">
            <label className="text-sm text-gray-400 text-center sm:text-left">Speed: {speedMs}ms</label>
            <input
              type="range"
              min={100}
              max={1000}
              step={50}
              value={speedMs}
              onChange={(e) => setSpeedMs(Number(e.target.value))}
              className="w-full sm:w-48 touch-target"
              aria-label="Animation speed control"
            />
          </div>

          {/* Control Buttons */}
          <div className="flex gap-2 justify-center sm:justify-start w-full sm:w-auto">
            <motion.button 
              onClick={() => (isPlaying ? pause() : play())} 
              whileHover={{ y: -2 }} 
              whileTap={{ scale: 0.95 }}
              className="px-4 py-3 rounded-lg bg-primary-500 text-white flex items-center gap-2 touch-target text-responsive"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              <span className="hidden sm:inline">{isPlaying ? 'Pause' : 'Play'}</span>
            </motion.button>
            <motion.button 
              onClick={reset} 
              whileHover={{ y: -2 }} 
              whileTap={{ scale: 0.95 }}
              className="px-4 py-3 rounded-lg bg-dark-600 text-white flex items-center gap-2 border border-dark-400 touch-target text-responsive"
            >
              <RotateCcw size={18} />
              <span className="hidden sm:inline">Reset</span>
            </motion.button>
            <motion.button 
              onClick={shuffle} 
              whileHover={{ y: -2 }} 
              whileTap={{ scale: 0.95 }}
              className="px-4 py-3 rounded-lg bg-dark-600 text-white flex items-center gap-2 border border-dark-400 touch-target text-responsive"
            >
              <GitBranch size={18} />
              <span className="hidden sm:inline">Shuffle</span>
            </motion.button>
          </div>
        </div>

        {/* Enhanced Visualization + Pseudocode with Mobile Optimization */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6" ref={gridRef as React.RefObject<HTMLDivElement>}>
          {/* Algorithm Visualization */}
          <motion.div animate={gridAnim} className="xl:col-span-7 bg-dark-700 rounded-xl border border-dark-500 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">{algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} Sort Visualization</h3>
              <div className="text-sm text-gray-400">
                Step {Math.min(stepIndex, steps.length)} / {steps.length}
              </div>
            </div>
            
            {/* Enhanced Bar Chart */}
            <div className="h-64 sm:h-80 lg:h-96 flex items-end gap-1 p-4 bg-dark-800 rounded-lg">
              {currentArray.map((value, idx) => {
                const step = steps[Math.min(stepIndex, steps.length - 1)];
                const isCompare = step?.type === 'compare' && step.indices.includes(idx);
                const isSwap = step?.type === 'swap' && step.indices.includes(idx);
                const isOverwrite = step?.type === 'overwrite' && step.indices.includes(idx);
                const barClass = isSwap ? BAR_COLORS.swap : isOverwrite ? BAR_COLORS.overwrite : isCompare ? BAR_COLORS.compare : BAR_COLORS.default;
                
                return (
                  <motion.div 
                    key={idx} 
                    className={`flex-1 ${barClass} rounded-t-sm transition-all duration-300 ease-out relative group`} 
                    style={{ height: `${Math.max(4, value) * 2}px` }}
                    whileHover={{ scale: 1.05 }}
                    title={`Value: ${value}`}
                  >
                    {/* Value label on hover */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-dark-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      {value}
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="w-full bg-dark-600 rounded-full h-2">
                <motion.div 
                  className="bg-primary-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(stepIndex / Math.max(steps.length, 1)) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </motion.div>

          {/* Enhanced Pseudocode Panel */}
          <motion.div animate={gridAnim} className="xl:col-span-5 bg-dark-700 rounded-xl border border-dark-500 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Pseudocode</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 bg-dark-600 px-2 py-1 rounded">{language.toUpperCase()}</span>
                <span className="text-xs text-gray-500">{algorithm} sort</span>
              </div>
            </div>
            
            {/* Syntax Highlighted Pseudocode */}
            <div className="bg-dark-800 rounded-lg p-4 overflow-auto max-h-96">
              <pre className="text-gray-200 text-sm sm:text-base whitespace-pre-wrap leading-relaxed font-mono">
                <code className="language-pseudocode">
                  {getPseudocode(algorithm, language)}
                </code>
              </pre>
            </div>
            
            {/* Algorithm Info */}
            <div className="mt-4 p-3 bg-dark-600 rounded-lg">
              <div className="text-xs text-gray-400 space-y-1">
                <div><strong>Time Complexity:</strong> {getTimeComplexity(algorithm)}</div>
                <div><strong>Space Complexity:</strong> {getSpaceComplexity(algorithm)}</div>
                <div><strong>Stability:</strong> {getStability(algorithm)}</div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div className="mt-10 bg-dark-600 p-6 rounded-xl border border-dark-500 text-gray-300" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h3 className="text-lg font-bold mb-3 text-white">What You're Seeing</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Stable animation of algorithm steps with adjustable playback speed.</li>
            <li>Highlighted operations: comparisons, swaps, and overwrites.</li>
            <li>Multiple algorithms and language-flavored pseudocode.</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default Showcase;

