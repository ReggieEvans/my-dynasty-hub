
import { FilterCategory, filterConfig, FilterOption, gradeToValueMap } from '@/lib/filterConfig'
import { presetFilters } from '@/lib/presetFilters'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Separator } from './ui/separator'

interface RangeFilterValue {
  min?: number
  max?: number
}

type Filters = {
  [key: string]: RangeFilterValue | string | number | undefined
}

interface FilterSidebarProps {
  filters: Filters
  setFilters: (filters: Filters) => void
  selectedPreset: string;
  setSelectedPreset: (preset: string) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, setFilters, selectedPreset, setSelectedPreset }) => {
  const groupedFilters = filterConfig.reduce(
    (acc, filter) => {
      const { category } = filter
      if (!acc[category]) acc[category] = []
      acc[category].push(filter)
      return acc
    },
    {} as { [key: string]: FilterOption[] },
  )

  const handleMinMaxChange = (key: string, type: 'min' | 'max', value: string | null, useGradeMap = false) => {
    const existing = (filters[key] as RangeFilterValue) || {}
    const numericValue =
      value === null || value === 'null'
        ? undefined
        : useGradeMap
          ? (gradeToValueMap[value] ?? parseFloat(value))
          : parseFloat(value)

    setFilters({
      ...filters,
      [key]: {
        ...existing,
        [type]: numericValue,
      },
    })
  }

  const handleResetAll = () => {
    setFilters({})
    setSelectedPreset('')
  }

  return (
    <aside className="w-full py-4 px-6 bg-card shadow-lg border border-border">
      <div className="flex flex-col mb-4">
        <h2 className="text-xl font-semibold text-primary">Preset Filters <span className='text-gray-500 font-bold uppercase text-xs'>(Optional)</span></h2>
        <Select
          value={selectedPreset}
          onValueChange={presetName => {
            const preset = presetFilters.find(p => p.label === presetName)
            if (preset) {
              setFilters({ ...preset.filters })
              setSelectedPreset(presetName)
            }
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a preset" />
          </SelectTrigger>
          <SelectContent>
            {presetFilters.map(preset => (
              <SelectItem key={preset.label} value={preset.label}>
                {preset.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator className="my-4" />

      <div className="flex justify-between">
        <h2 className="text-xl font-semibold text-primary">Custom Filters</h2>
        <button onClick={handleResetAll} className="text-sm text-gray-500 hover:underline">
          Reset All
        </button>
      </div>

      <Accordion type="multiple" defaultValue={['Basic Filters']}>
        {Object.keys(groupedFilters).map(categoryKey => {
          const category = categoryKey as FilterCategory
          return (
            <AccordionItem key={category} value={category} className="bg-background rounded my-2 px-4">
              <AccordionTrigger>{category}</AccordionTrigger>
              <AccordionContent>
                {groupedFilters[category].map(filter => {
                  const isNumber = filter.type === 'number'
                  const rangeValue = filters[filter.key] as RangeFilterValue
                  const useGradeMap = filter.useGradeMap

                  return (
                    <div key={filter.key} className="mb-4 space-y-1">
                      <Label className='text-muted uppercase text-xs font-bold'>{filter.label}</Label>
                      {isNumber ? (
                        <div className="flex items-center space-x-2">
                          <Select
                            value={rangeValue?.min?.toString() ?? 'null'}
                            onValueChange={value => handleMinMaxChange(filter.key, 'min', value, useGradeMap)}
                          >
                            <SelectTrigger className="w-28">
                              <SelectValue placeholder="No Min" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="null">No Min</SelectItem>
                              {filter.options?.map(option => {
                                const value = useGradeMap
                                  ? gradeToValueMap[option as keyof typeof gradeToValueMap]?.toString()
                                  : option.toString()
                                return (
                                  <SelectItem key={`min-${option}`} value={value}>
                                    {option}
                                  </SelectItem>
                                )
                              })}
                            </SelectContent>
                          </Select>

                          <Select
                            value={rangeValue?.max?.toString() ?? 'null'}
                            onValueChange={value => handleMinMaxChange(filter.key, 'max', value, useGradeMap)}
                          >
                            <SelectTrigger className="w-28">
                              <SelectValue placeholder="No Max" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="null">No Max</SelectItem>
                              {filter.options?.map(option => {
                                const value = useGradeMap
                                  ? gradeToValueMap[option as keyof typeof gradeToValueMap]?.toString()
                                  : option.toString()
                                return (
                                  <SelectItem key={`max-${option}`} value={value}>
                                    {option}
                                  </SelectItem>
                                )
                              })}
                            </SelectContent>
                          </Select>
                        </div>
                      ) : (
                        <Select
                          value={typeof filters[filter.key] === 'object' ? '' : filters[filter.key]?.toString() || ''}
                          onValueChange={value => setFilters({ ...filters, [filter.key]: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={`Select ${filter.label}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {filter.options?.map(option => (
                              <SelectItem key={option.toString()} value={option.toString()}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  )
                })}
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </aside>
  )
}

export default FilterSidebar
