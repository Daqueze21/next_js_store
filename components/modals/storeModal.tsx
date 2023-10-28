'use client';
import React, { useState } from 'react';
import { z } from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {toast} from 'react-hot-toast';
import { useModalStore } from '@/hooks/useStoreModal';
import Modal from '@/components/ui/modal';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  name: z.string().min(1),
});

export const StoreModal = () => {
  const isOpen = useModalStore((state) => state.isOpen);
  const onClose = useModalStore((state) => state.onClose);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log('onSubmit', values);
    try {
      setIsLoading(true);
      const response = await axios.post('/api/stores', values);
      toast.success('Store was successfully created.');
    } catch (error) {
      console.log("🚀 ~ file: storeModal.tsx:37 ~ onSubmit ~ error:", error);
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title={'CreateStore'}
      description={'Add new store'}
      isOpen={isOpen}
      onClose={onClose}>
      <div>
        <div className='space-y-4 py-2 pb-4'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder='test placeholder' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='pt-6 space-x-2 flex items-center justify-end'>
                <Button
                  variant='outline'
                  onClick={onClose}
                  disabled={isLoading}>
                  Cancel
                </Button>
                <Button disabled={isLoading} type='submit'>
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      Create Store form
    </Modal>
  );
};
