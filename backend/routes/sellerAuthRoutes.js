import express from "express";

import {
  registerSeller,
  loginSeller,
    getAllSellers,
} from "../controllers/sellerAuthController.js";


const router = express.Router();

// REGISTER
router.post("/register", registerSeller);

// LOGIN
router.post("/login", loginSeller);

router.get("/all", getAllSellers);

export default router;