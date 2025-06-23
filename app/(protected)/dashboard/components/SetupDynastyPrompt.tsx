"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import CreateDynastyWizard from "./CreateDynastyWizard";

export default function SetupDynastyModal({
  has_created_dynasty,
}: {
  has_created_dynasty: boolean;
}) {
  const [wizardOpen, setWizardOpen] = useState(false);

  return (
    <>
      <div className="min-h-[calc(100vh-132px)] flex flex-col items-center justify-center">
        {!has_created_dynasty ? (
          <Card className="w-full max-w-lg text-foreground shadow-xl">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-2xl font-black border-b border-border pb-2">
                Welcome to MyDynastyHub!
              </h2>
              <p className="py-2">
                Looks like you don&apos;t have a dynasty setup yet. Let&apos;s
                fix that!
              </p>
              <Button
                onClick={() => setWizardOpen(true)}
                className="btn-primary py-4 text-md"
              >
                Create a dynasty
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold mb-2">
              You have no active dynasties
            </h2>
            <p className="text-muted mb-4">
              Start a new dynasty to start tracking.
            </p>
            <Button
              onClick={() => setWizardOpen(true)}
              className="btn-primary py-4 text-md"
            >
              Create a dynasty
            </Button>
          </div>
        )}
      </div>
      <CreateDynastyWizard
        open={wizardOpen}
        onClose={() => setWizardOpen(false)}
      />
    </>
  );
}
