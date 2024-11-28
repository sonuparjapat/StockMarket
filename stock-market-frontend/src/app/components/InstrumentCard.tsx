import React from 'react';

interface InstrumentCardProps {
  instrumentName: string;
  lastPrice: number;
  expiry: string;
  lotSize: number;
  priceChange: string; // 'up' or 'down'
  instrumentType: string;
}

const InstrumentCard: React.FC<InstrumentCardProps> = ({
  instrumentName,
  lastPrice,
  expiry,
  lotSize,
  priceChange,
  instrumentType,
}) => {
  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-md p-4 space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-xl font-semibold">{instrumentName}</div>
        <div
          className={`text-lg font-bold ${
            priceChange === 'up' ? 'text-green-500' : 'text-red-500'
          }`}
        >
          ₹{lastPrice.toFixed(4)}
        </div>
      </div>

      <div className="text-sm text-gray-400">
        <p>Expiry: {new Date(expiry).toLocaleDateString()}</p>
        <p>Lot Size: {lotSize}</p>
        <p>Type: {instrumentType}</p>
      </div>

      <div className="flex justify-between items-center text-xs text-gray-500">
        <span
          className="inline-flex items-center bg-green-600 text-white rounded-full px-2 py-1"
        >
          {priceChange === 'up' ? 'Price Up' : 'Price Down'}
        </span>
        <span>Segment: {instrumentType}</span>
      </div>
    </div>
  );
};

export default InstrumentCard;