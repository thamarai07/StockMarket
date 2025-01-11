const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParse = require("body-parser");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParse.json());

mongoose.connect(
  "mongodb+srv://thamaraik69:A3YZ1MIBZRtQVlAt@cluster0.vbvk4.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const stockSchema = new mongoose.Schema({
  company: String,
  description: String,
  initial_price: Number,
  price_2002: Number,
  price_2007: Number,
  symbol: String,
});

const Stock = mongoose.model("Stock", stockSchema);

app.get("/api/stock", async (req, res) => {
  try {
    const stock = await Stock.find();
    res.json(stock);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server Error" });
  }
});

app.post("/api/watchlist", async (req, res) => {
  try {
    const {
      company,
      description,
      initial_price,
      price_2002,
      price_2007,
      symbol,
    } = req.body;

    const stock = new Stock({
      company,
      description,
      initial_price,
      price_2002,
      price_2007,
      symbol,
    });
    await stock.save();
    res.json({ message: "Stock added to watchlist successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: " InterNal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
