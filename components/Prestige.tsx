import { FaStar, FaStarHalf } from "react-icons/fa6";

export default function Prestige({ value }: { value: number | undefined }) {
  if (!value) return null;

  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.25 && value % 1 < 0.75;

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`full-${i}`} className="text-yellow-500" />);
  }

  if (hasHalfStar) {
    stars.push(<FaStarHalf key="half" className="text-yellow-500" />);
  }

  return (
    <div className="flex items-center gap-1">
      {stars} <span className="text-xs ml-1 text-muted">{value}</span>
    </div>
  );
}
