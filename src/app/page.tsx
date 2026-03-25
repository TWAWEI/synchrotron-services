import { Hero } from "@/components/sections/hero";
import { IndustryCards } from "@/components/sections/industry-cards";
import { WhyUs } from "@/components/sections/why-us";
import { FeaturedCases } from "@/components/sections/featured-cases";
import { ProcessSteps } from "@/components/sections/process-steps";
import { BottomCTA } from "@/components/sections/bottom-cta";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <IndustryCards />
      <WhyUs />
      <FeaturedCases />
      <ProcessSteps />
      <BottomCTA />
    </main>
  );
}
