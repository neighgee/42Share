import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type FieldProps = {
  label: string;
  required?: boolean;
  children: ReactNode;
  error?: string;
};

export function Field({ label, required, children, error }: FieldProps) {
  return (
    <label className="grid gap-2.5 text-base">
      <span className="font-medium text-stone-800">
        {label}
        {required ? " *" : ""}
      </span>
      {children}
      {error ? <span className="text-sm text-danger">{error}</span> : null}
    </label>
  );
}

export function inputClassName(className?: string) {
  return cn(
    "h-14 w-full rounded-xl border border-border bg-white px-4 text-base text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100",
    className,
  );
}
