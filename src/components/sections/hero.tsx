"use client";

import { Button } from "@/components/ui/button";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

export function Hero() {
  return (
    <section
      className="relative min-h-screen bg-primary flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Radial glow background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0, 212, 255, 0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <AnimateOnScroll delay={0}>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            世界級分析技術，解決產業核心問題
          </h1>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.15}>
          <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            運用世界頂尖同步輻射設施，為您的產業挑戰提供精準解決方案
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.3}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" href="/solutions">
              找到你的解決方案
            </Button>
            <Button variant="outline" href="/contact">
              立即諮詢
            </Button>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
