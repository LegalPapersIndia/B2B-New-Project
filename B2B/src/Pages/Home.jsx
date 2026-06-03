// src/pages/Home.jsx

// import React from "react";
// import HeroCarousel from "../Components/HeroCarousel";

// const Home = () => {
//   return (
//     <div className="w-full bg-white">
//       {/* HERO SECTION */}
//       <HeroCarousel />

//       {/* FUTURE SECTIONS PLACEHOLDER */}
//       <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
//         <h2 className="text-2xl font-bold text-black">
//           Featured Categories (Coming Soon)
//         </h2>

//         <p className="text-gray-500 mt-2">
//           We will add categories, products and suppliers here.
//         </p>
//       </section>
//     </div>
//   );
// };

// export default Home;








// // src/Pages/Home.jsx
// import React, { useState } from 'react';

// import HeroCarousel from '../Components/HeroCarousel';
// import Sidebar from '../Components/SideBar';
// import ActionSidebar from '../Components/ActionSide';
// // import CategoryShowcase from '../Component/CategoryShowcase';
// // import ManufacturingHubsCarousel from '../Component/ManufacturingHubsCarousel';
// // import AllCompanies from '../Component/AllCompanies';
// // import PromoCard from '../Component/PromoCard';
// // import BuyerPromoCard from '../Component/BuyerPromoCard';
// // import Testimonials from '../Component/Testimonials';

// export default function Home() {
//   const [showBuyForm, setShowBuyForm] = useState(false);

//   return (
//     <div className="min-h-screen bg-gray-50">
      
//       {/* Main Home Content */}
//       {!showBuyForm && (
//         <>
//           {/* Hero + Sidebars Layout */}
//           <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8 pt-6">
//             <div className="relative flex flex-col lg:flex-row gap-6 xl:gap-8">
              
//               {/* Left Sidebar - Categories */}
//               <aside className="hidden lg:block lg:w-72 xl:w-80 shrink-0">
//                 <div className="sticky top-6">
//                   <Sidebar />
//                 </div>
//               </aside>
//               <div className="flex-1 min-w-0">
//                 <HeroCarousel />
//               </div>
//               <aside className="hidden xl:block xl:w-80 shrink-0">
//                 <div className="sticky top-6">
//                   <ActionSidebar 
//                     onWantToBuyClick={() => setShowBuyForm(true)} 
//                   />
//                 </div>
//               </aside>
//             </div>
//           </div>

//           {/* Below-the-fold Sections */}
//           {/* <div className="space-y-20 mt-12">
//             <CategoryShowcase />
//             <ManufacturingHubsCarousel />
//             <AllCompanies />
//             <PromoCard />
//             <BuyerPromoCard />
//             <Testimonials />
//           </div> */}
//         </>
//       )}

//       {/* Full Screen "I Want to Buy" Form */}
//       {showBuyForm && (
//         <ActionSidebar 
//           isFullScreen={true} 
//           onClose={() => setShowBuyForm(false)} 
//         />
//       )}

//     </div>
//   );
// }




// // src/pages/Home.jsx

// import React, { useState } from "react";

// import HeroCarousel from "../components/Home/HeroCarousel";
// import Sidebar from "../components/Home/SideBar";
// import ActionSidebar from "../components/Home/ActionSide";

// // Optional sections (you can enable later)
// import CategoryShowcase from "../components/Home/CategoryShowcase";
// // import TopCategories from "../components/TopCategories";
// import FeaturedProducts from "../components/Home/FeaturedProducts";
// import TrustedSuppliers from "../components/Home/TrustedSuppliers";
// import ManufacturingHubs from "../components/Home/ManufacturingHubs";
// import HowItWorks from "../components/Home/HowItWorks";
// import WhyChooseUs from "../components/Home/WhyChooseUs";
// import LatestBuyRequirements from "../components/Home/LatestBuyRequirements";
// import MarketplaceStats from "../components/Home/MarketplaceStats";
// import Testimonials from "../components/Home/Testimonials";
// import CTASection from "../components/Home/CTASection";


// export default function Home() {
//   const [showBuyForm, setShowBuyForm] = useState(false);

