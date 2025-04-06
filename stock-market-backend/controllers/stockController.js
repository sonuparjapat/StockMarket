const { stocks, orderBook } = require("../utils/updateStocks");

exports.getStocks = (req, res) => {
  res.json({ status: 200, data: stocks });
};

exports.getOrderBook = (req, res) => {
  res.json({ status: 200, data: orderBook });
};