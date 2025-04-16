
import React from 'react';
import { ArrowDownUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import TokenOfferCard from '@/components/TokenOfferCard';
import { TokenOffer } from '@/data/jawaker-tokens';

interface TokenOffersSectionProps {
  loading: boolean;
  filteredOffers: TokenOffer[];
  sortDirection: 'asc' | 'desc';
  onSort: () => void;
  onClearFilter: () => void;
}

const TokenOffersSection: React.FC<TokenOffersSectionProps> = ({
  loading,
  filteredOffers,
  sortDirection,
  onSort,
  onClearFilter
}) => {
  const { t, dir } = useLanguage();

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">
          {t.offers.title}
        </h2>
        <Button 
          variant="outline" 
          className="border-jawaker-gray/30 text-jawaker-gray hover:text-white"
          onClick={onSort}
        >
          <ArrowDownUp className={`${dir === 'rtl' ? 'ml-2' : 'mr-2'} h-4 w-4`} />
          {t.offers.sortByPrice} {sortDirection === 'asc' ? t.offers.lowToHigh : t.offers.highToLow}
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
            {t.offers.noOffersFound}
          </p>
          <Button 
            variant="outline" 
            className="mt-4 border-jawaker-purple text-jawaker-purple hover:bg-jawaker-purple hover:text-white"
            onClick={onClearFilter}
          >
            {t.offers.clearFilters}
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
  );
};

export default TokenOffersSection;
