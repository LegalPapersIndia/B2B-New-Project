import { useState } from "react";

export default function Settings() {
  const [settings, setSettings] = useState({
    websiteName: "B2B Market",
    supportEmail: "support@b2b.com",
    phone: "+91 9999999999",
    autoApproveSellers: false,
    autoApproveProducts: false,
    leadSystem: true,
  });

  const handleChange = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    alert("Settings saved successfully (UI only)");
    console.log(settings);
  };

  return (
    <div className="min-h-screen w-full bg-[#0A0A0F] text-white p-4 sm:p-6">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-white/40 mt-1">
          Manage your admin panel configuration
        </p>
      </div>

      {/* FORM CARD */}
      <div className="bg-[#0D0D14] border border-white/10 rounded-2xl p-5 space-y-6">

        {/* WEBSITE INFO */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            General Settings
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div>
              <label className="text-xs text-white/50">
                Website Name
              </label>
              <input
                value={settings.websiteName}
                onChange={(e) =>
                  handleChange("websiteName", e.target.value)
                }
                className="w-full mt-1 bg-[#111118] border border-white/10 rounded-xl px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="text-xs text-white/50">
                Support Email
              </label>
              <input
                value={settings.supportEmail}
                onChange={(e) =>
                  handleChange("supportEmail", e.target.value)
                }
                className="w-full mt-1 bg-[#111118] border border-white/10 rounded-xl px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="text-xs text-white/50">
                Phone
              </label>
              <input
                value={settings.phone}
                onChange={(e) =>
                  handleChange("phone", e.target.value)
                }
                className="w-full mt-1 bg-[#111118] border border-white/10 rounded-xl px-3 py-2 text-sm"
              />
            </div>

          </div>
        </div>

        {/* TOGGLES */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Marketplace Controls
          </h2>

          <div className="space-y-4">

            {/* Sellers */}
            <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl">
              <div>
                <p className="text-sm">Auto Approve Sellers</p>
                <p className="text-xs text-white/40">
                  Directly approve new sellers
                </p>
              </div>

              <button
                onClick={() =>
                  handleChange(
                    "autoApproveSellers",
                    !settings.autoApproveSellers
                  )
                }
                className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                  settings.autoApproveSellers
                    ? "bg-blue-800"
                    : "bg-white/20"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full transition ${
                    settings.autoApproveSellers
                      ? "ml-6"
                      : "ml-0"
                  }`}
                />
              </button>
            </div>

            {/* Products */}
            <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl">
              <div>
                <p className="text-sm">Auto Approve Products</p>
                <p className="text-xs text-white/40">
                  Products go live instantly
                </p>
              </div>

              <button
                onClick={() =>
                  handleChange(
                    "autoApproveProducts",
                    !settings.autoApproveProducts
                  )
                }
                className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                  settings.autoApproveProducts
                    ? "bg-blue-800"
                    : "bg-white/20"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full transition ${
                    settings.autoApproveProducts
                      ? "ml-6"
                      : "ml-0"
                  }`}
                />
              </button>
            </div>

            {/* Leads */}
            <div className="flex items-center justify-between bg-white/5 p-3 rounded-xl">
              <div>
                <p className="text-sm">Lead System</p>
                <p className="text-xs text-white/40">
                  Enable enquiry/lead system
                </p>
              </div>

              <button
                onClick={() =>
                  handleChange("leadSystem", !settings.leadSystem)
                }
                className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                  settings.leadSystem
                    ? "bg-blue-800"
                    : "bg-white/20"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full transition ${
                    settings.leadSystem ? "ml-6" : "ml-0"
                  }`}
                />
              </button>
            </div>

          </div>
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={handleSave}
          className="w-full bg-blue-800 hover:bg-blue-900 py-3 rounded-xl text-sm font-semibold"
        >
          Save Settings
        </button>

      </div>
    </div>
  );
}