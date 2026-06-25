// routes/admin/bulkUpload.js
// POST /api/admin/bulk-upload
// Admin Excel se sellers + products + subscription ek saath add karta hai

import express from "express";
import multer from "multer";
import xlsx from "xlsx";
import bcrypt from "bcryptjs";
import Seller from "../../models/Seller.js";
import Product from "../../models/product.model.js";
import Category from "../../models/Category.js";
import SubCategory from "../../models/subCategoryModel.js";

const router = express.Router();

// ─────────────────────────────────────────────────────────────
// MULTER — memory mein lo
// ─────────────────────────────────────────────────────────────
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const allowed = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];
    allowed.includes(file.mimetype)
      ? cb(null, true)
      : cb(new Error("Only Excel files (.xlsx / .xls) allowed"), false);
  },
});

// ─────────────────────────────────────────────────────────────
// HELPER — Title se unique slug banana
// ─────────────────────────────────────────────────────────────
const generateSlug = async (title) => {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

  let slug = base;
  let counter = 1;

  while (await Product.findOne({ slug })) {
    slug = `${base}-${counter}`;
    counter++;
  }
  return slug;
};

// ─────────────────────────────────────────────────────────────
// HELPER — Subscription plan ke hisaab se expiry days
// ─────────────────────────────────────────────────────────────
const getPlanDays = (plan) => {
  switch (plan?.toLowerCase()) {
    case "basic":
      return 30;
    case "premium":
      return 90;
    case "gold":
      return 180;
    default:
      return 0;
  }
};

