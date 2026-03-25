import { Building2, Users, Package, Zap } from "lucide-react";
import type { ComponentType } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

interface WhyUsItem {
  readonly icon: ComponentType<{ className?: string }>;
  readonly title: string;
  readonly description: string;
}

const items: WhyUsItem[] = [
  {
    icon: Building2,
    title: "世界級設施資源",
    description:
      "擁有國際頂尖的同步輻射光源設施，提供無與倫比的分析精度",
  },
  {
    icon: Users,
    title: "豐富產業經驗",
    description:
      "深耕生技醫藥、半導體、食品等多元產業，理解您的真實需求",
  },
  {
    icon: Package,
    title: "一站式服務",
    description:
      "從需求評估到報告交付，全程專業團隊為您服務",
  },
  {
    icon: Zap,
    title: "快速交付",
    description:
      "高效的分析流程與專業團隊，縮短您的研發週期",
  },
];

export function WhyUs() {
  return (
    <section className="bg-white py-20" aria-label="Why choose us">
      <div className="mx-auto max-w-6xl px-6">
        <AnimateOnScroll>
          <SectionHeading title="為什麼選擇我們" />
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <AnimateOnScroll key={item.title} delay={index * 0.1}>
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                    <Icon className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-primary">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {item.description}
                  </p>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
