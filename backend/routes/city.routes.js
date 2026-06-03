import express from "express";
import { createCity, getCities, updateCity, deleteCity } from "../controllers/city.controller.js";
import adminAuthMiddleware from "../middleware/adminAuthMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/",      getCities);
router.post("/",     adminAuthMiddleware, upload.single("image"), createCity);
router.put("/:id",   adminAuthMiddleware, upload.single("image"), updateCity);
router.delete("/:id",adminAuthMiddleware, deleteCity);

export default router;