import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Check, Camera, Lightbulb, Wind, Droplets, Monitor, ShoppingCart, Phone, Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';
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
  features: string[];
  featuresKey?: string;
  image: string;
  featured: boolean;
  image_url?: string;
  specifications?: string;
  applications?: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Camera,
  Lightbulb,
  Wind,
  Droplets,
  Monitor,
  ShoppingCart,
};

const defaultProducts: Record<number, Product> = {
  1: {
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
    specifications: '分辨率: 3840×2160\n帧率: 60fps\n接口: HDMI/SDI/USB\n电源: AC 220V',
    applications: '腹腔镜手术\n胸腔镜手术\n关节镜手术\n耳鼻喉内镜手术',
  },
  2: {
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
    specifications: '功率: 120W\n色温: 4500K-6500K\n亮度: 2000-8000Lux\n寿命: 50000小时',
    applications: '内窥镜检查\n微创手术\n外科手术照明',
  },
  3: {
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
    specifications: '压力范围: 5-20mmHg\n流量: 1-30L/min\n安全保护: 过压保护\n电源: AC 220V',
    applications: '腹腔镜手术\n妇科腹腔镜\n泌尿外科腹腔镜\n普外科腹腔镜',
  },
  4: {
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
    specifications: '流量范围: 0.1-1.0L/min\n压力: 0-500mmHg\n液体: 生理盐水/甘露醇\n电源: AC 220V',
    applications: '关节镜手术\n腹腔镜手术\n泌尿外科手术',
  },
  5: {
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
    specifications: '负压范围: 0-80kPa\n流量: 0-20L/min\n噪音: ≤60dB\n储液罐: 2000ml',
    applications: '外科手术吸引\n腹腔镜手术吸引\n伤口护理',
  },
  6: {
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
    specifications: '尺寸: 21.5"/27"/32"\n分辨率: 1920×1080/3840×2160\n亮度: 500-700cd/m²\n视角: 178°',
    applications: '手术室显示\n监护室显示\n内镜中心显示',
  },
  7: {
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
    specifications: '材质: 医用级不锈钢\n承重: 100kg\n层数: 3-5层\n轮子: 带刹车万向轮',
    applications: '内镜手术室\n检查室\n治疗室',
  },
};

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      if (!id) return;

      const productId = parseInt(id);

      // Try to load from Supabase first
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();

      if (error || !data) {
        // Use default product if not found in Supabase
        setProduct(defaultProducts[productId] || null);
      } else {
        setProduct(data);
      }
      setLoading(false);
    }

    loadProduct();
  }, [id]);

  // Get localized home path
  const getLocalizedHomePath = () => {
    const lang = i18n.language;
    if (lang === 'zh' || lang === 'zh-CN') {
      return '/';
    }
    return `/${lang}`;
  };

  // Get product display data (translate based on current language)
  const getProductData = (prod: Product) => {
    const isEnglish = i18n.language !== 'zh' && !i18n.language.startsWith('zh');

    if (prod.nameKey) {
      let name = t(prod.nameKey);
      let category = prod.categoryKey ? t(prod.categoryKey) : prod.category;
      let description = prod.descriptionKey ? t(prod.descriptionKey) : prod.description;
      let features = prod.featuresKey ? t(prod.featuresKey, { returnObjects: true }) as string[] : prod.features;

      // Apply translations for English
      if (isEnglish) {
        name = translateProductName(name, i18n.language);
        category = translateCategory(category, i18n.language);
        features = translateFeatures(Array.isArray(features) ? features : [], i18n.language);
      }

      return { name, category, description, features };
    }

    let name = prod.name;
    let category = prod.category;

    // Apply translations for English
    if (isEnglish) {
      name = translateProductName(name, i18n.language);
      category = translateCategory(category, i18n.language);
    }

    return {
      name,
      category,
      description: prod.description,
      features: prod.features,
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('productDetail.notFound')}</h2>
          <Link to={getLocalizedHomePath() + '/products'} className="text-primary hover:underline">
            {t('productDetail.backToProducts')}
          </Link>
        </div>
      </div>
    );
  }

    const productData = getProductData(product);
  const IconComponent = iconMap[product.icon] || Camera;
  const homePath = getLocalizedHomePath();

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary-50 to-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-500 mb-8">
            <Link to={homePath} className="hover:text-primary">{t('common.home')}</Link>
            <span className="mx-2">/</span>
            <Link to={homePath + '/products'} className="hover:text-primary">{t('common.products')}</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{productData.name}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Product Image/Icon */}
            <div className={`${product.image?.startsWith('/') || product.image?.startsWith('http') ? 'bg-gray-50' : product.image} rounded-3xl p-12 flex items-center justify-center`}>
              {product.image?.startsWith('/') || product.image?.startsWith('http') ? (
                <img
                  src={product.image}
                  alt={productData.name}
                  className="max-w-full h-auto rounded-2xl shadow-xl object-contain max-h-96"
                />
              ) : (
                <div className="w-48 h-48 bg-white rounded-3xl shadow-2xl flex items-center justify-center">
                  <IconComponent className="w-24 h-24 text-primary" />
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-primary-100 rounded-full mb-4">
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                <span className="text-primary text-sm font-medium">{productData.category}</span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                {productData.name}
              </h1>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {productData.description}
              </p>

              {/* Key Features */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {productData.features.slice(0, 4).map((feature, index) => (
                  <div key={index} className="flex items-center text-gray-700">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  to={homePath + '/contact'}
                  className="inline-flex items-center px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  {t('common.getQuote')}
                </Link>
                <a
                  href="mailto:shiyin@shshiyin.cn"
                  className="inline-flex items-center px-8 py-4 border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  {t('common.learnMore')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications Section */}
      {product.specifications && (
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t('productDetail.specifications')}</h2>
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
              <div className="grid gap-4">
                {product.specifications.split('\n').map((line, index) => {
                  const [key, ...valueParts] = line.split(':');
                  const value = valueParts.join(':');
                  if (key && value) {
                    return (
                      <div key={index} className="flex border-b border-gray-100 pb-4 last:border-0">
                        <span className="font-semibold text-gray-900 w-32">{key.trim()}</span>
                        <span className="text-gray-600">{value.trim()}</span>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Applications Section */}
      {product.applications && (
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t('productDetail.applications')}</h2>
            <div className="max-w-3xl mx-auto">
              <div className="grid md:grid-cols-2 gap-4">
                {product.applications.split('\n').map((app, index) => (
                  <div key={index} className="flex items-center bg-primary-50 rounded-xl p-4">
                    <div className="w-3 h-3 bg-primary rounded-full mr-3"></div>
                    <span className="text-gray-700 font-medium">{app}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Related Products */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t('productDetail.relatedProducts')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {Object.values(defaultProducts)
              .filter(p => p.id !== product.id)
              .slice(0, 3)
              .map(relatedProduct => {
                const relatedData = getProductData(relatedProduct);
                const RelatedIcon = iconMap[relatedProduct.icon] || Camera;
                return (
                  <Link
                    key={relatedProduct.id}
                    to={`${homePath}/products/${relatedProduct.id}`}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className={`${relatedProduct.image} p-8`}>
                      <div className="w-16 h-16 bg-white rounded-2xl shadow flex items-center justify-center">
                        <RelatedIcon className="w-8 h-8 text-primary" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{relatedData.name}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2">{relatedData.description}</p>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="py-16 bg-gradient-to-r from-primary to-primary-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">{t('productDetail.contactCTA')}</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            {t('productDetail.contactDescription')}
          </p>
          <Link
            to={homePath + 'contact'}
            className="inline-flex items-center px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-gray-100 transition-colors"
          >
            {t('common.contact')}
            <ArrowLeft className="ml-2 w-5 h-5 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}
