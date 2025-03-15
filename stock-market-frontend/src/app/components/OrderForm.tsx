"use client";
import React, { useState } from "react";
import useWebSocket from "../utils/useWebSocket"; // ✅ WebSocket Hook for communication

const OrderForm: React.FC = () => {
  const [orderType, setOrderType] = useState("market"); // "market" or "limit"
  const [side, setSide] = useState("buy"); // "buy" or "sell"
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState(""); // Only for Limit Orders
  const { sendMessage } = useWebSocket("ws://localhost:5000/orders"); // WebSocket for orders

  // ✅ Handle Order Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const order = {
      side,
      type: orderType,
      quantity: Number(quantity),
      price: orderType === "limit" ? Number(price) : null, // Only for Limit Orders
    };

    sendMessage(order); // Send order to backend
    setQuantity(""); 
    setPrice("");
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-white text-xl font-bold mb-4 text-center">Place Order</h2>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
        
        {/* Buy/Sell Selection */}
        <div className="flex space-x-4">
          <button
            type="button"
            className={`w-1/2 py-2 rounded ${side === "buy" ? "bg-green-500" : "bg-gray-700"}`}
            onClick={() => setSide("buy")}
          >
            Buy
          </button>
          <button
            type="button"
            className={`w-1/2 py-2 rounded ${side === "sell" ? "bg-red-500" : "bg-gray-700"}`}
            onClick={() => setSide("sell")}
          >
            Sell
          </button>
        </div>

        {/* Market or Limit Order Selection */}
        <div className="flex space-x-4">
          <button
            type="button"
            className={`w-1/2 py-2 rounded ${orderType === "market" ? "bg-blue-500" : "bg-gray-700"}`}
            onClick={() => setOrderType("market")}
          >
            Market
          </button>
          <button
            type="button"
            className={`w-1/2 py-2 rounded ${orderType === "limit" ? "bg-blue-500" : "bg-gray-700"}`}
            onClick={() => setOrderType("limit")}
          >
            Limit
          </button>
        </div>

        {/* Quantity Input */}
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white border border-gray-600"
          required
        />

        {/* Price Input (Only for Limit Orders) */}
        {orderType === "limit" && (
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-2 rounded bg-gray-800 text-white border border-gray-600"
            required
          />
        )}

        {/* Submit Button */}
        <button type="submit" className="bg-yellow-500 py-2 rounded text-black font-bold">
          Place Order
        </button>

      </form>
    </div>
  );
};

export default OrderForm;
