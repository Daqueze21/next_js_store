'use client';

import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge, BadgeProps } from '@/components/ui/badge';
import { Copy, Server } from 'lucide-react';
import { Button } from './button';
import toast from 'react-hot-toast';

interface ApiAlertProps {
  title: string;
  description: string;
  variant: 'public' | 'admin';
}

const textMap: Record<ApiAlertProps['variant'], string> = {
  public: 'Public',
  admin: 'Admin',
};

const variantMap: Record<ApiAlertProps['variant'], BadgeProps['variant']> = {
  public: 'secondary',
  admin: 'destructive',
};

export const ApiAlert = ({
  title,
  description,
  variant = 'public',
}: ApiAlertProps) => {
  const onCopy = () => {
    toast.success('API Route copied  to the clipboard' + description);
  };
  return (
    <Alert>
      <Server className='h-4 w-4' />
      <AlertTitle className='flex item-center gap-x-2'>
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className='flex items-center justify-between mt-4'>
        <code className='relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono txt-sm font-semibold'>
          {description}
        </code>
        <Button variant={'outline'} size='icon' onClick={onCopy}>
          <Copy className='h-4 w-4' />
        </Button>
      </AlertDescription>
    </Alert>
  );
};
