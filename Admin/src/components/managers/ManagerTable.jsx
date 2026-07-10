// // src/components/admin/managers/ManagerTable.jsx

// export default function ManagerTable({ managers, loading, deletingId, onView, onEdit, onDelete }) {
//   return (
//     <div className="bg-[#0D0D14] border border-white/10 rounded-2xl overflow-hidden">
//       <div className="overflow-x-auto">
//         <table className="w-full text-sm text-left">
//           <thead className="bg-white/5 text-white/50 border-b border-white/10">
//             <tr>
//               <th className="p-4">Name</th>
//               <th className="p-4">Email</th>
//               <th className="p-4">Created</th>
//               <th className="p-4">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading && (
//               <tr>
//                 <td colSpan={4} className="p-10 text-center text-white/40">
//                   <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
//                   Loading...
//                 </td>
//               </tr>
//             )}
//             {!loading && managers.length === 0 && (
//               <tr>
//                 <td colSpan={4} className="p-10 text-center text-white/40">
//                   No manager accounts yet — create the first one!
//                 </td>
//               </tr>
//             )}
//             {!loading && managers.map((manager) => (
//               <tr key={manager._id} className="border-t border-white/10 hover:bg-white/[0.03] transition">
//                 <td className="p-4 font-medium">{manager.name}</td>
//                 <td className="p-4 text-white/60">{manager.email}</td>
//                 <td className="p-4 text-white/40 text-xs whitespace-nowrap">
//                   {new Date(manager.createdAt).toLocaleDateString("en-IN")}
//                 </td>
//                 <td className="p-4">
//                   <div className="flex gap-2">
//                     {/* ✅ NEW - VIEW button, chips list ki jagah */}
//                     <button
//                       onClick={() => onView(manager)}
//                       className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-xs transition"
//                     >
//                       View
//                     </button>
//                     <button
//                       onClick={() => onEdit(manager)}
//                       className="bg-violet-700 hover:bg-violet-800 px-3 py-1.5 rounded-lg text-xs transition"
//                     >
//                       Add Permissions
//                     </button>
//                     <button
//                       onClick={() => onDelete(manager)}
//                       disabled={deletingId === manager._id}
//                       className="bg-red-700 hover:bg-red-800 disabled:opacity-50 px-3 py-1.5 rounded-lg text-xs transition"
//                     >
//                       {deletingId === manager._id ? "..." : "Delete"}
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


// src/components/admin/managers/ManagerTable.jsx

export default function ManagerTable({ managers, loading, deletingId, onView, onEdit, onDelete }) {
  return (
    <div className="bg-[#0D0D14] border border-white/10 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left table-fixed">
          <thead className="bg-white/5 text-white/50 border-b border-white/10">
            <tr>
              <th className="p-4 w-[20%]">Name</th>
              <th className="p-4 w-[25%]">Email</th>
              <th className="p-4 w-[15%]">Created</th>
              <th className="p-4 w-[40%] text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={4} className="p-10 text-center text-white/40">
                  <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                  Loading...
                </td>
              </tr>
            )}
            {!loading && managers.length === 0 && (
              <tr>
                <td colSpan={4} className="p-10 text-center text-white/40">
                  No manager accounts yet — create the first one!
                </td>
              </tr>
            )}
            {!loading && managers.map((manager) => (
              <tr key={manager._id} className="border-t border-white/10 hover:bg-white/[0.03] transition">
                <td className="p-4 font-medium truncate">{manager.name}</td>
                <td className="p-4 text-white/60 truncate">{manager.email}</td>
                <td className="p-4 text-white/40 text-xs whitespace-nowrap">
                  {new Date(manager.createdAt).toLocaleDateString("en-IN")}
                </td>
                <td className="p-4">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => onView(manager)}
                      className="bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-xs transition"
                    >
                      View
                    </button>
                    <button
                      onClick={() => onEdit(manager)}
                      className="bg-violet-700 hover:bg-violet-800 px-3 py-1.5 rounded-lg text-xs transition"
                    >
                      Add Permissions
                    </button>
                    <button
                      onClick={() => onDelete(manager)}
                      disabled={deletingId === manager._id}
                      className="bg-red-700 hover:bg-red-800 disabled:opacity-50 px-3 py-1.5 rounded-lg text-xs transition"
                    >
                      {deletingId === manager._id ? "..." : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}