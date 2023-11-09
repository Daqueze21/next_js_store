import React from 'react';
import { UserButton, auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { MainNav } from '@/components/mainNav';
import { StoreSwitcher } from '@/components/storeSwitcher';
import prismaDb from '@/lib/prismadb';

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const stores = await prismaDb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className='border-b'>
      <div className='flex items-center h-16 px-4'>
        <StoreSwitcher items={[]} />
        <MainNav className='mx-6'/>
        <div className='flex ml-auto items-center space-x-4'>
          <UserButton afterSignOutUrl='/' />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
