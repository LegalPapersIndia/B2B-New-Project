// src/Pages/CookiesPolicy.jsx
import React from "react";
import { motion } from "framer-motion";

const CookiesPolicy = () => {
  return (
    <div className="bg-slate-50 min-h-screen">

      {/* HERO */}
      <section className="relative py-24 bg-gradient-to-br from-blue-950 via-slate-900 to-orange-600 text-white text-center overflow-hidden">

        <div className="max-w-5xl mx-auto px-6">

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black"
          >
            Cookies <span className="text-orange-500">Policy</span>
          </motion.h1>

          <p className="mt-6 text-gray-300 max-w-2xl mx-auto text-lg">
            Learn how we use cookies to improve your experience on our platform.
          </p>

        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">

          <div className="p-6 md:p-10 lg:p-14 text-gray-700 leading-relaxed">

            <p className="mb-10 text-base md:text-lg">
              This Cookies Policy explains how B2B Portal ("we", "us", or "our") uses cookies and similar technologies to recognize you when you visit our platform.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
              1. What Are Cookies?
            </h2>

            <p>
              Cookies are small text files stored on your device when you visit a website. They help us improve functionality, performance, and user experience.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
              2. How We Use Cookies
            </h2>

            <ul className="list-disc pl-6 space-y-3">
              <li>To remember user preferences and settings</li>
              <li>To improve website performance and speed</li>
              <li>To analyze user behavior and traffic</li>
              <li>To enhance security and prevent fraud</li>
              <li>To provide personalized content and recommendations</li>
            </ul>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
              3. Types of Cookies We Use
            </h2>

            <ul className="list-disc pl-6 space-y-3">
              <li><strong>Essential Cookies:</strong> Required for platform functionality</li>
              <li><strong>Performance Cookies:</strong> Help us analyze usage and improve performance</li>
              <li><strong>Functional Cookies:</strong> Remember user preferences</li>
              <li><strong>Marketing Cookies:</strong> Used for personalized ads and promotions</li>
            </ul>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
              4. Third-Party Cookies
            </h2>

            <p>
              We may use trusted third-party services like analytics and payment providers that may also place cookies on your device.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
              5. Cookie Control
            </h2>

            <p>
              You can control or delete cookies anytime through your browser settings. Disabling cookies may affect platform functionality.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
              6. Updates to This Policy
            </h2>

            <p>
              We may update this Cookies Policy from time to time. Changes will be posted on this page with an updated date.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
              7. Contact Us
            </h2>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mt-6">

              <p>
                If you have any questions about our Cookies Policy, please contact us:
              </p>

              <div className="mt-4 space-y-2">

                <p>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:privacy@b2b.in" className="text-orange-600 hover:underline">
                    privacy@b2b.in
                  </a>
                </p>

                <p>
                  <strong>Phone:</strong> +91 75052 66931
                </p>

              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

export default CookiesPolicy;