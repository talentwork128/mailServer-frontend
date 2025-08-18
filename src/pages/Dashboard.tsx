import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, Edit, Trash2, Clock, CheckCircle, XCircle, Plus } from 'lucide-react';
import { Template } from '../types';
// import { mockTemplates } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import { templateAPI } from '../services/api';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await templateAPI.list();
        if (response.success) {
          setTemplates(response.data.templates);
        }
      } catch (error) {
        console.error('Failed to fetch templates:', error);
        // Fallback to mock data for demo
        setTemplates(mockTemplates);
      }
    };

    fetchTemplates();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDelete = async (templateId: string) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      try {
        await templateAPI.delete(templateId);
        setTemplates(templates.filter(t => t.id !== templateId));
      } catch (error) {
        console.error('Failed to delete template:', error);
        alert('Failed to delete template. Please try again.');
      }
    }
  };

  const handleView = (template: Template) => {
    setSelectedTemplate(template);
    setShowPreview(true);
  };

  const handleEdit = (template: Template) => {
    // Store template data for editing
    localStorage.setItem('editingTemplate', JSON.stringify(template));
    navigate('/submit');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {t('dashboard.title')}
              </h1>
              <p className="text-gray-600">{t('dashboard.subtitle')}</p>
              {user && (
                <p className="text-sm text-gray-500 mt-2">
                  Welcome back, {user.name}!
                </p>
              )}
            </div>
            <Link
              to="/submit"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Template
            </Link>
          </div>
        </div>

        {/* Templates List */}
        {templates.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {t('dashboard.noTemplates')}
            </h3>
            <p className="text-gray-500 mb-6">
              Start by creating your first email template.
            </p>
            <Link
              to="/submit"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              {t('dashboard.submitFirst')}
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Template
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {t('dashboard.actions')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {templates.map((template) => (
                    <tr key={template.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {template.title}
                          </div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {template.subject}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{template.companyName}</div>
                        <div className="text-sm text-gray-500">{template.companyLocation}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(template.status)}`}>
                          {getStatusIcon(template.status)}
                          <span className="ml-1">{t(`dashboard.status.${template.status}`)}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(template.submittedAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => handleView(template)}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                            title={t('dashboard.view')}
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(template)}
                            className="text-gray-600 hover:text-gray-800 transition-colors"
                            title={t('dashboard.edit')}
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(template.id)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                            title={t('dashboard.delete')}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Template Preview Modal */}
        {showPreview && selectedTemplate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedTemplate.title}
                </h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[70vh]">
                <div className="mb-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Company:</strong> {selectedTemplate.companyName}
                    </div>
                    <div>
                      <strong>Location:</strong> {selectedTemplate.companyLocation}
                    </div>
                    <div>
                      <strong>Website:</strong> 
                      <a href={selectedTemplate.companyWebsite} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 ml-1">
                        {selectedTemplate.companyWebsite}
                      </a>
                    </div>
                    <div>
                      <strong>Phone:</strong> {selectedTemplate.contactPhone}
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="mb-4">
                    <strong>Subject:</strong> {selectedTemplate.subject}
                  </div>
                  <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                    <div dangerouslySetInnerHTML={{ __html: selectedTemplate.content }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;