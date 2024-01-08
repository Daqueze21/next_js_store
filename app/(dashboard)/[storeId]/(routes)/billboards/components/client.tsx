'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { Billboard } from '@prisma/client';
import { BillboardColumn, columns } from './column';
import { DataTable } from '@/components/ui/dataTable';
import { ApiList } from '@/components/ui/apiList';

interface BillboardClientProps {
  data: BillboardColumn[];
}

const BillboardClient = ({ data }: BillboardClientProps) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Billboards (${data.length})`}
          description={'Manage billboards for your store'}
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
          className='bg-green-700 hover:bg-green-800'>
          <Plus className='mr-2 h-4 w-4' />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey={'label'} columns={columns} data={data} />
      <Heading title={'API'} description={'API calls for billboards'} />
      <Separator />
      <ApiList entityName='billboards' entityIdName='billboardId' />
    </>
  );
};

export default BillboardClient;
