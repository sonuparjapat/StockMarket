import { useEffect, useState } from "react";

const useWebSocket = (url: string) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onopen = () => {
      console.log("WebSocket Connected ✅");
    };

    socket.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setData((prevData) => [...prevData, ...newData]); // Updating stock data
    };

    socket.onerror = (error) => {
      console.error("WebSocket Error ❌", error);
    };

    socket.onclose = () => {
      console.log("WebSocket Disconnected ❌");
    };

    return () => socket.close();
  }, [url]);

  return data;
};

export default useWebSocket;
