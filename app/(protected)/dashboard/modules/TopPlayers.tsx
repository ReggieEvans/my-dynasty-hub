import { useSelector } from "react-redux";

import { RatingPill } from "@/components/RatingPill";
import { RootState } from "@/store";
import { useGetTopPlayersQuery } from "@/store/api/dashboardApi";

export const TopPlayers = () => {
  const userDynastyTeam = useSelector(
    (state: RootState) => state.dynasty.userDynastyTeam,
  );
  const activeDynasty = useSelector(
    (state: RootState) => state.dynasty.activeDynasty,
  );

  const {
    data: topPlayers,
    isLoading,
    error,
  } = useGetTopPlayersQuery({
    teamId: userDynastyTeam?.id || "",
    dynastyId: activeDynasty?.id || "",
  });

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return <div className="text-destructive">Failed to load roster</div>;

  return (
    <>
      {(topPlayers?.length || 0) > 0 ? (
        <table className="min-w-full text-sm text-left">
          <thead className="bg-background font-bold uppercase text-xs border-b border-border text-muted">
            <tr>
              <th className="py-1.5 px-2 text-left">Player</th>
              <th className="py-1.5 px-2 text-center">Pos</th>
              <th className="py-1.5 px-2 text-center">Class</th>
              <th className="py-1.5 px-2 text-center">Rating</th>
            </tr>
          </thead>
          <tbody>
            {topPlayers?.map((row, idx) => {
              return (
                <tr
                  key={`${row.position_code}-${idx}`}
                  className="even:bg-background border-b border-border"
                >
                  <td className="py-2 px-2 text-left">{row.full_name}</td>
                  <td className="py-2 px-2 text-center">{row.position_code}</td>
                  <td className="py-2 px-2 text-center">{row.class}</td>
                  <td className="py-2 px-2 text-center">
                    <RatingPill value={row.rating_overall} size="sm" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="text-center text-muted opacity-50 font-bold py-8">
          No players found
        </div>
      )}
    </>
  );
};
