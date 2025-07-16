import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Language {
  code: string;
  name: string;
  flag: string;
  currency: string;
  currencySymbol: string;
}

export const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸', currency: 'USD', currencySymbol: '$' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸', currency: 'EUR', currencySymbol: '€' },
  { code: 'de', name:'German', flag: '🇩🇪', currency: 'EUR', currencySymbol: '€' },
  { code: 'fr', name: 'French', flag: '🇫🇷', currency: 'EUR', currencySymbol: '€' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦', currency: 'SAR', currencySymbol: 'ر.س' },
  { code: 'zh', name: 'Mandarin', flag: '🇨🇳', currency: 'CNY', currencySymbol: '¥' },
];

interface TranslationContextType {
  currentLanguage: Language;
  setCurrentLanguage: (language: Language) => void;
  t: (key: string) => string;
  formatPrice: (price: number) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

// Move translations to a separate constant to avoid any potential circular reference issues
const translations: Record<string, Record<string, string>> = {
  en: {
    // Navigation
    'nav.destinations': 'DESTINATIONS',
    'nav.attractions': 'ATTRACTIONS',
    'nav.experiences': 'EXPERIENCES',
    'nav.about': 'ABOUT',
    'nav.blog': 'BLOG',
    'nav.contact': 'CONTACT',
    
    // Search
    'search.placeholder': 'Search destinations...',
    'search.mobile.placeholder': 'Search destinations...',
    
    // Hero Section
    'hero.title': 'Discover the Magic of Nepal',
    'hero.subtitle': 'From the towering peaks of the Himalayas to ancient temples and vibrant culture',
    'hero.cta': 'Start Your Journey',
    
    // Popular Destinations
    'destinations.title': 'Popular Destinations',
    'destinations.subtitle': 'Discover the most breathtaking locations Nepal has to offer, from towering peaks to ancient temples',
    'destinations.everest': 'Everest Base Camp',
    'destinations.everest.desc': 'Trek to the base of the world\'s highest mountain',
    'destinations.annapurna': 'Annapurna Circuit',
    'destinations.annapurna.desc': 'Experience diverse landscapes and cultures',
    'destinations.pokhara': 'Pokhara Valley',
    'destinations.pokhara.desc': 'Serene lakes beneath towering peaks',
    'destinations.kathmandu': 'Kathmandu Valley',
    'destinations.kathmandu.desc': 'Ancient temples and rich cultural heritage',
    'destinations.chitwan': 'Chitwan National Park',
    'destinations.chitwan.desc': 'Wildlife safari in the Terai lowlands',
    'destinations.langtang': 'Langtang Valley',
    'destinations.langtang.desc': 'The valley of glaciers and yaks',
    'destinations.viewMore': 'View More',
    
    // Blog
    'blog.title': 'Travel Stories & Insights',
    'blog.subtitle': 'Get inspired by stories, tips, and insights from fellow travelers and local experts',
    'blog.readMore': 'Read More',
    'blog.viewAll': 'View All Articles',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
  },
  es: {
    // Navigation
    'nav.destinations': 'DESTINOS',
    'nav.attractions': 'ATRACCIONES',
    'nav.experiences': 'EXPERIENCIAS',
    'nav.about': 'ACERCA DE',
    'nav.blog': 'BLOG',
    'nav.contact': 'CONTACTO',
    
    // Search
    'search.placeholder': 'Buscar destinos...',
    'search.mobile.placeholder': 'Buscar destinos...',
    
    // Hero Section
    'hero.title': 'Descubre la Magia de Nepal',
    'hero.subtitle': 'Desde las altas cumbres del Himalaya hasta templos antiguos y cultura vibrante',
    'hero.cta': 'Comienza tu Viaje',
    
    // Popular Destinations
    'destinations.title': 'Destinos Populares',
    'destinations.subtitle': 'Descubre los lugares más impresionantes que Nepal tiene para ofrecer',
    'destinations.everest': 'Campo Base del Everest',
    'destinations.everest.desc': 'Camina hasta la base de la montaña más alta del mundo',
    'destinations.annapurna': 'Circuito Annapurna',
    'destinations.annapurna.desc': 'Experimenta paisajes diversos y culturas',
    'destinations.pokhara': 'Valle de Pokhara',
    'destinations.pokhara.desc': 'Lagos serenos bajo picos imponentes',
    'destinations.kathmandu': 'Valle de Katmandú',
    'destinations.kathmandu.desc': 'Templos antiguos y rica herencia cultural',
    'destinations.chitwan': 'Parque Nacional Chitwan',
    'destinations.chitwan.desc': 'Safari de vida silvestre en las tierras bajas de Terai',
    'destinations.langtang': 'Valle Langtang',
    'destinations.langtang.desc': 'El valle de glaciares y yaks',
    'destinations.viewMore': 'Ver Más',
    
    // Blog
    'blog.title': 'Historias de Viaje e Insights',
    'blog.subtitle': 'Inspírate con historias, consejos e insights de compañeros viajeros y expertos locales',
    'blog.readMore': 'Leer Más',
    'blog.viewAll': 'Ver Todos los Artículos',
    
    // Common
    'common.loading': 'Cargando...',
    'common.error': 'Error',
    'common.back': 'Atrás',
    'common.next': 'Siguiente',
    'common.previous': 'Anterior',
  },
  de: {
    // Navigation
    'nav.destinations': 'REISEZIELE',
    'nav.attractions': 'ATTRAKTIONEN',
    'nav.experiences': 'ERFAHRUNGEN',
    'nav.about': 'ÜBER UNS',
    'nav.blog': 'BLOG',
    'nav.contact': 'KONTAKT',
    
    // Search
    'search.placeholder': 'Reiseziele suchen...',
    'search.mobile.placeholder': 'Reiseziele suchen...',
    
    // Hero Section
    'hero.title': 'Entdecke die Magie Nepals',
    'hero.subtitle': 'Von den hohen Gipfeln des Himalaya bis zu alten Tempeln und lebendiger Kultur',
    'hero.cta': 'Starte Deine Reise',
    
    // Popular Destinations
    'destinations.title': 'Beliebte Reiseziele',
    'destinations.subtitle': 'Entdecke die atemberaubendsten Orte, die Nepal zu bieten hat',
    'destinations.everest': 'Everest Basislager',
    'destinations.everest.desc': 'Wandere zum Fuß des höchsten Berges der Welt',
    'destinations.annapurna': 'Annapurna Circuit',
    'destinations.annapurna.desc': 'Erlebe vielfältige Landschaften und Kulturen',
    'destinations.pokhara': 'Pokhara Tal',
    'destinations.pokhara.desc': 'Ruhige Seen unter hohen Gipfeln',
    'destinations.kathmandu': 'Kathmandu Tal',
    'destinations.kathmandu.desc': 'Alte Tempel und reiches kulturelles Erbe',
    'destinations.chitwan': 'Chitwan Nationalpark',
    'destinations.chitwan.desc': 'Wildlife-Safari im Terai Tiefland',
    'destinations.langtang': 'Langtang Tal',
    'destinations.langtang.desc': 'Das Tal der Gletscher und Yaks',
    'destinations.viewMore': 'Mehr Sehen',
    
    // Blog
    'blog.title': 'Reisegeschichten & Einblicke',
    'blog.subtitle': 'Lass dich von Geschichten, Tipps und Einblicken von Mitreisenden und lokalen Experten inspirieren',
    'blog.readMore': 'Mehr Lesen',
    'blog.viewAll': 'Alle Artikel Ansehen',
    
    // Common
    'common.loading': 'Laden...',
    'common.error': 'Fehler',
    'common.back': 'Zurück',
    'common.next': 'Weiter',
    'common.previous': 'Vorherige',
  },
  fr: {
    // Navigation
    'nav.destinations': 'DESTINATIONS',
    'nav.attractions': 'ATTRACTIONS',
    'nav.experiences': 'EXPÉRIENCES',
    'nav.about': 'À PROPOS',
    'nav.blog': 'BLOG',
    'nav.contact': 'CONTACT',
    
    // Search
    'search.placeholder': 'Rechercher destinations...',
    'search.mobile.placeholder': 'Rechercher destinations...',
    
    // Hero Section
    'hero.title': 'Découvrez la Magie du Népal',
    'hero.subtitle': 'Des hauts sommets de l\'Himalaya aux temples anciens et à la culture vibrante',
    'hero.cta': 'Commencez Votre Voyage',
    
    // Popular Destinations
    'destinations.title': 'Destinations Populaires',
    'destinations.subtitle': 'Découvrez les lieux les plus époustouflants que le Népal a à offrir',
    'destinations.everest': 'Camp de Base de l\'Everest',
    'destinations.everest.desc': 'Trekking jusqu\'à la base de la plus haute montagne du monde',
    'destinations.annapurna': 'Circuit des Annapurnas',
    'destinations.annapurna.desc': 'Découvrez des paysages et cultures diversifiés',
    'destinations.pokhara': 'Vallée de Pokhara',
    'destinations.pokhara.desc': 'Lacs sereins sous des pics imposants',
    'destinations.kathmandu': 'Vallée de Katmandou',
    'destinations.kathmandu.desc': 'Temples anciens et riche patrimoine culturel',
    'destinations.chitwan': 'Parc National de Chitwan',
    'destinations.chitwan.desc': 'Safari dans les basses terres du Terai',
    'destinations.langtang': 'Vallée de Langtang',
    'destinations.langtang.desc': 'La vallée des glaciers et des yaks',
    'destinations.viewMore': 'Voir Plus',
    
    // Blog
    'blog.title': 'Histoires de Voyage & Perspectives',
    'blog.subtitle': 'Inspirez-vous d\'histoires, conseils et perspectives de voyageurs et experts locaux',
    'blog.readMore': 'Lire Plus',
    'blog.viewAll': 'Voir Tous les Articles',
    
    // Common
    'common.loading': 'Chargement...',
    'common.error': 'Erreur',
    'common.back': 'Retour',
    'common.next': 'Suivant',
    'common.previous': 'Précédent',
  },
  ar: {
    // Navigation
    'nav.destinations': 'الوجهات',
    'nav.attractions': 'المعالم',
    'nav.experiences': 'التجارب',
    'nav.about': 'حولنا',
    'nav.blog': 'المدونة',
    'nav.contact': 'اتصل بنا',
    
    // Search
    'search.placeholder': 'البحث عن الوجهات...',
    'search.mobile.placeholder': 'البحث عن الوجهات...',
    
    // Hero Section
    'hero.title': 'اكتشف سحر نيبال',
    'hero.subtitle': 'من قمم الهيمالايا الشاهقة إلى المعابد القديمة والثقافة النابضة بالحياة',
    'hero.cta': 'ابدأ رحلتك',
    
    // Popular Destinations
    'destinations.title': 'الوجهات الشعبية',
    'destinations.subtitle': 'اكتشف أكثر الأماكن إثارة التي تقدمها نيبال',
    'destinations.everest': 'معسكر قاعدة إيفرست',
    'destinations.everest.desc': 'المشي إلى قاعدة أعلى جبل في العالم',
    'destinations.annapurna': 'دائرة أنابورنا',
    'destinations.annapurna.desc': 'اختبر المناظر الطبيعية والثقافات المتنوعة',
    'destinations.pokhara': 'وادي بوخارا',
    'destinations.pokhara.desc': 'بحيرات هادئة تحت قمم شاهقة',
    'destinations.kathmandu': 'وادي كاتماندو',
    'destinations.kathmandu.desc': 'معابد قديمة وتراث ثقافي غني',
    'destinations.chitwan': 'متنزه شيتوان الوطني',
    'destinations.chitwan.desc': 'سفاري الحياة البرية في أراضي تيراي المنخفضة',
    'destinations.langtang': 'وادي لانغتانغ',
    'destinations.langtang.desc': 'وادي الأنهار الجليدية والياك',
    'destinations.viewMore': 'عرض المزيد',
    
    // Blog
    'blog.title': 'قصص السفر والرؤى',
    'blog.subtitle': 'استلهم من القصص والنصائح والرؤى من المسافرين والخبراء المحليين',
    'blog.readMore': 'اقرأ المزيد',
    'blog.viewAll': 'عرض جميع المقالات',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'خطأ',
    'common.back': 'العودة',
    'common.next': 'التالي',
    'common.previous': 'السابق',
  },
  zh: {
    // Navigation
    'nav.destinations': '目的地',
    'nav.attractions': '景点',
    'nav.experiences': '体验',
    'nav.about': '关于我们',
    'nav.blog': '博客',
    'nav.contact': '联系我们',
    
    // Search
    'search.placeholder': '搜索目的地...',
    'search.mobile.placeholder': '搜索目的地...',
    
    // Hero Section
    'hero.title': '发现尼泊尔的魅力',
    'hero.subtitle': '从喜马拉雅山的高峰到古老的寺庙和充满活力的文化',
    'hero.cta': '开始您的旅程',
    
    // Popular Destinations
    'destinations.title': '热门目的地',
    'destinations.subtitle': '发现尼泊尔最令人叹为观止的地方',
    'destinations.everest': '珠峰大本营',
    'destinations.everest.desc': '徒步到世界最高山峰的大本营',
    'destinations.annapurna': '安纳普尔纳环线',
    'destinations.annapurna.desc': '体验多样的景观和文化',
    'destinations.pokhara': '博卡拉谷',
    'destinations.pokhara.desc': '高峰下的宁静湖泊',
    'destinations.kathmandu': '加德满都谷地',
    'destinations.kathmandu.desc': '古老的寺庙和丰富的文化遗产',
    'destinations.chitwan': '奇特旺国家公园',
    'destinations.chitwan.desc': '在特莱低地进行野生动物观光',
    'destinations.langtang': '朗塘谷',
    'destinations.langtang.desc': '冰川和牦牛的山谷',
    'destinations.viewMore': '查看更多',
    
    // Blog
    'blog.title': '旅行故事与见解',
    'blog.subtitle': '从旅行者和当地专家的故事、技巧和见解中获得灵感',
    'blog.readMore': '阅读更多',
    'blog.viewAll': '查看所有文章',
    
    // Common
    'common.loading': '加载中...',
    'common.error': '错误',
    'common.back': '返回',
    'common.next': '下一个',
    'common.previous': '上一个',
  },
};

export const TranslationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  console.log('TranslationProvider: Rendering with React:', !!React, 'useState:', !!useState);
  
  // Initialize state with explicit React.useState to ensure proper context
  const [currentLanguage, setCurrentLanguage] = React.useState<Language>(languages[0]);

  const t = React.useCallback((key: string): string => {
    const translation = translations[currentLanguage.code]?.[key];
    return translation || key;
  }, [currentLanguage.code]);

  const formatPrice = React.useCallback((price: number): string => {
    // Simple conversion rates (in a real app, you'd fetch these from an API)
    const conversionRates: Record<string, number> = {
      USD: 1,
      EUR: 0.85,
      SAR: 3.75,
      CNY: 7.2,
    };

    const convertedPrice = price * (conversionRates[currentLanguage.currency] || 1);
    return `${currentLanguage.currencySymbol}${convertedPrice.toFixed(0)}`;
  }, [currentLanguage.currency, currentLanguage.currencySymbol]);

  const contextValue = React.useMemo(() => ({
    currentLanguage,
    setCurrentLanguage,
    t,
    formatPrice
  }), [currentLanguage, setCurrentLanguage, t, formatPrice]);

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
