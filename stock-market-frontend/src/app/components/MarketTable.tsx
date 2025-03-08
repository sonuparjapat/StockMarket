"use client";
import { useMarket } from "../context/MarketContext";
import { useEffect, useState } from "react";

export default function MarketTable() {
  const { stocks, loading,lastupdatedate } = useMarket();
  const [sortedStocks, setSortedStocks] = useState<any[]>([]);
  const [sortKey, setSortKey] = useState<string>("price");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [timeAgo, setTimeAgo] = useState(0);
  const [sortOrder, setSortOrder] = useState<string>("desc");
  const [filter, setFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [highlightedStocks, setHighlightedStocks] = useState<Record<string, boolean>>({});
  const rowsPerPage = 10; // ✅ Show only 10 stocks per page
console.log(lastupdatedate,"last")

  useEffect(() => {
    let filteredStocks = stocks;

    if (filter === "gainers") {
      filteredStocks = stocks.filter((s) => parseFloat(s.change) > 0);
    } else if (filter === "losers") {
      filteredStocks = stocks.filter((s) => parseFloat(s.change) < 0);
    }

  // ✅ Apply search filter using `debouncedSearch`
  if (debouncedSearch.trim() !== "") {
    const query = debouncedSearch.toLowerCase();
    filteredStocks = filteredStocks.filter((s) =>
      s.name.toLowerCase().includes(query)
    );
  }

    const sorted = [...filteredStocks].sort((a, b) => {
      const valueA = parseFloat(a[sortKey]) || 0;
      const valueB = parseFloat(b[sortKey]) || 0;
      return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
    });
    
    setSortedStocks(sorted);
  }, [stocks, sortKey, sortOrder, filter,debouncedSearch]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchQuery); // ✅ Update debounced search after delay
    }, 300); // ✅ 300ms delay (adjust as needed)
  

    return () => clearTimeout(timeout); // ✅ Cleanup function
  }, [searchQuery]);
    // ✅ Update "Updated Xs ago" every second
    useEffect(() => {
      const interval = setInterval(() => {
        setTimeAgo(Math.floor((Date.now() - lastupdatedate) / 1000));
      }, 1000);
  
      return () => clearInterval(interval); // Cleanup interval
    }, [lastupdatedate]); // Runs whenever lastUpdate changes
  console.log(debouncedSearch,"deb")
  // ✅ Pagination Logic
  const indexOfLastStock = currentPage * rowsPerPage;
  const indexOfFirstStock = indexOfLastStock - rowsPerPage;
  const currentStocks = sortedStocks.slice(indexOfFirstStock, indexOfLastStock);
  const totalPages = Math.ceil(sortedStocks.length / rowsPerPage);

  if (loading) return <p className="text-center p-4">⏳ Loading Market Data...</p>;

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      {/* Sorting & Filtering Controls */}
      <div className="text-sm text-gray-500 mb-2">
        🟢 Live (Updated {timeAgo}s ago)
      </div>
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
          <select
            className="p-2 border rounded"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div>
          <label className="mr-2">Filter:</label>
          <select
            className="p-2 border rounded"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
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
          {currentStocks.map((stock, index) => (
            <tr key={index} className="border-b">
           <td className="p-3">
  {stock.name.split(new RegExp(`(${searchQuery})`, "gi")).map((part, i) =>
    part.toLowerCase() === searchQuery.toLowerCase() ? (
      <span key={i} className="bg-yellow-300 font-bold">{part}</span>
    ) : (
      part
    )
  )}
</td>
              <td className="p-3">₹{Number(stock.price).toFixed(2)}</td>
              <td className={`p-3 ${parseFloat(stock.change) > 0 ? "text-green-600" : "text-red-600"}`}>
                {stock.change}
              </td>
              <td className="p-3">{stock.volume}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Pagination Controls */}
      <div className="flex justify-between mt-4">
      <button
  className={`p-2 border rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
  disabled={currentPage === 1}
>
  ⬅️ Previous
</button>
        <span className="p-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={`p-2 border rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next ➡️
        </button>
      </div>
    </div>
  );
}
