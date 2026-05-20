


// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { adminLogin } from "../api/auth";

// export default function AdminLogin() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);

//     // Agar already login hai to direct dashboard
//     const token = localStorage.getItem("adminToken");

//    if (token) {
//   navigate("/admin/dashboard", { replace: true });
// }
//   }, [navigate]);

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     setError("");

//     if (!email || !password) {
//       setError("Email aur password .");
//       return;
//     }

//     setLoading(true);

//     await new Promise((r) => setTimeout(r, 1800));

//     setLoading(false);

//     // Demo Login
//     if (email !== "admin@b2b.com" || password !== "admin123") {
//       setError("Invalid credentials. Please try again.");
//     } else {
//       // Save Login
//       localStorage.setItem("adminToken", "adminLoggedIn");
//       localStorage.setItem("adminEmail", email);

//       // Redirect Dashboard
//       navigate("/admin/dashboard", { replace: true });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-4 relative overflow-hidden">
      
//       {/* Grid Background */}
//       <div
//         className="absolute inset-0 z-0"
//         style={{
//           backgroundImage: `
//             linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)
//           `,
//           backgroundSize: "40px 40px",
//         }}
//       />

//       {/* Orb Top Left */}
//       <div
//         className="absolute -top-24 -left-24 w-96 h-96 rounded-full z-0 animate-pulse"
//         style={{
//           background:
//             "radial-gradient(circle, rgba(59,130,246,0.15), transparent 70%)",
//           filter: "blur(80px)",
//         }}
//       />

//       {/* Orb Bottom Right */}
//       <div
//         className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full z-0 animate-pulse"
//         style={{
//           background:
//             "radial-gradient(circle, rgba(139,92,246,0.12), transparent 70%)",
//           filter: "blur(80px)",
//           animationDelay: "1.5s",
//         }}
//       />

//       {/* Card */}
//       <div
//         className={`relative z-10 w-full max-w-md bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 sm:p-10 backdrop-blur-xl transition-all duration-700 ${
//           mounted
//             ? "opacity-100 translate-y-0"
//             : "opacity-0 translate-y-6"
//         }`}
//       >
//         {/* Badge */}
//         <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-semibold tracking-widest px-3 py-1 rounded-full mb-6">
//           <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
//           ADMIN PORTAL
//         </div>

//         {/* Brand */}
//         <div className="flex items-center gap-3 mb-7">
//           <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
//             <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
//               <rect
//                 width="28"
//                 height="28"
//                 rx="8"
//                 fill="#3B82F6"
//                 opacity="0.15"
//               />

//               <path
//                 d="M7 14L12 19L21 9"
//                 stroke="#60A5FA"
//                 strokeWidth="2.5"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </div>

//           <div>
//             <div className="text-xl font-bold text-slate-100 tracking-tight">
//               B2B<span className="text-blue-400">Market</span>
//             </div>

//             <div className="text-[11px] text-white/30 mt-0.5">
//               Admin Control Panel
//             </div>
//           </div>
//         </div>

//         {/* Heading */}
//         <h1 className="text-2xl font-bold text-slate-100 tracking-tight mb-1">
//           Welcome back
//         </h1>

//         <p className="text-sm text-white/40 mb-7">
//           Sign in to manage your marketplace
//         </p>

//         {/* Form */}
//         <form onSubmit={handleLogin} className="flex flex-col gap-5">

//           {/* Email */}
//           <div className="flex flex-col gap-2">
//             <label className="text-[11px] font-medium text-white/50 uppercase tracking-widest">
//               Email Address
//             </label>

//             <div className="relative flex items-center bg-white/[0.04] border border-white/[0.08] rounded-xl">
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="admin@b2b.com"
//                 className="w-full bg-transparent outline-none px-4 py-3.5 text-sm text-slate-100 placeholder:text-white/20"
//               />
//             </div>
//           </div>

//           {/* Password */}
//           <div className="flex flex-col gap-2">
//             <label className="text-[11px] font-medium text-white/50 uppercase tracking-widest">
//               Password
//             </label>

//             <div className="relative flex items-center bg-white/[0.04] border border-white/[0.08] rounded-xl">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="••••••••"
//                 className="w-full bg-transparent outline-none px-4 py-3.5 text-sm text-slate-100 placeholder:text-white/20"
//               />

//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-4 text-white/40 hover:text-white"
//               >
//                 {showPassword ? "Hide" : "Show"}
//               </button>
//             </div>
//           </div>

//           {/* Error */}
//           {error && (
//             <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 text-red-400 text-sm">
//               {error}
//             </div>
//           )}

//           {/* Submit */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-3.5 rounded-xl text-white text-sm font-semibold tracking-wide mt-1
//             bg-gradient-to-r from-blue-500 to-violet-600
//             hover:from-blue-600 hover:to-violet-700
//             active:scale-[0.98]
//             disabled:opacity-60 disabled:cursor-not-allowed
//             transition-all duration-300"
//           >
//             {loading ? "Signing in..." : "Sign In to Dashboard →"}
//           </button>
//         </form>

