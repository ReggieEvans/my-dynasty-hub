export type TeamOverviewRow = {
  position_id: number;
  position_code: string;
  side: "offense" | "defense" | "total";
  freshmen: number;
  sophomores: number;
  juniors: number;
  seniors: number;
  total: number;
  avg_rating: number;
  targeted_recruits: number;
  committed_recruits: number;
};
