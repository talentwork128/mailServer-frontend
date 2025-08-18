import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const success = await login(formData.email, formData.password);
      
      if (success) {
        // Check if there's a redirect path stored
        const redirectPath = localStorage.getItem('redirectAfterLogin');
        if (redirectPath) {
          localStorage.removeItem('redirectAfterLogin');
          navigate(redirectPath);
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error: any) {
      setError(error.message || 'Invalid email or password.');
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
          <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 px-8 py-6 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl relative z-10">
                <Mail className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white relative z-10">{t('auth.login.title')}</h1>
            <p className="text-white/90 mt-2 text-lg relative z-10">{t('auth.login.subtitle')}</p>
          </div>

          <div className="p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            {/* Demo Instructions */}
            {/* <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-2xl">
              <p className="text-yellow-800 text-sm">
                <strong>{t('common.demo')}</strong> <code>demo@example.com</code> {t('common.demoInstructions')}<br/>
                <span className="text-xs mt-1 block">{t('auth.register.note')}</span>
              </p>
            </div> */}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('auth.login.email')}
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
                    placeholder={t('auth.login.placeholderEmail')}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('auth.login.password')}
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
                    placeholder={t('auth.login.placeholderPassword')}
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

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                    {t('auth.login.rememberMe')}
                  </label>
                </div>

                <div className="text-sm">
                  <Link to="/support" className="text-orange-600 hover:text-orange-700">
                    {t('auth.login.forgotPassword')}
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 px-6 rounded-2xl font-bold text-white transition-all duration-300 transform ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 hover:scale-105 shadow-lg hover:shadow-orange-500/25'
                }`}
              >
                {isLoading ? (
                    <div className="flex items-center justify-center space-x-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{t('auth.login.signingIn')}</span>
                  </div>
                ) : (
                  t('auth.login.signIn')
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                {t('auth.login.noAccount')}{' '}
                <Link to="/register" className="text-orange-600 hover:text-orange-700 font-medium">
                  {t('auth.login.signUp')}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;