
import React from 'react';
import { Button } from '@/components/ui/button';

interface TokenFilterProps {
  activeFilter: number | null;
  onFilterChange: (value: number | null) => void;
}

const TokenFilter: React.FC<TokenFilterProps> = ({ activeFilter, onFilterChange }) => {
  const filterOptions = [
    { label: 'All Tokens', value: null },
    { label: '4000+ Tokens', value: 4000 },
    { label: '10000+ Tokens', value: 10000 },
    { label: '20000+ Tokens', value: 20000 },
    { label: '50000+ Tokens', value: 50000 }
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
