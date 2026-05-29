import express from "express";

import {
  registerSeller,
  loginSeller,
    getAllSellers,
      deleteSeller,  
} from "../controllers/sellerAuthController.js";
import adminAuthMiddleware from "../middleware/adminAuthMiddleware.js"; 


const router = express.Router();

// REGISTER
router.post("/register", registerSeller);

// LOGIN
router.post("/login", loginSeller);

router.get("/all", getAllSellers);

// DELETE SELLER (Admin)
router.delete("/:id", adminAuthMiddleware, deleteSeller); 

export default router;