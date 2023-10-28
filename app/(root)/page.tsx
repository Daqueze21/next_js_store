'use client';
import { Button } from '@/components/ui/button';
import Modal from '@/components/ui/modal';
import { useModalStore } from '@/hooks/useStoreModal';
import { UserButton } from '@clerk/nextjs';

export default function SetupPage() {
  const isOpen = useModalStore((state) => state.isOpen);
  const onOpen = useModalStore((state) => state.onOpen);

  return (
    <div className={'p-4'}>
      <UserButton afterSignOutUrl='/' />
      <Button onClick={onOpen} variant='outline'>
        Click here
      </Button>
    </div>
  );
}
