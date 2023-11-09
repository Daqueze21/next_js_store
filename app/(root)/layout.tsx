import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

import prismaDb from '@/lib/prismadb';

const SetupLayout = async function ({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();
  console.log("🚀 ~ file: layout.tsx:12 ~ userId:", userId);

  if (!userId) {
    redirect('/sign-in');
  }

  const store = await prismaDb.store.findFirst({
    where: {
      userId
    },  });

  if (store) {
    redirect(`/${store.id}`);
  }

  return (<>{children}</>);
}

export default SetupLayout;
