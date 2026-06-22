
// // src/Component/Footer.jsx
// import React from 'react';
// import { 
//   FaFacebookF, 
//   FaTwitter, 
//   FaInstagram, 
//   FaLinkedinIn, 
//   FaEnvelope, 
//   FaPhoneAlt 
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

//         {/* Bottom Bar */}
//         <div className="mt-16 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
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
import React from 'react';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn, 
  FaEnvelope, 
  FaPhoneAlt,
  FaShieldAlt,
  FaLock,
  FaCheckCircle,
  FaGlobe,
} from 'react-icons/fa';

const Footer = () => {
  const categories = [
    { name: 'Medicine & Pharma', href: '/category/medicine-pharma' },
    { name: 'Industrial Machinery', href: '/category/industrial-machinery' },
    { name: 'Cosmetics & Beauty', href: '/category/cosmetics-beauty' },
    { name: 'Electronics & Electricals', href: '/category/electronics' },
    { name: 'Food & Agriculture', href: '/category/foodi-agriculture' },
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

  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12">
          
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-orange-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-3xl">B</span>
              </div>
              <div className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent tracking-tighter">
                LPI-B2B
              </div>
            </div>

            <p className="text-gray-400 mb-8 text-[15px] leading-relaxed">
              Connecting global buyers and verified suppliers through a trusted B2B marketplace. 
              Quality products, transparent trade, and seamless sourcing experience.
            </p>
            
            <div className="flex items-center gap-6">
              <a 
                href="tel:+917505266931" 
                className="text-gray-400 hover:text-orange-400 transition-colors text-2xl"
              >
                <FaPhoneAlt />
              </a>
              <a 
                href="mailto:support@yourb2b.com" 
                className="text-gray-400 hover:text-orange-400 transition-colors text-2xl"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Popular Categories</h3>
            <ul className="space-y-3 text-sm">
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

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Company</h3>
            <ul className="space-y-3 text-sm">
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

          {/* Legal & Social */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Legal</h3>
            <ul className="space-y-3 text-sm mb-10">
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

            <h3 className="text-white font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex items-center gap-6">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-blue-400 transition-all hover:scale-110 text-2xl"
              >
                <FaFacebookF />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-blue-400 transition-all hover:scale-110 text-2xl"
              >
                <FaTwitter />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-pink-400 transition-all hover:scale-110 text-2xl"
              >
                <FaInstagram />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-blue-400 transition-all hover:scale-110 text-2xl"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* ── TRUST BADGES + WEBSITE TEMPLATE SECTION ── */}
        <div className="mt-14 pt-10 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">

              {/* Digital India */}
              <div className="flex items-center gap-2 bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5">
                <div className="w-7 h-7 rounded-full bg-[#FF9933] flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-[10px] font-bold">🇮🇳</span>
                </div>
                <div>
                  <p className="text-white text-xs font-semibold leading-none">Digital India</p>
                  <p className="text-gray-500 text-[10px] mt-0.5">Govt. of India Initiative</p>
                </div>
              </div>

              {/* SSL Secured */}
              <div className="flex items-center gap-2 bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5">
                <FaLock className="text-green-400 text-lg flex-shrink-0" />
                <div>
                  <p className="text-white text-xs font-semibold leading-none">SSL Secured</p>
                  <p className="text-gray-500 text-[10px] mt-0.5">256-bit Encryption</p>
                </div>
              </div>

              {/* Verified Sellers */}
              <div className="flex items-center gap-2 bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5">
                <FaCheckCircle className="text-blue-400 text-lg flex-shrink-0" />
                <div>
                  <p className="text-white text-xs font-semibold leading-none">Verified Sellers</p>
                  <p className="text-gray-500 text-[10px] mt-0.5">100% Trusted Suppliers</p>
                </div>
              </div>

              {/* Safe Payments */}
              <div className="flex items-center gap-2 bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5">
                <FaShieldAlt className="text-orange-400 text-lg flex-shrink-0" />
                <div>
                  <p className="text-white text-xs font-semibold leading-none">Safe Payments</p>
                  <p className="text-gray-500 text-[10px] mt-0.5">Secured by Razorpay</p>
                </div>
              </div>

            </div>

            {/* Website Template Button */}
            <a
              href="https://template-vert-eta.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white text-sm font-semibold px-5 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg whitespace-nowrap"
            >
              <FaGlobe className="text-white text-base" />
              View LPI-Website Template
            </a>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} LPI-B2B Marketplace. All rights reserved.</p>
          <p className="mt-2">
            Designed & Developed by{' '}
            <a 
              href="https://www.legalpapersindia.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-orange-300 transition-colors"
            >
              Legal Papers India
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;