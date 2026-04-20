"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import emailjs from "@emailjs/browser";
import Model3D from "./Model3D";
import Terminal from "./Terminal";
import MusicPlayer from "./MusicPlayer";

/* ── Styles ── */
const S = {
    orb: (w, h, t, l, b, r, bg, delay) => ({
        position: "fixed", borderRadius: "50%", filter: "blur(120px)", opacity: 0.25, pointerEvents: "none", zIndex: 0,
        width: w, height: h, top: t, left: l, bottom: b, right: r, background: bg,
        animation: `float 20s ease-in-out ${delay}s infinite`,
    }),
    logo: {
        fontSize: "1.7rem", fontWeight: 900, letterSpacing: "-0.03em",
        background: "linear-gradient(135deg, var(--primary), var(--secondary))",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        transition: "all 0.3s",
    },
    navLink: {
        color: "#8888aa", textDecoration: "none", fontSize: "0.95rem", fontWeight: 600,
        transition: "color 0.3s", letterSpacing: "0.05em",
    },
    badge: {
        display: "inline-flex", alignItems: "center", gap: "10px", padding: "10px 20px 10px 14px",
        borderRadius: "100px", border: "1px solid var(--primary)",
        background: "rgba(0, 255, 159, 0.05)", fontSize: "0.85rem", color: "var(--primary)",
        fontWeight: 700, marginBottom: "40px", backdropFilter: "blur(10px)",
    },
    dot: {
        width: 10, height: 10, borderRadius: "50%", background: "var(--primary)",
        animation: "pulse-dot 2s ease-in-out infinite",
    },
    gradText: {
        background: "linear-gradient(135deg, var(--primary), var(--secondary))",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
    },
    typed: { color: "var(--secondary)", fontFamily: "'JetBrains Mono',monospace", fontWeight: 600 },
    btnPrimary: {
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "16px 32px", borderRadius: 14,
        border: "none", background: "linear-gradient(135deg, var(--primary), var(--secondary))",
        color: "#030308", fontSize: "1rem", fontWeight: 800, cursor: "pointer", textDecoration: "none",
        transition: "all 0.3s", boxShadow: "0 15px 35px -10px var(--glow)",
    },
    btnOutline: {
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "16px 32px", borderRadius: 14,
        border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.05)", color: "#f0f0ff",
        fontSize: "1rem", fontWeight: 700, cursor: "pointer", textDecoration: "none",
        transition: "all 0.3s", backdropFilter: "blur(10px)",
    },
    labelBar: { display: "block", width: 32, height: 3, background: "var(--primary)", borderRadius: 2 },
    divider: { width: 80, height: 4, background: "linear-gradient(90deg, var(--primary), transparent)", borderRadius: 2, margin: "24px 0 0" },
    socialLink: {
        width: 52, height: 52, borderRadius: 16, border: "1px solid rgba(255,255,255,0.1)",
        background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center",
        color: "#8888aa", textDecoration: "none", transition: "all 0.4s",
        backdropFilter: "blur(10px)",
    },
    btnSubmit: {
        width: "100%", padding: "20px 24px", borderRadius: 16, border: "none",
        background: "linear-gradient(135deg, var(--primary), var(--secondary))",
        color: "#030308", fontSize: "1.1rem", fontWeight: 800, cursor: "pointer",
        transition: "all 0.4s", boxShadow: "0 20px 40px -10px var(--glow)",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
    },
    skillTag: {
        padding: "12px 24px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)",
        background: "rgba(255,255,255,0.05)", color: "#e2e8f0", fontSize: "0.95rem", fontWeight: 600,
        cursor: "default", transition: "all 0.3s", backdropFilter: "blur(10px)"
    },
    card: {
        background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 32,
        padding: "50px 32px", backdropFilter: "blur(30px)", transition: "all 0.5s",
        textAlign: "center",
    },
    hobbyIcon: {
        width: 80, height: 80, borderRadius: 24, display: "flex", alignItems: "center", justifyContent: "center",
        margin: "0 auto 30px", fontSize: 36, background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)", transition: "all 0.4s",
    },
    infoCard: {
        display: "flex", alignItems: "center", gap: 20, padding: 24, borderRadius: 20,
        border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", transition: "all 0.3s",
    },
    infoIcon: {
        width: 56, height: 56, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 24, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", flexShrink: 0,
    },
    input: {
        width: "100%", padding: "18px 24px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.1)",
        background: "rgba(255,255,255,0.04)", color: "#f0f0ff", fontFamily: "'Inter',sans-serif",
        fontSize: "1rem", outline: "none", transition: "all 0.3s",
    },
    textarea: {
        width: "100%", padding: "18px 24px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.1)",
        background: "rgba(255,255,255,0.04)", color: "#f0f0ff", fontFamily: "'Inter',sans-serif",
        fontSize: "1rem", outline: "none", transition: "all 0.3s", minHeight: 180, resize: "vertical",
    },
};

