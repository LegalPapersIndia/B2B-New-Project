

// // src/Pages/Careers.jsx
// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FaBriefcase, FaMapMarkerAlt, FaClock, FaMoneyBillWave,
//   FaTimes, FaUpload, FaPaperPlane, FaSpinner, FaUsers,
//   FaRocket, FaHeart, FaShieldAlt, FaLaptop, FaChevronDown,
// } from "react-icons/fa";
// import { getActiveJobs, applyJob } from "../api/careerApi";

// const BENEFITS = [
//   { icon: <FaRocket />,     title: "Growth Opportunities",  desc: "Fast-track your career with mentorship and learning programs." },
//   { icon: <FaHeart />,      title: "Health & Wellness",     desc: "Comprehensive health insurance for you and your family." },
//   { icon: <FaLaptop />,     title: "Remote Friendly",       desc: "Flexible work from home options available for most roles." },
//   { icon: <FaMoneyBillWave/>,title: "Competitive Salary",   desc: "Industry-best compensation with performance bonuses." },
//   { icon: <FaUsers />,      title: "Inclusive Culture",     desc: "Diverse, respectful and collaborative work environment." },
//   { icon: <FaShieldAlt />,  title: "Job Security",          desc: "Stable company with strong funding and growth trajectory." },
// ];

// const TYPE_COLOR = {
//   "Full-time":  "bg-blue-100 text-blue-700",
//   "Part-time":  "bg-orange-100 text-orange-700",
//   "Remote":     "bg-green-100 text-green-700",
//   "Internship": "bg-purple-100 text-purple-700",
// };

// export default function Careers() {
//   const [jobs,          setJobs]          = useState([]);
//   const [loading,       setLoading]       = useState(true);
//   const [selectedJob,   setSelectedJob]   = useState(null);
//   const [showForm,      setShowForm]      = useState(false);
//   const [submitting,    setSubmitting]    = useState(false);
//   const [submitted,     setSubmitted]     = useState(false);
//   const [filterDept,    setFilterDept]    = useState("All");
//   const [expandedJob,   setExpandedJob]   = useState(null);

//   const [form, setForm] = useState({
//     name: "", email: "", phone: "", coverLetter: "", resume: null,
//   });

//   useEffect(() => {
//     getActiveJobs()
//       .then(data => setJobs(data.jobs || []))
//       .catch(() => setJobs([]))
//       .finally(() => setLoading(false));
//   }, []);

//   const departments = ["All", ...new Set(jobs.map(j => j.department))];

//   const filtered = filterDept === "All" ? jobs : jobs.filter(j => j.department === filterDept);

//   const handleApply = (job) => {
//     setSelectedJob(job);
//     setShowForm(true);
//     setSubmitted(false);
//     setForm({ name: "", email: "", phone: "", coverLetter: "", resume: null });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     try {
//       const fd = new FormData();
//       fd.append("name",        form.name);
//       fd.append("email",       form.email);
//       fd.append("phone",       form.phone);
//       fd.append("coverLetter", form.coverLetter);
//       if (form.resume) fd.append("resume", form.resume);
//       await applyJob(selectedJob._id, fd);
//       setSubmitted(true);
//     } catch {
//       alert("Something went wrong. Please try again.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-50">

//       {/* ── HERO ── */}
//       <section className="relative py-28 overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-900 to-orange-600" />
//         <motion.div animate={{ y: [0,-20,0] }} transition={{ duration: 6, repeat: Infinity }}
//           className="absolute top-10 left-10 w-72 h-72 bg-blue-600/20 blur-3xl rounded-full" />
//         <motion.div animate={{ y: [0,20,0] }} transition={{ duration: 7, repeat: Infinity }}
//           className="absolute bottom-10 right-10 w-96 h-96 bg-orange-500/20 blur-3xl rounded-full" />

