"use client";
import React, { useEffect, useState } from "react";
import useWebSocket from "../utils/useWebSocket"; // ✅ WebSocket Hook for Live Updates
import OrderForm from "./OrderForm";

const OrderBook: React.FC = () => {
  const { orderBook } = useWebSocket("ws://localhost:5000/orderbook");
  const [highlightedOrders, setHighlightedOrders] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (orderBook) {
      const newHighlights = new Set<number>();
      [...orderBook.bids, ...orderBook.asks].forEach((order) => newHighlights.add(order.id));
      setHighlightedOrders(newHighlights);

      setTimeout(() => setHighlightedOrders(new Set()), 1000); // Remove highlights after 1 sec
    }
  }, [orderBook]);

  if (!orderBook || !orderBook.bids?.length || !orderBook.asks?.length) {
    return <div className="text-white text-center">Loading Order Book...</div>;
  }

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-lg w-full h-screen flex flex-col">
      <h2 className="text-white text-xl font-bold mb-4 text-center">
        Market Depth (Order Book)
      </h2>

      <div className="flex w-full gap-4">
        {/* ✅ Bids (Buyers) */}
        <div className="w-1/2">
          <h3 className="text-green-400 text-lg font-semibold mb-2">Bids (Buyers)</h3>
          <table className="w-full text-white border border-gray-600">
            <thead>
              <tr className="text-gray-400">
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {orderBook.bids
                .sort((a: any, b: any) => b.price - a.price) // Highest bid first
                .map((order: any) => (
                  <tr
                    key={order.id}
                    className={`border-t border-gray-700 ${highlightedOrders.has(order.id) ? "bg-green-800" : ""}`}
                  >
                    <td className="text-green-400">{order.price.toFixed(2)}</td>
                    <td>{order.quantity}</td>
                    <td>{order.total.toFixed(2)}</td>
                    <td className="text-xs text-gray-400">{order.me}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* ✅ Asks (Sellers) */}
        <div className="w-1/2">
          <h3 className="text-red-400 text-lg font-semibold mb-2">Asks (Sellers)</h3>
          <table className="w-full text-white border border-gray-600">
            <thead>
              <tr className="text-gray-400">
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {orderBook.asks
                .sort((a: any, b: any) => a.price - b.price) // Lowest ask first
                .map((order: any) => (
                  <tr
                    key={order.id}
                    className={`border-t border-gray-700 ${highlightedOrders.has(order.id) ? "bg-red-800" : ""}`}
                  >
                    <td className="text-red-400">{order.price.toFixed(2)}</td>
                    <td>{order.quantity}</td>
                    <td>{order.total.toFixed(2)}</td>
                    <td className="text-xs text-gray-400">{order.me}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ✅ Order Form for Placing Orders */}
      <div className="mt-4">
        <OrderForm />
      </div>
    </div>
  );
};

export default OrderBook;