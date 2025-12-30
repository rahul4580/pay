"use client";
import React, { useState, useEffect } from "react";

export default function Graf() {
  const [btcPrice, setBtcPrice] = useState(68000);
  const [amount, setAmount] = useState(1000);

  // simulated live BTC price
  useEffect(() => {
    const id = setInterval(() => {
      setBtcPrice(p => p + (Math.random() * 300 - 150));
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const btc2009 = 0.08;
  const btcNowValue = ((amount / btc2009) * btcPrice).toFixed(0);

  const companies = [
    { name: "Apple", then: 0.5, now: 190 },
    { name: "Microsoft", then: 0.6, now: 410 },
    { name: "Amazon", then: 1.5, now: 180 },
    { name: "Google", then: 2.8, now: 170 },
    { name: "NVIDIA", then: 3, now: 900 },
    { name: "Tesla", then: 1.2, now: 250 },
    { name: "Meta", then: 2, now: 500 },
    { name: "Netflix", then: 3, now: 640 },
    { name: "Adobe", then: 2.5, now: 600 },
    { name: "Intel", then: 1.8, now: 45 },
  ];

  return (
    <div style={page}>

      {/* SECTION 1 — HERO */}
      <section style={hero}>
        <h1 style={heroTitle}>Investment is the quiet path to success</h1>
        <p style={heroText}>
          Wealth is not built overnight.  
          It is built with patience, time, and belief.
        </p>
      </section>

      {/* SECTION 2 — COMPANIES */}
      <section style={section}>
        <h2 style={sectionTitle}>What time can do</h2>
        <div style={grid}>
          {companies.map((c, i) => (
            <div key={i} style={card}>
              <p style={company}>{c.name}</p>
              <p style={small}>Then</p>
              <h3>${c.then}</h3>
              <span style={arrow}>→</span>
              <p style={small}>Now</p>
              <h3 style={{ color: "#2563eb" }}>${c.now}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3 — BITCOIN STORY */}
      <section style={sectionAlt}>
        <h2 style={sectionTitle}>Bitcoin changed the rules</h2>
        <p style={text}>
          In 2009, Bitcoin was ignored.  
          Today, it defines a generation of investors.
        </p>

        <div style={btcRow}>
          <Stat label="2009 Price" value="$0.08" />
          <Stat label="Live Price" value={`$${btcPrice.toFixed(0)}`} highlight />
        </div>
      </section>

      {/* SECTION 4 — CALCULATOR */}
      <section style={section}>
        <h2 style={sectionTitle}>Your investment</h2>
        <p style={text}>What if you invested early?</p>

        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          style={input}
        />

        <div style={result}>
          <p>You invested</p>
          <h3>${amount}</h3>
          <p>in Bitcoin (2009)</p>
          <h2 style={highlight}>${btcNowValue}</h2>
        </div>
      </section>

      {/* SECTION 5 — QUOTES */}
      <section style={sectionAlt}>
        <h2 style={sectionTitle}>Lessons of wealth</h2>
        <ul style={list}>
          <li>Time beats timing</li>
          <li>Patience beats talent</li>
          <li>Consistency beats luck</li>
          <li>Investment beats income</li>
        </ul>
      </section>

      {/* SECTION 6 — FINAL */}
      <section style={final}>
        <h2>Start early. Stay calm. Let time work.</h2>
        <p style={text}>
          Success does not make noise.  
          It compounds quietly.
        </p>
      </section>

    </div>
  );
}

/* SMALL COMPONENTS */

const Stat = ({ label, value, highlight }) => (
  <div style={{ ...stat, borderColor: highlight ? "#2563eb" : "#e5e7eb" }}>
    <p style={small}>{label}</p>
    <h3>{value}</h3>
  </div>
);

/* STYLES */

const page = {
  fontFamily: "Inter, system-ui, sans-serif",
  color: "#0f172a",
  background: "#ffffff",
};

const hero = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: "0 12%",
};

const heroTitle = {
  fontSize: "52px",
  fontWeight: 600,
  maxWidth: "900px",
};

const heroText = {
  marginTop: "20px",
  fontSize: "18px",
  color: "#475569",
};

const section = {
  padding: "120px 10%",
};

const sectionAlt = {
  padding: "120px 10%",
  background: "#f8fafc",
};

const sectionTitle = {
  fontSize: "36px",
  marginBottom: "40px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "24px",
};

const card = {
  padding: "28px",
  borderRadius: "16px",
  border: "1px solid #e5e7eb",
  background: "#ffffff",
  textAlign: "center",
  transition: "transform .3s",
};

const company = { fontWeight: 600 };
const small = { fontSize: "13px", color: "#64748b" };
const arrow = { display: "block", margin: "10px 0", opacity: 0.4 };

const btcRow = {
  display: "flex",
  gap: "30px",
  marginTop: "40px",
};

const stat = {
  padding: "30px",
  borderRadius: "14px",
  border: "1px solid",
  minWidth: "220px",
  background: "#fff",
};

const input = {
  padding: "14px",
  fontSize: "18px",
  borderRadius: "12px",
  border: "1px solid #cbd5f5",
  marginTop: "20px",
};

const result = {
  marginTop: "40px",
  textAlign: "center",
};

const highlight = {
  color: "#2563eb",
  fontSize: "34px",
};

const text = {
  color: "#475569",
  maxWidth: "700px",
};

const list = {
  lineHeight: "2.2",
  fontSize: "18px",
  color: "#334155",
};

const final = {
  minHeight: "80vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
};
