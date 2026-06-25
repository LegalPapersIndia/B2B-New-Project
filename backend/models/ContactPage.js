// backend/models/ContactPage.js
import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer:   { type: String, required: true },
  order:    { type: Number, default: 0 },
});

const contactPageSchema = new mongoose.Schema(
  {
    // HERO
    heroHeading:          { type: String, default: "Let's Start A Conversation" },
    heroHeadingHighlight: { type: String, default: "Conversation" },
    heroSubtext:          { type: String, default: "Reach out to our support team for supplier inquiries, partnerships, buyer assistance, or any business-related questions." },

    // CONTACT INFO
    phone:        { type: String, default: "+91 9876543210" },
    email:        { type: String, default: "support@b2bmarketplace.com" },
    workingHours: { type: String, default: "Monday - Saturday : 9 AM - 7 PM" },
    whatsappNumber: { type: String, default: "919876543210" },
    whatsappMessage: { type: String, default: "Hello I want to know more about your B2B services" },

    // MAP / OFFICE
    officeName:      { type: String, default: "B2B Global Office" },
    officeAddress:   { type: String, default: "Noida-8, Uttar Pradesh, India" },
    mapEmbedUrl:     { type: String, default: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224346.6131039485!2d77.06889944241318!3d28.527280343785406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3c4c5b4c9d5%3A0x123456789abcdef!2sNew%20Delhi!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin" },
    directionsLink:  { type: String, default: "https://maps.google.com" },

    // FAQ
    faqs: [faqSchema],

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("ContactPage", contactPageSchema);