// backend/controllers/contactPage.controller.js
import ContactPage from "../models/ContactPage.js";

// ─────────────────────────────────────────
// GET (Public)
// ─────────────────────────────────────────
export const getContactPage = async (req, res) => {
  try {
    let contact = await ContactPage.findOne();

    if (!contact) {
      contact = await ContactPage.create({});
    }

    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─────────────────────────────────────────
// UPDATE MAIN INFO (Admin)
// Hero + Contact Info + Map
// ─────────────────────────────────────────
export const updateContactPage = async (req, res) => {
  try {
    let contact = await ContactPage.findOne();

    if (!contact) {
      contact = await ContactPage.create(req.body);
    } else {
      contact = await ContactPage.findByIdAndUpdate(
        contact._id,
        req.body,
        { new: true }
      );
    }

    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─────────────────────────────────────────
// FAQ — ADD
// ─────────────────────────────────────────
export const addFaq = async (req, res) => {
  try {
    const { question, answer, order } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ success: false, message: "Question and Answer required" });
    }

    let contact = await ContactPage.findOne();
    if (!contact) contact = await ContactPage.create({});

    contact.faqs.push({ question, answer, order: order || 0 });
    await contact.save();

    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─────────────────────────────────────────
// FAQ — UPDATE
// ─────────────────────────────────────────
export const updateFaq = async (req, res) => {
  try {
    const { faqId } = req.params;
    const { question, answer, order } = req.body;

    const contact = await ContactPage.findOne();
    if (!contact) return res.status(404).json({ success: false, message: "Not found" });

    const faq = contact.faqs.id(faqId);
    if (!faq) return res.status(404).json({ success: false, message: "FAQ not found" });

    if (question) faq.question = question;
    if (answer)   faq.answer   = answer;
    if (order !== undefined) faq.order = order;

    await contact.save();

    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─────────────────────────────────────────
// FAQ — DELETE
// ─────────────────────────────────────────
export const deleteFaq = async (req, res) => {
  try {
    const { faqId } = req.params;

    const contact = await ContactPage.findOne();
    if (!contact) return res.status(404).json({ success: false, message: "Not found" });

    contact.faqs = contact.faqs.filter(
      (f) => f._id.toString() !== faqId
    );

    await contact.save();

    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};