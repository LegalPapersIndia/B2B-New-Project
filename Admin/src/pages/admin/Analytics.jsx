import { useEffect, useState } from "react";

export default function Analytics() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    // Dummy Analytics Data
    setStats([
      {
        id: 1,
        title: "Total Sellers",
        value: "1,284",
        growth: "+12%",
        color: "blue",
      },
      {
        id: 2,
        title: "Total Products",
        value: "8,472",
        growth: "+18%",
        color: "violet",
      },
      {
        id: 3,
        title: "Total Leads",
        value: "3,921",
        growth: "+24%",
        color: "green",
      },
      {
        id: 4,
        title: "Pending Approvals",
        value: "38",
        growth: "-5%",
        color: "yellow",
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#0A0A0F] text-white p-4 sm:p-6">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          Analytics Dashboard
        </h1>

        <p className="text-sm text-white/40 mt-1">
          Monitor marketplace performance and growth
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

        {stats.map((item) => (
          <div
            key={item.id}
            className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5"
          >
            <div className="flex items-center justify-between">

              {/* TITLE */}
              <div>
                <p className="text-sm text-white/50">
                  {item.title}
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {item.value}
                </h2>
              </div>

              {/* GROWTH */}
              <div
                className={`text-xs px-2 py-1 rounded-full
                  ${
                    item.growth.includes("-")
                      ? "bg-red-500/20 text-red-400"
                      : "bg-green-500/20 text-green-400"
                  }`}
              >
                {item.growth}
              </div>

            </div>
          </div>
        ))}

      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">

        {/* LEADS CHART */}
        <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5">

          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold">
              Monthly Leads
            </h2>

            <span className="text-xs text-white/40">
              Last 6 Months
            </span>
          </div>

          {/* Fake Chart */}
          <div className="flex items-end gap-3 h-64">

            {[40, 65, 55, 80, 95, 70].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-blue-800 hover:bg-blue-700 rounded-t-xl transition"
                style={{
                  height: `${h}%`,
                }}
              />
            ))}

          </div>

          {/* Labels */}
          <div className="flex justify-between text-xs text-white/30 mt-3">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
          </div>

        </div>

        {/* PRODUCTS GROWTH */}
        <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5">

          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold">
              Products Growth
            </h2>

            <span className="text-xs text-white/40">
              Last 6 Months
            </span>
          </div>

          {/* Fake Progress */}
          <div className="space-y-5">

            {[
              {
                month: "January",
                value: "45%",
              },
              {
                month: "February",
                value: "60%",
              },
              {
                month: "March",
                value: "72%",
              },
              {
                month: "April",
                value: "85%",
              },
              {
                month: "May",
                value: "91%",
              },
            ].map((item, i) => (
              <div key={i}>

                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-white/70">
                    {item.month}
                  </span>

                  <span className="text-white/40">
                    {item.value}
                  </span>
                </div>

                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-800 rounded-full"
                    style={{
                      width: item.value,
                    }}
                  />
                </div>

              </div>
            ))}

          </div>

        </div>

      </div>

      {/* RECENT ACTIVITY */}
      <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5">

        <div className="flex items-center justify-between mb-5">

          <h2 className="text-lg font-semibold">
            Recent Activity
          </h2>

          <button className="text-sm text-blue-400 hover:text-blue-300">
            View All
          </button>

        </div>

        <div className="space-y-4">

          {[
            "New seller Rahul Traders registered",
            "PVC Pipes product approved",
            "New enquiry generated for Steel Rod",
            "Chemical category updated",
            "Seller Tech Supplies verified",
          ].map((activity, i) => (
            <div
              key={i}
              className="flex items-center gap-3 border-b border-white/5 pb-4"
            >

              <div className="w-2 h-2 rounded-full bg-blue-500" />

              <p className="text-sm text-white/70">
                {activity}
              </p>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}