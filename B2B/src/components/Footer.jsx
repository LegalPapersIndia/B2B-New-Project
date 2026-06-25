
// // // src/Component/Footer.jsx
// // import React from 'react';
// // import { 
// //   FaFacebookF, 
// //   FaTwitter, 
// //   FaInstagram, 
// //   FaLinkedinIn, 
// //   FaEnvelope, 
// //   FaPhoneAlt 
// // } from 'react-icons/fa';

// // const Footer = () => {
// //   const categories = [
// //     { name: 'Medicine & Pharma', href: '/category/medicine-pharma' },
// //     { name: 'Industrial Machinery', href: '/category/industrial-machinery' },
// //     { name: 'Cosmetics & Beauty', href: '/category/cosmetics-beauty' },
// //     { name: 'Electronics & Electricals', href: '/category/electronics' },
// //     { name: 'Food & Agriculture', href: '/category/foodi-agriculture' },
// //     { name: 'Apparel, Fashion & Textile', href: '/category/apparel-fashion-textile' },
    
// //   ];

// //   const companyLinks = [
// //     { name: 'About Us', href: '/about' },
// //     { name: 'Careers', href: '/careers' },
// //     { name: 'Contact Us', href: '/contact' },
// //     { name: 'Blog', href: '/blog' },
// //     { name: 'Become a Seller', href: '/become-seller' },
// //     { name: 'Help Center', href: '/help' },
// //   ];

// //   const legalLinks = [
// //     { name: 'Privacy Policy', href: '/privacy' },
// //     { name: 'Terms of Service', href: '/terms' },
// //     { name: 'Cookie Policy', href: '/cookies' },
// //     { name: 'Refund & Return Policy', href: '/refund' },
// //   ];

// //   return (
// //     <footer className="bg-gray-950 text-gray-300">
// //       <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
// //         <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12">
          
// //           {/* Logo & Description */}
// //           <div>
// //             <div className="flex items-center gap-3 mb-6">
// //               <div className="w-10 h-10 bg-orange-600 rounded-2xl flex items-center justify-center">
// //                 <span className="text-white font-bold text-3xl">B</span>
// //               </div>
// //               <div className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent tracking-tighter">
// //                 LPI-B2B
// //               </div>
// //             </div>

// //             <p className="text-gray-400 mb-8 text-[15px] leading-relaxed">
// //               Connecting global buyers and verified suppliers through a trusted B2B marketplace. 
// //               Quality products, transparent trade, and seamless sourcing experience.
// //             </p>
            
// //             <div className="flex items-center gap-6">
// //               <a 
// //                 href="tel:+917505266931" 
// //                 className="text-gray-400 hover:text-orange-400 transition-colors text-2xl"
// //               >
// //                 <FaPhoneAlt />
// //               </a>
// //               <a 
// //                 href="mailto:support@yourb2b.com" 
// //                 className="text-gray-400 hover:text-orange-400 transition-colors text-2xl"
// //               >
// //                 <FaEnvelope />
// //               </a>
// //             </div>
// //           </div>

// //           {/* Categories */}
// //           <div>
// //             <h3 className="text-white font-semibold text-lg mb-6">Popular Categories</h3>
// //             <ul className="space-y-3 text-sm">
// //               {categories.map((item) => (
// //                 <li key={item.name}>
// //                   <a 
// //                     href={item.href}
// //                     className="text-gray-400 hover:text-orange-400 hover:translate-x-1 transition-all duration-300 inline-block"
// //                   >
// //                     {item.name}
// //                   </a>
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>

// //           {/* Company */}
// //           <div>
// //             <h3 className="text-white font-semibold text-lg mb-6">Company</h3>
// //             <ul className="space-y-3 text-sm">
// //               {companyLinks.map((item) => (
// //                 <li key={item.name}>
// //                   <a 
// //                     href={item.href}
// //                     className="text-gray-400 hover:text-orange-400 hover:translate-x-1 transition-all duration-300 inline-block"
// //                   >
// //                     {item.name}
// //                   </a>
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>

// //           {/* Legal & Social */}
// //           <div>
// //             <h3 className="text-white font-semibold text-lg mb-6">Legal</h3>
// //             <ul className="space-y-3 text-sm mb-10">
// //               {legalLinks.map((item) => (
// //                 <li key={item.name}>
// //                   <a 
// //                     href={item.href}
// //                     className="text-gray-400 hover:text-orange-400 hover:translate-x-1 transition-all duration-300 inline-block"
// //                   >
// //                     {item.name}
// //                   </a>
// //                 </li>
// //               ))}
// //             </ul>

