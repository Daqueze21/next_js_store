import prismaDb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export const PATCH = async (
  req: Request,
  {
    params,
  }: {
    params: { storeId: string };
  }
) => {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;

    if (!userId) {
      return new NextResponse('Unauthorized user', { status: 401 });
    }
    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const store = await prismaDb.store.updateMany({
      where: {
        id: params.storeId,
        userId,
      },
      data: {
        name,
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log('🚀 ~ file: route.ts:8 ~ [STORE PATCH] ~ error:', error);
    return new NextResponse('Internal error', { status: 500 });
  }
};

export const DELETE = async (
  _req: Request,
  {
    params,
  }: {
    params: { storeId: string };
  }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized user', { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const store = await prismaDb.store.deleteMany({
      where: {
        id: params.storeId,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log('🚀 ~ file: route.ts:8 ~ [STORE_DELETE] ~ error:', error);
    return new NextResponse('Internal error', { status: 500 });
  }
};
