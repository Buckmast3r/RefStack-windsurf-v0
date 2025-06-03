import React from 'react';
import Head from 'next/head';

// Define the interface for component props with strict typing
interface MetaTagsProps {
  title: string;
  description: string;
  image?: string;
  url: string;
  type?: 'website' | 'profile' | 'article';
  twitterCardType?: 'summary' | 'summary_large_image';
  siteName?: string;
  twitterHandle?: string;
}

export function MetaTags({
  title,
  description,
  image,
  url,
  type = 'website',
  twitterCardType = 'summary_large_image',
  siteName = 'RefStack',
  twitterHandle = '@refstack',
}: MetaTagsProps) {
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
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta property="twitter:card" content={twitterCardType} />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={metaImage} />
      <meta property="twitter:site" content={twitterHandle} />

      {/* Schema.org structured data for better SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': type === 'profile' ? 'Person' : 'WebSite',
            name: title,
            description: description,
            url: url,
            ...(type === 'profile' && {
              image: metaImage,
            }),
          }),
        }}
      />
    </Head>
  );
}

// Export a more specific version for profile pages
export function ProfileMetaTags({
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
}) {
  const title = name ? `${name} (@${username}) | RefStack` : `@${username} | RefStack`;
  const description = bio || `Check out ${username}'s referral links and recommendations on RefStack`;

  return (
    <MetaTags
      title={title}
      description={description}
      image={avatarUrl}
      url={url}
      type="profile"
      twitterCardType="summary_large_image"
    />
  );
}

// Export a more specific version for referral link pages
export function ReferralMetaTags({
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
}) {
  const title = `${linkName} - Recommended by @${username} | RefStack`;
  const metaDescription = description || `Check out ${linkName}, recommended by @${username} on RefStack`;

  return (
    <MetaTags
      title={title}
      description={metaDescription}
      image={image}
      url={url}
      type="article"
      twitterCardType="summary"
    />
  );
}
