'use client';
import React from 'react';
import Modal from '@/components/ui/modal';
import { useModalStore } from '@/hooks/useStoreModal';

export const StoreModal = () => {
  const isOpen= useModalStore((state) => state.isOpen);
  const onClose = useModalStore((state) => state.onClose);

  return (
    <Modal
      title={'CreateStore'}
      description={'Add new store'}
      isOpen={isOpen}
      onClose={onClose}>
        Create Store form
      </Modal>
  );
};
