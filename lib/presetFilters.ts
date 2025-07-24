// presetFilters.ts

export type PresetFilterSet = {
  label: string
  filters: {
    [key: string]: { min?: number; max?: number } | string | number | undefined
  }
}

export const presetFilters: PresetFilterSet[] = [
  {
    label: 'Easy Street',
    filters: {
      academicPrestige: { min: 9 },
      programTradition: { min: 9 },
      brandExposure: { min: 9 },
    },
  },
  {
    label: 'Championship Contender',
    filters: {
      championshipContender: { min: 8 },
      dynastyTeamOVR: { min: 90 },
      prestige: { min: 4 },
    },
  },
  {
    label: 'Underdog Challenge',
    filters: {
      prestige: { max: 2 },
      dynastyTeamOVR: { max: 70 },
    },
  },
  {
    label: 'Cupcake Challenge',
    filters: {
      prestige: { max: 1 },
      dynastyTeamOVR: { max: 65 },
    },
  },
  {
    label: 'Struggling with Big Stadium',
    filters: {
      prestige: { max: 3 },
      dynastyTeamOVR: { max: 75 },
      stadiumCapacity: { min: 30000 },
    },
  },
  {
    label: 'Power 5 School',
    filters: {
      conference: 'Power 5',
    },
  },
  {
    label: 'Group of 5 School',
    filters: {
      conference: 'Group of 5',
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
]
