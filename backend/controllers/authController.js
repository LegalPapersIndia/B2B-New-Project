// import User from "../models/User.js";

// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// // import validator from "validator";


// // JWT TOKEN
// const generateToken = (id) => {
//   return jwt.sign(
//     { id },
//     process.env.JWT_SECRET,
//     {
//       expiresIn: "30d",
//     }
//   );
// };


// // REGISTER SELLER
// export const registerSeller = async (req, res) => {
//   try {
//     const {
//       name,
//       email,
//       phone,
//       password,
//     } = req.body;

//     // Validation
//     if (
//       !name ||
//       !email ||
//       !phone ||
//       !password
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     // Email Validation
//     if (!validator.isEmail(email)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid email",
//       });
//     }

//     // Password Length
//     if (password.length < 6) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Password must be at least 6 characters",
//       });
//     }

//     // Existing User
//     const existingUser = await User.findOne({
//       $or: [{ email }, { phone }],
//     });

//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Email or phone already registered",
//       });
//     }

//     // Hash Password
//     const salt = await bcrypt.genSalt(10);

//     const hashedPassword = await bcrypt.hash(
//       password,
//       salt
//     );

//     // Create User
//     const user = await User.create({
//       name,
//       email,
//       phone,
//       password: hashedPassword,
//       role: "seller",
//     });

//     // Response
//     res.status(201).json({
//       success: true,
//       message:
//         "Seller registered successfully",

//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         role: user.role,
//       },

//       token: generateToken(user._id),
//     });
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


// // LOGIN SELLER
// export const loginSeller = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check Fields
//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Email and password are required",
//       });
//     }

//     // Find User
//     const user = await User.findOne({
//       email,
//     });

//   const emailRegex =
//   /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// if (!emailRegex.test(email)) {
//   return res.status(400).json({
//     success: false,
//     message: "Invalid email",
//   });
// }

//     // Match Password
//     const isMatch = await bcrypt.compare(
//       password,
//       user.password
//     );

//     if (!isMatch) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid password",
//       });
//     }

//     // Response
//     res.status(200).json({
//       success: true,
//       message: "Login successful",

//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         role: user.role,
//       },

//       token: generateToken(user._id),
//     });
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };



import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// =======================
// JWT TOKEN GENERATOR
// =======================
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};


// =======================
// REGISTER SELLER
// =======================
export const registerSeller = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Validation
    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Password length check
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email or phone already registered",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: "seller",
    });

    // Response
    res.status(201).json({
      success: true,
      message: "Seller registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      token: generateToken(user._id),
    });

  } catch (error) {
    console.log("REGISTER ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =======================
// LOGIN SELLER
// =======================
export const loginSeller = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Response
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      token: generateToken(user._id),
    });

  } catch (error) {
    console.log("LOGIN ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ADMIN LOGIN

export const adminLogin = async (req, res) => {
  try {

    const { email, password } = req.body;

    // Check fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required",
      });
    }

    // Find admin
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    // Role check
    if (user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Not authorized as admin",
      });
    }

    // Match password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Success
    res.status(200).json({
      success: true,
      message: "Admin login successful",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },

      token: generateToken(user._id),
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createAdmin = async (
  req,
  res
) => {
  try {

    const hashedPassword =
      await bcrypt.hash(
        "admin123",
        10
      );

    const admin = await User.create({
      name: "Admin",
      email: "admin@b2b.com",
      phone: "9999999999",
      password: hashedPassword,
      role: "admin",
    });

    res.status(201).json({
      success: true,
      admin,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};