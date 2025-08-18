export interface User {
  id: string;
  email: string;
  name: string;
  company?: string;
}

export interface Template {
  id: string;
  title: string;
  subject: string;
  content: string;
  companyName: string;
  companyLocation: string;
  companyWebsite: string;
  contactPhone: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  emailsPerDay: number;
  price: number;
  features: string[];
  popular?: boolean;
}

export interface SupportMessage {
  id: string;
  name: string;
  email: string;
  company: string;
  message: string;
  submittedAt: string;
}

export interface Language {
  code: string;
  name: string;
  flag: string;
}