"use client";
import { createContext, useContext, useEffect, useState } from "react";
import {get} from "../utils/api";

type Stock = {
  name: string;
  price: number;
  change: string;
  volume: string;
};

type MarketContextType = {
  stocks: Stock[];
  loading: boolean;
};

const MarketContext = createContext<MarketContextType | undefined>(undefined);

export function MarketProvider({ children }: { children: React.ReactNode }) {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await get("/market-data");
        setStocks(response.data);
      } catch (error) {
        console.error("Error fetching market data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();

    // 🔥 Connect WebSocket for real-time updates
    const ws = new WebSocket("ws://localhost:5000");

    ws.onmessage = (event) => {
      const updatedStocks = JSON.parse(event.data);
      console.log("hello")
      setStocks(updatedStocks);
    };

    return () => ws.close(); // Cleanup WebSocket on unmount
  }, []);

  return (
    <MarketContext.Provider value={{ stocks, loading }}>
      {children}
    </MarketContext.Provider>
  );
}

export function useMarket() {
  const context = useContext(MarketContext);
  if (!context) {
    throw new Error("useMarket must be used within a MarketProvider");
  }
  return context;
}