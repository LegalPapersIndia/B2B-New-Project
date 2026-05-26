// src/pages/seller/Subscription.jsx

import React, { useState, useEffect } from "react";
import {
  FaCrown,
  FaCheck,
  FaStar,
  FaRocket,
  FaShieldAlt,
} from "react-icons/fa";
import { getPlans, createOrder, verifyPayment, getMySubscription } from "../../api/subscriptionApi";

const Subscription = () => {
  const [plans, setPlans]               = useState({});
  const [loading, setLoading]           = useState(true);
  const [payingPlan, setPayingPlan]     = useState(null);
  const [mySubscription, setMySubscription] = useState(null);
  const [seller, setSeller]             = useState(null);
  const [error, setError]               = useState("");
  const [success, setSuccess]           = useState("");

  // ─────────────────────────────────────────
  // FETCH PLANS + MY SUBSCRIPTION
  // ─────────────────────────────────────────
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [plansRes, subRes] = await Promise.all([
          getPlans(),
          getMySubscription(),
        ]);

        if (plansRes.success) setPlans(plansRes.plans);
        if (subRes.success) {
          setMySubscription(subRes.subscription);
          setSeller(subRes.seller);
        }

      } catch (err) {
        console.error(err);
        setError("Failed to load plans");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ─────────────────────────────────────────
  // RAZORPAY PAYMENT HANDLER
  // ─────────────────────────────────────────
  const handleBuyPlan = async (planKey) => {
    try {
      setError("");
      setPayingPlan(planKey);

      // ORDER CREATE
      const orderRes = await createOrder(planKey);

      if (!orderRes.success) {
        setError(orderRes.message || "Order creation failed");
        return;
      }

      const { order, key, planDetails } = orderRes;

      // RAZORPAY OPTIONS
      const options = {
        key,
        amount:      order.amount,
        currency:    "INR",
        name:        "B2B Marketplace",
        description: `${planDetails.name} Plan Subscription`,
        order_id:    order.id,
        handler: async (response) => {
          try {
            // VERIFY PAYMENT
            const verifyRes = await verifyPayment({
              razorpay_order_id:   response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature:  response.razorpay_signature,
            });

            if (verifyRes.success) {
              setSuccess("🎉 Subscription activated! Your products are now live.");
 const userData = JSON.parse(localStorage.getItem("user") || "{}");
  userData.subscriptionActive = true;
  userData.accountStatus = "active";
  localStorage.setItem("user", JSON.stringify(userData));
              // SUBSCRIPTION REFRESH
              const subRes = await getMySubscription();
              if (subRes.success) {
                setMySubscription(subRes.subscription);
                setSeller(subRes.seller);
              }
            } else {
              setError("Payment verification failed. Contact support.");
            }
          } catch (err) {
            console.error(err);
            setError("Payment verification failed.");
          }
        },
        prefill: {
          name:  seller?.name  || "",
          email: seller?.email || "",
        },
        theme: {
          color: "#1e3a5f",
        },
        modal: {
          ondismiss: () => {
            setPayingPlan(null);
          },
        },
      };

      // RAZORPAY OPEN
      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setPayingPlan(null);
    }
  };

  // ─────────────────────────────────────────
  // PLAN CONFIG
  // ─────────────────────────────────────────
  const planConfig = {
    basic: {
      icon:       <FaRocket className="text-2xl" />,
      color:      "from-blue-500 to-blue-700",
      badge:      "Starter",
      badgeColor: "bg-blue-100 text-blue-700",
      popular:    false,
    },
    premium: {
      icon:       <FaStar className="text-2xl" />,
      color:      "from-purple-500 to-purple-700",
      badge:      "Most Popular",
      badgeColor: "bg-purple-100 text-purple-700",
      popular:    true,
    },
    gold: {
      icon:       <FaCrown className="text-2xl" />,
      color:      "from-yellow-500 to-orange-500",
      badge:      "Best Value",
      badgeColor: "bg-yellow-100 text-yellow-700",
      popular:    false,
    },
  };

  // ─────────────────────────────────────────
  // LOADING
  // ─────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-800 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Loading plans...</p>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <FaCrown />
          Subscription Plans
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Choose Your Plan
        </h1>
        <p className="text-gray-500 max-w-lg mx-auto">
          Subscribe to publish your products live on the marketplace instantly.
        </p>
      </div>

      {/* ERROR / SUCCESS */}
      {error && (
        <div className="max-w-4xl mx-auto mb-6 bg-red-50 border border-red-200 text-red-600 px-5 py-3 rounded-2xl text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="max-w-4xl mx-auto mb-6 bg-green-50 border border-green-200 text-green-600 px-5 py-3 rounded-2xl text-sm">
          {success}
        </div>
      )}

      {/* ACTIVE SUBSCRIPTION BANNER */}
      {seller?.subscriptionActive && mySubscription && (
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-6 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">

            <div className="flex items-center gap-4">
              <div className="h-14 w-14 bg-white/20 rounded-2xl flex items-center justify-center">
                <FaShieldAlt className="text-2xl" />
              </div>
              <div>
                <p className="text-green-100 text-sm">Current Plan</p>
                <h3 className="text-xl font-bold capitalize">
                  {mySubscription.plan} Plan — Active ✅
                </h3>
                <p className="text-green-100 text-sm mt-1">
                  Expires:{" "}
                  {new Date(mySubscription.expireDate).toLocaleDateString("en-IN", {
                    day:   "numeric",
                    month: "long",
                    year:  "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="bg-white/20 px-5 py-3 rounded-2xl text-center">
              <p className="text-xs text-green-100">Amount Paid</p>
              <p className="text-2xl font-bold">₹{mySubscription.amount}</p>
            </div>

          </div>
        </div>
      )}

      {/* PLANS GRID */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(plans).map(([planKey, plan]) => {
          const config  = planConfig[planKey];
          const isActive = mySubscription?.plan === planKey && seller?.subscriptionActive;

          return (
            <div
              key={planKey}
              className={`relative bg-white rounded-3xl shadow-md border overflow-hidden transition-transform hover:-translate-y-1
                ${config.popular ? "border-purple-300 shadow-purple-100" : "border-gray-100"}
                ${isActive ? "ring-2 ring-green-400" : ""}
              `}
            >

              {/* POPULAR BADGE */}
              {config.popular && (
                <div className="absolute top-4 right-4 bg-purple-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                  Most Popular
                </div>
              )}

              {/* ACTIVE BADGE */}
              {isActive && (
                <div className="absolute top-4 left-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                  Active ✅
                </div>
              )}

              {/* PLAN HEADER */}
              <div className={`bg-gradient-to-br ${config.color} p-6 text-white`}>
                <div className="h-12 w-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                  {config.icon}
                </div>
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <div className="mt-3 flex items-end gap-1">
                  <span className="text-3xl font-bold">₹{plan.amount}</span>
                  <span className="text-white/70 mb-1">/month</span>
                </div>
              </div>

              {/* FEATURES */}
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                      <FaCheck className="text-green-500 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* BUY BUTTON */}
                <button
                  onClick={() => handleBuyPlan(planKey)}
                  disabled={!!payingPlan || isActive}
                  className={`w-full py-3 rounded-2xl font-semibold text-sm transition
                    ${isActive
                      ? "bg-green-50 text-green-600 border border-green-200 cursor-default"
                      : config.popular
                      ? "bg-purple-600 hover:bg-purple-700 text-white shadow-md"
                      : "bg-blue-800 hover:bg-blue-900 text-white shadow-md"
                    }
                    disabled:opacity-60 disabled:cursor-not-allowed
                  `}
                >
                  {isActive
                    ? "Current Plan ✅"
                    : payingPlan === planKey
                    ? "Processing..."
                    : `Buy ${plan.name} — ₹${plan.amount}`
                  }
                </button>

              </div>
            </div>
          );
        })}
      </div>

      {/* BOTTOM NOTE */}
      <p className="text-center text-gray-400 text-sm mt-8">
        🔒 Secure payment powered by Razorpay. Cancel anytime.
      </p>

    </div>
  );
};

export default Subscription;