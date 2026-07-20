"use client";

import { useState } from "react";
import { Phone, MessageCircle, X, MessageSquare, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function FAB() {
  const [isOpen, setIsOpen] = useState(false);

  const hotlines = [
    { label: "Hotline 1: 038 432 6785", value: "0384326785" },
    { label: "Hotline 2: 0328 699 799", value: "0328699799" },
  ];

  const zaloLink = "https://zalo.me/0384326785";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 font-sans">
      {/* Options Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex flex-col gap-2.5 items-end mb-1"
          >
            {/* Zalo Option */}
            <a
              href={zaloLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white hover:bg-slate-50 text-text-primary px-4 py-2.5 rounded-full shadow-lg border border-slate-100 hover:border-slate-200 transition-all hover:scale-105 group"
            >
              <span className="text-sm font-bold text-slate-700">Chat Zalo tư vấn</span>
              <div className="w-10 h-10 rounded-full bg-[#0068ff] text-white flex items-center justify-center shadow-md">
                <MessageCircle size={20} className="fill-current" />
              </div>
            </a>

            {/* Hotline Option 2 */}
            <a
              href={`tel:${hotlines[1].value}`}
              className="flex items-center gap-3 bg-white hover:bg-slate-50 text-text-primary px-4 py-2.5 rounded-full shadow-lg border border-slate-100 hover:border-slate-200 transition-all hover:scale-105 group"
            >
              <span className="text-sm font-bold text-slate-700">{hotlines[1].label}</span>
              <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center shadow-md">
                <Phone size={18} className="fill-current" />
              </div>
            </a>

            {/* Hotline Option 1 */}
            <a
              href={`tel:${hotlines[0].value}`}
              className="flex items-center gap-3 bg-white hover:bg-slate-50 text-text-primary px-4 py-2.5 rounded-full shadow-lg border border-slate-100 hover:border-slate-200 transition-all hover:scale-105 group"
            >
              <span className="text-sm font-bold text-slate-700">{hotlines[0].label}</span>
              <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center shadow-md">
                <Phone size={18} className="fill-current" />
              </div>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Liên hệ nhanh"
        className="relative w-14 h-14 rounded-full bg-primary hover:bg-primary-dark text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/20 group cursor-pointer"
      >
        {/* Ripple Pulse Wave */}
        <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-25 -z-10 group-hover:opacity-40 transition-opacity duration-300" />

        {/* Icons */}
        <div className="relative w-6 h-6 flex items-center justify-center">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="message"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-center"
            >
              <Phone size={22} className="animate-pulse" />
            </motion.div>
          )}
        </div>
      </button>
    </div>
  );
}
