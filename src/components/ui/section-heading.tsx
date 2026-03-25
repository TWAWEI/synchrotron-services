import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  readonly title: string;
  readonly subtitle?: string;
  readonly align?: "center" | "left";
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div className={cn("mb-10", isCenter ? "text-center" : "text-left")}>
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary tracking-tight">{title}</h2>
      <div
        className={cn(
          "mt-3 h-1 w-16 rounded bg-accent",
          isCenter ? "mx-auto" : "ml-0"
        )}
      />
      {subtitle && (
        <p className="mt-4 text-lg text-gray-600">{subtitle}</p>
      )}
    </div>
  );
}
