'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ImagePlus, Trash } from 'lucide-react';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';

interface ImageUploadProps {
  value: string[];
  disabled: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

export const ImageUpload = ({
  value,
  disabled,
  onChange,
  onRemove,
}: ImageUploadProps) => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!mounted) {
    return '';
  }

  return (
    <div>
      <div className='flex item-center gap-4 mb-4'>
        {value.map((url) => (
          <div
            key={url}
            className='relative w-[200px] h-[200px]  overflow-hidden rounded-md'>
            <div className='absolute top-2 right-2 z-10'>
              <Button
                type='button'
                onClick={() => onRemove(url)}
                variant='destructive'
                size='icon'>
                <Trash className='h-4 w-4' />
              </Button>
            </div>
            <Image fill src={url} alt='Image' className='object-cover' />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset='lwyuijsq'>
        {({ open }) => {
          const onClick = () => open();
          return (
            <Button
              type='button'
              onClick={onClick}
              disabled={disabled}
              variant='secondary'>
              <ImagePlus className='h-4 w-4 mr-2' />
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};
