import { TeamOverviewRow } from "@/types/teamOverview";

export function sumRows(rows: TeamOverviewRow[]): TeamOverviewRow {
  return {
    position_id: -1,
    position_code: "TOTAL",
    side: "total",
    freshmen: rows.reduce((sum, r) => sum + r.freshmen, 0),
    sophomores: rows.reduce((sum, r) => sum + r.sophomores, 0),
    juniors: rows.reduce((sum, r) => sum + r.juniors, 0),
    seniors: rows.reduce((sum, r) => sum + r.seniors, 0),
    total: rows.reduce((sum, r) => sum + r.total, 0),
    avg_rating: parseFloat(
      (
        rows.reduce((sum, r) => sum + (r.avg_rating || 0) * r.total, 0) /
        Math.max(
          rows.reduce((sum, r) => sum + r.total, 0),
          1,
        )
      ).toFixed(1),
    ),
    targeted_recruits: rows.reduce((sum, r) => sum + r.targeted_recruits, 0),
    committed_recruits: rows.reduce((sum, r) => sum + r.committed_recruits, 0),
  };
}
