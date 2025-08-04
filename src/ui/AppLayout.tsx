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
    <section className="grid md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] grid-rows-[auto_1fr] h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </section>
  );
};

export default AppLayout;
