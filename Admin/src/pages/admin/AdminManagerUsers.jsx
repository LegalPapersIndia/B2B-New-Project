// // src/pages/admin/AdminManagerUsers.jsx

// import { useEffect, useState } from "react";
// import {
//   getManagerUsers,
//   createManagerUser,
//   updateManagerPermissions,
//   deleteManagerUser,
// } from "../../api/managerApi";
// import ConfirmModal from "../../components/common/ConfirmModal";

// //  NEW - permission modules list (yahin se baad mein naye modules add honge)
// const PERMISSION_MODULES = [
//   { key: "categories", label: "Categories" },
//   { key: "subcategories", label: "SubCategories" },
//   { key: "products", label: "Products" },
//   { key: "leads", label: "Enquiries" },
//   { key: "contacts", label: "Contacts" },
//   { key: "cities", label: "Cities" },
//   { key: "sellers", label: "Sellers" },
//   { key: "bulk-upload", label: "Bulk Upload" },
//   { key: "navbar", label: "Navbar" },
//   { key: "hero-slides", label: "Hero Slides" },
//   { key: "how-it-works", label: "How It Works" },
//   { key: "why-choose-us", label: "Why Choose Us" },
//   { key: "testimonials", label: "Testimonials" },
//   { key: "marketplace-stats", label: "Marketplace Stats" },
//   { key: "cta-section", label: "CTA Section" },
//   { key: "footer-settings", label: "Footer" },
//   { key: "plans", label: "Plans" },
//   { key: "blogs", label: "Blog" },
//   { key: "contact-page", label: "Contact Page" },
// ];

// export default function AdminManagerUsers() {
//   const [managers,   setManagers]   = useState([]);
//   const [loading,    setLoading]    = useState(true);
//   const [showForm,   setShowForm]   = useState(false);
//   const [saving,     setSaving]     = useState(false);
//   const [deletingId, setDeletingId] = useState(null);
//   const [error,      setError]      = useState("");
//   const [form, setForm] = useState({ name: "", email: "", password: "", permissions: [] });
//   const [showPass, setShowPass] = useState(false);

//   // ✅ NEW - edit permissions modal state
//   const [editingManager, setEditingManager] = useState(null);
//   const [editPermissions, setEditPermissions] = useState([]);
//   const [savingPermissions, setSavingPermissions] = useState(false);

//   const [confirmModal, setConfirmModal] = useState({
//     isOpen: false,
//     title: "",
//     message: "",
//     confirmText: "OK",
//     showCancel: false,
//     onConfirm: null,
//   });

//   // ─────────────────────────────────────────
//   // FETCH MANAGERS
//   // ─────────────────────────────────────────
//   const fetchManagers = async () => {
//     setLoading(true);
//     try {
//       const data = await getManagerUsers();
//       setManagers(data.managers || []);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchManagers(); }, []);

//   // ✅ NEW - checkbox toggle (create form ke liye)
//   const togglePermission = (key) => {
//     setForm((prev) => ({
//       ...prev,
//       permissions: prev.permissions.includes(key)
//         ? prev.permissions.filter((p) => p !== key)
//         : [...prev.permissions, key],
//     }));
//   };

//   // ✅ NEW - checkbox toggle (edit modal ke liye)
//   const toggleEditPermission = (key) => {
//     setEditPermissions((prev) =>
//       prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key]
//     );
//   };

//   // ─────────────────────────────────────────
//   // CREATE MANAGER
//   // ─────────────────────────────────────────
//   const handleCreate = async () => {
//     setError("");
//     if (!form.name || !form.email || !form.password) {
//       setError("All fields are required");
//       return;
//     }
//     if (form.password.length < 6) {
//       setError("Password must be at least 6 characters");
//       return;
//     }
//     setSaving(true);
//     try {
//       await createManagerUser(form);
//       setShowForm(false);
//       setForm({ name: "", email: "", password: "", permissions: [] });
//       fetchManagers();
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ✅ NEW - OPEN EDIT PERMISSIONS MODAL
//   const openEditPermissions = (manager) => {
//     setEditingManager(manager);
//     setEditPermissions(manager.permissions || []);
//   };

//   // ✅ NEW - SAVE UPDATED PERMISSIONS
//   const handleSavePermissions = async () => {
//     if (!editingManager) return;
//     setSavingPermissions(true);
//     try {
//       await updateManagerPermissions(editingManager._id, editPermissions);
//       setEditingManager(null);
//       fetchManagers();
//     } catch (err) {
//       console.error(err);
//       setConfirmModal({
//         isOpen: true,
//         title: "❌ Error",
//         message: "Failed to update permissions. Please try again.",
//         confirmText: "OK",
//         showCancel: false,
//         onConfirm: () => setConfirmModal({ isOpen: false }),
//       });
//     } finally {
//       setSavingPermissions(false);
//     }
//   };

