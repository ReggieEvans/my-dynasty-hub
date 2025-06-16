// /components/dashboard/CreateDynastyWizard.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FaCubes, FaCube, FaSquareCheck } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Prestige from '@/components/Prestige';
import { cn } from '@/lib/utils';
// import { useCreateDynastyMutation } from '@/store/apis/dynastyApi';

interface Mode {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
}

const modes: Mode[] = [
  {
    id: 1,
    name: 'Immersive Mode',
    description:
      'The immersive mode is setup for the user that likes to track everything. If your the type of user that likes to keep a spreadsheet for every detail of your dynasty, this is the mode for you.',
    icon: <FaCubes />,
  },
  {
    id: 2,
    name: 'Essentials Mode',
    description:
      'The essentials mode is geared towards those that just want to track outcomes and keep a history of their dynasty. This mode is great for tracking online dynasties with your friends.',
    icon: <FaCube />,
  },
];

const teams = [
  {
    id: 1,
    name: 'Team 1',
    logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/245.png&h=200&w=200',
    school: 'Texas A&M',
    conference: 'SEC',
    overall_rating: 84,
    offense_rating: 87,
    defense_rating: 82,
    school_prestige: 5,
    conference_logo:
      'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa_conf/500/8.png&transparent=true&w=30&h=30',
    conference_name: 'SEC',
  },
  {
    id: 2,
    name: 'Team 2',
    logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/2026.png&h=200&w=200',
    school: 'Florida International',
    conference: 'Sun Belt',
    overall_rating: 78,
    offense_rating: 77,
    defense_rating: 79,
    school_prestige: 3.5,
    conference_logo:
      'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa_conf/500/8.png&transparent=true&w=30&h=30',
    conference_name: 'Sun Belt',
  },
  {
    id: 3,
    name: 'Team 3',
    logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/245.png&h=200&w=200',
    school: 'Team 3',
    conference: 'Conference 3',
  },
  {
    id: 4,
    name: 'Team 4',
    logo: 'https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/245.png&h=200&w=200',
    school: 'Team 4',
    conference: 'Conference 4',
  },
];

