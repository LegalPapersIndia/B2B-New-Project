// src/Pages/RefundPolicy.jsx
import React from "react";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-white">

      {/* ================= HERO ================= */}
      <section className="relative py-24 overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-900 to-orange-600" />

        <div className="relative max-w-5xl mx-auto px-6 text-center">

          <h1 className="text-4xl md:text-6xl font-black text-white">
            Refund & <span className="text-orange-500">Cancellation Policy</span>
          </h1>

          <p className="text-gray-300 mt-6 max-w-2xl mx-auto text-lg">
            Transparent and fair refund process designed to protect both buyers and sellers on our platform.
          </p>

        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <div className="py-16 px-6 md:px-12 lg:px-20">

        <div className="max-w-5xl mx-auto text-gray-700 leading-relaxed">

          <p className="mb-10">
            At B2B Portal ("we", "us", or "our"), we aim to provide a secure and transparent marketplace.
            This Refund Policy explains the conditions under which refunds and cancellations are processed.
          </p>

          {/* SECTION 1 */}
          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            1. Order Cancellation
          </h2>

          <ul className="list-disc pl-6 space-y-3">
            <li>Orders can be cancelled before they are processed or shipped.</li>
            <li>Once an order is confirmed with the supplier, cancellation may not be possible.</li>
            <li>Custom or made-to-order products cannot be cancelled after production starts.</li>
          </ul>

          {/* SECTION 2 */}
          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            2. Refund Eligibility
          </h2>

          <ul className="list-disc pl-6 space-y-3">
            <li>Refunds are applicable only for damaged, defective, or incorrect products.</li>
            <li>Request must be raised within 3–7 business days of delivery.</li>
            <li>Refund approval depends on supplier verification and product inspection.</li>
          </ul>

          {/* SECTION 3 */}
          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            3. Non-Refundable Cases
          </h2>

          <ul className="list-disc pl-6 space-y-3">
            <li>Change of mind after order confirmation.</li>
            <li>Delay caused by logistics or customs.</li>
            <li>Used or altered products after delivery.</li>
            <li>Digital or non-returnable items.</li>
          </ul>

          {/* SECTION 4 */}
          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            4. Refund Processing Time
          </h2>

          <p>
            Approved refunds are processed within <strong>5–10 business days</strong> and credited to the original payment method.
            Processing time may vary depending on the bank or payment provider.
          </p>

          {/* SECTION 5 */}
          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            5. Dispute Resolution
          </h2>

          <p>
            In case of disputes between buyer and supplier, our support team will review the case and provide a fair resolution
            based on evidence and platform policies.
          </p>

          {/* CONTACT */}
          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">
            6. Contact Support
          </h2>

          <div className="mt-6 bg-gray-50 border border-gray-100 rounded-2xl p-6">

            <p>
              If you have any questions regarding refunds or cancellations, please contact us:
            </p>

            <div className="mt-4 space-y-2 text-gray-800">

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

    </div>
  );
};

export default RefundPolicy;