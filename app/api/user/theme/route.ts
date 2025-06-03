import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const data = await request.json();
    // Only allow customTheme for PRO/ENTERPRISE
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { subscription: true },
    });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    const plan = user.subscription?.plan || 'FREE';
    let updateData: any = { theme: data.theme || 'default' };
    if ((plan === 'PRO' || plan === 'ENTERPRISE') && data.customTheme) {
      // Upsert a custom theme row
      await prisma.userTheme.upsert({
        where: { userId: user.id },
        update: { name: data.customTheme },
        create: { userId: user.id, name: data.customTheme },
      });
      updateData.customTheme = data.customTheme;
    }
    await prisma.userPreference.upsert({
      where: { userId: user.id },
      update: updateData,
      create: { userId: user.id, ...updateData },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating theme:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
