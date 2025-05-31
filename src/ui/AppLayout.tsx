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
    <section className="grid grid-cols-[19.1rem_1fr] grid-rows-[auto_1fr] h-screen">
      <Sidebar />
      <Navbar />
      <main className="pb-24 overflow-y-auto">
        <div className="max-w-[120rem] mx-auto flex flex-col gap-8">
          <Outlet />
        </div>
      </main>
    </section>
  );
};

export default AppLayout;
