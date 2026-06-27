// // src/Pages/seller/SellerMyRequirement.jsx

// import React, { useState, useEffect } from "react";
// import { ClipboardList } from "lucide-react";
// import PostRequirementForm from "../../components/seller/PostRequirementForm";
// import MyRequirementsList from "../../components/seller/MyRequirementsList";
// import { getMyPostedRequirements } from "../../api/requirementApi";

// export default function SellerMyRequirement() {

//   const [requirements, setRequirements] = useState([]);
//   const [loading, setLoading]           = useState(true);

//   // ── FETCH MY POSTED REQUIREMENTS ──
//   const fetchRequirements = async () => {
//     try {
//       setLoading(true);
//       const data = await getMyPostedRequirements();
//       if (data.success) {
//         setRequirements(data.requirements);
//       }
//     } catch (err) {
//       console.error("fetchRequirements error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRequirements();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
//       <div className="max-w-4xl mx-auto">

//         {/* HEADER */}
//         <div className="mb-6">
//           <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-widest mb-2">
//             <ClipboardList className="w-4 h-4" />
//             Buyer Tools
//           </div>
//           <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
//             My Requirement
//           </h1>
//           <p className="mt-1 text-slate-500 text-sm">
//             Need something for your own business? Post your requirement and get quotes from other suppliers.
//           </p>
//         </div>

//         {/* FORM */}
//         <div className="mb-8">
//           {/* ✅ jab form se successfully post ho jaye, list refresh karo */}
//           <PostRequirementForm onPosted={fetchRequirements} />
//         </div>

//         {/* LIST */}
//         <div>
//           <h2 className="text-lg font-bold text-slate-900 mb-3">
//             Your Posted Requirements
//           </h2>
//           <MyRequirementsList requirements={requirements} loading={loading} />
//         </div>

//       </div>
//     </div>
//   );
// }




// src/Pages/seller/SellerMyRequirement.jsx

import React, { useState, useEffect } from "react";
import { ClipboardList, ChevronLeft, ChevronRight } from "lucide-react";
import PostRequirementForm from "../../components/seller/PostRequirementForm";
import MyRequirementsList from "../../components/seller/MyRequirementsList";
import { getMyPostedRequirements } from "../../api/requirementApi";

const ITEMS_PER_PAGE = 4;

export default function SellerMyRequirement() {

  const [requirements, setRequirements] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [currentPage, setCurrentPage]   = useState(1); // 

  // ── FETCH MY POSTED REQUIREMENTS ──
  const fetchRequirements = async () => {
    try {
      setLoading(true);
      const data = await getMyPostedRequirements();
      if (data.success) {
        setRequirements(data.requirements);
        setCurrentPage(1); 
      }
    } catch (err) {
      console.error("fetchRequirements error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequirements();
  }, []);

  
  const totalPages  = Math.ceil(requirements.length / ITEMS_PER_PAGE);
  const paginated   = requirements.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-widest mb-2">
            <ClipboardList className="w-4 h-4" />
            Buyer Tools
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            My Requirement
          </h1>
          <p className="mt-1 text-slate-500 text-sm">
            Need something for your own business? Post your requirement and get quotes from other suppliers.
          </p>
        </div>

        {/* FORM */}
        <div className="mb-8">
          <PostRequirementForm onPosted={fetchRequirements} />
        </div>

        {/* LIST */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-slate-900">
              Your Posted Requirements
            </h2>
           
            {!loading && requirements.length > 0 && (
              <span className="text-xs text-slate-400 font-medium">
                {requirements.length} requirement{requirements.length > 1 ? "s" : ""}
              </span>
            )}
          </div>

          <MyRequirementsList requirements={paginated} loading={loading} />

      
          {!loading && totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              {/* PREV */}
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-blue-900 hover:text-blue-900 disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {/* PAGE NUMBERS */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`flex h-9 w-9 items-center justify-center rounded-xl border text-sm font-medium transition ${
                    currentPage === page
                      ? "border-blue-900 bg-blue-900 text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:border-blue-900 hover:text-blue-900"
                  }`}
                >
                  {page}
                </button>
              ))}

              {/* NEXT */}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-blue-900 hover:text-blue-900 disabled:opacity-30"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}