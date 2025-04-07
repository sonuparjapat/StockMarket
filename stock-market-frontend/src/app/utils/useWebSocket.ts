"use client";
import { useEffect, useState } from "react";
import { Stock } from "../types/stock";

const useWebSocket = (url: string) => {
  const [stocks, setStocks] = useState<Stock[]>([]); // ✅ Market Data
  const [orderBook, setOrderBook] = useState<any>(null); // ✅ Order Book Data
  const [loading, setLoading] = useState(true); // ✅ Loading State
  const [lastUpdateDate, setLastUpdateDate] = useState<Date | null>(null); // ✅ Last Update Time

  useEffect(() => {
    let socket: WebSocket;
    let reconnectTimer: NodeJS.Timeout;

    const connectWebSocket = () => {
      socket = new WebSocket(url);

      socket.onopen = () => {
        // console.log("WebSocket Connected ✅");
        clearTimeout(reconnectTimer);
      };

      socket.onmessage = (event) => {
        try {
          const receivedData = JSON.parse(event.data);
console.log(receivedData,"receiveddata")
          if (receivedData.type === "stocks") {
            setStocks(receivedData.data);
           // ✅ Market Data
            setLastUpdateDate(new Date()); // ✅ Update Time
          } else if (receivedData.type === "orderBook") {
            setOrderBook(receivedData.data); // ✅ Order Book Data
            setLastUpdateDate(new Date()); // ✅ Update Time
          } else {
            console.warn("Unknown WebSocket message type ⚠️", receivedData);
          }

          setLoading(false); // ✅ Data received, stop loading
        } catch (error) {
          console.error("Error parsing WebSocket data ❌", error);
        }
      };

      socket.onerror = (error) => {
        console.error("WebSocket Error ❌", error);
      };

      socket.onclose = () => {
        console.log("WebSocket Disconnected ❌, Reconnecting...");
        reconnectTimer = setTimeout(connectWebSocket, 2000);
      };
    };

    connectWebSocket();

    return () => {
      socket.close();
      clearTimeout(reconnectTimer);
    };
  }, [url]);
// console.log(lastUpdateDate,"lastupdate date")
  return { stocks, orderBook, loading, lastUpdateDate };
};

export default useWebSocket;
