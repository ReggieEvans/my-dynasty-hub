"use client";

import clsx from "clsx";
import { useState } from "react";

import Loading from "@/components/Loading";
import { useGetTeamOverviewQuery } from "@/store/api/teamOverviewApi";
import { TeamOverviewRow } from "@/types/TeamOverview";

import { sumRows } from "./TeamOverviewUtils";

export const TeamOverview = ({
  teamColor,
  activeDynasty,
  teamId,
}: {
  teamColor: string;
  activeDynasty: any;
  teamId: string;
}) => {
  const [selectedSide, setSelectedSide] = useState<"offense" | "defense">(
    "offense",
  );

  const {
    data: rosterSummary,
    isLoading,
    error,
  } = useGetTeamOverviewQuery({
    teamId: teamId,
    dynastyId: activeDynasty.id,
    startYear: activeDynasty.start_year, // TODO: get current season year
    includeRecruiting: true,
  });

  if (isLoading) return <Loading text="Loading roster..." />;
  if (error)
    return <div className="text-destructive">Failed to load roster</div>;

  console.log(rosterSummary);

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
    <div className="overflow-x-auto border rounded-lg">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-muted">
          <tr>
            <th className="px-4 py-2">Position</th>
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
                  isTopSummary && "bg-muted/70 font-semibold",
                  isBottomSummary &&
                    "bg-accent font-bold text-accent-foreground border-t",
                )}
              >
                <td className="px-4 py-2 font-medium uppercase">
                  {isTopSummary
                    ? "TOTAL (Visible Side)"
                    : isBottomSummary
                      ? "TOTAL (ALL)"
                      : row.position_code}
                </td>
                <td className="px-2 text-center">{row.freshmen}</td>
                <td className="px-2 text-center">{row.sophomores}</td>
                <td className="px-2 text-center">{row.juniors}</td>
                <td className="px-2 text-center">{row.seniors}</td>
                <td className="px-2 text-center">{row.total}</td>
                <td className="px-2 text-center">
                  {row.total > 0 ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-muted text-muted-foreground">
                      {row.avg_rating.toFixed(1)}
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
