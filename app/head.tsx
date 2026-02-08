export default function Head() {
  const siteUrl = "https://houseofhopechildren.vercel.app"; // update to your production URL
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "House of Hope",
    url: siteUrl,
    sameAs: [
      //https://www.facebook.com/share/1BomfS3GUZ/
    ],
    logo: `${siteUrl}/file.svg`,
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "House of Hope",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/?s={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="image" content={`${siteUrl}/file.svg`} />
      <meta name="theme-color" content="#0ea5e9" />

      {/* Twitter / Open Graph fallback meta (mostly handled via metadata API) */}
      <meta name="twitter:card" content="summary_large_image" />

      {/* Canonical — default to site root; override per-page if needed */}
      <link rel="canonical" href={siteUrl} />

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteLd)}</script>
    </>
  );
}
