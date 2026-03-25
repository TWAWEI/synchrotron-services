import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FlaskConical, Cpu, Wheat, Cog, CheckCircle } from "lucide-react";
import type { ComponentType } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { solutions } from "@/content/solutions";
import { caseStudies } from "@/content/cases";

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  FlaskConical,
  Cpu,
  Wheat,
  Cog,
};

type Props = {
  params: Promise<{ industry: string }>;
};

export async function generateStaticParams() {
  return solutions.map((solution) => ({
    industry: solution.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { industry } = await params;
  const solution = solutions.find((s) => s.slug === industry);

  if (!solution) {
    return {
      title: "找不到此產業",
    };
  }

  return {
    title: `${solution.title} - 產業解決方案`,
    description: solution.subtitle,
  };
}

export default async function IndustryPage({ params }: Props) {
  const { industry } = await params;
  const solution = solutions.find((s) => s.slug === industry);

  if (!solution) {
    notFound();
  }

  const Icon = iconMap[solution.icon];
  const relatedCases = caseStudies.filter((c) => c.industry === solution.slug);

  return (
    <main>
      {/* Hero Banner */}
      <section className="bg-primary py-20" aria-label="Industry hero">
        <div className="mx-auto max-w-6xl px-4">
          <AnimateOnScroll>
            <div className="flex flex-col items-center text-center gap-4">
              {Icon && (
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/10">
                  <Icon className="h-8 w-8 text-accent" />
                </div>
              )}
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                {solution.title}
              </h1>
              <p className="text-xl text-white/80 max-w-2xl">
                {solution.subtitle}
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-20 bg-surface" aria-label="Problems we solve">
        <div className="mx-auto max-w-6xl px-4">
          <AnimateOnScroll>
            <SectionHeading
              title="我們解決的問題"
              subtitle={`${solution.title}產業面臨的核心挑戰`}
              align="left"
            />
          </AnimateOnScroll>

          <ul className="flex flex-col gap-4">
            {solution.problems.map((problem, index) => (
              <AnimateOnScroll key={index} delay={index * 0.08}>
                <li className="flex items-start gap-3 rounded-xl bg-white p-5 shadow-sm">
                  <CheckCircle className="h-6 w-6 shrink-0 text-accent mt-0.5" />
                  <span className="text-gray-700 leading-relaxed">
                    {problem}
                  </span>
                </li>
              </AnimateOnScroll>
            ))}
          </ul>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-20" aria-label="How we help">
        <div className="mx-auto max-w-6xl px-4">
          <AnimateOnScroll>
            <SectionHeading
              title="我們如何幫助您"
              subtitle="運用同步輻射技術提供精準、高效的解決方案"
            />
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {solution.capabilities.map((capability, index) => (
              <AnimateOnScroll key={index} delay={index * 0.1}>
                <Card className="h-full">
                  <div className="flex flex-col gap-3">
                    <h3 className="text-lg font-bold text-primary">
                      {capability.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {capability.description}
                    </p>
                  </div>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Related Case Studies */}
      {relatedCases.length > 0 && (
        <section className="py-20 bg-surface" aria-label="Related case studies">
          <div className="mx-auto max-w-6xl px-4">
            <AnimateOnScroll>
              <SectionHeading
                title="相關案例"
                subtitle="了解我們如何為類似客戶創造具體成果"
              />
            </AnimateOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedCases.map((caseStudy, index) => (
                <AnimateOnScroll key={caseStudy.id} delay={index * 0.1}>
                  <Card className="h-full">
                    <div className="flex flex-col gap-3">
                      <h3 className="text-lg font-bold text-primary">
                        {caseStudy.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {caseStudy.client}
                      </p>
                      <p className="text-gray-600 leading-relaxed line-clamp-3">
                        {caseStudy.challenge}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {caseStudy.techniques.slice(0, 3).map((technique) => (
                          <span
                            key={technique}
                            className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                          >
                            {technique}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20" aria-label="Contact CTA">
        <div className="mx-auto max-w-6xl px-4">
          <AnimateOnScroll>
            <div className="rounded-2xl bg-primary px-8 py-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                對此產業方案有興趣？
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                立即聯繫我們的技術顧問，了解同步輻射技術如何為您的業務帶來突破。
              </p>
              <Button href="/contact" variant="secondary">
                聯繫我們
              </Button>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </main>
  );
}
