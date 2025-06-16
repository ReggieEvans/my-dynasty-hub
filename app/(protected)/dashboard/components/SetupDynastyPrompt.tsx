'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CreateDynastyWizard from './CreateDynastyWizard';

export default function SetupDynastyModal() {
  const [wizardOpen, setWizardOpen] = useState(false);

  return (
    <>
      <div className='fixed inset-0 flex items-center justify-center bg-black/50 z-50'>
        <Card className='w-full max-w-lg text-foreground'>
          <CardContent className='p-6 space-y-4'>
            <h2 className='text-2xl font-black border-b border-border pb-2'>
              Welcome to MyDynastyHub!
            </h2>
            <p className='py-2'>
              Looks like you don&apos;t have a dynasty setup yet. Let&apos;s fix
              that!
            </p>
            <Button
              onClick={() => setWizardOpen(true)}
              className='btn-primary py-4 text-md'
            >
              Create My DynastyHub
            </Button>
          </CardContent>
        </Card>
      </div>
      <CreateDynastyWizard
        open={wizardOpen}
        onClose={() => setWizardOpen(false)}
      />
    </>
  );
}