//   return (
//     <div className="min-h-screen bg-gray-50">

//       {/* MAIN CONTENT */}
//       {!showBuyForm && (
//         <>
//           {/* HERO SECTION LAYOUT */}
//           <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8 pt-6">

//             <div className="relative flex flex-col lg:flex-row gap-6 xl:gap-8">

//               {/* LEFT SIDEBAR */}
//               <aside className="hidden lg:block lg:w-72 xl:w-80 shrink-0">
//                 <div className="sticky top-6">
//                   <Sidebar />
//                 </div>
//               </aside>

//               {/* HERO */}
//               <div className="flex-1 min-w-0">
//                 <HeroCarousel />
//               </div>

//               {/* RIGHT SIDEBAR */}
//               <aside className="hidden xl:block xl:w-80 shrink-0">
//                 <div className="sticky top-6">
//                   <ActionSidebar
//                     onWantToBuyClick={() => setShowBuyForm(true)}
//                   />
//                 </div>
//               </aside>

//             </div>
//           </div>

//           {/* BELOW HERO SECTIONS */}
//           <div className="space-y-20 mt-12">

//             <CategoryShowcase />
//             {/* <TopCategories/> */}
//             <FeaturedProducts/>
//             <TrustedSuppliers />
//             <ManufacturingHubs />
//             <HowItWorks />
//             <WhyChooseUs />
//             <LatestBuyRequirements />
//               <MarketplaceStats />
//               <Testimonials/>
//               <CTASection />
    

//           </div>
//         </>
//       )}

//       {/* FULL SCREEN BUY FORM */}
//       {showBuyForm && (
//         <ActionSidebar
//           isFullScreen={true}
//           onClose={() => setShowBuyForm(false)}
//         />
//       )}

//     </div>
//   );
// }




// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import HeroCarousel from "../components/Home/HeroCarousel";
import Sidebar from "../components/Home/SideBar";
import ActionSidebar from "../components/Home/ActionSide";
import CategoryShowcase from "../components/Home/CategoryShowcase";
import FeaturedProducts from "../components/Home/FeaturedProducts";
import TrustedSuppliers from "../components/Home/TrustedSuppliers";
import ManufacturingHubs from "../components/Home/ManufacturingHubs";
import HowItWorks from "../components/Home/HowItWorks";
import WhyChooseUs from "../components/Home/WhyChooseUs";
import LatestBuyRequirements from "../components/Home/LatestBuyRequirements";
import MarketplaceStats from "../components/Home/MarketplaceStats";
import Testimonials from "../components/Home/Testimonials";
import CTASection from "../components/Home/CTASection";
import PostRequirementModal from "../components/common/PostRequirementModal";  // ← ADD

export default function Home() {
  const [showRequirement, setShowRequirement] = useState(false);

  useEffect(() => {
  const timer = setTimeout(() => {
    setShowRequirement(true);
  }, 1000);
  return () => clearTimeout(timer);
}, []);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO SECTION LAYOUT */}
      <div className="mx-auto max-w-[1520px] px-4 sm:px-6 lg:px-8 pt-6">
        <div className="relative flex flex-col lg:flex-row gap-6 xl:gap-8">

          {/* LEFT SIDEBAR */}
          <aside className="hidden lg:block lg:w-72 xl:w-80 shrink-0">
            <div className="sticky top-6">
              <Sidebar />
            </div>
          </aside>

          {/* HERO */}
          <div className="flex-1 min-w-0">
            <HeroCarousel />
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="hidden xl:block xl:w-80 shrink-0">
            <div className="sticky top-6">
              <ActionSidebar />
            </div>
          </aside>

        </div>
      </div>

      {/* BELOW HERO SECTIONS */}
      <div className="space-y-20 mt-12">
        <CategoryShowcase />
        <FeaturedProducts />
        <TrustedSuppliers />
        <ManufacturingHubs />
        <HowItWorks />
        <WhyChooseUs />
        <LatestBuyRequirements />
        <MarketplaceStats />
        <Testimonials />
        <CTASection />
      </div>
  <PostRequirementModal                                         
        isOpen={showRequirement}
        onClose={() => setShowRequirement(false)}
      />

    </div>
  );
}