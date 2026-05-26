// // import axios from "axios";

// // const API = "http://localhost:5000/api";

// // export const registerSeller = async (data) => {
// //   return await axios.post(
// //     `${API}/auth/seller/register`,
// //     data
// //   );
// // };

// // export const loginSeller = async (data) => {
// //   return await axios.post(
// //     `${API}/auth/seller/login`,
// //     data
// //   );
// // };



// // import axios from "axios";

// // const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// // export const registerSeller = async (data) => {
// //   return await axios.post(`${API}/auth/seller/register`, data);
// // };

// // export const loginSeller = async (data) => {
// //   return await axios.post(`${API}/auth/seller/login`, data);
// // };



// import axios from "axios";

// const API =
//   import.meta.env.VITE_API_URL ||
//   "http://localhost:5000/api";


// // ✅ REGISTER
// export const registerSeller = async (
//   data
// ) => {
//   return await axios.post(
//     `${API}/auth/seller/register`,
//     data
//   );
// };


// // ✅ LOGIN
// export const loginSeller = async (
//   data
// ) => {
//   return await axios.post(
//     `${API}/auth/seller/login`,
//     data
//   );
// };


// // ✅ GET LOGGED IN USER
// export const getMe = async (
//   token
// ) => {
//   return await axios.get(
//     `${API}/auth/me`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
// };