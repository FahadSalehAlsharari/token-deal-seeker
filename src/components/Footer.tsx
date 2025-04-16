
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="mt-16 py-6 bg-jawaker-charcoal border-t border-white/10">
      <div className="container max-w-6xl mx-auto px-4 text-center text-jawaker-gray text-sm">
        <p>{t.footer.copyright}</p>
        <p className="mt-2">{t.footer.disclaimer}</p>
        
        {/* Export Instructions */}
        <div className="mt-6 p-4 bg-jawaker-darkBg rounded-lg border border-white/10 max-w-xl mx-auto">
          <h3 className="text-white font-bold mb-2">{t.footer.exportTitle}</h3>
          <p className="text-jawaker-gray text-sm">{t.footer.exportInstructions}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
