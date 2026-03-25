import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { ArrowRight, Check, Camera, Lightbulb, Wind, Droplets, Monitor, ShoppingCart } from 'lucide-react';
import { supabase, getProductImageUrl } from '../lib/supabase';
import { translateProductName, translateCategory, translateFeatures } from '../lib/productTranslations';

interface Product {
  id: number;
  name: string;
  nameKey?: string;
  category: string;
  categoryKey?: string;
  description: string;
  descriptionKey?: string;
  icon: string;
  features: string[] | string;
  featuresKey?: string;
  image: string;
  image_url?: string;
  featured: boolean;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Camera,
  Lightbulb,
  Wind,
  Droplets,
  Monitor,
  ShoppingCart,
};

const defaultProducts = [
  {
    id: 1,
    name: '4K超高清摄像系统',
    nameKey: 'products.items.camera4k.name',
    category: '摄像系统',
    categoryKey: 'products.items.camera4k.category',
    description: '采用先进的4K超高清成像技术，提供清晰细腻的手术视野',
    descriptionKey: 'products.items.camera4k.description',
    icon: 'Camera',
    features: ['4K超高清分辨率', '色彩还原真实', '低延迟传输', '智能对焦'],
    featuresKey: 'products.items.camera4k.features',
    image: 'bg-gradient-to-br from-blue-50 to-white',
    featured: true,
  },
  {
    id: 2,
    name: 'LED冷光源',
    nameKey: 'products.items.ledlight.name',
    category: '光源系统',
    categoryKey: 'products.items.ledlight.category',
    description: '高效节能的LED冷光源，提供稳定均匀的照明',
    descriptionKey: 'products.items.ledlight.description',
    icon: 'Lightbulb',
    features: ['冷光源不发热', '亮度可调节', '使用寿命长', '色温可调'],
    featuresKey: 'products.items.ledlight.features',
    image: 'bg-gradient-to-br from-yellow-50 to-white',
    featured: true,
  },
  {
    id: 3,
    name: 'CO2气腹机',
    nameKey: 'products.items.co2.name',
    category: '气腹系统',
    categoryKey: 'products.items.co2.category',
    description: '精确控制腹腔压力，提供稳定的手术操作空间',
    descriptionKey: 'products.items.co2.description',
    icon: 'Wind',
    features: ['压力精确控制', '自动安全监测', '多种模式可选', '低噪音设计'],
    featuresKey: 'products.items.co2.features',
    image: 'bg-gradient-to-br from-cyan-50 to-white',
    featured: true,
  },
  {
    id: 4,
    name: '灌注泵',
    nameKey: 'products.items.irrigation.name',
    category: '灌注系统',
    categoryKey: 'products.items.irrigation.category',
    description: '精确控制液体流量，确保手术视野清晰',
    descriptionKey: 'products.items.irrigation.description',
    icon: 'Droplets',
    features: ['流量精确控制', '多种液体兼容', '智能报警系统', '操作简便'],
    featuresKey: 'products.items.irrigation.features',
    image: 'bg-gradient-to-br from-teal-50 to-white',
    featured: false,
  },
  {
    id: 5,
    name: '负压吸引器',
    nameKey: 'products.items.suction.name',
    category: '吸引系统',
    categoryKey: 'products.items.suction.category',
    description: '高效可靠的负压吸引设备，保持手术区域清洁',
    descriptionKey: 'products.items.suction.description',
    icon: 'Droplets',
    features: ['吸力可调节', '噪音低', '易于清洁', '安全可靠'],
    featuresKey: 'products.items.suction.features',
    image: 'bg-gradient-to-br from-indigo-50 to-white',
    featured: false,
  },
  {
    id: 6,
    name: '医用监视器',
    nameKey: 'products.items.monitor.name',
    category: '显示系统',
    categoryKey: 'products.items.monitor.category',
    description: '高清晰度医用监视器，呈现完美图像',
    descriptionKey: 'products.items.monitor.description',
    icon: 'Monitor',
    features: ['高分辨率显示', '广视角设计', '护眼模式', '多种输入接口'],
    featuresKey: 'products.items.monitor.features',
    image: 'bg-gradient-to-br from-purple-50 to-white',
    featured: false,
  },
  {
    id: 7,
    name: '内镜手术推车',
    nameKey: 'products.items.cart.name',
    category: '配套设备',
    categoryKey: 'products.items.cart.category',
    description: '模块化设计推车，集成所有内镜设备',
    descriptionKey: 'products.items.cart.description',
    icon: 'ShoppingCart',
    features: ['模块化设计', '移动灵活', '布线整洁', '可定制'],
    featuresKey: 'products.items.cart.features',
    image: 'bg-gradient-to-br from-gray-50 to-white',
    featured: false,
  },
];

