// presetFilters.ts

export type PresetFilterSet = {
  label: string;
  filters: {
    [key: string]:
      | { min?: number; max?: number }
      | string
      | number
      | undefined;
  };
};

export const presetFilters: PresetFilterSet[] = [
  {
    label: 'Elite School',
    filters: {
      academicPrestige: { min: 9 },
      programTradition: { min: 9 },
      brandExposure: { min: 9 },
    },
  },
  {
    label: 'Championship Contender',
    filters: {
      championshipContender: { min: 9 },
      dynastyTeamOVR: { min: 90 },
      prestige: { min: 4 },
    },
  },
  {
    label: 'Powerhouse Offense',
    filters: {
      dynastyOffenseOVR: { min: 90 },
    },
  },
  {
    label: 'Lockdown Defense',
    filters: {
      dynastyDefenseOVR: { min: 90 },
    },
  },
  {
    label: 'Great Facilities',
    filters: {
      athleticFacilities: { min: 9 },
      stadiumAtmosphere: { min: 9 },
    },
  },
  {
    label: 'Underdog Program',
    filters: {
      prestige: { max: 4 },
      dynastyTeamOVR: { max: 80 },
      championshipContender: { max: 4 },
    },
  },
  {
    label: 'High Academic Standards',
    filters: {
      academicPrestige: { min: 10 },
    },
  },
  {
    label: 'Party School Vibes',
    filters: {
      campusLifestyle: { min: 9 },
    },
  },
  {
    label: 'Modern Spread Offense',
    filters: {
      offensiveScheme: 'Spread',
    },
  },
  {
    label: 'Classic Pro Style',
    filters: {
      offensiveScheme: 'Pro Style',
    },
  },
];
