import type { Metadata } from "next";
import { CasesContent } from "@/components/sections/cases-content";

export const metadata: Metadata = {
  title: "成功案例",
  description:
    "探索我們協助各產業客戶解決核心挑戰的成功案例，了解同步輻射技術的實際應用成果。",
};

export default function CasesPage() {
  return (
    <main>
      <CasesContent />
    </main>
  );
}
