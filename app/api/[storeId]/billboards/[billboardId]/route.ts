import prismaDb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export const PATCH = async (
  req: Request,
  {
    params,
  }: {
    params: { storeId: string; billboardId: string };
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
      return new NextResponse('Image url is required', { status: 400 });
    }

    if (!params.billboardId) {
      return new NextResponse('Billboard id is required', { status: 400 });
    }

    const storeByUserId = await prismaDb.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized user', { status: 403 });
    }

    const billboard = await prismaDb.billboard.updateMany({
      where: {
        id: params.billboardId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('🚀 ~ file: route.ts:54 ~ error:[BILLBOARDS_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
};

export const DELETE = async (
  _req: Request,
  {
    params,
  }: {
    params: { storeId: string; billboardId: string };
  }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthenticated user', { status: 401 });
    }

    if (!params.billboardId) {
      return new NextResponse('Billboard id is required', { status: 400 });
    }

    const storeByUserId = await prismaDb.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized user', { status: 403 });
    }

    const billboard = await prismaDb.billboard.deleteMany({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('🚀 ~ file: route.ts:94 ~ error:[BILLBOARD_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
};

export const GET = async (
  req: Request,
  {
    params,
  }: {
    params: { billboardId: string };
  }
) => {
  try {
    if (!params.billboardId) {
      return new NextResponse('Billboard id is required', { status: 400 });
    }

    const billboard = await prismaDb.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    console.log('🚀 ~ file: route.ts:120 ~ error:[BILLBOARD GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
};
