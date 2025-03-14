import React from "react";

const dummyData = {
  bids: [
    { price: 195.5, quantity: 200, total: 40000 },
    { price: 195.4, quantity: 150, total: 29250 },
    { price: 195.3, quantity: 100, total: 19530 },
  ],
  asks: [
    { price: 195.6, quantity: 250, total: 48900 },
    { price: 195.7, quantity: 180, total: 35166 },
    { price: 195.8, quantity: 120, total: 23496 },
  ],
};

const OrderBook: React.FC = () => {
  return (
<div className="bg-gray-900 p-4 rounded-lg shadow-lg w-full h-screen flex flex-col">
      <h2 className="text-white text-xl font-bold mb-4 text-center">
        Market Depth (Order Book)
      </h2>

      <div className="grid grid-cols-2 gap-4 border border-red-400 w-full">
        {/* Bid Orders */}
        <div>
          <h3 className="text-green-400 text-lg font-semibold mb-2">Bids</h3>
          <table className="w-full text-white">
            <thead>
              <tr className="text-gray-400">
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {dummyData.bids.map((order, index) => (
                <tr key={index} className="border-t border-gray-700">
                  <td className="text-green-400">{order.price.toFixed(2)}</td>
                  <td>{order.quantity}</td>
                  <td>{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Ask Orders */}
        <div>
          <h3 className="text-red-400 text-lg font-semibold mb-2">Asks</h3>
          <table className="w-full text-white">
            <thead>
              <tr className="text-gray-400">
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {dummyData.asks.map((order, index) => (
                <tr key={index} className="border-t border-gray-700">
                  <td className="text-red-400">{order.price.toFixed(2)}</td>
                  <td>{order.quantity}</td>
                  <td>{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderBook;