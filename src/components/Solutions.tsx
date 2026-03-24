import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';
import { Briefcase, ChevronRight, Check, Brain, Heart, Bone, Baby, Activity } from 'lucide-react';
import { translateDepartment, translateFeatures } from '../lib/solutionTranslations';

interface Solution {
  id: number;
  title: string;
  title_en?: string;
  category: string;
  category_en?: string;
  description: string;
  description_en?: string;
  content: string;
  content_en?: string;
  image_url: string;
  icon: string;
  features: string[];
  features_en?: string[];
  active: boolean;
}

// Icon components for departments
const DepartmentIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain,
  Heart,
  Bone,
  Baby,
  Activity,
};

const categoryLabels: Record<string, string> = {
  '消化内科': 'Gastroenterology',
  '呼吸内科': 'Respiratory Medicine',
  '妇科': 'Gynecology',
  '泌尿外科': 'Urology',
  '普外科': 'General Surgery',
  '胸外科': 'Thoracic Surgery',
  '骨科': 'Orthopedics',
  '儿科': 'Pediatrics',
  '神经外科': 'Neurosurgery',
  '心血管内科': 'Cardiology',
  '五官科': 'ENT',
  '眼科': 'Ophthalmology',
  '皮肤科': 'Dermatology',
  '急诊科': 'Emergency Medicine',
  'ICU': 'ICU',
};

const categoryIconNames: Record<string, string> = {
  '消化内科': 'Activity',
  '呼吸内科': 'Activity',
  '妇科': 'Baby',
  '泌尿外科': 'Activity',
  '普外科': 'Activity',
  '胸外科': 'Heart',
  '骨科': 'Bone',
  '儿科': 'Baby',
  '神经外科': 'Brain',
  '心血管内科': 'Heart',
  '五官科': 'Activity',
  '眼科': 'Activity',
  '皮肤科': 'Activity',
  '急诊科': 'Activity',
  'ICU': 'Activity',
};

export default function Solutions() {
  const { t, i18n } = useTranslation();
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    loadSolutions();
  }, []);

  async function loadSolutions() {
    const { data } = await supabase
      .from('solutions')
      .select('*')
      .eq('active', true)
      .order('sort_order', { ascending: true });

    if (data) setSolutions(data);
    setLoading(false);
  }

  const categories = [...new Set(solutions.map(s => s.category))];
  const filteredSolutions = selectedCategory
    ? solutions.filter(s => s.category === selectedCategory)
    : solutions;

  const isEnglish = i18n.language !== 'zh' && !i18n.language.startsWith('zh');

  // Get translated solution data
  const getSolutionData = (solution: Solution) => {
    if (isEnglish) {
      return {
        title: solution.title_en || translateDepartment(solution.title, i18n.language),
        category: solution.category_en || translateDepartment(solution.category, i18n.language),
        description: solution.description_en || solution.description,
        features: solution.features_en || translateFeatures(solution.features || [], i18n.language),
      };
    }
    return {
      title: solution.title,
      category: solution.category,
      description: solution.description,
      features: solution.features || [],
    };
  };

  // Get localized home path
  const getLocalizedHomePath = () => {
    const lang = i18n.language;
    if (lang === 'zh' || lang === 'zh-CN') {
      return '/';
    }
    return `/${lang}`;
  };

  // Get category label with translation
  const getCategoryLabel = (category: string) => {
    return translateDepartment(category, i18n.language);
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
              {t('solutions.title')}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('solutions.description')}
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
                {isEnglish ? 'All Departments' : '全部科室'}
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full transition-all flex items-center gap-2 ${
                    selectedCategory === category
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-primary-50'
                  }`}
                >
                  <span>{getCategoryLabel(category)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Solutions Grid */}
      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {filteredSolutions.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredSolutions.map((solution) => {
                const data = getSolutionData(solution);
                const iconName = categoryIconNames[solution.category] || 'Activity';
                const IconComponent = DepartmentIcons[iconName] || Activity;

                return (
                  <div
                    key={solution.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-100"
                  >
                    {/* Image */}
                    <div className="h-48 bg-gradient-to-br from-primary-50 to-primary-100 relative overflow-hidden">
                      {solution.image_url ? (
                        <img
                          src={solution.image_url}
                          alt={data.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-20 h-20 bg-white/80 rounded-2xl shadow-lg flex items-center justify-center">
                            <IconComponent className="w-10 h-10 text-primary" />
                          </div>
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-primary">
                          {data.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {data.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {data.description}
                      </p>

                      {/* Features */}
                      {data.features && data.features.length > 0 && (
                        <div className="space-y-2 mb-4">
                          {data.features.slice(0, 3).map((feature, idx) => (
                            <div key={idx} className="flex items-center text-sm text-gray-600">
                              <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* CTA */}
                      <Link
                        to={`${getLocalizedHomePath()}solutions/${solution.id}`}
                        className="inline-flex items-center text-primary font-semibold hover:underline"
                      >
                        {isEnglish ? 'Learn More' : '查看详情'}
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                {isEnglish ? 'No solutions available' : '暂无解决方案'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="py-16 bg-gradient-to-r from-primary to-primary-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {isEnglish ? 'Need a Custom Solution?' : '需要定制解决方案？'}
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            {isEnglish
              ? 'Contact our expert team for the best medical equipment solutions.'
              : '联系我们，我们的专家团队将为您提供最适合的医疗设备方案。'}
          </p>
          <Link
            to={getLocalizedHomePath() + 'contact'}
            className="inline-flex items-center px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-gray-100 transition-colors"
          >
            {isEnglish ? 'Contact Us' : '联系我们'}
            <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
