import {
  Award,
  BookOpenCheck,
  Calendar,
  NotebookPen,
  Trophy,
  UserPlus,
  Users,
} from "lucide-react";
import { useSelector } from "react-redux";

import { RootState } from "@/store";

export const QuickActions = () => {
  const userDynastyTeam = useSelector(
    (state: RootState) => state.dynasty.userDynastyTeam,
  );

  return (
    <div className="flex flex-col gap-2 p-1 ">
      <button className="btn-action">
        <span
          style={{ backgroundColor: userDynastyTeam?.primary_color }}
          className="bg-background-secondary rounded-md p-2 border border-border"
        >
          <NotebookPen size={16} className="text-foreground" />
        </span>
        <span className="text-sm font-medium">Log Game</span>
      </button>
      <button className="btn-action">
        <span
          style={{ backgroundColor: userDynastyTeam?.primary_color }}
          className="bg-background-secondary rounded-md p-2 border border-border"
        >
          <UserPlus size={16} className="text-foreground" />
        </span>
        <span className="text-sm font-medium">Add Recruit</span>
      </button>
      <button className="btn-action">
        <span
          style={{ backgroundColor: userDynastyTeam?.primary_color }}
          className="bg-background-secondary rounded-md p-2 border border-border"
        >
          <Users size={16} className="text-foreground" />
        </span>
        <span className="text-sm font-medium">Edit Players</span>
      </button>
      <button className="btn-action">
        <span
          style={{ backgroundColor: userDynastyTeam?.primary_color }}
          className="bg-background-secondary rounded-md p-2 border border-border"
        >
          <Trophy size={16} className="text-foreground" />
        </span>
        <span className="text-sm font-medium">Add Trophy</span>
      </button>
      <button className="btn-action">
        <span
          style={{ backgroundColor: userDynastyTeam?.primary_color }}
          className="bg-background-secondary rounded-md p-2 border border-border"
        >
          <Award size={16} className="text-foreground" />
        </span>
        <span className="text-sm font-medium">Add Award</span>
      </button>
      <button className="btn-action">
        <span
          style={{ backgroundColor: userDynastyTeam?.primary_color }}
          className="bg-background-secondary rounded-md p-2 border border-border"
        >
          <BookOpenCheck size={16} className="text-foreground" />
        </span>
        <span className="text-sm font-medium">Break Record</span>
      </button>
      <div className="flex flex-col">
        <div className="w-full h-[1px] my-2 bg-border" />
      </div>
      <button className="btn-action">
        <span
          style={{ backgroundColor: userDynastyTeam?.primary_color }}
          className="bg-background-secondary rounded-md p-2 border border-border"
        >
          <Calendar size={16} className="text-foreground" />
        </span>
        <span className="text-sm font-medium">Advance Season</span>
      </button>
    </div>
  );
};
