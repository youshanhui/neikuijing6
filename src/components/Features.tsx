import { useTranslation } from 'react-i18next';
import { Shield, Globe, Clock, Award } from 'lucide-react';

export default function Features() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Shield,
      title: t('features.quality.title'),
      description: t('features.quality.description'),
    },
    {
      icon: Globe,
      title: t('features.global.title'),
      description: t('features.global.description'),
    },
    {
      icon: Clock,
      title: t('features.support.title'),
      description: t('features.support.description'),
    },
    {
      icon: Award,
      title: t('features.team.title'),
      description: t('features.team.description'),
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors group"
            >
              <div className="w-16 h-16 mx-auto bg-primary-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                <feature.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
