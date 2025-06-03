'use client';

import React from 'react';
import Head from 'next/head';
import { Metadata } from 'next';

// Helper function to generate basic metadata for Next.js App Router
export function generateMetadata({
  title,
  description,
  image,
  url,
  type = 'website',
}: {
  title: string;
  description: string;
  image?: string;
  url: string;
  type?: 'website' | 'profile' | 'article';
}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'RefStack',
      images: [
        {
          url: image || 'https://refstack.app/images/default-sharing-image.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image || 'https://refstack.app/images/default-sharing-image.png'],
    },
  };
}

// For client components, use this component to add meta tags
export function SocialMetaTags({
  title,
  description,
  image,
  url,
  type = 'website',
}: {
  title: string;
  description: string;
  image?: string;
  url: string;
  type?: 'website' | 'profile' | 'article';
}) {
  // Set default image if not provided
  const metaImage = image || 'https://refstack.app/images/default-sharing-image.png';

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:site_name" content="RefStack" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={metaImage} />
      <meta property="twitter:site" content="@refstack" />
    </Head>
  );
}

// Helper for profile pages
export function generateProfileMetadata({
  username,
  name,
  bio,
  avatarUrl,
  url,
}: {
  username: string;
  name?: string;
  bio?: string;
  avatarUrl?: string;
  url: string;
}): Metadata {
  const title = name ? `${name} (@${username}) | RefStack` : `@${username} | RefStack`;
  const description = bio || `Check out ${username}'s referral links and recommendations on RefStack`;

  return generateMetadata({
    title,
    description,
    image: avatarUrl,
    url,
    type: 'profile',
  });
}

// Helper for referral link pages
export function generateReferralMetadata({
  linkName,
  description,
  username,
  image,
  url,
}: {
  linkName: string;
  description?: string;
  username: string;
  image?: string;
  url: string;
}): Metadata {
  const title = `${linkName} - Recommended by @${username} | RefStack`;
  const metaDescription = description || `Check out ${linkName}, recommended by @${username} on RefStack`;

  return generateMetadata({
    title,
    description: metaDescription,
    image,
    url,
    type: 'article',
  });
}
