"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Terminal({ isOpen, onClose, setTheme, currentTheme }) {
    const [input, setInput] = useState("");
    const [history, setHistory] = useState([
        { type: "system", content: "CyberCore Kernel 4.0.1-emerald" },
        { type: "system", content: "Connection established. Mode: " + (currentTheme === "blood" ? "INSECURE" : "SECURE") },
        { type: "system", content: "Type 'help' or 'ls' to explore the filesystem." }
    ]);
    const inputRef = useRef(null);
    const scrollRef = useRef(null);

    const files = {
        "cooking.txt": "đậu tẩm hành, thịt kho, cá kho, ...v..v..v..v.v.v.v.v.v",
        "baihathay.txt": "em cua ngay hom qua, nang am xa dan, bigcityboi, ...v..v..v..v.v.v.v.v.v",
        "date.txt": "2/4/2004",
        "hack.txt": "bạn đã bị lộ thông tin",
        "bio.txt": " Tam Dao- Phu Tho",
        "skills.sh": "đá bóng, chạy bộ ,tập gym ,đá cầu, tài chính kinh doanh, nhiếp ảnh"
    };

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    useEffect(() => {
        scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
    }, [history]);

    const handleCommand = (e) => {
        if (e.key === "Enter") {
            const args = input.trim().split(" ");
            const cmd = args[0].toLowerCase();
            const val = args[1];

            const newHistory = [...history, { type: "user", content: `visitor@duongdinh:~$ ${input}` }];

            switch (cmd) {
                case "help":
                    newHistory.push({ type: "system", content: "COMMANDS: ls, cat <file>, whoami, theme <secure|hack>, goto <section>, socials, clear, exit" });
                    break;
                case "whoami":
                    newHistory.push({ type: "system", content: "anh dương định đẹp trai nhất" });
                    break;
                case "ls":
                    newHistory.push({ type: "system", content: Object.keys(files).join("  ") });
                    break;
                case "cat":
                    if (files[val]) {
                        newHistory.push({ type: "system", content: files[val] });
                    } else if (!val) {
                        newHistory.push({ type: "error", content: "Usage: cat <filename>" });
                    } else {
                        newHistory.push({ type: "error", content: `File not found: ${val}` });
                    }
                    break;
                case "theme":
                    if (val === "hack") setTheme("blood");
                    else if (val === "secure") setTheme("");
                    newHistory.push({ type: "success", content: "Theme protocol updated." });
                    break;
                case "goto":
                    const section = document.getElementById(val);
                    if (section) {
                        section.scrollIntoView({ behavior: "smooth" });
                        newHistory.push({ type: "success", content: `Jump to ${val}` });
                    } else {
                        newHistory.push({ type: "error", content: "Section not found." });
                    }
                    break;
                case "socials":
                    newHistory.push({ type: "system", content: "GitHub: asaazza051-prog\nIG: @congdinh_04" });
                    break;
                case "clear":
                    setHistory([]);
                    setInput("");
                    return;
                case "exit":
                    onClose();
                    break;
                case "":
                    break;
                default:
                    newHistory.push({ type: "error", content: `Command not found: ${cmd}` });
            }
            setHistory(newHistory);
            setInput("");
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="fixed inset-x-2 bottom-4 md:inset-auto md:bottom-6 md:right-6 z-[200] md:w-[500px] glass-card rounded-2xl overflow-hidden border border-[var(--primary)]/30 shadow-[0_0_60px_rgba(0,0,0,0.8)] flex flex-col"
                    style={{ height: "clamp(350px, 60vh, 500px)" }}
                >
                    <div className="bg-[#0a0a20] px-5 py-3 flex items-center justify-between border-b border-[var(--primary)]/20">
                        <div className="flex gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                        </div>
                        <div className="text-[10px] font-bold font-mono text-[var(--primary)]/80 tracking-[0.2em] uppercase hidden sm:block">sh: duongdinh — kernel 4.0</div>
                        <button 
                            onClick={onClose} 
                            className="bg-white/5 hover:bg-white/10 px-3 py-1 rounded-lg text-white/70 hover:text-white transition-all text-[11px] font-bold font-mono border border-white/10"
                        >
                            ESC: CLOSE
                        </button>
                    </div>
                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 font-mono text-[12px] md:text-[13px] space-y-2 custom-scrollbar bg-black/60 backdrop-blur-md">
                        {history.map((item, i) => (
                            <div key={i} className={`whitespace-pre-wrap leading-relaxed ${item.type === "error" ? "text-red-400" :
                                item.type === "success" ? "text-[var(--primary)]" :
                                    item.type === "user" ? "text-white/90" :
                                        "text-[var(--secondary)]"
                                }`}>
                                {item.content}
                            </div>
                        ))}
                        <div className="flex items-center gap-2 text-white pt-2">
                            <span className="text-[var(--primary)] font-bold">$</span>
                            <input
                                ref={inputRef} type="text" value={input}
                                onChange={e => setInput(e.target.value)} onKeyDown={handleCommand}
                                className="flex-1 bg-transparent border-none outline-none text-white p-0 font-mono"
                                autoFocus
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
