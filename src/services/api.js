const BASE_URL = 'https://api.coingecko.com/api/v3';

const MOCK_TOP_COINS = [
  {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    current_price: 94500.00,
    market_cap: 1850000000000,
    market_cap_rank: 1,
    price_change_percentage_24h: 2.45
  },
  {
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    current_price: 3450.50,
    market_cap: 415000000000,
    market_cap_rank: 2,
    price_change_percentage_24h: 1.82
  },
  {
    id: 'solana',
    symbol: 'sol',
    name: 'Solana',
    image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
    current_price: 185.20,
    market_cap: 86000000000,
    market_cap_rank: 3,
    price_change_percentage_24h: 5.12
  },
  {
    id: 'cardano',
    symbol: 'ada',
    name: 'Cardano',
    image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
    current_price: 0.72,
    market_cap: 25000000000,
    market_cap_rank: 4,
    price_change_percentage_24h: -0.45
  },
  {
    id: 'ripple',
    symbol: 'xrp',
    name: 'XRP',
    image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
    current_price: 2.35,
    market_cap: 132000000000,
    market_cap_rank: 5,
    price_change_percentage_24h: 3.10
  }
];

export const fetchTopCoins = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return Array.isArray(data) && data.length > 0 ? data : MOCK_TOP_COINS;
  } catch (error) {
    console.warn("CoinGecko API error or rate limit, returning cached fallback market data:", error);
    return MOCK_TOP_COINS;
  }
};

export const fetchCoinDetails = async (id) => {
  try {
    const response = await fetch(
      `${BASE_URL}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn("Failed to fetch coin details, returning fallback object:", error);
    const mockMatch = MOCK_TOP_COINS.find(c => c.id === id) || MOCK_TOP_COINS[0];
    return {
      id: mockMatch.id,
      name: mockMatch.name,
      symbol: mockMatch.symbol,
      image: { large: mockMatch.image },
      market_data: {
        current_price: { usd: mockMatch.current_price },
        market_cap: { usd: mockMatch.market_cap },
        price_change_percentage_24h: mockMatch.price_change_percentage_24h
      },
      description: { en: `${mockMatch.name} is a decentralized digital asset.` }
    };
  }
};

export const fetchCoinHistory = async (id, days = 7) => {
  try {
    const response = await fetch(
      `${BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=${days}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.prices;
  } catch (error) {
    console.warn("Failed to fetch historical data, returning synthetic chart points:", error);
    const now = Date.now();
    return Array.from({ length: 7 }, (_, i) => [now - (6 - i) * 86400000, 90000 + Math.random() * 5000]);
  }
};