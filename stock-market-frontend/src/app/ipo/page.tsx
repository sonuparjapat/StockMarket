"use client";

export default function IPOPage() {
  const ipoData = [
    {
      name: "XYZ Finance Ltd",
      openDate: "2025-04-10",
      closeDate: "2025-04-12",
      priceBand: "₹200 - ₹220",
      lotSize: "75 Shares",
      status: "Upcoming",
    },
    {
      name: "ABC Tech Ltd",
      openDate: "2025-04-01",
      closeDate: "2025-04-03",
      priceBand: "₹150 - ₹160",
      lotSize: "100 Shares",
      status: "Closed",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">📢 IPO Zone</h1>

      <table className="w-full border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Open Date</th>
            <th>Close Date</th>
            <th>Price Band</th>
            <th>Lot Size</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {ipoData.map((ipo, index) => (
            <tr key={index} className="text-center border">
              <td>{ipo.name}</td>
              <td>{ipo.openDate}</td>
              <td>{ipo.closeDate}</td>
              <td>{ipo.priceBand}</td>
              <td>{ipo.lotSize}</td>
              <td
                className={
                  ipo.status === "Upcoming"
                    ? "text-blue-500"
                    : "text-gray-400"
                }
              >
                {ipo.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}