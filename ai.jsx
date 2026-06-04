import { useState, useEffect, useRef } from "react";

const C = {
  black: "#09090B",
  surface: "#111116",
  surface2: "#18181F",
  surface3: "#22222C",
  surface4: "#2A2A38",
  border: "rgba(255,255,255,0.06)",
  border2: "rgba(255,255,255,0.10)",
  border3: "rgba(255,255,255,0.16)",
  purple: "#7C3AED",
  purpleLight: "#8B5CF6",
  purplePale: "#A78BFA",
  purpleFaint: "rgba(124,58,237,0.12)",
  purpleFaint2: "rgba(139,92,246,0.18)",
  white: "#FFFFFF",
  offWhite: "#F4F4F6",
  muted: "#71717A",
  faint: "#3F3F47",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  successFaint: "rgba(16,185,129,0.10)",
  warningFaint: "rgba(245,158,11,0.10)",
  dangerFaint: "rgba(239,68,68,0.10)",
};

const G = {
  heading: `"Instrument Serif", "DM Serif Display", Georgia, serif`,
  body: `"DM Sans", "Helvetica Neue", sans-serif`,
  mono: `"JetBrains Mono", monospace`,
};

const noiseStyle = {
  position: "relative",
};

const noiseOverlay = {
  position: "absolute",
  inset: 0,
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
  backgroundRepeat: "repeat",
  backgroundSize: "128px 128px",
  pointerEvents: "none",
  zIndex: 0,
};

const gridOverlay = {
  position: "absolute",
  inset: 0,
  backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
  backgroundSize: "60px 60px",
  pointerEvents: "none",
  zIndex: 0,
};

const S = {
  app: {
    minHeight: "100vh",
    background: C.black,
    fontFamily: G.body,
    color: C.white,
    overflowX: "hidden",
  },
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 200,
    background: "rgba(9,9,11,0.85)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderBottom: `1px solid ${C.border}`,
    height: 60,
    display: "flex",
    alignItems: "center",
    padding: "0 32px",
    justifyContent: "space-between",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontFamily: G.body,
    fontWeight: 700,
    fontSize: 17,
    letterSpacing: "-0.3px",
    color: C.white,
    textDecoration: "none",
    cursor: "pointer",
  },
  logoMark: {
    width: 30,
    height: 30,
    borderRadius: 8,
    background: C.purple,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 13,
    fontWeight: 700,
    color: "#fff",
  },
  navCenter: {
    display: "flex",
    gap: 2,
    background: C.surface,
    border: `1px solid ${C.border}`,
    borderRadius: 10,
    padding: 3,
  },
  navTab: {
    background: "none",
    border: "none",
    color: C.muted,
    fontSize: 13,
    fontWeight: 500,
    padding: "5px 14px",
    borderRadius: 7,
    cursor: "pointer",
    fontFamily: G.body,
    transition: "all 0.15s",
    display: "flex",
    alignItems: "center",
    gap: 6,
    whiteSpace: "nowrap",
  },
  navTabActive: {
    background: C.surface3,
    color: C.white,
    border: `1px solid ${C.border2}`,
  },
  pill: {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    padding: "3px 10px",
    borderRadius: 99,
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.3px",
  },
  card: {
    background: C.surface,
    border: `1px solid ${C.border}`,
    borderRadius: 16,
    padding: "22px 24px",
  },
  cardSm: {
    background: C.surface,
    border: `1px solid ${C.border}`,
    borderRadius: 12,
    padding: "16px 18px",
  },
  btn: {
    fontFamily: G.body,
    fontWeight: 600,
    borderRadius: 10,
    cursor: "pointer",
    border: "none",
    transition: "all 0.15s",
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    fontSize: 14,
  },
  btnPrimary: {
    background: C.purple,
    color: "#fff",
    padding: "10px 20px",
  },
  btnGhost: {
    background: "transparent",
    color: C.muted,
    padding: "9px 18px",
    border: `1px solid ${C.border2}`,
    color: C.white,
  },
  input: {
    background: C.surface2,
    border: `1px solid ${C.border2}`,
    borderRadius: 10,
    color: C.white,
    padding: "10px 14px",
    fontSize: 14,
    fontFamily: G.body,
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    transition: "border-color 0.15s",
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "1.2px",
    color: C.purplePale,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  h1: {
    fontFamily: G.heading,
    fontWeight: 400,
    fontSize: 56,
    lineHeight: 1.1,
    letterSpacing: "-1.5px",
    margin: 0,
  },
  h2: {
    fontFamily: G.heading,
    fontWeight: 400,
    fontSize: 36,
    lineHeight: 1.2,
    letterSpacing: "-0.8px",
    margin: 0,
  },
  h3: {
    fontFamily: G.body,
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 1.4,
    margin: 0,
  },
  divider: {
    height: 1,
    background: C.border,
    margin: "0",
  },
};

