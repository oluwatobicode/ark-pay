import { useState } from "react";

import { BiBell, BiSearch } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { CiUser } from "react-icons/ci";

import { NavLink } from "react-router";
import { useAuth } from "../contexts/AuthProvider";

const Navbar = () => {
  const { state } = useAuth();
  const user = state?.userData;

  const [showMenu, setShowMenu] = useState<Boolean>(false);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  const navigationItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Transactions", path: "/transactions" },
    { name: "Documentations", path: "https://arkade-base.gitbook.io/arkpay" },
    { name: "Settings", path: "/settings" },
    { name: "Logout", path: "/login" },
  ];

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
      <nav className="hidden md:flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>

        <div className="hidden md:block relative">
          <BiSearch
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            disabled={true}
            placeholder="Search by ID, product, or others..."
            className="w-80 pl-10 pr-4 py-2 cursor-not-allowed border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="md:hidden p-2 text-gray-400 hover:text-gray-600">
            <BiSearch size={20} />
          </button>

          <button className="p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <BiBell size={20} className="text-blue-900" />
          </button>

          <NavLink
            to="/user"
            className="flex items-center gap-3 bg-gray-50 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0"></div>
            <div className="hidden sm:block text-left">
              <h3 className="text-sm font-semibold text-gray-900">
                {`${user?.user?.firstName} ${user?.user?.lastName}` ||
                  "User Name"}
              </h3>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </NavLink>
        </div>
      </nav>

      <nav className="flex md:hidden items-center justify-between relative">
        <button onClick={handleMenuClick} className="">
          {showMenu ? <IoMdClose /> : <IoMenu size={30} />}
        </button>

        {showMenu && (
          <div className="absolute top-16 left-4 right-4 z-50 bg-white rounded-md shadow-lg border border-gray-200">
            <div className="py-2">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={handleMenuClick}
                  className={({ isActive }) =>
                    `block px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
        )}

        <div className="">
          <img src="/ArkPay.png" className="w-[142px]" alt="nav-logo" />
        </div>

        <NavLink
          to="/user"
          className="flex items-center gap-3  hover:bg-gray-100 transition-colors"
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#020267] flex-shrink-0">
            <CiUser color="#fff" size={20} width={130} />
          </div>
          <div className="hidden sm:block text-left"></div>
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
