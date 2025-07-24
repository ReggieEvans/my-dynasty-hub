/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import ConfettiExplosion from "react-confetti-explosion";
import CountUp from 'react-countup'

import FilterSidebar from '@/components/team-picker/FilterSidebar'
import PossibleTeamsList from '@/components/team-picker/PossibleTeamsList'
import TeamDetails from '@/components/team-picker/TeamDetails'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import teams from '@/data/cfb26-teams-7.20.25.json'
import { getEnrollmentSizeLabel } from '@/lib/utils/getEnrollmentSize'
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
  const [teamPicked, setTeamPicked] = useState(false)

  useEffect(() => {
    const scaledFields = ['prestige', 'coachPrestige', 'conferencePrestige']

    const power5 = ['SEC', 'Big Ten', 'ACC', 'Big 12', 'Pac-12']
    const groupOf5 = ['AAC', 'Mountain West', 'Sun Belt', 'MAC', 'Conference USA']

    const teamsWithSizeLabel = teams.map(team => ({
      ...team,
      enrollmentSize: getEnrollmentSizeLabel(team.enrollment),
    }))

    const filtered = teamsWithSizeLabel.filter((t: TeamPickerTeam) => {
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

        // ✅ Special handling for conference tier filter
        if (key === 'conference') {
          if (value === 'Power 5') return power5.includes(teamValue)
          if (value === 'Group of 5') return groupOf5.includes(teamValue)
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
    setTeamPicked(false)

    let i = 0
    const spinInterval = setInterval(() => {
      setSpinnerTeam(filteredTeams[i % filteredTeams.length])
      i++
    }, 100)

    setTimeout(() => {
      clearInterval(spinInterval)
      const randomTeam = filteredTeams[Math.floor(Math.random() * filteredTeams.length)]
      setSpinnerTeam(null)
      setTeam(randomTeam)
      setTeamPicked(true)
      setIsSpinning(false)
    }, 1000)
  }

  const handleReset = () => {
    setTeam(null)
    setFilters({})
    setSelectedPreset('')
  }

  return (
    <>
      <div className="min-h-[calc(100vh - 50px)] text-foreground max-w-[1440px] mx-auto">
        {/* Mobile filter toggle bar */}
        <div className="lg:hidden sticky top-0 z-40 bg-background border-b border-border py-2 px-4 mx-2 my-2 flex justify-between items-center">
          <span className="text-lg font-semibold uppercase">Filters</span>

          <Dialog>
            <DialogTrigger asChild>
              <button className="text-sm px-4 py-2 bg-muted text-foreground rounded font-bold btn-primary">Open</button>
            </DialogTrigger>

            <DialogContent className="max-w-xl w-full max-h-[90vh] p-0 overflow-hidden">
              {/* Header */}
              <div className="sticky top-0 z-10 bg-background border-b p-4">
                <DialogHeader>
                  <DialogTitle className="text-lg font-bold">Filters</DialogTitle>
                </DialogHeader>
              </div>

              {!isSpinning && (
                <div className="mt-2 uppercase font-black text-muted">
                  <p className="flex justify-center items-center">
                    <span
                      className={`ml-1 font-black ${
                        filteredTeams.length === 0 ? 'text-red-600 animate-[pulse_2.5s_ease-in-out_infinite]' : ''
                      }`}
                    >
                      <span className="font-bold">Possible Teams</span>{' '}
                      <CountUp end={filteredTeams.length} duration={0.5} />
                    </span>
                  </p>
                </div>
              )}

              {!isSpinning && filteredTeams.length === 0 && (
                <div className="mt-1 text-center">
                  <p className="text-red-600 opacity-90 text-xs">
                    No possible teams. Please adjust your filters or reset to find a team.
                  </p>
                </div>
              )}

              {/* Scrollable Body */}
              <div className="overflow-y-auto max-h-[calc(90vh-112px)] px-4 py-2">
                <FilterSidebar
                  filters={filters}
                  setFilters={setFilters}
                  selectedPreset={selectedPreset}
                  setSelectedPreset={setSelectedPreset}
                />
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 z-10 bg-background border-t p-4">
                <DialogClose asChild>
                  <button className="w-full text-center font-bold bg-muted text-foreground py-2 rounded hover:bg-muted/80 transition">
                    Close
                  </button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex gap-4 px-2 py-12">
          <section className="w-full lg:w-full flex flex-col justify-start items-center">
            {isSpinning && spinnerTeam && (
              <div className="flex justify-center items-center">
                <Image
                  src='/spinner-wheel.webp'
                  alt='spinner-wheel'
                  width={480}
                  height={480}
                  className="transition ease-in-out animate-spin"
                  priority
                />
              </div>
            )}

            {!team && !isSpinning ? (
              <div className="text-center mt-12">
                <h2 className="font-header green-gradient text-5xl uppercase mb-4">Dynasty Team Picker</h2>
                <p className="text-lg mb-12">Select filters to find your perfect dynasty team.</p>
                <button
                  onClick={handleFindTeam}
                  className="btn-primary text-xl px-12 disabled:brightness-50 disabled:cursor-not-allowed"
                  disabled={filteredTeams.length === 0}
                >
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
                      unoptimized
                    />
                  )}
                </div>

                <div className="text-center">
                  <h3 className="font-header text-3xl sm:text-5xl uppercase">{team?.name}</h3>
                  <h3 className="font-header text-2xl sm:text-3xl uppercase">{team?.mascot}</h3>
                </div>
              </div>
            )}

            {team && !isSpinning ? (
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 mt-12">
                <div>
                  <button
                    onClick={handleFindTeam}
                    className="btn-primary w-40 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={filteredTeams.length === 0 || isSpinning}
                  >
                    Reroll
                  </button>
                </div>
                <div>
                  <button
                    onClick={handleReset}
                    className="bg-gradient-to-br from-muted to-muted text-foreground font-semibold py-4 px-8 rounded hover:brightness-90 transition-all duration-300 w-40"
                  >
                    Start Over
                  </button>
                </div>
              </div>
            ) : null}

            {teamPicked && <ConfettiExplosion />}

            {!isSpinning && (
              <div className="mt-8 uppercase font-black text-2xl text-muted">
                <p className="flex flex-col justify-center items-center">
                  <span className="opacity-50 font-bold">Possible Teams</span>{' '}
                  <span
                    className={`ml-1 font-black ${
                      filteredTeams.length === 0 ? 'text-red-600 animate-[pulse_2.5s_ease-in-out_infinite]' : ''
                    }`}
                  >
                    <CountUp end={filteredTeams.length} duration={0.5} />
                  </span>
                </p>
              </div>
            )}

            {!isSpinning && filteredTeams.length === 0 && (
              <div className="mt-2 text-center">
                <p className="text-red-600 opacity-90">
                  No possible teams. Please adjust your filters or reset to find a team.
                </p>
                <button className="mt-4 font-black bg-muted px-4 py-2 rounded" onClick={handleReset}>
                  RESET
                </button>
              </div>
            )}

            {team && !isSpinning && (
              <div className="w-full mt-12">
                <TeamDetails team={team} />
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

        {team && !isSpinning && (
          <section className="w-full mb-12 px-2">
            <PossibleTeamsList teams={filteredTeams} />
          </section>
        )}
      </div>
    </>
  )
}
