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

const role = ["admin", "praeto", "aktivis", "member"] as const;
export function getRole(input: number) {
  return role[input - 1];
}

const region = ["Kemanggisan", "Alam Sutera", "Bandung", "Malang"] as const;
export function getRegion(input: number) {
  return region[input - 1];
}

export function capitalize(str: string) {
  return `${str[0].toUpperCase()}${str.slice(1, str.length)}`;
}

export function toSorted<T>(arr: T[], compareFn: (a: T, b: T) => number) {
  const sortedArr = arr;
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
