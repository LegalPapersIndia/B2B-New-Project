// import User from "../models/User.js";

// export const updateSellerProfile = async (req, res) => {
//   try {
//     const userId = req.user.id; // from JWT middleware

//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       {
//         sellerProfile: req.body,
//         profileCompleted: true,
//       },
//       { new: true }
//     );

//     res.json({
//       message: "Profile updated successfully",
//       user: updatedUser,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };



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