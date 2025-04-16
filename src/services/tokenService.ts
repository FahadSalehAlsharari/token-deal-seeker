
import { TokenOffer, historicalPrices, lowestPrice, tokenOffers } from '@/data/jawaker-tokens';

// In a real application, these functions would fetch from an API
export const getAllTokenOffers = async (): Promise<TokenOffer[]> => {
  // Simulating an API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tokenOffers);
    }, 300);
  });
};

export const searchTokenOffers = async (query: string): Promise<TokenOffer[]> => {
  // Simulating an API call with filtering
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = tokenOffers.filter(
        (offer) =>
          offer.store.name.toLowerCase().includes(query.toLowerCase()) ||
          offer.tokenValue.toString().includes(query)
      );
      resolve(results);
    }, 300);
  });
};

export const filterByTokenValue = async (minValue: number | null): Promise<TokenOffer[]> => {
  // Simulating an API call with filtering
  return new Promise((resolve) => {
    setTimeout(() => {
      if (minValue === null) {
        resolve(tokenOffers);
      } else {
        const results = tokenOffers.filter((offer) => offer.tokenValue >= minValue);
        resolve(results);
      }
    }, 300);
  });
};

export const getHistoricalPrices = async () => {
  // Simulating an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(historicalPrices);
    }, 300);
  });
};

export const getLowestPrice = async () => {
  // Simulating an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(lowestPrice);
    }, 300);
  });
};
