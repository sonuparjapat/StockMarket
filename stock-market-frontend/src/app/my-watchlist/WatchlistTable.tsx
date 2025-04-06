import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

export default function WatchlistTable() {
  const [watchlist, setWatchlist] = useState<any[]>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("watchlist") || "[]");
    }
    return [];
  });

  const [stocks, setStocks] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    socket.on("stocks", (updatedStocks: any) => {
      const filtered = updatedStocks.filter((s: any) =>
        watchlist.some((w) => w.symbol === s.symbol)
      );
      setStocks(filtered);
    });

    return () => {
      socket.off("stocks");
    };
  }, [watchlist]);

  const handleAdd = () => {
    const stock = stocks.find((s) => s.name.toLowerCase() === search.toLowerCase());
    if (!stock) {
      toast.error("Stock not found or invalid name");
      return;
    }

    if (watchlist.some((item) => item.symbol === stock.symbol)) {
      toast.error("Already in Watchlist");
      return;
    }

    setWatchlist((prev) => [...prev, stock]);
    toast.success(`${stock.name} added to Watchlist`);
    setSearch("");
  };

  const handleRemove = (stock: any) => {
    setWatchlist((prev) => prev.filter((item) => item.symbol !== stock.symbol));
    toast.error(`${stock.name} removed from Watchlist`);
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter Stock Name"
          className="border px-2 py-1 rounded"
        />
        <button onClick={handleAdd} className="bg-blue-500 text-white px-3 py-1 rounded">
          Add
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Name</th>
              <th className="p-2">Symbol</th>
              <th className="p-2">Price</th>
              <th className="p-2">Change %</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {stocks.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-4 text-gray-500">
                  No stocks in Watchlist
                </td>
              </tr>
            ) : (
              stocks.map((stock) => (
                <tr key={stock.symbol} className="border-b hover:bg-gray-100">
                  <td className="p-2">{stock.name}</td>
                  <td className="p-2">{stock.symbol}</td>
                  <td className="p-2">{stock.price}</td>
                  <td className={`p-2 ${stock.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {stock.change}%
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => handleRemove(stock)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}