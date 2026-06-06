
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  ShieldCheck,
  Filter,
  ChevronRight,
  IndianRupee,
  Loader,

} from "lucide-react";

import { getSubCategories } from "../../api/subCategoryApi";

export default function FilterSidebar({
  selectedState,
  setSelectedState,

  verifiedOnly,
  setVerifiedOnly,

  price,
  setPrice,
   categorySlug,
}) {
  // =========================
  // CURRENT CATEGORY
  // =========================
  const slug = categorySlug;

  // =========================
  // STATES
  // =========================
  const [states, setStates] = useState([]);
  const [loadingStates, setLoadingStates] = useState(true);

  // =========================
  // SUBCATEGORIES
  // =========================
  const [relatedCategories, setRelatedCategories] = useState([]);
  const [loadingSubCategories, setLoadingSubCategories] = useState(true);

  // =========================
  // FETCH SUBCATEGORIES
  // =========================
  useEffect(() => {
    const fetchSubCategories = async () => {
  try {
    setLoadingSubCategories(true);

    const response = await getSubCategories();

    const subcategories =
      response.subCategories || [];

    // FILTER CATEGORY WISE
    const filteredSubCategories =
      subcategories.filter(
        (item) =>
          item.category?.slug?.toLowerCase() ===
          slug?.toLowerCase()
      );

    setRelatedCategories(filteredSubCategories);
  } catch (error) {
    console.error(
      "Error fetching subcategories:",
      error
    );

    setRelatedCategories([]);
  } finally {
    setLoadingSubCategories(false);
  }
};

    fetchSubCategories();
  }, [slug]);

  // =========================
  // FETCH INDIA STATES
  // =========================
  useEffect(() => {
    setLoadingStates(true);

    fetch("https://countriesnow.space/api/v0.1/countries/states", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        country: "India",
      }),
    })
      .then((res) => res.json())

      .then((data) => {
        const stateList = (data.data?.states || [])
          .map((item) => item.name)
          .sort();

        setStates(stateList);
      })

      .catch(() => setStates([]))

      .finally(() => setLoadingStates(false));
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm sticky top-24 overflow-hidden">
      {/* HEADER */}
      <div className="px-4 py-3 border-b border-gray-100 bg-white">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#F54900]" />

          <h2 className="text-[15px] font-semibold text-gray-900 tracking-tight">
            Filters
          </h2>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-5">
        {/* RELATED CATEGORIES */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[13px] font-semibold text-gray-900">
              Related Categories
            </h3>

            {loadingSubCategories && (
              <Loader className="animate-spin text-[#F54900] w-3.5 h-3.5" />
            )}
          </div>

          <div className="space-y-1.5">
            {!loadingSubCategories &&
            relatedCategories.length > 0 ? (
              relatedCategories.map((item) => (
                <Link
                  key={item._id}
                  to={`/category/${slug}/subcategory/${item.slug}`}
                  className="flex items-center justify-between py-2 text-[13px] text-gray-700 hover:text-[#F54900] transition group border-b border-gray-100 last:border-none"
                >
                  <span className="font-normal">
                    {item.name}
                  </span>

                  <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#F54900]" />
                </Link>
              ))
            ) : !loadingSubCategories ? (
              <div className="text-[13px] text-gray-400">
                No related categories found
              </div>
            ) : null}
          </div>
        </div>

        {/* VERIFIED */}
        <div>
          <h3 className="text-[13px] font-semibold text-gray-900 mb-3">
            Supplier Type
          </h3>

          <label className="flex items-center gap-2 cursor-pointer text-[13px] text-gray-700">
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={(e) => setVerifiedOnly(e.target.checked)}
              className="accent-[#F54900] w-4 h-4"
            />

            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              Verified Suppliers
            </div>
          </label>
        </div>

        {/* LOCATION */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[13px] font-semibold text-gray-900">
              Location
            </h3>

            {loadingStates && (
              <Loader className="animate-spin text-[#F54900] w-3.5 h-3.5" />
            )}
          </div>

          <select
            value={selectedState}
            onChange={(e) =>
              setSelectedState(e.target.value)
            }
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[13px] outline-none focus:border-[#F54900] transition bg-white text-gray-700"
          >
            <option value="">Select State</option>

            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* PRICE RANGE */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[13px] font-semibold text-gray-900">
              Price Range
            </h3>

            <div className="flex items-center gap-1 text-[#F54900] font-semibold text-[13px]">
              <IndianRupee className="w-3.5 h-3.5" />

              {price}
            </div>
          </div>

          {/* RANGE */}
          <input
            type="range"
            min="100"
            max="10000000"
            step="100"
            value={price}
            onChange={(e) =>
              setPrice(Number(e.target.value))
            }
            className="w-full accent-[#F54900] cursor-pointer"
          />

          {/* LABELS */}
          <div className="flex justify-between text-[11px] text-gray-500 mt-1">
            <span>₹100</span>

            <span>₹1Cr+</span>
          </div>
        </div>

        {/* MOQ */}
        <div>
          <h3 className="text-[13px] font-semibold text-gray-900 mb-3">
            Minimum Order
          </h3>

          <input
            type="text"
            placeholder="Ex: 100 Pieces"
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[13px] outline-none focus:border-[#F54900] transition"
          />
        </div>
      </div>
    </div>
  );
}