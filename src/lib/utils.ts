import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateText(text: string, length: number) {
  return text.length > length ? text.slice(0, length) + "..." : text;
}

export function formatDate(date: Date): string {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    // weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return formatter.format(date);
}

export function getNestedValue<T>(obj: T, path: string): unknown {
  return path.split(".").reduce((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj as unknown);
}

export function dateStringToTimestamp(date: string) {
  return new Date(date).getTime();
}

export function capitalize(str: string) {
  return `${str[0].toUpperCase()}${str.slice(1, str.length)}`;
}

export function toSorted<T>(arr: T[], compareFn: (a: T, b: T) => number) {
  const sortedArr = arr.slice();
  sortedArr.sort(compareFn);
  return sortedArr;
}

/**
 * Replaces non numerical and alphabetical characters with "-" except for "." which gets delete entirely.
 */
export function sluggify(input: string) {
  return input
    .replace(/\./g, "")
    .replace(/[^a-zA-Z0-9]/g, "-")
    .toLowerCase();
}

export function checkIfAExistsInB<T>(A: T[], B: T[]) {
  const hashTableB = new Set(B);
  return A.every((item) => hashTableB.has(item));
}

export function isNumber(str: string) {
  const regex = /^[+-]?\d+(\.\d+)?$/;
  return regex.test(str);
}
