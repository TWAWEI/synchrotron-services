import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline";

interface ButtonProps {
  readonly variant?: ButtonVariant;
  readonly href?: string;
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly type?: "button" | "submit";
  readonly disabled?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-primary hover:bg-accent/90 focus-visible:ring-accent",
  secondary:
    "bg-secondary text-white hover:bg-secondary/90 focus-visible:ring-secondary",
  outline:
    "border-2 border-accent text-accent hover:bg-accent/10 focus-visible:ring-accent",
};

export function Button({
  variant = "primary",
  href,
  children,
  className,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const styles = cn(
    "inline-flex items-center justify-center rounded-lg px-6 py-3 font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    variantStyles[variant],
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={styles} disabled={disabled}>
      {children}
    </button>
  );
}
