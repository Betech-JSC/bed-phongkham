import React from 'react';
import { Head, usePage } from '@inertiajs/react';

export interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  schema?: Record<string, any> | Array<Record<string, any>>;
}

const DEFAULT_TITLE = 'Phòng Khám Chuyên Khoa Nội - BSCKII Đoàn Khôi';
const DEFAULT_DESCRIPTION = 'Phòng khám chuyên khoa Nội - Tim Mạch BSCKII Đoàn Khôi. Khám, tầm soát và quản lý điều trị tăng huyết áp, nhồi máu cơ tim, đột quỵ, rối loạn nhịp tim chuyên sâu.';
const DEFAULT_KEYWORDS = 'phòng khám tim mạch, bác sĩ Đoàn Khôi, tầm soát tim mạch, tăng huyết áp, nhồi máu cơ tim, đột quỵ, rối loạn nhịp tim, siêu âm tim, holter điện tim';
const DEFAULT_IMAGE = '/assets/heart_care.png';

export default function SEOHead({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  image = DEFAULT_IMAGE,
  url,
  type = 'website',
  schema,
}: SEOHeadProps) {
  const { url: currentPath } = usePage();

  const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const canonicalUrl = url || (siteUrl ? `${siteUrl}${currentPath}` : '');
  const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image.startsWith('/') ? '' : '/'}${image}`;

  const fullTitle = title ? `${title} - ${DEFAULT_TITLE}` : DEFAULT_TITLE;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph / Facebook / Zalo */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={DEFAULT_TITLE} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Canonical Link */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Structured Data (JSON-LD) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Head>
  );
}
