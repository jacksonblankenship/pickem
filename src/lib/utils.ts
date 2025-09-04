import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats odds like -110 (or +110)
 */
export const oddsFormatter = new Intl.NumberFormat('en-US', {
  signDisplay: 'always',
});

/**
 * Formats point totals like 42.5
 */
export const pointTotalFormatter = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

/**
 * Formats spreads like -3.5 (or +3.5)
 */
export const spreadFormatter = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
  signDisplay: 'always',
});

/**
 * Waits for a given number of milliseconds
 * @param ms - The number of milliseconds to wait
 * @returns A promise that resolves after the given number of milliseconds
 */
export function waitFor(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
