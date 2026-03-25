"use client";

import { useState } from "react";
import { caseStudies } from "@/content/cases";
import type { IndustrySlug } from "@/lib/types";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

type FilterValue = IndustrySlug | "all";

const industryLabels: Record<string, string> = {
  "biotech-pharma": "生技醫藥",
  "semiconductor-materials": "半導體材料",
  "food-agriculture": "食品農業",
  "precision-manufacturing": "精密製造",
};

const industryColors: Record<string, string> = {
  "biotech-pharma": "bg-blue-100 text-blue-700",
  "semiconductor-materials": "bg-purple-100 text-purple-700",
  "food-agriculture": "bg-green-100 text-green-700",
  "precision-manufacturing": "bg-orange-100 text-orange-700",
};

const filters: { label: string; value: FilterValue }[] = [
  { label: "全部", value: "all" },
  { label: "生技醫藥", value: "biotech-pharma" },
  { label: "半導體材料", value: "semiconductor-materials" },
  { label: "食品農業", value: "food-agriculture" },
  { label: "精密製造", value: "precision-manufacturing" },
];

export function CasesContent() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredCases =
    activeFilter === "all"
      ? caseStudies
      : caseStudies.filter((c) => c.industry === activeFilter);

  function handleCardClick(id: string) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <AnimateOnScroll>
          <SectionHeading
            title="成功案例"
            subtitle="探索同步輻射技術在各產業的實際應用與成果"
          />
        </AnimateOnScroll>

        {/* Filter Bar */}
        <AnimateOnScroll delay={0.1}>
          <div className="mb-10 flex flex-wrap gap-3">
            {filters.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setActiveFilter(value)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1",
                  activeFilter === value
                    ? "bg-accent text-primary shadow"
                    : "border border-gray-300 bg-white text-text-dark hover:bg-gray-50"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </AnimateOnScroll>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCases.map((caseItem, index) => {
            const isExpanded = expandedId === caseItem.id;
            return (
              <AnimateOnScroll key={caseItem.id} delay={index * 0.05}>
                <div
                  onClick={() => handleCardClick(caseItem.id)}
                  className={cn(
                    "cursor-pointer rounded-xl bg-white p-6 shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                    isExpanded
                      ? "ring-2 ring-accent shadow-md"
                      : "hover:scale-[1.02] hover:shadow-md"
                  )}
                >
                  {/* Industry Badge */}
                  <span
                    className={cn(
                      "mb-3 inline-block rounded-full px-3 py-1 text-xs font-medium",
                      industryColors[caseItem.industry] ??
                        "bg-gray-100 text-gray-600"
                    )}
                  >
                    {industryLabels[caseItem.industry] ?? caseItem.industry}
                  </span>

                  {/* Title */}
                  <h3 className="mb-1 text-lg font-bold text-primary leading-snug">
                    {caseItem.title}
                  </h3>

                  {/* Client */}
                  <p className="mb-3 text-sm text-gray-500">{caseItem.client}</p>

                  {/* Challenge */}
                  <div className="mb-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">
                      挑戰
                    </p>
                    <p
                      className={cn(
                        "text-sm text-gray-600 leading-relaxed",
                        !isExpanded && "line-clamp-2"
                      )}
                    >
                      {caseItem.challenge}
                    </p>
                  </div>

                  {/* Expanded: Solution */}
                  {isExpanded && (
                    <>
                      <div className="mb-3">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">
                          解決方案
                        </p>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {caseItem.solution}
                        </p>
                      </div>
                    </>
                  )}

                  {/* Outcome */}
                  <div className="mb-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">
                      成果
                    </p>
                    <p
                      className={cn(
                        "text-sm text-gray-600 leading-relaxed",
                        !isExpanded && "line-clamp-2"
                      )}
                    >
                      {caseItem.outcome}
                    </p>
                  </div>

                  {/* Techniques - only expanded */}
                  {isExpanded && caseItem.techniques.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
                        應用技術
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {caseItem.techniques.map((technique) => (
                          <span
                            key={technique}
                            className="rounded-md bg-accent/10 px-2 py-1 text-xs text-primary"
                          >
                            {technique}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Expand/collapse hint */}
                  <p className="mt-4 text-xs text-gray-400 text-right">
                    {isExpanded ? "點擊收合 ▲" : "點擊展開 ▼"}
                  </p>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>

        {filteredCases.length === 0 && (
          <p className="py-20 text-center text-gray-400">目前無符合條件的案例。</p>
        )}
      </div>
    </section>
  );
}