// //             <h3 className="text-white font-semibold text-lg mb-4">Follow Us</h3>
// //             <div className="flex items-center gap-6">
// //               <a 
// //                 href="https://facebook.com" 
// //                 target="_blank" 
// //                 rel="noopener noreferrer" 
// //                 className="text-gray-400 hover:text-blue-400 transition-all hover:scale-110 text-2xl"
// //               >
// //                 <FaFacebookF />
// //               </a>
// //               <a 
// //                 href="https://twitter.com" 
// //                 target="_blank" 
// //                 rel="noopener noreferrer" 
// //                 className="text-gray-400 hover:text-blue-400 transition-all hover:scale-110 text-2xl"
// //               >
// //                 <FaTwitter />
// //               </a>
// //               <a 
// //                 href="https://instagram.com" 
// //                 target="_blank" 
// //                 rel="noopener noreferrer" 
// //                 className="text-gray-400 hover:text-pink-400 transition-all hover:scale-110 text-2xl"
// //               >
// //                 <FaInstagram />
// //               </a>
// //               <a 
// //                 href="https://linkedin.com" 
// //                 target="_blank" 
// //                 rel="noopener noreferrer" 
// //                 className="text-gray-400 hover:text-blue-400 transition-all hover:scale-110 text-2xl"
// //               >
// //                 <FaLinkedinIn />
// //               </a>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Bottom Bar */}
// //         <div className="mt-16 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
// //           <p>© {new Date().getFullYear()} LPI-B2B Marketplace. All rights reserved.</p>
// //           <p className="mt-2">
// //             Designed & Developed by{' '}
// //             <a 
// //               href="https://www.legalpapersindia.com/" 
// //               target="_blank" 
// //               rel="noopener noreferrer"
// //               className="text-orange-400 hover:text-orange-300 transition-colors"
// //             >
// //               Legal Papers India
// //             </a>
// //           </p>
// //         </div>
// //       </div>
// //     </footer>
// //   );
// // };

// // export default Footer;



// // src/Component/Footer.jsx
// import React from 'react';
// import { 
//   FaFacebookF, 
//   FaTwitter, 
//   FaInstagram, 
//   FaLinkedinIn, 
//   FaEnvelope, 
//   FaPhoneAlt,
//   FaShieldAlt,
//   FaLock,
//   FaCheckCircle,
//   FaGlobe,
// } from 'react-icons/fa';

// const Footer = () => {
//   const categories = [
//     { name: 'Medicine & Pharma', href: '/category/medicine-pharma' },
//     { name: 'Industrial Machinery', href: '/category/industrial-machinery' },
//     { name: 'Cosmetics & Beauty', href: '/category/cosmetics-beauty' },
//     { name: 'Electronics & Electricals', href: '/category/electronics' },
//     { name: 'Food & Agriculture', href: '/category/foodi-agriculture' },
//     { name: 'Apparel, Fashion & Textile', href: '/category/apparel-fashion-textile' },
//   ];

//   const companyLinks = [
//     { name: 'About Us', href: '/about' },
//     { name: 'Careers', href: '/careers' },
//     { name: 'Contact Us', href: '/contact' },
//     { name: 'Blog', href: '/blog' },
//     { name: 'Become a Seller', href: '/become-seller' },
//     { name: 'Help Center', href: '/help' },
//   ];

//   const legalLinks = [
//     { name: 'Privacy Policy', href: '/privacy' },
//     { name: 'Terms of Service', href: '/terms' },
//     { name: 'Cookie Policy', href: '/cookies' },
//     { name: 'Refund & Return Policy', href: '/refund' },
//   ];

//   return (
//     <footer className="bg-gray-950 text-gray-300">
//       <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12">
          
//           {/* Logo & Description */}
//           <div>
//             <div className="flex items-center gap-3 mb-6">
//               <div className="w-10 h-10 bg-orange-600 rounded-2xl flex items-center justify-center">
//                 <span className="text-white font-bold text-3xl">B</span>
//               </div>
//               <div className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent tracking-tighter">
//                 LPI-B2B
//               </div>
//             </div>

//             <p className="text-gray-400 mb-8 text-[15px] leading-relaxed">
//               Connecting global buyers and verified suppliers through a trusted B2B marketplace. 
//               Quality products, transparent trade, and seamless sourcing experience.
//             </p>
            
