
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="rounded-full px-3 py-1 border-white/20 bg-jawaker-charcoal hover:bg-jawaker-purple/20"
    >
      <Globe className="mr-2 h-4 w-4" />
      {language === 'ar' ? t.language.en : t.language.ar}
    </Button>
  );
};

export default LanguageSwitcher;
