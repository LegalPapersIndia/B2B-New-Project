import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaStore,
  FaGlobe,
  FaRocket,
  FaShieldAlt,
  FaUsers,
  FaChartLine,
  FaPaperPlane,
  FaCheckCircle,
  FaLaptop,
} from "react-icons/fa";

const BecomeSeller = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    message: "",
  });

  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Seller application submitted successfully!");
  };

  const toggleFaq = (i) => {
    setOpenFaq(openFaq === i ? null : i);
  };

  return (
    <div className="bg-slate-50 min-h-screen">

      {/* ================= HERO ================= */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-900 to-orange-600" />

        <div className="relative max-w-6xl mx-auto px-6 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-black">
            Become a <span className="text-orange-500">Trusted Seller</span>
          </h1>

          <p className="text-gray-300 mt-6 max-w-2xl mx-auto text-lg">
            Join our global B2B marketplace and start selling worldwide.
          </p>

          <button className="mt-10 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-2xl font-semibold">
            Start Selling Now
          </button>
        </div>
      </section>

      {/* ================= WHY SELL ================= */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <h2 className="text-5xl font-black">Why Sell With Us</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-6">

          {[
            { icon: <FaGlobe />, title: "Global Reach", desc: "Sell worldwide" },
            { icon: <FaUsers />, title: "Verified Buyers", desc: "Trusted leads" },
            { icon: <FaChartLine />, title: "Grow Faster", desc: "Boost sales" },
            { icon: <FaShieldAlt />, title: "Secure", desc: "Safe payments" },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl transition"
            >
              <div className="text-4xl text-orange-600 mb-4">
                {item.icon}
              </div>
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p className="text-gray-500 mt-2">{item.desc}</p>
            </motion.div>
          ))}

        </div>
      </section>

      {/* ================= HOW IT WORKS (4 CARDS UPDATED) ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center mb-16">
          <h2 className="text-4xl font-black">How It Works</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">

          {[
            {
              icon: <FaStore />,
              title: "Create Account",
              desc: "Sign up as seller in few minutes",
            },
            {
              icon: <FaLaptop />,
              title: "Upload Products",
              desc: "Add your product listings easily",
            },
            {
              icon: <FaGlobe />,
              title: "Get Visibility",
              desc: "Reach global buyers instantly",
            },
            {
              icon: <FaRocket />,
              title: "Start Selling",
              desc: "Receive orders & grow business",
            },
          ].map((step, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10, scale: 1.03 }}
              className="bg-slate-50 rounded-3xl p-8 text-center shadow-md hover:shadow-xl transition"
            >
              <div className="text-4xl text-orange-600 mb-4">
                {step.icon}
              </div>
              <h3 className="font-bold text-lg">{step.title}</h3>
              <p className="text-gray-500 mt-2 text-sm">{step.desc}</p>
            </motion.div>
          ))}

        </div>
      </section>

      {/* ================= REQUIREMENTS (BIG CARD UPDATED) ================= */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">

          <h2 className="text-4xl font-black text-center mb-12">
            Requirements
          </h2>

          <div className="bg-white rounded-3xl p-10 shadow-xl">

            <div className="grid md:grid-cols-2 gap-6">

              {[
                { icon: <FaCheckCircle />, text: "Business Registration Certificate" },
                { icon: <FaCheckCircle />, text: "Valid Bank Account Details" },
                { icon: <FaCheckCircle />, text: "Product Information & Images" },
                { icon: <FaCheckCircle />, text: "GST / Tax Details (if applicable)" },
              ].map((r, i) => (
                <div key={i} className="flex items-center gap-3 bg-slate-50 p-5 rounded-2xl">
                  <span className="text-orange-600">{r.icon}</span>
                  <span className="font-medium text-gray-700">{r.text}</span>
                </div>
              ))}

            </div>

          </div>
        </div>
      </section>

      {/* ================= BENEFITS ================= */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 text-center mb-16">
          <h2 className="text-4xl font-black">Seller Benefits</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto px-6">

          {[
            "Zero setup cost",
            "Easy dashboard access",
            "Direct buyer connection",
            "Marketing support",
          ].map((b, i) => (
            <div key={i} className="flex items-center gap-3 bg-white p-6 rounded-2xl shadow">
              <FaCheckCircle className="text-orange-600 text-xl" />
              <span className="font-medium">{b}</span>
            </div>
          ))}

        </div>
      </section>

    
      {/* ================= FAQ (OPEN/CLOSE ADDED) ================= */}
      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-6">

          <h2 className="text-4xl font-black text-center mb-10">
            Seller FAQs
          </h2>

          <div className="space-y-5">

            {[
              {
                q: "Is it free to become a seller?",
                a: "Yes, registration is completely free.",
              },
              {
                q: "How do I get buyers?",
                a: "We promote your products globally.",
              },
              {
                q: "When do I get payments?",
                a: "Payments are released after order confirmation.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >

                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full p-6 text-left font-semibold flex justify-between"
                >
                  {item.q}
                  <span>{openFaq === i ? "−" : "+"}</span>
                </button>

                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 text-gray-600"
                    >
                      {item.a}
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            ))}

          </div>

        </div>
      </section>

    </div>
  );
};

export default BecomeSeller;