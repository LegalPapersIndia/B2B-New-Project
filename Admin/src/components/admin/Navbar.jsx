// export default function Navbar({ setIsOpen }) {
//   return (
//     <header className="h-16 bg-[#0D0D14] border-b border-white/[0.06] flex items-center justify-between px-4 sm:px-6 sticky top-0 z-10">
//       {/* Left - Hamburger + Page Title */}
//       <div className="flex items-center gap-3">
//         <button
//           onClick={() => setIsOpen((prev) => !prev)}
//           className="lg:hidden text-white/40 hover:text-white/80 transition-colors p-1"
//         >
//           <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//             <line x1="3" y1="12" x2="21" y2="12" />
//             <line x1="3" y1="6" x2="21" y2="6" />
//             <line x1="3" y1="18" x2="21" y2="18" />
//           </svg>
//         </button>
//         <div>
//           <h1 className="text-sm font-semibold text-slate-100">Dashboard</h1>
//           <p className="text-[11px] text-white/30 hidden sm:block">
//             Welcome back, Admin 👋
//           </p>
//         </div>
//       </div>

//       {/* Right - Search + Notifications + Profile */}
//       <div className="flex items-center gap-2 sm:gap-3">
//         {/* Search */}
//         <div className="hidden md:flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 w-48">
//           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/30">
//             <circle cx="11" cy="11" r="8" />
//             <line x1="21" y1="21" x2="16.65" y2="16.65" />
//           </svg>
//           <input
//             type="text"
//             placeholder="Search..."
//             className="bg-transparent outline-none text-sm text-slate-100 placeholder:text-white/20 w-full"
//           />
//         </div>

//         {/* Notifications */}
//         <button className="relative w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white/80 transition-colors">
//           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//             <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
//             <path d="M13.73 21a2 2 0 0 1-3.46 0" />
//           </svg>
//           <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
//         </button>

//         {/* Profile Avatar */}
//         <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-sm font-bold cursor-pointer">
//           A
//         </div>
//       </div>
//     </header>
//   );
// }




import { useState, useEffect, useRef } from "react";
import { FaBell, FaBars, FaUser } from "react-icons/fa";
import { MdInventory, MdPeople, MdEmail, MdCreditCard, MdNotifications } from "react-icons/md";
import { getNotifications, markAllRead } from "../../api/notificationApi";

const typeIcon = (type) => {
  switch (type) {
    case "new_seller":       return <MdPeople className="text-blue-400 text-lg" />;
    case "new_product":      return <MdInventory className="text-orange-400 text-lg" />;
    case "new_lead":         return <MdEmail className="text-green-400 text-lg" />;
    case "new_subscription": return <MdCreditCard className="text-yellow-400 text-lg" />;
    default:                 return <MdNotifications className="text-white/40 text-lg" />;
  }
};

const timeAgo = (date) => {
  const diff = Math.floor((new Date() - new Date(date)) / 1000);
  if (diff < 60)    return `${diff}s ago`;
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

export default function Navbar({ setIsOpen }) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount,   setUnreadCount]   = useState(0);
  const [showDropdown,  setShowDropdown]  = useState(false);
  const dropdownRef = useRef(null);

  const fetchNotifications = async () => {
    try {
      const data = await getNotifications();
      if (data.success) {
        setNotifications(data.notifications);
        setUnreadCount(data.unreadCount);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleBellClick = async () => {
    setShowDropdown((prev) => !prev);
    if (!showDropdown && unreadCount > 0) {
      await markAllRead();
      setUnreadCount(0);
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    }
  };

  return (
    <header className="h-16 bg-[#0D0D14] border-b border-white/[0.06] flex items-center justify-between px-4 sm:px-6 sticky top-0 z-10">

      {/* LEFT */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="lg:hidden text-white/40 hover:text-white/80 transition-colors p-1"
        >
          <FaBars size={18} />
        </button>
        <div>
          <h1 className="text-sm font-semibold text-slate-100">Dashboard</h1>
          <p className="text-[11px] text-white/30 hidden sm:block">Welcome back, Admin 👋</p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2 sm:gap-3">

        {/* NOTIFICATION BELL */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={handleBellClick}
            className="relative w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white/80 transition-colors"
          >
            <FaBell size={15} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {/* DROPDOWN */}
          {showDropdown && (
            <div className="absolute right-0 top-12 w-80 bg-[#0D0D14] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50">

              {/* HEADER */}
              <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">Notifications</h3>
                {unreadCount === 0 && (
                  <span className="text-xs text-white/30">All caught up ✓</span>
                )}
              </div>

              {/* LIST */}
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="py-10 text-center text-white/30 text-sm">
                    No notifications yet
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n._id}
                      className={`px-4 py-3 border-b border-white/[0.05] hover:bg-white/[0.03] transition ${
                        !n.isRead ? "bg-white/[0.04]" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex-shrink-0">
                          {typeIcon(n.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white/80 leading-snug">{n.message}</p>
                          <p className="text-xs text-white/30 mt-1">{timeAgo(n.createdAt)}</p>
                        </div>
                        {!n.isRead && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* FOOTER */}
              {notifications.length > 0 && (
                <div className="px-4 py-2 border-t border-white/10 text-center">
                  <span className="text-xs text-white/30">Last {notifications.length} notifications</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* PROFILE */}
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-sm font-bold cursor-pointer">
          <FaUser size={14} />
        </div>
      </div>
    </header>
  );
}
