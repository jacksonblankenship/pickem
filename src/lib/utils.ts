import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { MINIMUM_LOADING_DELAY_MS } from './constants';
import { env } from './env';

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

/**
 * Standard minimum loading delay for better UX
 * @returns A promise that resolves after the given number of milliseconds
 */
export function minimumLoadingDelay() {
  return waitFor(MINIMUM_LOADING_DELAY_MS);
}

/**
 * Returns the URL of the app depending on the environment
 * @returns The URL of the app
 */
export function getAppUrl() {
  if (env.VITE_VERCEL_ENV === 'development') return `http://localhost:5173`;

  if (env.VITE_VERCEL_ENV === 'preview')
    return `https://${env.VITE_VERCEL_URL}`;

  return `https://${env.VITE_VERCEL_PROJECT_PRODUCTION_URL}`;
}
