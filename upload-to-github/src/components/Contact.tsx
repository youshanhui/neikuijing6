import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';

export default function Contact() {
  const { t } = useTranslation();

  const contactInfo = [
    {
      icon: Phone,
      title: t('contact.info.hotline.title'),
      content: t('contact.info.hotline.content'),
      description: t('contact.info.hotline.description'),
    },
    {
      icon: Mail,
      title: t('contact.info.email.title'),
      content: t('contact.info.email.content'),
      description: t('contact.info.email.description'),
    },
    {
      icon: MapPin,
      title: t('contact.info.address.title'),
      content: t('contact.info.address.content'),
      description: t('contact.info.address.description'),
    },
    {
      icon: Clock,
      title: t('contact.info.service.title'),
      content: t('contact.info.service.content'),
      description: t('contact.info.service.description'),
    },
  ];

  return (
    <section className="py-20 bg-white" id="contact">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary-50 rounded-full mb-4">
            <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
            <span className="text-primary text-sm font-medium">{t('contact.title')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t('contact.subtitle')}
          </h2>
          <p className="text-lg text-gray-600">
            {t('contact.description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">{t('contact.form.title')}</h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.name')}
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder={t('contact.form.namePlaceholder')}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.phone')}
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder={t('contact.form.phonePlaceholder')}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.form.email')}
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder={t('contact.form.emailPlaceholder')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.form.industry')}
                </label>
                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all">
                  <option value="">{t('contact.form.industryPlaceholder')}</option>
                  <option value="hospital">{t('contact.form.industries.hospital')}</option>
                  <option value="clinic">{t('contact.form.industries.clinic')}</option>
                  <option value="distributor">{t('contact.form.industries.distributor')}</option>
                  <option value="other">{t('contact.form.industries.other')}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.form.message')}
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                  placeholder={t('contact.form.messagePlaceholder')}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary-600 glow-red-hover transition-all duration-300 flex items-center justify-center"
              >
                <Send className="w-5 h-5 mr-2" />
                {t('contact.form.submit')}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            {/* Info Cards */}
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
                    <info.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{info.title}</h4>
                  <p className="text-primary font-medium mb-1">{info.content}</p>
                  <p className="text-sm text-gray-500">{info.description}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-primary to-primary-600 rounded-2xl p-8 text-white">
              <div className="flex items-start mb-4">
                <MessageCircle className="w-8 h-8 mr-3" />
                <div>
                  <h4 className="text-xl font-bold mb-2">{t('contact.cta.title')}</h4>
                  <p className="text-white/80">
                    {t('contact.cta.description')}
                  </p>
                </div>
              </div>
              <button className="w-full py-3 bg-white text-primary font-semibold rounded-xl hover:bg-gray-100 transition-colors">
                {t('contact.cta.button')}
              </button>
            </div>

            {/* Map Placeholder */}
            <div className="mt-8 bg-gray-100 rounded-2xl h-48 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">{t('contact.mapLoading')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
