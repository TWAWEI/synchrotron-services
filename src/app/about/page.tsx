import type { Metadata } from "next";
import { User } from "lucide-react";
import { siteConfig } from "@/content/site";
import { teamMembers } from "@/content/team";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

export const metadata: Metadata = {
  title: "關於我們",
  description:
    "認識 SynchroTech 的故事、願景與核心團隊——由頂尖科學家組成，致力於讓尖端同步輻射技術成為產業創新的助力。",
};

export default function AboutPage() {
  return (
    <main>
      {/* Section 1: Company Intro */}
      <section className="bg-primary py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <AnimateOnScroll>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">
              {siteConfig.name}
            </h1>
            <p className="mb-10 text-lg leading-relaxed text-white/80 md:text-xl">
              {siteConfig.companyIntro}
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.2}>
            <blockquote className="mx-auto max-w-2xl rounded-xl border border-white/20 bg-white/10 px-8 py-6">
              <p className="text-base font-medium leading-relaxed text-white/90 md:text-lg">
                &ldquo;{siteConfig.vision}&rdquo;
              </p>
              <footer className="mt-3 text-sm text-white/60">— 我們的願景</footer>
            </blockquote>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Section 2: Team */}
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-6xl px-4">
          <AnimateOnScroll>
            <SectionHeading
              title="我們的團隊"
              subtitle="由各領域頂尖科學家與產業專家共同組成"
            />
          </AnimateOnScroll>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <AnimateOnScroll key={member.name} delay={index * 0.1}>
                <Card className="flex h-full flex-col items-center text-center">
                  {/* Avatar */}
                  <div className="mb-4 flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-secondary">
                    <User className="h-10 w-10 text-white" />
                  </div>

                  {/* Name */}
                  <h3 className="mb-1 text-lg font-bold text-primary">
                    {member.name}
                  </h3>

                  {/* Title */}
                  <p className="mb-3 text-sm font-medium text-accent">
                    {member.title}
                  </p>

                  {/* Bio */}
                  <p className="text-sm leading-relaxed text-gray-600">
                    {member.bio}
                  </p>
                </Card>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
