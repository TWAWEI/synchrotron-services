import type { Metadata } from "next";
import { FlaskConical, Cpu, Wheat, Cog } from "lucide-react";
import type { ComponentType } from "react";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { solutions } from "@/content/solutions";

export const metadata: Metadata = {
  title: "產業解決方案",
  description:
    "選擇您的產業，了解同步輻射技術如何協助您解決核心挑戰，提升研發與製造競爭力。",
};

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  FlaskConical,
  Cpu,
  Wheat,
  Cog,
};

export default function SolutionsPage() {
  return (
    <main className="py-20">
      <div className="mx-auto max-w-6xl px-4">
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
                      <div>
                        <h3 className="text-xl font-bold text-primary">
                          {solution.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {solution.subtitle}
                        </p>
                      </div>
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
    </main>
  );
}
