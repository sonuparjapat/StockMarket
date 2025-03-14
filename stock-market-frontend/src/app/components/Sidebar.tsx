import Link from "next/link";
import { FaChartLine, FaGlobe, FaFire, FaRocket, FaHome, FaClipboardList, FaSearch } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="w-64 h-full bg-blue-900 text-white p-6">
      <h2 className="text-2xl font-bold">Finance Portal</h2>
      <ul className="mt-6 space-y-4">
        <li className="flex items-center gap-3 p-2 hover:bg-blue-700 rounded cursor-pointer">
          <FaHome /> Dashboard
        </li>
        <li className="flex items-center gap-3 p-2 hover:bg-blue-700 rounded cursor-pointer">
          <Link href="/market-watch" className="flex items-center gap-3 w-full">
            <FaChartLine /> Market Watch
          </Link>
        </li>
        <li className="flex items-center gap-3 p-2 hover:bg-blue-700 rounded cursor-pointer">
          <FaGlobe /> World Finance
        </li>
        <li className="flex items-center gap-3 p-2 hover:bg-blue-700 rounded cursor-pointer">
          <FaFire /> Trends
        </li>
        <li className="flex items-center gap-3 p-2 hover:bg-blue-700 rounded cursor-pointer">
          <FaRocket /> IPOs
        </li>
        
        {/* New Sections */}
        <li className="flex items-center gap-3 p-2 hover:bg-blue-700 rounded cursor-pointer">
          <Link href="/order-book" className="flex items-center gap-3 w-full">
            <FaClipboardList /> Order Book
          </Link>
        </li>
        <li className="flex items-center gap-3 p-2 hover:bg-blue-700 rounded cursor-pointer">
          <Link href="/stock-analysis" className="flex items-center gap-3 w-full">
            <FaSearch /> Stock Analysis
          </Link>
        </li>
      </ul>
    </div>
  );
}