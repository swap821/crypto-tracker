import { Link } from 'react-router-dom';

export default function CoinCard({ coin }) {
  const isPositive = coin.price_change_percentage_24h > 0;

  return (
    <Link 
      to={`/coin/${coin.id}`} 
      className="block bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:border-blue-500 transition-all duration-300 border border-gray-700 cursor-pointer"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img src={coin.image} alt={coin.name} className="w-10 h-10" />
          <div>
            <h2 className="text-lg font-bold text-white">{coin.name}</h2>
            <span className="text-sm text-gray-400 uppercase">{coin.symbol}</span>
          </div>
        </div>
        <div className="text-gray-400 text-sm font-semibold">
          #{coin.market_cap_rank}
        </div>
      </div>

      <div className="mt-4">
        <div className="text-2xl font-bold text-white">
          ${coin.current_price.toLocaleString()}
        </div>
        <div className={`text-sm font-medium mt-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive ? '↑' : '↓'} {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between text-sm">
        <span className="text-gray-400">Market Cap:</span>
        <span className="text-gray-200">${coin.market_cap.toLocaleString()}</span>
      </div>
    </Link>
  );
}