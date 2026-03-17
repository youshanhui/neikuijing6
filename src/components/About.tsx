import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Globe, Award, Users, Factory, Target } from 'lucide-react';

export default function About() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Factory,
      title: t('about.features.manufacturing.title'),
      description: t('about.features.manufacturing.description'),
    },
    {
      icon: Award,
      title: t('about.features.certification.title'),
      description: t('about.features.certification.description'),
    },
    {
      icon: Globe,
      title: t('about.features.global.title'),
      description: t('about.features.global.description'),
    },
    {
      icon: Users,
      title: t('about.features.team.title'),
      description: t('about.features.team.description'),
    },
  ];

  const timeline = [
    { year: '2003', event: t('about.timeline.2003') },
    { year: '2010', event: t('about.timeline.2010') },
    { year: '2015', event: t('about.timeline.2015') },
    { year: '2020', event: t('about.timeline.2020') },
    { year: '2024', event: t('about.timeline.2024') },
  ];

  return (
    <section className="py-20 bg-gray-50" id="about">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary-50 rounded-full mb-4">
            <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
            <span className="text-primary text-sm font-medium">{t('about.title')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t('about.subtitle')}
          </h2>
          <p className="text-lg text-gray-600">
            {t('about.description')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                <feature.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Timeline & Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Timeline */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Target className="w-5 h-5 text-primary mr-2" />
              {t('about.timeline.title')}
            </h3>
            <div className="space-y-6">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex flex-col items-center mr-4">
                    <div className="w-4 h-4 bg-primary rounded-full"></div>
                    {index < timeline.length - 1 && (
                      <div className="w-0.5 h-12 bg-gray-200 mt-2"></div>
                    )}
                  </div>
                  <div>
                    <span className="text-primary font-bold">{item.year}</span>
                    <p className="text-gray-700">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Stats */}
          <div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
                <div className="text-4xl font-bold text-primary mb-2">20+</div>
                <div className="text-gray-600">{t('about.stats.years')}</div>
              </div>
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
                <div className="text-4xl font-bold text-primary mb-2">100+</div>
                <div className="text-gray-600">{t('about.stats.patents')}</div>
              </div>
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
                <div className="text-4xl font-bold text-primary mb-2">5000+</div>
                <div className="text-gray-600">{t('about.stats.customers')}</div>
              </div>
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <div className="text-gray-600">{t('about.stats.countries')}</div>
              </div>
            </div>

            <div className="mt-8">
              <Link
                to="/about"
                className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors"
              >
                {t('common.learnMore')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
