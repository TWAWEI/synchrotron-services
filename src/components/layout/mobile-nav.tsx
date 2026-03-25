"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface MobileNavProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

const navLinks = [
  { label: "產業解決方案", href: "/solutions" },
  { label: "合作方式", href: "/services" },
  { label: "成功案例", href: "/cases" },
  { label: "關於我們", href: "/about" },
] as const;

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-50 bg-primary/95 backdrop-blur flex flex-col"
        >
          {/* Close button */}
          <div className="flex justify-end p-4">
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-md text-white hover:bg-white/10 transition-colors"
              aria-label="關閉選單"
            >
              <X size={28} />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col items-center justify-center flex-1 gap-8 px-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="text-xl font-medium text-white hover:text-accent transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-4">
              <Button
                href="/contact"
                variant="primary"
                className="text-lg px-8 py-4"
              >
                聯絡我們
              </Button>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
