import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
});

// ─────────────────────────────────────────
// GET ALL CONTACTS
// ─────────────────────────────────────────
export const getAllContacts = async () => {
  const response = await axios.get(
    `${API}/contact`,
    {
      headers: authHeader(),
    }
  );

  return response.data;
};

// ─────────────────────────────────────────
// GET SINGLE CONTACT
// ─────────────────────────────────────────
export const getContactById = async (id) => {
  const response = await axios.get(
    `${API}/contact/${id}`,
    {
      headers: authHeader(),
    }
  );

  return response.data;
};

// ─────────────────────────────────────────
// UPDATE CONTACT STATUS
// status = "new" | "read" | "replied"
// ─────────────────────────────────────────
export const updateContactStatus = async (
  id,
  status
) => {
  const response = await axios.put(
    `${API}/contact/${id}/status`,
    { status },
    {
      headers: authHeader(),
    }
  );

  return response.data;
};

// ─────────────────────────────────────────
// DELETE CONTACT
// ─────────────────────────────────────────
export const deleteContact = async (id) => {
  const response = await axios.delete(
    `${API}/contact/${id}`,
    {
      headers: authHeader(),
    }
  );

  return response.data;
};