//   // ─────────────────────────────────────────
//   // DELETE MANAGER
//   // ─────────────────────────────────────────
//   const handleDelete = (manager) => {
//     setConfirmModal({
//       isOpen: true,
//       title: "Delete Manager",
//       message: `Are you sure? "${manager.name}"'s account will be permanently deleted.`,
//       confirmText: "Delete",
//       showCancel: true,
//       onConfirm: async () => {
//         setDeletingId(manager._id);
//         try {
//           await deleteManagerUser(manager._id);
//           setManagers((prev) => prev.filter((m) => m._id !== manager._id));
//           setConfirmModal({ isOpen: false });
//         } catch {
//           setConfirmModal({
//             isOpen: true,
//             title: "❌ Error",
//             message: "Delete failed. Please try again.",
//             confirmText: "OK",
//             showCancel: false,
//             onConfirm: () => setConfirmModal({ isOpen: false }),
//           });
//         } finally {
//           setDeletingId(null);
//         }
//       },
//     });
//   };

//   return (
//     <div className="p-6 bg-[#0A0A0F] min-h-screen text-white">

//       {/* ================= CONFIRM MODAL ================= */}
//       <ConfirmModal
//         isOpen={confirmModal.isOpen}
//         title={confirmModal.title}
//         message={confirmModal.message}
//         confirmText={confirmModal.confirmText}
//         showCancel={confirmModal.showCancel}
//         onConfirm={confirmModal.onConfirm}
//         onCancel={() => setConfirmModal({ isOpen: false })}
//       />

//       {/* HEADER */}
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h1 className="text-2xl font-bold">Manager Users</h1>
//           <p className="text-white/40 text-sm mt-1">
//             {managers.length} manager account{managers.length !== 1 ? "s" : ""}
//           </p>
//         </div>
//         <button
//           onClick={() => { setShowForm(true); setError(""); }}
//           className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl text-sm font-medium transition"
//         >
//           + Create Manager
//         </button>
//       </div>

//       {/* INFO CARD */}
//       <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 mb-6 flex gap-3">
//         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2" className="flex-shrink-0 mt-0.5">
//           <circle cx="12" cy="12" r="10" />
//           <line x1="12" y1="8" x2="12" y2="12" />
//           <line x1="12" y1="16" x2="12.01" y2="16" />
//         </svg>
//         <p className="text-blue-300 text-sm leading-relaxed">
//           Managers only see the admin pages you assign them. You can add or remove page access anytime using <strong className="text-blue-200">Edit Permissions</strong>.
//         </p>
//       </div>

//       {/* TABLE */}
//       <div className="bg-[#0D0D14] border border-white/10 rounded-2xl overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm text-left">
//             <thead className="bg-white/5 text-white/50 border-b border-white/10">
//               <tr>
//                 <th className="p-4">Name</th>
//                 <th className="p-4">Email</th>
//                 <th className="p-4">Permissions</th>
//                 <th className="p-4">Created</th>
//                 <th className="p-4">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading && (
//                 <tr>
//                   <td colSpan={5} className="p-10 text-center text-white/40">
//                     <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
//                     Loading...
//                   </td>
//                 </tr>
//               )}
//               {!loading && managers.length === 0 && (
//                 <tr>
//                   <td colSpan={5} className="p-10 text-center text-white/40">
//                     No manager accounts yet — create the first one!
//                   </td>
//                 </tr>
//               )}
//               {!loading && managers.map((manager) => (
//                 <tr key={manager._id} className="border-t border-white/10 hover:bg-white/[0.03] transition">
//                   <td className="p-4 font-medium">{manager.name}</td>
//                   <td className="p-4 text-white/60">{manager.email}</td>

//                   {/* ✅ NEW - PERMISSIONS CHIPS */}
//                   <td className="p-4">
//                     <div className="flex flex-wrap gap-1.5">
//                       {manager.permissions?.length > 0 ? (
//                         manager.permissions.map((perm) => (
//                           <span key={perm} className="bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full text-[11px] font-medium capitalize">
//                             {perm}
//                           </span>
//                         ))
//                       ) : (
//                         <span className="text-white/30 text-xs">No access assigned</span>
//                       )}
//                     </div>
//                   </td>

