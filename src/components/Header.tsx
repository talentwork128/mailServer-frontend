import React from 'react';
// import Image from 'next/image';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Globe, User, LogOut, Zap, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'de' : 'en';
    i18n.changeLanguage(newLang);
    // Force re-render by updating localStorage
    localStorage.setItem('i18nextLng', newLang);
    window.location.reload();
  };

  const isActive = (path: string) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { path: '/', key: 'home' },
    { path: '/pricing', key: 'pricing' },
    // { path: '/faq', key: 'faq' },
    { path: '/about', key: 'about' },
    ...(user ? [
      { path: '/submit', key: 'submit' },
      { path: '/dashboard', key: 'dashboard' }
    ] : []),
    // { path: '/support', key: 'support' },
    { path: '/contact', key: 'contact' },
    // { path: '/privacy', key: 'privacy' },
    // { path: '/terms', key: 'terms' }
  ];

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-lg border-b border-orange-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            {/* <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Zap className="h-6 w-6 text-white" />
            </div> */}
            <img
              src="/logo.png"
              alt="ServiceMitteilung Logo"
              className="h-16 w-auto transition-transform duration-300 transform group-hover:scale-105 -mr-3 mt-2"
              width={40}
              height={40}
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Service Mitteilung</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-semibold transition-all duration-300 relative ${
                  isActive(item.path)
                    ? 'text-orange-600'
                    : 'text-gray-700 hover:text-orange-600'
                }`}
              >
                {t(`nav.${item.key}`)}
                {isActive(item.path) && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                )}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:text-orange-600 transition-all duration-300 rounded-xl hover:bg-orange-50"
              title="Toggle Language"
            >
              <Globe className="h-5 w-5" />
              <span className="uppercase font-bold">
                {i18n.language === 'en' ? 'EN' : 'DE'}
              </span>
            </button>

            {/* User Actions */}
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-3 py-2 bg-orange-50 rounded-xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{user.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:text-red-600 transition-all duration-300 rounded-xl hover:bg-red-50"
                  title={t('nav.logout')}
                >
                  <LogOut className="h-5 w-5" />
                  <span className="hidden sm:block">{t('nav.logout')}</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-orange-600 transition-all duration-300 rounded-xl hover:bg-orange-50"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2 text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/25"
                >
                  {t('nav.register')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-300"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-orange-100 bg-white/95 backdrop-blur-md">
            <div className="px-4 py-4 space-y-2">
              {/* Navigation Links */}
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    isActive(item.path)
                      ? 'text-orange-600 bg-orange-50'
                      : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                  }`}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              ))}

              {/* Language Toggle */}
              <button
                onClick={() => {
                  toggleLanguage();
                  closeMobileMenu();
                }}
                className="flex items-center space-x-2 w-full px-4 py-3 text-sm text-gray-700 hover:text-orange-600 transition-all duration-300 rounded-xl hover:bg-orange-50"
              >
                <Globe className="h-5 w-5" />
                <span className="uppercase font-bold">
                  {i18n.language === 'en' ? 'EN' : 'DE'}
                </span>
              </button>

              {/* User Actions */}
              {user ? (
                <div className="border-t border-orange-100 pt-4 mt-4">
                  <div className="flex items-center space-x-3 px-4 py-3 bg-orange-50 rounded-xl mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{user.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      closeMobileMenu();
                    }}
                    className="flex items-center space-x-2 w-full px-4 py-3 text-sm text-red-600 hover:text-red-700 transition-all duration-300 rounded-xl hover:bg-red-50"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>{t('nav.logout')}</span>
                  </button>
                </div>
              ) : (
                <div className="border-t border-orange-100 pt-4 mt-4 space-y-2">
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="block w-full px-4 py-3 text-sm font-semibold text-gray-700 hover:text-orange-600 transition-all duration-300 rounded-xl hover:bg-orange-50 text-center"
                  >
                    {t('nav.login')}
                  </Link>
                  <Link
                    to="/register"
                    onClick={closeMobileMenu}
                    className="block w-full px-4 py-3 text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 text-center"
                  >
                    {t('nav.register')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;