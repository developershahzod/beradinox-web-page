import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, canonical, type = 'website', image, noindex = false }) => {
  const siteName = 'Beradinox';
  const baseUrl = 'https://beradinox.uz';
  const defaultDescription = 'Beradinox — терминал металлопродукции №1 в Узбекистане. Нержавеющая сталь, алюминий, металлопрокат, оборудование. Доставка по всему Узбекистану.';
  const defaultImage = `${baseUrl}/logo-beradinox.png`;

  const seoTitle = title ? `${title} | ${siteName}` : `${siteName} — Металлопрокат, нержавеющая сталь и алюминий в Узбекистане`;
  const seoDescription = description || defaultDescription;
  const seoImage = image || defaultImage;
  const seoCanonical = canonical ? `${baseUrl}${canonical}` : baseUrl;

  return (
    <Helmet>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <link rel="canonical" href={seoCanonical} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content={type} />
      <meta property="og:url" content={seoCanonical} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="ru_RU" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
    </Helmet>
  );
};

export default SEO;
