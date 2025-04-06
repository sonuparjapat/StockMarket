import { ArrowUp, ArrowDown } from "lucide-react";
import { Stock } from "../types/stock";
interface Props {
  title: string;
  data: Stock[];
  isGainer?: boolean;
}
export default function TopMoversTable({ title, data, isGainer }: Props) {
  return (
    <div className="border rounded-lg shadow-sm p-4 bg-white overflow-x-auto">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="text-left">Name</th>
            <th className="text-right">Price</th>
            <th className="text-right">% Change</th>
          </tr>
        </thead>
        <tbody>
          {data.map((stock) => (
            <tr key={stock.name} className="hover:bg-gray-50">
              <td>{stock.name}</td>
              <td className="text-right">{stock.price}</td>
              <td className={`text-right font-medium ${stock.direction === "up" ? "text-green-600" : "text-red-600"}`}>
                {stock.change}
                {stock.direction === "up" ? (
                  <ArrowUp className="inline ml-1 w-4 h-4" />
                ) : (
                  <ArrowDown className="inline ml-1 w-4 h-4" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}