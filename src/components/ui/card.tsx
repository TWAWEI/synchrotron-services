import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface CardProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly href?: string;
}

const baseStyles =
  "rounded-xl bg-white shadow p-6 transition-transform duration-200 ease-in-out hover:scale-[1.02]";

export function Card({ children, className, href }: CardProps) {
  const styles = cn(baseStyles, className);

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return <div className={styles}>{children}</div>;
}
