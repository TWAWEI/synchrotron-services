import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { caseStudies } from "@/content/cases";

const industryLabels: Record<string, string> = {
  "biotech-pharma": "生技醫藥",
  "semiconductor-materials": "半導體與材料",
  "food-agriculture": "食品與農業",
  "precision-manufacturing": "精密製造",
};

const industryColors: Record<string, string> = {
  "biotech-pharma": "bg-blue-100 text-blue-700",
  "semiconductor-materials": "bg-purple-100 text-purple-700",
  "food-agriculture": "bg-green-100 text-green-700",
  "precision-manufacturing": "bg-orange-100 text-orange-700",
};

export function FeaturedCases() {
  const featured = caseStudies.filter((c) => c.featured === true);

  return (
    <section className="bg-surface py-20" aria-label="Featured case studies">
      <div className="mx-auto max-w-6xl px-6">
        <AnimateOnScroll>
          <SectionHeading title="成功案例" />
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((caseStudy, index) => {
            const labelColor =
              industryColors[caseStudy.industry] ?? "bg-gray-100 text-gray-700";
            const label =
              industryLabels[caseStudy.industry] ?? caseStudy.industry;

            return (
              <AnimateOnScroll key={caseStudy.id} delay={index * 0.1}>
                <Card className="h-full flex flex-col">
                  <div className="flex flex-col gap-3 flex-1">
                    <span
                      className={`inline-block self-start rounded-full px-3 py-1 text-xs font-semibold ${labelColor}`}
                    >
                      {label}
                    </span>
                    <h3 className="text-base font-bold text-primary leading-snug">
                      {caseStudy.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                      {caseStudy.challenge}
                    </p>
                    <div className="mt-auto pt-3 border-t border-gray-100">
                      <p className="text-sm text-accent font-medium leading-relaxed line-clamp-2">
                        {caseStudy.outcome}
                      </p>
                    </div>
                  </div>
                </Card>
              </AnimateOnScroll>
            );
          })}
        </div>

        <AnimateOnScroll delay={0.3}>
          <div className="mt-10 flex justify-center">
            <Button variant="outline" href="/cases">
              查看更多案例
            </Button>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
