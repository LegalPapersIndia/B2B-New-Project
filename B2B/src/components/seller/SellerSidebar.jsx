// import { Link } from "react-router-dom";

// const SellerSidebar = () => {
//   return (
//     <div className="w-64 bg-blue-900 text-white min-h-screen p-5">

//       <h2 className="text-xl font-bold mb-8">
//         Seller Panel
//       </h2>

//       <div className="space-y-4">

//         <Link className="block hover:bg-blue-800 p-2 rounded" to="/seller/dashboard">
//           Dashboard
//         </Link>

//         <Link className="block hover:bg-blue-800 p-2 rounded" to="/seller/add-product">
//           Add Product
//         </Link>

//         <Link className="block hover:bg-blue-800 p-2 rounded" to="/seller/products">
//           My Products
//         </Link>

//         <Link className="block hover:bg-blue-800 p-2 rounded" to="/seller/leads">
//           Leads
//         </Link>

//         <Link className="block hover:bg-blue-800 p-2 rounded" to="/seller/profile">
//           Profile
//         </Link>

//       </div>
//     </div>
//   );
// };

// export default SellerSidebar;




import { Link, useLocation } from "react-router-dom";

import {
  FaThLarge,
  FaPlusCircle,
  FaBoxOpen,
  FaUsers,
  FaUserCog,
} from "react-icons/fa";

const menuItems = [
  {
    name: "Dashboard",
    path: "/seller/dashboard",
    icon: FaThLarge,
  },
  {
    name: "Add Product",
    path: "/seller/add-product",
    icon: FaPlusCircle,
  },
  {
    name: "My Products",
    path: "/seller/products",
    icon: FaBoxOpen,
  },
  {
    name: "Leads",
    path: "/seller/leads",
    icon: FaUsers,
  },
  {
    name: "Profile",
    path: "/seller/profile",
    icon: FaUserCog,
  },
];

const SellerSidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-72 bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950 text-white p-5 relative overflow-hidden">

      {/* BLUR EFFECT */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl"></div>

      {/* LOGO / TITLE */}
      <div className="relative z-10 mb-10">

        <h2 className="text-3xl font-black tracking-tight">
          Seller
          <span className="text-orange-500">
            Panel
          </span>
        </h2>

        <p className="text-sm text-blue-200 mt-1">
          Manage your business easily
        </p>

      </div>

      {/* MENU */}
      <div className="space-y-4 relative z-10">

        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`group relative flex items-center gap-4 px-5 py-4 rounded-2xl overflow-hidden transition-all duration-500 border

              ${
                isActive
                  ? "bg-white text-blue-900 border-white shadow-2xl"
                  : "bg-white/5 border-white/10 hover:bg-white hover:text-blue-900 hover:-translate-y-1 hover:shadow-2xl"
              }`}
            >

              {/* TOP LINE */}
              <div className="absolute top-0 left-0 w-full h-1 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

              {/* ICON */}
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500

                ${
                  isActive
                    ? "bg-orange-500 text-white"
                    : "bg-white/10 text-orange-400 group-hover:bg-orange-500 group-hover:text-white"
                }`}
              >

                <Icon className="text-lg" />

              </div>

              {/* TEXT */}
              <div className="flex flex-col">

                <span className="font-semibold text-[15px]">
                  {item.name}
                </span>

                <span
                  className={`text-xs

                  ${
                    isActive
                      ? "text-gray-500"
                      : "text-blue-200 group-hover:text-gray-500"
                  }`}
                >
                  Manage {item.name.toLowerCase()}
                </span>

              </div>

              {/* GLOW */}
              <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-all duration-500"></div>

            </Link>
          );
        })}
      </div>

      {/* BOTTOM CARD */}
      <div className="mt-10 relative z-10">

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-5 shadow-2xl">

          <h3 className="font-bold text-lg mb-2">
            Boost Your Sales 🚀
          </h3>

          <p className="text-sm text-orange-100 leading-relaxed mb-4">
            Add more products and get more buyer enquiries faster.
          </p>

        <Link
  to="/seller/subscription"
  className="w-full bg-white text-orange-600 hover:bg-orange-50 py-3 rounded-2xl font-semibold transition block text-center"
>
  Upgrade Business
</Link>

        </div>

      </div>
    </aside>
  );
};

export default SellerSidebar;