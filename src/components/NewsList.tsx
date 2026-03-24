import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';
import { FileText, ChevronRight, Calendar, User } from 'lucide-react';
import { translateNewsTitle, translateNewsCategory, translateNewsDescription, translateNewsFull } from '../lib/newsTranslations';

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

interface TranslatedNewsItem {
  id: number;
  title: string;
  category: string;
  short_description: string;
}

export default function NewsList() {
  const { t, i18n } = useTranslation();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [translatedNews, setTranslatedNews] = useState<Map<number, TranslatedNewsItem>>(new Map());
  const [loading, setLoading] = useState(true);
  const [translating, setTranslating] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    loadNews();
  }, []);

  async function loadNews() {
    const { data } = await supabase
      .from('news')
      .select('*')
      .eq('active', true)
      .order('created_at', { ascending: false });

    if (data) setNews(data);
    setLoading(false);
  }

  // Translate news when language changes
  useEffect(() => {
    if (!loading && news.length > 0 && !isZh && !i18n.language.startsWith('zh')) {
      translateAllNews();
    } else {
      setTranslatedNews(new Map());
    }
  }, [i18n.language, loading, news]);

  async function translateAllNews() {
    if (translating || news.length === 0) return;
    setTranslating(true);

    const translatedMap = new Map<number, TranslatedNewsItem>();

    try {
      // Translate in batches to avoid overwhelming the API
      const batchSize = 3;
      for (let i = 0; i < news.length; i += batchSize) {
        const batch = news.slice(i, i + batchSize);
        const promises = batch.map(async (item) => {
          try {
            const translated = await translateNewsFull(
              item.title,
              item.short_description,
              item.content
            );
            translatedMap.set(item.id, {
              id: item.id,
              title: translated.title,
              category: translateNewsCategory(item.category, i18n.language),
              short_description: translated.shortDescription,
            });
          } catch (err) {
            console.warn(`Translation failed for item ${item.id}:`, err);
            // Fallback to keyword translation
            translatedMap.set(item.id, {
              id: item.id,
              title: translateNewsTitle(item.title, i18n.language),
              category: translateNewsCategory(item.category, i18n.language),
              short_description: translateNewsDescription(item.short_description, i18n.language),
            });
          }
        });
        await Promise.all(promises);
      }
      setTranslatedNews(translatedMap);
    } catch (err) {
      console.error('Translation batch failed:', err);
    }
    setTranslating(false);
  }

  const categories = [...new Set(news.map(n => n.category))];
  const filteredNews = selectedCategory
    ? news.filter(n => n.category === selectedCategory)
    : news;

  const isZh = i18n.language === 'zh';
  const isEnglish = !isZh && !i18n.language.startsWith('zh');

  // Get translated news data
  const getNewsData = (item: NewsItem) => {
    const translated = translatedNews.get(item.id);
    if (isEnglish && translated) {
      return {
        title: translated.title,
        category: translated.category,
        short_description: translated.short_description,
      };
    }
    return {
      title: item.title,
      category: item.category,
      short_description: item.short_description,
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

  // Get translated category label
  const getCategoryLabel = (category: string) => {
    return translateNewsCategory(category, i18n.language);
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
              {t('common.news')}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {isZh ? '了解上海世音内窥镜及行业的最新新闻动态和展会信息' : 'Latest news and exhibition information from Shanghai Shiyin Endoscope'}
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
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full transition-all ${
                    selectedCategory === category
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-primary-50'
                  }`}
                >
                  {getCategoryLabel(category)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* News Grid */}
      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {filteredNews.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((item) => {
                const newsData = getNewsData(item);
                return (
                  <Link
                    to={`${getLocalizedHomePath()}/news/${item.id}`}
                    key={item.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-100 group"
                  >
                    {/* Image */}
                    <div className="h-48 bg-gradient-to-br from-primary-50 to-primary-100 relative overflow-hidden">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={newsData.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FileText className="w-16 h-16 text-primary/30" />
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-primary">
                          {newsData.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(item.created_at).toLocaleDateString(isEnglish ? 'en-US' : 'zh-CN')}
                        </div>
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {item.author}
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                        {newsData.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {newsData.short_description}
                      </p>

                      <div className="inline-flex items-center text-primary font-semibold">
                        {isZh ? '阅读更多' : 'Read More'}
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                {isZh ? '暂无新闻' : 'No news available'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
