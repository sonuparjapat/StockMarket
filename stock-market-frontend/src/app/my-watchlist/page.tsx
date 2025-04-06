"use client";
import WatchlistTable from "./WatchlistTable";

export default function WatchlistPage() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6 text-indigo-600">
        🚀 Your Personal Watchlist
      </h1>

      <WatchlistTable />
    </div>
  );
}