/* ── Animated Section ── */
function ASection({ children, id }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-150px" });
    return (
        <motion.section ref={ref} id={id} className="relative z-10 max-w-7xl mx-auto pt-40 md:pt-60 px-8"
            initial="hidden" animate={inView ? "visible" : "hidden"}
            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.12, delayChildren: 0.3 } }
            }}>
            {children}
        </motion.section>
    );
}

const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
};

/* ── Typed Text ── */
function TypedText({ words }) {
    const [idx, setIdx] = useState(0);
    const [text, setText] = useState("");
    const [del, setDel] = useState(false);
    useEffect(() => {
        const w = words[idx];
        if (!del && text === w) { const t = setTimeout(() => setDel(true), 2500); return () => clearTimeout(t); }
        if (del && text === "") { setDel(false); setIdx((p) => (p + 1) % words.length); return; }
        const t = setTimeout(() => setText(del ? w.substring(0, text.length - 1) : w.substring(0, text.length + 1)), del ? 30 : 60);
        return () => clearTimeout(t);
    }, [text, del, idx, words]);
    return <span style={S.typed}>{text}<span className="terminal-cursor" /></span>;
}

/* ── SVG Icons ── */
const IcoIG = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><path d="M17.5 6.5h.01" /></svg>;
const IcoFB = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>;
const IcoGH = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" /></svg>;
const IcoMenu = <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>;
const IcoClose = <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;

