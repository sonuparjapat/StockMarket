"use client";
import { createContext, useContext, useState, useEffect } from "react";
import useWebSocket from "../utils/useWebSocket";// ✅ Import our WebSocket Hook

const MarketContext = createContext<any>(null);

export const MarketProvider = ({ children }: { children: React.ReactNode }) => {
  const { stocks, loading, lastUpdateDate } = useWebSocket("ws://localhost:5000/market"); // ✅ Use WebSocket Hook

  const [prevPrices, setPrevPrices] = useState<Record<string, number>>({});

  useEffect(() => {
    // ✅ Track previous prices for change comparison
    const newPrevPrices = stocks.reduce((acc, stock) => {
      acc[stock.symbol] = stock.price;
      return acc;
    }, {} as Record<string, number>);

    setPrevPrices(newPrevPrices);
  }, [stocks]);

  return (
    <MarketContext.Provider value={{ stocks, loading, lastUpdateDate, prevPrices }}>
      {children}
    </MarketContext.Provider>
  );
};

// ✅ Custom Hook for Market Data
export const useMarket = () => {
  return useContext(MarketContext);
};