import React from 'react';
import { useTranslation } from 'react-i18next';
import { Target, Users, Award, Zap, Shield, Globe, Heart, Rocket } from 'lucide-react';

const About: React.FC = () => {
  const { t } = useTranslation();

  const stats = [
  { icon: Users, value: '10,000+', label: t('about.stats.clients') },
  { icon: Award, value: '50,000+', label: t('about.stats.templates') },
  { icon: Globe, value: '25+', label: t('about.stats.countries') },
  { icon: Rocket, value: '99.9%', label: t('about.stats.uptime') }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Former email marketing director at Fortune 500 companies with 15+ years of experience.'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Tech visionary who built scalable email systems serving millions of users daily.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Design',
      image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Award-winning designer specializing in email templates and user experience.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-orange-100 rounded-full text-orange-600 text-sm font-medium mb-4">
            <Heart className="w-4 h-4 mr-2" />
            {t('about.pill')}
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">{t('about.title')}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('about.description')}
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-orange-500/10 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl mb-4">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Mission Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 mb-20 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">{t('about.mission.title')}</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">{t('about.mission.description')}</p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                    <Target className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-gray-700">{t('about.features.template')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                    <Shield className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-gray-700">{t('about.features.compliance')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                    <Zap className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-gray-700">{t('about.features.turnaround')}</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Email Technology" 
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('about.team.title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t('about.team.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 transform hover:-translate-y-2">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-2xl">{member.name.charAt(0)}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
              <p className="text-orange-600 font-medium mb-4">{member.role}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;