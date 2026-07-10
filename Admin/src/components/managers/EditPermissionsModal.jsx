// src/components/admin/managers/EditPermissionsModal.jsx

import { useState } from "react";
import { PERMISSION_MODULES } from "./permissionModules";

export default function EditPermissionsModal({ manager, onClose, onSave }) {
  const [editPermissions, setEditPermissions] = useState(manager.permissions || []);
  const [saving, setSaving] = useState(false);

  const togglePermission = (key) => {
    setEditPermissions((prev) =>
      prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key]
    );
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(manager._id, editPermissions);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-[#0D0D14] border border-white/10 rounded-2xl w-full max-w-md flex flex-col max-h-[80vh]">

        <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center flex-shrink-0">
          <h2 className="text-lg font-semibold">Add Permissions</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white text-xl">
            ✕
          </button>
        </div>

        {/* ✅ scrollable content - modal ki height fix rahegi, list scroll hogi */}
        <div className="p-6 space-y-4 overflow-y-auto">
          <p className="text-white/60 text-sm">
            Page access for <span className="font-medium text-white">{manager.name}</span>
          </p>

          <div className="space-y-2">
            {PERMISSION_MODULES.map((mod) => {
              const isOn = editPermissions.includes(mod.key);
              return (
                <div
                  key={mod.key}
                  className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3"
                >
                  <span className="text-sm text-white/80">{mod.label}</span>
                  <button
                    onClick={() => togglePermission(mod.key)}
                    className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-200
                      ${isOn ? "bg-green-600" : "bg-white/10"}`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200
                        ${isOn ? "translate-x-6" : "translate-x-1"}`}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="px-6 py-4 border-t border-white/10 flex justify-end gap-3 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-white/10 rounded-xl text-sm hover:bg-white/5 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 rounded-xl text-sm font-medium transition"
          >
            {saving ? "Saving..." : "Save Permissions"}
          </button>
        </div>

      </div>
    </div>
  );
}