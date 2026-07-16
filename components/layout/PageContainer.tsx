import type { ReactNode } from "react";

export function PageContainer({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[1600px] px-5 py-5 sm:px-8 sm:py-6 lg:px-12 lg:py-5">
      {children}
    </main>
  );
}
