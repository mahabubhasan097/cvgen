/**
 * Development-only logger utility
 * Only logs in development environment
 */

/* eslint-disable no-console, @typescript-eslint/no-explicit-any */

export const logger = {
  error: (message: string, ...args: unknown[]) => {
    if (process.env.NODE_ENV === 'development') {
      console.error(message, ...args);
    }
  },
  warn: (message: string, ...args: unknown[]) => {
    if (process.env.NODE_ENV === 'development') {
      console.warn(message, ...args);
    }
  },
  info: (message: string, ...args: unknown[]) => {
    if (process.env.NODE_ENV === 'development') {
      console.info(message, ...args);
    }
  },
  log: (message: string, ...args: unknown[]) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(message, ...args);
    }
  },
};
