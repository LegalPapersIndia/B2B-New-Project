// // src/Pages/Careers.jsx
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   FaBriefcase,
//   FaMapMarkerAlt,
//   FaClock,
//   FaPaperPlane,
//   FaLaptop,
//   FaUsers,
//   FaChartLine,
//   FaGlobe,
// } from "react-icons/fa";

// const jobs = [
//   {
//     id: 1,
//     title: "Frontend Developer",
//     location: "Remote / India",
//     type: "Full Time",
//     desc: "Work with React, Tailwind and build scalable UI systems.",
//   },
//   {
//     id: 2,
//     title: "Backend Developer",
//     location: "Noida, India",
//     type: "Full Time",
//     desc: "Develop APIs, manage databases and scalable backend systems.",
//   },
//   {
//     id: 3,
//     title: "UI/UX Designer",
//     location: "Remote",
//     type: "Contract",
//     desc: "Design modern user interfaces and improve user experience.",
//   },
// ];

// const Careers = () => {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     position: "",
//     message: "",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Application Submitted Successfully!");
//     setForm({ name: "", email: "", position: "", message: "" });
//   };

//   return (
//     <div className="bg-slate-50 min-h-screen">

//       {/* ================= HERO ================= */}
//       <section className="relative py-28 overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-900 to-orange-600" />

//         <div className="relative max-w-6xl mx-auto px-6 text-center">

//           <motion.h1
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-5xl md:text-6xl font-black text-white"
//           >
//             Build Your Career With <span className="text-orange-500">Us</span>
//           </motion.h1>

//           <p className="text-gray-300 mt-6 max-w-2xl mx-auto text-lg">
//             Join our mission-driven team and grow your career in a global B2B tech environment.
//           </p>

//           <button className="mt-10 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl transition-all hover:scale-105">
//             View Open Positions
//           </button>

//         </div>
//       </section>

//       {/* ================= WHY JOIN US ================= */}
//       <section className="py-20 max-w-7xl mx-auto px-6">
//         <h2 className="text-3xl font-black text-center mb-12">
//           Why Join <span className="text-orange-500">Us?</span>
//         </h2>

//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

//           {[
//             { icon: <FaLaptop />, title: "Remote Work", desc: "Work from anywhere in the world" },
//             { icon: <FaUsers />, title: "Great Team", desc: "Collaborative and friendly environment" },
//             { icon: <FaChartLine />, title: "Career Growth", desc: "Fast learning and promotion paths" },
//             { icon: <FaGlobe />, title: "Global Exposure", desc: "Work with international clients" },
//           ].map((item, i) => (
//             <motion.div
//               key={i}
//               whileHover={{ y: -10 }}
//               className="bg-white p-8 rounded-3xl shadow border hover:shadow-xl transition"
//             >
//               <div className="text-3xl text-orange-600 mb-4">
//                 {item.icon}
//               </div>
//               <h3 className="font-bold text-lg">{item.title}</h3>
//               <p className="text-gray-500 mt-2 text-sm">{item.desc}</p>
//             </motion.div>
//           ))}

//         </div>
//       </section>

//       {/* ================= JOB OPENINGS ================= */}
//       <section className="py-20 bg-white">
//         <div className="max-w-6xl mx-auto px-6">

//           <h2 className="text-3xl font-black text-center mb-12">
//             Open <span className="text-orange-500">Positions</span>
//           </h2>

//           <div className="space-y-6">

//             {jobs.map((job) => (
//               <motion.div
//                 key={job.id}
//                 whileHover={{ scale: 1.02 }}
//                 className="p-6 border rounded-3xl shadow-sm hover:shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6"
//               >

//                 <div>
//                   <h3 className="text-xl font-bold">{job.title}</h3>

//                   <div className="flex gap-4 text-gray-500 text-sm mt-2">
//                     <span className="flex items-center gap-1"><FaMapMarkerAlt /> {job.location}</span>
//                     <span className="flex items-center gap-1"><FaClock /> {job.type}</span>
//                   </div>

//                   <p className="text-gray-600 mt-2">{job.desc}</p>
//                 </div>

//                 <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-2xl font-semibold flex items-center gap-2">
//                   Apply <FaPaperPlane />
//                 </button>

//               </motion.div>
//             ))}

//           </div>

//         </div>
//       </section>

//       {/* ================= CULTURE ================= */}
//       <section className="py-20 max-w-6xl mx-auto px-6 text-center">

//         <h2 className="text-3xl font-black mb-6">
//           Our <span className="text-orange-500">Culture</span>
//         </h2>

//         <p className="text-gray-600 max-w-3xl mx-auto">
//           We believe in innovation, collaboration and continuous learning.
//           Our team works in a fast-paced environment where ideas matter more than hierarchy.
//         </p>

//       </section>

//       {/* ================= APPLY FORM ================= */}
//       <section className="pb-24">
//         <div className="max-w-4xl mx-auto px-6">

//           <div className="bg-white p-10 rounded-3xl shadow-xl border">

//             <h2 className="text-3xl font-black mb-8 text-center">
//               Apply Now
//             </h2>

//             <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">

//               <input
//                 name="name"
//                 placeholder="Full Name"
//                 value={form.name}
//                 onChange={handleChange}
//                 className="p-4 border rounded-2xl"
//               />

//               <input
//                 name="email"
//                 placeholder="Email"
//                 value={form.email}
//                 onChange={handleChange}
//                 className="p-4 border rounded-2xl"
//               />

