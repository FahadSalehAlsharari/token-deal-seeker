
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface TokenFilterProps {
  activeFilter: number | null;
  onFilterChange: (value: number | null) => void;
}

const TokenFilter: React.FC<TokenFilterProps> = ({ activeFilter, onFilterChange }) => {
  const { t } = useLanguage();
  
  const filterOptions = [
    { label: t.filters.all, value: null },
    { label: t.filters.tokens4000, value: 4000 },
    { label: t.filters.tokens10000, value: 10000 },
    { label: t.filters.tokens20000, value: 20000 },
    { label: t.filters.tokens50000, value: 50000 }
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {filterOptions.map((option) => (
        <Button
          key={option.label}
          variant={activeFilter === option.value ? "default" : "outline"}
          className={
            activeFilter === option.value 
              ? "bg-jawaker-purple hover:bg-jawaker-darkPurple text-white" 
              : "border-jawaker-gray/30 text-jawaker-gray hover:text-white"
          }
          onClick={() => onFilterChange(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};

export default TokenFilter;
