"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

export default function TrendingPage() {
  const [trendingStocks, setTrendingStocks] = useState<any[]>([]);

  useEffect(() => {
    socket.on("stocks", (stocks: any) => {
      const filtered = stocks.filter(
        (stock: any) =>
          parseFloat(stock.volume) > 1000000 || Math.abs(parseFloat(stock.change)) > 3
      );
      setTrendingStocks(filtered);
    });

    return () => {
      socket.off("stocks");
    };
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">🔥 Trending Stocks</h1>

      <table className="w-full border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Change %</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {trendingStocks.map((stock, index) => (
            <tr key={index} className="text-center border">
              <td>{stock.name}</td>
              <td>{stock.price}</td>
              <td className={parseFloat(stock.change) > 0 ? "text-green-500" : "text-red-500"}>
                {stock.change}%
              </td>
              <td>{stock.volume}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
