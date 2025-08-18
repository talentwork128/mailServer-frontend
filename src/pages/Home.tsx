import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Clock, Send, Shield, Users, Sparkles, Zap, Target } from 'lucide-react';

const Home: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Target,
      key: 'template'
    },
    {
      icon: Shield,
      key: 'compliance'
    },
    {
      icon: Zap,
      key: 'support'
    }
  ];

  const steps = [
    {
      icon: Send,
      key: 'submit'
    },
    {
      icon: Clock,
      key: 'review'
    },
    {
      icon: Sparkles,
      key: 'deliver'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-orange-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Clean Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500"></div>
        
        {/* Hero Image - Email/Technology themed */}
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-20">
          <img 
            src="https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Email Technology" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center lg:text-left relative z-10">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6 border border-white/30">
              <Sparkles className="w-4 h-4 mr-2" />
              Professional Email Templates
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
              {t('home.hero.title')}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl lg:mx-0 mx-auto mb-8 leading-relaxed backdrop-blur-sm">
              {t('home.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/pricing"
                className="group inline-flex items-center justify-center px-8 py-4 bg-white text-orange-600 font-bold rounded-2xl hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-orange-500/25"
              >
                {t('home.hero.cta')}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/support"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-2xl hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
              >
                {t('home.hero.learnMore')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Client Reviews Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-200/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-orange-100 rounded-full text-orange-600 text-sm font-medium mb-4">
              <Users className="w-4 h-4 mr-2" />
              Client Success Stories
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied businesses who trust us with their email marketing success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                company: "TechStart Inc.",
                image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400",
                review: "ServiceMitteilung transformed our email campaigns. Our open rates increased by 300% and the templates look absolutely professional.",
                rating: 5
              },
              {
                name: "Michael Chen",
                company: "Growth Marketing Co.",
                image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400",
                review: "The review process is thorough and the team provides excellent feedback. Our email deliverability has never been better.",
                rating: 5
              },
              {
                name: "Emily Rodriguez",
                company: "E-commerce Plus",
                image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400",
                review: "Outstanding service! The templates are mobile-responsive and comply with all email standards. Highly recommended!",
                rating: 5
              }
            ].map((client, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 transform hover:-translate-y-2">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-xl">{client.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{client.name}</h4>
                    <p className="text-orange-600 font-medium">{client.company}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(client.rating)].map((_, i) => (
                    <div key={i} className="w-5 h-5 text-yellow-400">⭐</div>
                  ))}
                </div>
                <p className="text-gray-600 italic leading-relaxed">"{client.review}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-orange-900 via-red-900 to-pink-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 relative z-10">
            <div className="inline-flex items-center px-4 py-2 bg-orange-500/20 backdrop-blur-sm rounded-full text-orange-300 text-sm font-medium mb-4 border border-orange-500/30">
              <Target className="w-4 h-4 mr-2" />
              Simple Process
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              {t('home.steps.title')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center relative">
                  {/* Connection Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-orange-500 to-transparent z-0"></div>
                  )}
                  <div className="relative z-10 inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 rounded-3xl mb-6 shadow-2xl">
                    <Icon className="h-12 w-12 text-white" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-sm">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {t(`home.steps.${step.key}.title`)}
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {t(`home.steps.${step.key}.description`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-red-50 opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 relative z-10">
            <div className="inline-flex items-center px-4 py-2 bg-orange-100 rounded-full text-orange-600 text-sm font-medium mb-4">
              <Zap className="w-4 h-4 mr-2" />
              Why Choose Us
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('home.features.title')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="group text-center p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-orange-100 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 transform hover:-translate-y-2">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {t(`home.features.${feature.key}.title`)}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {t(`home.features.${feature.key}.description`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;