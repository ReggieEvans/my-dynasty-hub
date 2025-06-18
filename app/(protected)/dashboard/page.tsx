"use client";

import Image from "next/image";
import { useSelector } from "react-redux";

import Loading from "@/components/Loading";
import Prestige from "@/components/Prestige";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RootState } from "@/store";
import {
  useGetActiveDynastyQuery,
  useGetUserTeamByDynastyIdQuery,
} from "@/store/api/dynastyApi";

import SetupDynastyPrompt from "./components/SetupDynastyPrompt";

export default function DashboardPage() {
  const user = useSelector((state: RootState) => state.auth);

  const { data: activeDynasty, isLoading: isLoadingActiveDynasty } =
    useGetActiveDynastyQuery();

  const {
    data: dynastyTeam,
    isFetching: isFetchingTeam,
    isLoading: isLoadingTeam,
  } = useGetUserTeamByDynastyIdQuery(activeDynasty?.id, {
    skip: !activeDynasty?.id,
  });

  if (!user.id || isLoadingActiveDynasty) {
    return <Loading text="Looking for active dynasty..." />;
  }

  if (isLoadingTeam || isFetchingTeam) {
    return <Loading text="Loading dashboard..." />;
  }

  if (!activeDynasty) {
    return <SetupDynastyPrompt has_created_dynasty={user.hasCreatedDynasty} />;
  }

  console.log(dynastyTeam);

  return (
    <div className="w-full">
      <div
        style={{
          borderColor: dynastyTeam?.primary_color || "transparent",
        }}
        className="flex justify-between items-center w-full rounded-t-lg py-4 px-6 bg-card border-b-4"
      >
        <div className="flex items-center gap-6">
          <div
            style={{
              backgroundColor: dynastyTeam?.primary_color || "transparent",
            }}
            className="rounded py-2 px-6 flex flex-col "
          >
            <div className="text-xs font-bold uppercase">Overall</div>
            <div className="text-8xl font-black leading-[80px]">
              {dynastyTeam?.team_overall}
            </div>
            <div className="py-1">
              <Prestige value={dynastyTeam?.program_prestige} size="lg" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <div
                style={{
                  color: dynastyTeam?.primary_color || "text-foreground",
                }}
                className="text-xl font-black uppercase"
              >
                {dynastyTeam?.school_name}
              </div>
              <div className="text-5xl font-black uppercase leading-[32px]">
                {dynastyTeam?.nickname}
              </div>
            </div>
            <div className="flex gap-8 mt-4 uppercase">
              <div className="flex flex-col">
                <div className="text-xs font-bold text-muted">Coach</div>
                <div className="font-black">{user.displayName}</div>
              </div>
              <div className="flex flex-col">
                <div className="text-xs font-bold text-muted">Conference</div>
                <div className="font-black">{dynastyTeam?.conference}</div>
              </div>
              <div className="flex flex-col">
                <div className="text-xs font-bold text-muted">Season</div>
                <div className="font-black">1</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Image
            src={dynastyTeam?.logo}
            alt="Team Logo"
            width={100}
            height={100}
          />
        </div>
      </div>
    </div>
  );
}
