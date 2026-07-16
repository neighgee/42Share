import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number | null): string {
  if (value === null) {
    return "Not provided";
  }

  return new Intl.NumberFormat("en-SG", {
    style: "currency",
    currency: "SGD",
  }).format(value);
}

export function formatRelativeExpiry(expiresAt: string): string {
  const remainingMs = new Date(expiresAt).getTime() - Date.now();

  if (remainingMs <= 0) {
    return "Expired";
  }

  const minutes = Math.ceil(remainingMs / 60000);

  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;

  return rest === 0 ? `${hours} hr` : `${hours} hr ${rest} min`;
}
