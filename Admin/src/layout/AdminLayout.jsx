import Sidebar from "../components/admin/Sidebar";
import Navbar from "../components/admin/Navbar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-[#0A0A0F]">

      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">

        {/* Top Navbar (YOUR EXISTING COMPONENT) */}
        <Navbar setIsOpen={setIsOpen} />

        {/* Page Content */}
        <div>
          <Outlet />
        </div>

      </div>
    </div>
  );
}