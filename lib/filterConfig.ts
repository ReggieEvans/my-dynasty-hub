export type FilterOption = {
  key: string;
  label: string;
  type: 'select' | 'number';
  options?: (string | number)[];
  inputType?: 'select' | 'number';
  category: string;
  operator?: string;
  useGradeMap?: boolean;
};

export enum FilterCategory {
  BasicFilters = "Basic Filters",
  SchoolFilters = "School Filters",
  StadiumFilters = "Stadium Filters",
  PlaybookFilters = "Playbook Filters",
}

export const gradeToValueMap: Record<string, number> = {
  'A+': 12,
  'A': 11,
  'A-': 10,
  'B+': 9,
  'B': 8,
  'B-': 7,
  'C+': 6,
  'C': 5,
  'C-': 4,
  'D+': 3,
  'D': 2,
  'D-': 1,
};

// Offensive Schemes
export const offensiveSchemeOptions = [
  'Air Raid',
  'Balanced',
  'Multiple',
  'Option',
  'Power',
  'Pro',
  'Pistol',
  'Run and Shoot',
  'Spread',
  'West Coast',
];

// Defensive Schemes
export const defensiveSchemeOptions = [
  '3-3-5',
  '3-4',
  '4-2-5',
  '4-3',
  '4-4',
  'Multiple',
];

// Conference Names
export const conferenceOptions = [
  'ACC',
  'American',
  'Big 12',
  'Big Ten',
  'CUSA',
  'Independent',
  'MAC',
  'Mountain West',
  'Pac-12',
  'SEC',
  'Sun Belt',
];

// State Names
export const stateOptions = [
  "AL", "AR", "AZ", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "MI", "MN", "MO", "MS", "NC", "NE", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "SC", "TN", "TX", "UT", "VA", "WA", "WI", "WV", "WY"
];

// Stadium Field Types
export const fieldTypeOptions = ['Grass', 'Turf'];

// Stadium Roof Types
export const roofTypeOptions = ['Dome', 'Open', 'Retractable'];

// Stadium Capacity Buckets (for use with operators like <, >=, etc.)
export const stadiumCapacityOptions = [10000, 30000, 50000, 70000, 90000];

export const gradeOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const ratingOptions = [90, 80, 70, 60];

export const enrollmentOptions = ["small", "medium", "large", "very large"];

export const valueToGradeMap = Object.fromEntries(
  Object.entries(gradeToValueMap).map(([grade, value]) => [value, grade])
);

export const filterConfig: FilterOption[] = [
  { key: 'conference', label: 'Conference', type: 'select', options: conferenceOptions, category: FilterCategory.BasicFilters
   },
  { key: 'state', label: 'State', type: 'select', options: stateOptions, category: FilterCategory.BasicFilters},
  { key: 'enrollment', label: 'School Size', type: 'select', options: enrollmentOptions, category: FilterCategory.BasicFilters},
  { key: 'prestige', label: 'Program Prestige', type: 'number', category: FilterCategory.BasicFilters, inputType: 'select', operator: '=', options: [1,2,3,4,5] },
  { key: 'dynastyTeamOVR', label: 'Team Overall', type: 'number', category: FilterCategory.BasicFilters, inputType: 'select', options: ratingOptions, operator: '=' },
  { key: 'dynastyOffenseOVR', label: 'Offense Overall', type: 'number', category: FilterCategory.BasicFilters, inputType: 'select', options: ratingOptions, operator: '=' },
  { key: 'dynastyDefenseOVR', label: 'Defense Overall', type: 'number', category: FilterCategory.BasicFilters, inputType: 'select', options: ratingOptions, operator: '=' },
  { key: 'championshipContender', label: 'Championship Contender', type: 'number', category: FilterCategory.SchoolFilters, inputType: 'select', options: Object.keys(gradeToValueMap), useGradeMap: true, operator: '=' },
  { key: 'conferencePrestige', label: 'Conference Prestige', type: 'number', category: FilterCategory.SchoolFilters, inputType: 'select', options: Object.keys(gradeToValueMap), useGradeMap: true, operator: '=' },
  { key: 'athleticFacilities', label: 'Athletic Facilities', type: 'number', category: FilterCategory.SchoolFilters, inputType: 'select', options: Object.keys(gradeToValueMap), useGradeMap: true, operator: '=' },
  { key: 'programTradition', label: 'Program Tradition', type: 'number', category: FilterCategory.SchoolFilters, inputType: 'select', options: Object.keys(gradeToValueMap), useGradeMap: true, operator: '=' },
  { key: 'campusLifestyle', label: 'Campus Lifestyle', type: 'number', category: FilterCategory.SchoolFilters, inputType: 'select', options: Object.keys(gradeToValueMap), useGradeMap: true, operator: '=' },
  { key: 'academicPrestige', label: 'Academic Prestige', type: 'number', category: FilterCategory.SchoolFilters, inputType: 'select', options: Object.keys(gradeToValueMap), useGradeMap: true, operator: '=' },
  { key: 'brandExposure', label: 'Brand Exposure', type: 'number', category: FilterCategory.SchoolFilters, inputType: 'select', options: Object.keys(gradeToValueMap), useGradeMap: true, operator: '=' },
  { key: 'proPotential', label: 'Pro Potential', type: 'number', category: FilterCategory.SchoolFilters, inputType: 'select', options: Object.keys(gradeToValueMap), useGradeMap: true, operator: '=' },
  { key: 'stadiumAtmosphere', label: 'Stadium Atmosphere', type: 'number', category: FilterCategory.StadiumFilters, inputType: 'select', options: Object.keys(gradeToValueMap), useGradeMap: true, operator: '=' },
  { key: 'stadiumCapacity', label: 'Stadium Capacity', type: 'number', category: FilterCategory.StadiumFilters, inputType: 'select', operator: '=', options: stadiumCapacityOptions  },
  { key: 'fieldType', label: 'Field Type', type: 'select', category: FilterCategory.StadiumFilters, options: fieldTypeOptions },
  { key: 'roofType', label: 'Roof Type', type: 'select', category: FilterCategory.StadiumFilters, options: roofTypeOptions },
  { key: 'offensiveScheme', label: 'Offensive Scheme', type: 'select', category: FilterCategory.PlaybookFilters, options: offensiveSchemeOptions, },
  { key: 'defensiveScheme', label: 'Defensive Scheme', type: 'select', category: FilterCategory.PlaybookFilters, options: defensiveSchemeOptions, },
];
