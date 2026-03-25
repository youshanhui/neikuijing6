import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Shield, TrendingUp, Award } from 'lucide-react';
import { supabase, getProductImageUrl } from '../lib/supabase';

interface FeaturedProduct {
  id: number;
  product_id: number | null;
  title: string;
  subtitle: string;
  description: string;
  image_url: string;
  link_url: string;
  button_text: string;
  active: boolean;
}

interface Product {
  id: number;
  name: string;
  image: string;
  image_url?: string;
}

export default function Hero() {
  const { t } = useTranslation();
  const [featured, setFeatured] = useState<FeaturedProduct | null>(null);
  const [productData, setProductData] = useState<Product | null>(null);
  // Add timestamp state for cache-busting images
  const [imageVersion] = useState(() => Date.now());

  useEffect(() => {
    loadFeatured();
  }, []);

  async function loadFeatured() {
    try {
      const { data, error } = await supabase
        .from('homepage_featured')
        .select('*')
        .eq('active', true)
        .order('sort_order')
        .limit(1);

      if (error) {
        console.error('Error loading featured product:', error);
        return;
      }

      if (data && data.length > 0) {
        const item = data[0];
        setFeatured(item);

        // If there's a product_id, fetch the product data (name and image)
        if (item.product_id) {
          const { data: product, error: productError } = await supabase
            .from('products')
            .select('id, name, image')
            .eq('id', item.product_id)
            .single();

          if (productError) {
            console.error('Error fetching product:', productError);
          } else if (product) {
            setProductData(product);
          }
        }
      }
    } catch (err) {
      console.error('Error loading featured product:', err);
    }
  }

  const stats = [
    { icon: Award, value: '20+', label: t('hero.yearsExperience') },
    { icon: Shield, value: '100+', label: t('hero.patents') },
    { icon: TrendingUp, value: '50+', label: t('hero.countriesServed') },
  ];

  // Determine the display content
  // 优先使用精选产品设置的标题，其次使用关联产品名称
  const displayTitle = featured?.title || productData?.name || t('products.items.monitor.name');
  // 优先使用精选产品上传的图片，其次使用关联产品的图片
  const imagePath = featured?.image_url || productData?.image_url || productData?.image || '';
  const baseImageUrl = getProductImageUrl(imagePath);
  // Add cache-busting parameter to force browser to load fresh images
  const displayImage = baseImageUrl ? `${baseImageUrl}${baseImageUrl.includes('?') ? '&' : '?'}v=${imageVersion}` : '';
  const displayLink = featured?.link_url || (featured?.product_id ? `/product/${featured.product_id}` : '/products');
  const displayButtonText = featured?.button_text || t('common.exploreProducts');

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-dots opacity-50"></div>
      <div className="absolute inset-0 pattern-lines opacity-30"></div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary-200 rounded-full blur-3xl opacity-30"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center px-4 py-2 bg-primary-50 rounded-full mb-6">
              <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
              <span className="text-primary text-sm font-medium">{t('hero.tagline')}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              {t('hero.title')}
              <span className="block gradient-text">{t('hero.subtitle')}</span>
            </h1>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {t('hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                to={displayLink}
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary-600 glow-red-hover transition-all duration-300 group"
              >
                {displayButtonText}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-primary hover:text-primary transition-all duration-300"
              >
                {t('common.getQuote')}
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-100">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-50 rounded-xl mb-3">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative hidden lg:block">
            <div className="relative">
              {/* Main Image Card */}
              <div className="relative bg-gradient-to-br from-primary-50 to-white rounded-3xl p-8 shadow-2xl">
                <div className="aspect-square relative">
                  {/* Product Image or Placeholder */}
                  <div className="absolute inset-0 bg-white rounded-2xl shadow-inner flex items-center justify-center">
                    {displayImage ? (
                      <img
                        src={displayImage}
                        alt={displayTitle}
                        className="w-full h-full object-cover rounded-2xl"
                        loading="eager"
                        decoding="async"
                      />
                    ) : (
                      <div className="text-center">
                        <div className="w-32 h-32 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                          <Shield className="w-16 h-16 text-primary" />
                        </div>
                        <p className="text-gray-500 font-medium">{displayTitle}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Floating Cards */}
                <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 animate-fade-in">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Award className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">FDA</p>
                      <p className="text-xs text-gray-500">Certification</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 animate-fade-in delay-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">98%</p>
                      <p className="text-xs text-gray-500">Satisfaction</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-primary-50 via-transparent to-transparent opacity-50 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
