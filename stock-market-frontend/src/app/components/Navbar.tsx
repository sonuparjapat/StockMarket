export default function Navbar() {
  return (
    <div className="h-16 bg-white shadow-md flex items-center px-6">
      <h1 className="text-lg font-semibold">📊 Dashboard</h1>
      <div className="ml-auto">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
          Login
        </button>
      </div>
    </div>
  );
}