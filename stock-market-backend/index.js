const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const WebSocket = require("ws");

dotenv.config();

const app = express();
app.use(cors());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(bodyParser.json());

// Initial Stocks Data
let stocks = [
  { name: "Reliance", price: 2450, change: "+2.5%", volume: "10M", direction: "up" },
  { name: "TCS", price: 3500, change: "-1.2%", volume: "5M", direction: "down" },
  { name: "HDFC", price: 2900, change: "+0.8%", volume: "3M", direction: "up" },
];

// ✅ Order Book Data (Dummy)
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

// Function to Update Stocks Randomly
const updateStocks = () => {
  stocks = stocks.map((stock) => {
    const priceChange = (Math.random() * 20 - 10).toFixed(2); // Random -10 to +10
    const newPrice = (Number(stock.price) + Number(priceChange)).toFixed(2);
    const changePercentage = ((priceChange / stock.price) * 100).toFixed(2);

    return {
      ...stock,
      price: newPrice,
      change: `${changePercentage}%`,
      direction: priceChange >= 0 ? "up" : "down", // ✅ New field for frontend styling
    };
  });

  return stocks;
};

// Function to Update Order Book Randomly
const updateOrderBook = () => {
  orderBook.bids = orderBook.bids.map((bid) => ({
    price: bid.price + (Math.random() > 0.5 ? 1 : -1), // Random +1 or -1
    quantity: Math.floor(Math.random() * 300) + 50, // Random quantity
    total: bid.price * bid.quantity,
me : new Date().toLocaleTimeString()
  }));

  orderBook.asks = orderBook.asks.map((ask) => ({
    price: ask.price + (Math.random() > 0.5 ? 1 : -1), // Random +1 or -1
    quantity: Math.floor(Math.random() * 300) + 50, // Random quantity
    total: ask.price * ask.quantity,
    me : new Date().toLocaleTimeString()
  }));

  return orderBook;
};

// WebSocket Connection Handling
wss.on("connection", (ws) => {
  console.log("Client connected ✅");

  ws.send(JSON.stringify({ type: "stocks", data: stocks })); // Send initial stock data
  ws.send(JSON.stringify({ type: "orderBook", data: orderBook })); // Send initial order book data

  ws.on("message", (message) => {
    try {
      const parsedMessage = JSON.parse(message);

      if (parsedMessage.type === "subscribe") {
        if (parsedMessage.data === "stocks") {
          ws.send(JSON.stringify({ type: "stocks", data: stocks }));
        } else if (parsedMessage.data === "orderBook") {
          ws.send(JSON.stringify({ type: "orderBook", data: orderBook }));
        }
      }
    } catch (error) {
      console.error("Invalid message received ❌", error);
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected ❌");
  });
});

// Emit updated data every 3 sec (Stocks)
setInterval(() => {
  const updatedStocks = updateStocks();
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: "stocks", data: updatedStocks }));
    }
  });
}, 3000);

// Emit updated Order Book every 5 sec
setInterval(() => {
  const updatedOrderBook = updateOrderBook();
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: "orderBook", data: updatedOrderBook }));
    }
  });
}, 5000);

// Start Server
server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT} 🚀`);
});
