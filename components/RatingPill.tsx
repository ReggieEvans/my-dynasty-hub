// /components/RatingPill.tsx
import { cn } from "@/lib/utils";

interface RatingPillProps {
  value: number | undefined;
  size?: "sm" | "md" | "lg";
  variant?: "pill" | "text";
}

export function RatingPill({
  value,
  size = "md",
  variant = "pill",
}: RatingPillProps) {
  const color = getColor(value, variant);

  const sizeClass =
    size === "sm" ? "text-xs" : size === "lg" ? "text-lg" : "text-sm";

  const spacingClass =
    variant === "pill"
      ? size === "sm"
        ? "px-1.5 py-0.5"
        : size === "lg"
          ? "px-3 py-1.5"
          : "px-2 py-1"
      : "";

  return (
    <span
      className={cn(
        "rounded font-semibold inline-block text-center min-w-[2rem]",
        color,
        sizeClass,
        spacingClass,
        variant === "pill" && "text-white",
      )}
    >
      {value ? value.toFixed(0) : "--"}
    </span>
  );
}

// Static, purge-safe Tailwind class mappings
function getColor(value: number | undefined, variant: "pill" | "text") {
  if (value === undefined || value < 65)
    return variant === "pill" ? "bg-red-600" : "text-red-600";
  if (value < 70)
    return variant === "pill" ? "bg-orange-500" : "text-orange-500";
  if (value < 80)
    return variant === "pill" ? "bg-yellow-500" : "text-yellow-500";
  if (value < 90) return variant === "pill" ? "bg-green-500" : "text-green-500";
  return variant === "pill" ? "bg-emerald-500" : "text-emerald-500";
}
