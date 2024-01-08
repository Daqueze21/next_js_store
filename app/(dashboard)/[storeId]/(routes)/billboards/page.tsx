import React from 'react';
import prismaDb from '@/lib/prismadb';
import BillboardClient from './components/client';
import { BillboardColumn } from './components/column';
import {format} from 'date-fns';
import dayjs from 'dayjs';


const BillboardsPage = async ({
  params,
}: {
  params: { storeId: string };
}) => {
  const billboards = await prismaDb.billboard.findMany({
    where: { storeId: params.storeId },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: dayjs(item.createdAt).format('MMMM DD, YYYY'),
  }));
  //remove date-fns library later

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;