// ─────────────────────────────────────────────────────────────
// MAIN ROUTE — POST /api/admin/bulk-upload
// ─────────────────────────────────────────────────────────────
router.post("/bulk-upload", upload.single("file"), async (req, res) => {
  const results = {
    total: 0,
    success: 0,
    failed: 0,
    errors: [],
    created: [],
  };

  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Excel file required" });
    }

    // ── Excel parse ──
    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const rows = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], {
      defval: "",
    });

    if (!rows.length) {
      return res
        .status(400)
        .json({ success: false, message: "Excel sheet is empty" });
    }

    results.total = rows.length;

    // ── Saari categories ek baar DB se load karo (performance) ──
    const allCategories = await Category.find({});
    const allSubCategories = await SubCategory.find({});

    // ─────────────────────────────────────────
    // ROW BY ROW PROCESS
    // ─────────────────────────────────────────
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const rowNum = i + 2;

      try {
        // ── 1. Required fields check ──
        const name = row.name?.toString().trim();
        const email = row.email?.toString().trim().toLowerCase();
        const phone = row.phone?.toString().trim();
        const password = row.password?.toString().trim();

        if (!name || !email || !phone || !password) {
          results.failed++;
          results.errors.push({
            row: rowNum,
            email: email || "N/A",
            reason: "name, email, phone, password — ye sab required hain",
          });
          continue;
        }

        // ── 3. Subscription plan ──
        const planRaw = row.subscriptionPlan?.toString().trim().toLowerCase();
        const validPlan = ["basic", "premium", "gold"].includes(planRaw)
          ? planRaw
          : null;
        const planDays = getPlanDays(validPlan);

        // ── 2. Existing seller check — naya banao ya existing use karo ──
        let seller = await Seller.findOne({ email });
        let isNewSeller = false;

        if (!seller) {
          // ── Naya seller banao ──
          const hashedPassword = await bcrypt.hash(password, 10);
          seller = await Seller.create({
            name,
            email,
            phone,
            password: hashedPassword,
            companyName: row.companyName?.toString().trim() || "",
            companyType: row.companyType?.toString().trim() || "",
            yearEstablished: row.yearEstablished?.toString().trim() || "",
            employees: row.employees?.toString().trim() || "",
            annualTurnover: row.annualTurnover?.toString().trim() || "",
            companyWebsite: row.companyWebsite?.toString().trim() || "",
            companyDescription: row.companyDescription?.toString().trim() || "",
            gstNumber: row.gstNumber?.toString().trim() || "",
            panNumber: row.panNumber?.toString().trim() || "",
            regNumber: row.regNumber?.toString().trim() || "",
            city: row.city?.toString().trim() || "",
            state: row.state?.toString().trim() || "",
            pincode: row.pincode?.toString().trim() || "",
            address: row.address?.toString().trim() || "",
            subscriptionActive: validPlan ? true : false,
            accountStatus: validPlan ? "active" : "pending",
            subscriptionPlan: validPlan || null,
            subscriptionExpire: validPlan
              ? new Date(Date.now() + planDays * 24 * 60 * 60 * 1000)
              : null,
              isVerified: true,        // ← ye rakho
isPhoneVerified: true,
          });
          isNewSeller = true;
        }


        // ── 5. Product add ──
        let productStatus = "No product";

        if (row.productTitle?.toString().trim()) {
          const categoryName = row.categoryName?.toString().trim();
          const subCatName = row.subCategoryName?.toString().trim();

          // Case-insensitive name match
          const categoryDoc = allCategories.find(
            (c) => c.name.toLowerCase() === categoryName?.toLowerCase(),
          );

          const subCategoryDoc = categoryDoc
            ? allSubCategories.find(
                (s) =>
                  s.name.toLowerCase() === subCatName?.toLowerCase() &&
                  s.category?.toString() === categoryDoc._id?.toString(),
              )
            : null;

          if (!categoryDoc) {
            productStatus = `Category not found: "${categoryName}"`;
            results.errors.push({
              row: rowNum,
              email,
              reason: `Seller ✅ | Product skip — Category nahi mila: "${categoryName}" — Check admin categories page`,
            });
          } else if (!subCategoryDoc) {
            productStatus = `SubCategory not found: "${subCatName}"`;
            results.errors.push({
              row: rowNum,
              email,
              reason: `Seller ✅ | Product skip — SubCategory nahi mila: "${subCatName}" under "${categoryName}"`,
            });
          } else {
            const slug = await generateSlug(row.productTitle.toString().trim());
            const prodStatus = validPlan ? "approved" : "pending";
            const isFeatured = validPlan === "gold"; // sirf gold

            await Product.create({
              title: row.productTitle.toString().trim(),
              slug,
              seller: seller._id,
              category: categoryDoc._id,
              subcategory: subCategoryDoc._id,
              price: parseFloat(row.price) || 0,
              moq: parseInt(row.moq) || 1,
              unit: row.unit?.toString().trim() || "Piece",
              brand: row.brand?.toString().trim() || "",
              stock: parseInt(row.stock) || 0,
              shortDesc: row.shortDesc?.toString().trim() || "",
              description:
                row.description?.toString().trim() || "Bulk uploaded product",
              images: [],
              status: prodStatus,
              isActive: true,
              featured: isFeatured,
            });

            productStatus = `Product added (${prodStatus})`;
          }
        }

        results.success++;
        results.created.push({
          email,
          companyName: seller.companyName || name,
          subscription: validPlan || "none",
          product: productStatus,
          isNew: isNewSeller ? "New Seller" : "Existing Seller",
        });
      } catch (rowErr) {
        results.failed++;
        results.errors.push({
          row: rowNum,
          email: row.email || "N/A",
          reason: rowErr.message || "Unknown error",
        });
      }
    }

    return res.status(200).json({
      success: true,
      message: `Bulk upload complete — ${results.success} success, ${results.failed} failed out of ${results.total}`,
      results,
    });
  } catch (err) {
    console.error("Bulk upload error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error during bulk upload",
      error: err.message,
    });
  }
});

