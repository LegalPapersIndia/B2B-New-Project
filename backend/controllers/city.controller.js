import City from "../models/City.js";
import Seller from "../models/Seller.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../utils/cloudinary.utils.js";

// CREATE CITY (Admin)
export const createCity = async (req, res) => {
  try {
    const { name, slug } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image required" });
    }

    const uploaded = await uploadToCloudinary(req.file.buffer, "b2b/cities");

    const city = await City.create({
      name,
      slug,
      image: {
        url:       uploaded.secure_url,
        public_id: uploaded.public_id,
      },
    });

    res.status(201).json({ success: true, city });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE CITY (Admin)
export const updateCity = async (req, res) => {
  try {
    const city = await City.findById(req.params.id);
    if (!city) return res.status(404).json({ success: false, message: "City not found" });

    const { name, slug, isActive } = req.body;

    // New image upload karo agar aayi
    if (req.file) {
      // Purani delete karo
      if (city.image?.public_id) {
        await deleteFromCloudinary(city.image.public_id);
      }
      const uploaded = await uploadToCloudinary(req.file.buffer, "b2b/cities");
      city.image = { url: uploaded.secure_url, public_id: uploaded.public_id };
    }

    if (name)     city.name     = name;
    if (slug)     city.slug     = slug;
    if (isActive !== undefined) city.isActive = isActive;

    await city.save();

    res.status(200).json({ success: true, city });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE CITY (Admin)
export const deleteCity = async (req, res) => {
  try {
    const city = await City.findById(req.params.id);
    if (!city) return res.status(404).json({ success: false, message: "City not found" });

    // Cloudinary se delete karo
    if (city.image?.public_id) {
      await deleteFromCloudinary(city.image.public_id);
    }

    await city.deleteOne();

    res.status(200).json({ success: true, message: "City deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL CITIES (Public)
export const getCities = async (req, res) => {
  try {
    const cities = await City.find({ isActive: true });

    const citiesWithStats = await Promise.all(
      cities.map(async (city) => {
        const cityFirstWord = city.name.split(",")[0].trim();
       const sellerCount = await Seller.countDocuments({
  city: { $regex: cityFirstWord, $options: "i" },
  subscriptionActive: true,
});

const sellers = await Seller.find({
  city: { $regex: cityFirstWord, $options: "i" },
  subscriptionActive: true,
}).select("companyType");

        const industries = [...new Set(
          sellers.map(s => s.companyType).filter(Boolean)
        )].slice(0, 3);

        return {
          ...city.toObject(),
          sellerCount,
          industries,
        };
      })
    );

    res.status(200).json({ success: true, cities: citiesWithStats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};