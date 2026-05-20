import express from "express";

import {
  registerSeller,
  loginSeller,
  adminLogin,
  createAdmin,
} from "../controllers/authController.js";

const router = express.Router();


// REGISTER
router.post(
  "/seller/register",
  registerSeller
);


// LOGIN
router.post(
  "/seller/login",
  loginSeller
);

router.get(
  "/create-admin",
  createAdmin
);

router.post("/admin/login", adminLogin);

export default router;