import Image from "next/image";
import { cn } from "@/lib/utils";

const sizes = {
  small: {
    badge: "h-8 w-8",
    image: 30,
    text: "text-xl",
    gap: "gap-2",
  },
  medium: {
    badge: "h-11 w-11",
    image: 42,
    text: "text-2xl",
    gap: "gap-3",
  },
  large: {
    badge: "h-14 w-14",
    image: 54,
    text: "text-4xl",
    gap: "gap-3",
  },
  xlarge: {
    badge: "h-16 w-16",
    image: 62,
    text: "text-5xl",
    gap: "gap-4",
  },
} as const;

export function BrandLogo({
  size = "small",
  className,
}: {
  size?: keyof typeof sizes;
  className?: string;
}) {
  const styles = sizes[size];

  return (
    <span
      className={cn(
        "inline-flex items-center font-bold tracking-tight text-stone-900",
        styles.gap,
        styles.text,
        className,
      )}
    >
      <span className={cn("grid shrink-0 place-items-center", styles.badge)}>
        <Image
          src="/images/42-logo.webp"
          alt="42"
          width={styles.image}
          height={styles.image}
          className="brightness-0"
        />
      </span>
      <span>Share</span>
    </span>
  );
}
