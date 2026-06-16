


// // import { Link, useLocation } from "react-router-dom";

// // import {
// //   FaThLarge,
// //   FaPlusCircle,
// //   FaBoxOpen,
// //   FaUsers,
// //   FaUserCog,
// // } from "react-icons/fa";

// // const menuItems = [
// //   {
// //     name: "Dashboard",
// //     path: "/seller/dashboard",
// //     icon: FaThLarge,
// //   },
// //   {
// //     name: "Add Product",
// //     path: "/seller/add-product",
// //     icon: FaPlusCircle,
// //   },
// //   {
// //     name: "My Products",
// //     path: "/seller/products",
// //     icon: FaBoxOpen,
// //   },
// //   {
// //     name: "Leads",
// //     path: "/seller/leads",
// //     icon: FaUsers,
// //   },
// //   {
// //     name: "Profile",
// //     path: "/seller/profile",
// //     icon: FaUserCog,
// //   },
// // ];

// // const SellerSidebar = () => {
// //   const location = useLocation();

// //   return (
// //     <aside className="w-72 bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950 text-white p-5 relative overflow-hidden">

// //       {/* BLUR EFFECT */}
// //       <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl"></div>

// //       {/* LOGO / TITLE */}
// //       <div className="relative z-10 mb-10">

// //         <h2 className="text-3xl font-black tracking-tight">
// //           Seller
// //           <span className="text-orange-500">
// //             Panel
// //           </span>
// //         </h2>

// //         <p className="text-sm text-blue-200 mt-1">
// //           Manage your business easily
// //         </p>

// //       </div>

// //       {/* MENU */}
// //       <div className="space-y-4 relative z-10">

// //         {menuItems.map((item) => {
// //           const Icon = item.icon;

// //           const isActive =
// //             location.pathname === item.path;

// //           return (
// //             <Link
// //               key={item.name}
// //               to={item.path}
// //               className={`group relative flex items-center gap-4 px-5 py-4 rounded-2xl overflow-hidden transition-all duration-500 border

// //               ${
// //                 isActive
// //                   ? "bg-white text-blue-900 border-white shadow-2xl"
// //                   : "bg-white/5 border-white/10 hover:bg-white hover:text-blue-900 hover:-translate-y-1 hover:shadow-2xl"
// //               }`}
// //             >

// //               {/* TOP LINE */}
// //               <div className="absolute top-0 left-0 w-full h-1 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

// //               {/* ICON */}
// //               <div
// //                 className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500

// //                 ${
// //                   isActive
// //                     ? "bg-orange-500 text-white"
// //                     : "bg-white/10 text-orange-400 group-hover:bg-orange-500 group-hover:text-white"
// //                 }`}
// //               >

// //                 <Icon className="text-lg" />

// //               </div>

// //               {/* TEXT */}
// //               <div className="flex flex-col">

// //                 <span className="font-semibold text-[15px]">
// //                   {item.name}
// //                 </span>

// //                 <span
// //                   className={`text-xs

// //                   ${
// //                     isActive
// //                       ? "text-gray-500"
// //                       : "text-blue-200 group-hover:text-gray-500"
// //                   }`}
// //                 >
// //                   Manage {item.name.toLowerCase()}
// //                 </span>

// //               </div>

// //               {/* GLOW */}
// //               <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-all duration-500"></div>

// //             </Link>
// //           );
// //         })}
// //       </div>

// //       {/* BOTTOM CARD */}
// //       <div className="mt-10 relative z-10">

// //         <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-5 shadow-2xl">

// //           <h3 className="font-bold text-lg mb-2">
// //             Boost Your Sales 🚀
// //           </h3>

// //           <p className="text-sm text-orange-100 leading-relaxed mb-4">
// //             Add more products and get more buyer enquiries faster.
// //           </p>

// //         <Link
// //   to="/seller/subscription"
// //   className="w-full bg-white text-orange-600 hover:bg-orange-50 py-3 rounded-2xl font-semibold transition block text-center"
// // >
// //   Upgrade Business
// // </Link>

// //         </div>

