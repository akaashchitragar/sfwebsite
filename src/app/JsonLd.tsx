export default function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "NGO",
    "name": "Sanghachadwam Foundation",
    "alternateName": "SF",
    "url": "https://sanghachadwam.org",
    "logo": "https://sanghachadwam.org/logo.png",
    "sameAs": [
      "https://facebook.com/sanghachadwam",
      "https://twitter.com/sanghachadwam",
      "https://instagram.com/sanghachadwam",
      "https://linkedin.com/company/sanghachadwam-foundation"
    ],
    "description": "Transforming agriculture into a first-choice profession, empowering rural youth to become agri-preneurs.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "27, Nehru Nagar, Gokul Road",
      "addressLocality": "Hubballi",
      "addressRegion": "Karnataka",
      "postalCode": "580030",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-9999999999",
      "contactType": "customer service",
      "email": "info@sfmail.co.in",
      "availableLanguage": ["English", "Kannada", "Hindi"]
    },
    "foundingDate": "2020",
    "founders": [
      {
        "@type": "Person",
        "name": "Sanghachadwam Founder"
      }
    ],
    "areaServed": ["Karnataka", "India"]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
} 