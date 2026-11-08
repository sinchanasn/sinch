export interface Project {
  id: string;
  t: string; // Title
  s: string; // Subtitle / Tagline
  d: string; // Description
  tech: string[];
  m: [string, string][]; // Metrics: [value, label]
  radar?: boolean;
  radarData?: number[]; // [Team, Market, Product, Traction, Efficiency, Moat]
  demo?: string;
  repo?: string;
  status?: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface DesignPrinciple {
  title: string;
  description: string;
}

export interface ProfileInfo {
  name: string;
  role: string;
  bioHeadline: string;
  bioExtended: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  resume: string;
}
