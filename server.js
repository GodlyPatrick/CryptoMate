// server.js
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import axios from "axios";
import { cryptoTrackerBot } from "./agent.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;

// ✅ Common coin shortcuts for quick lookup
const supportedCoins = {
  bitcoin: "bitcoin",
  btc: "bitcoin",
  ethereum: "ethereum",
  eth: "ethereum",
  solana: "solana",
  sol: "solana",
  dogecoin: "dogecoin",
  doge: "dogecoin",
  ton: "the-open-network",
};

// ✅ Function: Fetch crypto price from CoinGecko
async function getCryptoPrice(coinId) {
  try {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`;
    const res = await axios.get(url);
    if (res.data[coinId]?.usd) {
      return res.data[coinId].usd;
    }
    return null;
  } catch (error) {
    console.error("❌ Error fetching price:", error.message);
    return null;
  }
}

// ✅ Function: Dynamically find a coin ID by name
async function findCoinId(query) {
  try {
    const res = await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`);
    const coins = res.data.coins;
    if (coins && coins.length > 0) {
      return coins[0].id; // return top result
    }
    return null;
  } catch (error) {
    console.error("❌ Error searching for coin:", error.message);
    return null;
  }
}

// ✅ A2A Endpoint for Telex
app.post("/a2a", async (req, res) => {
  const { id, method, params } = req.body;

  if (method !== "sendMessage" || !params?.text) {
    return res.status(400).json({
      jsonrpc: "2.0",
      id,
      error: {
        code: -32601,
        message: "Invalid method or parameters",
      },
    });
  }

  const text = params.text.toLowerCase();
  const channelId = params.channelId;
  let reply = "";

  // Step 1️⃣ — Try matching supported coins
  let coinKey = Object.keys(supportedCoins).find((key) => text.includes(key));
  let coinId = coinKey ? supportedCoins[coinKey] : null;

  // Step 2️⃣ — If not in supported list, search dynamically
  if (!coinId) {
    coinId = await findCoinId(text);
  }

  // Step 3️⃣ — If we found a coin, fetch its price
  if (coinId) {
    const price = await getCryptoPrice(coinId);
    if (price) {
      reply = `💰 The current price of **${coinId.toUpperCase()}** is **$${price.toLocaleString()} USD**`;
    } else {
      reply = `⚠️ Sorry, I couldn't fetch the price for ${coinId}.`;
    }
  } else {
    // Step 4️⃣ — Fallback to Mastra AI for general crypto talk
    const aiResponse = await cryptoTrackerBot.run(text);
    reply = aiResponse.output || "🤖 I can provide real-time crypto prices — try asking for any coin!";
  }

  // ✅ Step 5️⃣ — Respond in valid A2A JSON-RPC format
  const response = {
    jsonrpc: "2.0",
    id,
    result: {
      type: "message",
      channelId,
      text: reply,
    },
  };

  console.log("Response sent:", response);
  res.json(response);
});

// Health route
app.get("/", (req, res) => res.send("🚀 Crypto Tracker Agent with dynamic search is live!"));

// Start server
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