//             <div className="flex items-center gap-6">
//               <a 
//                 href="tel:+917505266931" 
//                 className="text-gray-400 hover:text-orange-400 transition-colors text-2xl"
//               >
//                 <FaPhoneAlt />
//               </a>
//               <a 
//                 href="mailto:support@yourb2b.com" 
//                 className="text-gray-400 hover:text-orange-400 transition-colors text-2xl"
//               >
//                 <FaEnvelope />
//               </a>
//             </div>
//           </div>

//           {/* Categories */}
//           <div>
//             <h3 className="text-white font-semibold text-lg mb-6">Popular Categories</h3>
//             <ul className="space-y-3 text-sm">
//               {categories.map((item) => (
//                 <li key={item.name}>
//                   <a 
//                     href={item.href}
//                     className="text-gray-400 hover:text-orange-400 hover:translate-x-1 transition-all duration-300 inline-block"
//                   >
//                     {item.name}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Company */}
//           <div>
//             <h3 className="text-white font-semibold text-lg mb-6">Company</h3>
//             <ul className="space-y-3 text-sm">
//               {companyLinks.map((item) => (
//                 <li key={item.name}>
//                   <a 
//                     href={item.href}
//                     className="text-gray-400 hover:text-orange-400 hover:translate-x-1 transition-all duration-300 inline-block"
//                   >
//                     {item.name}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Legal & Social */}
//           <div>
//             <h3 className="text-white font-semibold text-lg mb-6">Legal</h3>
//             <ul className="space-y-3 text-sm mb-10">
//               {legalLinks.map((item) => (
//                 <li key={item.name}>
//                   <a 
//                     href={item.href}
//                     className="text-gray-400 hover:text-orange-400 hover:translate-x-1 transition-all duration-300 inline-block"
//                   >
//                     {item.name}
//                   </a>
//                 </li>
//               ))}
//             </ul>

//             <h3 className="text-white font-semibold text-lg mb-4">Follow Us</h3>
//             <div className="flex items-center gap-6">
//               <a 
//                 href="https://facebook.com" 
//                 target="_blank" 
//                 rel="noopener noreferrer" 
//                 className="text-gray-400 hover:text-blue-400 transition-all hover:scale-110 text-2xl"
//               >
//                 <FaFacebookF />
//               </a>
//               <a 
//                 href="https://twitter.com" 
//                 target="_blank" 
//                 rel="noopener noreferrer" 
//                 className="text-gray-400 hover:text-blue-400 transition-all hover:scale-110 text-2xl"
//               >
//                 <FaTwitter />
//               </a>
//               <a 
//                 href="https://instagram.com" 
//                 target="_blank" 
//                 rel="noopener noreferrer" 
//                 className="text-gray-400 hover:text-pink-400 transition-all hover:scale-110 text-2xl"
//               >
//                 <FaInstagram />
//               </a>
//               <a 
//                 href="https://linkedin.com" 
//                 target="_blank" 
//                 rel="noopener noreferrer" 
//                 className="text-gray-400 hover:text-blue-400 transition-all hover:scale-110 text-2xl"
//               >
//                 <FaLinkedinIn />
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* ── TRUST BADGES + WEBSITE TEMPLATE SECTION ── */}
//        <div className="mt-14 pt-10 border-t border-gray-800">
//           <div className="flex flex-col md:flex-row items-center justify-between gap-8">

//             {/* Trust Badges */}
//             <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">

//               {/* Digital India */}
//               <div className="flex items-center gap-3 bg-gray-900 border border-gray-700 rounded-xl px-5 py-3.5">
//                 <div className="w-10 h-10 rounded-full bg-[#FF9933] flex items-center justify-center flex-shrink-0">
//                   <span className="text-white text-base font-bold">🇮🇳</span>
//                 </div>
//                 <div>
//                   <p className="text-white text-sm font-semibold leading-none">Digital India</p>
//                   <p className="text-gray-500 text-xs mt-1">Govt. of India Initiative</p>
//                 </div>
//               </div>

//               {/* SSL Secured */}
//               <div className="flex items-center gap-3 bg-gray-900 border border-gray-700 rounded-xl px-5 py-3.5">
//                 <FaLock className="text-green-400 text-2xl flex-shrink-0" />
//                 <div>
//                   <p className="text-white text-sm font-semibold leading-none">SSL Secured</p>
//                   <p className="text-gray-500 text-xs mt-1">256-bit Encryption</p>
//                 </div>
//               </div>