//         {/* Demo Credentials */}
//         <div className="mt-6 flex flex-wrap items-center gap-2 bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3">
//           <span className="text-[10px] text-white/30 uppercase tracking-widest">
//             Demo:
//           </span>

//           <code className="text-xs bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded font-mono">
//             admin@b2b.com
//           </code>

//           <code className="text-xs bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded font-mono">
//             admin123
//           </code>
//         </div>

//         {/* Footer */}
//         <p className="mt-5 text-center text-[11px] text-white/20">
//           © 2026 B2BMarket · Admin access only
//         </p>
//       </div>
//     </div>
//   );
// }





import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../api/adminAuth";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Agar already login hai to direct dashboard
    const token = localStorage.getItem("adminToken");

    if (token) {
      navigate("/admin/dashboard", {
        replace: true,
      });
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Email aur password required hai");
      return;
    }

    try {
      setLoading(true);

      // API CALL
      const res = await adminLogin({
        email,
        password,
      });

      setLoading(false);

      console.log(res.data);

      // SAVE TOKEN
      localStorage.setItem(
        "adminToken",
        res.data.token
      );

      localStorage.setItem(
        "adminEmail",
        res.data.user.email
      );

      localStorage.setItem(
        "adminRole",
        res.data.user.role
      );

      // REDIRECT
      navigate("/admin/dashboard", {
        replace: true,
      });

    } catch (error) {
      setLoading(false);

      console.log(error.response?.data);

      setError(
        error.response?.data?.message ||
          "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-4 relative overflow-hidden">

      {/* Grid Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Orb Top Left */}
      <div
        className="absolute -top-24 -left-24 w-96 h-96 rounded-full z-0 animate-pulse"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.15), transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Orb Bottom Right */}
      <div
        className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full z-0 animate-pulse"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.12), transparent 70%)",
          filter: "blur(80px)",
          animationDelay: "1.5s",
        }}
      />

      {/* Card */}
      <div
        className={`relative z-10 w-full max-w-md bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 sm:p-10 backdrop-blur-xl transition-all duration-700 ${
          mounted
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
        }`}
      >

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-semibold tracking-widest px-3 py-1 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          ADMIN PORTAL
        </div>

        {/* Brand */}
        <div className="flex items-center gap-3 mb-7">

          <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
            <svg
              width="24"
              height="24"
              viewBox="0 0 28 28"
              fill="none"
            >
              <rect
                width="28"
                height="28"
                rx="8"
                fill="#3B82F6"
                opacity="0.15"
              />

              <path
                d="M7 14L12 19L21 9"
                stroke="#60A5FA"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div>
            <div className="text-xl font-bold text-slate-100 tracking-tight">
              B2B
              <span className="text-blue-400">
                Market
              </span>
            </div>

            <div className="text-[11px] text-white/30 mt-0.5">
              Admin Control Panel
            </div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-slate-100 tracking-tight mb-1">
          Welcome back
        </h1>

        <p className="text-sm text-white/40 mb-7">
          Sign in to manage your marketplace
        </p>

        {/* Form */}
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-5"
        >

          {/* Email */}
          <div className="flex flex-col gap-2">

            <label className="text-[11px] font-medium text-white/50 uppercase tracking-widest">
              Email Address
            </label>

            <div className="relative flex items-center bg-white/[0.04] border border-white/[0.08] rounded-xl">
              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="admin@b2b.com"
                className="w-full bg-transparent outline-none px-4 py-3.5 text-sm text-slate-100 placeholder:text-white/20"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">

            <label className="text-[11px] font-medium text-white/50 uppercase tracking-widest">
              Password
            </label>

            <div className="relative flex items-center bg-white/[0.04] border border-white/[0.08] rounded-xl">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="••••••••"
                className="w-full bg-transparent outline-none px-4 py-3.5 text-sm text-slate-100 placeholder:text-white/20"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 text-white/40 hover:text-white"
              >
                {showPassword
                  ? "Hide"
                  : "Show"}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-white text-sm font-semibold tracking-wide mt-1
            bg-gradient-to-r from-blue-500 to-violet-600
            hover:from-blue-600 hover:to-violet-700
            active:scale-[0.98]
            disabled:opacity-60 disabled:cursor-not-allowed
            transition-all duration-300"
          >
            {loading
              ? "Signing in..."
              : "Sign In to Dashboard →"}
          </button>
        </form>

        {/* Demo Credentials */}
        {/* <div className="mt-6 flex flex-wrap items-center gap-2 bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3">

          <span className="text-[10px] text-white/30 uppercase tracking-widest">
            Demo:
          </span>

          <code className="text-xs bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded font-mono">
            admin@b2b.com
          </code>

          <code className="text-xs bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded font-mono">
            password
          </code>
        </div> */}

        {/* Footer */}
        <p className="mt-5 text-center text-[11px] text-white/20">
          © 2026 B2BMarket · Admin access only
        </p>
      </div>
    </div>
  );
}