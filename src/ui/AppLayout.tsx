import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useAuth } from "../contexts/AuthProvider";
import { useEffect } from "react";

const AppLayout = () => {
  const { checkAuthStatus } = useAuth();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <section className="h-screen overflow-hidden bg-gray-50">
      {/* Mobile-first responsive layout */}
      <div className="flex md:grid md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] h-full">
        {/* Sidebar - hidden on mobile, visible on md+ */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Main content area */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto bg-gray-50">
            <div className="w-full max-w-none px-3 py-3 sm:px-4 sm:py-4 md:max-w-7xl md:mx-auto md:px-6 md:py-6 lg:px-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default AppLayout;