/* ── Main ── */
export default function Home() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [sending, setSending] = useState(false);
    const [payloadLogs, setPayloadLogs] = useState([]);
    const [toast, setToast] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [terminalOpen, setTerminalOpen] = useState(false);
    const [theme, setTheme] = useState("");
    const [visitorCount, setVisitorCount] = useState(0);

    const { scrollY } = useScroll();
    const gridY = useTransform(scrollY, [0, 5000], [0, 300]);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 80);
        window.addEventListener("scroll", fn);
        const storedCount = localStorage.getItem("visitors");
        const count = storedCount ? parseInt(storedCount) : 1204;
        localStorage.setItem("visitors", count + 1);
        setVisitorCount(count + 1);
        let keys = "";
        const handleKeys = (e) => {
            keys += e.key;
            if (keys.endsWith("help")) setTerminalOpen(true);
            if (keys.length > 20) keys = keys.substring(10);
        };
        window.addEventListener("keydown", handleKeys);
        return () => { window.removeEventListener("scroll", fn); window.removeEventListener("keydown", handleKeys); };
    }, []);

    const showToast = (type, msg) => { setToast({ type, message: msg }); setTimeout(() => setToast(null), 5000); };
    const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const sendEmail = async (e) => {
        e.preventDefault();
        setSending(true);
        setPayloadLogs(["[INIT] Establishing secure link...", "[SCAN] Checking vulnerabilities...", "[AUTH] Identity verification..."]);

        // Simulated progress logs
        const logs = [
            "[EXPL] Bypassing firewalls...",
            "[PACK] Encrypting data packet...",
            "[TRAN] Sending to endpoint...",
            "[DONE] Handshake complete."
        ];

        for (let i = 0; i < logs.length; i++) {
            await new Promise(r => setTimeout(r, 600));
            setPayloadLogs(prev => [...prev, logs[i]]);
        }

        try {
            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
                { from_name: form.name, from_email: form.email, message: form.message, to_name: "Dương Định" },
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
            );
            showToast("success", "✅ Payload delivered successfully!");
            setForm({ name: "", email: "", message: "" });
        } catch { showToast("error", "❌ Connection timed out."); }
        finally { setSending(false); setPayloadLogs([]); }
    };

    const navLinks = [{ l: "About", h: "#about" }, { l: "Skills", h: "#skills" }, { l: "Hobbies", h: "#hobbies" }, { l: "Contact", h: "#contact" }];

    return (
        <div data-theme={theme} className="overflow-hidden transition-all duration-700 bg-[#030308]">
            {/* BG Elements */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-25" style={{ background: "radial-gradient(circle at 50% 50%, #101025 0%, #030308 100%)" }} />
            <motion.div style={{ y: gridY }} className="parallax-grid opacity-40" />
            <div className="cyber-scanline" />
            <div style={S.orb("70vw", "70vw", "-25%", undefined, undefined, "-15%", "var(--primary)", 0)} />
            <div style={S.orb("60vw", "60vw", undefined, "-20%", "-20%", undefined, "var(--secondary)", -10)} />

            {/* Navbar */}
            <motion.nav
                className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-8 py-6 md:px-12 transition-all duration-500 ${scrolled ? "bg-[#030308]/90 backdrop-blur-2xl border-b border-white/5 py-4" : "bg-transparent"}`}
                initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: "circOut" }}>
                <a href="#" style={S.logo} className="text-glitch">Duong Dinh</a>

                <div className="hidden md:flex gap-10 items-center">
                    {navLinks.map(n => <a key={n.h} href={n.h} style={S.navLink} className="hover:text-[var(--primary)] hover:translate-y-[-2px] transition-all">{n.l}</a>)}
                    <button onClick={() => setTheme(theme === "blood" ? "" : "blood")} className={`ml-4 px-4 py-2 rounded-xl border text-[11px] font-black tracking-[0.2em] uppercase transition-all duration-300 ${theme === "blood" ? "border-red-500 text-red-500 bg-red-500/10 shadow-[0_0_20px_rgba(239,68,68,0.4)]" : "border-[var(--primary)] text-[var(--primary)] bg-[var(--primary)]/5 hover:bg-[var(--primary)]/10"}`}>
                        {theme === "blood" ? "Insecure" : "Secure"}
                    </button>
                </div>

                <button className="md:hidden text-[#f0f0ff] p-2" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? IcoClose : IcoMenu}
                </button>
            </motion.nav>

            {/* Mobile Nav Overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }}
                        className="fixed inset-0 z-[90] bg-[#030308]/98 backdrop-blur-3xl flex flex-col items-center justify-center gap-12 md:hidden">
                        {navLinks.map((n, i) => (
                            <motion.a
                                key={n.h} href={n.h}
                                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                                onClick={() => setMenuOpen(false)}
                                className="text-4xl font-black text-[#f0f0ff] hover:text-[var(--secondary)] tracking-tight">
                                {n.l}
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hero */}
            <section className="min-h-[110svh] flex flex-col lg:flex-row items-center justify-center relative z-10 px-8 pt-32 lg:pt-20 max-w-[1600px] mx-auto gap-16">
                <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left w-full">
                    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.5 }}>
                        <div style={S.badge}><span style={S.dot} />Nodes Detected: {visitorCount || "Scanning..."}</div>
                    </motion.div>
                    <motion.h1
                        className="text-[clamp(3rem,8vw,6.5rem)] font-[1000] tracking-tighter leading-[0.95] mb-8"
                        initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
                        Xin chào bạn, tôi là <br /><span style={S.gradText} className="text-glitch">Dương Định</span>
                    </motion.h1>
                    <motion.p
                        className="text-[clamp(1.2rem,2.5vw,1.6rem)] text-[#8888aa] mb-14 max-w-2xl leading-relaxed font-medium"
                        initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}>
                        <TypedText words={["Cyber Security Enthusiast", "SOC Analyst", "Penetration Tester", "Future Crypto Expert"]} />
                    </motion.p>
                    <motion.div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto mb-12" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1 }}>
                        <a href="#contact" style={S.btnPrimary} className="hover:scale-105 active:scale-95 shadow-[0_20px_40px_-10px_var(--glow)]">💬 Liên hệ ngay</a>
                        <button onClick={() => setTerminalOpen(true)} style={S.btnOutline} className="hover:bg-white/10 active:scale-95">⌨️ Open Terminal</button>
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} className="flex gap-6">
                        <a href="https://instagram.com/congdinh_04/" target="_blank" style={S.socialLink} className="hover:scale-115 hover:border-[var(--primary)] hover:text-[var(--primary)] hover:shadow-[0_0_25px_var(--glow)]">{IcoIG}</a>
                        <a href="https://facebook.com/duonginh.181159" target="_blank" style={S.socialLink} className="hover:scale-115 hover:border-[var(--primary)] hover:text-[var(--primary)] hover:shadow-[0_0_25px_var(--glow)]">{IcoFB}</a>
                        <a href="https://github.com/asaazza051-prog" target="_blank" style={S.socialLink} className="hover:scale-115 hover:border-[var(--primary)] hover:text-[var(--primary)] hover:shadow-[0_0_25px_var(--glow)]">{IcoGH}</a>
                    </motion.div>
                </div>

                <motion.div
                    className="flex-1 w-full h-[50vh] lg:h-[90vh] relative"
                    initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.8, ease: "backOut" }}
                >
                    <Model3D theme={theme} />
                </motion.div>
            </section>

            <ASection id="about">
                <motion.div variants={fadeUp}><span className="inline-flex items-center gap-3 text-sm font-black uppercase tracking-[0.4em] text-[var(--secondary)] mb-6"><span style={S.labelBar} />Identity</span></motion.div>
                <motion.h2 variants={fadeUp} className="text-5xl md:text-8xl font-black mb-10 tracking-tighter">About Me</motion.h2>
                <motion.div variants={fadeUp}><div style={S.divider} /></motion.div>
                <motion.p variants={fadeUp} className="text-[#8888aa] text-xl md:text-2xl max-w-4xl leading-relaxed mt-12 font-medium">
                    Tôi là <strong className="text-[var(--primary)] font-bold">Duong Dinh</strong> — một người đam mê Mật mã học và An toàn thông tin.
                    Tôi nghiên cứu sâu về các phương thức bảo mật hệ thống và phát hiện xâm nhập.
                </motion.p>
            </ASection>

            <ASection id="skills">
                <motion.div variants={fadeUp}><span className="inline-flex items-center gap-3 text-sm font-black uppercase tracking-[0.4em] text-[var(--secondary)] mb-6"><span style={S.labelBar} />Expertise</span></motion.div>
                <motion.h2 variants={fadeUp} className="text-5xl md:text-8xl font-black mb-10 tracking-tighter">Tech Stack</motion.h2>
                <motion.div variants={fadeUp} className="flex flex-wrap gap-5 mt-16">
                    {["Cyber Security", "SOC Analyst", "Pentetration Testing", "Network Security", "Linux", "Python", "JavaScript", "Wireshark", "Burp Suite", "SIEM", "OSINT", "Malware Analysis"].map(s => <motion.span key={s} style={S.skillTag} className="glass-card hover:border-[var(--primary)] hover:scale-110 cursor-pointer">{s}</motion.span>)}
                </motion.div>
            </ASection>

            <ASection id="hobbies">
                <motion.div variants={fadeUp}><span className="inline-flex items-center gap-3 text-sm font-black uppercase tracking-[0.4em] text-[var(--secondary)] mb-6"><span style={S.labelBar} />Culture</span></motion.div>
                <motion.h2 variants={fadeUp} className="text-5xl md:text-8xl font-black mb-10 tracking-tighter">Hobbies</motion.h2>
                <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
                    {[
                        { icon: "🛡️", title: "Security", desc: "Nghiên cứu malware và các phương thức tấn công." },
                        { icon: "⚽", title: "Sports", desc: "Fan CR7 & Messi, đam mê lối đá tấn công." },
                        { icon: "🎮", title: "Gaming", desc: "Chiến thuật với Liqi và búp gi:))))." },
                        { icon: "🍳", title: "Cooking", desc: "Đậu tẩm hành, thịt kho tàu... món nào cũng đỉnh." },
                    ].map(h => (
                        <motion.div key={h.title} style={S.card} className="glass-card group hover:-translate-y-5 hover:border-[var(--primary)]/30">
                            <div style={S.hobbyIcon} className="group-hover:rotate-[360deg] group-hover:bg-[var(--primary)]/10 transition-all duration-1000">{h.icon}</div>
                            <h3 className="text-2xl font-black mb-5 text-[#f0f0ff] uppercase tracking-wide">{h.title}</h3>
                            <p className="text-[#8888aa] text-base leading-relaxed font-medium">{h.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </ASection>

            <ASection id="contact">
                <motion.div variants={fadeUp}><span className="inline-flex items-center gap-3 text-sm font-black uppercase tracking-[0.4em] text-[var(--secondary)] mb-6"><span style={S.labelBar} />Protocol</span></motion.div>
                <motion.h2 variants={fadeUp} className="text-5xl md:text-8xl font-black mb-10 tracking-tighter">Contact</motion.h2>
                <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 mt-20">
                    <div className="flex flex-col gap-8">
                        {[
                            { icon: "📧", label: "Email", val: "duongdinh242004@gmail.com" },
                            { icon: "📍", label: "Location", val: "Hà Nội, VN" },
                        ].map(c => (
                            <div key={c.label} style={S.infoCard} className="glass-card hover:bg-white/5 hover:border-[var(--primary)]/30">
                                <div style={S.infoIcon}>{c.icon}</div>
                                <div>
                                    <div className="text-xs text-[#8888aa] font-black uppercase tracking-[0.2em] mb-2">{c.label}</div>
                                    <div className="text-lg font-bold text-[#f0f0ff]">{c.val}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <form className="flex flex-col gap-8 glass-card p-10 md:p-14" onSubmit={sendEmail}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <input name="name" placeholder="Tên của bạn" value={form.name} onChange={onChange} required style={S.input} className="focus:border-[var(--primary)]" />
                            <input name="email" type="email" placeholder="Email của bạn" value={form.email} onChange={onChange} required style={S.input} className="focus:border-[var(--primary)]" />
                        </div>
                        <textarea name="message" placeholder="Hãy gửi cho tôi 1 thông điệp bất kỳ..." value={form.message} onChange={onChange} required style={S.textarea} className="focus:border-[var(--secondary)]" />
                        <div className="relative group">
                            <button type="submit" disabled={sending} style={S.btnSubmit} className="active:scale-95">
                                {sending ? "TRANSMITTING..." : "🚀 Execute Payload"}
                            </button>
                            {sending && (
                                <div className="absolute top-[calc(100%+20px)] left-0 right-0 p-4 rounded-xl bg-black/80 font-mono text-[10px] text-[var(--primary)] space-y-1 border border-[var(--primary)]/20 shadow-2xl">
                                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-3">
                                        <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 3 }} className="h-full bg-[var(--primary)] shadow-[0_0_10px_var(--primary)]" />
                                    </div>
                                    {payloadLogs.map((log, i) => (
                                        <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>{log}</motion.div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </form>
                </motion.div>
            </ASection>

            <footer className="text-center py-24 mt-40 border-t border-white/5 text-[#8888aa] text-[11px] uppercase tracking-[0.5em] font-black">
                <p>© {new Date().getFullYear()} Duong Dinh | Decrypting the Future</p>
            </footer>

            <Terminal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} setTheme={setTheme} currentTheme={theme} />
            <MusicPlayer />

            <AnimatePresence>
                {toast && (
                    <motion.div style={S.toast(toast.type)} initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }}>
                        {toast.message}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}