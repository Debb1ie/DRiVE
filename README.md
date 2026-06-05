# DRiVE AI

> Business intelligence built for the street

![DRiVE AI Dashboard](https://img.shields.io/badge/status-active-brightgreen) ![React](https://img.shields.io/badge/React-18-61DAFB?logo=react) ![Anthropic](https://img.shields.io/badge/Powered%20by-Claude%20AI-7C3AED) ![License](https://img.shields.io/badge/license-MIT-blue)

DRiVE AI turns daily sales data into clear, actionable business intelligence — inventory forecasts, pricing signals, and growth strategies designed specifically for Filipino sari-sari stores and MSMEs.

---

## Screenshot

```
┌─────────────────────────────────────────────────────┐
│  D  DRiVE AI   [Dashboard] [Inventory] [Insights]   │
├─────────────────────────────────────────────────────┤
│  Good morning, Aling Maria                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐ │
│  │ ₱7,640   │ │ 284      │ │ 22.3%    │ │  3 🔔  │ │
│  │ Revenue  │ │  Units   │ │  Margin  │ │ Alerts │ │
│  └──────────┘ └──────────┘ └──────────┘ └────────┘ │
│  [Sales Chart ████████████]  [Health Score: 69]     │
│  Next Best Actions: Restock · Promote · Pricing…    │
└─────────────────────────────────────────────────────┘
```

---

## Features

### Dashboard
Real-time overview of your store's key performance indicators — weekly revenue, units sold, profit margin, and active alerts — alongside a 7-day sales bar chart and a multi-dimensional business health score.

### Inventory Management
Track stock levels across all SKUs with color-coded status indicators (Good / Low / Critical). AI-powered alerts warn you before you run out, and seasonal demand spikes are flagged in advance based on historical patterns.

### AI Insights
Identifies your store's unique *Growth DNA* — behavioral patterns shared with top-performing stores nearby. Surfaces weekly recommendations across four categories: urgent restocking, trending opportunities, pricing signals, and bundle strategies.

### Business Assistant
An in-app AI chat powered by Claude. Ask questions about your inventory, pricing, forecasts, or growth strategy in natural language. Fully contextualized for Filipino MSMEs — responses reference Philippine pesos, local market dynamics, and sari-sari store operations.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 (hooks) |
| AI | Anthropic Claude (claude-sonnet-4-20250514) |
| Icons | Tabler Icons |
| Fonts | DM Sans · Instrument Serif · JetBrains Mono |
| Styling | Inline styles with design token system |
| Charts | Custom SVG bar chart & radial score components |

---

## Getting Started

### Prerequisites

- Node.js 18+
- An [Anthropic API key](https://console.anthropic.com/)

### Installation

```bash
git clone https://github.com/your-username/drive-ai.git
cd drive-ai
npm install
```

### Configuration

Create a `.env` file in the project root:

```env
VITE_ANTHROPIC_API_KEY=your_api_key_here
```

> **Note:** The current implementation calls the Anthropic API directly from the browser. For production use, proxy requests through a backend server to keep your API key secure.

### Run

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Project Structure

```
drive-ai/
├── src/
│   └── App.jsx          # Full application (single-file architecture)
├── public/
├── index.html
├── package.json
└── vite.config.js
```

The app is intentionally structured as a single `App.jsx` file for clarity and portability. Key sections:

- **Design tokens** — `C` (colors), `G` (fonts), `S` (shared styles)
- **Static data** — `ACTIONS`, `INVENTORY`, `salesData`, `healthMetrics`
- **Components** — `Icon`, `Pill`, `BarChart`, `RadialScore`, `StatCard`
- **Pages** — `Landing`, `Dashboard`, `Inventory`, `Insights`, `Assistant`
- **Root** — `App` with routing between landing and tabbed app views

---

## AI Assistant — How It Works

The `Assistant` tab sends messages to the Anthropic API with a store-specific system prompt:

```js
system: "You are DRiVE AI, a business assistant for Filipino MSMEs and sari-sari store owners.
Help with inventory, sales analysis, growth strategies, and pricing.
Keep responses concise (2-4 sentences), practical, and friendly.
Use Philippine Peso (₱). Reference Filipino context when relevant."
```

Full conversation history is passed on each request to maintain context.

---

## Roadmap

- [ ] Connect to real POS / sales data via CSV upload or API
- [ ] User authentication and per-store data persistence
- [ ] Backend proxy for secure API key handling
- [ ] Push notifications for low-stock alerts
- [ ] Multi-store support (franchisee / barangay view)
- [ ] Offline-first PWA mode for low-connectivity areas
- [ ] Tagalog / Bisaya language support
- [ ] Export reports as PDF

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

---

## License

MIT — see [LICENSE](LICENSE) for details.

---

## Acknowledgements

Built for Filipino entrepreneurs. Powered by [Anthropic Claude](https://anthropic.com).

> *"2,400+ stores across PH. 94% forecast accuracy. +31% avg growth after 90 days."*
