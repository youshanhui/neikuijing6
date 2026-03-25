import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Features from './components/Features';
import Products from './components/Products';
import About from './components/About';
import Contact from './components/Contact';
import SEO from './components/SEO';
import Solutions from './components/Solutions';
import NewsList from './components/NewsList';

// Lazy load heavy components for code splitting
const AdminLogin = lazy(() => import('./components/AdminLogin'));
const AdminProducts = lazy(() => import('./components/AdminProducts'));
const InsertSolutions = lazy(() => import('./components/InsertSolutions'));
const InsertNews = lazy(() => import('./components/InsertNews'));
const SolutionDetail = lazy(() => import('./components/SolutionDetail'));
const NewsDetail = lazy(() => import('./components/NewsDetail'));
const ProductDetail = lazy(() => import('./components/ProductDetail'));
const History = lazy(() => import('./components/History'));

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
}

function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function AdminWrapper() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return <AdminProducts />;
}

function HomePage() {
  const { t } = useTranslation();
  return (
    <>
      <Hero />
      <Features />
      <Products />
      <About />
      <Contact />
    </>
  );
}

function ProductsPage() {
  const { t } = useTranslation();
  return (
    <>
      <div className="pt-32 pb-16 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('page.products.title')}</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('page.products.description')}
            </p>
          </div>
        </div>
      </div>
      <Products />
      <Contact />
    </>
  );
}

function AboutPage() {
  const { t } = useTranslation();
  return (
    <>
      <div className="pt-32 pb-16 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('page.about.title')}</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('page.about.description')}
            </p>
          </div>
        </div>
      </div>
      <About />
    </>
  );
}

function ContactPage() {
  const { t } = useTranslation();
  return (
    <>
      <div className="pt-32 pb-16 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('page.contact.title')}</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('page.contact.description')}
            </p>
          </div>
        </div>
      </div>
      <Contact />
    </>
  );
}

function NewsPage() {
  const { t } = useTranslation();
  return (
    <>
      <NewsList />
      <Contact />
    </>
  );
}

function SolutionsPage() {
  const { t } = useTranslation();
  return (
    <>
      <Solutions />
      <Contact />
    </>
  );
}

function HistoryPage() {
  const { t } = useTranslation();
  return (
    <>
      <Suspense fallback={<LoadingFallback />}>
        <History />
      </Suspense>
      <Contact />
    </>
  );
}

// Language-aware route wrapper
function LanguageRoute({ component: Component, path }: { component: React.ComponentType, path: string }) {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const pathParts = location.pathname.split('/');
    const supportedLangs = ['en', 'zh', 'pt', 'es', 'de', 'ru', 'ko', 'it', 'fr', 'ar', 'ja', 'hi'];
    if (pathParts[1] && supportedLangs.includes(pathParts[1])) {
      if (i18n.language !== pathParts[1]) {
        i18n.changeLanguage(pathParts[1]);
      }
    }
  }, [location.pathname]);

  return <Component />;
}

