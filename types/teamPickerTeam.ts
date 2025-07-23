/* eslint-disable @typescript-eslint/no-explicit-any */
export type TeamPickerTeam = {
  id: number;
  name: string;
  mascot: string;
  city: string;
  state: string;
  colors: string[];
  conference: { name: string };
  teamData: { offenseOVR: number, defenseOVR: number, specialTeamsOVR: number, teamOVR: number, prestige: number, dynastyOffenseOVR: number, dynastyDefenseOVR: number, dynastyTeamOVR: number, roadToCFPTier: number, academicPrestige: number, athleticFacilities: number, brandExposure: number, campusLifestyle: number, championshipContender: number, coachPrestige: number, coachStability: number, conferencePrestige: number, programTradition: number, stadiumAtmosphere: number, offensiveScheme: string, defensiveScheme: string }[];
  enrollment: number | null;
  stadium: { id: number | null, stadium_id: string | null, school: number | null, name: string | null, elevation: string | null, capacity: number | null, field_type: string | null, roof_type: string | null, built_in: number | null, nickname: any } | null;
  image: string;
  [key: string]: any;
};