//               <select
//                 name="position"
//                 value={form.position}
//                 onChange={handleChange}
//                 className="p-4 border rounded-2xl md:col-span-2"
//               >
//                 <option>Select Position</option>
//                 <option>Frontend Developer</option>
//                 <option>Backend Developer</option>
//                 <option>UI/UX Designer</option>
//               </select>

//               <textarea
//                 name="message"
//                 placeholder="Why should we hire you?"
//                 value={form.message}
//                 onChange={handleChange}
//                 className="p-4 border rounded-2xl md:col-span-2 h-40"
//               />

//               <button
//                 type="submit"
//                 className="md:col-span-2 bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
//               >
//                 Submit Application <FaPaperPlane />
//               </button>

//             </form>

//           </div>

//         </div>
//       </section>

//     </div>
//   );
// };

// export default Careers;



// src/Pages/Careers.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
  FaLaptop,
  FaUsers,
  FaChartLine,
  FaGlobe,
} from "react-icons/fa";

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    location: "Remote / India",
    type: "Full Time",
    desc: "Work with React, Tailwind and build scalable UI systems.",
  },
  {
    id: 2,
    title: "Backend Developer",
    location: "Noida, India",
    type: "Full Time",
    desc: "Develop APIs, manage databases and scalable backend systems.",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    location: "Remote",
    type: "Contract",
    desc: "Design modern user interfaces and improve user experience.",
  },
];

const Careers = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    position: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Application Submitted Successfully!");
    setForm({ name: "", email: "", position: "", message: "" });
  };

  return (
    <div className="bg-slate-50 min-h-screen">

      {/* HERO */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-900 to-orange-600" />

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-black text-white">
            Build Your Career With <span className="text-orange-500">Us</span>
          </h1>

          <p className="text-gray-300 mt-6 max-w-2xl mx-auto text-lg">
            Join our mission-driven team and grow your career in a global B2B tech environment.
          </p>
        </div>
      </section>

      {/* WHY JOIN US */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <h2 className="text-5xl font-black text-slate-900">
            Why Join Us
          </h2>
          <p className="text-slate-500 mt-5 text-lg max-w-3xl mx-auto">
            Grow faster with innovation, teamwork and global exposure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-6">

          {[
            { icon: <FaLaptop />, title: "Remote Work", desc: "Work from anywhere" },
            { icon: <FaUsers />, title: "Great Team", desc: "Friendly environment" },
            { icon: <FaChartLine />, title: "Career Growth", desc: "Fast promotions" },
            { icon: <FaGlobe />, title: "Global Exposure", desc: "International clients" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="group bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl transition-all duration-500 hover:bg-orange-50/40"
            >
              <div className="w-14 h-14 rounded-2xl bg-orange-100 group-hover:bg-orange-500 flex items-center justify-center text-orange-500 group-hover:text-white text-2xl transition-all duration-500">
                {item.icon}
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                {item.title}
              </h3>

              <p className="mt-3 text-slate-600">{item.desc}</p>
            </motion.div>
          ))}

        </div>
      </section>

      {/* JOB OPENINGS */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-4xl font-black text-center mb-16">
            Open <span className="text-orange-500">Positions</span>
          </h2>

          <div className="space-y-8">

            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.01 }}
                className="group bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl transition-all duration-500 hover:bg-orange-50/40"
              >

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">
                      {job.title}
                    </h3>

                    <div className="flex gap-5 text-slate-500 text-sm mt-3">
                      <span className="flex items-center gap-2">
                        <FaMapMarkerAlt /> {job.location}
                      </span>
                      <span className="flex items-center gap-2">
                        <FaClock /> {job.type}
                      </span>
                    </div>

                    <p className="text-slate-600 mt-4">{job.desc}</p>
                  </div>

                  <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-2xl font-semibold flex items-center gap-2">
                    Apply <FaPaperPlane />
                  </button>

                </div>

              </motion.div>
            ))}

          </div>

        </div>
      </section>

      {/* ================= CULTURE (RESTORED) ================= */}
      <section className="py-24 max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-black mb-6">
          Our <span className="text-orange-500">Culture</span>
        </h2>

        <p className="text-slate-600 max-w-3xl mx-auto text-lg">
          We believe in innovation, collaboration and continuous learning.
          Our team works in a fast-paced environment where ideas matter more than hierarchy.
        </p>
      </section>

      {/* ================= APPLY FORM (RESTORED) ================= */}
      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-6">

          <div className="bg-white p-10 rounded-3xl shadow-xl">

            <h2 className="text-3xl font-black mb-8 text-center">
              Apply Now
            </h2>

            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">

              <input name="name" onChange={handleChange} placeholder="Full Name" className="p-4 border rounded-2xl" />
              <input name="email" onChange={handleChange} placeholder="Email" className="p-4 border rounded-2xl" />

              <select name="position" onChange={handleChange} className="p-4 border rounded-2xl md:col-span-2">
                <option>Select Position</option>
                <option>Frontend Developer</option>
                <option>Backend Developer</option>
                <option>UI/UX Designer</option>
              </select>

              <textarea
                name="message"
                onChange={handleChange}
                placeholder="Why should we hire you?"
                className="p-4 border rounded-2xl md:col-span-2 h-40"
              />

              <button
                type="submit"
                className="md:col-span-2 bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-2xl font-bold flex justify-center items-center gap-2"
              >
                Submit Application <FaPaperPlane />
              </button>

            </form>

          </div>

        </div>
      </section>

    </div>
  );
};

export default Careers;