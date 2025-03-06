"use client";
import { useMarket } from "../context/MarketContext";// ✅ Import Context

export default function MarketTable() {
  const { stocks, loading } = useMarket(); // ✅ Get data from context

  if (loading) return <p className="text-center p-4">⏳ Loading Market Data...</p>;

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
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
          {stocks.map((stock, index) => (
            <tr key={index} className="border-b">
              <td className="p-3">{stock.name}</td>
              <td className="p-3">{stock.price}</td>
              <td className={`p-3 ${stock.change.includes("+") ? "text-green-600" : "text-red-600"}`}>
                {stock.change}
              </td>
              <td className="p-3">{stock.volume}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}