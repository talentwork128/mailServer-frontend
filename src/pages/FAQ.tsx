import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp, HelpCircle, Search, Mail, Clock, Shield, Zap } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FAQ: React.FC = () => {
  const { t } = useTranslation();
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const faqData: FAQItem[] = [
    // General Questions
    {
      id: '1',
      question: 'What is ServiceMitteilung?',
      answer: 'ServiceMitteilung is a professional email template creation and management platform. We help businesses create beautiful, compliant email templates that drive engagement and conversions. Our expert team reviews and optimizes every template to ensure maximum deliverability and impact.',
      category: 'general'
    },
    {
      id: '2',
      question: 'How does the service work?',
      answer: 'Our process is simple: 1) Submit your email content and company information through our form, 2) Our expert team reviews and optimizes your template for compliance and effectiveness, 3) Receive your approved, professional template ready for deployment. The entire process typically takes 24-48 hours.',
      category: 'general'
    },
    {
      id: '3',
      question: 'What makes ServiceMitteilung different from other services?',
      answer: 'We combine professional design expertise with deep knowledge of email compliance and deliverability. Every template is manually reviewed by our experts, ensuring it meets industry standards and performs well across all email clients. We also provide ongoing support and optimization recommendations.',
      category: 'general'
    },

    // Pricing & Plans
    {
      id: '4',
      question: 'What are the different pricing plans?',
      answer: 'We offer three plans: Starter ($29/month for 500 emails/day), Professional ($89/month for 2,000 emails/day), and Enterprise ($299/month for 10,000 emails/day). Each plan includes different features like revisions, support levels, and advanced analytics.',
      category: 'pricing'
    },
    {
      id: '5',
      question: 'Can I change my plan later?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated. Contact our support team if you need assistance with plan changes.',
      category: 'pricing'
    },
    {
      id: '6',
      question: 'Is there a free trial available?',
      answer: 'We offer a 14-day free trial for new customers. During the trial, you can submit up to 3 templates and experience our full service. No credit card required to start your trial.',
      category: 'pricing'
    },
    {
      id: '7',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise customers. All payments are processed securely through our encrypted payment system.',
      category: 'pricing'
    },

    // Templates & Design
    {
      id: '8',
      question: 'What types of email templates can you create?',
      answer: 'We create all types of email templates including newsletters, promotional campaigns, transactional emails, welcome series, product announcements, event invitations, and custom designs. Our templates work across all major email clients and devices.',
      category: 'templates'
    },
    {
      id: '9',
      question: 'How long does template creation take?',
      answer: 'Standard templates are completed within 24-48 hours. Complex templates with custom designs may take 48-72 hours. Rush orders are available for an additional fee and can be completed within 12 hours.',
      category: 'templates'
    },
    {
      id: '10',
      question: 'Can I request revisions to my template?',
      answer: 'Yes! The number of included revisions depends on your plan: Starter (1 revision), Professional (3 revisions), Enterprise (unlimited revisions). Additional revisions can be purchased separately.',
      category: 'templates'
    },
    {
      id: '11',
      question: 'Do you provide mobile-responsive templates?',
      answer: 'Absolutely! All our templates are fully responsive and optimized for mobile devices. We test every template across multiple devices and email clients to ensure perfect rendering.',
      category: 'templates'
    },

    // Technical Support
    {
      id: '12',
      question: 'What email clients do you support?',
      answer: 'Our templates are tested and optimized for all major email clients including Gmail, Outlook, Apple Mail, Yahoo Mail, Thunderbird, and mobile email apps. We ensure consistent rendering across all platforms.',
      category: 'technical'
    },
    {
      id: '13',
      question: 'Do you help with email deliverability?',
      answer: 'Yes! We optimize every template for maximum deliverability by following best practices for HTML structure, image optimization, spam filter compliance, and authentication protocols. We also provide deliverability consultation.',
      category: 'technical'
    },
    {
      id: '14',
      question: 'Can you integrate with my email service provider?',
      answer: 'Our templates work with all major email service providers including Mailchimp, Constant Contact, SendGrid, Amazon SES, and custom SMTP servers. We provide integration guidance and support.',
      category: 'technical'
    },
    {
      id: '15',
      question: 'Do you provide HTML code for the templates?',
      answer: 'Yes, you receive the complete HTML code for your templates, along with any associated CSS and image files. The code is clean, well-commented, and ready for deployment.',
      category: 'technical'
    },

    // Account & Billing
    {
      id: '16',
      question: 'How do I cancel my subscription?',
      answer: 'You can cancel your subscription at any time from your account dashboard or by contacting our support team. Cancellations take effect at the end of your current billing period.',
      category: 'account'
    },
    {
      id: '17',
      question: 'What happens to my templates if I cancel?',
      answer: 'You retain access to all your approved templates even after cancellation. We provide a 30-day grace period to download your templates and associated files.',
      category: 'account'
    },
    {
      id: '18',
      question: 'Can I get a refund?',
      answer: 'We offer a 30-day money-back guarantee for new customers. If you\'re not satisfied with our service within the first 30 days, contact us for a full refund.',
      category: 'account'
    },

    // Compliance & Security
    {
      id: '19',
      question: 'Are your templates GDPR compliant?',
      answer: 'Yes, all our templates include GDPR-compliant unsubscribe mechanisms and privacy notices. We stay updated with international email marketing regulations and ensure compliance.',
      category: 'compliance'
    },
    {
      id: '20',
      question: 'How do you handle data security?',
      answer: 'We use enterprise-grade security measures including SSL encryption, secure data storage, regular security audits, and strict access controls. Your data is never shared with third parties.',
      category: 'compliance'
    },
    {
      id: '21',
      question: 'Do you follow CAN-SPAM compliance?',
      answer: 'Absolutely! All our templates include required CAN-SPAM elements such as clear sender identification, honest subject lines, physical address, and easy unsubscribe options.',
      category: 'compliance'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Questions', icon: HelpCircle },
    { id: 'general', name: 'General', icon: Mail },
    { id: 'pricing', name: 'Pricing & Plans', icon: Zap },
    { id: 'templates', name: 'Templates & Design', icon: Mail },
    { id: 'technical', name: 'Technical', icon: Shield },
    { id: 'account', name: 'Account & Billing', icon: Clock },
    { id: 'compliance', name: 'Compliance & Security', icon: Shield }
  ];

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFAQs = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-orange-100 rounded-full text-orange-600 text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4 mr-2" />
            Frequently Asked Questions
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">How Can We Help?</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about our email template service, pricing, and features.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-12">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          {categories.map(category => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                    : 'bg-white/80 text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 text-center">
              <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No questions found</h3>
              <p className="text-gray-600">Try adjusting your search terms or category filter.</p>
            </div>
          ) : (
            filteredFAQs.map((item) => (
              <div
                key={item.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-orange-50/50 rounded-2xl transition-colors duration-300"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {item.question}
                  </h3>
                  {openItems.includes(item.id) ? (
                    <ChevronUp className="w-6 h-6 text-orange-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-orange-500 flex-shrink-0" />
                  )}
                </button>
                
                {openItems.includes(item.id) && (
                  <div className="px-8 pb-6">
                    <div className="border-t border-orange-100 pt-4">
                      <p className="text-gray-600 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-3xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-white/90 mb-6 text-lg">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/support"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-orange-600 font-bold rounded-2xl hover:bg-orange-50 transition-all duration-300 transform hover:scale-105"
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Support
            </a>
            <a
              href="mailto:support@servicemitteilung.de"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-2xl hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
            >
              <Mail className="w-5 h-5 mr-2" />
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;