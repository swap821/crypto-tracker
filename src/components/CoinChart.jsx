import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export default function CoinChart({ historyData }) {
  // 1. Format the raw [timestamp, price] arrays into objects for Recharts
  const formattedData = historyData.map((item) => {
    const date = new Date(item[0]);
    return {
      date: date.toLocaleDateString(),
      price: item[1],
    };
  });

  return (
    <div className="h-[400px] w-full mt-10 bg-gray-900 p-6 rounded-xl border border-gray-700 shadow-inner">
      <h3 className="text-xl font-bold text-white mb-6">7-Day Price History</h3>
      
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={formattedData}>
          {/* This defines the blue gradient under the line */}
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
          
          <XAxis 
            dataKey="date" 
            stroke="#9ca3af" 
            tick={{ fontSize: 12 }} 
            tickMargin={10} 
            minTickGap={30} 
          />
          
          <YAxis 
            stroke="#9ca3af" 
            tick={{ fontSize: 12 }} 
            tickFormatter={(val) => `$${val.toLocaleString()}`} 
            domain={['auto', 'auto']} 
            width={80} 
          />
          
          <Tooltip
            contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff', borderRadius: '0.5rem' }}
            itemStyle={{ color: '#60a5fa', fontWeight: 'bold' }}
            formatter={(value) => [`$${value.toLocaleString()}`, 'Price']}
          />
          
          <Area 
            type="monotone" 
            dataKey="price" 
            stroke="#3b82f6" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorPrice)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}