//         <div className="relative max-w-5xl mx-auto px-6 text-center">
//           <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
//             className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-5 py-2 rounded-full mb-6">
//             <FaBriefcase /> Join Our Team
//           </motion.div>
//           <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
//             className="text-5xl md:text-7xl font-black text-white leading-tight">
//             Build Your <span className="text-orange-500">Future</span><br />With LPI-B2B
//           </motion.h1>
//           <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2 }}
//             className="text-gray-300 mt-6 text-lg max-w-2xl mx-auto">
//             Join India's fastest growing B2B wholesale marketplace. Work with passionate people building something meaningful.
//           </motion.p>
//           <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.3 }}
//             className="mt-8 flex flex-wrap justify-center gap-6 text-white/80 text-sm">
//             <span className="flex items-center gap-2"><FaUsers className="text-orange-400" /> {jobs.length}+ Open Positions</span>
//             <span className="flex items-center gap-2"><FaMapMarkerAlt className="text-orange-400" /> Noida, UP & Remote</span>
//             <span className="flex items-center gap-2"><FaRocket className="text-orange-400" /> Fast Growing Startup</span>
//           </motion.div>
//         </div>
//       </section>

//       {/* ── BENEFITS ── */}
//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="text-center mb-14">
//             <h2 className="text-4xl font-black text-gray-900">Why Work <span className="text-orange-600">With Us?</span></h2>
//             <p className="text-gray-500 mt-3 max-w-xl mx-auto">We believe in taking care of our team so they can do their best work.</p>
//           </div>
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {BENEFITS.map((b, i) => (
//               <motion.div key={i} whileHover={{ y: -6 }}
//                 className="bg-slate-50 hover:bg-orange-50 border border-gray-100 hover:border-orange-200 rounded-3xl p-7 transition-all">
//                 <div className="text-3xl text-orange-500 mb-4">{b.icon}</div>
//                 <h3 className="font-bold text-gray-900 text-lg">{b.title}</h3>
//                 <p className="text-gray-500 mt-2 text-sm">{b.desc}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── JOB LISTINGS ── */}
//       <section className="py-20">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="text-center mb-12">
//             <h2 className="text-4xl font-black text-gray-900">Open <span className="text-blue-800">Positions</span></h2>
//           </div>

//           {/* FILTER */}
//           <div className="flex flex-wrap gap-3 justify-center mb-10">
//             {departments.map(d => (
//               <button key={d} onClick={() => setFilterDept(d)}
//                 className={`px-5 py-2 rounded-full font-semibold text-sm transition-all ${
//                   filterDept === d
//                     ? "bg-blue-800 text-white shadow-md"
//                     : "bg-white border border-gray-200 text-gray-600 hover:border-blue-300"
//                 }`}>
//                 {d}
//               </button>
//             ))}
//           </div>

//           {loading && (
//             <div className="text-center py-20">
//               <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
//             </div>
//           )}

//           {!loading && filtered.length === 0 && (
//             <div className="text-center py-20 text-gray-400">
//               <FaBriefcase className="text-5xl mx-auto mb-4 opacity-30" />
//               <p className="text-lg">No openings right now. Check back soon!</p>
//             </div>
//           )}

//           <div className="space-y-4 max-w-4xl mx-auto">
//             {filtered.map((job, i) => (
//               <motion.div key={job._id} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay: i*0.05 }}
//                 className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all overflow-hidden">

//                 <div className="p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//                   <div className="flex-1">
//                     <div className="flex flex-wrap items-center gap-3 mb-2">
//                       <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
//                       <span className={`text-xs font-semibold px-3 py-1 rounded-full ${TYPE_COLOR[job.type] || "bg-gray-100 text-gray-600"}`}>
//                         {job.type}
//                       </span>
//                     </div>
//                     <div className="flex flex-wrap gap-4 text-sm text-gray-500">
//                       <span className="flex items-center gap-1"><FaBriefcase className="text-orange-400" />{job.department}</span>
//                       <span className="flex items-center gap-1"><FaMapMarkerAlt className="text-orange-400" />{job.location}</span>
//                       <span className="flex items-center gap-1"><FaClock className="text-orange-400" />{job.experience}</span>
//                       {job.salary && <span className="flex items-center gap-1"><FaMoneyBillWave className="text-orange-400" />{job.salary}</span>}
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <button onClick={() => setExpandedJob(expandedJob === job._id ? null : job._id)}
//                       className="flex items-center gap-2 text-blue-800 font-semibold text-sm hover:text-blue-900 transition">
//                       Details <FaChevronDown className={`transition-transform ${expandedJob === job._id ? "rotate-180" : ""}`} />
//                     </button>
//                     <button onClick={() => handleApply(job)}
//                       className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-2xl font-semibold text-sm transition-all shadow-md hover:shadow-lg">
//                       Apply Now
//                     </button>
//                   </div>
//                 </div>

//                 <AnimatePresence>
//                   {expandedJob === job._id && (
//                     <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }}
//                       className="border-t border-gray-100 px-7 pb-7 overflow-hidden">
//                       <p className="text-gray-600 mt-5 leading-relaxed">{job.description}</p>
//                       {job.requirements?.length > 0 && (
//                         <div className="mt-5">
//                           <h4 className="font-bold text-gray-800 mb-3">Requirements:</h4>
//                           <ul className="space-y-2">
//                             {job.requirements.map((r, idx) => (
//                               <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
//                                 <span className="text-orange-500 mt-1">•</span> {r}
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       )}
//                       <button onClick={() => handleApply(job)}
//                         className="mt-6 bg-blue-800 hover:bg-blue-900 text-white px-8 py-3 rounded-2xl font-semibold transition">
//                         Apply for this Position
//                       </button>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── APPLY MODAL ── */}
//       <AnimatePresence>
//         {showForm && (
//           <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
//             className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
//             onClick={(e) => e.target === e.currentTarget && setShowForm(false)}>

//             <motion.div initial={{ scale:0.9, opacity:0 }} animate={{ scale:1, opacity:1 }} exit={{ scale:0.9, opacity:0 }}
//               className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">

//               {/* MODAL HEADER */}
//               <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-7 py-5 flex items-center justify-between">
//                 <div>
//                   <h3 className="text-white font-bold text-lg">Apply for Position</h3>
//                   <p className="text-blue-200 text-sm">{selectedJob?.title}</p>
//                 </div>
//                 <button onClick={() => setShowForm(false)} className="text-white/70 hover:text-white transition">
//                   <FaTimes size={20} />
//                 </button>
//               </div>

//               <div className="p-7">
//                 {submitted ? (
//                   <div className="text-center py-10">
//                     <div className="text-6xl mb-4">🎉</div>
//                     <h3 className="text-xl font-bold text-green-600">Application Submitted!</h3>
//                     <p className="text-gray-500 mt-2">We'll review your application and get back to you soon.</p>
//                     <button onClick={() => setShowForm(false)}
//                       className="mt-6 bg-blue-800 text-white px-8 py-3 rounded-2xl font-semibold">
//                       Close
//                     </button>
//                   </div>
//                 ) : (
//                   <form onSubmit={handleSubmit} className="space-y-4">
//                     <div>
//                       <label className="text-sm font-semibold text-gray-700">Full Name *</label>
//                       <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
//                         placeholder="Your full name"
//                         className="w-full mt-1 h-12 px-4 border rounded-xl bg-gray-50 focus:border-blue-800 outline-none" />
//                     </div>
//                     <div>
//                       <label className="text-sm font-semibold text-gray-700">Email *</label>
//                       <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
//                         placeholder="your@email.com"
//                         className="w-full mt-1 h-12 px-4 border rounded-xl bg-gray-50 focus:border-blue-800 outline-none" />
//                     </div>
//                     <div>
//                       <label className="text-sm font-semibold text-gray-700">Phone *</label>
//                       <input required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
//                         placeholder="+91 XXXXX XXXXX"
//                         className="w-full mt-1 h-12 px-4 border rounded-xl bg-gray-50 focus:border-blue-800 outline-none" />
//                     </div>
//                     <div>
//                       <label className="text-sm font-semibold text-gray-700">Cover Letter</label>
//                       <textarea value={form.coverLetter} onChange={e => setForm({...form, coverLetter: e.target.value})}
//                         placeholder="Tell us about yourself and why you want to join..."
//                         rows={4}
//                         className="w-full mt-1 p-4 border rounded-xl bg-gray-50 focus:border-blue-800 outline-none resize-none" />
//                     </div>
//                     <div>
//                       <label className="text-sm font-semibold text-gray-700">Resume (PDF/DOC)</label>
//                       <label className="mt-1 flex items-center gap-3 border-2 border-dashed border-gray-200 hover:border-orange-400 rounded-xl p-4 cursor-pointer transition">
//                         <FaUpload className="text-orange-500" />
//                         <span className="text-sm text-gray-500">
//                           {form.resume ? form.resume.name : "Click to upload resume"}
//                         </span>
//                         <input type="file" accept=".pdf,.doc,.docx" className="hidden"
//                           onChange={e => setForm({...form, resume: e.target.files[0]})} />
//                       </label>
//                     </div>
//                     <button type="submit" disabled={submitting}
//                       className="w-full bg-orange-600 hover:bg-orange-700 disabled:opacity-60 text-white py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all">
//                       {submitting ? <FaSpinner className="animate-spin" /> : <FaPaperPlane />}
//                       {submitting ? "Submitting..." : "Submit Application"}
//                     </button>
//                   </form>
//                 )}
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }




