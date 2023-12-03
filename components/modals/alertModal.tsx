import React, { useEffect, useState } from 'react';
import Modal from '@/components/ui/modal';
import {
  Form,
  FormControl,
  // FormField,
  // FormItem,
  // FormLabel,
  // FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';

interface IAlertModalProps {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const AlertModal = ({
  isOpen,
  isLoading,
  onClose,
  onConfirm,
}: IAlertModalProps) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={'Are you sure'}
      description={'This action cannot be undone'}
      isOpen={isOpen}
      onClose={onClose}>
      <div className='flex justify-end items-center space-x-2 pt-6 '>
        <Button disabled={isLoading} variant='outline' onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={isLoading} variant='destructive' onClick={onConfirm}>
          Continue
        </Button>
      </div>
    </Modal>
  );
};
