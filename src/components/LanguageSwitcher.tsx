import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const languages = [
  { code: 'zh', name: '中文', flag: 'CN' },
  { code: 'en', name: 'English', flag: 'EN' },
  { code: 'pt', name: 'Português', flag: 'BR' },
  { code: 'es', name: 'Español', flag: 'ES' },
  { code: 'de', name: 'Deutsch', flag: 'DE' },
  { code: 'ru', name: 'Русский', flag: 'RU' },
  { code: 'ko', name: '한국어', flag: 'KR' },
  { code: 'it', name: 'Italiano', flag: 'IT' },
  { code: 'fr', name: 'Français', flag: 'FR' },
  { code: 'ar', name: 'العربية', flag: 'SA' },
  { code: 'ja', name: '日本語', flag: 'JP' },
  { code: 'hi', name: 'हिन्दी', flag: 'IN' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (langCode: string) => {
    const currentPath = location.pathname;
    const pathParts = currentPath.split('/');
    const supportedLangs = ['en', 'zh', 'pt', 'es', 'de', 'ru', 'ko', 'it', 'fr', 'ar', 'ja', 'hi'];

    // Check if first path segment is a language code
    if (supportedLangs.includes(pathParts[1])) {
      pathParts[1] = langCode;
    } else {
      // Add language code at the beginning
      pathParts.splice(1, 0, langCode);
    }

    const newPath = pathParts.join('/') || '/';
    navigate(newPath);
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-3 py-2 text-gray-700 hover:text-primary font-medium transition-colors duration-200 rounded-lg hover:bg-gray-50"
        aria-label="Select language"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{currentLanguage.name}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50 animate-fade-in max-h-80 overflow-y-auto">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full px-4 py-2 text-left text-sm flex items-center justify-between hover:bg-gray-50 transition-colors ${
                currentLanguage.code === lang.code ? 'text-primary font-medium' : 'text-gray-700'
              }`}
            >
              <span>{lang.name}</span>
              <span className="text-xs text-gray-400">{lang.flag}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
