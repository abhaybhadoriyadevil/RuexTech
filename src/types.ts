export interface ServiceItem {
  id: string;
  category: string;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  technologies: string[];
}

export interface ProcessStep {
  step: string;
  phase: string;
  title: string;
  description: string;
  timeframe: string;
  technicalOutput: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  metric: string;
  metricLabel: string;
  title: string;
  description: string;
  tags: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export interface TechItem {
  name: string;
  category: "models" | "frameworks" | "infrastructure";
  desc: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  company: string;
  text: string;
  verified: boolean;
}
