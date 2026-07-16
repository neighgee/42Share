"use client";

import { useEffect, useState } from "react";
import { formatRelativeExpiry } from "@/lib/utils";

export function CountdownBadge({ expiresAt }: { expiresAt: string }) {
  const [label, setLabel] = useState(() => formatRelativeExpiry(expiresAt));

  useEffect(() => {
    const interval = window.setInterval(() => {
      setLabel(formatRelativeExpiry(expiresAt));
    }, 60000);

    return () => window.clearInterval(interval);
  }, [expiresAt]);

  return <span className="font-semibold text-brand-dark">{label}</span>;
}
