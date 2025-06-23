export function useRatingColor() {
  return (rating: number | undefined, type: "text" | "bg" = "text"): string => {
    if (!rating) return "";

    const colors = {
      text: {
        bad: "text-red-600",
        weak: "text-orange-500",
        decent: "text-yellow-500",
        good: "text-green-500",
        elite: "text-emerald-500",
      },
      bg: {
        bad: "bg-red-600",
        weak: "bg-orange-500",
        decent: "bg-yellow-500",
        good: "bg-green-500",
        elite: "bg-emerald-500",
      },
    };

    if (rating === undefined || rating < 60) return colors[type].bad;
    if (rating < 70) return colors[type].weak;
    if (rating < 80) return colors[type].decent;
    if (rating < 90) return colors[type].good;
    return colors[type].elite;
  };
}
