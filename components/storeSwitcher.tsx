'use client';

import React, { ComponentPropsWithoutRef, useState } from 'react';
import { Popover, PopoverTrigger } from '@/components/ui/popover';
import { Store } from '@prisma/client';
import { useModalStore } from '@/hooks/useStoreModal';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PopoverContent } from '@radix-ui/react-popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';

type PopoverTriggerProps = ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[];
}

export const StoreSwitcher = ({
  className,
  items = [],
}: StoreSwitcherProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const storeModal = useModalStore();
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId
  );
  const onStoreSelect = (store: { value: string; label: string }) => {
    setIsOpen(false);
    router.push(`/${store.value}`);
  };

  const createStoreHandler = () => {
    setIsOpen(false);
    storeModal.onOpen();
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          size={'sm'}
          role='combobox'
          aria-expanded={isOpen}
          area-aria-label='Selected a store'
          className={cn('w-[200px] justify-between', className)}>
          <StoreIcon className='h-4 w-4 mr-2' />
          Current Store
          <ChevronsUpDown className='ml-auto h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={'w-[200px] mt-1 p-0 border border-gray-200 rounded-md'}>
        <Command>
          <CommandList>
            <CommandInput placeholder='search store...' />
            <CommandEmpty>No store found.</CommandEmpty>
            <CommandGroup heading='Stores'>
              {formattedItems.map((store) => (
                <CommandItem
                  key={store.value}
                  onSelect={() => onStoreSelect(store)}
                  className='text-sm'>
                  <StoreIcon className='h-4 w-4 mr-2' />
                  {store.label}
                  <Check
                    className={cn(
                      'ml-auto h-4 w-4',
                      currentStore?.value === store.value
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem onSelect={createStoreHandler}>
                <PlusCircle className={'h-5 w-5 mr-2'} />
                Create a new store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
