import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Globe } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gradient-to-br from-orange-900 via-red-900 to-pink-900 text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-500/10 rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4 relative z-10">
            <div className="flex items-center space-x-2">
              <Mail className="h-8 w-8 text-orange-400" />
              <span className="text-xl font-bold">{t('footer.company')}</span>
            </div>
            <p className="text-orange-100 text-sm leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex items-center space-x-4 pt-4">
              <Globe className="h-5 w-5 text-orange-400" />
              <Mail className="h-5 w-5 text-orange-400" />
              <Phone className="h-5 w-5 text-orange-400" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 relative z-10">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <div className="space-y-2">
              {['about', 'privacy', 'terms', 'contact'].map((link) => (
                <Link
                  key={link}
                  to={`/${link}`}
                  className="block text-orange-200 hover:text-orange-400 transition-colors text-sm"
                >
                  {t(`footer.links.${link}`)}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 relative z-10">
            <h3 className="text-lg font-semibold text-white">{t('footer.contact.title')}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-orange-400 flex-shrink-0" />
                <span className="text-orange-200 text-sm">{t('footer.contact.email')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-orange-400 flex-shrink-0" />
                <span className="text-orange-200 text-sm">{t('footer.contact.phone')}</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <span className="text-orange-200 text-sm whitespace-pre-line">
                  {t('footer.contact.address')}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-orange-800 mt-8 pt-8 text-center relative z-10">
          <p className="text-orange-200 text-sm">{t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;