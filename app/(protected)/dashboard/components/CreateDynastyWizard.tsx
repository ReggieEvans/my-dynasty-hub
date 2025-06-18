"use client";

import { Layers, Layers2, Search, SquareCheck } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import ScaleLoader from "react-spinners/ScaleLoader";

import { LoadingSpinner } from "@/components/LoadingSpinner";
import Prestige from "@/components/Prestige";
import { RatingPill } from "@/components/RatingPill";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { RootState } from "@/store";
import { useGetBaseTeamsQuery } from "@/store/api/baseTeamsApi";
import { useCreateDynastyMutation } from "@/store/api/dynastyApi";
import { BaseTeam } from "@/types";

interface Mode {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
}

const modes: Mode[] = [
  {
    id: 1,
    name: "Immersive Mode",
    description:
      "The immersive mode is setup for the user that likes to track everything. If your the type of user that likes to keep a spreadsheet for every detail of your dynasty, this is the mode for you.",
    icon: <Layers />,
  },
  {
    id: 2,
    name: "Essentials Mode",
    description:
      "The essentials mode is geared towards those that just want to track outcomes and keep a history of their dynasty. This mode is great for tracking online dynasties with your friends.",
    icon: <Layers2 />,
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
  const [selectedTeam, setSelectedTeam] = useState<BaseTeam | null>(null);
  const [selectedMode, setSelectedMode] = useState<Mode | null>(null);
  const [name, setName] = useState("My Awesome Dynasty");
  const [searchTerm, setSearchTerm] = useState("");
  const [createDynasty, { isLoading: isCreatingDynasty }] =
    useCreateDynastyMutation();

  const { data: baseTeams, isLoading: isLoadingBaseTeams } =
    useGetBaseTeamsQuery();
  //   const [createDynasty] = useCreateDynastyMutation();

  const handleSubmit = async () => {
    if (!user.id || !selectedTeam || !selectedMode || !name) return;

    try {
      await createDynasty({
        userId: user.id,
        dynastyName: name,
        typeId: selectedMode.id,
        baseTeamId: selectedTeam.id,
        startYear: new Date().getFullYear(),
      }).unwrap();

      toast({
        title: "Dynasty created",
        description: "Dynasty created successfully! 🔥",
      });
    } catch (err: any) {
      toast({
        title: "Dynasty creation failed",
        description: err.data ?? "Something went wrong.",
        variant: "destructive",
      });
      handleClose();
    } finally {
      handleClose();
    }
  };

  const handleSelectedMode = (mode: Mode) => {
    setSelectedMode(mode);
  };

  const handleSelectedTeam = (team: BaseTeam) => {
    setSelectedTeam(team);
  };

  const handleClose = () => {
    onClose();
    clearWizard();
  };

  const clearWizard = () => {
    setStep(1);
    setSelectedTeam(null);
    setSelectedMode(null);
    setName("My Awesome Dynasty");
    setSearchTerm("");
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black border-b border-border pb-2 uppercase">
            Create a dynasty
          </DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div>
            <p className="mb-2">
              <span className="text-primary font-bold">Step 1:</span> Choose
              your experience
            </p>
            <p className="mb-4 text-sm text-muted">
              MyDynastyHub offers two modes, immersive and essentials. While all
              features are available in both experiences, the two modes just
              preconfigure the default settings and layout for you based on your
              selection below.
            </p>

            <ExperienceSelector
              handleSelectedMode={handleSelectedMode}
              selectedMode={selectedMode}
            />

            <div className="flex justify-between gap-4">
              <Button
                onClick={handleClose}
                className="bg-background-secondary mt-4 w-1/2"
              >
                Cancel
              </Button>
              <Button
                onClick={() => setStep(2)}
                className="btn-primary mt-4 w-1/2"
                disabled={!selectedMode}
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="flex items-center justify-between gap-4 mb-2">
              <p>
                <span className="text-primary font-bold">Step 2:</span> Select a
                team
              </p>
              <div className="flex items-center gap-2 w-1/2">
                <Search className="text-icon" />
                <Input
                  placeholder="Search by school or conference..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <TeamSelector
              handleSelectedTeam={handleSelectedTeam}
              selectedTeam={selectedTeam}
              teams={baseTeams}
              searchTerm={searchTerm}
              isLoading={isLoadingBaseTeams}
            />

            <p className="text-sm text-muted pt-2">
              If you want to track multiple teams for multi-user dynasties
              you&apos;ll be able to add more teams from the dashboard.
            </p>
            <div className="flex justify-between gap-4">
              <Button
                onClick={() => setStep(1)}
                className="bg-background-secondary mt-4 w-1/2"
              >
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                className="btn-primary mt-4 w-1/2"
                disabled={!selectedTeam}
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <p className="mb-2">
              <span className="text-primary font-bold">Step 3:</span> Name your
              dynasty{" "}
              <span className=" text-sm text-muted">(32 characters max)</span>
            </p>
            <Input
              placeholder="Dynasty Name (e.g. John's Epic Dynasty)"
              value={name}
              maxLength={32}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setName("")}
            />
            <div className="flex justify-between gap-4">
              <Button
                onClick={() => setStep(2)}
                className="bg-background-secondary mt-4 w-1/2"
              >
                Back
              </Button>
              <Button
                onClick={() => setStep(4)}
                className="btn-primary mt-4 w-1/2"
                disabled={!name}
              >
                Verify Selections
              </Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <p className="mb-4">
              <span className="text-primary font-bold">Step 4:</span> Verify
              selections
            </p>
            <div className="flex flex-col gap-2">
              <div className="mb-2">
                <p className="text-xs font-bold uppercase text-muted">Name</p>
                <h2 className="text-2xl font-bold">{name}</h2>
              </div>
              <div className="mb-2">
                <p className="text-xs font-bold uppercase text-muted">Mode</p>
                <h2 className="text-2xl font-bold">{selectedMode?.name}</h2>
              </div>
              <div className="mb-2">
                <p className="text-xs font-bold uppercase text-muted mb-2">
                  Team
                </p>
                <div className="flex flex-col gap-2 border border-border rounded-lg">
                  <div className="flex justify-between w-full bg-card py-4 px-8 rounded-t-lg">
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-foreground p-2">
                        <Image
                          src={selectedTeam?.logo || ""}
                          alt={selectedTeam?.school_name || ""}
                          className="object-contain"
                          width={50}
                          height={50}
                        />
                      </div>
                      <div className="ml-2 w-[250px]">
                        <p className=" uppercase font-semibold text-2xl">
                          {selectedTeam?.school_name}
                        </p>
                        <div className="text-sm text-muted">
                          <Prestige value={selectedTeam?.program_prestige} />
                        </div>
                      </div>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="w-[50px] mr-2">
                            <Image
                              src={selectedTeam?.conference_logo || ""}
                              alt={selectedTeam?.conference || ""}
                              className="object-contain"
                              width={50}
                              height={50}
                            />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="bg-popover text-sm">
                          {selectedTeam?.conference}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex justify-around pt-2 pb-4">
                    <div className="flex flex-col items-center gap-1">
                      <p className="text-sm text-muted uppercase font-semibold">
                        Overall
                      </p>
                      <RatingPill
                        value={selectedTeam?.team_overall}
                        size={"lg"}
                      />
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <p className="text-sm text-muted uppercase font-semibold">
                        Offense
                      </p>
                      <RatingPill
                        value={selectedTeam?.offense_overall}
                        size={"lg"}
                      />
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <p className="text-sm text-muted uppercase font-semibold">
                        Defense
                      </p>
                      <RatingPill
                        value={selectedTeam?.defense_overall}
                        size={"lg"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between gap-4">
              <Button
                onClick={() => setStep(3)}
                className="bg-background-secondary mt-4 w-1/2"
              >
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                className="btn-primary mt-4 w-1/2"
                disabled={!name || isCreatingDynasty}
              >
                {isCreatingDynasty ? (
                  <>
                    <LoadingSpinner className="font-bold" /> Creating Dynasty...
                  </>
                ) : (
                  "Create Dynasty"
                )}
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
  return (
    <div>
      {modes.map((mode) => (
        <div
          key={mode.id}
          onClick={() => handleSelectedMode(mode)}
          className={`flex bg-background-secondary rounded gap-2 mb-4 cursor-pointer border hover:brightness-125 hover:border-primary transition ${
            selectedMode?.id === mode.id ? "border-primary" : "border-border"
          }`}
        >
          <div className="flex gap-2">
            <div
              className={cn(
                "p-1 rounded-l",
                selectedMode?.id === mode.id ? "bg-primary" : "bg-card",
              )}
            >
              <SquareCheck
                size={18}
                strokeWidth={2.5}
                color="#121212"
                className={cn(
                  "text-sm",
                  selectedMode?.id === mode.id
                    ? "text-primary-gradient"
                    : "text-background-secondary",
                )}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center border-b border-border gap-2">
              <div className="text-icon text-4xl p-4">{mode.icon}</div>
              <p className="text-lg font-bold">{mode.name}</p>
            </div>
            <p className="text-sm text-muted pb-4 px-4">{mode.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// Team Selector
function TeamSelector({
  handleSelectedTeam,
  selectedTeam,
  teams,
  searchTerm,
  isLoading,
}: {
  handleSelectedTeam: (team: BaseTeam) => void;
  selectedTeam: BaseTeam | null;
  teams: BaseTeam[] | undefined;
  searchTerm: string;
  isLoading: boolean;
}) {
  const filteredTeams = teams?.filter((team) => {
    const search = searchTerm.toLowerCase();
    return (
      team.school_name.toLowerCase().includes(search) ||
      team.conference.toLowerCase().includes(search)
    );
  });

  return (
    <div className="flex flex-col gap-4 max-h-[300px] min-h-[300px] overflow-y-auto border border-border rounded p-2">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center text-center text-muted py-12 gap-4">
          <ScaleLoader color="#3ecf8e" />
          <p className="text-sm font-bold">Loading teams...</p>
        </div>
      ) : !filteredTeams?.length ? (
        <div className="text-center text-muted py-12">
          <p>No teams found</p>
          <p className="text-sm text-muted">
            Try searching for a different team or conference.
          </p>
        </div>
      ) : (
        filteredTeams?.map((team) => (
          <div
            key={team.id}
            onClick={() => {
              handleSelectedTeam(team);
            }}
            className={`flex cursor-pointer border rounded bg-card hover:brightness-125 hover:border-primary transition ${
              selectedTeam?.id === team.id ? "border-primary" : "border-border"
            }`}
          >
            <div
              className={cn(
                "p-1 rounded-l",
                selectedTeam?.id === team.id
                  ? "bg-primary"
                  : "bg-background-secondary",
              )}
            >
              <SquareCheck
                size={16}
                strokeWidth={2.5}
                color="#121212"
                className={cn(
                  "text-sm",
                  selectedTeam?.id === team.id
                    ? "text-primary-gradient"
                    : "text-background",
                )}
              />
            </div>
            <div className="flex justify-between w-full py-2 px-4">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-foreground p-2">
                  <Image
                    src={team.logo}
                    alt={team.school_name}
                    className="object-contain"
                    width={30}
                    height={30}
                  />
                </div>
                <div>
                  <p className=" uppercase font-semibold">{team.school_name}</p>
                  <div className="text-sm text-muted">
                    <Prestige value={team.program_prestige} />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end gap-6">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="flex flex-col items-center gap-1">
                        <Image
                          src={team.conference_logo}
                          alt={team.conference}
                          className="object-contain"
                          width={24}
                          height={24}
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-popover text-sm">
                      {team.conference}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <div className="flex flex-col items-center gap-1">
                  <p className="text-[10px] text-muted uppercase font-semibold">
                    Over
                  </p>
                  <RatingPill value={team.team_overall} />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <p className="text-[10px] text-muted uppercase">Off</p>
                  <RatingPill value={team.offense_overall} />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <p className="text-[10px] text-muted uppercase">Def</p>
                  <RatingPill value={team.defense_overall} />
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
