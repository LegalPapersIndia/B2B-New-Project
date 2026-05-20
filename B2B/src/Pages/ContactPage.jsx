import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  FaMapMarkerAlt,
  FaDirections,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaPlus,
  FaMinus,
  FaPaperPlane,
  FaHeadset,
  FaWhatsapp,
} from "react-icons/fa";

export default function ContactPage() {
  const [activeId, setActiveId] = useState(1);

  const faqData = [
    {
      id: 1,
      question: "How can I connect with suppliers globally?",
      answer:
        "You can easily connect with verified suppliers through our B2B marketplace platform and explore multiple product categories.",
    },
    {
      id: 2,
      question: "How do I become a verified seller?",
      answer:
        "Create your seller account, upload your company details, and complete the verification process to start selling globally.",
    },
    {
      id: 3,
      question: "Can buyers directly contact suppliers?",
      answer:
        "Yes, buyers can directly communicate with suppliers through inquiry forms and messaging systems.",
    },
    {
      id: 4,
      question: "Do you support international trade?",
      answer:
        "Absolutely. Our platform is designed to support global sourcing, exports, and international B2B trade.",
    },
  ];

  const toggleFAQ = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  const whatsappLink =
    "https://wa.me/919876543210?text=Hello%20I%20want%20to%20know%20more%20about%20your%20B2B%20services";

  return (
    <div className="bg-[#f8fafc] overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* BG */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50" />

        {/* BLUR EFFECTS */}
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
          className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          {/* LABEL */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-3 bg-blue-100 text-blue-600 px-5 py-2 rounded-full font-semibold mb-8 shadow-sm"
          >
            <FaHeadset />
            Contact Our Team
          </motion.div>

          {/* HEADING */}
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-2xl md:text-4xl lg:text-6xl font-black text-slate-900 leading-tight"
          >
            Let's Start A<span className="text-orange-500"> Conversation</span>
          </motion.h1>

          {/* SUBTEXT */}
          <motion.p
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-slate-600 text-base md:text-xl max-w-2xl mx-auto leading-relaxed mt-8"
          >
            Reach out to our support team for supplier inquiries, partnerships,
            buyer assistance, or any business-related questions.
          </motion.p>
        </div>
      </section>

      {/* ================= CONTACT INFO + FORM ================= */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* SAME HEIGHT GRID */}
          <div className="grid lg:grid-cols-2 gap-10 items-stretch">
            {/* ================= LEFT INFO ================= */}
            <motion.div
              initial={{ opacity: 0, x: -70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-5 h-full flex flex-col"
            >
              {/* CARD 1 */}
              <motion.div
                whileHover={{ y: -6 }}
                className="group bg-white rounded-3xl p-6 shadow-md border border-slate-100 hover:shadow-2xl transition-all duration-500 hover:bg-blue-50/40 hover:border-blue-200"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-100 group-hover:bg-blue-500 flex items-center justify-center text-blue-500 group-hover:text-white text-xl transition-all duration-500">
                  <FaPhoneAlt />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mt-5">
                  Call Us
                </h3>

                <p className="text-slate-600 mt-2 leading-relaxed text-base">
                  +91 9876543210
                </p>
              </motion.div>

              {/* CARD 2 */}
              <motion.div
                whileHover={{ y: -6 }}
                className="group bg-white rounded-3xl p-6 shadow-md border border-slate-100 hover:shadow-2xl transition-all duration-500 hover:bg-blue-50/40 hover:border-blue-200"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-100 group-hover:bg-blue-500 flex items-center justify-center text-blue-500 group-hover:text-white text-xl transition-all duration-500">
                  <FaEnvelope />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mt-5">
                  Email Address
                </h3>

                <p className="text-slate-600 mt-2 leading-relaxed text-base break-all">
                  support@b2bmarketplace.com
                </p>
              </motion.div>

              {/* CARD 3 */}
              <motion.div
                whileHover={{ y: -6 }}
                className="group bg-white rounded-3xl p-6 shadow-md border border-slate-100 hover:shadow-2xl transition-all duration-500 hover:bg-blue-50/40 hover:border-blue-200"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-100 group-hover:bg-blue-500 flex items-center justify-center text-blue-500 group-hover:text-white text-xl transition-all duration-500">
                  <FaClock />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mt-5">
                  Working Hours
                </h3>

                <p className="text-slate-600 mt-2 leading-relaxed text-base">
                  Monday - Saturday : 9 AM - 7 PM
                </p>
              </motion.div>

              {/* WHATSAPP CARD */}
              <motion.a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.01, y: -4 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-4 bg-[#25D366] hover:bg-[#1ebe5b] text-white rounded-3xl p-5 shadow-xl transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-2xl shrink-0">
                  <FaWhatsapp />
                </div>

                <div>
                  <h3 className="text-xl font-bold">Chat On WhatsApp</h3>

                  <p className="text-white/90 text-sm mt-1">
                    Quick support & instant replies
                  </p>
                </div>
              </motion.a>
            </motion.div>

            {/* ================= FORM ================= */}
            <motion.div
              initial={{ opacity: 0, x: 70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-white rounded-[32px] shadow-2xl p-6 sm:p-8 lg:p-10 border border-slate-100 h-full flex flex-col justify-center"
            >
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">
                Send Us A Message
              </h2>

              <p className="text-slate-500 mb-8">
                Our team will get back to you within 24 hours.
              </p>

              <form className="space-y-6">
                {/* ROW */}
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                  />

                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                />

                <textarea
                  rows="6"
                  placeholder="Write your message..."
                  className="w-full border border-slate-200 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all resize-none"
                />

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="group bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 shadow-xl w-full sm:w-auto"
                >
                  Send Message
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <FaPaperPlane />
                  </motion.div>
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          {/* HEADER */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-5 py-2 rounded-full font-semibold mb-5">
              FAQ
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-5">
              Frequently Asked
              <span className="text-orange-500"> Questions</span>
            </h2>

            <p className="text-slate-600 text-lg leading-relaxed">
              Quick answers to common questions about our B2B marketplace
              platform.
            </p>
          </div>

          {/* FAQ CARDS */}
          <div className="space-y-5">
            {faqData.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -3 }}
                className="group relative bg-[#f8fafc] rounded-3xl border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden hover:bg-blue-50/40 hover:border-blue-200"
              >
                {/* TOP BORDER */}
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                {/* QUESTION */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between text-left px-6 py-6"
                >
                  <h3 className="text-base md:text-lg font-bold text-slate-900 pr-4 leading-snug">
                    {faq.question}
                  </h3>

                  <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center shrink-0 group-hover:bg-blue-500 transition-all duration-500">
                    {activeId === faq.id ? (
                      <FaMinus className="text-blue-500 group-hover:text-white transition duration-500" />
                    ) : (
                      <FaPlus className="text-blue-500 group-hover:text-white transition duration-500" />
                    )}
                  </div>
                </button>

                {/* ANSWER */}
                <AnimatePresence>
                  {activeId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      <div className="px-6 pb-6">
                        <div className="border-t border-slate-200 pt-5">
                          <p className="text-slate-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="flex items-center justify-center gap-3 mb-5"></div>

            <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-4">
              Find Our
              <span className="text-orange-500"> Location</span>
            </h2>

            <p className="text-slate-600 text-base md:text-lg leading-relaxed">
              Visit our office and witness the impact we're creating together in
              global B2B trade and business networking.
            </p>
          </div>

          {/* Map Container */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100"
          >
            {/* Top Border */}
            <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-slate-900 to-orange-500" />

            {/* Map */}
            <div className="h-[500px] w-full">
              <iframe
                title="B2B Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224346.6131039485!2d77.06889944241318!3d28.527280343785406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3c4c5b4c9d5%3A0x123456789abcdef!2sNew%20Delhi!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="border-0"
              />
            </div>

            {/* Floating Address Card */}
            <div className="absolute bottom-6 left-6 right-6 md:right-auto md:max-w-md">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-slate-100">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center shrink-0">
                    <FaMapMarkerAlt className="text-2xl text-orange-500" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      B2B Global Office
                    </h3>

                    <p className="text-slate-600 leading-relaxed mb-4">
                      Noida-8, Uttar Pradesh, India
                    </p>

                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-orange-500 font-semibold hover:gap-3 transition-all duration-300"
                    >
                      Get Directions
                      <FaDirections />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Glow Effect */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}

