import { cn } from '@/lib/utils'

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
}

const valueToGradeMap = Object.fromEntries(
  Object.entries(gradeToValueMap).map(([grade, value]) => [value, grade])
)

interface RatingPillProps {
  value: number | undefined // 1–12
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'pill' | 'text'
}

export function LetterGradePill({ value, size = 'md', variant = 'pill' }: RatingPillProps) {
  const color = getColor(value, variant)
  const display = value !== undefined ? valueToGradeMap[value] ?? '--' : '--'

  const sizeClass =
    size === 'sm'
      ? 'text-xs'
      : size === 'lg'
      ? 'text-lg'
      : size === 'xl'
      ? 'text-4xl font-header'
      : 'text-sm'

  const spacingClass =
    variant === 'pill'
      ? size === 'sm'
        ? 'px-1.5 py-0.5'
        : size === 'lg'
        ? 'px-3 py-1.5'
        : size === 'xl'
        ? 'px-6 py-4'
        : 'px-2 py-1'
      : ''

  return (
    <span
      className={cn(
        'rounded font-semibold inline-block text-center min-w-[2rem] w-[100px]',
        color,
        sizeClass,
        spacingClass,
        variant === 'pill' && 'text-white'
      )}
    >
      {display}
    </span>
  )
}

// Color mapping based on value tiers
function getColor(value: number | undefined, variant: 'pill' | 'text') {
  if (!value) return variant === 'pill' ? 'bg-gray-400' : 'text-gray-400'
  if (value <= 2) return variant === 'pill' ? 'bg-red-600' : 'text-red-600' // D-, D
  if (value <= 4) return variant === 'pill' ? 'bg-orange-500' : 'text-orange-500' // D+, C-
  if (value <= 6) return variant === 'pill' ? 'bg-yellow-500' : 'text-yellow-500' // C, C+
  if (value <= 9) return variant === 'pill' ? 'bg-green-500' : 'text-green-500' // B- to B+
  return variant === 'pill' ? 'bg-emerald-500' : 'text-emerald-500' // A-, A, A+
}
