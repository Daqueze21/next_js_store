import prismaDb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export const PATCH = async (
  req: Request,
  {
    params,
  }: {
    params: { storeId: string; categoryId: string };
  }
) => {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, billboardId } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated user', { status: 401 });
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse('Billboard Id is required', { status: 400 });
    }

    if (!params.categoryId) {
      return new NextResponse('Category id is required', { status: 400 });
    }

    const storeByUserId = await prismaDb.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized user', { status: 403 });
    }

    const category = await prismaDb.category.updateMany({
      where: {
        id: params.categoryId,
      },
      data: {
        name,
        billboardId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log('🚀 ~ file: route.ts:54 ~ error:[category_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
};

export const DELETE = async (
  _req: Request,
  {
    params,
  }: {
    params: { storeId: string; categoryId: string };
  }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthenticated user', { status: 401 });
    }

    if (!params.categoryId) {
      return new NextResponse('category id is required', { status: 400 });
    }

    const storeByUserId = await prismaDb.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized user', { status: 403 });
    }

    const category = await prismaDb.category.deleteMany({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log('🚀 ~ file: route.ts:94 ~ error:[category_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
};

export const GET = async (
  req: Request,
  {
    params,
  }: {
    params: { categoryId: string };
  }
) => {
  try {
    if (!params.categoryId) {
      return new NextResponse('Category id is required', { status: 400 });
    }

    const category = await prismaDb.category.findUnique({
      where: {
        id: params.categoryId,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log('🚀 ~ file: route.ts:120 ~ error:[Category GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
};
