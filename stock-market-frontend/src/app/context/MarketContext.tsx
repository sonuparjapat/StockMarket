"use client";
import { createContext, useContext, useState, useEffect } from "react";
import useWebSocket from "../utils/useWebSocket"; // ✅ Your Old Hook

const MarketContext = createContext<any>(null);

export const MarketProvider = ({ children }) => {
  const { stocks, loading, lastUpdateDate } = useWebSocket("ws://localhost:5000/market");

  const [prevPrices, setPrevPrices] = useState({});

  useEffect(() => {
    const newPrevPrices = stocks.reduce((acc, stock) => {
      acc[stock.symbol] = stock.price;
      return acc;
    }, {});

    setPrevPrices(newPrevPrices);
  }, [stocks]);

  return (
    <MarketContext.Provider value={{ stocks, loading, lastUpdateDate, prevPrices }}>
      {children}
    </MarketContext.Provider>
  );
};

export const useMarket = () => useContext(MarketContext);