export default function CreateDynastyWizard({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const user = useSelector((state: RootState) => state.auth);
  const [step, setStep] = useState(1);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [selectedMode, setSelectedMode] = useState<Mode | null>(null);
  const [name, setName] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  //   const [createDynasty] = useCreateDynastyMutation();

  const handleSubmit = async () => {
    if (!user.id || !selectedTeamId) return;

    // await createDynasty({
    //   user_id: user.id,
    //   name,
    //   start_year: year,
    //   team_id: selectedTeamId,
    // });

    onClose();
  };

  const handleSelectedMode = (mode: Mode) => {
    setSelectedMode(mode);
  };

  const handleSelectedTeam = (teamId: any) => {
    setSelectedTeamId(teamId);
  };

  const handleClose = () => {
    onClose();
    clearWizard();
  };

  const clearWizard = () => {
    setStep(1);
    setSelectedTeamId(null);
    setSelectedMode(null);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className='max-w-xl'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-black border-b border-border pb-2'>
            Create Your DynastyHub
          </DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div>
            <p className='mb-2'>Step 1: Choose your experience</p>
            <p className='mb-4 text-sm text-muted'>
              MyDynastyHub offers two modes, immersive and essentials. All
              features are available to everyone, the modes just configure the
              default settings and layout.
            </p>

            <ExperienceSelector
              handleSelectedMode={handleSelectedMode}
              selectedMode={selectedMode}
            />

            <div className='flex justify-between gap-4'>
              <Button
                onClick={handleClose}
                className='bg-background-secondary mt-4 w-1/2'
              >
                Cancel
              </Button>
              <Button
                onClick={() => setStep(2)}
                className='btn-primary mt-4 w-1/2'
                disabled={!selectedMode}
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <p className='mb-2'>Step 2: Select a team</p>
            {/* Replace with actual team selection UI */}
            <TeamSelector
              handleSelectedTeam={handleSelectedTeam}
              selectedTeamId={selectedTeamId}
              teams={teams}
            />

            <p className='text-sm text-muted pt-2'>
              If you want to track multiple teams for multi-user dynasties
              you'll be able to add more teams from the dashboard.
            </p>
            <div className='flex justify-between gap-4'>
              <Button
                onClick={() => setStep(1)}
                className='bg-background-secondary mt-4 w-1/2'
              >
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                className='btn-primary mt-4 w-1/2'
                disabled={!selectedTeamId}
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <p className='mb-2'>Step 3: Name your dynasty</p>
            <Input
              placeholder='Dynasty Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder='Starting Year'
              type='number'
              className='mt-2'
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
            />
            <div className='flex justify-between gap-4'>
              <Button
                onClick={() => setStep(2)}
                className='bg-background-secondary mt-4 w-1/2'
              >
                Back
              </Button>
              <Button
                // onClick={() => ()}
                className='btn-primary mt-4 w-1/2'
                // disabled={!selectedTeamId}
              >
                Start Dynasty
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// Experience Selector
function ExperienceSelector({
  handleSelectedMode,
  selectedMode,
}: {
  handleSelectedMode: (mode: Mode) => void;
  selectedMode: Mode | null;
}) {
  console.log(selectedMode?.id);

  return (
    <div>
      {modes.map((mode) => (
        <div
          key={mode.id}
          onClick={() => handleSelectedMode(mode)}
          className={`flex bg-background-secondary rounded gap-2 mb-4 cursor-pointer border hover:brightness-125 hover:border-primary transition ${
            selectedMode?.id === mode.id ? 'border-primary' : 'border-border'
          }`}
        >
          <div className='flex gap-2'>
            <div
              className={cn(
                'p-1 rounded-l',
                selectedMode?.id === mode.id ? 'bg-primary' : 'bg-card'
              )}
            >
              <FaSquareCheck
                className={cn(
                  'text-lg',
                  selectedMode?.id === mode.id
                    ? 'text-primary-gradient'
                    : 'text-background-secondary'
                )}
              />
            </div>
          </div>
          <div className='flex flex-col gap-2 w-full'>
            <div className='flex items-center border-b border-border gap-2'>
              <div className='text-icon text-4xl p-4'>{mode.icon}</div>
              <p className='text-lg font-bold'>{mode.name}</p>
            </div>
            <p className='text-sm text-muted pb-4 px-4'>{mode.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// Team Selector
function TeamSelector({
  handleSelectedTeam,
  selectedTeamId,
  teams,
}: {
  handleSelectedTeam: (team: any) => void;
  selectedTeamId: string | null;
  teams: any[];
}) {
  return (
    <div className='relative flex flex-col gap-4 max-h-[200px] overflow-y-auto'>
      {teams?.map((team) => (
        <div
          key={team.id}
          onClick={() => {
            handleSelectedTeam(team.id);
          }}
          className={`flex cursor-pointer border rounded bg-card hover:brightness-125 hover:border-primary transition ${
            selectedTeamId === team.id ? 'border-primary' : 'border-border'
          }`}
        >
          <div
            className={cn(
              'p-1 rounded-l',
              selectedTeamId === team.id
                ? 'bg-primary'
                : 'bg-background-secondary'
            )}
          >
            <FaSquareCheck
              className={cn(
                'text-lg',
                selectedTeamId === team.id
                  ? 'text-primary-gradient'
                  : 'text-background'
              )}
            />
          </div>
          <div className='flex justify-between w-full py-2 px-4'>
            <div className='flex items-center gap-2'>
              <img
                src={team.logo}
                alt={team.school}
                className='bg-foreground p-1 h-9 w-9 rounded-full'
              />
              <div>
                <p className=' uppercase font-semibold'>{team.school}</p>
                <div className='text-sm text-muted'>
                  <Prestige value={team.school_prestige} />
                </div>
              </div>
            </div>
            <div className='flex items-center justify-end gap-6'>
              <div className='flex flex-col items-center gap-1'>
                <img
                  src={team.conference_logo}
                  alt={team.conference_name}
                  className='h-6 w-6 rounded-full object-contain'
                />
              </div>
              <div className='flex flex-col items-center gap-1'>
                <p className='text-[10px] text-muted uppercase font-semibold'>
                  Over
                </p>
                <p className='text-lg font-bold'>{team.overall_rating}</p>
              </div>
              <div className='flex flex-col items-center gap-1'>
                <p className='text-[10px] text-muted uppercase'>Off</p>
                <p className='text-lg font-bold'>{team.offense_rating}</p>
              </div>
              <div className='flex flex-col items-center gap-1'>
                <p className='text-[10px] text-muted uppercase'>Def</p>
                <p className='text-lg font-bold'>{team.defense_rating}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
