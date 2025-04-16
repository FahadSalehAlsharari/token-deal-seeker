
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { TokenOffer } from '@/data/jawaker-tokens';
import { Button } from '@/components/ui/button';

interface TokenOfferCardProps {
  offer: TokenOffer;
}

const TokenOfferCard: React.FC<TokenOfferCardProps> = ({ offer }) => {
  return (
    <div className="flex flex-col bg-jawaker-charcoal rounded-lg overflow-hidden border border-white/10 hover:border-jawaker-purple/50 transition-all duration-300">
      <div className="p-4 flex flex-col h-full">
        {/* Store and Region */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-black/50 rounded flex items-center justify-center overflow-hidden mr-3">
              <img 
                src={offer.store.logo} 
                alt={offer.store.name} 
                className="h-8 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "/store-logos/placeholder.svg";
                }}
              />
            </div>
            <div>
              <div className="font-semibold text-white">{offer.store.name}</div>
              <div className="text-xs text-jawaker-gray">{offer.region}</div>
            </div>
          </div>
        </div>
        
        {/* Token Value */}
        <div className="mb-3">
          <div className="text-sm text-jawaker-gray">Value</div>
          <div className="text-xl font-bold text-white">{offer.tokenValue.toLocaleString()} tokens</div>
        </div>
        
        {/* Price */}
        <div className="mb-4">
          <div className="text-sm text-jawaker-gray">Price</div>
          <div className="text-2xl font-bold text-gradient">
            {offer.price.currency}{offer.price.value.toFixed(2)}
          </div>
        </div>
        
        {/* Buy button */}
        <div className="mt-auto">
          <Button 
            className="w-full bg-jawaker-purple hover:bg-jawaker-darkPurple flex items-center justify-center gap-1"
          >
            Buy Now <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TokenOfferCard;
