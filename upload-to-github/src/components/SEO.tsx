import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const languageLocales: Record<string, string> = {
  zh: 'zh_CN',
  en: 'en_US',
  pt: 'pt_BR',
  es: 'es_ES',
  de: 'de_DE',
  ru: 'ru_RU',
  ko: 'ko_KR',
  it: 'it_IT',
  fr: 'fr_FR',
  ar: 'ar_SA',
  ja: 'ja_JP',
  hi: 'hi_IN',
};

const languageNames: Record<string, string> = {
  zh: 'Chinese',
  en: 'English',
  pt: 'Portuguese',
  es: 'Spanish',
  de: 'German',
  ru: 'Russian',
  ko: 'Korean',
  it: 'Italian',
  fr: 'French',
  ar: 'Arabic',
  ja: 'Japanese',
  hi: 'Hindi',
};

export default function SEO({
  title,
  description,
  keywords,
  image = '/og-image.jpg',
  url = 'https://shshiyin.cn',
  type = 'website',
}: SEOProps) {
  const { t, i18n } = useTranslation();

  const currentTitle = title || t('seo.title');
  const currentDescription = description || t('seo.description');
  const currentKeywords = keywords || t('seo.keywords');
  const currentLang = i18n.language;

  // Update HTML lang attribute
  useEffect(() => {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  }, [currentLang]);

  const getOGLocale = () => {
    return languageLocales[currentLang] || 'zh_CN';
  };

  const getLanguageContent = () => {
    return languageNames[currentLang] || 'Chinese';
  };

  return (
    <>
      {/* Primary Meta Tags */}
      <title>{currentTitle}</title>
      <meta name="title" content={currentTitle} />
      <meta name="description" content={currentDescription} />
      <meta name="keywords" content={currentKeywords} />
      <meta name="author" content="Shanghai Shiyin Endoscope Co., Ltd." />
      <meta name="robots" content="index, follow" />
      <meta name="language" content={getLanguageContent()} />
      <meta name="revisit-after" content="7 days" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={currentTitle} />
      <meta property="og:description" content={currentDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Shanghai Shiyin Endoscope" />
      <meta property="og:locale" content={getOGLocale()} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={currentTitle} />
      <meta property="twitter:description" content={currentDescription} />
      <meta property="twitter:image" content={image} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Schema.org Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Shanghai Shiyin Endoscope Co., Ltd.",
          "url": url,
          "logo": `${url}/logo.png`,
          "description": currentDescription,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Shanghai",
            "addressRegion": "Shanghai",
            "addressCountry": "CN"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+86-13072150777",
            "contactType": "customer service",
            "availableLanguage": ["Chinese", "English"]
          },
          "sameAs": [
            "https://facebook.com/shiyin",
            "https://twitter.com/shiyin",
            "https://linkedin.com/company/shiyin"
          ]
        })}
      </script>

      {/* Medical Device Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Medical Endoscope System",
          "description": "High-quality medical endoscope systems including 4K camera systems, LED cold light sources, CO2 insufflators, irrigation pumps, and accessories.",
          "brand": {
            "@type": "Brand",
            "name": "Shanghai Shiyin"
          },
          "manufacturer": {
            "@type": "Organization",
            "name": "Shanghai Shiyin Endoscope Co., Ltd."
          },
          "category": "Medical Devices",
          "offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "priceValidUntil": "2025-12-31",
            "availability": "https://schema.org/InStock"
          }
        })}
      </script>
    </>
  );
}
