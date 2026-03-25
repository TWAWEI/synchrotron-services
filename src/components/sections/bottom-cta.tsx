import { Button } from "@/components/ui/button";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

export function BottomCTA() {
  return (
    <section
      className="bg-secondary py-16"
      aria-label="Call to action"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <AnimateOnScroll>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            不確定需要什麼服務？
          </h2>
          <p className="mt-4 text-white/80 text-lg leading-relaxed">
            讓我們的專業團隊幫您評估最適合的解決方案
          </p>
          <div className="mt-8">
            <Button variant="primary" href="/contact">
              免費諮詢
            </Button>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