// ─────────────────────────────────────────────────────────────
// TEMPLATE DOWNLOAD — GET /api/admin/bulk-upload/template
// ─────────────────────────────────────────────────────────────
router.get("/bulk-upload/template", async (req, res) => {
  try {
    const categories = await Category.find({}).select("name").lean();
    const subCategories = await SubCategory.find({})
      .select("name category")
      .lean();

    const catNames = categories.map((c) => c.name).join(" / ");
    const subNames = subCategories.map((s) => s.name).join(" / ");

    const templateData = [
      {
        name: "Owner Full Name",
        email: "seller@example.com",
        phone: "9999999999",
        password: "SecurePass@123",
        companyName: "ABC Pvt Ltd",
        companyType: "Manufacturer",
        yearEstablished: "2010",
        employees: "11-50",
        annualTurnover: "1-5 Crore",
        companyWebsite: "https://abc.com",
        companyDescription: "We manufacture steel products",
        gstNumber: "27ABCDE1234F1Z5",
        panNumber: "ABCDE1234F",
        regNumber: "",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001",
        address: "123, Main Street, Andheri West",
        subscriptionPlan: "basic",
        productTitle: "Steel Rod 12mm",
        categoryName: categories[0]?.name || "Category Name Exactly",
        subCategoryName: subCategories[0]?.name || "SubCategory Name Exactly",
        price: "500",
        moq: "50",
        unit: "Kg",
        brand: "ABC Steel",
        stock: "1000",
        shortDesc: "High quality TMT bars",
        description: "ISI certified TMT bars suitable for construction",
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "8888888888",
        password: "Jane@456",
        companyName: "XYZ Traders",
        companyType: "Trader",
        yearEstablished: "2015",
        employees: "1-10",
        annualTurnover: "Below 1 Crore",
        companyWebsite: "",
        companyDescription: "",
        gstNumber: "",
        panNumber: "",
        regNumber: "",
        city: "Delhi",
        state: "Delhi",
        pincode: "110001",
        address: "456, Market Road",
        subscriptionPlan: "",
        productTitle: "",
        categoryName: "",
        subCategoryName: "",
        price: "",
        moq: "",
        unit: "",
        brand: "",
        stock: "",
        shortDesc: "",
        description: "",
      },
      // Notes row
      {
        name: "⚠️ YE ROW DELETE KARO BEFORE UPLOAD",
        email: "Unique email",
        phone: "10 digit",
        password: "Min 6 chars",
        companyName: "",
        companyType: "Manufacturer/Trader/Exporter/Wholesaler/Retailer",
        yearEstablished: "e.g. 2010",
        employees: "1-10 / 11-50 / 51-100 / 101-500 / 500+",
        annualTurnover:
          "Below 1 Crore / 1-5 Crore / 5-10 Crore / 10-50 Crore / 50+ Crore",
        companyWebsite: "https:// se shuru",
        companyDescription: "",
        gstNumber: "15 char",
        panNumber: "10 char",
        regNumber: "Optional",
        city: "",
        state: "",
        pincode: "6 digit",
        address: "",
        subscriptionPlan: "basic / premium / gold / blank (no subscription)",
        productTitle: "Blank = no product",
        categoryName: `Exactly: ${catNames || "Admin se check karo"}`,
        subCategoryName: `Exactly: ${subNames || "Admin se check karo"}`,
        price: "Number only",
        moq: "Number only",
        unit: "Piece/Kg/Liter/Meter/Box/Set/Ton",
        brand: "Optional",
        stock: "Number only",
        shortDesc: "1 line",
        description: "Required agar product add kar rahe ho",
      },
    ];

    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(templateData);
    worksheet["!cols"] = Array(28).fill({ wch: 24 });
    xlsx.utils.book_append_sheet(workbook, worksheet, "Sellers");

    const buffer = xlsx.write(workbook, { type: "buffer", bookType: "xlsx" });
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=bulk_sellers_template.xlsx",
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );
    res.send(buffer);
  } catch (err) {
    console.error("Template error:", err);
    res
      .status(500)
      .json({ success: false, message: "Template generation failed" });
  }
});

export default router;
