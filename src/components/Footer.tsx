import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Youtube, ArrowRight } from 'lucide-react';

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  const { t } = useTranslation();

  const footerLinks = {
    products: [
      { name: t('footer.productLinks.diagnostic'), href: '/products/diagnostic' },
      { name: t('footer.productLinks.therapeutic'), href: '/products/therapeutic' },
      { name: t('footer.productLinks.surgical'), href: '/products/surgical' },
      { name: t('footer.productLinks.monitoring'), href: '/products/monitoring' },
    ],
    company: [
      { name: t('footer.companyLinks.about'), href: '/about' },
      { name: t('footer.companyLinks.news'), href: '/news' },
      { name: t('footer.companyLinks.careers'), href: '/careers' },
      { name: t('footer.companyLinks.contact'), href: '/contact' },
    ],
    support: [
      { name: t('footer.supportLinks.technical'), href: '/support' },
      { name: t('footer.supportLinks.afterSales'), href: '/service' },
      { name: t('footer.supportLinks.downloads'), href: '/downloads' },
      { name: t('footer.supportLinks.faq'), href: '/faq' },
    ],
    legal: [
      { name: t('footer.legalLinks.privacy'), href: '/privacy' },
      { name: t('footer.legalLinks.terms'), href: '/terms' },
      { name: t('footer.legalLinks.sitemap'), href: '/sitemap' },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2">{t('footer.newsletter.title')}</h3>
              <p className="text-gray-400">{t('footer.newsletter.description')}</p>
            </div>
            <div className="flex w-full lg:w-auto">
              <input
                type="email"
                placeholder={t('footer.newsletter.placeholder')}
                className="flex-1 lg:w-72 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-xl focus:outline-none focus:border-primary"
              />
              <button className="px-6 py-3 bg-primary font-semibold rounded-r-xl hover:bg-primary-600 transition-colors flex items-center">
                {t('footer.newsletter.button')}
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <div>
                <span className="text-xl font-bold">世音内窥镜</span>
                <span className="text-xs text-primary block -mt-1">{t('header.trustedManufacturer')}</span>
              </div>
            </Link>
            <p className="text-gray-400 mb-6">
              {t('seo.description')}
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-gray-400">
                <Phone className="w-4 h-4 mr-3 text-primary" />
                <span>{t('footer.contactInfo.phone')}</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Mail className="w-4 h-4 mr-3 text-primary" />
                <span>{t('footer.contactInfo.email')}</span>
              </div>
              <div className="flex items-center text-gray-400">
                <MapPin className="w-4 h-4 mr-3 text-primary" />
                <span>{t('footer.contactInfo.address')}</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.products')}</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.company')}</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.support')}</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.legal')}</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              {t('footer.copyright')}
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
