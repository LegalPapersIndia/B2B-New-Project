

import User from "../models/User.js";

export const updateSellerProfile = async (req, res) => {
  try {

    const {
      companyName,
      ownerName,
      email,
      phone,
      gst,
      address,
    } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        companyName,
        ownerName,
        email,
        phone,
        gst,
        address,

        // 🔥 IMPORTANT
        profileCompleted: true,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Profile updated successfully",
      user,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};