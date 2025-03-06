import Link from "next/link";
import { FaChartLine, FaGlobe, FaFire, FaRocket, FaHome } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="w-64 h-full bg-blue-900 text-white p-6">
      <h2 className="text-2xl font-bold">Finance Portal</h2>
      <ul className="mt-6 space-y-4">
        <li className="flex items-center gap-3 p-2 hover:bg-blue-700 rounded cursor-pointer">
          <FaHome /> Dashboard
        </li>
        <Link href="/market-watch">
  <li className="flex items-center gap-3 p-2 hover:bg-blue-700 rounded cursor-pointer">
    <FaChartLine /> Market Watch
  </li>
</Link>
        <li className="flex items-center gap-3 p-2 hover:bg-blue-700 rounded cursor-pointer">
          <FaGlobe /> World Finance
        </li>
        <li className="flex items-center gap-3 p-2 hover:bg-blue-700 rounded cursor-pointer">
          <FaFire /> Trends
        </li>
        <li className="flex items-center gap-3 p-2 hover:bg-blue-700 rounded cursor-pointer">
          <FaRocket /> IPOs
        </li>
      </ul>
    </div>
  );
}