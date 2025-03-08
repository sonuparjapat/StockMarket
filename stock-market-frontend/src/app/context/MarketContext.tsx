"use client";
import { createContext, useContext, useEffect, useState } from "react";

const MarketContext = createContext<any>(null);

export const MarketProvider = ({ children }: { children: React.ReactNode }) => {
  const [stocks, setStocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [prevPrices, setPrevPrices] = useState<Record<string, number>>({});
const [lastupdatedate,setLastUpdateDate]=useState<any>("")
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:5000"); // Adjust WebSocket URL if needed

    socket.onopen = () => {
      console.log("✅ WebSocket Connected");
    };

    socket.onmessage = (event) => {
      const liveData = JSON.parse(event.data);
      setStocks(liveData); // Update stock data in state
      setLoading(false);
      setLastUpdateDate(Date.now());
    };

    socket.onerror = (error) => {
      console.error("❌ WebSocket Error:", error);
    };

    socket.onclose = () => {
      console.log("❌ WebSocket Disconnected");
      setTimeout(() => {
        window.location.reload(); // Simple reconnect logic (can be improved)
      }, 5000);
    };

    return () => socket.close();
  }, []);
  useEffect(() => {
    const newPrevPrices = stocks.reduce((acc, stock) => {
      acc[stock.name] = stock.price;
      return acc;
    }, {} as Record<string, number>);
  
    setPrevPrices(newPrevPrices);
  }, [stocks]);

  return (
    <MarketContext.Provider value={{ stocks, loading,lastupdatedate }}>
      {children}
    </MarketContext.Provider>
  );
};

export const useMarket = () => {
  return useContext(MarketContext);
};