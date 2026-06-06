// // import mongoose from "mongoose";

// // const sellerSchema = new mongoose.Schema(
// //   {
// //     name: {
// //       type: String,
// //       required: true,
// //     },

// //     email: {
// //       type: String,
// //       required: true,
// //       unique: true,
// //     },

// //     phone: {
// //       type: String,
// //       required: true,
// //     },

// //     password: {
// //       type: String,
// //       required: true,
// //     },

// //     // ACTIVATION STATUS
// //     subscriptionActive: {
// //       type: Boolean,
// //       default: false,
// //     },

// //     accountStatus: {
// //       type: String,
// //       enum: ["pending", "active"],
// //       default: "pending",
// //     },
    
// //     // models/Seller.js mein add karo

// // subscriptionPlan: {
// //   type: String,
// //   enum: ["basic", "premium", "gold"],
// //   default: null,
// // },

// // subscriptionExpire: {
// //   type: Date,
// //   default: null,
// // },

// //   },
// //   { timestamps: true },
  
// // );

// // const Seller = mongoose.model("Seller", sellerSchema);

// // export default Seller;



// // models/Seller.js

// import mongoose from "mongoose";

// const sellerSchema = new mongoose.Schema(
//   {
//     // ─────────────────────────────────────────
//     // BASIC INFO
//     // ─────────────────────────────────────────
//     name: {
//       type: String,
//       required: true,
//     },

//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },

//     phone: {
//       type: String,
//       required: true,
//     },

//     password: {
//       type: String,
//       required: true,
//     },

//     // ─────────────────────────────────────────
//     // COMPANY INFO
//     // ─────────────────────────────────────────
//     companyName: {
//       type: String,
//       default: "",
//     },

//     companyType: {
//       type: String,
//       enum: ["Manufacturer", "Trader", "Exporter", "Wholesaler", "Retailer", ""],
//       default: "",
//     },

//     yearEstablished: {
//       type: String,
//       default: "",
//     },

//     employees: {
//       type: String,
//       default: "",
//     },

//     annualTurnover: {
//       type: String,
//       default: "",
//     },

//     companyWebsite: {
//       type: String,
//       default: "",
//     },

//     companyDescription: {
//       type: String,
//       default: "",
//     },

//     // ─────────────────────────────────────────
//     // LEGAL INFO
//     // ─────────────────────────────────────────
//     gstNumber: {
//       type: String,
//       default: "",
//     },

//     panNumber: {
//       type: String,
//       default: "",
//     },

//     regNumber: {
//       type: String,
//       default: "",
//     },

//     // ─────────────────────────────────────────
//     // LOCATION
//     // ─────────────────────────────────────────
//     city: {
//       type: String,
//       default: "",
//     },

//     state: {
//       type: String,
//       default: "",
//     },

//     pincode: {
//       type: String,
//       default: "",
//     },

//     address: {
//       type: String,
//       default: "",
//     },

//     // ─────────────────────────────────────────
//     // PROFILE IMAGE
//     // ─────────────────────────────────────────
//     profileImage: {
//       url:       { type: String, default: "" },
//       public_id: { type: String, default: "" },
//     },

//     // ─────────────────────────────────────────
//     // SUBSCRIPTION
//     // ─────────────────────────────────────────
//     subscriptionActive: {
//       type: Boolean,
//       default: false,
//     },

//     accountStatus: {
//       type: String,
//       enum: ["pending", "active"],
//       default: "pending",
//     },

//     subscriptionPlan: {
//       type: String,
//       enum: ["basic", "premium", "gold"],
//       default: null,
//     },

//     subscriptionExpire: {
//       type: Date,
//       default: null,
//     },
//   },
//   { timestamps: true }
// );

// const Seller = mongoose.model("Seller", sellerSchema);

// export default Seller;



// models/Seller.js

import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema(
  {
    // ─────────────────────────────────────────
    // BASIC INFO
    // ─────────────────────────────────────────
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    // ─────────────────────────────────────────
    // FORGOT PASSWORD OTP  ← NEW
    // ─────────────────────────────────────────
    resetOtp: {
      type: String,
      default: null,
    },

    resetOtpExpiry: {
      type: Date,
      default: null,
    },

    // ─────────────────────────────────────────
    // COMPANY INFO
    // ─────────────────────────────────────────
    companyName: {
      type: String,
      default: "",
    },

    companyType: {
      type: String,
      enum: ["Manufacturer", "Trader", "Exporter", "Wholesaler", "Retailer", ""],
      default: "",
    },

    yearEstablished: {
      type: String,
      default: "",
    },

    employees: {
      type: String,
      default: "",
    },

    annualTurnover: {
      type: String,
      default: "",
    },

    companyWebsite: {
      type: String,
      default: "",
    },

    companyDescription: {
      type: String,
      default: "",
    },

    // ─────────────────────────────────────────
    // LEGAL INFO
    // ─────────────────────────────────────────
    gstNumber: {
      type: String,
      default: "",
    },

    panNumber: {
      type: String,
      default: "",
    },

    regNumber: {
      type: String,
      default: "",
    },

    // ─────────────────────────────────────────
    // LOCATION
    // ─────────────────────────────────────────
    city: {
      type: String,
      default: "",
    },

    state: {
      type: String,
      default: "",
    },

    pincode: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    // ─────────────────────────────────────────
    // PROFILE IMAGE
    // ─────────────────────────────────────────
    profileImage: {
      url:       { type: String, default: "" },
      public_id: { type: String, default: "" },
    },

    // ─────────────────────────────────────────
    // SUBSCRIPTION
    // ─────────────────────────────────────────
    subscriptionActive: {
      type: Boolean,
      default: false,
    },

    accountStatus: {
      type: String,
      enum: ["pending", "active"],
      default: "pending",
    },

    subscriptionPlan: {
      type: String,
      enum: ["basic", "premium", "gold"],
      default: null,
    },

    subscriptionExpire: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const Seller = mongoose.model("Seller", sellerSchema);

export default Seller;