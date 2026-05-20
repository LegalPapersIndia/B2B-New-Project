// src/Pages/TermsAndConditions.jsx
import React from "react";
import { motion } from "framer-motion";

const TermsAndConditions = () => {
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
            Terms & <span className="text-orange-500">Conditions</span>
          </motion.h1>

          <p className="mt-6 text-gray-300 max-w-2xl mx-auto text-lg">
            Please read these terms carefully before using our platform.
          </p>

        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">

          <div className="p-6 md:p-10 lg:p-14 text-gray-700 leading-relaxed">

            <p className="mb-10 text-base md:text-lg">
              These Terms and Conditions ("Terms") govern your use of B2B Portal ("we", "us", "our"). By accessing or using our platform, you agree to be bound by these Terms.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
              1. Use of Platform
            </h2>

            <p>
              You agree to use our platform only for lawful business purposes. Any misuse, fraud, or unauthorized activity may result in account suspension or termination.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
              2. User Accounts
            </h2>

            <p>
              You are responsible for maintaining the confidentiality of your account credentials. All activities under your account are your responsibility.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
              3. Business Listings
            </h2>

            <ul className="list-disc pl-6 space-y-3">
              <li>All product listings must be accurate and legal</li>
              <li>Fake or misleading information is strictly prohibited</li>
              <li>We reserve the right to remove any listing without notice</li>
            </ul>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
              4. Buyer & Seller Interaction
            </h2>

            <p>
              B2B Portal acts as a facilitator between buyers and sellers. We are not responsible for disputes, payments, or product quality between users.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
              5. Payments
            </h2>

            <p>
              All payments between buyers and sellers are subject to mutual agreement. We do not hold responsibility for external payment transactions unless stated.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
              6. Prohibited Activities
            </h2>

            <ul className="list-disc pl-6 space-y-3">
              <li>Fraudulent or illegal activities</li>
              <li>Spam or unauthorized promotions</li>
              <li>Misuse of platform data</li>
              <li>Impersonation of any individual or business</li>
            </ul>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
              7. Limitation of Liability
            </h2>

            <p>
              We are not liable for any direct or indirect damages resulting from the use of our platform, including loss of business, data, or profits.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
              8. Account Termination
            </h2>

            <p>
              We reserve the right to suspend or terminate any account that violates our policies without prior notice.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
              9. Changes to Terms
            </h2>

            <p>
              We may update these Terms at any time. Continued use of the platform means you accept the updated Terms.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
              10. Contact Us
            </h2>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mt-6">

              <p>
                If you have any questions regarding these Terms, please contact us:
              </p>

              <div className="mt-4 space-y-2">

                <p>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:support@b2b.in" className="text-orange-600 hover:underline">
                    support@b2b.in
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

export default TermsAndConditions;