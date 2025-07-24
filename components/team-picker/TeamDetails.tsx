import Image from 'next/image'

import { TeamPickerTeam } from '@/types/teamPickerTeam'

import { LetterGradePill } from '../LetterGradePill'
import Prestige from '../Prestige'
import { RatingPill } from '../RatingPill'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { Separator } from '../ui/separator'

const conferenceMap: Record<string, string> = {
  ACC: 'acc.webp',
  American: 'american.webp',
  'Big 12': 'big-12.webp',
  'Big Ten': 'big-ten.webp',
  CUSA: 'cusa.webp',
  Independent: 'independents.webp',
  MAC: 'mac.webp',
  'Mountain West': 'mountain-west.webp',
  'Pac-12': 'pac-12.webp',
  SEC: 'sec.webp',
  'Sun Belt': 'sun-belt.webp',
}

export default function TeamDetails({ team }: { team: TeamPickerTeam }) {
  const prestige = team?.teamData[0].prestige / 2
  const teamColor = team?.colors[0]

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue={'team-details'}
      
    >
      <AccordionItem value="team-details" className="bg-card rounded my-2 px-4">
        <AccordionTrigger className="text-xl font-black uppercase">Team Details</AccordionTrigger>
        <AccordionContent>
          <div className="p-8 bg-card border rounded-lg shadow-md">
            <div className="flex flex-wrap justify-between gap-4 items-center mb-4">
              <div style={{ color: teamColor, textShadow: "1px 1px rgba(255,255,255,0.3)" }} className="font-header text-2xl sm:text-4xl text-center uppercase">
                {team?.name} {team?.mascot}
              </div>
              <div className="px-8 min-w-[60px] mx-auto sm:mx-0">
                {team?.conference && (
                  <Image
                    src={`/conferences/${conferenceMap[team?.conference.name]}`}
                    alt={`${team?.conference.name} logo`}
                    className="min-w-[60px]"
                    width={60}
                    height={60}
                    unoptimized
                  />
                )}
              </div>
            </div>

            <Separator />

            <div className="flex flex-wrap gap-4 py-4 mb-4 w-full mx-auto">
              <div className="flex flex-col gap-2 text-sm text-muted-foreground rounded flex-1">
                <h4
                  style={{ borderColor: teamColor }}
                  className="font-black uppercase border-b rounded-t pb-2 pt-4 px-4 bg-background"
                >
                  Team Prestige
                </h4>
                <div className="px-4 py-2 text-lg font-black bg-card">
                  <Prestige value={prestige} size="lg" />
                </div>
              </div>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground rounded flex-1">
                <h4
                  style={{ borderColor: teamColor }}
                  className="font-black uppercase border-b rounded-t pb-2 pt-4 px-4 bg-background"
                >
                  Location
                </h4>
                <div className="px-4 py-2 text-lg font-black bg-card">
                  {team?.city}, {team?.state}
                </div>
              </div>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground rounded flex-1">
                <h4
                  style={{ borderColor: teamColor }}
                  className="font-black uppercase border-b rounded-t pb-2 pt-4 px-4 bg-background"
                >
                  Enrollment
                </h4>
                <div className="px-4 py-2 text-lg font-black bg-card">{team?.enrollment?.toLocaleString()}</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex-1">
                <div className="flex flex-col gap-2 text-sm text-muted-foreground rounded flex-1">
                <h4
                  style={{ borderColor: teamColor }}
                  className="font-black uppercase border-b rounded-t mb-2 pb-2 pt-4 px-4 bg-background"
                >
                    Team Ratings
                  </h4>
                  <div className="flex flex-wrap gap-8 mb-4 px-4 pb-4">
                    <div className="flex flex-col">
                      <p className="font-bold uppercase mb-1 text-xs">Overall</p>
                      <RatingPill value={team?.teamData[0].dynastyTeamOVR} size="xl" />
                    </div>
                    <div className="flex flex-col">
                      <p className="font-bold uppercase mb-1 text-xs">Offense</p>
                      <RatingPill value={team?.teamData[0].dynastyOffenseOVR} size="xl" />
                    </div>
                    <div className="flex flex-col">
                      <p className="font-bold uppercase mb-1 text-xs">Defense</p>
                      <RatingPill value={team?.teamData[0].dynastyDefenseOVR} size="xl" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 text-sm text-muted-foreground rounded flex-1">
                <h4
                  style={{ borderColor: teamColor }}
                  className="font-black uppercase border-b rounded-t mb-2 pb-2 pt-4 px-4 bg-background"
                >
                    Schemes
                  </h4>
                  <div className="px-4 pb-4 text-lg font-black">
                    <p>
                      <span className="font-normal opacity-60">Offensive Playbook:</span>{' '}
                      {team?.teamData[0].offensiveScheme}
                    </p>
                    <p>
                      <span className="font-normal opacity-60">Defensive Playbook:</span>{' '}
                      {team?.teamData[0].defensiveScheme}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 text-sm text-muted-foreground rounded flex-1">
                <h4
                  style={{ borderColor: teamColor }}
                  className="font-black uppercase border-b rounded-t mb-2 pb-2 pt-4 px-4 bg-background"
                >
                    Stadium
                  </h4>
                  <div className="px-4 pb-4 text-lg font-black">
                    <p>
                      <span className="font-normal opacity-60">Capacity:</span> {team?.stadium?.capacity}
                    </p>
                    <p>
                      <span className="font-normal opacity-60">Field Type:</span> {team?.stadium?.field_type}
                    </p>
                    <p>
                      <span className="font-normal opacity-60">Roof Type:</span> {team?.stadium?.roof_type}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex flex-col gap-2 text-sm text-muted-foreground rounded flex-1">
                <h4
                  style={{ borderColor: teamColor }}
                  className="font-black uppercase border-b rounded-t mb-2 pb-2 pt-4 px-4 bg-background"
                >
                    Grades
                  </h4>
                  <div className="flex flex-wrap gap-8 mb-4 px-4 pb-4">
                    <div className="flex flex-col">
                      <p className="font-bold uppercase mb-1 text-xs">Academics</p>
                      <LetterGradePill value={team?.teamData[0].academicPrestige} size="xl" />
                    </div>
                    <div className="flex flex-col">
                      <p className="font-bold uppercase mb-1 text-xs">Facilities</p>
                      <LetterGradePill value={team?.teamData[0].athleticFacilities} size="xl" />
                    </div>
                    <div className="flex flex-col">
                      <p className="font-bold uppercase mb-1 text-xs">Brand Exp</p>
                      <LetterGradePill value={team?.teamData[0].brandExposure} size="xl" />
                    </div>
                    <div className="flex flex-col">
                      <p className="font-bold uppercase mb-1 text-xs">Lifestyle</p>
                      <LetterGradePill value={team?.teamData[0].campusLifestyle} size="xl" />
                    </div>
                    <div className="flex flex-col">
                      <p className="font-bold uppercase mb-1 text-xs">Contender</p>
                      <LetterGradePill value={team?.teamData[0].championshipContender} size="xl" />
                    </div>
                    <div className="flex flex-col">
                      <p className="font-bold uppercase mb-1 text-xs">Conf Prestige</p>
                      <LetterGradePill value={team?.teamData[0].conferencePrestige} size="xl" />
                    </div>
                    <div className="flex flex-col">
                      <p className="font-bold uppercase mb-1 text-xs">Tradition</p>
                      <LetterGradePill value={team?.teamData[0].programTradition} size="xl" />
                    </div>
                    <div className="flex flex-col">
                      <p className="font-bold uppercase mb-1 text-xs">Atmosphere</p>
                      <LetterGradePill value={team?.teamData[0].stadiumAtmosphere} size="xl" />
                    </div>
                    {/* <div className="flex flex-col">
                      <p className="font-bold uppercase mb-1 text-xs">Pro Potential</p>
                      <LetterGradePill value={team?.teamData[0].proPotential} size="xl" />
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
