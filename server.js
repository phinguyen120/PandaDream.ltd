import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

// ---- Company info (hard-coded for now, easy to wire to a DB later) ----
const company = {
  name: "Panda Dream",
  tagline: "iOS & Android app studio",
  intro: "We build native iOS and Android apps — designed to scale globally and monetized through IAA, IAP and hybrid models, reaching millions of users every month.",
  founded: 2026,
  hq: "Hanoi, Vietnam",
  email: "phinguyendinh120@gmail.com",
  platforms: ["iOS", "Android"],

  stats: [
    { value: 60,  suffix: "M+", label: "Global downloads" },
    { value: 12,  suffix: "",   label: "Products shipped" },
    { value: 150, suffix: "+",  label: "Countries reached" },
    { value: 4.6, suffix: "★",  label: "Average rating" }
  ],

  services: [
    { icon: "📲", title: "App Development", desc: "Native iOS and Android apps, engineered to scale to a global audience." },
    { icon: "🧰", title: "Utility & Productivity", desc: "Lightweight tools that solve real problems with smooth, friendly UX." },
    { icon: "📈", title: "User Acquisition", desc: "Data-driven advertising and growth campaigns that scale profitably." },
    { icon: "🎨", title: "UX / UI Design", desc: "Minimal, beautiful interfaces with the user experience at the center." }
  ],

  products: [
    { icon: "📄", name: "Panda Scan",  category: "Productivity",  rating: 4.7, desc: "Fast document scanner & PDF tools." },
    { icon: "📝", name: "Dream Notes", category: "Productivity",  rating: 4.6, desc: "Notes, tasks and reminders in one." },
    { icon: "🌤️", name: "Sky Weather", category: "Utilities",     rating: 4.4, desc: "Clean, accurate daily forecasts." },
    { icon: "✨", name: "Photo Panda", category: "Photo & Video", rating: 4.5, desc: "One-tap photo editing & filters." }
  ],

  // Monetization / business models
  business: [
    { tag: "IAA", icon: "📺", title: "In-App Advertising", desc: "Rewarded video, interstitial and banner ads — optimized fill rate and eCPM across global ad networks for high-volume, free-to-play titles." },
    { tag: "IAP", icon: "💎", title: "In-App Purchases", desc: "Consumables, subscriptions and premium upgrades that deepen engagement and lift lifetime value from paying users." },
    { tag: "Hybrid", icon: "⚡", title: "Hybrid Monetization", desc: "The best of both — blending ads and purchases with smart segmentation to maximize ARPDAU without hurting retention." }
  ],

  values: [
    { title: "Player-first", desc: "Every decision starts from the player's experience." },
    { title: "Driven by data", desc: "We measure, test and iterate relentlessly." },
    { title: "Simple & refined", desc: "Less but better — in our products and our process." }
  ]
};

app.get("/api/company", (req, res) => res.json(company));
app.get("/api/health", (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`\n  🐼 Panda Dream running at http://localhost:${PORT}\n`);
});
