// src/components/seller/PostRequirementForm.jsx

import React, { useState, useEffect } from "react";
import { Send, Package, MapPin, IndianRupee, CheckCircle2 } from "lucide-react";
import { postRequirementBySeller } from "../../api/requirementApi";
import { getCategories } from "../../api/categoryApi";
import { getSubCategoriesByCategory } from "../../api/subCategoryApi";

export default function PostRequirementForm({ onPosted }) {

  const [form, setForm] = useState({
    productName: "",
    description: "",
    quantity:    "",
    budget:      "",
    location:    "",
    category:    "",
    subCategory: "",
  });

  // ── LOCATION STATES ──
  const [states,         setStates]         = useState([]);
  const [cities,         setCities]         = useState([]);
  const [selectedState,  setSelectedState]  = useState("");
  const [selectedCity,   setSelectedCity]   = useState("");
  const [pincode,        setPincode]        = useState("");
  const [loadingStates,  setLoadingStates]  = useState(false);
  const [loadingCities,  setLoadingCities]  = useState(false);
  const [loadingPincode, setLoadingPincode] = useState(false);

  const [categories,      setCategories]      = useState([]);
  const [subCategories,   setSubCategories]   = useState([]);
  const [loading,         setLoading]         = useState(false);
  const [success,         setSuccess]         = useState(false);
  const [error,           setError]           = useState("");
  const [sellersNotified, setSellersNotified] = useState(0);

  // ── FETCH CATEGORIES ──
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data.categories || []);
      } catch (err) { console.error(err); }
    };
    fetchCategories();
  }, []);

  // ── FETCH SUBCATEGORIES ──
  useEffect(() => {
    if (!form.category) { setSubCategories([]); return; }
    const fetchSubs = async () => {
      try {
        const data = await getSubCategoriesByCategory(form.category);
        setSubCategories(data.subCategories || []);
      } catch (err) { console.error(err); }
    };
    fetchSubs();
  }, [form.category]);

  // ── LOAD INDIA STATES ──
  useEffect(() => {
    setLoadingStates(true);
    fetch("https://countriesnow.space/api/v0.1/countries/states", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country: "India" }),
    })
      .then(res => res.json())
      .then(data => {
        const stateList = (data.data?.states || []).map(s => s.name).sort();
        setStates(stateList);
      })
      .catch(() => setStates([]))
      .finally(() => setLoadingStates(false));
  }, []);

  // ── LOAD CITIES ──
  useEffect(() => {
    if (!selectedState) { setCities([]); return; }
    setLoadingCities(true);
    fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country: "India", state: selectedState }),
    })
      .then(res => res.json())
      .then(data => setCities((data.data || []).sort()))
      .catch(() => setCities([]))
      .finally(() => setLoadingCities(false));
  }, [selectedState]);

  // ── PINCODE AUTO FILL ──
  useEffect(() => {
    if (pincode?.length !== 6) return;
    const fetchPincode = async () => {
      setLoadingPincode(true);
      try {
        const res  = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
        const data = await res.json();
        if (data[0]?.Status === "Success") {
          const place = data[0].PostOffice[0];
          setSelectedState(place.State);
          setSelectedCity(place.District);
          setForm(prev => ({ ...prev, location: `${place.District}, ${place.State}` }));
        }
      } catch (err) { console.log("Pincode error:", err); }
      finally { setLoadingPincode(false); }
    };
    fetchPincode();
  }, [pincode]);

  // ── STATE CHANGE ──
  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setSelectedCity("");
    setForm(prev => ({ ...prev, location: state ? `${state}` : "" }));
  };

  // ── CITY CHANGE ──
  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    setForm(prev => ({ ...prev, location: city && selectedState ? `${city}, ${selectedState}` : selectedState }));
  };

  // ── HANDLE CHANGE ──
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "category" && { subCategory: "" }),
    }));
  };

  // ── HANDLE SUBMIT ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.productName || !form.category) {
      setError("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      const data = await postRequirementBySeller(form);
      if (data.success) {
        setSuccess(true);
        setSellersNotified(data.sellersNotified || 0);
        setForm({ productName: "", description: "", quantity: "", budget: "", location: "", category: "", subCategory: "" });
        setSelectedState("");
        setSelectedCity("");
        setPincode("");
        // ✅ NEW — parent ko bata do ki naya requirement post hua, list refresh ho jaye
        if (onPosted) onPosted();
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── POST ANOTHER (success screen se wapas form pe) ──
  const handlePostAnother = () => {
    setSuccess(false);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-6 py-5">
        <h2 className="text-white font-bold text-lg">Post Your Requirement</h2>
        <p className="text-blue-200 text-xs mt-0.5">Get quotes from other verified suppliers</p>
      </div>

      {success ? (
        /* ─────────── SUCCESS STATE ─────────── */
        <div className="p-8 sm:p-10 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Requirement Posted! 🎉</h3>
          <p className="text-gray-500 mb-2">Your requirement has been sent to</p>
          <p className="text-3xl font-bold text-blue-800 mb-2">{sellersNotified} Sellers</p>
          <p className="text-gray-400 text-sm mb-6">Diamond & Gold sellers will contact you first.</p>
          <button
            onClick={handlePostAnother}
            className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-3 rounded-2xl font-semibold transition"
          >
            Post Another Requirement
          </button>
        </div>
      ) : (
        /* ─────────── FORM ─────────── */
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl text-sm">{error}</div>
          )}

          {/* PRODUCT NAME */}
          <div className="relative">
            <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              name="productName"
              value={form.productName}
              onChange={handleChange}
              type="text"
              placeholder="Product Name *"
              className="w-full h-12 pl-11 pr-4 border border-gray-200 rounded-2xl focus:border-blue-800 outline-none text-sm"
            />
          </div>

          {/* CATEGORY + SUBCATEGORY */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full h-12 px-4 border border-gray-200 rounded-2xl focus:border-blue-800 outline-none text-sm appearance-none"
            >
              <option value="">Select Category *</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>

            <select
              name="subCategory"
              value={form.subCategory}
              onChange={handleChange}
              disabled={!form.category}
              className="w-full h-12 px-4 border border-gray-200 rounded-2xl focus:border-blue-800 outline-none text-sm appearance-none disabled:opacity-50"
            >
              <option value="">{form.category ? "Sub Category" : "Select category first"}</option>
              {subCategories.map((sub) => (
                <option key={sub._id} value={sub._id}>{sub.name}</option>
              ))}
            </select>
          </div>

          {/* QUANTITY + BUDGET */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              type="text"
              placeholder="Quantity"
              className="w-full h-12 px-4 border border-gray-200 rounded-2xl focus:border-blue-800 outline-none text-sm"
            />
            <div className="relative">
              <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                name="budget"
                value={form.budget}
                onChange={handleChange}
                type="text"
                placeholder="Budget"
                className="w-full h-12 pl-11 pr-4 border border-gray-200 rounded-2xl focus:border-blue-800 outline-none text-sm"
              />
            </div>
          </div>

          {/* LOCATION — Pincode + State + City */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* PINCODE */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              {loadingPincode && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 border-2 border-blue-800 border-t-transparent rounded-full animate-spin" />
              )}
              <input
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                type="text"
                maxLength={6}
                placeholder="Pincode"
                className="w-full h-12 pl-10 pr-4 border border-gray-200 rounded-2xl focus:border-blue-800 outline-none text-sm"
              />
            </div>

            {/* STATE */}
            <div className="relative">
              {loadingStates ? (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 border-2 border-blue-800 border-t-transparent rounded-full animate-spin" />
              ) : (
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              )}
              <select
                value={selectedState}
                onChange={handleStateChange}
                disabled={loadingStates}
                className="w-full h-12 pl-10 pr-2 border border-gray-200 rounded-2xl focus:border-blue-800 outline-none text-sm appearance-none disabled:opacity-50"
              >
                <option value="">State</option>
                {states.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* CITY */}
            <div className="relative">
              {loadingCities ? (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 border-2 border-blue-800 border-t-transparent rounded-full animate-spin" />
              ) : (
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              )}
              <select
                value={selectedCity}
                onChange={handleCityChange}
                disabled={!selectedState || loadingCities}
                className="w-full h-12 pl-10 pr-2 border border-gray-200 rounded-2xl focus:border-blue-800 outline-none text-sm appearance-none disabled:opacity-50"
              >
                <option value="">{selectedState ? "City" : "State first"}</option>
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* DESCRIPTION */}
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe your requirements..."
            rows={2}
            className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:border-blue-800 outline-none text-sm resize-none"
          />

          {/* TRUST BADGE */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl px-4 py-3 flex items-center gap-3">
            <div className="w-7 h-7 bg-blue-800 rounded-xl flex items-center justify-center flex-shrink-0">
              <Send className="w-3.5 h-3.5 text-white" />
            </div>
           <p className="text-xs text-blue-700">
  Sent to <strong>Diamond & Gold</strong> sellers first, then Silver plan sellers.
</p>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-800 hover:bg-blue-900 disabled:opacity-60 text-white py-3 rounded-2xl font-semibold text-sm transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <><Send className="w-4 h-4" /> Post Requirement</>
            )}
          </button>

        </form>
      )}
    </div>
  );
}