const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const WebSocket = require("ws"); // ✅ FIXED: Use correct case

dotenv.config();

const app = express();
app.use(cors());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server }); // ✅ FIXED: Correct reference

app.use(bodyParser.json());

let stocks = [
  { name: "Reliance", price: 2450, change: "+2.5%", volume: "10M" },
  { name: "TCS", price: 3500, change: "-1.2%", volume: "5M" },
  { name: "HDFC", price: 2900, change: "+0.8%", volume: "3M" },
];

const updateStocks = () => {
  stocks = stocks.map((stock) => ({
    ...stock,
    price: (Number(stock.price) + (Math.random() * 20 - 10)).toFixed(2),
    change: `${(Math.random() * 4 - 2).toFixed(2)}%`,
  }));
  return stocks;
};

// Update every 3 seconds
setInterval(() => {
  const updatedStocks = updateStocks();
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(updatedStocks));
    }
  });
}, 3000);

wss.on("connection", (ws) => {
  console.log("Client connected");
  ws.send(JSON.stringify(stocks));

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});