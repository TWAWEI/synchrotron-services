import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { ContactContent } from "@/components/sections/contact-content";

export const metadata: Metadata = {
  title: "聯絡我們",
  description: `透過表單與 ${siteConfig.name} 聯繫，我們的專業團隊將盡快回覆您的諮詢。`,
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPoint",
    telephone: siteConfig.contactPhone,
    email: siteConfig.contactEmail,
    contactType: "customer service",
    areaServed: "TW",
    availableLanguage: "zh-TW",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactContent />
    </>
  );
}
