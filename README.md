# 📘 AlvaCapital Backend

AlvaCapital is a modular backend service for trade replication and analytics, built with **Node.js**, **TypeScript**, and deployed on **Render**. It powers the AlvaCore dashboard, enabling real-time copier tracking, trade history, and strategy insights.

---

## 🚀 Features

- 🧠 Copier credential injection via `.env`
- 📊 Trade replication logic (placeholder-ready)
- 🔁 Queue service for async job handling
- 🧰 Redis stub for safe deployment without external dependencies
- 📦 Clean TypeScript build with `tsc`
- 🌐 REST API endpoints scaffolded for frontend integration

---

## 🛠️ Tech Stack

| Layer        | Tools & Frameworks           |
|--------------|------------------------------|
| Language     | TypeScript                   |
| Runtime      | Node.js (v22.16.0)           |
| Dev Tools    | ts-node-dev, dotenv          |
| Deployment   | Render                       |
| Queueing     | BullMQ (planned)             |
| Caching      | Redis (stubbed for now)      |

---

---

## 🧪 Local Development

```bash
# Install dependencies
npm install

# Run in dev mode
npm run dev

# Compile TypeScript
npm run build

# Run compiled app
npm start

---



