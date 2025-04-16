
import React from 'react';
import { Info } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import PriceHistoryChart from '@/components/PriceHistoryChart';
import { HistoricalPrice } from '@/data/jawaker-tokens';

interface PriceInfoCardsProps {
  loading: boolean;
  lowestPrice: { value: number; currency: string; date: string } | null;
  historicalPrices: HistoricalPrice[];
}

const PriceInfoCards: React.FC<PriceInfoCardsProps> = ({ 
  loading, 
  lowestPrice, 
  historicalPrices 
}) => {
  const { t, dir } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Lowest Price Card */}
      <Card className="bg-jawaker-charcoal border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {t.cards.lowestPrice}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info size={16} className="text-jawaker-gray" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t.cards.lowestPriceTooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardTitle>
          <CardDescription className="text-jawaker-gray">
            {t.cards.bestPriceSeen}
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
                {t.cards.recordedOn} {new Date(lowestPrice.date).toLocaleDateString(dir === 'rtl' ? 'ar-SA' : 'en-US')}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Price Chart Card */}
      <Card className="bg-jawaker-charcoal border-white/10">
        <CardHeader>
          <CardTitle>{t.cards.priceHistory}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading || historicalPrices.length === 0 ? (
            <div className="h-48 flex items-center justify-center">
              <Skeleton className="h-48 w-full bg-jawaker-gray/20" />
            </div>
          ) : (
            <PriceHistoryChart data={historicalPrices} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PriceInfoCards;
