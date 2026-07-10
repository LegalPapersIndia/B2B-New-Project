// src/components/admin/managers/ViewPermissionsModal.jsx

import { PERMISSION_MODULES } from "./permissionModules";

export default function ViewPermissionsModal({ manager, onClose }) {
  const assigned = manager.permissions || [];
  const assignedLabels = PERMISSION_MODULES.filter((mod) => assigned.includes(mod.key));

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-[#0D0D14] border border-white/10 rounded-2xl w-full max-w-md flex flex-col max-h-[80vh]">

        <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center flex-shrink-0">
          <h2 className="text-lg font-semibold">Page Access</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white text-xl">
            ✕
          </button>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto">
          <p className="text-white/60 text-sm">
            Pages visible to <span className="font-medium text-white">{manager.name}</span>
          </p>

          {assignedLabels.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {assignedLabels.map((mod) => (
                <span
                  key={mod.key}
                  className="bg-violet-500/20 text-violet-300 px-3 py-1.5 rounded-full text-xs font-medium"
                >
                  {mod.label}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-white/30 text-sm">No pages assigned yet.</p>
          )}
        </div>

        <div className="px-6 py-4 border-t border-white/10 flex justify-end flex-shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-white/10 rounded-xl text-sm hover:bg-white/5 transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}