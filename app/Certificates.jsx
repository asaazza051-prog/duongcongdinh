"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CERTS = [
  {
    id: 1,
    name: "Splunk Observability Cloud Related Content in Splunk Cloud",
    issuer: "Splunk",
    date: "12 May 2026",
    img: "/certs/cert1.png",
  },
  {
    id: 2,
    name: "Splunk Cloud Setup for Observability Cloud Content",
    issuer: "Splunk",
    date: "12 May 2026",
    img: "/certs/cert2.png",
  },
  {
    id: 3,
    name: "SOC Essentials: Introduction to Threat Hunting",
    issuer: "Splunk",
    date: "12 May 2026",
    img: "/certs/cert3.png",
  },
  {
    id: 4,
    name: "Developing Splunk SOAR Apps",
    issuer: "Splunk",
    date: "12 May 2026",
    img: "/certs/cert4.png",
  },
  {
    id: 5,
    name: "Network Performance Monitoring with Splunk Network Explorer",
    issuer: "Splunk",
    date: "12 May 2026",
    img: "/certs/cert5.png",
  },
  {
    id: 6,
    name: "Splunk Enterprise Installation and Configuration",
    issuer: "Splunk",
    date: "12 May 2026",
    img: "/certs/cert6.png",
  },
  {
    id: 7,
    name: "Advanced Splunk Synthetic Monitoring",
    issuer: "Splunk",
    date: "12 May 2026",
    img: "/certs/cert7.png",
  },
  {
    id: 8,
    name: "Intro to Splunk",
    issuer: "Splunk",
    date: "11 May 2026",
    img: "/certs/cert8.png",
  },
  {
    id: 9,
    name: "Certified Cybersecurity Educator Professional (CCEP)",
    issuer: "Red Team Leaders",
    date: "10 May 2026",
    img: "/certs/cert9.png",
  },
];

export default function Certificates({ isOpen, onClose }) {
  const [selected, setSelected] = useState(null);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => {
          if (selected) { setSelected(null); return; }
          onClose();
        }}
      />

      {/* Panel */}
      <motion.div
        className="fixed z-[210] inset-x-4 bottom-0 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[680px]"
        style={{ top: "auto", maxHeight: "85vh" }}
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 28, stiffness: 260 }}
      >
        <div
          style={{
            background: "rgba(10,10,25,0.97)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "28px 28px 0 0",
            boxShadow: "0 -20px 80px rgba(0,255,159,0.12), 0 -4px 40px rgba(0,0,0,0.6)",
            display: "flex",
            flexDirection: "column",
            maxHeight: "85vh",
            overflow: "hidden",
          }}
        >
          {/* Handle bar */}
          <div style={{ display: "flex", justifyContent: "center", padding: "14px 0 4px" }}>
            <div style={{ width: 48, height: 5, borderRadius: 99, background: "rgba(255,255,255,0.15)" }} />
          </div>

          {/* Header */}
          <div style={{ padding: "10px 28px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--secondary)", marginBottom: 4 }}>
                🏆 Achievements
              </div>
              <h2 style={{ fontSize: "clamp(1.3rem,4vw,1.8rem)", fontWeight: 900, color: "#f0f0ff", margin: 0, letterSpacing: "-0.03em" }}>
                Chứng Chỉ
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.06)", color: "#8888aa", cursor: "pointer",
                fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "#f0f0ff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#8888aa"; }}
            >
              ✕
            </button>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "0 28px" }} />

          {/* Scrollable list */}
          <div style={{ overflowY: "auto", padding: "20px 20px 32px", flex: 1 }}>
            {CERTS.map((cert, i) => (
              <motion.button
                key={cert.id}
                onClick={() => setSelected(cert)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  width: "100%", textAlign: "left", background: "transparent", border: "none",
                  padding: 0, cursor: "pointer", display: "block", marginBottom: 10,
                }}
              >
                <div
                  style={{
                    display: "flex", alignItems: "center", gap: 16, padding: "16px 18px",
                    borderRadius: 18, border: "1px solid rgba(255,255,255,0.07)",
                    background: "rgba(255,255,255,0.03)", transition: "all 0.25s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "rgba(0,255,159,0.06)";
                    e.currentTarget.style.borderColor = "rgba(0,255,159,0.3)";
                    e.currentTarget.style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  {/* Icon */}
                  <div style={{
                    width: 44, height: 44, borderRadius: 14, flexShrink: 0,
                    background: "linear-gradient(135deg, rgba(0,255,159,0.15), rgba(0,180,255,0.15))",
                    border: "1px solid rgba(0,255,159,0.2)", display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.3rem",
                  }}>🎓</div>

                  {/* Text */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: "clamp(0.82rem, 2.5vw, 0.95rem)", fontWeight: 700, color: "#e8e8ff",
                      lineHeight: 1.35, marginBottom: 4,
                      display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
                    }}>
                      {cert.name}
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "#8888aa", fontWeight: 600 }}>
                      {cert.issuer} · {cert.date}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div style={{ color: "rgba(0,255,159,0.5)", fontSize: "1rem", flexShrink: 0 }}>→</div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              className="fixed inset-0 z-[300] bg-black/85 backdrop-blur-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            />
            <motion.div
              className="fixed inset-0 z-[310] flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.88 }}
              transition={{ type: "spring", damping: 26, stiffness: 280 }}
              onClick={() => setSelected(null)}
            >
              <div
                onClick={e => e.stopPropagation()}
                style={{
                  background: "rgba(10,10,25,0.97)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 28,
                  padding: "28px 24px",
                  maxWidth: 680,
                  width: "100%",
                  boxShadow: "0 30px 100px rgba(0,0,0,0.7), 0 0 60px rgba(0,255,159,0.08)",
                }}
              >
                {/* Lightbox header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, gap: 12 }}>
                  <div>
                    <div style={{ fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--secondary)", marginBottom: 6 }}>
                      Certificate
                    </div>
                    <h3 style={{ fontSize: "clamp(0.95rem, 3vw, 1.15rem)", fontWeight: 800, color: "#f0f0ff", margin: 0, lineHeight: 1.4 }}>
                      {selected.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    style={{
                      width: 36, height: 36, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.12)",
                      background: "rgba(255,255,255,0.06)", color: "#8888aa", cursor: "pointer",
                      fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.2s", flexShrink: 0,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.14)"; e.currentTarget.style.color = "#f0f0ff"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#8888aa"; }}
                  >
                    ✕
                  </button>
                </div>

                {/* Image container */}
                <div style={{
                  borderRadius: 18, overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.03)",
                  minHeight: 200, display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selected.img}
                    alt={selected.name}
                    style={{ width: "100%", height: "auto", display: "block", borderRadius: 17 }}
                    onError={e => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.parentElement.innerHTML =
                        `<div style="padding:60px 20px;text-align:center;color:#8888aa">
                          <div style="font-size:3rem;margin-bottom:16px">🖼️</div>
                          <div style="font-size:0.9rem;font-weight:600">Ảnh chứng chỉ sẽ được thêm tại<br/><code style="color:var(--primary);font-size:0.8rem">public/certs/cert${selected.id}.png</code></div>
                        </div>`;
                    }}
                  />
                </div>

                <div style={{ marginTop: 16, fontSize: "0.8rem", color: "#8888aa", fontWeight: 600, textAlign: "center" }}>
                  {selected.issuer} · Hoàn thành {selected.date}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
