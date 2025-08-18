import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Send, FileText, Building, Sparkles, Eye } from 'lucide-react';
import { pricingPlans } from '../data/mockData';
import { templateAPI } from '../services/api';

const SubmitTemplate: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    content: '',
    companyName: '',
    companyLocation: '',
    companyWebsite: '',
    contactPhone: ''
  });

  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTemplateId, setEditingTemplateId] = useState<string | null>(null);

  // Get selected plan from localStorage
  const selectedPlanId = localStorage.getItem('selectedPlan');
  const selectedPlan = pricingPlans.find(plan => plan.id === selectedPlanId);

  // Check if we're editing an existing template
  useEffect(() => {
    const editingTemplate = localStorage.getItem('editingTemplate');
    if (editingTemplate) {
      const template = JSON.parse(editingTemplate);
      setFormData({
        title: template.title,
        subject: template.subject,
        content: template.content,
        companyName: template.companyName,
        companyLocation: template.companyLocation,
        companyWebsite: template.companyWebsite,
        contactPhone: template.contactPhone
      });
      setIsEditing(true);
      setEditingTemplateId(template.id);
      // Clear the editing template from localStorage
      localStorage.removeItem('editingTemplate');
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      let response;
      
      if (isEditing && editingTemplateId) {
        // Update existing template
        response = await templateAPI.update(editingTemplateId, formData);
      } else {
        // Submit new template
        response = await templateAPI.submit(formData);
      }
      
      setIsSubmitting(false);
      
      // Show success toast
      toast.success(isEditing ? 'Template updated successfully! 🎉' : 'Template submitted successfully! 🎉', {
        duration: 4000,
        position: 'top-center',
        style: {
          background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
          color: 'white',
          fontWeight: 'bold',
          borderRadius: '12px',
          padding: '16px 24px',
        },
      });
      
      // Clear selected plan
      localStorage.removeItem('selectedPlan');
      
      // Reset form
      setFormData({
        title: '',
        subject: '',
        content: '',
        companyName: '',
        companyLocation: '',
        companyWebsite: '',
        contactPhone: ''
      });
      
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
    } catch (error) {
      setIsSubmitting(false);
      toast.error('Failed to submit template. Please try again.', {
        duration: 4000,
        position: 'top-center',
        style: {
          background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
          color: 'white',
          fontWeight: 'bold',
          borderRadius: '12px',
          padding: '16px 24px',
        },
      });
    }
  };

  return (
    <>
    <Toaster />
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-200/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-orange-100 relative z-10">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 px-8 py-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white">
                  {isEditing ? 'Edit Email Template' : t('submitTemplate.title')}
                </h1>
                <p className="text-white/90 mt-2 text-lg">
                  {isEditing ? 'Update your template details and company information' : t('submitTemplate.subtitle')}
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Selected Plan Display */}
            {selectedPlan && (
              <div className="bg-orange-100 border border-orange-200 rounded-2xl p-6 mb-8">
                <div className="flex items-center space-x-3">
                  <Sparkles className="w-6 h-6 text-orange-600" />
                  <div>
                    <h3 className="text-lg font-bold text-orange-900">Selected Plan: {selectedPlan.name}</h3>
                    <p className="text-orange-700">{selectedPlan.emailsPerDay.toLocaleString()} emails/day - ${selectedPlan.price}/month</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Template Information Section */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4 pb-6 border-b border-orange-100">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {t('submitTemplate.templateInfo')}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-bold text-gray-700 mb-3">
                      {t('submitTemplate.fields.title')}
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                      placeholder={t('submitTemplate.fields.titlePlaceholder')}
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-bold text-gray-700 mb-3">
                      {t('submitTemplate.fields.subject')}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                      placeholder={t('submitTemplate.fields.subjectPlaceholder')}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="content" className="block text-sm font-bold text-gray-700 mb-3">
                    {t('submitTemplate.fields.content')}
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    rows={8}
                    className="w-full px-4 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    placeholder={t('submitTemplate.fields.contentPlaceholder')}
                  />
                </div>
              </div>

              {/* Company Information Section */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4 pb-6 border-b border-orange-100">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
                    <Building className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {t('submitTemplate.companyInfo')}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-bold text-gray-700 mb-3">
                      {t('submitTemplate.fields.companyName')}
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                      placeholder={t('submitTemplate.fields.companyNamePlaceholder')}
                    />
                  </div>

                  <div>
                    <label htmlFor="companyLocation" className="block text-sm font-bold text-gray-700 mb-3">
                      {t('submitTemplate.fields.location')}
                    </label>
                    <input
                      type="text"
                      id="companyLocation"
                      name="companyLocation"
                      value={formData.companyLocation}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                      placeholder={t('submitTemplate.fields.locationPlaceholder')}
                    />
                  </div>

                  <div>
                    <label htmlFor="companyWebsite" className="block text-sm font-bold text-gray-700 mb-3">
                      {t('submitTemplate.fields.website')}
                    </label>
                    <input
                      type="url"
                      id="companyWebsite"
                      name="companyWebsite"
                      value={formData.companyWebsite}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                      placeholder={t('submitTemplate.fields.websitePlaceholder')}
                    />
                  </div>

                  <div>
                    <label htmlFor="contactPhone" className="block text-sm font-bold text-gray-700 mb-3">
                      {t('submitTemplate.fields.phone')}
                    </label>
                    <input
                      type="tel"
                      id="contactPhone"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                      placeholder={t('submitTemplate.fields.phonePlaceholder')}
                    />
                  </div>
                </div>
              </div>

              {/* Preview Section */}
              {formData.content && (
                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={() => setShowPreview(!showPreview)}
                    className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 font-bold text-lg transition-colors"
                  >
                    <Eye className="w-5 h-5" />
                    <span>{showPreview ? 'Hide Preview' : t('submitTemplate.preview')}</span>
                  </button>
                  
                  {showPreview && (
                    <div className="border border-orange-200 rounded-2xl p-6 bg-gradient-to-br from-orange-50 to-red-50">
                      <div className="mb-4 p-3 bg-white/80 backdrop-blur-sm rounded-xl">
                        <strong className="text-orange-600">Subject:</strong> <span className="text-gray-800">{formData.subject}</span>
                      </div>
                      <div className="border border-orange-200 rounded-xl bg-white p-6 shadow-inner">
                        <div dangerouslySetInnerHTML={{ __html: formData.content }} />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end pt-8 border-t border-orange-100">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-10 py-4 rounded-2xl font-bold text-white transition-all duration-300 transform ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 hover:scale-105 shadow-lg hover:shadow-orange-500/25'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <Send className="w-6 h-6" />
                      <span>{isEditing ? 'Update Template' : t('submitTemplate.submit')}</span>
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default SubmitTemplate;