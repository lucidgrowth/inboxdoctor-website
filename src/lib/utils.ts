import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateRandomAlias = () => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `health-test-${random}-${timestamp}`;
};
