import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCoinDetails, fetchCoinHistory } from '../services/api'; // Added history import
import CoinChart from '../components/CoinChart'; // Imported the new chart component

export default function CoinDetail() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [history, setHistory] = useState([]); // New state for chart data
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCoinData = async () => {
      try {
        setIsLoading(true);
        // Fetch both the details and the 7-day history simultaneously
        const [detailData, historyData] = await Promise.all([
          fetchCoinDetails(id),
          fetchCoinHistory(id, 7)
        ]);
        
        setCoin(detailData);
        setHistory(historyData);
        setError(null);
      } catch (err) {
        setError('Failed to load coin details.');
      } finally {
        setIsLoading(false);
      }
    };

    getCoinData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-xl font-bold animate-pulse">Loading {id} data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-red-500">
        <div className="text-xl">{error}</div>
      </div>
    );
  }

  if (!coin) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-5xl mx-auto bg-gray-800 rounded-xl p-8 border border-gray-700 shadow-2xl">
        
        <Link to="/" className="text-blue-400 hover:text-blue-300 mb-8 inline-block font-semibold transition-colors">
          &larr; Back to Dashboard
        </Link>
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-6">
            <img src={coin.image.large} alt={coin.name} className="w-20 h-20" />
            <div>
              <h1 className="text-4xl font-bold">{coin.name}</h1>
              <span className="text-xl text-gray-400 uppercase tracking-wider">{coin.symbol}</span>
            </div>
          </div>
          
          <div className="md:text-right">
            <div className="text-4xl font-bold text-white">
              ${coin.market_data.current_price.usd.toLocaleString()}
            </div>
            <div className="text-gray-400 mt-2 font-medium">
              Market Cap Rank: #{coin.market_cap_rank}
            </div>
          </div>
        </div>

        {/* The New Chart Component Placed Right Here! */}
        {history.length > 0 && <CoinChart historyData={history} />}

        <div className="border-t border-gray-700 pt-8 mt-12">
          <h2 className="text-2xl font-bold mb-4">About {coin.name}</h2>
          <p 
            className="text-gray-300 leading-relaxed"
            dangerouslySetInnerHTML={{ 
              __html: coin.description.en ? coin.description.en.split('. ')[0] + '.' : 'No description available for this coin.' 
            }}
          />
        </div>

      </div>
    </div>
  );
}