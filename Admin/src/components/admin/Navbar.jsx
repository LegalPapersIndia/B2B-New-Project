

// import { useState, useEffect, useRef } from "react";
// import { FaBell, FaBars, FaUser } from "react-icons/fa";
// import { MdInventory, MdPeople, MdEmail, MdCreditCard, MdNotifications } from "react-icons/md";
// import { getNotifications, markAllRead } from "../../api/notificationApi";

// const typeIcon = (type) => {
//   switch (type) {
//     case "new_seller":       return <MdPeople className="text-blue-400 text-lg" />;
//     case "new_product":      return <MdInventory className="text-orange-400 text-lg" />;
//     case "new_lead":         return <MdEmail className="text-green-400 text-lg" />;
//     case "new_subscription": return <MdCreditCard className="text-yellow-400 text-lg" />;
//     default:                 return <MdNotifications className="text-white/40 text-lg" />;
//   }
// };

// const timeAgo = (date) => {
//   const diff = Math.floor((new Date() - new Date(date)) / 1000);
//   if (diff < 60)    return `${diff}s ago`;
//   if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
//   if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
//   return `${Math.floor(diff / 86400)}d ago`;
// };

// export default function Navbar({ setIsOpen }) {
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount,   setUnreadCount]   = useState(0);
//   const [showDropdown,  setShowDropdown]  = useState(false);
//   const dropdownRef = useRef(null);

//   // ROLE CHECK
//   const adminRole = localStorage.getItem("adminRole");
//   const adminName = localStorage.getItem("adminName") || "Admin";
//   const isHR      = adminRole === "hr";

//   const fetchNotifications = async () => {
//     // HR KE LIYE NOTIFICATIONS SKIP KARO
//     if (isHR) return;
//     try {
//       const data = await getNotifications();
//       if (data.success) {
//         setNotifications(data.notifications);
//         setUnreadCount(data.unreadCount);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchNotifications();
//     // HR KE LIYE INTERVAL BHI NAHI
//     if (isHR) return;
//     const interval = setInterval(fetchNotifications, 30000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const handleClick = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setShowDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClick);
//     return () => document.removeEventListener("mousedown", handleClick);
//   }, []);

//   const handleBellClick = async () => {
//     setShowDropdown((prev) => !prev);
//     if (!showDropdown && unreadCount > 0) {
//       await markAllRead();
//       setUnreadCount(0);
//       setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
//     }
//   };

//   return (
//     <header className="h-16 bg-[#0D0D14] border-b border-white/[0.06] flex items-center justify-between px-4 sm:px-6 sticky top-0 z-10">

//       {/* LEFT */}
//       <div className="flex items-center gap-3">
//         <button
//           onClick={() => setIsOpen((prev) => !prev)}
//           className="lg:hidden text-white/40 hover:text-white/80 transition-colors p-1"
//         >
//           <FaBars size={18} />
//         </button>
//         <div>
//           <h1 className="text-sm font-semibold text-slate-100">
//             {isHR ? "Careers Management" : "Dashboard"}
//           </h1>
//           <p className="text-[11px] text-white/30 hidden sm:block">
//             Welcome back, {adminName} 👋
//           </p>
//         </div>
//       </div>

//       {/* RIGHT */}
//       <div className="flex items-center gap-2 sm:gap-3">

//         {/* NOTIFICATION BELL — SIRF ADMIN KO DIKHAO */}
//         {!isHR && (
//           <div className="relative" ref={dropdownRef}>
//             <button
//               onClick={handleBellClick}
//               className="relative w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white/80 transition-colors"
//             >
//               <FaBell size={15} />
//               {unreadCount > 0 && (
//                 <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center">
//                   {unreadCount > 9 ? "9+" : unreadCount}
//                 </span>
//               )}
//             </button>

//             {/* DROPDOWN */}
//             {showDropdown && (
//               <div className="absolute right-0 top-12 w-80 bg-[#0D0D14] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50">

//                 {/* HEADER */}
//                 <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
//                   <h3 className="text-sm font-semibold text-white">Notifications</h3>
//                   {unreadCount === 0 && (
//                     <span className="text-xs text-white/30">All caught up ✓</span>
//                   )}
//                 </div>

//                 {/* LIST */}
//                 <div className="max-h-80 overflow-y-auto">
//                   {notifications.length === 0 ? (
//                     <div className="py-10 text-center text-white/30 text-sm">
//                       No notifications yet
//                     </div>
//                   ) : (
//                     notifications.map((n) => (
//                       <div
//                         key={n._id}
//                         className={`px-4 py-3 border-b border-white/[0.05] hover:bg-white/[0.03] transition ${
//                           !n.isRead ? "bg-white/[0.04]" : ""
//                         }`}
//                       >
//                         <div className="flex items-start gap-3">
//                           <div className="mt-0.5 flex-shrink-0">
//                             {typeIcon(n.type)}
//                           </div>
//                           <div className="flex-1 min-w-0">
//                             <p className="text-sm text-white/80 leading-snug">{n.message}</p>
//                             <p className="text-xs text-white/30 mt-1">{timeAgo(n.createdAt)}</p>
//                           </div>
//                           {!n.isRead && (
//                             <span className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
//                           )}
//                         </div>
//                       </div>
//                     ))
//                   )}
//                 </div>

//                 {/* FOOTER */}
//                 {notifications.length > 0 && (
//                   <div className="px-4 py-2 border-t border-white/10 text-center">
//                     <span className="text-xs text-white/30">Last {notifications.length} notifications</span>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         )}

//         {/* PROFILE AVATAR */}
//         <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold cursor-pointer
//           ${isHR
//             ? "bg-gradient-to-br from-green-500 to-teal-600"
//             : "bg-gradient-to-br from-blue-500 to-violet-600"
//           }`}>
//           <FaUser size={14} />
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

  // ROLE CHECK
  const adminRole = localStorage.getItem("adminRole");
  const adminName = localStorage.getItem("adminName") || "Admin";
  const isHR      = adminRole === "hr";
  const isManager = adminRole === "manager"; // ✅ NEW

  const fetchNotifications = async () => {
    // HR + MANAGER KE LIYE NOTIFICATIONS SKIP KARO
    if (isHR || isManager) return; // ✅ UPDATED
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
    // HR + MANAGER KE LIYE INTERVAL BHI NAHI
    if (isHR || isManager) return; // ✅ UPDATED
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
          <h1 className="text-sm font-semibold text-slate-100">
            {isHR ? "Careers Management" : "Dashboard"}
          </h1>
          <p className="text-[11px] text-white/30 hidden sm:block">
            Welcome back, {adminName} 👋
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2 sm:gap-3">

        {/* NOTIFICATION BELL — SIRF ADMIN KO DIKHAO */}
        {!isHR && !isManager && ( // ✅ UPDATED
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
        )}

        {/* PROFILE AVATAR */}
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold cursor-pointer
          ${isHR
            ? "bg-gradient-to-br from-green-500 to-teal-600"
            : isManager
            ? "bg-gradient-to-br from-violet-500 to-purple-600" // ✅ NEW
            : "bg-gradient-to-br from-blue-500 to-violet-600"
          }`}>
          <FaUser size={14} />
        </div>

      </div>
    </header>
  );
}