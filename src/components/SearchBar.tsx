
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const { t, dir } = useLanguage();
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="relative flex items-center">
        <Input
          type="text"
          placeholder={t.search.placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`${dir === 'rtl' ? 'pl-12' : 'pr-12'} bg-jawaker-charcoal border-jawaker-gray/50 focus-visible:ring-jawaker-purple`}
          dir={dir}
        />
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className={`absolute ${dir === 'rtl' ? 'left-0' : 'right-0'} text-jawaker-gray hover:text-jawaker-purple`}
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
