import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Send, MessageCircle, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { supportAPI } from '../services/api';

const Support: React.FC = () => {
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
  const response: any = await supportAPI.submitMessage({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        subject: formData.subject,
        message: formData.message
      });
      
      if (response.success) {
        setSuccess(true);
        // Reset form
        setFormData({ name: '', email: '', company: '', subject: '', message: '' });
      }
    } catch (error) {
      console.error('Failed to submit support message:', error);
      alert('Failed to submit message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-orange-100 rounded-full text-orange-600 text-sm font-medium mb-4">
            <MessageCircle className="w-4 h-4 mr-2" />
            {t('support.pill')}
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{t('support.title')}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{t('support.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('support.info.title')}</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-orange-400 to-red-500 p-3 rounded-2xl">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{t('support.info.emailTitle')}</h3>
                    <p className="text-gray-600">{t('footer.contact.email')}</p>
                    <p className="text-sm text-gray-500">{t('support.info.responseTime')}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-orange-400 to-red-500 p-3 rounded-2xl">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{t('support.info.phoneTitle')}</h3>
                    <p className="text-gray-600">{t('footer.contact.phone')}</p>
                    <p className="text-sm text-gray-500">{t('support.info.businessHours')}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-orange-400 to-red-500 p-3 rounded-2xl">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{t('support.info.officeTitle')}</h3>
                    <p className="text-gray-600">{t('footer.contact.address')}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-orange-400 to-red-500 p-3 rounded-2xl">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Business Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Saturday - Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 px-8 py-6">
                <h2 className="text-3xl font-bold text-white">{t('support.form.title')}</h2>
                <p className="text-white/90 mt-2">{t('support.form.subtitle')}</p>
              </div>

              <div className="p-8">

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-3">
                        {t('support.fields.name')} *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                        placeholder={t('support.fields.namePlaceholder')}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-3">
                        {t('support.fields.email')} *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                        placeholder={t('support.fields.emailPlaceholder')}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company" className="block text-sm font-bold text-gray-700 mb-3">
                        {t('support.fields.company')}
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                        placeholder={t('support.fields.companyPlaceholder')}
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-bold text-gray-700 mb-3">
                        {t('support.fields.subject')} *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                      >
                        <option value="">{t('support.selectSubject')}</option>
                        <option value="general">{t('support.subjects.general')}</option>
                        <option value="template">{t('support.subjects.template')}</option>
                        <option value="pricing">{t('support.subjects.pricing')}</option>
                        <option value="technical">{t('support.subjects.technical')}</option>
                        <option value="partnership">{t('support.subjects.partnership')}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                      <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-3">
                      {t('support.fields.message')} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                      placeholder={t('support.fields.messagePlaceholder')}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 px-6 rounded-2xl font-bold text-white transition-all duration-300 transform ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 hover:scale-105 shadow-lg hover:shadow-orange-500/25'
                    }`}
                  >
                    {isSubmitting ? (
                        <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>{t('support.sending')}</span>
                      </div>
                    ) : (
                        <div className="flex items-center justify-center space-x-2">
                        <Send className="w-5 h-5" />
                        <span>{t('support.send')}</span>
                      </div>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;