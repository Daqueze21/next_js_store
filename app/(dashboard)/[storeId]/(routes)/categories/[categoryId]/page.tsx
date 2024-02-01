import React from 'react';
import prismaDb from '@/lib/prismadb';
import { CategoryForm } from './components/categoryForm';

const CategoryPage = async ({
  params,
}: {
  params: { categoryId: string, storeId: string };
}) => {
  const category = await prismaDb.category.findUnique({
    where: { id: params.categoryId },
  });

  const billboards = await prismaDb.billboard.findMany({
    where: { storeId: params.storeId },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8'>
        <CategoryForm billboards={billboards} initialData={category} />
      </div>
    </div>
  );
};

export default CategoryPage;
