import React from 'react';
import { FileText, Scale, AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react';

const Terms: React.FC = () => {
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
            <Scale className="w-4 h-4 mr-2" />
            support Terms
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Last updated: January 15, 2025
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8 space-y-8">
            {/* Introduction */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <FileText className="w-6 h-6 text-orange-500 mr-3" />
                Agreement to Terms
              </h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing and using ServiceMitteilung, you accept and agree to be bound by the terms and 
                provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>

            {/* Service Description */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <CheckCircle className="w-6 h-6 text-orange-500 mr-3" />
                Service Description
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                ServiceMitteilung provides professional email template creation, review, and optimization services. 
                Our services include:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Custom email template design and development</li>
                <li>Template compliance review and optimization</li>
                <li>Email deliverability consultation</li>
                <li>Technical support and maintenance</li>
              </ul>
            </div>

            {/* User Responsibilities */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="w-6 h-6 text-orange-500 mr-3" />
                User Responsibilities
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                As a user of our service, you agree to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Provide accurate and complete information</li>
                <li>Use the service only for lawful purposes</li>
                <li>Respect intellectual property rights</li>
                <li>Not transmit spam, malware, or harmful content</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Maintain the security of your account credentials</li>
              </ul>
            </div>

            {/* Payment Terms */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment and Billing</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Subscription Plans</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our services are offered through various subscription plans. All fees are charged in advance 
                    on a monthly or annual basis and are non-refundable except as required by law.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Payment Processing</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Payments are processed securely through third-party payment processors. You authorize us to 
                    charge your payment method for all fees incurred.
                  </p>
                </div>
              </div>
            </div>

            {/* Service Level Agreement */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Clock className="w-6 h-6 text-orange-500 mr-3" />
                Service Level Agreement
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Template Review Times</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Standard templates: 24-48 hours</li>
                    <li>Complex templates: 48-72 hours</li>
                    <li>Rush orders: Additional fees apply</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Uptime Guarantee</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We strive to maintain 99.9% uptime for our services. Scheduled maintenance will be announced 
                    in advance when possible.
                  </p>
                </div>
              </div>
            </div>

            {/* Intellectual Property */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Content</h3>
                  <p className="text-gray-600 leading-relaxed">
                    You retain ownership of all content you submit to our service. By submitting content, you grant 
                    us a license to use, modify, and distribute it solely for the purpose of providing our services.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Our Content</h3>
                  <p className="text-gray-600 leading-relaxed">
                    All service-related content, including templates, designs, and documentation, remains our 
                    intellectual property and is protected by copyright and other laws.
                  </p>
                </div>
              </div>
            </div>

            {/* Prohibited Uses */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <XCircle className="w-6 h-6 text-orange-500 mr-3" />
                Prohibited Uses
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                You may not use our service for:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Sending unsolicited commercial email (spam)</li>
                <li>Distributing malware or harmful content</li>
                <li>Violating any applicable laws or regulations</li>
                <li>Infringing on intellectual property rights</li>
                <li>Harassing or threatening individuals</li>
                <li>Attempting to breach our security measures</li>
              </ul>
            </div>

            {/* Limitation of Liability */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
              <p className="text-gray-600 leading-relaxed">
                To the maximum extent permitted by law, ServiceMitteilung shall not be liable for any indirect, 
                incidental, special, consequential, or punitive damages, or any loss of profits or revenues, 
                whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
              </p>
            </div>

            {/* Termination */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
              <p className="text-gray-600 leading-relaxed">
                Either party may terminate this agreement at any time. Upon termination, your access to the service 
                will cease, and any outstanding fees will become immediately due and payable.
              </p>
            </div>

            {/* Contact Information */}
            <div className="bg-orange-50 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About Terms</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-gray-600">
                <p><strong>Email:</strong> support@servicemitteilung.de</p>
                <p><strong>Phone:</strong> +49 1575 712 9020</p>
                <p><strong>Address:</strong> Bockenheimer Landstraße 17–19, 60325 Frankfurt am Main, Germany</p>
              </div>
            </div>

            {/* Changes to Terms */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to modify these terms at any time. We will notify users of any material 
                changes via email or through our website. Continued use of the service after changes constitutes 
                acceptance of the new terms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;