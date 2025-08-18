import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Building, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Register: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    const success = await register(formData.name, formData.email, formData.password, formData.company);
    
    if (success) {
      // Show verification message instead of redirecting
      setUserEmail(formData.email);
      setVerificationSent(true);
    } else {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-200/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-md w-full">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-orange-100 relative z-10">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 px-8 py-8 text-center relative overflow-hidden">
            {/* {!verificationSent && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-2xl">
                <p className="text-blue-800 text-sm">
                  <strong>{t('common.note')}</strong> {t('auth.register.postRegisterNote')}
                </p>
              </div>
            )} */}
            <h1 className="text-3xl font-bold text-white relative z-10">{t('auth.register.title')}</h1>
            <p className="text-white/90 mt-2 text-lg relative z-10">{t('auth.register.subtitle')}</p>
          </div>

          <div className="p-8">
            {/* {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )} */}

            {verificationSent && (
              <div className="mb-6 p-6 bg-green-50 border border-green-200 rounded-2xl">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-green-900 mb-2">{t('auth.register.checkEmailTitle')}</h3>
                  <p className="text-green-800 mb-4">{t('auth.register.sentTo')} <strong>{userEmail}</strong></p>
                  <p className="text-green-700 text-sm mb-4">{t('auth.register.sentInstructions')}</p>
                  <div className="text-sm text-green-600">
                    <p>{t('auth.register.didntReceive')}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('auth.register.name')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    placeholder={t('auth.register.placeholderName')}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('auth.register.email')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    placeholder={t('auth.register.placeholderEmail')}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('auth.register.company')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    placeholder={t('auth.register.placeholderCompany')}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('auth.register.password')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="block w-full pl-10 pr-10 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    placeholder={t('auth.register.placeholderPassword')}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('auth.register.confirmPassword')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="block w-full pl-10 pr-10 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    placeholder={t('auth.register.placeholderConfirmPassword')}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  {t('auth.register.agreeTo')}{' '}
                  <Link to="/terms" className="text-orange-600 hover:text-orange-700">
                    {t('nav.terms')}
                  </Link>{' '}
                  {t('common.and')}{' '}
                  <Link to="/privacy" className="text-orange-600 hover:text-orange-700">
                    {t('nav.privacy')}
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading || verificationSent}
                className={`w-full py-4 px-6 rounded-2xl font-bold text-white transition-all duration-300 transform ${
                  isLoading || verificationSent
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 hover:scale-105 shadow-lg hover:shadow-orange-500/25'
                }`}
              >
                {verificationSent ? (
                  <div className="flex items-center justify-center space-x-3">
                    <Mail className="w-5 h-5" />
                    <span>{t('auth.register.verificationSent')}</span>
                  </div>
                ) : isLoading ? (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{t('auth.register.creatingAccount')}</span>
                  </div>
                ) : (
                  t('auth.register.signUp')
                )}
              </button>
            </form>

            {!verificationSent && (
              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  {t('auth.register.hasAccount')}{' '}
                  <Link to="/login" className="text-orange-600 hover:text-orange-700 font-medium">
                    {t('auth.register.signIn')}
                  </Link>
                </p>
              </div>
            )}

            {verificationSent && (
              <div className="mt-8 text-center">
                <Link
                  to="/login"
                  className="text-orange-600 hover:text-orange-700 font-medium"
                >
                  ← Back to Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;