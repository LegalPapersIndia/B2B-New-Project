

// src/components/Navbar.jsx

import React, { useEffect, useState } from "react";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaSearch,
  FaGlobe,
  FaSpinner,
  FaBars,
  FaStore,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";

import { Link } from "react-router-dom";

const Navbar = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [productType, setProductType] = useState("");

  const [loadingCountries, setLoadingCountries] = useState(true);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [detectingLocation, setDetectingLocation] = useState(true);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [detected, setDetected] = useState({
    country: "",
    region: "",
    city: "",
  });

  // TEMP AUTH
  const isSignedIn = false;
  const user = null;

  // LOAD COUNTRIES
  useEffect(() => {
    setLoadingCountries(true);

    fetch("https://countriesnow.space/api/v0.1/countries")
      .then((res) => res.json())
      .then((data) => {
        const list = data.data || [];

        setCountries(
          list.map((c) => c.name || c.country || "").sort()
        );

        setLoadingCountries(false);
      })
      .catch(() => {
        setCountries(["India"]);
        setLoadingCountries(false);
      });
  }, []);

  // AUTO DETECT LOCATION
  useEffect(() => {
    const detectLocation = async () => {
      setDetectingLocation(true);

      try {
        const ipRes = await fetch("https://ipapi.co/json/");
        const ipData = await ipRes.json();

        if (ipData.error) {
          throw new Error("Location detection failed");
        }

        const detectedData = {
          country: ipData.country_name || "India",
          region: ipData.region || "",
          city: ipData.city || "",
        };

        setDetected(detectedData);
        setSelectedCountry(detectedData.country);
      } catch (error) {
        console.log(error);
        setSelectedCountry("India");
      } finally {
        setDetectingLocation(false);
      }
    };

    if (!loadingCountries && !selectedCountry) {
      detectLocation();
    }
  }, [loadingCountries, selectedCountry]);

  // LOAD STATES
  useEffect(() => {
    if (!selectedCountry) return;

    setLoadingStates(true);

    fetch("https://countriesnow.space/api/v0.1/countries/states", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: selectedCountry,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const stateList = (data.data?.states || [])
          .map((item) => item.name)
          .sort();

        setStates(stateList);

        if (detected.region) {
          const match = stateList.find((name) =>
            name
              .toLowerCase()
              .includes(detected.region.toLowerCase())
          );

          if (match) {
            setSelectedState(match);
          }
        }
      })
      .catch(() => setStates([]))
      .finally(() => setLoadingStates(false));
  }, [selectedCountry, detected.region]);

  // LOAD CITIES
  useEffect(() => {
    if (!selectedCountry || !selectedState) return;

    setLoadingDistricts(true);

    fetch(
      "https://countriesnow.space/api/v0.1/countries/state/cities",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          country: selectedCountry,
          state: selectedState,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const cityList = (data.data || []).sort();

        setDistricts(cityList);

        if (detected.city) {
          const match = cityList.find((name) =>
            name.toLowerCase().includes(detected.city.toLowerCase())
          );

          if (match) {
            setSelectedDistrict(match);
          }
        }
      })
      .catch(() => setDistricts([]))
      .finally(() => setLoadingDistricts(false));
  }, [selectedCountry, selectedState, detected.city]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      {/* TOP BAR */}
      <div className="bg-black text-gray-300 text-[10px] sm:text-xs">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-2 flex justify-between items-center">
          {/* SOCIAL ICONS */}
          <div className="hidden md:flex items-center gap-4">
            <FaFacebookF className="hover:text-[#1447E6] cursor-pointer transition" />
            <FaTwitter className="hover:text-[#1447E6] cursor-pointer transition" />
            <FaInstagram className="hover:text-[#F54900] cursor-pointer transition" />
            <FaLinkedinIn className="hover:text-[#1447E6] cursor-pointer transition" />
          </div>

          {/* CONTACT */}
          <div className="flex items-center justify-between w-full md:w-auto gap-4 md:gap-8">
            <span className="flex items-center gap-2">
              <FaPhoneAlt className="text-[#F54900]" />
              +91 75052 66931
            </span>

            <span className="flex items-center gap-2">
              <FaEnvelope className="text-[#F54900]" />
              support@b2bhub.com
            </span>
          </div>
        </div>
      </div>

      {/* MAIN NAV */}
      <nav className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
        <div className="flex flex-col gap-4">
          {/* TOP NAV */}
          <div className="flex items-center justify-between gap-4">
            {/* LOGO */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#F54900] rounded-2xl flex items-center justify-center shadow-md">
                <span className="text-white font-black text-2xl">
                  B
                </span>
              </div>

              <div>
                <h1 className="text-3xl font-black tracking-tight text-black">
                  LPI-
                  <span className="text-[#1447E6]">B2B</span>
                </h1>

                <p className="text-[11px] text-gray-500 -mt-1">
                  Wholesale Marketplace
                </p>
              </div>
            </Link>

            {/* SEARCH */}
            <div className="hidden lg:flex relative flex-1 max-w-xl mx-6">
              <input
                type="text"
                placeholder="Search products (Steel, Rice, Chemicals...)"
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                className="w-full pl-12 pr-5 py-3 bg-gray-100 border border-gray-200 rounded-2xl focus:bg-white focus:border-[#F54900] focus:ring-1 focus:ring-[#F54900] transition-all text-sm outline-none"
              />

              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-3">
              {!isSignedIn && (
                <>
                  <Link
                    to="/login"
                    className="hidden sm:flex items-center gap-2 bg-[#1447E6] hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium transition-all text-sm"
                  >
                    <FaUserCircle className="text-lg" />
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="hidden md:flex items-center gap-2 bg-[#F54900] hover:bg-[#d63f00] text-white px-6 py-2.5 rounded-xl font-medium transition-all text-sm shadow-md"
                  >
                    <FaStore />
                    Start Selling
                  </Link>
                </>
              )}

              {isSignedIn && (
                <div className="flex items-center gap-4">
                  <Link
                    to="/seller-dashboard"
                    className="hidden md:flex items-center gap-2 bg-[#F54900] hover:bg-[#d63f00] text-white px-6 py-2.5 rounded-xl font-medium transition-all text-sm"
                  >
                    <FaStore />
                    Dashboard
                  </Link>

                  <span className="hidden sm:block text-sm font-medium text-black">
                    Hi, {user?.firstName || "User"}
                  </span>
                </div>
              )}

              {/* MOBILE MENU BUTTON */}
              <button
                className="lg:hidden p-3 text-black hover:bg-gray-100 rounded-xl transition"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <FaTimes size={24} />
                ) : (
                  <FaBars size={24} />
                )}
              </button>
            </div>
          </div>

          {/* FILTER BAR */}
          <div
            className={`${
              isMenuOpen
                ? "flex flex-col gap-4 animate-in slide-in-from-top-5"
                : "hidden"
            } lg:flex lg:flex-row lg:items-center lg:gap-4 bg-white lg:bg-transparent p-5 lg:p-0 border-t lg:border-none rounded-2xl`}
          >
            {/* MOBILE SEARCH */}
            <div className="relative lg:hidden mb-2">
              <input
                type="text"
                placeholder="Search products..."
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                className="w-full pl-12 pr-5 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:border-[#F54900] outline-none"
              />

              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            {/* LOCATION SELECTS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1">
              {/* COUNTRY */}
              <div className="relative">
                {detectingLocation && (
                  <FaSpinner className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-[#F54900]" />
                )}

                <select
                  value={selectedCountry}
                  onChange={(e) =>
                    setSelectedCountry(e.target.value)
                  }
                  disabled={
                    loadingCountries || detectingLocation
                  }
                  className="w-full pl-4 pr-10 py-3 bg-white border border-gray-300 rounded-2xl text-sm focus:border-[#F54900] focus:ring-1 focus:ring-[#F54900] transition-all appearance-none outline-none"
                >
                  <option value="">Select Country</option>

                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>

                <FaGlobe className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              {/* STATE */}
              <div className="relative">
                {loadingStates && (
                  <FaSpinner className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-[#F54900]" />
                )}

                <select
                  value={selectedState}
                  onChange={(e) =>
                    setSelectedState(e.target.value)
                  }
                  disabled={!selectedCountry || loadingStates}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl text-sm focus:border-[#F54900] focus:ring-1 focus:ring-[#F54900] transition-all appearance-none outline-none"
                >
                  <option value="">Select State</option>

                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              {/* CITY */}
              <div className="relative">
                {loadingDistricts && (
                  <FaSpinner className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-[#F54900]" />
                )}

                <select
                  value={selectedDistrict}
                  onChange={(e) =>
                    setSelectedDistrict(e.target.value)
                  }
                  disabled={!selectedState || loadingDistricts}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-2xl text-sm focus:border-[#F54900] focus:ring-1 focus:ring-[#F54900] transition-all appearance-none outline-none"
                >
                  <option value="">Select City</option>

                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* SEARCH BUTTON */}
            <button className="bg-[#F54900] hover:bg-[#d63f00] active:bg-[#c63a00] text-white px-8 py-3 rounded-2xl font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap">
              <FaSearch className="hidden lg:inline" />
              <span>Search</span>
            </button>

            {/* MOBILE LOGIN */}
            {!isSignedIn && (
              <Link
                to="/login"
                className="sm:hidden mt-2 border-2 border-[#F54900] text-[#F54900] py-3 rounded-2xl font-bold w-full text-center"
              >
                Login / Register
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;


