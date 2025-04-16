
import React, { useEffect, useState } from 'react';
import { ArrowDownUp, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Skeleton } from '@/components/ui/skeleton';

import SearchBar from '@/components/SearchBar';
import TokenFilter from '@/components/TokenFilter';
import TokenOfferCard from '@/components/TokenOfferCard';
import PriceHistoryChart from '@/components/PriceHistoryChart';
import { HistoricalPrice, TokenOffer } from '@/data/jawaker-tokens';
import { 
  getAllTokenOffers, 
  getHistoricalPrices, 
  getLowestPrice,
  searchTokenOffers,
  filterByTokenValue 
} from '@/services/tokenService';

const Index = () => {
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
    <div className="min-h-screen bg-jawaker-darkBg pb-16">
      {/* Hero Header */}
      <header className="bg-gradient-to-r from-jawaker-charcoal to-jawaker-darkBg pt-16 pb-8 px-4">
        <div className="container max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            Buy Jawaker Token Gift Card - Compare Prices
          </h1>
          <p className="text-jawaker-gray text-center max-w-3xl mx-auto mb-8">
            Find the best prices for Jawaker Token Gift Cards from trusted stores. 
            Compare offers, check historical prices, and get the best deal for your Jawaker tokens.
          </p>
          
          {/* Search Bar */}
          <div className="mb-8">
            <SearchBar onSearch={handleSearch} />
          </div>
          
          {/* Token Filters */}
          <div className="mb-4">
            <TokenFilter 
              activeFilter={tokenFilter} 
              onFilterChange={handleTokenFilter} 
            />
          </div>
        </div>
      </header>
      
      <main className="container max-w-6xl mx-auto px-4">
        {/* Price Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Lowest Price Card */}
          <Card className="bg-jawaker-charcoal border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Lowest Historical Price
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info size={16} className="text-jawaker-gray" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>The lowest recorded price for Jawaker tokens</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardTitle>
              <CardDescription className="text-jawaker-gray">
                The best price we've seen so far
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading || !lowestPrice ? (
                <Skeleton className="h-12 w-24 bg-jawaker-gray/20" />
              ) : (
                <div>
                  <div className="text-3xl font-bold text-gradient">
                    {lowestPrice.currency}{lowestPrice.value.toFixed(2)}
                  </div>
                  <div className="text-sm text-jawaker-gray">
                    Recorded on {new Date(lowestPrice.date).toLocaleDateString()}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Price Chart Card */}
          <Card className="bg-jawaker-charcoal border-white/10">
            <CardContent className="p-0">
              {loading || historicalPrices.length === 0 ? (
                <div className="h-64 flex items-center justify-center">
                  <Skeleton className="h-48 w-full bg-jawaker-gray/20" />
                </div>
              ) : (
                <PriceHistoryChart data={historicalPrices} />
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Token Offers Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">
              Jawaker Token Offers
            </h2>
            <Button 
              variant="outline" 
              className="border-jawaker-gray/30 text-jawaker-gray hover:text-white"
              onClick={handleSort}
            >
              <ArrowDownUp className="mr-2 h-4 w-4" />
              Sort by Price {sortDirection === 'asc' ? '(Low to High)' : '(High to Low)'}
            </Button>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-jawaker-charcoal rounded-lg h-64">
                  <Skeleton className="h-full w-full bg-jawaker-gray/20" />
                </div>
              ))}
            </div>
          ) : filteredOffers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-jawaker-gray text-lg">
                No token offers found matching your criteria.
              </p>
              <Button 
                variant="outline" 
                className="mt-4 border-jawaker-purple text-jawaker-purple hover:bg-jawaker-purple hover:text-white"
                onClick={() => handleTokenFilter(null)}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredOffers.map((offer) => (
                <TokenOfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          )}
        </div>
        
        {/* Additional Info Section */}
        <div className="bg-jawaker-charcoal rounded-lg p-6 border border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">About Jawaker Token Gift Cards</h2>
          <div className="prose prose-invert prose-sm max-w-none">
            <p className="text-jawaker-gray">
              Jawaker Tokens are the in-game currency used in Jawaker, the popular Middle Eastern card game platform. 
              With these tokens, players can participate in various card games, enter tournaments, and unlock special features.
            </p>
            <p className="text-jawaker-gray mt-4">
              Purchasing a Jawaker Token Gift Card allows you to add tokens to your Jawaker account balance. 
              Different gift cards offer various token amounts, allowing you to choose the option that best suits your gaming needs.
            </p>
            <p className="text-jawaker-gray mt-4">
              Our price comparison tool helps you find the best deals from trusted online retailers, 
              ensuring you get the most value for your money when purchasing Jawaker Tokens.
            </p>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="mt-16 py-6 bg-jawaker-charcoal border-t border-white/10">
        <div className="container max-w-6xl mx-auto px-4 text-center text-jawaker-gray text-sm">
          <p>© 2025 Jawaker Token Deal Seeker. All prices are updated regularly.</p>
          <p className="mt-2">This is a demonstration price comparison website and is not affiliated with Jawaker.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