//               {/* Verified Sellers */}
//               <div className="flex items-center gap-3 bg-gray-900 border border-gray-700 rounded-xl px-5 py-3.5">
//                 <FaCheckCircle className="text-blue-400 text-2xl flex-shrink-0" />
//                 <div>
//                   <p className="text-white text-sm font-semibold leading-none">Verified Sellers</p>
//                   <p className="text-gray-500 text-xs mt-1">100% Trusted Suppliers</p>
//                 </div>
//               </div>

//               {/* Safe Payments */}
//               <div className="flex items-center gap-3 bg-gray-900 border border-gray-700 rounded-xl px-5 py-3.5">
//                 <FaShieldAlt className="text-orange-400 text-2xl flex-shrink-0" />
//                 <div>
//                   <p className="text-white text-sm font-semibold leading-none">Safe Payments</p>
//                   <p className="text-gray-500 text-xs mt-1">Secured by Razorpay</p>
//                 </div>
//               </div>

//             </div>

//             {/* Website Template Button */}
//             <a
//               href="https://template-vert-eta.vercel.app/"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white text-sm font-semibold px-5 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg whitespace-nowrap"
//             >
//               <FaGlobe className="text-white text-base" />
//               View LPI-Website Template
//             </a>

//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="mt-10 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
//           <p>© {new Date().getFullYear()} LPI-B2B Marketplace. All rights reserved.</p>
//           <p className="mt-2">
//             Designed & Developed by{' '}
//             <a 
//               href="https://www.legalpapersindia.com/" 
//               target="_blank" 
//               rel="noopener noreferrer"
//               className="text-orange-400 hover:text-orange-300 transition-colors"
//             >
//               Legal Papers India
//             </a>
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;




// src/Component/Footer.jsx
import React, { useEffect, useState } from 'react';
import {
  FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn,
  FaEnvelope, FaPhoneAlt, FaShieldAlt, FaLock,
  FaCheckCircle, FaGlobe,
} from 'react-icons/fa';
import { getFooterSettings } from '../api/footerSettingsApi';

