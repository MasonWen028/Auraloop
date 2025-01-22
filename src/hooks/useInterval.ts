import { useEffect, useRef, useCallback } from "react";

/**
 * Custom hook for managing intervals with pause and resume functionality.
 * @param callback - Function to be executed at each interval.
 * @param delay - Interval delay in milliseconds. Pass `null` to pause the interval.
 * @param immediate - Whether to execute the callback immediately upon starting.
 * @returns An object with `pause` and `resume` functions to control the interval.
 */
export const useInterval = (
  callback: () => void,
  delay: number | null,
  immediate: boolean = false
) => {
  const savedCallback = useRef<() => void>();
  const intervalId = useRef<NodeJS.Timer | null>(null);

  // Save the latest callback to avoid stale references.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Function to clear the current interval.
  const clear = useCallback(() => {
    if (intervalId.current) {
      clearInterval(intervalId.current as NodeJS.Timeout);
      intervalId.current = null;
    }
  }, []);

  // Function to start the interval.
  const start = useCallback(() => {
    if (delay !== null && !intervalId.current) {
      if (immediate && savedCallback.current) {
        savedCallback.current();
      }
      intervalId.current = setInterval(() => {
        if (savedCallback.current) savedCallback.current();
      }, delay);
    }
  }, [delay, immediate]);

  // Start the interval when the hook is mounted or delay changes.
  useEffect(() => {
    start();
    return clear; // Cleanup on unmount or delay change.
  }, [start, clear]);

  return {
    pause: clear,
    resume: start,
  };
};
