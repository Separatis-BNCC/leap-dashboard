import { useEffect, useState } from "react";

const LOAD_TIME_MS = 5000;
const SWAP_KEY = "[";

/**
 * Simulates a query
 * @returns
 */
export default function useFakeQuery<T>(
  fakeData: T[],
  options?: {
    stall?: boolean;
    swapOnKeyPress?: boolean;
  }
) {
  const [isPending, setIsPending] = useState(true);
  const [data, setData] = useState<T[] | undefined>(undefined);

  // Toggle state on key press
  useEffect(() => {
    if (!options?.swapOnKeyPress) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === SWAP_KEY) {
        setIsPending((cur) => !cur);
        setData((current) => (current ? undefined : fakeData));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [options]);

  useEffect(() => {
    // Purposefully preseve the data in a pending state to test skeleton ui.
    if (options?.stall) return;
    const timeout = setTimeout(() => {
      setData(fakeData);
      setIsPending(false);
    }, LOAD_TIME_MS);

    return () => clearTimeout(timeout);
  }, [fakeData, options]);

  return { isPending, data };
}
