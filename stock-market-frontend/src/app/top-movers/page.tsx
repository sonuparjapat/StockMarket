"use client";
import useWebSocket from "../utils/useWebSocket";
import TopMoversTable from "./TopMoversTable";

export default function TopMoversPage() {
  const { stocks, loading, lastUpdateDate } = useWebSocket("ws://localhost:5000");

  const gainers = stocks
    .filter((stock) => parseFloat(stock.change) >= 0)
    .sort((a, b) => parseFloat(b.change) - parseFloat(a.change))
    .slice(0, 10);

  const losers = stocks
    .filter((stock) => parseFloat(stock.change) < 0)
    .sort((a, b) => parseFloat(a.change) - parseFloat(b.change))
    .slice(0, 10);

  if (loading) return <div>Loading Market Data...</div>;

  if (!stocks.length) return <div>No Market Data Available</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">Top Movers (Gainers & Losers)</h1>
      <p className="text-xs text-gray-500 mb-4">
        Last updated at: {lastUpdateDate?.toLocaleTimeString()}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TopMoversTable title="Top Gainers" data={gainers} isGainer />
        <TopMoversTable title="Top Losers" data={losers} />
      </div>
    </div>
  );
}