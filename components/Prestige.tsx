import { Star, StarHalf } from "lucide-react";

type PrestigeProps = {
  value: number | undefined;
  textValue?: boolean;
  size?: "sm" | "md" | "lg";
};

export default function Prestige({
  value,
  textValue = false,
  size = "md",
}: PrestigeProps) {
  if (value === undefined) return null;

  const sizeMap = {
    sm: 12,
    md: 16,
    lg: 20,
  };

  const iconSize = sizeMap[size];
  const stars = [];

  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.25 && value % 1 < 0.75;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  // Full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star
        key={`full-${i}`}
        size={iconSize}
        fill="#ffd700"
        className="text-[#ffd700]"
      />,
    );
  }

  // Half star
  if (hasHalfStar) {
    stars.push(
      <StarHalf
        key="half"
        size={iconSize}
        fill="#ffd700"
        className="text-[#ffd700]"
      />,
    );
  }

  // Empty stars
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Star
        key={`empty-${i}`}
        size={iconSize}
        fill="none"
        className="text-[#ffd700]"
      />,
    );
  }

  return (
    <div className="flex items-center gap-1">
      {stars}
      {textValue && <span className="text-xs ml-1 text-muted">{value}</span>}
    </div>
  );
}
