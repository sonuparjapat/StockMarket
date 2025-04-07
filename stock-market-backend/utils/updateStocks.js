let stocks = [
    { name: "Reliance", price: 2450, change: "+2.5%", volume: "10M", direction: "up" },
    { name: "TCS", price: 3500, change: "-1.2%", volume: "5M", direction: "down" },
    { name: "HDFC", price: 2900, change: "+0.8%", volume: "3M", direction: "up" },
    { name: "Reliance", price: 2450, change: "+2.5%", volume: "10M", direction: "up" },
    { name: "TCS", price: 3500, change: "-1.2%", volume: "5M", direction: "down" },
    { name: "HDFC", price: 2900, change: "+0.8%", volume: "3M", direction: "up" },
    { name: "Reliance", price: 2450, change: "+2.5%", volume: "10M", direction: "up" },
    { name: "TCS", price: 3500, change: "-1.2%", volume: "5M", direction: "down" },
    { name: "HDFC", price: 2900, change: "+0.8%", volume: "3M", direction: "up" },
    { name: "Reliance", price: 2450, change: "+2.5%", volume: "10M", direction: "up" },
    { name: "TCS", price: 3500, change: "-1.2%", volume: "5M", direction: "down" },
    { name: "HDFC", price: 2900, change: "+0.8%", volume: "3M", direction: "up" },
    { name: "Reliance", price: 2450, change: "+2.5%", volume: "10M", direction: "up" },
    { name: "TCS", price: 3500, change: "-1.2%", volume: "5M", direction: "down" },
    { name: "HDFC", price: 2900, change: "+0.8%", volume: "3M", direction: "up" },
  ];
  
  const orderBook = {
    bids: [
      { price: 2450, quantity: 100, total: 245000, me: new Date().toLocaleTimeString() },
      { price: 2449, quantity: 200, total: 489800, me: new Date().toLocaleTimeString() },
    ],
    asks: [
      { price: 2451, quantity: 150, total: 367650, me: new Date().toLocaleTimeString() },
      { price: 2452, quantity: 180, total: 441360, me: new Date().toLocaleTimeString() },
    ],
  };
  
  const updateStocks = () => {
    stocks = stocks.map((stock) => {
      const priceChange = (Math.random() * 20 - 10).toFixed(2);
      const newPrice = (Number(stock.price) + Number(priceChange)).toFixed(2);
      const changePercentage = ((priceChange / stock.price) * 100).toFixed(2);
  
      return {
        ...stock,
        price: newPrice,
        change: `${changePercentage}%`,
        direction: priceChange >= 0 ? "up" : "down",
      };
    });
  };
  
  const getStocks = () => stocks;
  const getOrderBook = () => orderBook;
  console.log(getStocks())
  module.exports = { updateStocks, getStocks, getOrderBook };
  