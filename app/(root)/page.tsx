'use client';
import { Button } from '@/components/ui/button';
import Modal from '@/components/ui/modal';
import { useModalStore } from '@/hooks/useStoreModal';
import { UserButton } from '@clerk/nextjs';

export default function SetupPage() {
  const isOpen = useModalStore((state) => state.isOpen);
  const onOpen = useModalStore((state) => state.onOpen);
  // const clickHandler = () => {
  //   console.log('hello click handler');
  // };
  return (
    <div className={'p-4'}>
      <UserButton afterSignOutUrl='/' />
      {/* <Modal
        title={'test'}
        description={'test description'}
        isOpen={true}
        onClose={() => {
          console.log('test clicked');
        }}>
        {' children'}
      </Modal> */}
      <Button onClick={onOpen} variant='outline'>
        Click here
      </Button>
    </div>
  );
}