// 滚动到顶部组件
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const { t, i18n } = useTranslation();

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        <SEO
          title={i18n.language === 'en' ? "MedTech - Professional Medical Device Manufacturer | High-end Medical Equipment Supplier" : "MedTech - 专业医疗器械制造商 | 高端医疗设备供应商"}
          description={i18n.language === 'en' ? "MedTech is a professional medical device manufacturer providing high-quality diagnostic equipment, therapeutic equipment, surgical instruments and monitoring equipment. Products are certified with FDA, CE, ISO and serve more than 50 countries and regions worldwide." : "MedTech是一家专业的医疗器械制造商，提供高品质的诊断设备、治疗设备、手术器械和监护设备。产品通过FDA、CE、ISO等国际认证，服务全球50多个国家和地区。"}
          keywords={i18n.language === 'en' ? "medical devices,medical equipment,diagnostic equipment,surgical instruments,monitoring equipment,FDA,CE,ISO,medical instruments,manufacturer" : "医疗器械,医疗设备,诊断设备,手术器械,监护设备,FDA认证,CE认证,医疗仪器,医疗设备制造商"}
        />
        <Header />
        <main>
          <Routes>
            {/* Chinese (default) */}
            <Route path="/" element={<HomePage />} />
            <Route path="/zh" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/zh/products" element={<ProductsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/zh/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/zh/contact" element={<ContactPage />} />
            <Route path="/products/diagnostic" element={<ProductsPage />} />
            <Route path="/zh/products/diagnostic" element={<ProductsPage />} />
            <Route path="/products/therapeutic" element={<ProductsPage />} />
            <Route path="/zh/products/therapeutic" element={<ProductsPage />} />
            <Route path="/products/surgical" element={<ProductsPage />} />
            <Route path="/zh/products/surgical" element={<ProductsPage />} />
            <Route path="/products/monitoring" element={<ProductsPage />} />
            <Route path="/zh/products/monitoring" element={<ProductsPage />} />
            {/* Product Detail */}
            <Route path="/products/:id" element={<Suspense fallback={<LoadingFallback />}><ProductDetail /></Suspense>} />
            <Route path="/zh/products/:id" element={<Suspense fallback={<LoadingFallback />}><ProductDetail /></Suspense>} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/zh/solutions" element={<SolutionsPage />} />
            <Route path="/solutions/:id" element={<Suspense fallback={<LoadingFallback />}><SolutionDetail /></Suspense>} />
            <Route path="/zh/solutions/:id" element={<Suspense fallback={<LoadingFallback />}><SolutionDetail /></Suspense>} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/zh/history" element={<HistoryPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/zh/news" element={<NewsPage />} />
            <Route path="/news/:id" element={<Suspense fallback={<LoadingFallback />}><NewsDetail /></Suspense>} />
            <Route path="/zh/news/:id" element={<Suspense fallback={<LoadingFallback />}><NewsDetail /></Suspense>} />
            {/* English */}
            <Route path="/en" element={<HomePage />} />
            <Route path="/en/products" element={<ProductsPage />} />
            <Route path="/en/about" element={<AboutPage />} />
            <Route path="/en/contact" element={<ContactPage />} />
            <Route path="/en/products/diagnostic" element={<ProductsPage />} />
            <Route path="/en/products/therapeutic" element={<ProductsPage />} />
            <Route path="/en/products/surgical" element={<ProductsPage />} />
            <Route path="/en/products/monitoring" element={<ProductsPage />} />
            <Route path="/en/products/:id" element={<Suspense fallback={<LoadingFallback />}><ProductDetail /></Suspense>} />
            <Route path="/en/solutions" element={<SolutionsPage />} />
            <Route path="/en/solutions/:id" element={<Suspense fallback={<LoadingFallback />}><SolutionDetail /></Suspense>} />
            <Route path="/en/history" element={<HistoryPage />} />
            <Route path="/en/news" element={<NewsPage />} />
            <Route path="/en/news/:id" element={<Suspense fallback={<LoadingFallback />}><NewsDetail /></Suspense>} />
            {/* Admin - must be before /:lang routes to avoid being captured */}
            <Route path="/admin" element={<Suspense fallback={<LoadingFallback />}><AdminWrapper /></Suspense>} />
            <Route path="/admin/products" element={<Suspense fallback={<LoadingFallback />}><AdminWrapper /></Suspense>} />
            <Route path="/insert-solutions" element={<Suspense fallback={<LoadingFallback />}><InsertSolutions /></Suspense>} />
            <Route path="/insert-news" element={<Suspense fallback={<LoadingFallback />}><InsertNews /></Suspense>} />
            {/* Other languages - must be last */}
            <Route path="/:lang" element={<HomePage />} />
            <Route path="/:lang/products" element={<ProductsPage />} />
            <Route path="/:lang/products/:id" element={<Suspense fallback={<LoadingFallback />}><ProductDetail /></Suspense>} />
            <Route path="/:lang/about" element={<AboutPage />} />
            <Route path="/:lang/contact" element={<ContactPage />} />
            <Route path="/:lang/solutions" element={<SolutionsPage />} />
            <Route path="/:lang/solutions/:id" element={<Suspense fallback={<LoadingFallback />}><SolutionDetail /></Suspense>} />
            <Route path="/:lang/history" element={<HistoryPage />} />
            <Route path="/:lang/news" element={<NewsPage />} />
            <Route path="/:lang/news/:id" element={<Suspense fallback={<LoadingFallback />}><NewsDetail /></Suspense>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
