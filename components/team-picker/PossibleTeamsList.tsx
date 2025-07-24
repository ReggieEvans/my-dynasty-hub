import Image from 'next/image'

import { TeamPickerTeam } from '@/types/teamPickerTeam'

import Prestige from '../Prestige'
import { RatingPill } from '../RatingPill'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'

export default function PossibleTeamsList({ teams }: { teams: TeamPickerTeam[] }) {
  return (
    <Accordion type="single" collapsible className="w-full" defaultValue={'possible-teams'}>
      <AccordionItem value="possible-teams" className="bg-background rounded my-2 px-4">
        <AccordionTrigger className="text-xl font-black uppercase">All Possible Teams</AccordionTrigger>
        <AccordionContent>
          <div className='max-h-[500px] overflow-y-scroll'>
            <Table>
              <TableCaption className='text-muted'>A list of all possible teams based on the current filters.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-[200px]'>Team</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Prestige</TableHead>
                  <TableHead>Overall</TableHead>
                  <TableHead>Offense</TableHead>
                  <TableHead>Defense</TableHead>
                  <TableHead>Off Scheme</TableHead>
                  <TableHead>Def Scheme</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Field</TableHead>
                  <TableHead>Roof</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teams?.map((team: TeamPickerTeam) => (
                  <TableRow key={team.name}>
                    <TableCell className='flex items-center gap-2 text-left w-[200px]'>
                      <Image
                        src={team.image}
                        alt={`${team.name} logo`}
                        width={20}
                        height={20}
                        unoptimized
                      />
                      {team.name}
                    </TableCell>
                    <TableCell>{team.state}</TableCell>
                    <TableCell className='flex items-center gap-2 text-xs text-muted'>
                      <Prestige value={team?.teamData[0].prestige / 2} size="sm" /> {team?.teamData[0].prestige / 2}
                    </TableCell>
                    <TableCell><RatingPill value={team.teamData[0].dynastyTeamOVR} size="sm" /></TableCell>
                    <TableCell><RatingPill value={team.teamData[0].dynastyOffenseOVR} size="sm" /></TableCell>
                    <TableCell><RatingPill value={team.teamData[0].dynastyDefenseOVR} size="sm" /></TableCell>
                    <TableCell>{team.teamData[0].offensiveScheme}</TableCell>
                    <TableCell>{team.teamData[0].defensiveScheme}</TableCell>
                    <TableCell>{team.stadium?.capacity}</TableCell>
                    <TableCell>{team.stadium?.field_type}</TableCell>
                    <TableCell>{team.stadium?.roof_type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
