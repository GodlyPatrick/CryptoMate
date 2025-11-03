
````markdown
# 🪙 CryptoMate

CryptoMate is a friendly Telex AI agent that provides real-time cryptocurrency prices 🧠💰  
It uses the CoinGecko API to fetch live data and answer crypto-related questions.

---

## 🚀 Features
- Get **live prices** for any cryptocurrency  
- Ask **crypto-related questions** (e.g., Bitcoin halving, creation date, etc.)  
- Works seamlessly with **Telex A2A** integration  

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/cryptomate.git
cd cryptomate
````

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Add environment variables

Create a `.env` file in the project root using the `.env.example` file as a guide.

Example:

```bash
OPENAI_API_KEY=YOUR_OPENAI_API_KEY_HERE
PORT=8080
```

### 4️⃣ Run locally

```bash
npm run dev
```

Then open your browser and visit:
👉 `http://localhost:8080/healthcheck`

If it shows:
`🚀 Crypto Tracker Agent with dynamic search is live!`
you’re good to go 🎉

---

## 🧩 Telex Integration

### Step 1 — Create your Telex AI Colleague

Go to [Telex.im](https://telex.im) and create a new AI colleague named **CryptoMate**.

### Step 2 — Add your Workflow

Create a file called `workflow.json` in your project root and include something like this:

```json
{
  "active": true,
  "category": "utilities",
  "description": "A crypto tracker bot that provides real-time prices for cryptocurrencies.",
  "id": "cryptoTrackerBot123",
  "name": "crypto-tracker-bot",
  "nodes": [
    {
      "id": "crypto_tracker_bot_node",
      "name": "crypto-tracker-bot",
      "type": "a2a/mastra-a2a-node",
      "typeVersion": 1,
      "url": "https://your-public-url-from-railway.app"
    }
  ]
}
```

### Step 3 — Link to Telex

When you deploy your app (see below), copy the **public URL** from Railway and paste it in the `url` field of your `workflow.json`.
Then, in Telex, paste your workflow into the "Workflow" field of your colleague setup.

### Step 4 — Test It

Ask your bot:

> “What’s the price of Bitcoin?”
> or
> “When was Ethereum created?”

---

## 🌐 Deployment

You can deploy CryptoMate easily using **[Railway](https://railway.app)**:

1. Push this project to GitHub
2. Connect your repo to Railway
3. Add your `.env` variables
4. Deploy and get your public URL
5. Update your `workflow.json` with that new URL

---

## 🧾 Logs & Debugging

To view Telex-to-agent interactions, open:

```
https://api.telex.im/agent-logs/{your-channel-id}.txt
```

This lets you see what messages Telex sends to your bot and how your bot replies.

---

## 🛠️ Technologies

* **Node.js**
* **Express.js**
* **Mastra (Telex A2A)**
* **CoinGecko API**
* **Railway (Deployment)**

---

## 👨‍💻 Author

👤 **Godly Patrick Udoh**

* 📧 Email: [Udohgary1999@gmail.com](mailto:Udohgary1999@gmail.com)
* 💼 LinkedIn: [linkedin.com/in/godlypatrickudoh](http://www.linkedin.com/in/godlypatrickudoh)
* 💻 GitHub: [@GodlyPatrick](https://github.com/GodlyPatrick)

---

## 🎯 HNG Internship

This project is part of the [HNG Internship](https://hng.tech/internship) program.

Learn more about HNG:

* [HNG Internship](https://hng.tech/internship)
* [HNG Premium](https://hng.tech/premium)

---

## 🙏 Acknowledgments

* **HNG Internship** — for the learning opportunity
* **Express.js community** — for great documentation

---

*Built with ❤️ during HNG13 Internship*

```

---

