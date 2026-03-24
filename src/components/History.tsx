import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';
import { Clock, ChevronRight, Award, Users, Rocket, Handshake, Check } from 'lucide-react';

interface HistoryItem {
  id: number;
  year: number;
  title: string;
  description: string;
  image_url: string;
  category: string;
  active: boolean;
}

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  '公司成立': Rocket,
  '产品研发': Award,
  '市场拓展': Users,
  '荣誉资质': Award,
  '战略合作': Handshake,
};

const categoryLabels: Record<string, string> = {
  '公司成立': 'Company Founding',
  '产品研发': 'Product Development',
  '市场拓展': 'Market Expansion',
  '荣誉资质': 'Honors & Certifications',
  '战略合作': 'Strategic Partnerships',
};

export default function History() {
  const { t, i18n } = useTranslation();
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    const { data } = await supabase
      .from('history')
      .select('*')
      .eq('active', true)
      .order('year', { ascending: false });

    if (data) setHistoryItems(data);
    setLoading(false);
  }

  const categories = [...new Set(historyItems.map(h => h.category))];
  const filteredItems = selectedCategory
    ? historyItems.filter(h => h.category === selectedCategory)
    : historyItems;

  // Group by year
  const groupedByYear = filteredItems.reduce((acc, item) => {
    if (!acc[item.year]) {
      acc[item.year] = [];
    }
    acc[item.year].push(item);
    return acc;
  }, {} as Record<number, HistoryItem[]>);

  const years = Object.keys(groupedByYear).map(Number).sort((a, b) => b - a);

  const isZh = i18n.language === 'zh';

  // Get localized home path
  const getLocalizedHomePath = () => {
    const lang = i18n.language;
    if (lang === 'zh' || lang === 'zh-CN') {
      return '/';
    }
    return `/${lang}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary-50 to-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {t('history.title')}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('history.description')}
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-6 py-2 rounded-full transition-all ${
                  !selectedCategory
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-primary-50'
                }`}
              >
                {isZh ? '全部' : 'All'}
              </button>
              {categories.map(category => {
                const Icon = categoryIcons[category] || Award;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 rounded-full transition-all flex items-center gap-2 ${
                      selectedCategory === category
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-primary-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{categoryLabels[category] || category}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Timeline */}
      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {years.length > 0 ? (
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary-300 to-primary-50"></div>

              <div className="space-y-16">
                {years.map((year, yearIndex) => (
                  <div key={year}>
                    {/* Year Header */}
                    <div className="flex items-center justify-center mb-8">
                      <div className="relative z-10 bg-primary text-white text-2xl font-bold px-8 py-3 rounded-full shadow-lg">
                        {year}
                      </div>
                    </div>

                    {/* Year Items */}
                    <div className="space-y-8">
                      {groupedByYear[year].map((item, itemIndex) => {
                        const Icon = categoryIcons[item.category] || Award;
                        const isLeft = yearIndex % 2 === 0;

                        return (
                          <div
                            key={item.id}
                            className={`flex items-center ${
                              isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                            } flex-col`}
                          >
                            {/* Content */}
                            <div className={`flex-1 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'} px-4`}>
                              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                                <div className="flex items-center gap-2 mb-2">
                                  <Icon className="w-5 h-5 text-primary" />
                                  <span className="text-sm font-medium text-primary">
                                    {categoryLabels[item.category] || item.category}
                                  </span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                  {item.title}
                                </h3>
                                <p className="text-gray-600">
                                  {item.description}
                                </p>
                              </div>
                            </div>

                            {/* Timeline Dot */}
                            <div className="relative z-10 flex-shrink-0 w-16 h-16 bg-white border-4 border-primary rounded-full flex items-center justify-center my-4 md:my-0">
                              <Icon className="w-6 h-6 text-primary" />
                            </div>

                            {/* Empty Space */}
                            <div className="flex-1 hidden md:block"></div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                {isZh ? '暂无历程记录' : 'No history available'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="py-16 bg-gradient-to-r from-primary to-primary-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {isZh ? '与我们一起创造未来' : 'Create the Future With Us'}
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            {isZh
              ? '了解更多关于我们的信息，了解我们如何帮助您。'
              : 'Learn more about how we can help you.'}
          </p>
          <Link
            to={getLocalizedHomePath() + 'contact'}
            className="inline-flex items-center px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-gray-100 transition-colors"
          >
            {isZh ? '联系我们' : 'Contact Us'}
            <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
