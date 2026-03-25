import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";
import "@/styles/globals.css";

const notoSansTC = Noto_Sans_TC({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SynchroTech",
  description: "世界級分析技術，解決產業核心問題",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className={`${notoSansTC.variable} h-full`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
