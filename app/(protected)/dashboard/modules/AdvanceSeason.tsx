import { Calendar } from "lucide-react";
import { useSelector } from "react-redux";

import { RootState } from "@/store";

export const AdvanceSeason = () => {
  const userDynastyTeam = useSelector(
    (state: RootState) => state.dynasty.userDynastyTeam,
  );

  return (
    <button className="btn-action">
      <span
        style={{ backgroundColor: userDynastyTeam?.primary_color }}
        className="bg-background-secondary rounded-md p-2 border border-border"
      >
        <Calendar size={16} className="text-foreground" />
      </span>
      <span className="text-sm font-medium">Advance Season</span>
    </button>
  );
};
