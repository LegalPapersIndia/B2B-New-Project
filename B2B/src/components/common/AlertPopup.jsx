
// src/components/common/AlertPopup.jsx
// PURA FILE REPLACE KARO

import React, { useEffect } from "react";
import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle, FaTimes } from "react-icons/fa";

const CONFIG = {
  success: {
    icon: FaCheckCircle,
    iconColor: "text-emerald-400",
    borderColor: "border-emerald-500/30",
    titleColor: "text-emerald-400",
    title: "Success",
    progressColor: "bg-emerald-400",
  },
  error: {
    icon: FaTimesCircle,
    iconColor: "text-red-400",
    borderColor: "border-red-500/30",
    titleColor: "text-red-400",
    title: "Error",
    progressColor: "bg-red-400",
  },
  warning: {
    icon: FaExclamationTriangle,
    iconColor: "text-orange-400",
    borderColor: "border-orange-500/30",
    titleColor: "text-orange-400",
    title: "Warning",
    progressColor: "bg-orange-400",
  },
};

// ─────────────────────────────────────────
// children prop add kiya — confirm buttons ke liye
// ─────────────────────────────────────────
const AlertPopup = ({
  type      = "error",
  message,
  onClose,
  autoClose = true,
  duration  = 4000,
  children,           // ← NEW: confirm buttons pass ho sakte hain
}) => {
  const cfg  = CONFIG[type] || CONFIG.error;
  const Icon = cfg.icon;

  useEffect(() => {
    // children hain (confirm mode) toh auto close mat karo
    if (!autoClose || !onClose || children) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [autoClose, duration, onClose, children]);

  if (!message) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={children ? undefined : onClose}  // confirm mode mein bahar click se close na ho
      >
        <div
          className={`relative w-full max-w-md bg-gradient-to-br from-[#0f172a] to-[#1e3a5f] border ${cfg.borderColor} rounded-3xl shadow-2xl overflow-hidden`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* PROGRESS BAR — sirf non-confirm mode mein */}
          {autoClose && !children && (
            <div className="h-1 w-full bg-white/10">
              <div
                className={`h-full ${cfg.progressColor} opacity-70 origin-left`}
                style={{ animation: `shrink ${duration}ms linear forwards` }}
              />
            </div>
          )}

          <div className="p-7 flex gap-5 items-start">
            <div className={`mt-0.5 text-3xl ${cfg.iconColor} flex-shrink-0`}>
              <Icon />
            </div>
            <div className="flex-1">
              <p className={`font-bold text-base mb-1 ${cfg.titleColor}`}>{cfg.title}</p>
              <p className="text-white/80 text-sm leading-relaxed">{message}</p>
            </div>
            {/* X button — sirf non-confirm mode mein */}
            {!children && (
              <button onClick={onClose} className="text-white/40 hover:text-white/90 transition mt-0.5">
                <FaTimes className="text-lg" />
              </button>
            )}
          </div>

          {/* DEFAULT OK BUTTON — sirf non-confirm mode mein */}
          {!children && (
            <div className="px-7 pb-6">
              <button
                onClick={onClose}
                className="w-full py-3 rounded-2xl font-semibold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all"
              >
                OK, Got it
              </button>
            </div>
          )}

          {/* CONFIRM BUTTONS — children se aayenge */}
          {children}

        </div>
      </div>

      <style>{`
        @keyframes shrink {
          from { transform: scaleX(1); }
          to   { transform: scaleX(0); }
        }
      `}</style>
    </>
  );
};

export default AlertPopup;