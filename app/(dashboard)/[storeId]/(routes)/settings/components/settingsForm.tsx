'use client';
import React, { useState } from 'react';
import { Store } from '@prisma/client';
import { Trash } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import toast from 'react-hot-toast';

import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useParams, useRouter } from 'next/navigation';
import { AlertModal } from '@/components/modals/alertModal';
import { ApiAlert } from '@/components/ui/apiAlert';
import { useOrigin } from '@/hooks/useOrigin';

const formSchema = z.object({
  name: z.string().min(1),
});

type SettingsFormValue = z.infer<typeof formSchema>;

interface SettingsProps {
  initialDate: Store;
}

export const SettingsForm = ({ initialDate }: SettingsProps) => {
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<SettingsFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialDate,
  });

  const onSubmit = async (data: SettingsFormValue) => {
    try {
      setIsLoading(true);
      await axios.patch(`/api/stores/${params.storeId}`, { params: data });
      router.refresh();
      toast.success('Store was successfully updated.');
    } catch (error) {
      console.log('🚀 ~ file: settingsForm.tsx:42 ~ onSubmit ~ error:', error);
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteHandler = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();
      router.push('/');
      toast.success('Store was successfully deleted.');
    } catch (error) {
      console.log(
        '🚀 ~ file: settingsForm.tsx:56 ~ deleteHandler ~ error:',
        error
      );
      toast.error('Make shure you removed all products and categories first.');
    } finally {
      setIsLoading(false);
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={isModalOpen}
        isLoading={isLoading}
        onClose={() => setIsModalOpen(false)}
        onConfirm={deleteHandler}
      />
      <div className='flex justify-between items-center'>
        <Heading title='Settings' description='Manage store preferences' />
        <Button
          disabled={isLoading}
          variant='destructive'
          size='icon'
          onClick={() => setIsModalOpen(true)}>
          <Trash className='h-4 w-4' />
        </Button>
      </div>
      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 w-full'>
          <div className='grid grid-col-3 gap-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='Store name'
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isLoading} className='ml-auto' type='submit'>
            Save changes
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title={'NEXT_PUBLIC_API_URL'}
        description={`${origin}/api/${params.storeId}`}
        variant={'public'}
      />
    </>
  );
};
