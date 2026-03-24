import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Globe, Award, Users, Factory, Target } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useState, useEffect } from 'react';

interface TimelineItem {
  id: number;
  year: number;
  title: string;
  description: string;
  category: string;
  active: boolean;
}

export default function About() {
  const { t } = useTranslation();
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTimeline();
  }, []);

  async function loadTimeline() {
    try {
      const { data } = await supabase
        .from('history')
        .select('*')
        .eq('active', true)
        .order('year', { ascending: true });

      if (data && data.length > 0) {
        setTimeline(data);
      }
    } catch (error) {
      console.error('Error loading timeline:', error);
    }
    setLoading(false);
  }

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

  // 如果数据库没有数据，使用默认的 timeline
  const displayTimeline = timeline.length > 0 ? timeline : [
    { id: 1, year: 2003, title: '公司成立', description: '公司成立', category: '公司成立', active: true },
    { id: 2, year: 2010, title: '战略发展', description: '战略发展', category: '公司成立', active: true },
    { id: 3, year: 2015, title: 'CE认证', description: '获得CE认证', category: '荣誉资质', active: true },
    { id: 4, year: 2020, title: '全球扩展', description: '全球客户突破1000家', category: '市场拓展', active: true },
    { id: 5, year: 2024, title: '技术创新', description: '发布新一代智能内窥镜系统', category: '产品研发', active: true },
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
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="space-y-6">
                {displayTimeline.map((item, index) => (
                  <div key={item.id || index} className="flex items-start">
                    <div className="flex flex-col items-center mr-4">
                      <div className="w-4 h-4 bg-primary rounded-full"></div>
                      {index < displayTimeline.length - 1 && (
                        <div className="w-0.5 h-12 bg-gray-200 mt-2"></div>
                      )}
                    </div>
                    <div>
                      <span className="text-primary font-bold">{item.year}</span>
                      <p className="text-gray-700">{item.title || item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
