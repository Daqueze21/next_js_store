import prismaDb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  try {
    const {userId} = auth();
    const body = await req.json();
    const {name}= body;
    if(!userId) {
      return new NextResponse('Unauthorized user', { status: 401 });
    }
    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }
    const store = await prismaDb.store.create({data:{name, userId}});
    return NextResponse.json(store);
  } catch (error) {
    console.log('🚀 ~ file: route.ts:5 ~ POST ~ error:', error);
    return new NextResponse('Interal error', { status: 500 });
  }
}
