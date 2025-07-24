import { enrollmentSizeMap } from "../filterConfig"

export function getEnrollmentSizeLabel(enrollment: number): string {
  for (const [label, range] of Object.entries(enrollmentSizeMap)) {
    if (enrollment >= range.min && enrollment <= range.max) {
      return label
    }
  }
  return 'unknown'
}