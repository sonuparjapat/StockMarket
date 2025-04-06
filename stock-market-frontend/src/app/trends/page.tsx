"use client";
import TrendCard from "../components/TrendCard";
import trendsData from "./data/trendsdata";

export default function TrendsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">🔥 Market Trends</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {trendsData.map((item, index) => (
          <TrendCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
}