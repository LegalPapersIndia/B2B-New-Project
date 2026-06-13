import { useState, useEffect, useRef } from "react";
import { Send, Bot, User } from "lucide-react";
import { fmtNum } from "./utils";
import { SUGGESTIONS } from "./constants";

// ─── Chat Widget ─────────────────────────────────────────────
export default function ChatWidget({ stats }) {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Namaste! Main aapka B2B Admin Assistant hoon. Dashboard ke baare mein kuch poochein.",
      time: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

const getReply = (q) => {
    const lq = q.toLowerCase();
    if (lq.includes("seller"))
      return `The platform has a total of ${fmtNum(stats.totalSellers)} verified sellers.`;
    if (lq.includes("product"))
      return `A total of ${fmtNum(stats.totalProducts)} products are listed.`;
    if (lq.includes("lead"))
      return `A total of ${fmtNum(stats.totalLeads)} leads have been generated on the platform.`;
    if (lq.includes("enquir") || lq.includes("requirement"))
      return `${fmtNum(stats.totalEnquiries)} buy requirements have been submitted by buyers.`;
    if (lq.includes("pending"))
      return `A total of ${fmtNum(stats.pendingSubscriptions)} sellers have a pending subscription.`;
    return `Dashboard Summary:\n• Sellers: ${fmtNum(stats.totalSellers)}\n• Products: ${fmtNum(stats.totalProducts)}\n• Leads: ${fmtNum(stats.totalLeads)}\n• Requirements: ${fmtNum(stats.totalEnquiries)}\n• Pending Subscriptions: ${fmtNum(stats.pendingSubscriptions)}`;
  };

  const send = (text) => {
    const q = (text || input).trim();
    if (!q) return;
    setMessages((m) => [...m, { role: "user", text: q, time: new Date() }]);
    setInput("");
    setTyping(true);
    setTimeout(
      () => {
        setTyping(false);
        setMessages((m) => [
          ...m,
          { role: "bot", text: getReply(q), time: new Date() },
        ]);
      },
      800 + Math.random() * 500,
    );
  };

  return (
    <div className="bg-[#0D0D18] border border-white/[0.06] rounded-2xl flex flex-col h-[520px]">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06]">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center flex-shrink-0">
          <Bot size={17} className="text-white" />
        </div>
        <div>
          <p className="text-white text-sm font-semibold">Admin Assistant</p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] text-emerald-400 font-medium">
              Online
            </span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-end gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "bot" && (
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center flex-shrink-0">
                <Bot size={13} className="text-white" />
              </div>
            )}
            <div
              className={`max-w-[78%] px-3.5 py-2.5 text-[13px] leading-relaxed whitespace-pre-line ${
                msg.role === "user"
                  ? "bg-blue-600 text-white rounded-2xl rounded-br-sm"
                  : "bg-white/[0.06] text-white/80 rounded-2xl rounded-bl-sm"
              }`}
            >
              {msg.text}
              <p
                className={`text-[10px] mt-1 ${msg.role === "user" ? "text-blue-200/60 text-right" : "text-white/25"}`}
              >
                {msg.time.toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            {msg.role === "user" && (
              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <User size={13} className="text-white/50" />
              </div>
            )}
          </div>
        ))}

        {typing && (
          <div className="flex items-end gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center flex-shrink-0">
              <Bot size={13} className="text-white" />
            </div>
            <div className="bg-white/[0.06] rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1 items-center">
              {[0, 1, 2].map((j) => (
                <span
                  key={j}
                  className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce"
                  style={{ animationDelay: `${j * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      <div className="px-4 pb-2 flex flex-wrap gap-1.5">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => send(s)}
            className="text-[11px] font-medium px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 transition-colors"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 px-4 pb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Kuch poochein..."
          className="flex-1 bg-white/[0.05] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-[13px] text-white placeholder-white/25 outline-none focus:border-blue-500/40 transition-colors"
        />
        <button
          onClick={() => send()}
          className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-500 flex items-center justify-center transition-all active:scale-95 flex-shrink-0"
        >
          <Send size={15} className="text-white" />
        </button>
      </div>
    </div>
  );
}