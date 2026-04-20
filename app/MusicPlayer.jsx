"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    // Using a reliable royalty-free lofi track
    const musicUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"; 

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.log("Playback blocked by browser"));
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="fixed bottom-8 left-8 z-[150] flex items-center gap-3">
            <audio ref={audioRef} src={musicUrl} loop />
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={togglePlay}
                className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-500 ${
                    isPlaying 
                    ? "bg-[#06b6d4]/20 border-[#06b6d4] shadow-[0_0_20px_rgba(6,182,212,0.4)]" 
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
            >
                {isPlaying ? (
                    <div className="flex gap-[3px] items-end h-4">
                        {[1, 2, 3, 4].map(i => (
                            <motion.div
                                key={i}
                                animate={{ height: [4, 16, 8, 12, 4] }}
                                transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }}
                                className="w-[3px] bg-[#06b6d4] rounded-full"
                            />
                        ))}
                    </div>
                ) : (
                    <span className="text-xl">🎵</span>
                )}
            </motion.button>
            
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isPlaying ? 1 : 0, x: isPlaying ? 0 : -20 }}
                className="bg-[#050510]/80 backdrop-blur-md px-4 py-2 rounded-xl border border-[#06b6d4]/20 pointer-events-none"
            >
                <div className="text-[10px] uppercase tracking-widest text-[#06b6d4] font-bold">Now Playing</div>
                <div className="text-xs text-[#8888aa] font-mono">Lofi Chill Beats</div>
            </motion.div>
        </div>
    );
}
