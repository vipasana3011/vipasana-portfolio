export interface Project {
  id: string;
  title: string;
  category: 'web' | 'smm';
  tag: string;
  description?: string;
  image: string;
  link: string;
  featured?: boolean;
  technologies?: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  highlights: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  badge: string;
  description: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
  image: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
  icon: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
