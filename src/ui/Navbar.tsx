import { BiBell, BiSearch } from "react-icons/bi";
import { NavLink } from "react-router";
import { useAuth } from "../contexts/AuthProvider";

const Navbar = () => {
  const { state } = useAuth();
  const user = state?.userData;

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
      <nav className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>

        {/* Search - Hidden on mobile, visible on larger screens */}
        <div className="hidden md:block relative">
          <BiSearch
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search by ID, product, or others..."
            className="w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-center gap-4">
          {/* Mobile search button */}
          <button className="md:hidden p-2 text-gray-400 hover:text-gray-600">
            <BiSearch size={20} />
          </button>

          {/* Notification */}
          <button className="p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <BiBell size={20} className="text-blue-900" />
          </button>

          {/* User Profile */}
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
    </header>
  );
};

export default Navbar;
