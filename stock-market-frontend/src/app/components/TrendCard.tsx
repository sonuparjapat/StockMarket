export default function TrendCard({ item }: { item: any }) {
    return (
      <div className="bg-white p-4 rounded shadow hover:scale-105 duration-200 cursor-pointer">
        <h2 className="text-lg font-semibold">{item.title}</h2>
        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
        <p className="text-xs text-blue-500 mt-2">{item.tag}</p>
      </div>
    );
  }