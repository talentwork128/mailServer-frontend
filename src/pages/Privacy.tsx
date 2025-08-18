import React from 'react';
import { Shield, Eye, Lock, Users, FileText, Globe } from 'lucide-react';

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-orange-100 rounded-full text-orange-600 text-sm font-medium mb-4">
            <Shield className="w-4 h-4 mr-2" />
            Your Privacy Matters
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Last updated: January 15, 2025
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8 space-y-8">
            {/* Introduction */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Eye className="w-6 h-6 text-orange-500 mr-3" />
                Introduction
              </h2>
              <p className="text-gray-600 leading-relaxed">
                At ServiceMitteilung, we take your privacy seriously. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
            </div>

            {/* Information We Collect */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <FileText className="w-6 h-6 text-orange-500 mr-3" />
                Information We Collect
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Personal Information</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Name and contact information (email, phone number)</li>
                    <li>Company information and business details</li>
                    <li>Account credentials and preferences</li>
                    <li>Payment and billing information</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Usage Information</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Website usage patterns and analytics</li>
                    <li>Email template content and metadata</li>
                    <li>Support communications and feedback</li>
                    <li>Device and browser information</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* How We Use Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Users className="w-6 h-6 text-orange-500 mr-3" />
                How We Use Your Information
              </h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Provide and maintain our email template services</li>
                <li>Process your template submissions and reviews</li>
                <li>Communicate with you about your account and services</li>
                <li>Improve our website and service offerings</li>
                <li>Comply with support obligations and protect our rights</li>
                <li>Send you marketing communications (with your consent)</li>
              </ul>
            </div>

            {/* Data Security */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Lock className="w-6 h-6 text-orange-500 mr-3" />
                Data Security
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We implement appropriate technical and organizational security measures to protect your personal 
                information against unauthorized access, alteration, disclosure, or destruction.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>SSL/TLS encryption for data transmission</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and employee training</li>
                <li>Secure data storage and backup procedures</li>
              </ul>
            </div>

            {/* Information Sharing */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Globe className="w-6 h-6 text-orange-500 mr-3" />
                Information Sharing
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>With your explicit consent</li>
                <li>To trusted service providers who assist in our operations</li>
                <li>When required by law or to protect our support rights</li>
                <li>In connection with a business transfer or merger</li>
              </ul>
            </div>

            {/* Your Rights */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Access and receive a copy of your personal data</li>
                <li>Rectify inaccurate or incomplete information</li>
                <li>Request deletion of your personal data</li>
                <li>Object to or restrict processing of your data</li>
                <li>Data portability rights</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </div>

            {/* Cookies */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking</h2>
              <p className="text-gray-600 leading-relaxed">
                We use cookies and similar tracking technologies to enhance your experience on our website. 
                You can control cookie settings through your browser preferences. Some features may not function 
                properly if cookies are disabled.
              </p>
            </div>

            {/* Contact Information */}
            <div className="bg-orange-50 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 text-gray-600">
                <p><strong>Email:</strong> support@servicemitteilung.de</p>
                <p><strong>Phone:</strong> +49 1575 712 9020</p>
                <p><strong>Address:</strong> Bockenheimer Landstraße 17–19, 60325 Frankfurt am Main, Germany</p>
              </div>
            </div>

            {/* Updates */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Policy Updates</h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
                the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to 
                review this Privacy Policy periodically for any changes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;