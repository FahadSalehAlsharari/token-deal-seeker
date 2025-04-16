
export interface TokenOffer {
  id: string;
  store: {
    name: string;
    logo: string;
  };
  region: string;
  tokenValue: number;
  price: {
    value: number;
    currency: string;
  };
  url: string;
  lastUpdated: string;
}

export interface HistoricalPrice {
  date: string;
  price: number;
}

export const tokenOffers: TokenOffer[] = [
  {
    id: "1",
    store: {
      name: "CDKeys",
      logo: "/store-logos/cdkeys.png"
    },
    region: "GLOBAL",
    tokenValue: 4296,
    price: {
      value: 1.52,
      currency: "€"
    },
    url: "#",
    lastUpdated: "2025-04-12"
  },
  {
    id: "2",
    store: {
      name: "G2A",
      logo: "/store-logos/g2a.png"
    },
    region: "GLOBAL",
    tokenValue: 4296,
    price: {
      value: 1.65,
      currency: "€"
    },
    url: "#",
    lastUpdated: "2025-04-14"
  },
  {
    id: "3",
    store: {
      name: "Kinguin",
      logo: "/store-logos/kinguin.png"
    },
    region: "GLOBAL",
    tokenValue: 4296,
    price: {
      value: 1.79,
      currency: "€"
    },
    url: "#",
    lastUpdated: "2025-04-15"
  },
  {
    id: "4",
    store: {
      name: "Eneba",
      logo: "/store-logos/eneba.png"
    },
    region: "GLOBAL",
    tokenValue: 10740,
    price: {
      value: 3.95,
      currency: "€"
    },
    url: "#",
    lastUpdated: "2025-04-13"
  },
  {
    id: "5",
    store: {
      name: "MMOGA",
      logo: "/store-logos/mmoga.png"
    },
    region: "GLOBAL",
    tokenValue: 10740,
    price: {
      value: 4.12,
      currency: "€"
    },
    url: "#",
    lastUpdated: "2025-04-15"
  },
  {
    id: "6",
    store: {
      name: "GamersGate",
      logo: "/store-logos/gamersgate.png"
    },
    region: "GLOBAL",
    tokenValue: 21480,
    price: {
      value: 7.85,
      currency: "€"
    },
    url: "#",
    lastUpdated: "2025-04-16"
  },
  {
    id: "7",
    store: {
      name: "HRKGame",
      logo: "/store-logos/hrkgame.png"
    },
    region: "GLOBAL",
    tokenValue: 21480,
    price: {
      value: 8.20,
      currency: "€"
    },
    url: "#",
    lastUpdated: "2025-04-14"
  },
  {
    id: "8",
    store: {
      name: "GreenManGaming",
      logo: "/store-logos/gmg.png"
    },
    region: "GLOBAL",
    tokenValue: 53700,
    price: {
      value: 19.99,
      currency: "€"
    },
    url: "#",
    lastUpdated: "2025-04-15"
  }
];

export const historicalPrices: HistoricalPrice[] = [
  { date: "2025-01-01", price: 1.65 },
  { date: "2025-01-15", price: 1.75 },
  { date: "2025-02-01", price: 1.68 },
  { date: "2025-02-15", price: 1.59 },
  { date: "2025-03-01", price: 1.60 },
  { date: "2025-03-15", price: 1.55 },
  { date: "2025-04-01", price: 1.53 },
  { date: "2025-04-15", price: 1.52 }
];

export const lowestPrice = {
  value: 1.52,
  currency: "€",
  date: "2025-04-15"
};
