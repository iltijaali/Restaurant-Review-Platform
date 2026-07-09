import { Outlet } from "react-router-dom";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-stone-50 via-white to-amber-50">
      <Navbar />

      <main className="container mx-auto flex-1 px-4 py-8 sm:px-6 lg:py-10">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default PublicLayout;
