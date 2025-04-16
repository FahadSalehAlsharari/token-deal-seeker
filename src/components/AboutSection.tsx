
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const AboutSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-jawaker-charcoal rounded-lg p-6 border border-white/10">
      <h2 className="text-xl font-bold text-white mb-4">{t.about.title}</h2>
      <div className="prose prose-invert prose-sm max-w-none">
        <p className="text-jawaker-gray">
          {t.about.paragraph1}
        </p>
        <p className="text-jawaker-gray mt-4">
          {t.about.paragraph2}
        </p>
        <p className="text-jawaker-gray mt-4">
          {t.about.paragraph3}
        </p>
      </div>
    </div>
  );
};

export default AboutSection;
