# 🧬 BioEdge India

> **Free AI-powered platform for biology & life sciences students across India**

[![Live Site](https://img.shields.io/badge/🌐_Live_Site-bioedgeindia.vercel.app-0d9488?style=for-the-badge)](https://bioedgeindia.vercel.app)
[![Built with Gemini](https://img.shields.io/badge/Powered_by-Gemini_AI-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

---

## 🌱 Why BioEdge India?

As a biology student in India, I kept hitting the same wall — resources were either **too expensive**, hidden behind paywalls, or simply didn't exist in one place. I couldn't find a free molecular docking certificate. Workshops cost thousands. AI tools for science felt out of reach.

So I built BioEdge India — **completely free**, built for students like me, by a student like me.

---

## ✨ What's on the Platform

| Feature | Description |
|---|---|
| 🤖 **AI Chatbot** | Gemini-powered biology assistant — ask anything about cells, genetics, ecology, and more |
| 🛠️ **30+ AI Tools** | Curated directory of AI tools useful for life science students and researchers |
| 💼 **Internship Board** | 20+ internship listings from CSIR, Biocon, IIT Delhi, DRDO, and other Indian organisations |
| 🗺️ **Career Roadmaps** | Step-by-step guides for careers in Biotech, Research, Bioinformatics, and more |
| 📰 **Bio News** | Simplified science news — CRISPR, genomics, drug discovery, and beyond |

---

## 🏗️ Tech Stack

```
Frontend     →  Single-file HTML + Vanilla JS + CSS
AI Backend   →  Google Gemini API (via Vercel Serverless Function)
Deployment   →  Vercel
Analytics    →  Google Analytics + Google Search Console
```

### Repo Structure

```
bioedge-india/
├── index.html          # Entire frontend — one file, zero frameworks
├── sitemap.xml         # For SEO & Google Search Console
├── vercel.json         # Deployment + API rewrite config
└── api/
    └── chat.js         # Serverless function — Gemini API proxy
```

---

## 🚀 Run Locally

1. **Clone the repo**
   ```bash
   git clone https://github.com/yourusername/bioedge-india.git
   cd bioedge-india
   ```

2. **Set up your Gemini API key**

   Create a `.env` file (or set environment variables in Vercel dashboard):
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

3. **Install Vercel CLI and run locally**
   ```bash
   npm install -g vercel
   vercel dev
   ```

4. Open `http://localhost:3000` in your browser.

> **Note:** The chatbot requires a Gemini API key. Get one free at [ai.google.dev](https://ai.google.dev/).

---

## 🌍 Deployment

This project is deployed on **Vercel**. The `vercel.json` config includes an API rewrite so the Gemini key stays server-side and is never exposed to the frontend.

```json
{
  "rewrites": [{ "source": "/api/:path*", "destination": "/api/:path*" }]
}
```

To deploy your own fork:
```bash
vercel --prod
```

---

## 🤝 Contributing

BioEdge India is a solo student project, but contributions are welcome!

- Found a bug? Open an **Issue**
- Want to add a resource or feature? Submit a **Pull Request**
- Have internship leads or tool suggestions? Reach out on [LinkedIn](https://linkedin.com/in/your-profile)

Please keep contributions aligned with the mission: **free, accessible, and genuinely useful for Indian biology students.**

---

## 📬 Connect

**Sanchit Kumar** — Founder, BioEdge India
B.Sc. Life Sciences, Sri Aurobindo College, Delhi University

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=flat-square&logo=linkedin)](https://linkedin.com/in/your-profile)
[![Email](https://img.shields.io/badge/Email-Reach_Out-D14836?style=flat-square&logo=gmail)](mailto:your@email.com)

---

## 📄 License

This project is open source under the [MIT License](LICENSE).

---

<p align="center">
  Built with 🧬 and zero budget · Made in India · For every biology student who couldn't afford the paywall
</p>
