import React, { ReactNode } from 'react';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import prismaDb from '@/lib/prismadb';
import Navbar from '@/components/navbar';

const DashboardLayout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: { storeId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const store = await prismaDb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });
  console.log('🚀 ~ file: layout.tsx:25 ~ store:', store);

  if (!store) {
    redirect(`/`);
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default DashboardLayout;
