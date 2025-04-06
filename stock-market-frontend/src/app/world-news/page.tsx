"use client";

export default function WorldNewsPage() {
  const newsData = [
    {
      title: "Global Markets Rally Ahead of Fed Decision",
      description:
        "Stock markets across the globe surged today as investors anticipate a pause in interest rate hikes by the US Federal Reserve.",
      source: "Bloomberg",
      time: "2 hours ago",
    },
    {
      title: "Oil Prices Hit 3-Month High",
      description:
        "Crude oil prices jumped to a 3-month high due to rising demand and supply cuts by OPEC countries.",
      source: "Reuters",
      time: "5 hours ago",
    },
    {
      title: "Bitcoin Crosses $70,000 Mark",
      description:
        "Cryptocurrency market is witnessing a strong bullish trend with Bitcoin leading the rally.",
      source: "CoinDesk",
      time: "1 hour ago",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">🌍 World Finance News</h1>

      <div className="grid gap-4">
        {newsData.map((news, index) => (
          <div
            key={index}
            className="border rounded-xl p-4 hover:shadow transition"
          >
            <h2 className="text-lg font-semibold">{news.title}</h2>
            <p className="text-gray-600 my-2">{news.description}</p>
            <div className="text-sm text-gray-400 flex justify-between">
              <span>{news.source}</span>
              <span>{news.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}