// ─── DATA ───────────────────────────────────────────────────────────────────

const ACTIONS = [
  { icon: "ti-package", bg: C.dangerFaint, color: C.danger, title: "Restock Canned Goods", desc: "Stock depletes in ~3 days based on velocity", tag: "URGENT", tagColor: C.danger },
  { icon: "ti-trending-up", bg: C.purpleFaint, color: C.purplePale, title: "Promote Top Sellers", desc: "Instant noodles trending +28% above weekly avg", tag: "OPPORTUNITY", tagColor: C.purplePale },
  { icon: "ti-coin", bg: C.warningFaint, color: C.warning, title: "Review Rice Pricing", desc: "Competitors priced ₱2/kg lower — protect margin", tag: "INSIGHT", tagColor: C.warning },
  { icon: "ti-chart-dots-2", bg: C.successFaint, color: C.success, title: "Bundle Snacks + Drinks", desc: "Proven pattern from 12 similar stores nearby", tag: "GROWTH", tagColor: C.success },
];

const INVENTORY = [
  { name: "Instant Noodles", stock: 48, max: 60, status: "good" },
  { name: "Canned Sardines", stock: 6, max: 60, status: "critical" },
  { name: "Rice (per kilo)", stock: 32, max: 50, status: "low" },
  { name: "Cooking Oil (1L)", stock: 22, max: 40, status: "low" },
  { name: "Mineral Water", stock: 55, max: 60, status: "good" },
  { name: "Laundry Soap", stock: 18, max: 30, status: "good" },
];

const statusCfg = {
  good: { color: C.success, label: "Good", bg: C.successFaint },
  low: { color: C.warning, label: "Low", bg: C.warningFaint },
  critical: { color: C.danger, label: "Critical", bg: C.dangerFaint },
};

const salesData = [820, 650, 940, 770, 1120, 1380, 980];
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const healthMetrics = [
  { label: "Sales", score: 78, color: C.success },
  { label: "Inventory", score: 55, color: C.warning },
  { label: "Margin", score: 63, color: C.purplePale },
  { label: "Growth", score: 82, color: C.purpleLight },
];

const CHAT_INIT = [{
  role: "ai",
  text: "Hello! I'm your DRiVE AI business assistant. I can help with sales forecasts, inventory, and growth strategy. What do you need?",
}];

const SUGGESTIONS = [
  "What should I restock this week?",
  "How are my sales trending?",
  "Best product to promote?",
  "Tips to increase revenue",
];

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

function Icon({ name, size = 16, style = {} }) {
  return <i className={`ti ${name}`} style={{ fontSize: size, lineHeight: 1, ...style }} aria-hidden="true" />;
}

function Pill({ label, color, bg }) {
  return (
    <span style={{ ...S.pill, background: bg || `${color}18`, color }}>
      {label}
    </span>
  );
}

