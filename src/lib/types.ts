export type IndustrySlug =
  | "biotech-pharma"
  | "semiconductor-materials"
  | "food-agriculture"
  | "precision-manufacturing";

export type ServiceSlug =
  | "analysis"
  | "consulting"
  | "equipment"
  | "collaboration";

export interface Solution {
  slug: IndustrySlug;
  title: string;
  subtitle: string;
  icon: string;
  painPoint: string;
  problems: string[];
  capabilities: { title: string; description: string }[];
  image: string;
}

export interface Service {
  slug: ServiceSlug;
  title: string;
  description: string;
  icon: string;
  details: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  industry: IndustrySlug;
  client: string;
  challenge: string;
  solution: string;
  outcome: string;
  techniques: string[];
  image?: string;
  featured: boolean;
}

export interface TeamMember {
  name: string;
  title: string;
  bio: string;
  image?: string;
}
