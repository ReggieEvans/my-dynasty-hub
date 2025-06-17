"use client";

import { useSelector } from "react-redux";

import Loading from "@/components/Loading";
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

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <Card className="max-w-xl w-full text-center bg-card border border-border">
        <CardHeader>
          <CardTitle className="text-2xl text-foreground font-black uppercase">
            Welcome to MyDynastyHub!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground">
            You&apos;re now logged in. This is your home page.
          </p>
          <p className="text-sm text-muted">
            You can start customizing your dashboard, connect APIs, or build new
            features.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
