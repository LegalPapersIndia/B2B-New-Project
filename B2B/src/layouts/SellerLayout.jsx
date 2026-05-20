import SellerNavbar from "../components/seller/SellerNavbar";
import SellerSidebar from "../components/seller/SellerSidebar";
import SellerFooter from "../components/seller/SellerFooter";
import { Outlet } from "react-router-dom";

const SellerLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      <SellerNavbar />

      <div className="flex flex-1">
        <SellerSidebar />

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      <SellerFooter />
    </div>
  );
};

export default SellerLayout;