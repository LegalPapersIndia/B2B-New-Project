// utils/sendSMS.js

import axios from "axios";

const COMBIRDS_URL = "https://smsapi.edumarcsms.com/api/v1/sendsms";
const SENDER_ID = "EDUMRC";

// ─────────────────────────────────────────
// SEND OTP SMS (Combirds OTP Key)
// ─────────────────────────────────────────
export const sendOtpSms = async (phone, otp) => {
  try {
    const message = `Your ${otp} OTP for verification is: ${otp}. OTP is confidential, refrain from sharing it with anyone. By Edumarc Technologies`;

    const response = await axios.post(
      COMBIRDS_URL,
      {
        number: [phone],
        message,
        senderId: SENDER_ID,
        templateId: "1707168926925165526",
      },
      {
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.COMBIRDS_OTP_KEY,
        },
      },
    );
    console.log("Combirds Response:", JSON.stringify(response.data));
    const transactionId = response.data.data.transactionId;
    setTimeout(async () => {
      try {
        const statusRes = await axios.get(
          `https://api.edumarcsms.com/api/v1/org/transaction/${transactionId}/messages`,
          { headers: { apikey: process.env.COMBIRDS_OTP_KEY } },
        );
        console.log("📦 Delivery Status:", JSON.stringify(statusRes.data));
      } catch (e) {
        console.log("Status Error:", e?.response?.data || e.message);
      }
    }, 5000);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("sendOtpSms error:", error?.response?.data || error.message);
    return { success: false, error: error.message };
  }
};
