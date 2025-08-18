import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Check, Star, Zap, Crown, Rocket } from 'lucide-react';
import { pricingPlans } from '../data/mockData';

const Pricing: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSelectPlan = (planId: string) => {
    // Store selected plan in localStorage for the submit page
    localStorage.setItem('selectedPlan', planId);
    // Store intended destination for after login
    localStorage.setItem('redirectAfterLogin', '/submit');
    // Redirect to template submission page (will redirect to login if not authenticated)
    navigate('/submit');
  };

  const planIcons = {
    '1': Zap,
    '2': Crown,
    '3': Rocket
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-200/30 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 pt-20 relative z-10">
          <div className="inline-flex items-center px-4 py-2 bg-orange-100 rounded-full text-orange-600 text-sm font-medium mb-4">
            <Star className="w-4 h-4 mr-2" />
            Choose Your Plan
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {t('pricing.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('pricing.subtitle')}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10 pb-20">
          {pricingPlans.map((plan) => {
            const PlanIcon = planIcons[plan.id as keyof typeof planIcons];
            return (
            <div
              key={plan.id}
              className={`group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 hover:-translate-y-4 ${
                plan.popular ? 'ring-2 ring-orange-500 scale-105 shadow-orange-500/20' : 'hover:shadow-orange-500/10'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-orange-500 to-red-500 text-white text-center py-3 text-sm font-bold">
                  <Crown className="inline-block h-4 w-4 mr-1" />
                  {t('pricing.popular')}
                </div>
              )}

              <div className="p-8 pt-16">
                {/* Plan Icon */}
                <div className="flex justify-center mb-6">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                    plan.popular 
                      ? 'bg-gradient-to-br from-orange-400 to-red-500' 
                      : 'bg-gradient-to-br from-orange-400 to-red-500'
                  } group-hover:scale-110 transition-transform duration-300`}>
                    <PlanIcon className="h-8 w-8 text-white" />
                  </div>
                </div>

                {/* Plan Name */}
                <h3 className="text-3xl font-bold text-gray-900 mb-4 text-center">
                  {t(`pricing.plans.${plan.name.toLowerCase()}.name`)}
                </h3>

                {/* Email Volume */}
                <div className="mb-6 text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                    {plan.emailsPerDay.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">
                    {t('pricing.emailsPerDay')}
                  </div>
                </div>

                {/* Price */}
                <div className="mb-8 text-center">
                  <div className="text-5xl font-bold text-gray-900">
                    ${plan.price}
                    <span className="text-xl font-medium text-gray-500">/month</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <div className="text-sm font-bold text-gray-900 mb-6 text-center">
                    {t('pricing.features')}
                  </div>
                  <ul className="space-y-3">
                    {t(`pricing.plans.${plan.name.toLowerCase()}.features`, { returnObjects: true } as any).map((feature: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <div className="w-5 h-5 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`w-full py-4 px-6 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-orange-500/25'
                      : 'bg-gray-100 text-gray-900 hover:bg-orange-50 hover:text-orange-600 border-2 border-transparent hover:border-orange-200'
                  }`}
                >
                  {t('pricing.selectPlan')}
                </button>
              </div>
            </div>
            );
          })}
        </div>

        {/* FAQ or additional info */}
        <div className="mt-20 text-center relative z-10 pb-20">
          <p className="text-gray-600 mb-4">
            Need a custom solution? Contact our sales team.
          </p>
          <a
            href="/support"
            className="text-orange-600 hover:text-orange-700 font-bold text-lg hover:underline"
          >
            Contact Sales →
          </a>
        </div>
      </div>
    </div>
  );
};

export default Pricing;