"use client";
import { useMarket } from "../context/MarketContext";
import { useEffect, useMemo, useRef, useState } from "react";
import usePrevious from "../hooks/usePrevious";
import styles from './MarketTable.module.css';
import io from "socket.io-client";

// Connect WebSocket to backend
const socket = io("http://localhost:5000");
export default function MarketTable() {

  const { stocks, loading, lastupdatedate } = useMarket();
  const [sortedStocks, setSortedStocks] = useState<any[]>([]);
  const [sortKey, setSortKey] = useState<string>("price");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [timeAgo, setTimeAgo] = useState(0);
  const [sortBy, setSortBy] = useState<"name" | "price" | "volume">("name");

  const [alerts, setAlerts] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("desc");
  const [filter, setFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const previousPrices = useRef<Record<string, number | undefined>>({});
  const rowsPerPage = 10; // ✅ Show only 10 stocks per page
  console.log(lastupdatedate, "last");

  useEffect(() => {
    socket.on("stockUpdate", (updatedStock) => {
      const change = parseFloat(updatedStock.change);
      
      if (change >= 5) {
        setAlerts((prev) => [`🔥 ${updatedStock.name} is up ${change}%! 📈`, ...prev]);
      } else if (change <= -5) {
        setAlerts((prev) => [`⚠️ ${updatedStock.name} dropped ${change}%! 📉`, ...prev]);
      }
    });
  
    return () => socket.off("stockUpdate");
  }, []);
  // ✅ Filtering & Sorting Stocks
  const filteredAndSortedStocks = useMemo(() => {
    console.log("🔄 Running Filtering & Sorting...");
    
    let filteredStocks = [...stocks];

    if (filter === "gainers") {
      filteredStocks = filteredStocks.filter((s) => parseFloat(s.change) > 0);
    } else if (filter === "losers") {
      filteredStocks = filteredStocks.filter((s) => parseFloat(s.change) < 0);
    }

    if (debouncedSearch.trim() !== "") {
      const query = debouncedSearch.toLowerCase();
      filteredStocks = filteredStocks.filter((s) =>
        s.name.toLowerCase().includes(query)
      );
    }

    return [...filteredStocks].sort((a, b) => {
      const valueA = parseFloat(a[sortKey]) || 0;
      const valueB = parseFloat(b[sortKey]) || 0;
      return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
    });
  }, [stocks, sortKey, sortOrder, filter, debouncedSearch]);

  const topGainers = useMemo(() => {
    return [...stocks]
      .filter((s) => parseFloat(s.change) > 0)
      .sort((a, b) => parseFloat(b.change) - parseFloat(a.change))
      .slice(0, 5);
  }, [stocks]);
  
  const topLosers = useMemo(() => {
    return [...stocks]
      .filter((s) => parseFloat(s.change) < 0)
      .sort((a, b) => parseFloat(a.change) - parseFloat(b.change))
      .slice(0, 5);
  }, [stocks]);
  // ✅ Update Sorted Stocks
  useEffect(() => {
    setSortedStocks(filteredAndSortedStocks);
  }, [filteredAndSortedStocks]);

  // ✅ Debounce Search Query
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  useEffect(() => {
    if (!lastupdatedate) return;
  
    const updateAgo = () => {
      setTimeAgo(Math.floor((Date.now() - lastupdatedate) / 1000));
    };
  
    updateAgo(); // Run immediately
    const interval = setInterval(updateAgo, 1000);
  
    return () => clearInterval(interval);
  }, [lastupdatedate]); // ✅ Only update when `lastupdatedate` changes

 
  // ✅ Pagination Logic
  const indexOfLastStock = currentPage * rowsPerPage;
  const indexOfFirstStock = indexOfLastStock - rowsPerPage;
  const currentStocks = sortedStocks.slice(indexOfFirstStock, indexOfLastStock);
  const totalPages = Math.ceil(sortedStocks.length / rowsPerPage);

  useEffect(() => {
    currentStocks.forEach((stock) => {
      previousPrices.current[stock.name] = stock.price;
    });
  }, [currentStocks]);
  
  const totalUp = stocks.filter((s) => parseFloat(s.change) > 0).length;
  const totalDown = stocks.filter((s) => parseFloat(s.change) < 0).length;
  const totalVolume = stocks.reduce((acc, s) => acc + parseFloat(s.volume), 0);
  
  // Determine Market Trend
  const marketTrend =
    totalUp > totalDown ? "📈 Bullish" : totalDown > totalUp ? "📉 Bearish" : "⚖️ Neutral";
  
  if (loading) return <p className="text-center p-4">⏳ Loading Market Data...</p>;

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="bg-yellow-100 p-4 rounded shadow mb-4">
  <h2 className="text-xl font-bold text-yellow-700">🔔 Stock Alerts</h2>
  <ul className="mt-2 text-sm">
    {alerts.slice(0, 5).map((alert, index) => (
      <li key={index} className="text-gray-700">{alert}</li>
    ))}
  </ul>
</div>

      <div className="bg-blue-100 p-4 rounded shadow mb-4">
  <h2 className="text-xl font-bold text-blue-700">📊 Market Summary</h2>
  <div className="grid grid-cols-3 gap-4 mt-2">
    <div className="text-green-700 font-semibold">Stocks Up: {totalUp} 📈</div>
    <div className="text-red-700 font-semibold">Stocks Down: {totalDown} 📉</div>
    <div className="text-gray-700 font-semibold">Total Volume: {totalVolume.toLocaleString()} 💰</div>
  </div>
  <div className="text-center mt-3 text-lg font-bold">{marketTrend}</div>
</div>
      <div className="grid grid-cols-2 gap-4 mb-4">
  {/* Gainers */}
  <div className="p-4 bg-green-100 rounded shadow">
    <h3 className="text-lg font-semibold text-green-700">🚀 Top 5 Gainers</h3>
    <ul>
      {topGainers.map((stock) => (
        <li key={stock.name} className="flex justify-between">
          <span>{stock.name}</span>
          <span className="font-bold text-green-600">+{stock.change}%</span>
        </li>
      ))}
    </ul>
  </div>

  {/* Losers */}
  <div className="p-4 bg-red-100 rounded shadow">
    <h3 className="text-lg font-semibold text-red-700">📉 Top 5 Losers</h3>
    <ul>
      {topLosers.map((stock) => (
        <li key={stock.name} className="flex justify-between">
          <span>{stock.name}</span>
          <span className="font-bold text-red-600">{stock.change}%</span>
        </li>
      ))}
    </ul>
  </div>
</div>
      {/* Sorting & Filtering Controls */}
      <div className="text-sm text-gray-500 mb-2">🟢 Live (Updated {timeAgo}s ago)</div>
      <div className="flex justify-between mb-4">
        <div>
          <label className="mr-2">Sort by:</label>
          <select className="p-2 border rounded" value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
            <option value="price">Price</option>
            <option value="change">Change</option>
            <option value="volume">Volume</option>
          </select>
        </div>
        <div>
          <label className="mr-2">Order:</label>
          <select className="p-2 border rounded" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div>
          <label className="mr-2">Filter:</label>
          <select className="p-2 border rounded" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="gainers">Top Gainers</option>
            <option value="losers">Top Losers</option>
          </select>
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="🔍 Search stocks..."
            className="p-2 border rounded w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 text-left">Stock</th>
            <th className="p-3 text-left">Price (₹)</th>
            <th className="p-3 text-left">Change</th>
            <th className="p-3 text-left">Volume</th>
          </tr>
        </thead>
        <tbody>
        {currentStocks.map((stock, index) => {
  const previousPrice = previousPrices.current[stock.name] ?? undefined;
  const priceChange = previousPrice !== undefined ? stock.price - previousPrice : 0;
  const isPriceUp = priceChange > 0;
  const isPriceDown = priceChange < 0;

  return (
    <tr key={index} className={`${styles.tableRow} ${styles.td}`}>
      {/* Stock Name with Highlighted Search Query */}
      <td className="p-3">
  <span dangerouslySetInnerHTML={{
    __html: stock.name.replace(new RegExp(`(${searchQuery})`, "gi"), 
    match => `<span class='bg-yellow-300 font-bold'>${match}</span>`)
  }} />
</td>

      {/* Stock Price with Color Indication */}
      <td className={`${styles.tooltip} p-3`}>
    ₹{Number(stock.price).toFixed(2)}
    <span className={styles.tooltiptext}>Previous: ₹{Number(previousPrice)?.toFixed(2)}</span>
  </td>

      {/* Stock Price Change Indicator */}
      <td className={styles.td}>{isPriceUp ? "🔺" : isPriceDown ? "🔻" : "➖"}</td>

      {/* Stock Volume */}
      <td className={styles.td}>{stock.volume}</td>
    </tr>
  );
})}
        </tbody>
      </table>

      {/* ✅ Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button className={`p-2 border rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}>
          ⬅️ Previous
        </button>
        <span className="p-2">Page {currentPage} of {totalPages}</span>
        <button className={`p-2 border rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}>
          Next ➡️
        </button>
      </div>
    </div>
  );
}