// src/Pages/Careers.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBriefcase, FaMapMarkerAlt, FaClock, FaMoneyBillWave,
  FaTimes, FaUpload, FaPaperPlane, FaSpinner, FaUsers,
  FaRocket, FaHeart, FaShieldAlt, FaLaptop, FaChevronDown,
} from "react-icons/fa";
import { getActiveJobs, applyJob } from "../api/careerApi";

const BENEFITS = [
  { icon: <FaRocket />,     title: "Growth Opportunities",  desc: "Fast-track your career with mentorship and learning programs." },
  { icon: <FaHeart />,      title: "Health & Wellness",     desc: "Comprehensive health insurance for you and your family." },
  { icon: <FaLaptop />,     title: "Remote Friendly",       desc: "Flexible work from home options available for most roles." },
  { icon: <FaMoneyBillWave/>,title: "Competitive Salary",   desc: "Industry-best compensation with performance bonuses." },
  { icon: <FaUsers />,      title: "Inclusive Culture",     desc: "Diverse, respectful and collaborative work environment." },
  { icon: <FaShieldAlt />,  title: "Job Security",          desc: "Stable company with strong funding and growth trajectory." },
];

const TYPE_COLOR = {
  "Full-time":  "bg-blue-100 text-blue-700",
  "Part-time":  "bg-orange-100 text-orange-700",
  "Remote":     "bg-green-100 text-green-700",
  "Internship": "bg-purple-100 text-purple-700",
};

