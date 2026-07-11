


// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { adminLoginApi } from "../../api/authApi";

// export default function AdminLogin() {

//   const navigate  = useNavigate();
//   const [email, setEmail]       = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading]   = useState(false);
//   const [error, setError]       = useState("");
//   const [mounted, setMounted]   = useState(false);

//   useEffect(() => {
//     setMounted(true);
//     const token = localStorage.getItem("adminToken");
//     const role  = localStorage.getItem("adminRole");
//     if (token) {
//       if (role === "hr") {
//         navigate("/admin/careers", { replace: true });
//       } else if (role === "manager") { // ✅ NEW
//         navigate("/admin/dashboard", { replace: true });
//       } else {
//         navigate("/admin/dashboard", { replace: true });
//       }
//     }
//   }, [navigate]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!email || !password) {
//       setError("Email aur password required hai");
//       return;
//     }

//     try {
//       setLoading(true);

//       const data = await adminLoginApi(email, password);

//       if (data.success) {
//         localStorage.setItem("adminToken", data.token);
//         localStorage.setItem("adminName",  data.admin.name);
//         localStorage.setItem("adminEmail", data.admin.email);
//         localStorage.setItem("adminRole",  data.admin.role);
//         // ✅ NEW - Manager ki permissions save (admin/hr ke liye ye khali array hi rahega)
//         localStorage.setItem("adminPermissions", JSON.stringify(data.admin.permissions || []));

//         // ROLE-BASED REDIRECT
//         if (data.admin.role === "hr") {
//           navigate("/admin/careers", { replace: true });
//         } else {
//           navigate("/admin/dashboard", { replace: true });
//         }

//       } else {
//         setError(data.message || "Login failed");
//       }

//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-4 relative overflow-hidden">

//       {/* Grid Background */}
//       <div className="absolute inset-0 z-0" style={{
//         backgroundImage: `
//           linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px),
//           linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)
//         `,
//         backgroundSize: "40px 40px",
//       }} />

//       {/* Orbs */}
//       <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full z-0 animate-pulse" style={{
//         background: "radial-gradient(circle, rgba(59,130,246,0.15), transparent 70%)",
//         filter: "blur(80px)",
//       }} />
//       <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full z-0 animate-pulse" style={{
//         background: "radial-gradient(circle, rgba(139,92,246,0.12), transparent 70%)",
//         filter: "blur(80px)",
//         animationDelay: "1.5s",
//       }} />

//       {/* Card */}
//       <div className={`relative z-10 w-full max-w-md bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 sm:p-10 backdrop-blur-xl transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>

//         {/* Badge */}
//         <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-semibold tracking-widest px-3 py-1 rounded-full mb-6">
//           <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
//           ADMIN PORTAL
//         </div>
//          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-semibold tracking-widest px-3 py-1 rounded-full mb-6">
//           <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
//           Hr PORTAL
//         </div>

//         {/* Brand */}
//         <div className="flex items-center gap-3 mb-7">
//           <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
//             <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
//               <rect width="28" height="28" rx="8" fill="#3B82F6" opacity="0.15" />
//               <path d="M7 14L12 19L21 9" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
//             </svg>
//           </div>
//           <div>
//             <div className="text-xl font-bold text-slate-100 tracking-tight">
//               B2B<span className="text-blue-400">Market</span>
//             </div>
//             <div className="text-[11px] text-white/30 mt-0.5">Admin Control Panel</div>
//           </div>
//         </div>

//         {/* Heading */}
//         <h1 className="text-2xl font-bold text-slate-100 tracking-tight mb-1">Welcome back</h1>
//         <p className="text-sm text-white/40 mb-7">Sign in to manage your marketplace</p>

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
import { adminLoginApi } from "../../api/authApi";

export default function AdminLogin() {

  const navigate  = useNavigate();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [mounted, setMounted]   = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("adminToken");
    const role  = localStorage.getItem("adminRole");
    if (token) {
      if (role === "hr") {
        navigate("/admin/careers", { replace: true });
      } else if (role === "manager") { 
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/admin/dashboard", { replace: true });
      }
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

      const data = await adminLoginApi(email, password);

      if (data.success) {
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminName",  data.admin.name);
        localStorage.setItem("adminEmail", data.admin.email);
        localStorage.setItem("adminRole",  data.admin.role);
        //  NEW - Manager ki permissions save (admin/hr ke liye ye khali array hi rahega)
        localStorage.setItem("adminPermissions", JSON.stringify(data.admin.permissions || []));

        // ROLE-BASED REDIRECT
        if (data.admin.role === "hr") {
          navigate("/admin/careers", { replace: true });
        } else {
          navigate("/admin/dashboard", { replace: true });
        }

      } else {
        setError(data.message || "Login failed");
      }

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
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
        className="absolute -top-24 -left-24 w-96 h-96 rounded-full z-0"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.18), transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      {/* Orb Bottom Right */}
      <div
        className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full z-0"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.15), transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      {/* Card */}
      <div
        className={`relative z-10 w-full max-w-md bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 sm:p-10 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.4)] transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-semibold tracking-[0.15em] px-3 py-1.5 rounded-full mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          CONTROL PANEL
        </div>

        {/* Brand */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-600/20 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="8" fill="#3B82F6" opacity="0.15" />
              <path d="M7 14L12 19L21 9" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <div className="text-xl font-bold text-slate-100 tracking-tight leading-none">
              LPI-<span className="text-blue-400">B2B</span>
            </div>
            <div className="text-[11px] text-white/30 mt-1">Marketplace Administration</div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-[26px] font-bold text-slate-100 tracking-tight mb-1.5">
          Welcome back
        </h1>
        <p className="text-sm text-white/40 mb-8 leading-relaxed">
          Sign in with your admin, HR, or manager account
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-5">

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-medium text-white/50 uppercase tracking-widest">
              Email Address
            </label>
            <div className="relative flex items-center bg-white/[0.04] border border-white/[0.08] rounded-xl focus-within:border-blue-500/50 focus-within:bg-white/[0.06] transition-colors">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                autoComplete="email"
                className="w-full bg-transparent outline-none px-4 py-3.5 text-sm text-slate-100 placeholder:text-white/20"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-medium text-white/50 uppercase tracking-widest">
              Password
            </label>
            <div className="relative flex items-center bg-white/[0.04] border border-white/[0.08] rounded-xl focus-within:border-blue-500/50 focus-within:bg-white/[0.06] transition-colors">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full bg-transparent outline-none px-4 py-3.5 text-sm text-slate-100 placeholder:text-white/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-white/40 hover:text-white text-xs font-medium transition-colors"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2.5 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 mt-0.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{error}</span>
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
            transition-all duration-300
            flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Signing in...
              </>
            ) : (
              <>Sign In to Dashboard →</>
            )}
          </button>

        </form>

        {/* Footer */}
        <p className="mt-7 text-center text-[11px] text-white/20">
          © 2026 LPI-B2B · Authorized access only
        </p>

      </div>
    </div>
  );
}