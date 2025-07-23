import { TeamPickerTeam } from '@/types/teamPickerTeam'
import Image from 'next/image'
import { Separator } from '../ui/separator'
import Prestige from '../Prestige'
import { RatingPill } from '../RatingPill'

const conferenceMap: Record<string, string> = {
  ACC: 'acc.webp',
  American: 'american.webp',
  'Big 12': 'big-12.webp',
  'Big Ten': 'big-ten.webp',
  CUSA: 'cusa.webp',
  Independents: 'independents.webp',
  MAC: 'mac.webp',
  'Mountain West': 'mountain-west.webp',
  'Pac-12': 'pac-12.webp',
  SEC: 'sec.webp',
  'Sun Belt': 'sun-belt.webp',
}

export default function TeamDetails({ team }: { team: TeamPickerTeam }) {
  const prestige = team?.teamData[0].prestige / 2

  return (
    <div className="p-8 bg-card">
      <div className="flex justify-between items-center mb-4">
        <div className="font-header text-4xl uppercase">
          {team?.name} {team?.mascot}
        </div>
        <div className="px-8">
          {team?.conference && (
            <Image
              src={`/conferences/${conferenceMap[team?.conference.name]}`}
              alt={`${team?.conference.name} logo`}
              width={80}
              height={80}
            />
          )}
        </div>
      </div>

      <Separator />

      <div className="flex justify-between items-center py-4 mb-4">
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          Prestige: <Prestige value={prestige} />
        </p>
        <p className="text-sm text-muted-foreground">
          Location: {team?.city}, {team?.state}
        </p>
        <p className="text-sm text-muted-foreground">Enrollment: {team?.enrollment?.toLocaleString()}</p>
      </div>

      <div className="flex gap-4">
        <div className="w-1/2">
          <div>
            <h4 className="font-black text-lg uppercase mb-2">Team Ratings</h4>
            <div className="flex gap-8 mb-4">
              <RatingPill value={team?.teamData[0].dynastyTeamOVR} size="xl" />
              <RatingPill value={team?.teamData[0].dynastyOffenseOVR} size="xl" />
              <RatingPill value={team?.teamData[0].dynastyDefenseOVR} size="xl" />
            </div>
          </div>

          <div>
            <h4 className="font-black text-lg uppercase mb-2">Team Playbooks</h4>
            <p>Offensive Playbook: {team?.teamData[0].offensiveScheme}</p>
            <p>Defensive Playbook: {team?.teamData[0].defensiveScheme}</p>
          </div>

          <div>
            <h4 className="font-black text-lg uppercase mb-2">Team Stadium</h4>
            <p>Capacity: {team?.stadium?.capacity}</p>
            <p>Field Type: {team?.stadium?.field_type}</p>
            <p>Roof Type: {team?.stadium?.roof_type}</p>
          </div>
        </div>
        <div className="w-1/2"></div>
      </div>
    </div>
  )
}
