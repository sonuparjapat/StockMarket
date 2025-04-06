const express = require("express");
const { getStocks, getOrderBook } = require("../controllers/stockController");

const router = express.Router();

router.get("/stocks", getStocks);
router.get("/orderbook", getOrderBook);

module.exports = router;