import MarketTable from "../components/MarketTable";
import OrderBook from "../components/OrderBook";

export default function MarketWatch() {
  return (
    <div className="p-6">
        
      <h1 className="text-2xl font-bold mb-4">📊Order Book</h1>
      <OrderBook />
    </div>
  );
}