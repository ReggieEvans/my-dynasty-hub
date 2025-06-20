export type ActiveDynasty = {
  id: string;
  name: string;
  user_id: string;
  type: number;
  tracking_level: string | null;
  has_completed_setup: boolean;
  is_active: boolean;
  start_year: number;
  created_at: string;
  is_public: boolean;
  public_view_id: string;
};
