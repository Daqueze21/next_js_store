import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

const prismaDb = new PrismaClient();
if (process.env.NODE_ENV === 'production') globalThis.prisma = prismaDb;

export default prismaDb;
