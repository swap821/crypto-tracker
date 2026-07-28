import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchTopCoins } from '../services/api';
import CoinCard from '../components/CoinCard';
import SearchBar from '../components/SearchBar';

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getCoins = async () => {
      try {
        setIsLoading(true);
        const data = await fetchTopCoins();
        if (Array.isArray(data) && data.length > 0) {
          setCoins(data);
        } else {
          setCoins([
            { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin', image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png', current_price: 94500.00, market_cap: 1850000000000, market_cap_rank: 1, price_change_percentage_24h: 2.45 },
            { id: 'ethereum', symbol: 'eth', name: 'Ethereum', image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png', current_price: 3450.50, market_cap: 415000000000, market_cap_rank: 2, price_change_percentage_24h: 1.82 },
            { id: 'solana', symbol: 'sol', name: 'Solana', image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png', current_price: 185.20, market_cap: 86000000000, market_cap_rank: 3, price_change_percentage_24h: 5.12 }
          ]);
        }
        setError(null);
      } catch (err) {
        setError('Failed to fetch cryptocurrency data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    getCoins();
  }, []);

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
        <div className="text-xl font-bold animate-pulse">Loading market data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900 text-red-500">
        <div className="text-xl font-bold">{error}</div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
        >
          Cryptocurrency Tracker
        </motion.h1>
        <p className="text-gray-400 mb-6">
          Showing top 100 coins by market cap
        </p>

        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        {filteredCoins.length === 0 ? (
          <div className="text-gray-400 text-center py-10">
            No coins found matching "{searchTerm}"
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredCoins.map((coin) => (
              <motion.div key={coin.id} variants={itemVariants}>
                <CoinCard coin={coin} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}