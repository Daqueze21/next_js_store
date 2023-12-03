import React from 'react';
import prismaDb from '@/lib/prismadb';

const DashboardPage = async ({ params } : {params: {
  storeId: string
}}) => {
  const store = await prismaDb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  return <div>Active store: {store?.name}</div>;
};

export default DashboardPage;