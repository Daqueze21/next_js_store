import prismaDb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export const POST = async (
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
    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated user', { status: 401 });
    }

    if (!label) {
      return new NextResponse('Label is required', { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse('imageUrl is required', { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse('storeId is required', { status: 400 });
    }

    const storeByUserId = await prismaDb.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized user', { status: 403 });
    }

    const billboard = await prismaDb.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    console.log('🚀 ~ file: route.ts:51 ~ error:[BILLBOARDS POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
};

export const GET = async (
  req: Request,
  {
    params,
  }: {
    params: { storeId: string };
  }
) => {
  try {
    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

    const billboards = await prismaDb.billboard.findMany({
      where: {
        storeId: params.storeId,
      },
    });
    return NextResponse.json(billboards);
  } catch (error) {
    console.log('🚀 ~ file: route.ts:76 ~ error: [BILLBOARDS GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
};