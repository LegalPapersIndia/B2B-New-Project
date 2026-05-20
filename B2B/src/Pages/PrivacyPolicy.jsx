// src/Pages/PrivacyPolicy.jsx
import React from "react";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
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
            Privacy <span className="text-orange-500">Policy</span>
          </motion.h1>

          <p className="mt-6 text-gray-300 max-w-2xl mx-auto text-lg">
            Your privacy matters to us. Read how we collect and protect your data.
          </p>

        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">

          <div className="p-6 md:p-10 lg:p-14 text-gray-700 leading-relaxed">

            <p className="mb-10 text-base md:text-lg">
              At B2B Portal ("we", "us", or "our"), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
              1. Information We Collect
            </h2>

            <ul className="list-disc pl-6 space-y-4">
              <li><strong>Personal & Business Information:</strong> Name, email, phone number, company name, business address, GST number, and bank details (for verified payments).</li>
              <li><strong>Business Documents:</strong> Product listings, trade licenses, certifications, and company registration details.</li>
              <li><strong>Technical Data:</strong> IP address, browser type, device information, and usage analytics.</li>
              <li><strong>Transaction Data:</strong> Inquiries, quotes, and order-related information.</li>
            </ul>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
              2. How We Use Your Information
            </h2>

            <p className="mb-4">We use your information to:</p>

            <ul className="list-disc pl-6 space-y-3">
              <li>Provide, maintain, and improve our B2B marketplace services</li>
              <li>Verify business identities and prevent fraud</li>
              <li>Facilitate communication between buyers and suppliers</li>
              <li>Send important updates, inquiries, and quotes</li>
              <li>Comply with legal obligations</li>
              <li>Analyze platform usage and enhance user experience</li>
            </ul>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
              3. Information Sharing
            </h2>

            <p className="mb-4">We may share your information only in the following cases:</p>

            <ul className="list-disc pl-6 space-y-3">
              <li>With the relevant party in a transaction (buyer ↔ supplier) — only necessary contact details</li>
              <li>With trusted service providers (payment gateways, logistics, hosting) under strict confidentiality agreements</li>
              <li>When required by law or government authority</li>
              <li>In the event of a merger or acquisition</li>
            </ul>

            <p className="mt-4 font-semibold text-gray-900">
              We never sell your personal data to third parties for marketing purposes.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
              4. Data Security
            </h2>

            <p>
              We use industry-standard security measures including SSL encryption, secure servers, access controls, and regular security audits. While we strive to protect your data, no method of transmission over the internet is 100% secure.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
              5. Your Rights
            </h2>

            <p className="mb-4">You have the right to:</p>

            <ul className="list-disc pl-6 space-y-3">
              <li>Access, update, or delete your personal information</li>
              <li>Withdraw consent for certain processing activities</li>
              <li>Request data portability</li>
              <li>Object to or restrict processing</li>
            </ul>

            <p className="mt-6">
              To exercise these rights, please contact us at{" "}
              <a href="mailto:privacy@b2b.in" className="text-orange-600 font-medium hover:underline">
                privacy@b2b.in
              </a>.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
              6. Cookies & Tracking
            </h2>

            <p>
              We use cookies to enhance your experience, analyze traffic, and provide personalized content. You can manage your cookie preferences through your browser settings.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
              7. Changes to This Policy
            </h2>

            <p>
              We may update this Privacy Policy periodically. Material changes will be notified by updating the "Last updated" date and posting the revised policy on this page.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
              8. Contact Us
            </h2>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mt-6">

              <p className="text-gray-700">
                If you have any questions about this Privacy Policy, please reach out to us:
              </p>

              <div className="mt-4 space-y-2 text-gray-800">

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

export default PrivacyPolicy;