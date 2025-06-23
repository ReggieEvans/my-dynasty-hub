"use client";

import { useSelector } from "react-redux";

import Loading from "@/components/Loading";
import { RootState } from "@/store";
import {
  useGetActiveDynastyQuery,
  useGetUserTeamByDynastyIdQuery,
} from "@/store/api/dynastyApi";

import DashboardGrid from "./components/DashboardGrid";
import SetupDynastyPrompt from "./components/SetupDynastyPrompt";
import TeamHeader from "./components/TeamHeader";

export default function DashboardPage() {
  const user = useSelector((state: RootState) => state.auth);

  const { data: activeDynasty, isLoading: isLoadingActiveDynasty } =
    useGetActiveDynastyQuery();

  const {
    data: dynastyTeam,
    isFetching: isFetchingTeam,
    isLoading: isLoadingTeam,
  } = useGetUserTeamByDynastyIdQuery(activeDynasty?.id || "", {
    skip: !activeDynasty?.id,
  });

  if (!user.id || isLoadingActiveDynasty) {
    return <Loading text="Searching for dynasty..." />;
  }

  if (isLoadingTeam || isFetchingTeam) {
    return <Loading text="Loading dashboard..." />;
  }

  if (!activeDynasty) {
    return <SetupDynastyPrompt has_created_dynasty={user.hasCreatedDynasty} />;
  }

  return (
    <div className="w-full">
      <TeamHeader dynastyTeam={dynastyTeam} user={user} />
      <DashboardGrid mode="immersive" />
    </div>
  );
}
