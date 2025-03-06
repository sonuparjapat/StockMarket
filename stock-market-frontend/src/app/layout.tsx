import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { MarketProvider } from "./context/MarketContext"; // ✅ Import Context
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex h-screen bg-gray-100">
        <MarketProvider> {/* ✅ Wrap Everything with Provider */}
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Navbar />
            <main className="p-4">{children}</main>
          </div>
        </MarketProvider>
      </body>
    </html>
  );
}