import { Button } from '@/components/ui/button';

export const QuickActions = () => {
  return (
    <div className='flex flex-col gap-2 p-2 '>
      <Button
        variant='outline'
        className='bg-transparent text-white border border-white w-full'
      >
        Log Game
      </Button>
      <Button
        variant='outline'
        className='bg-transparent text-white border border-white w-full'
      >
        Add Recruit
      </Button>
      <Button
        variant='outline'
        className='bg-transparent text-white border border-white w-full'
      >
        Add Trophy
      </Button>
      <Button
        variant='outline'
        className='bg-transparent text-white border border-white w-full'
      >
        Add Award
      </Button>
    </div>
  );
};
