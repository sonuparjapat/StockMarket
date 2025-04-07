import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { MarketProvider } from "./context/MarketContext";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex bg-gray-100">
        <MarketProvider>
          <Sidebar />
          <div className="flex-1 flex flex-col h-[100vh] overflow-auto scrollbar-hide">
            <Navbar />
            <main className="p-4 ">{children}</main>
          </div>
        </MarketProvider>

        {/* Toast Notification Here */}
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}