
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import SearchBar from '@/components/SearchBar';
import TokenFilter from '@/components/TokenFilter';

interface HeroProps {
  onSearch: (query: string) => void;
  tokenFilter: number | null;
  onTokenFilterChange: (value: number | null) => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch, tokenFilter, onTokenFilterChange }) => {
  const { t, dir } = useLanguage();
  
  return (
    <header className="bg-gradient-to-r from-jawaker-charcoal to-jawaker-darkBg pt-16 pb-8 px-4">
      <div className="container max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
          {t.header.title}
        </h1>
        <p className="text-jawaker-gray text-center max-w-3xl mx-auto mb-8">
          {t.header.subtitle}
        </p>
        
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar onSearch={onSearch} />
        </div>
        
        {/* Token Filters */}
        <div className="mb-4">
          <TokenFilter 
            activeFilter={tokenFilter} 
            onFilterChange={onTokenFilterChange} 
          />
        </div>
      </div>
    </header>
  );
};

export default Hero;
