import {
  FaBoxOpen,
  FaUsers,
  FaClock,
  FaPlus,
  FaEye,
  FaArrowUp,
} from "react-icons/fa";

const DashboardContent = () => {
  return (
    <main className="flex-1 p-6 overflow-hidden">

      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Seller Dashboard
          </h1>

          <p className="text-gray-500 mt-1">
            Welcome back 👋 Manage your products and leads.
          </p>
        </div>

        {/* QUICK ACTION */}
        <button className="bg-[#F54900] hover:bg-[#d63f00] text-white px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 transition shadow-md hover:shadow-lg w-fit">

          <FaPlus />

          Add Product

        </button>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

        {/* CARD */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Total Products
              </p>

              <h2 className="text-3xl font-bold mt-2 text-gray-800">
                120
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center">
              <FaBoxOpen className="text-[#F54900] text-2xl" />
            </div>

          </div>

          <div className="flex items-center gap-2 mt-5 text-green-600 text-sm font-medium">
            <FaArrowUp />
            +12% this month
          </div>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Total Leads
              </p>

              <h2 className="text-3xl font-bold mt-2 text-gray-800">
                48
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
              <FaUsers className="text-[#1447E6] text-2xl" />
            </div>

          </div>

          <div className="flex items-center gap-2 mt-5 text-green-600 text-sm font-medium">
            <FaArrowUp />
            +8% this week
          </div>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Pending Products
              </p>

              <h2 className="text-3xl font-bold mt-2 text-gray-800">
                12
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-yellow-100 flex items-center justify-center">
              <FaClock className="text-yellow-600 text-2xl" />
            </div>

          </div>

          <div className="mt-5 text-sm text-yellow-600 font-medium">
            Waiting for admin approval
          </div>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Product Views
              </p>

              <h2 className="text-3xl font-bold mt-2 text-gray-800">
                2.4K
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
              <FaEye className="text-green-600 text-2xl" />
            </div>

          </div>

          <div className="flex items-center gap-2 mt-5 text-green-600 text-sm font-medium">
            <FaArrowUp />
            +20% growth
          </div>
        </div>

      </div>

      {/* LOWER SECTION */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* RECENT PRODUCTS */}
        <div className="xl:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 p-6">

          <div className="flex items-center justify-between mb-6">

            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Recent Products
              </h2>

              <p className="text-sm text-gray-500">
                Latest added products
              </p>
            </div>

            <button className="text-[#1447E6] font-medium">
              View All
            </button>

          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="text-left border-b">

                  <th className="pb-4 text-sm text-gray-500">
                    Product
                  </th>

                  <th className="pb-4 text-sm text-gray-500">
                    Category
                  </th>

                  <th className="pb-4 text-sm text-gray-500">
                    Status
                  </th>

                  <th className="pb-4 text-sm text-gray-500">
                    Price
                  </th>

                </tr>
              </thead>

              <tbody className="divide-y">

                <tr>

                  <td className="py-4 font-medium">
                    Steel Pipe
                  </td>

                  <td className="py-4 text-gray-500">
                    Industrial
                  </td>

                  <td className="py-4">
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
                      Pending
                    </span>
                  </td>

                  <td className="py-4 font-semibold">
                    ₹450
                  </td>

                </tr>

                <tr>

                  <td className="py-4 font-medium">
                    Plastic Granules
                  </td>

                  <td className="py-4 text-gray-500">
                    Plastic
                  </td>

                  <td className="py-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                      Approved
                    </span>
                  </td>

                  <td className="py-4 font-semibold">
                    ₹800
                  </td>

                </tr>

              </tbody>
            </table>
          </div>
        </div>

        {/* QUICK INFO */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">

          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Quick Actions
          </h2>

          <div className="space-y-4">

            <button className="w-full bg-[#1447E6] hover:bg-blue-700 text-white py-3 rounded-2xl font-medium transition">
              Add New Product
            </button>

            <button className="w-full bg-[#F54900] hover:bg-[#d63f00] text-white py-3 rounded-2xl font-medium transition">
              View Leads
            </button>

            <button className="w-full border border-gray-300 hover:border-[#1447E6] hover:text-[#1447E6] py-3 rounded-2xl font-medium transition">
              Edit Profile
            </button>

          </div>

          {/* INFO BOX */}
          <div className="mt-8 bg-orange-50 border border-orange-100 rounded-2xl p-5">

            <h3 className="font-bold text-gray-800 mb-2">
              Improve Your Sales 🚀
            </h3>

            <p className="text-sm text-gray-600 leading-relaxed">
              Add more products and complete your company profile
              to receive better buyer enquiries.
            </p>

          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardContent;