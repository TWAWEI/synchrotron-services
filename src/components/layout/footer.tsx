import Link from "next/link";
import { siteConfig } from "@/content/site";

const quickLinks = [
  { label: "產業解決方案", href: "/solutions" },
  { label: "合作方式", href: "/services" },
  { label: "成功案例", href: "/cases" },
  { label: "關於我們", href: "/about" },
  { label: "聯絡我們", href: "/contact" },
] as const;

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Brand */}
          <div>
            <h2 className="text-xl font-bold mb-3">SynchroTech</h2>
            <p className="text-white/70 text-sm leading-relaxed">
              {siteConfig.companyIntro}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50 mb-4">
              快速連結
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50 mb-4">
              聯絡資訊
            </h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="hover:text-white transition-colors duration-200"
                >
                  {siteConfig.contactEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-10 pt-6 text-center text-sm text-white/40">
          © 2026 SynchroTech. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
