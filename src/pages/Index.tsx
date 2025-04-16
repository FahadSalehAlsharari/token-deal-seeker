
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Hero from '@/components/Hero';
import PriceInfoCards from '@/components/PriceInfoCards';
import TokenOffersSection from '@/components/TokenOffersSection';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import { HistoricalPrice, TokenOffer } from '@/data/jawaker-tokens';
import { 
  getAllTokenOffers, 
  getHistoricalPrices, 
  getLowestPrice,
  searchTokenOffers,
  filterByTokenValue 
} from '@/services/tokenService';

const Index = () => {
  const { dir } = useLanguage();
  const [offers, setOffers] = useState<TokenOffer[]>([]);
  const [filteredOffers, setFilteredOffers] = useState<TokenOffer[]>([]);
  const [historicalPrices, setHistoricalPrices] = useState<HistoricalPrice[]>([]);
  const [lowestPrice, setLowestPrice] = useState<{ value: number; currency: string; date: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [tokenFilter, setTokenFilter] = useState<number | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Load initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [offersData, historyData, lowestPriceData] = await Promise.all([
          getAllTokenOffers(),
          getHistoricalPrices(),
          getLowestPrice()
        ]);
        
        setOffers(offersData);
        setFilteredOffers(offersData);
        setHistoricalPrices(historyData as HistoricalPrice[]);
        setLowestPrice(lowestPriceData as { value: number; currency: string; date: string });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Handle search
  const handleSearch = async (query: string) => {
    if (query.trim() === '') {
      // If search is cleared, apply only the current filter
      handleTokenFilter(tokenFilter);
      return;
    }
    
    setLoading(true);
    try {
      const results = await searchTokenOffers(query);
      setFilteredOffers(
        tokenFilter 
          ? results.filter(offer => offer.tokenValue >= tokenFilter)
          : results
      );
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle token filtering
  const handleTokenFilter = async (value: number | null) => {
    setTokenFilter(value);
    setLoading(true);
    
    try {
      const filtered = await filterByTokenValue(value);
      setFilteredOffers(filtered);
    } catch (error) {
      console.error('Error filtering tokens:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle sorting
  const handleSort = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newDirection);
    
    const sorted = [...filteredOffers].sort((a, b) => {
      return newDirection === 'asc' 
        ? a.price.value - b.price.value 
        : b.price.value - a.price.value;
    });
    
    setFilteredOffers(sorted);
  };

  return (
    <div className={`min-h-screen bg-jawaker-darkBg pb-16 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
      {/* Header with Language Switcher */}
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher />
      </div>
      
      {/* Hero Header */}
      <Hero 
        onSearch={handleSearch}
        tokenFilter={tokenFilter}
        onTokenFilterChange={handleTokenFilter}
      />
      
      <main className="container max-w-6xl mx-auto px-4">
        {/* Price Information Cards */}
        <PriceInfoCards 
          loading={loading}
          lowestPrice={lowestPrice}
          historicalPrices={historicalPrices}
        />
        
        {/* Token Offers Section */}
        <TokenOffersSection 
          loading={loading}
          filteredOffers={filteredOffers}
          sortDirection={sortDirection}
          onSort={handleSort}
          onClearFilter={() => handleTokenFilter(null)}
        />
        
        {/* Additional Info Section */}
        <AboutSection />
      </main>
      
      {/* Footer with Export Instructions */}
      <Footer />
    </div>
  );
};

export default Index;
