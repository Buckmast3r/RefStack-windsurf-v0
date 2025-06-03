import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import { generateProfileMetadata } from '@/components/seo/metadata';

// Generate dynamic metadata for public profile pages
export async function generateMetadata({
  params,
}: {
  params: { username: string };
}): Promise<Metadata> {
  const { username } = params;
  
  // Fetch user data from database
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      name: true,
      username: true,
      bio: true,
      avatarUrl: true,
    },
  });

  // If user not found, return default metadata
  if (!user) {
    return {
      title: 'User Not Found | RefStack',
      description: 'This user does not exist or has not created a public profile yet.',
    };
  }

  // Base URL for the public profile
  const url = `${process.env.NEXT_PUBLIC_APP_URL}/public-stack/${username}`;

  // Generate SEO-friendly metadata
  return generateProfileMetadata({
    username: user.username || username,
    name: user.name || undefined,
    bio: user.bio || undefined,
    avatarUrl: user.avatarUrl || undefined,
    url,
  });
}
