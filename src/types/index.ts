export interface Project {
  id: string;
  title: string;
  category: 'web' | 'smm';
  tag: string;
  description: string;
  image: string;
  link: string;
  featured?: boolean;
  technologies: string[];
  indexNum?: string;
  match?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  tag: string;
  indexNum: string;
  highlights: string[];
  gradient: string;
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
  badge?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  desc: string;
  tag: string;
  icon: string;
  skills: string[];
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  permission: boolean;
}
