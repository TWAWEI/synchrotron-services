import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { siteConfig } from "@/content/site";
import "@/styles/globals.css";

const notoSansTC = Noto_Sans_TC({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | ${siteConfig.description}`,
    template: `%s | SynchroTech`,
  },
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.description}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "zh_TW",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className={`${notoSansTC.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
