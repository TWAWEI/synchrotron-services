import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Microscope, BrainCircuit, Server, Handshake, CheckCircle } from "lucide-react";
import type { ComponentType } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { services } from "@/content/services";
import { siteConfig } from "@/content/site";

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Microscope,
  BrainCircuit,
  Server,
  Handshake,
};

type Props = {
  params: Promise<{ service: string }>;
};

export async function generateStaticParams() {
  return services.map((service) => ({
    service: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service: slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: "找不到此服務",
    };
  }

  return {
    title: `${service.title} - 合作方式`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { service: slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const Icon = iconMap[service.icon];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <main>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="bg-primary py-20" aria-label="Service hero">
        <div className="mx-auto max-w-6xl px-4">
          <AnimateOnScroll>
            <div className="flex flex-col items-center text-center gap-4">
              {Icon && (
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/10">
                  <Icon className="h-8 w-8 text-accent" />
                </div>
              )}
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                {service.title}
              </h1>
              <p className="text-xl text-white/80 max-w-2xl">
                {service.description}
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Detail List Section */}
      <section className="py-20 bg-surface" aria-label="Service details">
        <div className="mx-auto max-w-6xl px-4">
          <AnimateOnScroll>
            <SectionHeading
              title="服務內容"
              subtitle={`${service.title}的詳細說明與服務項目`}
              align="left"
            />
          </AnimateOnScroll>

          <ul className="flex flex-col gap-4">
            {service.details.map((detail, index) => (
              <AnimateOnScroll key={index} delay={index * 0.08}>
                <li className="flex items-start gap-3 rounded-xl bg-white p-5 shadow-sm">
                  <CheckCircle className="h-6 w-6 shrink-0 text-accent mt-0.5" />
                  <span className="text-gray-700 leading-relaxed">
                    {detail}
                  </span>
                </li>
              </AnimateOnScroll>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20" aria-label="Contact CTA">
        <div className="mx-auto max-w-6xl px-4">
          <AnimateOnScroll>
            <div className="rounded-2xl bg-primary px-8 py-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                對此合作方式有興趣？
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                立即聯繫我們，了解如何透過{service.title}為您的業務提供最適合的服務。
              </p>
              <Button href={`/contact?service=${service.slug}`} variant="secondary">
                立即洽詢
              </Button>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </main>
  );
}
