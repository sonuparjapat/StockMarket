import MarketTable from "../components/MarketTable";

export default function MarketWatch() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📊 Market Watch</h1>
      <MarketTable />
    </div>
  );
}