import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';
import { FileText, Calendar, User, ArrowLeft, ChevronRight } from 'lucide-react';
import { translateNewsTitle, translateNewsCategory, translateNewsDescription, translateNewsContent, translateNewsFull } from '../lib/newsTranslations';

interface NewsItem {
  id: number;
  title: string;
  title_en?: string;
  category: string;
  category_en?: string;
  short_description: string;
  short_description_en?: string;
  content: string;
  content_en?: string;
  author: string;
  image_url: string;
  active: boolean;
  created_at: string;
}

interface TranslatedNews {
  title: string;
  category: string;
  short_description: string;
  content: string;
}

export default function NewsDetail() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [translatedNews, setTranslatedNews] = useState<TranslatedNews | null>(null);
  const [loading, setLoading] = useState(true);
  const [translating, setTranslating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isZh = i18n.language === 'zh';
  const isEnglish = !isZh && !i18n.language.startsWith('zh');

  useEffect(() => {
    loadNews();
  }, [id, i18n.language]);

  async function loadNews() {
    if (!id) {
      setError('Invalid news ID');
      setLoading(false);
      return;
    }

    // Check if current language is Chinese
    const currentIsZh = i18n.language === 'zh' || i18n.language.startsWith('zh');
    const isEnglish = !currentIsZh;

    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('id', parseInt(id))
        .single();

      if (error) {
        setError('News not found');
        console.error('Error loading news:', error);
      } else if (data) {
        setNews(data);
        // If English, translate news content
        if (isEnglish) {
          setTranslating(true);
          try {
            const translated = await translateNewsFull(
              data.title,
              data.short_description,
              data.content
            );
            setTranslatedNews({
              title: translated.title,
              category: translateNewsCategory(data.category, i18n.language),
              short_description: translated.shortDescription,
              content: translated.content,
            });
          } catch (err) {
            console.error('Translation failed:', err);
            // Fallback to keyword translation
            setTranslatedNews({
              title: translateNewsTitle(data.title, i18n.language),
              category: translateNewsCategory(data.category, i18n.language),
              short_description: translateNewsDescription(data.short_description, i18n.language),
              content: translateNewsContent(data.content, i18n.language),
            });
          }
          setTranslating(false);
        } else {
          // Reset translated news when switching to Chinese
          setTranslatedNews(null);
        }
      }
    } catch (err) {
      setError('Failed to load news');
      console.error('Error:', err);
    }
    setLoading(false);
  }
  // Get localized home path
  const getLocalizedHomePath = () => {
    const lang = i18n.language;
    if (lang === 'zh' || lang === 'zh-CN') {
      return '/';
    }
    return `/${lang}`;
  };

  if (loading || translating) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">{isZh ? '加载中...' : 'Loading...'}</p>
        </div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {isZh ? '新闻未找到' : 'News Not Found'}
          </h2>
          <p className="text-gray-600 mb-6">
            {isZh ? '抱歉，您请求的新闻不存在。' : 'Sorry, the requested news does not exist.'}
          </p>
          <Link
            to={getLocalizedHomePath() + '/news'}
            className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {isZh ? '返回新闻列表' : 'Back to News'}
          </Link>
        </div>
      </div>
    );
  }

  // Get display data (use translated content if available)
  const displayData = translatedNews || {
    title: news.title,
    category: news.category,
    short_description: news.short_description,
    content: news.content,
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary-50 to-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to={getLocalizedHomePath() + '/news'}
            className="inline-flex items-center text-primary hover:underline mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {isZh ? '返回新闻列表' : 'Back to News'}
          </Link>

          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-sm mb-4">
              <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
              <span className="text-primary text-sm font-medium">
                {displayData.category}
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {displayData.title}
            </h1>
            <div className="flex items-center justify-center text-gray-600 space-x-6">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                {new Date(news.created_at).toLocaleDateString(isEnglish ? 'en-US' : 'zh-CN')}
              </div>
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                {news.author}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Featured Image */}
            {news.image_url && (
              <div className="mb-12 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={news.image_url}
                  alt={displayData.title}
                  className="w-full h-96 object-cover"
                />
              </div>
            )}

            {/* Short Description */}
            <div className="bg-primary-50 rounded-2xl p-6 mb-8">
              <p className="text-gray-700 leading-relaxed">
                {displayData.short_description}
              </p>
            </div>

            {/* Detailed Content */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
              {/* Split content into paragraphs and display */}
              <div className="prose prose-lg max-w-none">
                {displayData.content.split('\n\n').filter(p => p.trim()).map((paragraph, index) => (
                  <div key={index} className="mb-6 text-gray-700 leading-relaxed whitespace-pre-line">
                    {paragraph}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact CTA */}
            <div className="bg-gradient-to-r from-primary to-primary-600 rounded-2xl p-8 text-center mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                {isZh ? '了解更多产品信息？' : 'Want to Learn More About Our Products?'}
              </h2>
              <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                {isZh
                  ? '联系我们，我们的专家团队将为您提供详细的产品信息和技术支持。'
                  : 'Contact our expert team for detailed product information and technical support.'}
              </p>
              <Link
                to={getLocalizedHomePath() + '/contact'}
                className="inline-flex items-center px-6 py-3 bg-white text-primary font-semibold rounded-xl hover:bg-gray-100 transition-colors"
              >
                {isZh ? '联系我们' : 'Contact Us'}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </div>

            {/* Back to List */}
            <div className="text-center">
              <Link
                to={getLocalizedHomePath() + '/news'}
                className="inline-flex items-center text-primary font-semibold hover:underline"
              >
                <ArrowLeft className="w-5 h-5 mr-1" />
                {isZh ? '查看更多新闻' : 'View More News'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
