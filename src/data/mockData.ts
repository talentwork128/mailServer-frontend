import { PricingPlan, Template } from '../types';

export const pricingPlans: PricingPlan[] = [
  {
    id: '1',
    name: 'Starter',
    emailsPerDay: 500,
    price: 29,
    features: [
      'Professional template design',
      'Basic compliance check',
      'Email support',
      '1 revision included',
      'Mobile responsive design'
    ]
  },
  {
    id: '2',
    name: 'Professional',
    emailsPerDay: 2000,
    price: 89,
    popular: true,
    features: [
      'Everything in Starter',
      'Priority support',
      'Advanced compliance check',
      '3 revisions included',
      'A/B testing templates',
      'Analytics integration'
    ]
  },
  {
    id: '3',
    name: 'Enterprise',
    emailsPerDay: 10000,
    price: 299,
    features: [
      'Everything in Professional',
      'Dedicated account manager',
      'Unlimited revisions',
      'Custom branding',
      'API access',
      'Advanced reporting'
    ]
  }
];

export const mockTemplates: Template[] = [
  {
    id: '1',
    title: 'Newsletter Template - December',
    subject: 'Your December Newsletter is Here!',
    content: '<div style="font-family: Arial, sans-serif;"><h1>Welcome to our Newsletter</h1><p>This is a sample newsletter content...</p></div>',
    companyName: 'Tech Solutions Inc.',
    companyLocation: 'San Francisco, CA',
    companyWebsite: 'https://techsolutions.example.com',
    contactPhone: '+49 1575 712 9020',
    status: 'approved',
    submittedAt: '2025-01-10T10:00:00Z'
  },
  {
    id: '2',
    title: 'Product Launch Announcement',
    subject: 'Introducing Our Latest Product!',
    content: '<div style="font-family: Arial, sans-serif;"><h1>New Product Launch</h1><p>We are excited to announce...</p></div>',
    companyName: 'Innovation Labs',
    companyLocation: 'New York, NY',
    companyWebsite: 'https://innovationlabs.example.com',
    contactPhone: '+1 (555) 987-6543',
    status: 'pending',
    submittedAt: '2025-01-12T14:30:00Z'
  },
  {
    id: '3',
    title: 'Holiday Sale Campaign',
    subject: '🎉 Holiday Sale - Up to 50% Off!',
    content: '<div style="font-family: Arial, sans-serif;"><h1>Holiday Sale</h1><p>Don\'t miss our amazing holiday deals...</p></div>',
    companyName: 'Retail Pro',
    companyLocation: 'Los Angeles, CA',
    companyWebsite: 'https://retailpro.example.com',
    contactPhone: '+1 (555) 456-7890',
    status: 'rejected',
    submittedAt: '2025-01-08T09:15:00Z'
  }
];