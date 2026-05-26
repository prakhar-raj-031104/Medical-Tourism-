"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Phone } from "lucide-react";

const channels = [
  {
    name: "WhatsApp",
    href: "https://wa.me/1234567890?text=Hello%2C%20I%27d%20like%20to%20inquire%20about%20medical%20treatment",
    color: "bg-[#25D366]",
    hoverColor: "hover:bg-[#20BA5A]",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M11.999 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5.014L2 22l5.119-1.322A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.088-1.12l-.293-.174-3.039.784.807-2.96-.19-.304A8 8 0 1120 12a8.001 8.001 0 01-8 8z" />
      </svg>
    ),
  },
  {
    name: "Zalo",
    href: "https://zalo.me/0123456789",
    color: "bg-[#0068FF]",
    hoverColor: "hover:bg-[#0057D9]",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 12.99c-.16.4-.81.74-1.13.79-.29.04-.65.06-1.05-.06-.24-.08-.56-.18-.96-.35-1.69-.73-2.79-2.43-2.88-2.54-.08-.12-.69-.91-.69-1.74 0-.82.43-1.23.59-1.4.15-.16.34-.2.45-.2h.32c.1 0 .24-.04.38.29.14.33.48 1.17.53 1.25.05.09.08.19.02.31-.06.12-.09.19-.18.3-.09.11-.19.24-.27.33-.09.09-.18.18-.08.36.1.17.46.77.99 1.24.68.6 1.25.79 1.43.88.18.09.28.07.39-.04.1-.12.45-.52.57-.7.12-.18.24-.15.4-.09.17.06 1.06.5 1.24.59.18.09.3.14.34.21.05.09.05.49-.11.89z" />
      </svg>
    ),
  },
  {
    name: "WeChat",
    href: "#wechat-qr",
    color: "bg-[#07C160]",
    hoverColor: "hover:bg-[#06A850]",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.047c.134 0 .24-.11.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 01.208-.63C22.406 18.049 24 16.22 24 14.17c0-3.226-3.14-5.86-7.062-5.312zm-3.318 2.498c.535 0 .969.44.969.983a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.543.434-.983.969-.983zm6.396 0c.535 0 .969.44.969.983a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.543.434-.983.969-.983z" />
      </svg>
    ),
  },
  {
    name: "Call Us",
    href: "tel:+18007634468",
    color: "bg-brand-teal",
    hoverColor: "hover:bg-brand-teal-dark",
    icon: <Phone size={18} />,
  },
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white rounded-2xl shadow-floating border border-brand-border p-4 w-64"
          >
            <div className="mb-3">
              <p className="text-sm font-semibold text-brand-dark font-sans">Talk to us</p>
              <p className="text-xs text-brand-muted font-sans mt-0.5">
                We typically reply within minutes
              </p>
            </div>
            <div className="space-y-2">
              {channels.map((ch) => (
                <a
                  key={ch.name}
                  href={ch.href}
                  target={ch.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 px-3 py-2.5 ${ch.color} ${ch.hoverColor} text-white rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md`}
                >
                  {ch.icon}
                  <span className="text-sm font-semibold font-sans">{ch.name}</span>
                </a>
              ))}
            </div>
            <p className="text-[10px] text-brand-muted font-sans mt-3 text-center">
              Free consultation, no commitment
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-gradient-teal text-white flex items-center justify-center shadow-teal-lg hover:shadow-teal transition-all duration-300 hover:scale-110"
        whileTap={{ scale: 0.95 }}
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle size={22} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {!open && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute right-16 bottom-2 bg-white text-brand-dark text-xs font-semibold px-3 py-1.5 rounded-full shadow-card border border-brand-border whitespace-nowrap font-sans"
        >
          Chat with us 👋
        </motion.div>
      )}
    </div>
  );
}
