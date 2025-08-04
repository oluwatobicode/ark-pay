import Modal from "./Modal";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthProvider";
import { IoExit } from "react-icons/io5";
import { FiSettings } from "react-icons/fi";
import { GrTransaction } from "react-icons/gr";
import { BiCategory, BiLogOut, BiWalletAlt } from "react-icons/bi";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      logout();
    } catch (error) {}
    navigate("/login");
  };

  return (
    <Modal>
      <aside className="h-full bg-white border-r border-gray-200 md:flex flex-col hidden">
        <div className="flex flex-col h-full px-4 py-6">
          {/* Logo */}
          <div className="flex-shrink-0 mb-8">
            <img
              src="/ArkPay.png"
              className="w-32 lg:w-36 cursor-pointer"
              alt="ArkPay Logo"
              onClick={() => (window.location.href = "/dashboard")}
            />
          </div>

          {/* Navigation */}
          <nav className="flex-1">
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[#020267] text-white"
                        : "text-gray-700 hover:bg-gray-50"
                    }`
                  }
                >
                  <BiCategory size={20} />
                  <span>Dashboard</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/transactions"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[#020267] text-white"
                        : "text-gray-700 hover:bg-gray-50"
                    }`
                  }
                >
                  <GrTransaction size={20} />
                  <span>Transactions</span>
                </NavLink>
              </li>

              <li>
                <a
                  href="https://arkade-base.gitbook.io/arkpay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <BiWalletAlt size={20} />
                  <span>Documentation</span>
                </a>
              </li>

              <li>
                <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[#020267] text-white"
                        : "text-gray-700 hover:bg-gray-50"
                    }`
                  }
                >
                  <FiSettings size={20} />
                  <span>Settings</span>
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="flex-shrink-0 mt-auto pt-4 border-t border-gray-200">
            <Modal.Open opens="open">
              <button className="w-full  cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                <BiLogOut size={20} />
                <span>Logout</span>
              </button>
            </Modal.Open>
          </div>

          <Modal.Window name="open">
            <div className="flex flex-col items-center justify-center p-6">
              <div className="flex items-center justify-center mb-4">
                <IoExit size={80} className="text-[#020267]" />
              </div>

              <p className="text-lg font-medium text-center text-gray-900 mb-6 max-w-xs">
                Oh no! You're leaving... Are you sure?
              </p>

              <div className="flex flex-col gap-3 w-full max-w-sm">
                <button
                  className="w-full py-3 bg-[#020267] cursor-pointer text-white rounded-lg font-medium transition-colors"
                  onClick={() => navigate("/dashboard")}
                >
                  Nah, just kidding
                </button>

                <button
                  className="w-full py-3 border-2 cursor-pointer bg-transparent border-[#020267] text-blue-900 rounded-lg font-medium hover:bg-[#020267] transition-colors"
                  onClick={handleLogout}
                >
                  Yes, log me out
                </button>
              </div>
            </div>
          </Modal.Window>
        </div>
      </aside>
    </Modal>
  );
};

export default Sidebar;