// //       </div>
// //     </aside>
// //   );
// // };

// // export default SellerSidebar;



// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";

// import {
//   FaThLarge,
//   FaPlusCircle,
//   FaBoxOpen,
//   FaUsers,
//   FaUserCog,
//   FaBars,
//   FaTimes,
// } from "react-icons/fa";

// const menuItems = [
//   { name: "Dashboard",   path: "/seller/dashboard",   icon: FaThLarge   },
//   { name: "Add Product", path: "/seller/add-product", icon: FaPlusCircle },
//   { name: "My Products", path: "/seller/products",    icon: FaBoxOpen    },
//   { name: "Leads",       path: "/seller/leads",       icon: FaUsers      },
//   { name: "Profile",     path: "/seller/profile",     icon: FaUserCog    },
// ];

// const SellerSidebar = () => {
//   const location = useLocation();
//   const [mobileOpen, setMobileOpen] = useState(false);

//   // ── SHARED MENU LINKS ──
//   const MenuLinks = ({ onClickItem }) => (
//     <div className="space-y-4 relative z-10">
//       {menuItems.map((item) => {
//         const Icon = item.icon;
//         const isActive = location.pathname === item.path;
//         return (
//           <Link
//             key={item.name}
//             to={item.path}
//             onClick={onClickItem}
//             className={`group relative flex items-center gap-4 px-5 py-4 rounded-2xl overflow-hidden transition-all duration-500 border
//               ${isActive
//                 ? "bg-white text-blue-900 border-white shadow-2xl"
//                 : "bg-white/5 border-white/10 hover:bg-white hover:text-blue-900 hover:-translate-y-1 hover:shadow-2xl"
//               }`}
//           >
//             {/* TOP LINE */}
//             <div className="absolute top-0 left-0 w-full h-1 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

//             {/* ICON */}
//             <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 flex-shrink-0
//               ${isActive
//                 ? "bg-orange-500 text-white"
//                 : "bg-white/10 text-orange-400 group-hover:bg-orange-500 group-hover:text-white"
//               }`}
//             >
//               <Icon className="text-lg" />
//             </div>

//             {/* TEXT */}
//             <div className="flex flex-col">
//               <span className="font-semibold text-[15px]">{item.name}</span>
//               <span className={`text-xs ${isActive ? "text-gray-500" : "text-blue-200 group-hover:text-gray-500"}`}>
//                 Manage {item.name.toLowerCase()}
//               </span>
//             </div>

//             {/* GLOW */}
//             <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-all duration-500" />
//           </Link>
//         );
//       })}
//     </div>
//   );

//   // ── BOTTOM CARD ──
//   const BottomCard = ({ onClickItem }) => (
//     <div className="mt-10 relative z-10">
//       <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-5 shadow-2xl">
//         <h3 className="font-bold text-lg mb-2">Boost Your Sales 🚀</h3>
//         <p className="text-sm text-orange-100 leading-relaxed mb-4">
//           Add more products and get more buyer enquiries faster.
//         </p>
//         <Link
//           to="/seller/subscription"
//           onClick={onClickItem}
//           className="w-full bg-white text-orange-600 hover:bg-orange-50 py-3 rounded-2xl font-semibold transition block text-center"
//         >
//           Upgrade Business
//         </Link>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       {/* ═══════════════════════════════════════
//           MOBILE TOPBAR
//       ═══════════════════════════════════════ */}
//       <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-blue-950 flex items-center justify-between px-4 py-3 shadow-lg">
//         <h2 className="text-xl font-black tracking-tight text-white">
//           Seller<span className="text-orange-500">Panel</span>
//         </h2>
//         <button
//           onClick={() => setMobileOpen((v) => !v)}
//           className="text-white text-xl p-2 rounded-xl bg-white/10 hover:bg-white/20 transition"
//         >
//           {mobileOpen ? <FaTimes /> : <FaBars />}
//         </button>
//       </div>

//       {/* ═══════════════════════════════════════
//           MOBILE OVERLAY
//       ═══════════════════════════════════════ */}
//       {mobileOpen && (
//         <div
//           className="lg:hidden fixed inset-0 z-40 bg-black/60"
//           onClick={() => setMobileOpen(false)}
//         />
//       )}

