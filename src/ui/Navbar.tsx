import { BiBell, BiSearch } from "react-icons/bi";
import { NavLink } from "react-router";
import { useAuth } from "../contexts/AuthProvider";

const Navbar = () => {
  const { state } = useAuth();
  const user = state?.userData;

  return (
    <div className="px-[2.5rem] py-[1rem] w-full bg-white shadow-sm">
      <nav className="flex flex-row items-center justify-between ">
        <h1 className="text-[20px] font-bold leading-[45px]">Dashboard</h1>

        <div className="relative">
          <BiSearch
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            name=""
            placeholder="Search by ID, product, or others..."
            id=""
            className="w-[352.38px] text-[12.53px] pl-10 pr-3 py-2 border border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-[25px] items-center justify-end">
          <button className="flex items-center justify-center bg-[#F7F8F7] p-2 rounded-[11.64px]">
            <BiBell size="20" color="#382BB8" />
          </button>
          <NavLink
            to="/user"
            className="bg-[#F7F8F7] px-3 py-1 rounded-[11.64px] flex items-center gap-[15px]"
          >
            <div className="w-[30px] h-[30px] rounded-full bg-[#D9D9D9]"></div>
            <div className="">
              <h1 className="text-[13px] leading-[20.47px] font-semibold">
                {`${user?.user.firstName} ${user?.user.lastName}` ||
                  "User Name"}
              </h1>
              <p className="text-[12px]">Administrator</p>
            </div>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
