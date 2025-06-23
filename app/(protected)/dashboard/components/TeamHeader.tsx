"use client";

import Image from "next/image";

import Prestige from "@/components/Prestige";
import { hexToRgba } from "@/lib/utils/hexToRgba";
import { RootState } from "@/store";
import { DynastyTeam } from "@/types/dynastyTeam";

type Props = {
  dynastyTeam: DynastyTeam | undefined;
  user: RootState["auth"];
};

export default function TeamHeader({ dynastyTeam, user }: Props) {
  const backgroundStyle = dynastyTeam?.primary_color
    ? {
        backgroundColor: hexToRgba(dynastyTeam.primary_color, 0.3),
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderColor: dynastyTeam.secondary_color || "transparent",
      }
    : {};

  return (
    <div
      style={{
        borderColor: dynastyTeam?.secondary_color || "transparent",
      }}
      className="relative flex justify-between items-center w-full rounded-t-lg py-4 px-6 border-b-4 bg-card"
    >
      <div
        style={backgroundStyle}
        className="absolute inset-0 z-10 rounded-t"
      />
      <div className="flex items-center gap-6 z-20">
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
              className="flex items-center gap-1 text-2xl font-black uppercase brightness-125"
            >
              {dynastyTeam?.ap_poll_rank && (
                <span className="text-lg bg-foreground rounded px-1 py-0.5 leading-none mr-1">
                  {dynastyTeam?.ap_poll_rank}
                </span>
              )}
              {dynastyTeam?.school_name}
            </div>
            <div className="text-4xl font-black uppercase leading-[36px]">
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
      <div className="z-20">
        <Image
          src={dynastyTeam?.logo || ""}
          alt="Team Logo"
          width={125}
          height={125}
        />
      </div>
    </div>
  );
}
