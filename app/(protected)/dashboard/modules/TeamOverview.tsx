"use client";

import clsx from "clsx";
import { useState } from "react";
import { useSelector } from "react-redux";

import Loading from "@/components/Loading";
import { RatingPill } from "@/components/RatingPill";
import { Switch } from "@/components/ui/switch";
import { RootState } from "@/store";
import { useGetTeamOverviewQuery } from "@/store/api/dashboardApi";
import { TeamOverviewRow } from "@/types/TeamOverview";

import { sumRows } from "./teamOverviewUtils";

export const TeamOverview = () => {
  const [selectedSide, setSelectedSide] = useState<"offense" | "defense">(
    "offense",
  );

  const activeDynasty = useSelector(
    (state: RootState) => state.dynasty.activeDynasty,
  );
  const userDynastyTeam = useSelector(
    (state: RootState) => state.dynasty.userDynastyTeam,
  );

  const {
    data: rosterSummary,
    isLoading,
    error,
  } = useGetTeamOverviewQuery(
    {
      teamId: userDynastyTeam?.id || "",
      dynastyId: activeDynasty?.id || "",
      startYear: activeDynasty?.start_year || 0, // TODO: get current season year
      includeRecruiting: true,
    },
    {
      skip: !userDynastyTeam || !activeDynasty,
    },
  );

  if (isLoading) return <Loading text="Loading roster..." />;
  if (error)
    return <div className="text-destructive">Failed to load roster</div>;

  const normalized = (rosterSummary?.map((r) => ({
    ...r,
    side: r.side.toLowerCase() as "offense" | "defense" | "total",
  })) ?? []) as TeamOverviewRow[];

  const offenseRows = normalized?.filter((r) => r.side === "offense") ?? [];
  const defenseRows = normalized?.filter((r) => r.side === "defense") ?? [];
  const activeRows = selectedSide === "offense" ? offenseRows : defenseRows;
  const topSummary = sumRows(activeRows);
  const totalSummary = sumRows(normalized ?? []);

  const displayedRows = [...activeRows, topSummary, totalSummary];

  return (
    <div className="overflow-x-auto">
      <div className="flex items-center justify-between px-3 pt-2 pb-1 border-b border-border">
        <div className="font-bold uppercase text-sm">
          {selectedSide === "offense"
            ? "Offensive Breakdown"
            : "Defensive Breakdown"}
        </div>
        <Switch
          id="airplane-mode"
          checked={selectedSide === "offense"}
          onCheckedChange={() =>
            setSelectedSide(selectedSide === "offense" ? "defense" : "offense")
          }
          style={
            {
              "--tw-bg-opacity": "1",
              backgroundColor: userDynastyTeam?.primary_color, // e.g. '#e11d48'
            } as React.CSSProperties
          }
        />
      </div>
      <table className="min-w-full text-sm text-left">
        <thead className="bg-background font-bold uppercase text-xs border-b border-border text-muted">
          <tr>
            <th className="flex items-center justify-between px-4 py-2">
              <div className="flex items-center gap-2">
                <div className="font-bold uppercase">Position</div>
              </div>
            </th>
            <th className="px-2 py-2 text-center">FR</th>
            <th className="px-2 py-2 text-center">SO</th>
            <th className="px-2 py-2 text-center">JR</th>
            <th className="px-2 py-2 text-center">SR</th>
            <th className="px-2 py-2 text-center">Total</th>
            <th className="px-2 py-2 text-center">Rating</th>
            {false && (
              <>
                <th className="px-2 py-2 text-center">Targeted</th>
                <th className="px-2 py-2 text-center">Committed</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {displayedRows.map((row, idx) => {
            const isTopSummary =
              row.position_code === "TOTAL" && idx < displayedRows.length - 1;
            const isBottomSummary =
              row.position_code === "TOTAL" && idx === displayedRows.length - 1;

            return (
              <tr
                key={`${row.position_code}-${idx}`}
                className={clsx(
                  "even:bg-background border-b border-border",
                  isTopSummary && "bg-muted/70 font-semibold",
                  isBottomSummary &&
                    "bg-accent font-bold text-accent-foreground border-t",
                )}
              >
                <td className="px-4 py-2 font-medium uppercase">
                  {isTopSummary
                    ? selectedSide.toUpperCase()
                    : isBottomSummary
                      ? "TOTAL"
                      : row.position_code}
                </td>
                <td className="px-2 text-center">{row.freshmen}</td>
                <td className="px-2 text-center">{row.sophomores}</td>
                <td className="px-2 text-center">{row.juniors}</td>
                <td className="px-2 text-center">{row.seniors}</td>
                <td className="px-2 text-center">{row.total}</td>
                <td className="px-2 text-center">
                  {row.total > 0 ? (
                    <span className="inline-flex items-center rounded text-xs font-medium text-foreground">
                      <RatingPill value={row.avg_rating} size="sm" />
                    </span>
                  ) : (
                    "-"
                  )}
                </td>
                {false && (
                  <>
                    <td className="px-2 text-center">
                      {row.targeted_recruits}
                    </td>
                    <td className="px-2 text-center">
                      {row.committed_recruits}
                    </td>
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