export default function Products() {
  const { t, i18n } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  // Add timestamp state for cache-busting images
  const [imageVersion] = useState(() => Date.now());

  // Get localized product path
  const getProductPath = (productId: number) => {
    const lang = i18n.language;
    if (lang === 'zh' || lang === 'zh-CN') {
      return `/products/${productId}`;
    }
    return `/${lang}/products/${productId}`;
  };

  // Get localized products list path
  const getProductsListPath = () => {
    const lang = i18n.language;
    if (lang === 'zh' || lang === 'zh-CN') {
      return '/products';
    }
    return `/${lang}/products`;
  };

  // Load products from Supabase
  useEffect(() => {
    async function loadProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id');

      if (error) {
        console.error('Error loading products:', error);
        setProducts(defaultProducts);
      } else if (data && data.length > 0) {
        setProducts(data);
      } else {
        setProducts(defaultProducts);
      }
    }
    loadProducts();
  }, []);

  // Get product display data (translate based on current language)
  const getProductData = (product: Product) => {
    const isEnglish = i18n.language !== 'zh' && !i18n.language.startsWith('zh');

    if (product.nameKey) {
      let name = t(product.nameKey);
      let category = product.categoryKey ? t(product.categoryKey) : product.category;
      let description = product.descriptionKey ? t(product.descriptionKey) : product.description;
      let features = product.featuresKey ? t(product.featuresKey, { returnObjects: true }) as string[] : product.features;

      // Apply translations for English
      if (isEnglish) {
        name = translateProductName(name, i18n.language);
        category = translateCategory(category, i18n.language);
        features = translateFeatures(Array.isArray(features) ? features : [], i18n.language);
      }

      return { name, category, description, features };
    }

    // Handle features that might be array or string
    let features: string[] = [];
    if (Array.isArray(product.features)) {
      features = product.features as string[];
    } else if (typeof product.features === 'string') {
      // Parse string features like "{型号,SY-SHREK-UHD909,质保,八年免费保修,...}"
      features = product.features.replace(/[{}]/g, '').split(',');
    }

    let name = product.name;
    let category = product.category;

    // Apply translations for English
    if (isEnglish) {
      name = translateProductName(name, i18n.language);
      category = translateCategory(category, i18n.language);
      features = translateFeatures(features, i18n.language);
    }

    return {
      name,
      category,
      description: product.description,
      features,
    };
  };

  const displayProducts = products.length > 0 ? products : defaultProducts;

  return (
    <section className="py-20 bg-white" id="products">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary-50 rounded-full mb-4">
            <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
            <span className="text-primary text-sm font-medium">{t('products.title')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t('products.subtitle')}
          </h2>
          <p className="text-lg text-gray-600">
            {t('products.description')}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayProducts.map((product) => {
            const productData = getProductData(product);
            const IconComponent = iconMap[product.icon] || Camera;
            // Prefer image_url from database, fallback to image
            const imagePath = product.image_url || product.image;
            const imageUrl = getProductImageUrl(imagePath);
            const isImageUrl = !!imageUrl;
            // Add cache-busting parameter to force browser to load fresh images
            const imageSrc = imageUrl ? `${imageUrl}${imageUrl.includes('?') ? '&' : '?'}v=${imageVersion}` : '';
            return (
            <div
              key={product.id}
              className="group bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Product Image */}
              <div className="relative h-48 bg-gradient-to-br from-primary-50 to-primary-100 overflow-hidden">
                {isImageUrl ? (
                  <img
                    src={imageSrc}
                    alt={productData.name}
                    className="w-full h-full object-contain p-4"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      // Fallback to icon if image fails to load
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <div className={`absolute inset-0 flex items-center justify-center ${isImageUrl ? 'hidden' : ''}`}>
                  <div className="w-20 h-20 bg-white/80 rounded-2xl shadow-lg flex items-center justify-center">
                    <IconComponent className="w-10 h-10 text-primary" />
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm text-gray-600 font-medium shadow-sm">
                    {productData.category}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {productData.name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{productData.description}</p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {Array.isArray(productData.features) && productData.features.slice(0, 4).map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <Check className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                      <span className="truncate">{String(feature)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="px-8 py-4 bg-gray-50 flex items-center justify-between">
                <Link
                  to={getProductPath(product.id)}
                  className="text-primary font-medium hover:text-primary-600 transition-colors flex items-center"
                >
                  {t('products.learnMore')}
                  <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-600 transition-colors">
                  {t('products.requestInfo')}
                </button>
              </div>
            </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            to={getProductsListPath()}
            className="inline-flex items-center px-8 py-4 border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary hover:text-white transition-all duration-300"
          >
            {t('common.viewAll')}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