function BarChart({ data, labels }) {
  const max = Math.max(...data);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 88 }}>
      {data.map((v, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
          <div style={{
            width: "100%",
            height: `${(v / max) * 76}px`,
            background: i === 5 ? C.purple : C.surface4,
            borderRadius: "3px 3px 0 0",
            border: i === 5 ? `1px solid ${C.purpleLight}` : `1px solid ${C.border}`,
          }} />
          <span style={{ fontSize: 9, color: C.faint, fontFamily: G.mono }}>{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}

function RadialScore({ score, color, size = 52 }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={C.surface3} strokeWidth={4} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={4}
          strokeDasharray={`${dash} ${circ-dash}`} strokeLinecap="round" />
      </svg>
      <span style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 11, fontWeight: 700, fontFamily: G.mono, color: C.white,
      }}>{score}</span>
    </div>
  );
}

function StatCard({ label, value, delta, color, icon }) {
  const isPositive = delta && !delta.startsWith("-");
  return (
    <div style={{ ...S.cardSm, display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 11, color: C.muted, letterSpacing: "0.3px", textTransform: "uppercase", fontWeight: 600 }}>{label}</span>
        {icon && <div style={{ width: 28, height: 28, borderRadius: 7, background: C.surface3, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name={icon} size={14} style={{ color: C.muted }} />
        </div>}
      </div>
      <div>
        <div style={{ fontFamily: G.mono, fontSize: 24, fontWeight: 700, color: color || C.white, letterSpacing: "-0.5px" }}>{value}</div>
        {delta && <div style={{ fontSize: 12, color: isPositive ? C.success : C.danger, marginTop: 3, display: "flex", alignItems: "center", gap: 4 }}>
          <Icon name={isPositive ? "ti-arrow-up-right" : "ti-arrow-down-right"} size={12} />
          {delta}
        </div>}
      </div>
    </div>
  );
}

// ─── LANDING ─────────────────────────────────────────────────────────────────

function Landing({ onEnter }) {
  return (
    <div style={{ ...noiseStyle, minHeight: "100vh" }}>
      <div style={noiseOverlay} />
      <div style={gridOverlay} />

      {/* Hero */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>
        <div style={{ paddingTop: 100, paddingBottom: 80 }}>
          {/* eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.success, boxShadow: `0 0 8px ${C.success}` }} />
            <span style={{ fontSize: 12, color: C.muted, letterSpacing: "0.5px" }}>Now available for Filipino MSMEs</span>
          </div>

          {/* title */}
          <div style={{ maxWidth: 680, marginBottom: 28 }}>
            <h1 style={{ ...S.h1, marginBottom: 4 }}>
              <span style={{ color: C.white }}>Business intelligence</span>
            </h1>
            <h1 style={{ ...S.h1, color: C.purplePale, fontStyle: "italic" }}>
              built for the street.
            </h1>
          </div>

          <p style={{ color: C.muted, fontSize: 18, lineHeight: 1.7, maxWidth: 480, marginBottom: 40 }}>
            DRiVE AI turns your daily sales into clear actions — inventory forecasts, pricing signals, and growth strategies designed for sari-sari stores.
          </p>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button onClick={onEnter} style={{ ...S.btn, ...S.btnPrimary, fontSize: 15, padding: "12px 28px" }}>
              <Icon name="ti-layout-dashboard" size={16} />
              Enter Dashboard
            </button>
            <button style={{ ...S.btn, ...S.btnGhost }}>
              <Icon name="ti-player-play" size={14} />
              Watch Demo
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1,
          background: C.border, borderRadius: 16, overflow: "hidden",
          border: `1px solid ${C.border}`, marginBottom: 80,
        }}>
          {[
            { label: "Revenue tracked", value: "₱7,640", sub: "this week" },
            { label: "Stores powered", value: "2,400+", sub: "across PH" },
            { label: "Forecast accuracy", value: "94%", sub: "demand model" },
            { label: "Avg growth", value: "+31%", sub: "after 90 days" },
          ].map((s, i) => (
            <div key={i} style={{ background: C.surface, padding: "28px 24px" }}>
              <div style={{ fontFamily: G.mono, fontSize: 28, fontWeight: 700, color: i === 0 ? C.purplePale : C.white, marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 13, color: C.muted }}>{s.label}</div>
              <div style={{ fontSize: 11, color: C.faint, marginTop: 2 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Feature grid */}
        <div style={{ marginBottom: 32 }}>
          <p style={S.sectionLabel}>Platform Features</p>
          <h2 style={{ ...S.h2, maxWidth: 440, marginBottom: 48 }}>
            Every decision, backed by data.
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: C.border, borderRadius: 16, overflow: "hidden", border: `1px solid ${C.border}`, marginBottom: 80 }}>
          {[
            { icon: "ti-dna-2", title: "Growth DNA Engine", desc: "Identifies your unique business success patterns and highlights what drives your best performance days.", stat: "12 patterns found", color: C.purplePale },
            { icon: "ti-bolt", title: "Success Replication", desc: "Learns from top-performing stores in your area and recommends proven strategies you can apply today.", stat: "48 peer insights", color: C.success },
            { icon: "ti-target-arrow", title: "Demand Forecast", desc: "Predicts what products you'll need over the next 7–30 days based on sales trends and local seasonality.", stat: "94% accuracy", color: C.warning },
            { icon: "ti-chart-histogram", title: "Sales Analytics", desc: "Understand your revenue patterns, best-selling SKUs, and when your customers shop most.", stat: "Real-time data", color: C.purpleLight },
            { icon: "ti-package", title: "Smart Inventory", desc: "Get alerts before you run out. AI calculates restock timing so you never miss a sale.", stat: "Zero stockouts", color: C.danger },
            { icon: "ti-message-chatbot", title: "Business Assistant", desc: "Chat with an AI that knows your store data and answers business questions in plain Filipino context.", stat: "Always on", color: C.purplePale },
          ].map((f, i) => (
            <div key={i} style={{ background: C.surface, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: C.surface3, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name={f.icon} size={18} style={{ color: f.color }} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 8, color: C.white }}>{f.title}</div>
                <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{f.desc}</div>
              </div>
              <div style={{ marginTop: "auto", fontSize: 12, color: f.color, display: "flex", alignItems: "center", gap: 5 }}>
                <Icon name="ti-circle-dot" size={10} style={{ color: f.color }} />
                {f.stat}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div style={{
          ...S.card,
          background: C.surface2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          marginBottom: 80,
          borderColor: C.border2,
        }}>
          <div>
            <div style={{ ...S.sectionLabel, marginBottom: 8 }}>Get Started</div>
            <h2 style={{ ...S.h2, fontSize: 26, marginBottom: 8 }}>Ready to grow your store?</h2>
            <p style={{ color: C.muted, fontSize: 14, margin: 0 }}>Connect in minutes. No technical skills required.</p>
          </div>
          <button onClick={onEnter} style={{ ...S.btn, ...S.btnPrimary, padding: "12px 28px", whiteSpace: "nowrap" }}>
            <Icon name="ti-arrow-right" size={16} />
            Launch App
          </button>
        </div>

        {/* Footer */}
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 32, paddingBottom: 40, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={S.logoMark}>D</div>
            <span style={{ fontWeight: 700, fontSize: 16 }}>DRiVE <span style={{ color: C.purplePale }}>AI</span></span>
          </div>
          <span style={{ fontSize: 12, color: C.faint }}>Built for Filipino entrepreneurs</span>
        </div>
      </div>
    </div>
  );
}

// ─── DASHBOARD ───────────────────────────────────────────────────────────────

function Dashboard() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Welcome row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", paddingTop: 8 }}>
        <div>
          <div style={S.sectionLabel}>Overview</div>
          <h2 style={{ ...S.h2, fontSize: 28, marginBottom: 6 }}>Good morning, Aling Maria</h2>
          <p style={{ color: C.muted, fontSize: 14, margin: 0 }}>Here's what's happening with your store today.</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "8px 14px" }}>
            {healthMetrics.map((m) => (
              <div key={m.label} title={`${m.label}: ${m.score}`}>
                <RadialScore score={m.score} color={m.color} size={36} />
              </div>
            ))}
            <div style={{ marginLeft: 4 }}>
              <div style={{ fontSize: 11, color: C.muted, marginBottom: 2 }}>Health Score</div>
              <div style={{ fontFamily: G.mono, fontSize: 18, fontWeight: 700, color: C.white }}>69</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
        <StatCard label="Weekly Revenue" value="₱7,640" delta="+12.4%" icon="ti-cash" />
        <StatCard label="Units Sold" value="284" delta="+8.1%" icon="ti-shopping-bag" />
        <StatCard label="Profit Margin" value="22.3%" delta="-1.2%" icon="ti-percentage" />
        <StatCard label="Active Alerts" value="3" color={C.danger} icon="ti-bell-ringing" />
      </div>

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 12 }}>
        <div style={S.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.muted }}>Weekly Sales (₱)</div>
            <Pill label="↑ vs last week" color={C.success} />
          </div>
          <BarChart data={salesData} labels={weekDays} />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14, paddingTop: 14, borderTop: `1px solid ${C.border}` }}>
            <span style={{ fontSize: 12, color: C.muted, display: "flex", alignItems: "center", gap: 5 }}>
              <Icon name="ti-star" size={12} style={{ color: C.warning }} />
              Best: Saturday ₱1,380
            </span>
            <span style={{ fontSize: 12, color: C.muted }}>7-day avg ₱951</span>
          </div>
        </div>

        <div style={S.card}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.muted, marginBottom: 16 }}>Business Health</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {healthMetrics.map((m) => (
              <div key={m.label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 13, color: C.muted, width: 72 }}>{m.label}</span>
                <div style={{ flex: 1, height: 6, background: C.surface3, borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${m.score}%`, background: m.color, borderRadius: 3 }} />
                </div>
                <span style={{ fontFamily: G.mono, fontSize: 12, color: C.white, width: 28, textAlign: "right" }}>{m.score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div style={S.card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.muted }}>Next Best Actions</div>
          <Pill label="4 recommendations" color={C.purplePale} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {ACTIONS.map((a, i) => (
            <div key={i} style={{ ...S.cardSm, background: C.surface2, display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: a.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon name={a.icon} size={16} style={{ color: a.color }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{a.title}</span>
                  <Pill label={a.tag} color={a.tagColor} />
                </div>
                <p style={{ fontSize: 12, color: C.muted, margin: 0, lineHeight: 1.5 }}>{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
        {[
          { icon: "ti-dna-2", title: "Growth DNA Engine", color: "#A78BFA", stat: "12 patterns", desc: "Identifies your unique success patterns and top-performance drivers." },
          { icon: "ti-bolt", title: "Success Replication", color: C.success, stat: "48 peer insights", desc: "Proven strategies from top-performing stores in your region." },
          { icon: "ti-target-arrow", title: "Demand Forecast", color: "#7B9FFF", stat: "94% accuracy", desc: "Predicts your inventory needs over the next 7–30 days." },
        ].map((f) => (
          <div key={f.title} style={{ ...S.card, background: C.surface2 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: C.surface3, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
              <Icon name={f.icon} size={18} style={{ color: f.color }} />
            </div>
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6 }}>{f.title}</div>
            <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6, marginBottom: 14 }}>{f.desc}</div>
            <Pill label={f.stat} color={f.color} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── INVENTORY ───────────────────────────────────────────────────────────────

function Inventory() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, paddingTop: 8 }}>
      <div>
        <div style={S.sectionLabel}>Stock Management</div>
        <h2 style={{ ...S.h2, fontSize: 28 }}>Inventory Overview</h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
        <StatCard label="Total Items" value="38" icon="ti-list" />
        <StatCard label="Needs Restock" value="5" color={C.danger} icon="ti-alert-triangle" />
        <StatCard label="Well Stocked" value="29" color={C.success} icon="ti-circle-check" />
        <StatCard label="Overstock" value="4" color={C.warning} icon="ti-alert-circle" />
      </div>

      <div style={S.card}>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.muted, marginBottom: 20 }}>Stock Levels — Key Items</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {INVENTORY.map((item, i) => {
            const cfg = statusCfg[item.status];
            const pct = (item.stock / item.max) * 100;
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 16, padding: "14px 0",
                borderBottom: i < INVENTORY.length - 1 ? `1px solid ${C.border}` : "none",
              }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: cfg.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon name="ti-package" size={14} style={{ color: cfg.color }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{item.name}</span>
                    <span style={{ fontSize: 12, color: C.muted, fontFamily: G.mono }}>{item.stock}/{item.max}</span>
                  </div>
                  <div style={{ height: 5, background: C.surface3, borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: cfg.color, borderRadius: 3 }} />
                  </div>
                </div>
                <Pill label={cfg.label} color={cfg.color} />
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={{ ...S.card, background: C.surface2, border: `1px solid ${C.dangerFaint}` }}>
          <div style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
            <Icon name="ti-alert-triangle" size={16} style={{ color: C.danger, marginTop: 1 }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.danger, marginBottom: 4 }}>Critical: Canned Sardines</div>
              <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.6 }}>6 units remaining. Based on 7-day velocity, you'll run out by tomorrow evening. Order at least 48 units today.</div>
            </div>
          </div>
        </div>
        <div style={{ ...S.card, background: C.surface2, border: `1px solid ${C.warningFaint}` }}>
          <div style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
            <Icon name="ti-trending-up" size={16} style={{ color: C.warning, marginTop: 1 }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.warning, marginBottom: 4 }}>Increase: Rice & Cooking Oil</div>
              <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.6 }}>Fiesta season approaching — historical data shows a 35% demand spike. Stock up 2 weeks early to avoid shortages.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── INSIGHTS ────────────────────────────────────────────────────────────────

function Insights() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, paddingTop: 8 }}>
      <div>
        <div style={S.sectionLabel}>AI Analysis</div>
        <h2 style={{ ...S.h2, fontSize: 28 }}>Insights & Recommendations</h2>
      </div>

      {/* Growth DNA */}
      <div style={{
        ...S.card,
        background: C.surface2,
        border: `1px solid ${C.border2}`,
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 80% 50%, ${C.purpleFaint2} 0%, transparent 65%)`, pointerEvents: "none" }} />
        <div style={{ position: "relative", display: "flex", gap: 16, alignItems: "flex-start" }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: C.purpleFaint2, border: `1px solid ${C.border3}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icon name="ti-dna-2" size={20} style={{ color: C.purplePale }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Your Growth DNA Pattern</div>
            <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.7, marginBottom: 14 }}>
              Your store performs <span style={{ color: C.success, fontWeight: 600 }}>41% better on Saturdays</span> when you stock snacks + beverages together. You share this pattern with 7 top-earners in Quezon City. The key driver: bundled display placement.
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["Weekend boost", "Bundle sales", "Snack-heavy", "Morning rush"].map((t) => (
                <span key={t} style={{ ...S.pill, background: C.purpleFaint, color: C.purplePale, border: `1px solid ${C.purpleFaint2}` }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.muted, marginBottom: 12 }}>This Week's Recommendations</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {ACTIONS.map((a, i) => (
            <div key={i} style={{ ...S.card, background: C.surface2, flexDirection: "row", display: "flex", alignItems: "center", gap: 14, padding: "16px 20px" }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: a.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon name={a.icon} size={17} style={{ color: a.color }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 3 }}>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{a.title}</span>
                  <Pill label={a.tag} color={a.tagColor} />
                </div>
                <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>{a.desc}</p>
              </div>
              <button style={{ ...S.btn, ...S.btnGhost, fontSize: 12, padding: "7px 16px", color: C.muted }}>
                <Icon name="ti-arrow-right" size={13} />
                Act
              </button>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={S.card}>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 12 }}>
            <Icon name="ti-calendar-stats" size={16} style={{ color: C.purplePale, marginTop: 1 }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: C.muted }}>Seasonal Forecast — Next 30 Days</span>
          </div>
          <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, margin: 0 }}>
            Expect a <span style={{ color: C.success, fontWeight: 600 }}>+22% increase</span> in beverages and snacks during the upcoming long weekend. Plan inventory 10 days in advance based on last year's data.
          </p>
        </div>
        <div style={S.card}>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 12 }}>
            <Icon name="ti-users-group" size={16} style={{ color: C.purplePale, marginTop: 1 }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: C.muted }}>Peer Benchmark</span>
          </div>
          <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, margin: 0 }}>
            You earn <span style={{ color: C.warning, fontWeight: 600 }}>₱890/day</span> vs. top stores at <span style={{ color: C.success, fontWeight: 600 }}>₱1,340/day</span>. Gap is mainly in missed upsell moments and slow restock cycles.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── ASSISTANT ────────────────────────────────────────────────────────────────

function Assistant() {
  const [messages, setMessages] = useState(CHAT_INIT);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(text) {
    if (!text.trim() || loading) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setLoading(true);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: "You are DRiVE AI, a business assistant for Filipino MSMEs and sari-sari store owners. Help with inventory, sales analysis, growth strategies, and pricing. Keep responses concise (2-4 sentences), practical, and friendly. Use Philippine Peso (₱). Reference Filipino context when relevant.",
          messages: messages.filter((m) => m !== CHAT_INIT[0] || m.role !== "ai").map((m) => ({
            role: m.role === "ai" ? "assistant" : "user",
            content: m.text,
          })).concat([{ role: "user", content: text }]),
        }),
      });
      const data = await response.json();
      const reply = data.content?.[0]?.text || "Sorry, I couldn't get a response.";
      setMessages((m) => [...m, { role: "ai", text: reply }]);
    } catch {
      setMessages((m) => [...m, { role: "ai", text: "Network error. Please try again." }]);
    }
    setLoading(false);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, paddingTop: 8 }}>
      <div>
        <div style={S.sectionLabel}>AI Chat</div>
        <h2 style={{ ...S.h2, fontSize: 28 }}>Business Assistant</h2>
      </div>

      <div style={{ ...S.card, display: "flex", flexDirection: "column", height: 480 }}>
        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "4px 0 12px", display: "flex", flexDirection: "column", gap: 10 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: "flex", gap: 10, justifyContent: m.role === "user" ? "flex-end" : "flex-start", alignItems: "flex-end" }}>
              {m.role === "ai" && (
                <div style={{ width: 28, height: 28, borderRadius: 8, background: C.purple, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon name="ti-sparkles" size={13} style={{ color: "#fff" }} />
                </div>
              )}
              <div style={{
                padding: "10px 14px",
                borderRadius: m.role === "user" ? "12px 12px 4px 12px" : "4px 12px 12px 12px",
                fontSize: 14,
                lineHeight: 1.6,
                maxWidth: "70%",
                background: m.role === "user" ? C.purple : C.surface2,
                color: C.white,
                border: m.role === "user" ? "none" : `1px solid ${C.border}`,
              }}>
                {m.text}
              </div>
              {m.role === "user" && (
                <div style={{ width: 28, height: 28, borderRadius: 8, background: C.surface3, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon name="ti-user" size={13} style={{ color: C.muted }} />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: C.purple, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="ti-sparkles" size={13} style={{ color: "#fff" }} />
              </div>
              <div style={{ padding: "8px 14px", borderRadius: "4px 12px 12px 12px", background: C.surface2, border: `1px solid ${C.border}`, display: "flex", gap: 4, alignItems: "center" }}>
                {[0,1,2].map((j) => (
                  <div key={j} style={{ width: 6, height: 6, borderRadius: "50%", background: C.muted, animation: "pulse 1.2s ease-in-out infinite", animationDelay: `${j * 0.2}s` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 12, display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
          {SUGGESTIONS.map((s) => (
            <button key={s} onClick={() => send(s)} style={{
              background: "transparent", border: `1px solid ${C.border2}`, borderRadius: 20,
              color: C.muted, fontSize: 12, padding: "5px 13px", cursor: "pointer",
              fontFamily: G.body, transition: "all 0.1s",
            }}>
              {s}
            </button>
          ))}
        </div>

        {/* Input */}
        <div style={{ display: "flex", gap: 8 }}>
          <input
            style={{ ...S.input, flex: 1 }}
            placeholder="Ask about your business…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(input)}
          />
          <button
            onClick={() => send(input)}
            disabled={loading || !input.trim()}
            style={{
              ...S.btn, ...S.btnPrimary,
              padding: "10px 18px",
              opacity: loading || !input.trim() ? 0.4 : 1,
              cursor: loading || !input.trim() ? "default" : "pointer",
            }}
          >
            <Icon name="ti-send" size={15} />
          </button>
        </div>
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:0.3} 50%{opacity:1} }`}</style>
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

const TABS = [
  { id: "dashboard", label: "Dashboard", icon: "ti-layout-dashboard" },
  { id: "inventory", label: "Inventory", icon: "ti-package" },
  { id: "insights", label: "AI Insights", icon: "ti-sparkles" },
  { id: "assistant", label: "Assistant", icon: "ti-message-chatbot" },
];

export default function App() {
  const [page, setPage] = useState("landing");
  const [tab, setTab] = useState("dashboard");

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;700&display=swap";
    document.head.appendChild(link);
    const icons = document.createElement("link");
    icons.rel = "stylesheet";
    icons.href = "https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.x/dist/tabler-icons.min.css";
    document.head.appendChild(icons);
  }, []);

  const views = {
    dashboard: <Dashboard />,
    inventory: <Inventory />,
    insights: <Insights />,
    assistant: <Assistant />,
  };

  if (page === "landing") return (
    <div style={S.app}>
      <nav style={S.nav}>
        <div style={S.logo}>
          <div style={S.logoMark}>D</div>
          DRiVE <span style={{ color: C.purplePale, marginLeft: 2 }}>AI</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setPage("app")} style={{ ...S.btn, ...S.btnGhost, fontSize: 13, padding: "7px 16px" }}>Sign in</button>
          <button onClick={() => setPage("app")} style={{ ...S.btn, ...S.btnPrimary, fontSize: 13, padding: "7px 16px" }}>Get Started</button>
        </div>
      </nav>
      <Landing onEnter={() => setPage("app")} />
    </div>
  );

  return (
    <div style={S.app}>
      <nav style={S.nav}>
        <div style={{ ...S.logo, cursor: "pointer" }} onClick={() => setPage("landing")}>
          <div style={S.logoMark}>D</div>
          DRiVE <span style={{ color: C.purplePale, marginLeft: 2 }}>AI</span>
        </div>

        <div style={S.navCenter}>
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{ ...S.navTab, ...(tab === t.id ? S.navTabActive : {}) }}
            >
              <Icon name={t.icon} size={14} />
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.success, boxShadow: `0 0 6px ${C.success}` }} />
          <span style={{ fontSize: 13, color: C.muted }}>Aling Maria's Store</span>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: C.surface3, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <Icon name="ti-settings" size={14} style={{ color: C.muted }} />
          </div>
        </div>
      </nav>

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 32px 48px", width: "100%", boxSizing: "border-box" }}>
        {views[tab]}
      </main>
    </div>
  );
}
