import React from 'react';
import prismaDb from '@/lib/prismadb';


const DashboardPage = async ({ params } : {params: {
  userId: string;
}}) => {
  const store = await prismaDb.store.findFirst({
    where: {
      id: params.userId,
    },
  });

  return <div>{store?.name}</div>;
};

export default DashboardPage;