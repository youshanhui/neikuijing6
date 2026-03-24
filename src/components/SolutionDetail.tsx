import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';
import { Briefcase, Check, ChevronRight, ArrowLeft, Phone, Mail } from 'lucide-react';
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
  '耳鼻喉科': 'ENT (Ear, Nose, Throat)',
  '肛肠科': 'Proctology',
  '美容科': 'Cosmetic Surgery',
};

export default function SolutionDetail() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const [solution, setSolution] = useState<Solution | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSolution();
  }, [id]);

  async function loadSolution() {
    if (!id) {
      setError('Invalid solution ID');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('solutions')
        .select('*')
        .eq('id', parseInt(id))
        .single();

      if (error) {
        setError('Solution not found');
        console.error('Error loading solution:', error);
      } else if (data) {
        setSolution(data);
      }
    } catch (err) {
      setError('Failed to load solution');
      console.error('Error:', err);
    }
    setLoading(false);
  }

  const isEnglish = i18n.language !== 'zh' && !i18n.language.startsWith('zh');

  // Get translated solution data
  const getSolutionData = (sol: Solution) => {
    if (isEnglish) {
      return {
        title: sol.title_en || translateDepartment(sol.title, i18n.language),
        category: sol.category_en || translateDepartment(sol.category, i18n.language),
        description: sol.description_en || sol.description,
        content: sol.content_en || sol.content,
        features: sol.features_en || translateFeatures(sol.features || [], i18n.language),
      };
    }
    return {
      title: sol.title,
      category: sol.category,
      description: sol.description,
      content: sol.content,
      features: sol.features || [],
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  }

  if (error || !solution) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {isEnglish ? 'Solution Not Found' : '解决方案未找到'}
          </h2>
          <p className="text-gray-600 mb-6">
            {isEnglish ? 'Sorry, the requested solution does not exist.' : '抱歉，您请求的解决方案不存在。'}
          </p>
          <Link
            to={getLocalizedHomePath() + '/solutions'}
            className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {isEnglish ? 'Back to Solutions' : '返回解决方案列表'}
          </Link>
        </div>
      </div>
    );
  }

  // Get translated data
  const data = getSolutionData(solution);

  // Parse features if it's a string
  const features = typeof solution.features === 'string'
    ? JSON.parse(solution.features)
    : (data.features || []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary-50 to-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to={getLocalizedHomePath() + '/solutions'}
            className="inline-flex items-center text-primary hover:underline mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {isEnglish ? 'Back to Solutions' : '返回解决方案列表'}
          </Link>

          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-sm mb-4">
              <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
              <span className="text-primary text-sm font-medium">
                {data.category}
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {data.title}
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {data.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Featured Image */}
            {solution.image_url && (
              <div className="mb-12 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={solution.image_url}
                  alt={data.title}
                  className="w-full h-96 object-cover"
                />
              </div>
            )}

            {/* Detailed Content */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Briefcase className="w-6 h-6 text-primary mr-3" />
                {isEnglish ? 'Solution Details' : '方案详情'}
              </h2>

              {/* Split content into paragraphs and display */}
              <div className="prose prose-lg max-w-none">
                {data.content.split('\n\n').filter(p => p.trim()).map((paragraph, index) => (
                  <div key={index} className="mb-6 text-gray-700 leading-relaxed whitespace-pre-line">
                    {paragraph}
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            {features && features.length > 0 && (
              <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Check className="w-6 h-6 text-green-500 mr-3" />
                  {isEnglish ? 'Core Advantages' : '核心优势'}
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start bg-white p-4 rounded-xl shadow-sm"
                    >
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <Check className="w-5 h-5 text-green-600" />
                      </div>
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact CTA */}
            <div className="bg-gradient-to-r from-primary to-primary-600 rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                {isEnglish ? 'Interested?' : '感兴趣吗？'}
              </h2>
              <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                {isEnglish
                  ? 'Contact our expert team for detailed solution consultation and technical support.'
                  : '联系我们，我们的专家团队将为您提供详细的方案咨询和技术支持。'}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to={getLocalizedHomePath() + '/contact'}
                  className="inline-flex items-center px-6 py-3 bg-white text-primary font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  {isEnglish ? 'Contact Now' : '立即咨询'}
                </Link>
                <a
                  href="mailto:sales@shshiyin.com"
                  className="inline-flex items-center px-6 py-3 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-colors"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  {isEnglish ? 'Send Email' : '发送邮件'}
                </a>
              </div>
            </div>

            {/* Related Solutions */}
            <div className="mt-12 text-center">
              <Link
                to={getLocalizedHomePath() + '/solutions'}
                className="inline-flex items-center text-primary font-semibold hover:underline"
              >
                <ChevronRight className="w-5 h-5 mr-1 rotate-180" />
                {isEnglish ? 'View More Solutions' : '查看更多解决方案'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
