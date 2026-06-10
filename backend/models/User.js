import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["admin", "hr"],
default: "admin",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    
  profileCompleted: {
    type: Boolean,
    default: false
  },

  isApproved: {
    type: Boolean,
    default: false
  },

  sellerProfile: {
    companyName: String,
    ownerName: String,
    phone: String,
    gst: String,
    address: String,
  }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;


