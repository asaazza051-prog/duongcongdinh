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
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 50 }}
                    className="fixed bottom-2 left-2 right-2 md:left-auto md:bottom-6 md:right-6 z-[200] md:w-[450px] glass-card rounded-xl overflow-hidden border border-[var(--primary)]/30 shadow-[0_0_40px_rgba(0,255,159,0.15)]"
                >
                    <div className="bg-[#0a0a20]/90 px-4 py-2 flex items-center justify-between border-b border-[var(--primary)]/20">
                        <div className="flex gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-red-500/60" />
                            <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                            <div className="w-2 h-2 rounded-full bg-green-500/60" />
                        </div>
                        <div className="text-[9px] font-mono text-[var(--primary)]/60 tracking-[0.3em] uppercase">sh: duongdinh</div>
                        <button onClick={onClose} className="text-white/30 hover:text-white transition-colors text-[10px] font-mono">_CLOSE</button>
                    </div>
                    <div ref={scrollRef} className="h-[280px] md:h-[300px] max-h-[50vh] overflow-y-auto p-5 font-mono text-[11px] space-y-1.5 custom-scrollbar bg-black/40">
                        {history.map((item, i) => (
                            <div key={i} className={`whitespace-pre-wrap leading-relaxed ${item.type === "error" ? "text-red-500" :
                                item.type === "success" ? "text-[var(--primary)]" :
                                    item.type === "user" ? "text-white/80" :
                                        "text-[var(--secondary)]"
                                }`}>
                                {item.content}
                            </div>
                        ))}
                        <div className="flex items-center gap-2 text-white">
                            <span className="text-[var(--primary)]">$</span>
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