//                   <td className="p-4 text-white/40 text-xs">
//                     {new Date(manager.createdAt).toLocaleDateString("en-IN")}
//                   </td>
//                   <td className="p-4">
//                     <div className="flex gap-2">
//                       {/* ✅ NEW - EDIT PERMISSIONS BUTTON */}
//                       <button
//                         onClick={() => openEditPermissions(manager)}
//                         className="bg-violet-700 hover:bg-violet-800 px-3 py-1.5 rounded-lg text-xs transition"
//                       >
//                         Edit Permissions
//                       </button>
//                       <button
//                         onClick={() => handleDelete(manager)}
//                         disabled={deletingId === manager._id}
//                         className="bg-red-700 hover:bg-red-800 disabled:opacity-50 px-3 py-1.5 rounded-lg text-xs transition"
//                       >
//                         {deletingId === manager._id ? "..." : "Delete"}
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* CREATE MODAL */}
//       {showForm && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
//           <div className="bg-[#0D0D14] border border-white/10 rounded-2xl w-full max-w-md">

//             <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center">
//               <h2 className="text-lg font-semibold">Create Manager</h2>
//               <button
//                 onClick={() => { setShowForm(false); setError(""); }}
//                 className="text-white/40 hover:text-white text-xl"
//               >
//                 ✕
//               </button>
//             </div>

//             <div className="p-6 space-y-4">

//               <div>
//                 <label className="text-white/50 text-xs mb-1 block">Full Name *</label>
//                 <input
//                   value={form.name}
//                   onChange={e => setForm({ ...form, name: e.target.value })}
//                   placeholder="e.g. Rahul Sharma"
//                   className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="text-white/50 text-xs mb-1 block">Email *</label>
//                 <input
//                   type="email"
//                   value={form.email}
//                   onChange={e => setForm({ ...form, email: e.target.value })}
//                   placeholder="e.g. manager@company.com"
//                   className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="text-white/50 text-xs mb-1 block">Password *</label>
//                 <div className="relative">
//                   <input
//                     type={showPass ? "text" : "password"}
//                     value={form.password}
//                     onChange={e => setForm({ ...form, password: e.target.value })}
//                     placeholder="Min 6 characters"
//                     className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPass(!showPass)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs"
//                   >
//                     {showPass ? "Hide" : "Show"}
//                   </button>
//                 </div>
//               </div>

