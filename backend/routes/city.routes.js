import express from "express";
import { createCity, getCities, updateCity, deleteCity } from "../controllers/city.controller.js";
import adminAuthMiddleware, { checkPermission } from "../middleware/adminAuthMiddleware.js"; 
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/",      getCities);
router.post("/",     checkPermission("cities"), upload.single("image"), createCity); 
router.put("/:id",   checkPermission("cities"), upload.single("image"), updateCity); 
router.delete("/:id",checkPermission("cities"), deleteCity); 

export default router;