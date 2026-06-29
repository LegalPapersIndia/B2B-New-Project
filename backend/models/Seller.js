

// // // models/Seller.js

// // import mongoose from "mongoose";

// // const sellerSchema = new mongoose.Schema(
// //   {
// //     // ─────────────────────────────────────────
// //     // BASIC INFO
// //     // ─────────────────────────────────────────
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

// //     // ─────────────────────────────────────────
// //     // FORGOT PASSWORD OTP  ← NEW
// //     // ─────────────────────────────────────────
// //     resetOtp: {
// //       type: String,
// //       default: null,
// //     },

// //     resetOtpExpiry: {
// //       type: Date,
// //       default: null,
// //     },

// //     // ─────────────────────────────────────────
// //     // COMPANY INFO
// //     // ─────────────────────────────────────────
// //     companyName: {
// //       type: String,
// //       default: "",
// //     },

// //     companyType: {
// //       type: String,
// //       enum: ["Manufacturer", "Trader", "Exporter", "Wholesaler", "Retailer", ""],
// //       default: "",
// //     },

// //     yearEstablished: {
// //       type: String,
// //       default: "",
// //     },

// //     employees: {
// //       type: String,
// //       default: "",
// //     },

// //     annualTurnover: {
// //       type: String,
// //       default: "",
// //     },

// //     companyWebsite: {
// //       type: String,
// //       default: "",
// //     },

// //     companyDescription: {
// //       type: String,
// //       default: "",
// //     },

// //     // ─────────────────────────────────────────
// //     // LEGAL INFO
// //     // ─────────────────────────────────────────
// //     gstNumber: {
// //       type: String,
// //       default: "",
// //     },

// //     panNumber: {
// //       type: String,
// //       default: "",
// //     },

// //     regNumber: {
// //       type: String,
// //       default: "",
// //     },

// //     // ─────────────────────────────────────────
// //     // LOCATION
// //     // ─────────────────────────────────────────
// //     city: {
// //       type: String,
// //       default: "",
// //     },

// //     state: {
// //       type: String,
// //       default: "",
// //     },

// //     pincode: {
// //       type: String,
// //       default: "",
// //     },

// //     address: {
// //       type: String,
// //       default: "",
// //     },

// //     // ─────────────────────────────────────────
// //     // PROFILE IMAGE
// //     // ─────────────────────────────────────────
// //     profileImage: {
// //       url:       { type: String, default: "" },
// //       public_id: { type: String, default: "" },
// //     },

// //     // ─────────────────────────────────────────
// //     // SUBSCRIPTION
// //     // ─────────────────────────────────────────
// //     subscriptionActive: {
// //       type: Boolean,
// //       default: false,
// //     },

// //     accountStatus: {
// //       type: String,
// //       enum: ["pending", "active"],
// //       default: "pending",
// //     },

// //     subscriptionPlan: {
// //       type: String,
// //       enum: ["basic", "premium", "gold"],
// //       default: null,
// //     },

// //     subscriptionExpire: {
// //       type: Date,
// //       default: null,
// //     },
// //   },
// //   { timestamps: true }
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

//    phone: {
//   type: String,
//   required: true,
//   unique: true, // ✅ ADD
// },

//     password: {
//       type: String,
//       required: true,
//     },

//     // ─────────────────────────────────────────
//     // FORGOT PASSWORD OTP  ← NEW
//     // ─────────────────────────────────────────
//     resetOtp: {
//       type: String,
//       default: null,
//     },

//     resetOtpExpiry: {
//       type: Date,
//       default: null,
//     },

//     // ── REGISTRATION OTP ──
// regOtp: {
//   type: String,
//   default: null,
// },
// regOtpExpiry: {
//   type: Date,
//   default: null,
// },
// isPhoneVerified: {
//   type: Boolean,
//   default: false,
// },
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
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    // ─────────────────────────────────────────
    // FORGOT PASSWORD OTP
    // ─────────────────────────────────────────
    resetOtp: {
      type: String,
      default: null,
    },

    resetOtpExpiry: {
      type: Date,
      default: null,
    },

    // ── REGISTRATION OTP ──
    regOtp: {
      type: String,
      default: null,
    },
    regOtpExpiry: {
      type: Date,
      default: null,
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
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

//  PERMANENT FIX — jab bhi subscriptionActive false ho, products pending ho jayenge
sellerSchema.pre("save", async function () {
  if (
    this.isModified("subscriptionActive") &&
    this.subscriptionActive === false
  ) {
    const Product = (await import("./product.model.js")).default;
    await Product.updateMany(
      { seller: this._id },
      { $set: { status: "pending", featured: false } }
    );
  }
});

const Seller = mongoose.model("Seller", sellerSchema);

export default Seller;