const Footer = () => {
  const [footer, setFooter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const res = await getFooterSettings();
        if (res.data) setFooter(res.data);
      } catch (err) {
        console.error("Footer fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFooter();
  }, []);

  const categories = [
    { name: 'Medicine & Pharma', href: '/category/medicine-pharma' },
    { name: 'Industrial Machinery', href: '/category/industrial-machinery' },
    { name: 'Cosmetics & Beauty', href: '/category/cosmetics-beauty' },
    { name: 'Electronics & Electricals', href: '/category/electronics' },
    { name: 'Food & Agriculture', href: '/category/food-agriculture' },
    { name: 'Apparel, Fashion & Textile', href: '/category/apparel-fashion-textile' },
  ];

  const companyLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Blog', href: '/blog' },
    { name: 'Become a Seller', href: '/become-seller' },
    { name: 'Help Center', href: '/help' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Refund & Return Policy', href: '/refund' },
  ];

  if (loading) {
    return (
      <footer className="bg-gray-950 text-gray-300">
        <div className="max-w-7xl mx-auto px-6 py-16 flex justify-center">
          <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">

        {/* MAIN GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">

          {/* ── LOGO & DESCRIPTION ── */}
          <div className="col-span-2 sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-orange-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-2xl sm:text-3xl">B</span>
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent tracking-tighter">
                LPI-B2B
              </div>
            </div>

            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              {footer?.description}
            </p>

            <div className="flex items-center gap-5">
              {footer?.phone && (
                <a
                  href={`tel:${footer.phone}`}
                  className="text-gray-400 hover:text-orange-400 transition-colors text-xl"
                >
                  <FaPhoneAlt />
                </a>
              )}
              {footer?.email && (
                <a
                  href={`mailto:${footer.email}`}
                  className="text-gray-400 hover:text-orange-400 transition-colors text-xl"
                >
                  <FaEnvelope />
                </a>
              )}
            </div>
          </div>

          {/* ── CATEGORIES ── */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold text-base sm:text-lg mb-4 sm:mb-6">
              Popular Categories
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              {categories.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-400 hover:text-orange-400 hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── COMPANY ── */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold text-base sm:text-lg mb-4 sm:mb-6">
              Company
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              {companyLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-400 hover:text-orange-400 hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── LEGAL & SOCIAL ── */}
          <div className="col-span-2 sm:col-span-2 md:col-span-1">
            <h3 className="text-white font-semibold text-base sm:text-lg mb-4 sm:mb-6">
              Legal
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm mb-8">
              {legalLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-400 hover:text-orange-400 hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>

            <h3 className="text-white font-semibold text-base sm:text-lg mb-3 sm:mb-4">
              Follow Us
            </h3>
            <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
              {footer?.facebook && (
                <a href={footer.facebook} target="_blank" rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-all hover:scale-110 text-xl">
                  <FaFacebookF />
                </a>
              )}
              {footer?.twitter && (
                <a href={footer.twitter} target="_blank" rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-all hover:scale-110 text-xl">
                  <FaTwitter />
                </a>
              )}
              {footer?.instagram && (
                <a href={footer.instagram} target="_blank" rel="noopener noreferrer"
                  className="text-gray-400 hover:text-pink-400 transition-all hover:scale-110 text-xl">
                  <FaInstagram />
                </a>
              )}
              {footer?.linkedin && (
                <a href={footer.linkedin} target="_blank" rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-all hover:scale-110 text-xl">
                  <FaLinkedinIn />
                </a>
              )}
            </div>
          </div>

        </div>

        {/* ── TRUST BADGES + TEMPLATE BUTTON ── */}
        <div className="mt-10 sm:mt-14 pt-8 sm:pt-10 border-t border-gray-800">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            {/* TRUST BADGES */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-3 sm:gap-4">

              {/* Digital India */}
              <div className="flex items-center gap-2 sm:gap-3 bg-gray-900 border border-gray-700 rounded-xl px-3 sm:px-5 py-2.5 sm:py-3.5">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#FF9933] flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm sm:text-base font-bold">🇮🇳</span>
                </div>
                <div>
                  <p className="text-white text-xs sm:text-sm font-semibold leading-none">Digital India</p>
                  <p className="text-gray-500 text-[10px] sm:text-xs mt-1">Govt. of India Initiative</p>
                </div>
              </div>

              {/* SSL Secured */}
              <div className="flex items-center gap-2 sm:gap-3 bg-gray-900 border border-gray-700 rounded-xl px-3 sm:px-5 py-2.5 sm:py-3.5">
                <FaLock className="text-green-400 text-lg sm:text-2xl flex-shrink-0" />
                <div>
                  <p className="text-white text-xs sm:text-sm font-semibold leading-none">SSL Secured</p>
                  <p className="text-gray-500 text-[10px] sm:text-xs mt-1">256-bit Encryption</p>
                </div>
              </div>

              {/* Verified Sellers */}
              <div className="flex items-center gap-2 sm:gap-3 bg-gray-900 border border-gray-700 rounded-xl px-3 sm:px-5 py-2.5 sm:py-3.5">
                <FaCheckCircle className="text-blue-400 text-lg sm:text-2xl flex-shrink-0" />
                <div>
                  <p className="text-white text-xs sm:text-sm font-semibold leading-none">Verified Sellers</p>
                  <p className="text-gray-500 text-[10px] sm:text-xs mt-1">100% Trusted Suppliers</p>
                </div>
              </div>

              {/* Safe Payments */}
              <div className="flex items-center gap-2 sm:gap-3 bg-gray-900 border border-gray-700 rounded-xl px-3 sm:px-5 py-2.5 sm:py-3.5">
                <FaShieldAlt className="text-orange-400 text-lg sm:text-2xl flex-shrink-0" />
                <div>
                  <p className="text-white text-xs sm:text-sm font-semibold leading-none">Safe Payments</p>
                  <p className="text-gray-500 text-[10px] sm:text-xs mt-1">Secured by Razorpay</p>
                </div>
              </div>

            </div>

            {/* TEMPLATE BUTTON */}
            {footer?.templateBtnLink && (
              <a
                href={footer.templateBtnLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white text-sm font-semibold px-5 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg whitespace-nowrap w-full sm:w-auto"
              >
                <FaGlobe className="text-white text-base" />
                {footer.templateBtnText}
              </a>
            )}

          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-gray-800 text-center text-xs sm:text-sm text-gray-500">
          <p>© {new Date().getFullYear()} {footer?.copyrightText}</p>
          <p className="mt-2">
            Designed & Developed by{' '}
            <a
              href={footer?.developerLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-orange-300 transition-colors"
            >
              {footer?.developerName}
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;