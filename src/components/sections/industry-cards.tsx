import { FlaskConical, Cpu, Wheat, Cog } from "lucide-react";
import type { ComponentType } from "react";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { solutions } from "@/content/solutions";

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  FlaskConical,
  Cpu,
  Wheat,
  Cog,
};

export function IndustryCards() {
  return (
    <section className="bg-surface py-20" aria-label="Industry solutions">
      <div className="mx-auto max-w-5xl px-6">
        <AnimateOnScroll>
          <SectionHeading
            title="產業解決方案"
            subtitle="選擇您的產業，了解我們如何協助您"
          />
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {solutions.map((solution, index) => {
            const Icon = iconMap[solution.icon];
            return (
              <AnimateOnScroll key={solution.slug} delay={index * 0.1}>
                <Card href={`/solutions/${solution.slug}`} className="h-full">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      {Icon && (
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                          <Icon className="h-6 w-6 text-accent" />
                        </div>
                      )}
                      <h3 className="text-xl font-bold text-primary">
                        {solution.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {solution.painPoint}
                    </p>
                  </div>
                </Card>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
