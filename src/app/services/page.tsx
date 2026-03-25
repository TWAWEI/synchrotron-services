import type { Metadata } from "next";
import { Microscope, BrainCircuit, Server, Handshake } from "lucide-react";
import type { ComponentType } from "react";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "合作方式",
  description: "多元合作模式，量身打造您的需求",
};

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Microscope,
  BrainCircuit,
  Server,
  Handshake,
};

export default function ServicesPage() {
  return (
    <main className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <AnimateOnScroll>
          <SectionHeading
            title="合作方式"
            subtitle="多元合作模式，量身打造您的需求"
          />
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <AnimateOnScroll key={service.slug} delay={index * 0.1}>
                <Card href={`/services/${service.slug}`} className="h-full">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      {Icon && (
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                          <Icon className="h-6 w-6 text-accent" />
                        </div>
                      )}
                      <h3 className="text-xl font-bold text-primary">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
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
