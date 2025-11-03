// agent.js
import { Agent } from "@mastra/core/agent";
import dotenv from "dotenv";
dotenv.config();

export const cryptoTrackerBot = new Agent({
  name: "crypto-tracker-bot",
  instructions: `
    You are a helpful cryptocurrency assistant.
    You can answer general crypto-related questions,
    provide insights about Bitcoin, Ethereum, and other coins,
    and guide users about the crypto market.
    If the user asks for a price, the data will be fetched from an API,
    so just confirm it politely.
    Keep your responses short, clear, and friendly.
  `,
  model: "gpt-4o-mini",
  openaiApiKey: process.env.OPENAI_API_KEY
});
