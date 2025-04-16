
import React from 'react';
import { HistoricalPrice } from '@/data/jawaker-tokens';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PriceHistoryChartProps {
  data: HistoricalPrice[];
}

const PriceHistoryChart: React.FC<PriceHistoryChartProps> = ({ data }) => {
  // Format date for display
  const formattedData = data.map(item => ({
    ...item,
    formattedDate: new Date(item.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }));

  return (
    <div className="w-full h-64 bg-jawaker-charcoal rounded-lg p-4">
      <h3 className="text-white text-lg font-semibold mb-4">Price History</h3>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart
          data={formattedData}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="formattedDate" 
            stroke="#8E9196"
            tick={{ fill: '#8E9196', fontSize: 12 }} 
          />
          <YAxis 
            stroke="#8E9196"
            tick={{ fill: '#8E9196', fontSize: 12 }}
            domain={['dataMin - 0.1', 'dataMax + 0.1']} 
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#221F26', 
              borderColor: '#9b87f5',
              color: '#fff' 
            }}
            labelStyle={{ color: '#fff' }}
          />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#9b87f5" 
            strokeWidth={2}
            dot={{ fill: '#9b87f5', strokeWidth: 2 }}
            activeDot={{ r: 8, fill: '#9b87f5' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceHistoryChart;
