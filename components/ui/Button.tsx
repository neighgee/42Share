import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-12 items-center justify-center rounded-xl px-6 text-base font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-45",
        variant === "primary" &&
          "bg-brand text-white shadow-sm hover:-translate-y-0.5 hover:bg-brand-dark hover:shadow-md",
        variant === "secondary" &&
          "border border-border bg-white text-stone-800 hover:border-cyan-200 hover:bg-brand-soft",
        variant === "danger" && "bg-danger text-white hover:brightness-95",
        className,
      )}
      {...props}
    />
  );
}
