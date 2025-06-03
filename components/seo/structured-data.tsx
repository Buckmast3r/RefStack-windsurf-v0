import React from 'react';
import Script from 'next/script';

interface WebsiteStructuredDataProps {
  name: string;
  description: string;
  url: string;
}

export function WebsiteStructuredData({ name, description, url }: WebsiteStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    description,
    url,
  };

  return (
    <Script
      id="website-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

interface ProfileStructuredDataProps {
  name: string;
  username: string;
  description?: string;
  image?: string;
  url: string;
}

export function ProfileStructuredData({
  name,
  username,
  description,
  image,
  url,
}: ProfileStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: name || username,
    alternateName: `@${username}`,
    description: description || `${username}'s referral stack on RefStack`,
    url,
    ...(image && { image }),
  };

  return (
    <Script
      id="profile-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

interface ReferralStructuredDataProps {
  name: string;
  description?: string;
  url: string;
  image?: string;
  authorName: string;
  authorUrl: string;
  datePublished: string;
}

export function ReferralStructuredData({
  name,
  description,
  url,
  image,
  authorName,
  authorUrl,
  datePublished,
}: ReferralStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: name,
    description: description || `${name} referral link`,
    url,
    ...(image && { image }),
    author: {
      '@type': 'Person',
      name: authorName,
      url: authorUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'RefStack',
      url: 'https://refstack.app',
      logo: {
        '@type': 'ImageObject',
        url: 'https://refstack.app/logo.png',
      },
    },
    datePublished,
    dateModified: new Date().toISOString(),
  };

  return (
    <Script
      id="referral-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