//       {/* ═══════════════════════════════════════
//           MOBILE DRAWER
//       ═══════════════════════════════════════ */}
//       <aside
//         className={`lg:hidden fixed top-0 left-0 z-50 h-full w-72
//           bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950
//           text-white flex flex-col
//           transition-transform duration-300
//           ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
//       >
//         {/* BLUR */}
//         <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />

//         {/* SCROLLABLE CONTENT */}
//         <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden p-5">

//           {/* LOGO */}
//           <div className="relative z-10 mb-8 flex items-center justify-between flex-shrink-0">
//             <div>
//               <h2 className="text-3xl font-black tracking-tight">
//                 Seller<span className="text-orange-500">Panel</span>
//               </h2>
//               <p className="text-sm text-blue-200 mt-1">Manage your business easily</p>
//             </div>
//             <button
//               onClick={() => setMobileOpen(false)}
//               className="text-white/60 hover:text-white text-xl p-1"
//             >
//               <FaTimes />
//             </button>
//           </div>

//           {/* MENU */}
//           <MenuLinks onClickItem={() => setMobileOpen(false)} />

//           {/* BOTTOM CARD */}
//           <BottomCard onClickItem={() => setMobileOpen(false)} />

//         </div>
//       </aside>

//       {/* ═══════════════════════════════════════
//           DESKTOP SIDEBAR
//       ═══════════════════════════════════════ */}
//       <aside className="hidden lg:flex flex-col w-72 flex-shrink-0 sticky top-0 h-screen
//         bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950 text-white">

//         {/* BLUR */}
//         <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />

//         {/* SCROLLABLE CONTENT */}
//         <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden p-5">

//           {/* LOGO */}
//           <div className="relative z-10 mb-10 flex-shrink-0">
//             <h2 className="text-3xl font-black tracking-tight">
//               Seller<span className="text-orange-500">Panel</span>
//             </h2>
//             <p className="text-sm text-blue-200 mt-1">Manage your business easily</p>
//           </div>

//           {/* MENU */}
//           <MenuLinks onClickItem={() => {}} />

//           {/* BOTTOM CARD */}
//           <BottomCard onClickItem={() => {}} />

//         </div>
//       </aside>

//       {/* MOBILE TOP SPACER */}
//       <div className="lg:hidden h-14 flex-shrink-0" />
//     </>
//   );
// };

// export default SellerSidebar;




import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  FaThLarge,
  FaPlusCircle,
  FaBoxOpen,
  FaUsers,
  FaUserCog,
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";

const menuItems = [
  { name: "Dashboard",   path: "/seller/dashboard",   icon: FaThLarge   },
  { name: "Add Product", path: "/seller/add-product", icon: FaPlusCircle },
  { name: "My Products", path: "/seller/products",    icon: FaBoxOpen    },
  { name: "Leads",       path: "/seller/leads",       icon: FaUsers      },
  { name: "Profile",     path: "/seller/profile",     icon: FaUserCog    },
];

const SellerSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  // ── LOGOUT ──
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // ── SHARED MENU LINKS ──
  const MenuLinks = ({ onClickItem }) => (
    <div className="space-y-4 relative z-10">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.name}
            to={item.path}
            onClick={onClickItem}
            className={`group relative flex items-center gap-4 px-5 py-4 rounded-2xl overflow-hidden transition-all duration-500 border
              ${isActive
                ? "bg-white text-blue-900 border-white shadow-2xl"
                : "bg-white/5 border-white/10 hover:bg-white hover:text-blue-900 hover:-translate-y-1 hover:shadow-2xl"
              }`}
          >
            {/* TOP LINE */}
            <div className="absolute top-0 left-0 w-full h-1 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

            {/* ICON */}
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 flex-shrink-0
              ${isActive
                ? "bg-orange-500 text-white"
                : "bg-white/10 text-orange-400 group-hover:bg-orange-500 group-hover:text-white"
              }`}
            >
              <Icon className="text-lg" />
            </div>

            {/* TEXT */}
            <div className="flex flex-col">
              <span className="font-semibold text-[15px]">{item.name}</span>
              <span className={`text-xs ${isActive ? "text-gray-500" : "text-blue-200 group-hover:text-gray-500"}`}>
                Manage {item.name.toLowerCase()}
              </span>
            </div>

            {/* GLOW */}
            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-all duration-500" />
          </Link>
        );
      })}
    </div>
  );

  // ── BOTTOM CARD ──
  const BottomCard = ({ onClickItem }) => (
    <div className="mt-10 relative z-10">
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-5 shadow-2xl">
        <h3 className="font-bold text-lg mb-2">Boost Your Sales 🚀</h3>
        <p className="text-sm text-orange-100 leading-relaxed mb-4">
          Add more products and get more buyer enquiries faster.
        </p>
        <Link
          to="/seller/subscription"
          onClick={onClickItem}
          className="w-full bg-white text-orange-600 hover:bg-orange-50 py-3 rounded-2xl font-semibold transition block text-center"
        >
          Upgrade Business
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* ═══════════════════════════════════════
          MOBILE TOPBAR
      ═══════════════════════════════════════ */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-blue-950 flex items-center justify-between px-4 py-3 shadow-lg">
        <div className="flex items-center gap-3">
          {/* LOGO — HOME LINK */}
          <Link to="/" className="flex items-center">
            <div className="w-9 h-9 bg-[#F54900] rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
              <span className="text-white font-black text-lg">B</span>
            </div>
          </Link>
          <h2 className="text-xl font-black tracking-tight text-white">
            Seller<span className="text-orange-500">Panel</span>
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="text-white text-lg p-2 rounded-xl bg-white/10 hover:bg-white/20 transition"
            title="Logout"
          >
            <FaSignOutAlt />
          </button>

          {/* HAMBURGER */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="text-white text-xl p-2 rounded-xl bg-white/10 hover:bg-white/20 transition"
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          MOBILE OVERLAY
      ═══════════════════════════════════════ */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ═══════════════════════════════════════
          MOBILE DRAWER
      ═══════════════════════════════════════ */}
      <aside
        className={`lg:hidden fixed top-0 left-0 z-50 h-full w-72
          bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950
          text-white flex flex-col
          transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* BLUR */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* SCROLLABLE CONTENT */}
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden p-5">

          {/* LOGO */}
          <div className="relative z-10 mb-8 flex items-center justify-between flex-shrink-0">
            <div>
              <h2 className="text-3xl font-black tracking-tight">
                Seller<span className="text-orange-500">Panel</span>
              </h2>
              <p className="text-sm text-blue-200 mt-1">Manage your business easily</p>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-white/60 hover:text-white text-xl p-1"
            >
              <FaTimes />
            </button>
          </div>

          {/* MENU */}
          <MenuLinks onClickItem={() => setMobileOpen(false)} />

          {/* BOTTOM CARD */}
          <BottomCard onClickItem={() => setMobileOpen(false)} />

        </div>
      </aside>

      {/* ═══════════════════════════════════════
          DESKTOP SIDEBAR
      ═══════════════════════════════════════ */}
      <aside className="hidden lg:flex flex-col w-72 flex-shrink-0 sticky top-0 h-screen
        bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950 text-white">

        {/* BLUR */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* SCROLLABLE CONTENT */}
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden p-5">

          {/* LOGO */}
          <div className="relative z-10 mb-10 flex-shrink-0">
            <h2 className="text-3xl font-black tracking-tight">
              Seller<span className="text-orange-500">Panel</span>
            </h2>
            <p className="text-sm text-blue-200 mt-1">Manage your business easily</p>
          </div>

          {/* MENU */}
          <MenuLinks onClickItem={() => {}} />

          {/* BOTTOM CARD */}
          <BottomCard onClickItem={() => {}} />

        </div>
      </aside>

      {/* MOBILE TOP SPACER */}
      <div className="lg:hidden h-14 flex-shrink-0" />
    </>
  );
};

export default SellerSidebar;