export default function Careers() {
  const [jobs,          setJobs]          = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [selectedJob,   setSelectedJob]   = useState(null);
  const [showForm,      setShowForm]      = useState(false);
  const [submitting,    setSubmitting]    = useState(false);
  const [submitted,     setSubmitted]     = useState(false);
  const [filterDept,    setFilterDept]    = useState("All");
  const [expandedJob,   setExpandedJob]   = useState(null);

  const [form, setForm] = useState({
    name: "", email: "", phone: "", coverLetter: "", resume: null,
  });

  useEffect(() => {
    getActiveJobs()
      .then(data => setJobs(data.jobs || []))
      .catch(() => setJobs([]))
      .finally(() => setLoading(false));
  }, []);

  const departments = ["All", ...new Set(jobs.map(j => j.department))];

  const filtered = filterDept === "All" ? jobs : jobs.filter(j => j.department === filterDept);

  //  UPDATED - hero stats, same exact shape as ManufacturingHubsAll hero stats (no icons, value+label only)
  const heroStats = [
    { value: `${jobs.length}+`, label: "Open Positions" },
    { value: "2+",              label: "Locations" },
    { value: "Fast-Growing",    label: "Startup" },
    { value: "100%",            label: "Team Trust" },
  ];

  const handleApply = (job) => {
    setSelectedJob(job);
    setShowForm(true);
    setSubmitted(false);
    setForm({ name: "", email: "", phone: "", coverLetter: "", resume: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("name",        form.name);
      fd.append("email",       form.email);
      fd.append("phone",       form.phone);
      fd.append("coverLetter", form.coverLetter);
      if (form.resume) fd.append("resume", form.resume);
      await applyJob(selectedJob._id, fd);
      setSubmitted(true);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── HERO (UPDATED - exact ManufacturingHubsAll structure/height, same py-16, left-aligned) ── */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm font-medium mb-5"
            >
              <FaBriefcase className="w-4 h-4" />
              Join Our Team
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold leading-tight mb-4"
            >
              Build Your Future
              <span className="block text-orange-400">With LPI-B2B</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-blue-100 text-base leading-relaxed"
            >
              Join India's fastest growing B2B wholesale marketplace. Work with
              passionate people building something meaningful.
            </motion.p>

            {/* STATS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {heroStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                  className="bg-white/10 border border-white/10 rounded-2xl p-4"
                >
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                  <p className="text-sm text-blue-100 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-gray-900">Why Work <span className="text-orange-600">With Us?</span></h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">We believe in taking care of our team so they can do their best work.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((b, i) => (
              <motion.div key={i} whileHover={{ y: -6 }}
                className="bg-slate-50 hover:bg-orange-50 border border-gray-100 hover:border-orange-200 rounded-3xl p-7 transition-all">
                <div className="text-3xl text-orange-500 mb-4">{b.icon}</div>
                <h3 className="font-bold text-gray-900 text-lg">{b.title}</h3>
                <p className="text-gray-500 mt-2 text-sm">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── JOB LISTINGS ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900">Open <span className="text-blue-800">Positions</span></h2>
          </div>

          {/* FILTER */}
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {departments.map(d => (
              <button key={d} onClick={() => setFilterDept(d)}
                className={`px-5 py-2 rounded-full font-semibold text-sm transition-all ${
                  filterDept === d
                    ? "bg-blue-800 text-white shadow-md"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-blue-300"
                }`}>
                {d}
              </button>
            ))}
          </div>

          {loading && (
            <div className="text-center py-20">
              <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <FaBriefcase className="text-5xl mx-auto mb-4 opacity-30" />
              <p className="text-lg">No openings right now. Check back soon!</p>
            </div>
          )}

          <div className="space-y-4 max-w-4xl mx-auto">
            {filtered.map((job, i) => (
              <motion.div key={job._id} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay: i*0.05 }}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all overflow-hidden">

                <div className="p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${TYPE_COLOR[job.type] || "bg-gray-100 text-gray-600"}`}>
                        {job.type}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1"><FaBriefcase className="text-orange-400" />{job.department}</span>
                      <span className="flex items-center gap-1"><FaMapMarkerAlt className="text-orange-400" />{job.location}</span>
                      <span className="flex items-center gap-1"><FaClock className="text-orange-400" />{job.experience}</span>
                      {job.salary && <span className="flex items-center gap-1"><FaMoneyBillWave className="text-orange-400" />{job.salary}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setExpandedJob(expandedJob === job._id ? null : job._id)}
                      className="flex items-center gap-2 text-blue-800 font-semibold text-sm hover:text-blue-900 transition">
                      Details <FaChevronDown className={`transition-transform ${expandedJob === job._id ? "rotate-180" : ""}`} />
                    </button>
                    <button onClick={() => handleApply(job)}
                      className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-2xl font-semibold text-sm transition-all shadow-md hover:shadow-lg">
                      Apply Now
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedJob === job._id && (
                    <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }}
                      className="border-t border-gray-100 px-7 pb-7 overflow-hidden">
                      <p className="text-gray-600 mt-5 leading-relaxed">{job.description}</p>
                      {job.requirements?.length > 0 && (
                        <div className="mt-5">
                          <h4 className="font-bold text-gray-800 mb-3">Requirements:</h4>
                          <ul className="space-y-2">
                            {job.requirements.map((r, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
                                <span className="text-orange-500 mt-1">•</span> {r}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <button onClick={() => handleApply(job)}
                        className="mt-6 bg-blue-800 hover:bg-blue-900 text-white px-8 py-3 rounded-2xl font-semibold transition">
                        Apply for this Position
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPLY MODAL ── */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setShowForm(false)}>

            <motion.div initial={{ scale:0.9, opacity:0 }} animate={{ scale:1, opacity:1 }} exit={{ scale:0.9, opacity:0 }}
              className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">

              {/* MODAL HEADER */}
              <div className="bg-gradient-to-r from-blue-900 to-blue-800 px-7 py-5 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-bold text-lg">Apply for Position</h3>
                  <p className="text-blue-200 text-sm">{selectedJob?.title}</p>
                </div>
                <button onClick={() => setShowForm(false)} className="text-white/70 hover:text-white transition">
                  <FaTimes size={20} />
                </button>
              </div>

              <div className="p-7">
                {submitted ? (
                  <div className="text-center py-10">
                    <div className="text-6xl mb-4">🎉</div>
                    <h3 className="text-xl font-bold text-green-600">Application Submitted!</h3>
                    <p className="text-gray-500 mt-2">We'll review your application and get back to you soon.</p>
                    <button onClick={() => setShowForm(false)}
                      className="mt-6 bg-blue-800 text-white px-8 py-3 rounded-2xl font-semibold">
                      Close
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Full Name *</label>
                      <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                        placeholder="Your full name"
                        className="w-full mt-1 h-12 px-4 border rounded-xl bg-gray-50 focus:border-blue-800 outline-none" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Email *</label>
                      <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                        placeholder="your@email.com"
                        className="w-full mt-1 h-12 px-4 border rounded-xl bg-gray-50 focus:border-blue-800 outline-none" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Phone *</label>
                      <input required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full mt-1 h-12 px-4 border rounded-xl bg-gray-50 focus:border-blue-800 outline-none" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Cover Letter</label>
                      <textarea value={form.coverLetter} onChange={e => setForm({...form, coverLetter: e.target.value})}
                        placeholder="Tell us about yourself and why you want to join..."
                        rows={4}
                        className="w-full mt-1 p-4 border rounded-xl bg-gray-50 focus:border-blue-800 outline-none resize-none" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Resume (PDF/DOC)</label>
                      <label className="mt-1 flex items-center gap-3 border-2 border-dashed border-gray-200 hover:border-orange-400 rounded-xl p-4 cursor-pointer transition">
                        <FaUpload className="text-orange-500" />
                        <span className="text-sm text-gray-500">
                          {form.resume ? form.resume.name : "Click to upload resume"}
                        </span>
                        <input type="file" accept=".pdf,.doc,.docx" className="hidden"
                          onChange={e => setForm({...form, resume: e.target.files[0]})} />
                      </label>
                    </div>
                    <button type="submit" disabled={submitting}
                      className="w-full bg-orange-600 hover:bg-orange-700 disabled:opacity-60 text-white py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all">
                      {submitting ? <FaSpinner className="animate-spin" /> : <FaPaperPlane />}
                      {submitting ? "Submitting..." : "Submit Application"}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}