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

export function capitalize(str: string) {
  return `${str[0].toUpperCase()}${str.slice(1, str.length)}`;
}