//               {/* ✅ NEW - PERMISSIONS CHECKBOXES */}
//               <div>
//                 <label className="text-white/50 text-xs mb-2 block">Page Access *</label>
//                 <div className="grid grid-cols-2 gap-2">
//                   {PERMISSION_MODULES.map((mod) => (
//                     <label
//                       key={mod.key}
//                       className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm cursor-pointer hover:bg-white/10 transition"
//                     >
//                       <input
//                         type="checkbox"
//                         checked={form.permissions.includes(mod.key)}
//                         onChange={() => togglePermission(mod.key)}
//                         className="w-4 h-4 accent-blue-600"
//                       />
//                       {mod.label}
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               {error && (
//                 <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
//                   {error}
//                 </div>
//               )}

//             </div>

//             <div className="px-6 py-4 border-t border-white/10 flex justify-end gap-3">
//               <button
//                 onClick={() => { setShowForm(false); setError(""); }}
//                 className="px-4 py-2 border border-white/10 rounded-xl text-sm hover:bg-white/5 transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleCreate}
//                 disabled={saving}
//                 className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-xl text-sm font-medium transition"
//               >
//                 {saving ? "Creating..." : "Create Manager"}
//               </button>
//             </div>

//           </div>
//         </div>
//       )}

//       {/* ✅ NEW - EDIT PERMISSIONS MODAL */}
//       {editingManager && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
//           <div className="bg-[#0D0D14] border border-white/10 rounded-2xl w-full max-w-md">

//             <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center">
//               <h2 className="text-lg font-semibold">Edit Permissions</h2>
//               <button
//                 onClick={() => setEditingManager(null)}
//                 className="text-white/40 hover:text-white text-xl"
//               >
//                 ✕
//               </button>
//             </div>

//             <div className="p-6 space-y-4">
//               <p className="text-white/60 text-sm">
//                 Editing access for <span className="font-medium text-white">{editingManager.name}</span>
//               </p>

//               <div className="grid grid-cols-2 gap-2">
//                 {PERMISSION_MODULES.map((mod) => (
//                   <label
//                     key={mod.key}
//                     className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm cursor-pointer hover:bg-white/10 transition"
//                   >
//                     <input
//                       type="checkbox"
//                       checked={editPermissions.includes(mod.key)}
//                       onChange={() => toggleEditPermission(mod.key)}
//                       className="w-4 h-4 accent-blue-600"
//                     />
//                     {mod.label}
//                   </label>
//                 ))}
//               </div>
//             </div>

//             <div className="px-6 py-4 border-t border-white/10 flex justify-end gap-3">
//               <button
//                 onClick={() => setEditingManager(null)}
//                 className="px-4 py-2 border border-white/10 rounded-xl text-sm hover:bg-white/5 transition"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSavePermissions}
//                 disabled={savingPermissions}
//                 className="px-6 py-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 rounded-xl text-sm font-medium transition"
//               >
//                 {savingPermissions ? "Saving..." : "Save Permissions"}
//               </button>
//             </div>

//           </div>
//         </div>
//       )}

//     </div>
//   );
// }





// src/pages/admin/AdminManagerUsers.jsx

import { useEffect, useState } from "react";
import {
  getManagerUsers,
  createManagerUser,
  updateManagerPermissions,
  deleteManagerUser,
} from "../../api/managerApi";
import ConfirmModal from "../../components/common/ConfirmModal";
import ManagerTable from "../../components/managers/ManagerTable";
import CreateManagerModal from "../../components/managers/CreateManagerModal";
import ViewPermissionsModal from "../../components/managers/ViewPermissionsModal";
import EditPermissionsModal from "../../components/managers/EditPermissionsModal";

export default function AdminManagerUsers() {
  const [managers,   setManagers]   = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [showForm,   setShowForm]   = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [viewingManager, setViewingManager] = useState(null); 
  const [editingManager, setEditingManager] = useState(null);

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    confirmText: "OK",
    showCancel: false,
    onConfirm: null,
  });

  const fetchManagers = async () => {
    setLoading(true);
    try {
      const data = await getManagerUsers();
      setManagers(data.managers || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchManagers(); }, []);

  const handleCreate = async (form) => {
    await createManagerUser(form);
    setShowForm(false);
    fetchManagers();
  };

  const handleSavePermissions = async (managerId, permissions) => {
    try {
      await updateManagerPermissions(managerId, permissions);
      setEditingManager(null);
      fetchManagers();
    } catch (err) {
      console.error(err);
      setConfirmModal({
        isOpen: true,
        title: "❌ Error",
        message: "Failed to update permissions. Please try again.",
        confirmText: "OK",
        showCancel: false,
        onConfirm: () => setConfirmModal({ isOpen: false }),
      });
    }
  };

  const handleDelete = (manager) => {
    setConfirmModal({
      isOpen: true,
      title: "Delete Manager",
      message: `Are you sure? "${manager.name}"'s account will be permanently deleted.`,
      confirmText: "Delete",
      showCancel: true,
      onConfirm: async () => {
        setDeletingId(manager._id);
        try {
          await deleteManagerUser(manager._id);
          setManagers((prev) => prev.filter((m) => m._id !== manager._id));
          setConfirmModal({ isOpen: false });
        } catch {
          setConfirmModal({
            isOpen: true,
            title: "❌ Error",
            message: "Delete failed. Please try again.",
            confirmText: "OK",
            showCancel: false,
            onConfirm: () => setConfirmModal({ isOpen: false }),
          });
        } finally {
          setDeletingId(null);
        }
      },
    });
  };

  return (
    <div className="p-6 bg-[#0A0A0F] min-h-screen text-white">

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText={confirmModal.confirmText}
        showCancel={confirmModal.showCancel}
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal({ isOpen: false })}
      />

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Manager Users</h1>
          <p className="text-white/40 text-sm mt-1">
            {managers.length} manager account{managers.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl text-sm font-medium transition"
        >
          + Create Manager
        </button>
      </div>

      {/* INFO CARD */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 mb-6 flex gap-3">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2" className="flex-shrink-0 mt-0.5">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <p className="text-blue-300 text-sm leading-relaxed">
          Managers only see the admin pages you assign them. Use <strong className="text-blue-200">View</strong> to see current access, or <strong className="text-blue-200">Edit</strong> to change it.
        </p>
      </div>

      <ManagerTable
        managers={managers}
        loading={loading}
        deletingId={deletingId}
        onView={setViewingManager}
        onEdit={setEditingManager}
        onDelete={handleDelete}
      />

      {showForm && (
        <CreateManagerModal
          onClose={() => setShowForm(false)}
          onCreate={handleCreate}
        />
      )}

      {viewingManager && (
        <ViewPermissionsModal
          manager={viewingManager}
          onClose={() => setViewingManager(null)}
        />
      )}

      {editingManager && (
        <EditPermissionsModal
          manager={editingManager}
          onClose={() => setEditingManager(null)}
          onSave={handleSavePermissions}
        />
      )}

    </div>
  );
}