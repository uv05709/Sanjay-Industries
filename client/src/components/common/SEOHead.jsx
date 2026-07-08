import { Helmet } from 'react-helmet-async';

const SEOHead = ({
  title = 'Sanjay Industries',
  description = 'Sanjay Industries — Manufacturer & Wholesale Supplier of Handcrafted Wooden Sindhora, Wedding Items, Religious Products & Decorative Handicrafts from Varanasi, India.',
  keywords = 'wooden sindhora, sindoor box, wooden handicrafts, Varanasi manufacturer, wholesale wooden products, wedding items, religious wooden products',
  canonical = '',
  ogImage = '',
  ogType = 'website',
  jsonLd = null,
}) => {
  const siteUrl = 'https://sanjayindustries.com';
  const fullTitle = title.includes('Sanjay Industries') ? title : `${title} | Sanjay Industries`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {canonical && <link rel="canonical" href={`${siteUrl}${canonical}`} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      {canonical && <meta property="og:url" content={`${siteUrl}${canonical}`} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:site_name" content="Sanjay Industries" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
};

export default SEOHead;
