/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import FilterSidebar from '@/components/FilterSidebar'
import teams from '@/data/cfb26-teams-7.20.25.json'
import { TeamPickerTeam } from '@/types/teamPickerTeam'

const keyPathMap: Record<string, string> = {
  conference: 'conference.name',
  state: 'state',
  enrollment: 'enrollment',
  prestige: 'teamData.0.prestige',
  dynastyTeamOVR: 'teamData.0.dynastyTeamOVR',
  dynastyOffenseOVR: 'teamData.0.dynastyOffenseOVR',
  dynastyDefenseOVR: 'teamData.0.dynastyDefenseOVR',
  offensiveScheme: 'teamData.0.offensiveScheme',
  defensiveScheme: 'teamData.0.defensiveScheme',
  brandExposure: 'teamData.0.brandExposure',
  stadiumAtmosphere: 'teamData.0.stadiumAtmosphere',
  conferencePrestige: 'teamData.0.conferencePrestige',
  championshipContender: 'teamData.0.championshipContender',
  programTradition: 'teamData.0.programTradition',
  campusLifestyle: 'teamData.0.campusLifestyle',
  academicPrestige: 'teamData.0.academicPrestige',
  athleticFacilities: 'teamData.0.athleticFacilities',
  proPotential: 'teamData.0.roadToCFPTier',
  stadiumCapacity: 'stadium.capacity',
  fieldType: 'stadium.field_type',
  roofType: 'stadium.roof_type',
}

interface RangeFilterValue {
  min?: number
  max?: number
}

export default function LandingPage() {
  const [filters, setFilters] = useState({})
  const [team, setTeam] = useState<TeamPickerTeam | null>(null)
  const [filteredTeams, setFilteredTeams] = useState<TeamPickerTeam[]>(teams)
  const [selectedPreset, setSelectedPreset] = useState('')
  const [spinnerTeam, setSpinnerTeam] = useState<TeamPickerTeam | null>(null)
  const [isSpinning, setIsSpinning] = useState(false)

  useEffect(() => {
    const scaledFields = ['prestige', 'coachPrestige', 'conferencePrestige']

    const filtered = teams.filter((t: TeamPickerTeam) => {
      return Object.entries(filters).every(([key, value]) => {
        const actualKey = keyPathMap[key] || key
        const teamValue = getNestedValue(t, actualKey)

        if (typeof value === 'object' && value !== null && ('min' in value || 'max' in value)) {
          const range = value as RangeFilterValue
          let min = range.min
          let max = range.max

          if (scaledFields.includes(key)) {
            min = min !== undefined ? min * 2 : min
            max = max !== undefined ? max * 2 : max
          }

          if (typeof teamValue !== 'number') return false
          if (min !== undefined && teamValue < min) return false
          if (max !== undefined && teamValue > max) return false
          return true
        }

        return teamValue === value
      })
    })

    setFilteredTeams(filtered)
  }, [filters])

  const getNestedValue = (obj: any, path: string): any => {
    return path.split('.').reduce((acc, part) => {
      if (Array.isArray(acc) && !isNaN(Number(part))) {
        return acc[Number(part)]
      }
      return acc?.[part]
    }, obj)
  }

  const handleFindTeam = () => {
    setIsSpinning(true)
    setTeam(null)

    let i = 0
    const spinInterval = setInterval(() => {
      setSpinnerTeam(filteredTeams[i % filteredTeams.length])
      i++
    }, 100)

    console.log('✅ Filtered Teams:', filteredTeams)
    setTimeout(() => {
      clearInterval(spinInterval)
      const randomTeam = filteredTeams[Math.floor(Math.random() * filteredTeams.length)]
      setSpinnerTeam(null)
      setTeam(randomTeam)
      setIsSpinning(false)
    }, 1000)
  }

  const handleReset = () => {
    setTeam(null)
    setFilters({})
    setSelectedPreset('')
  }

  console.log('Current Filters:', filters)

  return (
    <div className="min-h-screen text-foreground">
      <div className="flex p-12">
        <section className="w-full lg:w-full flex flex-col justify-start items-center">
          {isSpinning && spinnerTeam && (
            <div className="flex justify-center items-center">
              <Image
                src={spinnerTeam.image}
                alt={spinnerTeam.name}
                width={240}
                height={240}
                className="transition duration-100 ease-in-out"
              />
            </div>
          )}

          {!team && !isSpinning ? (
            <div className="text-center mt-12">
              <h2 className="font-header text-5xl uppercase mb-4">Dynasty Team Picker</h2>
              <p className="text-lg mb-12">Select filters to find your perfect dynasty team.</p>
              <button onClick={handleFindTeam} className="btn-primary text-xl px-12">
                Find My Team
              </button>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center space-y-4">
              <div className="mb-8">
                {team?.image && (
                  <Image
                    src={team.image}
                    alt={`${team.name} logo`}
                    width={240}
                    height={240}
                    className="mx-auto rounded"
                  />
                )}
              </div>

              <div className="text-center">
                <h3 className="font-header text-5xl uppercase">{team?.name}</h3>
                <h3 className="font-header text-4xl uppercase">{team?.mascot}</h3>
              </div>
            </div>
          )}

          {team && !isSpinning ? (
            <div className="flex justify-center gap-4 pt-4 mt-12">
              <button
                onClick={handleFindTeam}
                className="btn-primary w-40 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={filteredTeams.length === 0 || isSpinning}
              >
                Reroll
              </button>
              <button
                onClick={handleReset}
                className="bg-gradient-to-br from-muted to-muted text-foreground font-semibold py-4 px-8 rounded hover:brightness-90 transition-all duration-300 w-40"
              >
                Start Over
              </button>
            </div>
          ) : null}

          {team && !isSpinning && (
            <div className="mt-8 uppercase font-black text-2xl text-muted">
              <p>
                <span className="opacity-50 font-bold">Possible Teams:</span>{' '}
                <span
                  className={`ml-1 font-black ${
                    filteredTeams.length === 0 ? 'text-red-600 animate-[pulse_2.5s_ease-in-out_infinite]' : ''
                  }`}
                >
                  {filteredTeams.length}
                </span>
              </p>
            </div>
          )}

          {team && !isSpinning && filteredTeams.length === 0 && (
            <div className="mt-2 text-center">
              <p className='text-red-600 opacity-90'>
                No possible teams. Please adjust your filters or reset to find a team.
              </p>
            </div>
          )}

          {team && !isSpinning && (
            <div className="mt-8 text-center">
              <h4 className="text-lg font-semibold mb-2">Team Details</h4>
              <p className="text-sm text-muted-foreground">Conference: {team.conference.name}</p>
              <p className="text-sm text-muted-foreground">State: {team.state}</p>
              <p className="text-sm text-muted-foreground">Enrollment: {team.enrollment}</p>
              <p className="text-sm text-muted-foreground">Prestige: {team.teamData[0].prestige}</p>
            </div>
          )}
        </section>
        <section className="hidden lg:block lg:w-[600px]">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            selectedPreset={selectedPreset}
            setSelectedPreset={setSelectedPreset}
          />
        </section>
      </div>
    </div>
  )
}
