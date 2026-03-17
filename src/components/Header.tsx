import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  // Update language when URL changes
  useEffect(() => {
    const pathParts = location.pathname.split('/');
    const supportedLangs = ['en', 'zh', 'pt', 'es', 'de', 'ru', 'ko', 'it', 'fr', 'ar', 'ja', 'hi'];
    if (pathParts[1] && supportedLangs.includes(pathParts[1])) {
      if (i18n.language !== pathParts[1]) {
        i18n.changeLanguage(pathParts[1]);
      }
    } else if (!pathParts[1] || pathParts[1] === '') {
      if (i18n.language !== 'zh') {
        i18n.changeLanguage('zh');
      }
    }
  }, [location.pathname]);

  const getLocalizedHomePath = () => {
    const pathParts = location.pathname.split('/');
    const lang = pathParts[1];
    const supportedLangs = ['en', 'zh', 'pt', 'es', 'de', 'ru', 'ko', 'it', 'fr', 'ar', 'ja', 'hi'];
    if (supportedLangs.includes(lang)) {
      return `/${lang}`;
    }
    return '/';
  };

  const getNavPath = (path: string) => {
    const homePath = getLocalizedHomePath();
    if (homePath === '/') {
      return path;
    }
    return homePath + path;
  };

  const navigation = [
    { name: t('common.home'), href: '/', children: [] },
    {
      name: t('common.products'),
      href: getNavPath('/products'),
      children: [
        { name: t('header.diagnostic'), href: getNavPath('/products/diagnostic') },
        { name: t('header.therapeutic'), href: getNavPath('/products/therapeutic') },
        { name: t('header.surgical'), href: getNavPath('/products/surgical') },
        { name: t('header.monitoring'), href: getNavPath('/products/monitoring') },
      ]
    },
    { name: t('common.solutions'), href: getNavPath('/solutions'), children: [] },
    { name: t('common.about'), href: getNavPath('/about'), children: [] },
    { name: t('common.news'), href: getNavPath('/news'), children: [] },
    { name: t('common.contact'), href: getNavPath('/contact'), children: [] },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-100">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to={getLocalizedHomePath()} className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:glow-red transition-all duration-300">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900">{i18n.language === 'en' ? 'Shiyin Endoscopy' : '世音内窥镜'}</span>
              <span className="text-xs text-primary block -mt-1">{t('header.trustedManufacturer')}</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  to={item.href}
                  className="flex items-center px-4 py-2 text-gray-700 hover:text-primary font-medium transition-colors duration-200"
                  onMouseEnter={() => item.children.length > 0 && setActiveDropdown(item.name)}
                >
                  {item.name}
                  {item.children.length > 0 && (
                    <ChevronDown className="ml-1 w-4 h-4" />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.children.length > 0 && (
                  <div
                    className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0"
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <div className="py-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          to={child.href}
                          className="block px-4 py-2 text-gray-700 hover:text-primary hover:bg-primary-50 transition-colors duration-150"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Button, Language Switcher & Mobile Menu Toggle */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="tel:+86-13072150777"
              className="flex items-center text-gray-700 hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">{t('header.hotline')}</span>
            </a>
            <LanguageSwitcher />
            <Link
              to="/contact"
              className="px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-600 glow-red-hover transition-all duration-300"
            >
              {t('header.consultNow')}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4">
            <div className="space-y-2">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.href}
                    className="block px-4 py-3 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.children.length > 0 && (
                    <div className="ml-4 mt-2 space-y-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          to={child.href}
                          className="block px-4 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="px-4 py-2">
                <LanguageSwitcher />
              </div>
              <Link
                to="/contact"
                className="block mx-4 mt-4 px-6 py-3 bg-primary text-white text-center font-medium rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('header.consultNow')}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
