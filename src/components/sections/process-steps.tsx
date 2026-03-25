import { MessageCircle, ClipboardList, Microscope, FileText } from "lucide-react";
import type { ComponentType } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

interface ProcessStep {
  readonly number: number;
  readonly icon: ComponentType<{ className?: string }>;
  readonly title: string;
  readonly description: string;
}

const steps: ProcessStep[] = [
  {
    number: 1,
    icon: MessageCircle,
    title: "需求諮詢",
    description: "告訴我們您的分析需求，我們提供初步評估",
  },
  {
    number: 2,
    icon: ClipboardList,
    title: "方案規劃",
    description: "根據需求制定最適合的分析方案與時程",
  },
  {
    number: 3,
    icon: Microscope,
    title: "執行分析",
    description: "專業團隊使用頂尖設備進行精準分析",
  },
  {
    number: 4,
    icon: FileText,
    title: "交付報告",
    description: "提供完整的分析報告與專業建議",
  },
];

export function ProcessSteps() {
  return (
    <section className="bg-white py-20" aria-label="Collaboration process">
      <div className="mx-auto max-w-6xl px-6">
        <AnimateOnScroll>
          <SectionHeading title="合作流程" />
        </AnimateOnScroll>

        <div className="relative flex flex-col md:flex-row gap-8 md:gap-0">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;

            return (
              <AnimateOnScroll
                key={step.number}
                delay={index * 0.12}
                className="relative flex flex-1 flex-col items-center text-center"
              >
                {/* Connecting line: horizontal on desktop, vertical on mobile */}
                {!isLast && (
                  <>
                    <div
                      className="hidden md:block absolute top-7 left-[calc(50%+28px)] h-0.5 bg-accent/30"
                      style={{ width: "calc(100% - 56px)" }}
                      aria-hidden="true"
                    />
                    <div
                      className="md:hidden absolute top-[56px] left-1/2 -translate-x-1/2 w-0.5 h-8 bg-accent/30"
                      aria-hidden="true"
                    />
                  </>
                )}

                {/* Number badge */}
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-primary font-bold text-lg shadow-md">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                  <Icon className="h-6 w-6 text-accent" />
                </div>

                {/* Text */}
                <h3 className="mt-4 text-base font-bold text-primary">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed max-w-[180px]">
                  {step.description}
                </p>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
