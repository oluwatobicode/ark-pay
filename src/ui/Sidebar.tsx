import { BiCategory, BiLogOut, BiWalletAlt } from "react-icons/bi";
import { GrTransaction } from "react-icons/gr";
import { NavLink } from "react-router";
import { FiSettings } from "react-icons/fi";

const Sidebar = () => {
  return (
    <aside className="h-full bg-white row-span-full">
      <div className="flex h-screen flex-col px-[2rem] py-[2rem] w-[305.27px] shadow-md">
        <img src="/ArkPay.png" className="w-[150px]" alt="Cuddle-me-logo" />

        <div className="mt-[3rem] h-[1200px]">
          <ul className="flex flex-col gap-5 mt-2">
            <li className="text-[16.83px] leading-[22.72px] font-normal">
              <NavLink
                to="/dashboard"
                className={`${({ isActive }) =>
                  isActive
                    ? "active"
                    : ""}} flex items-center gap-[5px] font-fontThree pl-3`}
              >
                <BiCategory size={20} />
                <span> Dashboard</span>
              </NavLink>
            </li>
            <li className="text-[16.83px] leading-[22.72px] font-normal font-fontThree">
              <NavLink
                to="/transactions"
                className={`${({ isActive }) =>
                  isActive
                    ? "active"
                    : ""}} flex items-center gap-[5px] font-fontThree pl-3`}
              >
                <GrTransaction />
                <span>Transactions</span>
              </NavLink>
            </li>
            <li className="text-[16.83px] leading-[22.72px] font-normal font-fontThree">
              <NavLink
                to="/documentation"
                className={`${({ isActive }) =>
                  isActive
                    ? "active"
                    : ""}} flex items-center gap-[5px] font-fontThree pl-3`}
              >
                <BiWalletAlt />
                <span>Documentation</span>
              </NavLink>
            </li>
            <li className="text-[16.83px] leading-[22.72px] font-normal font-fontThree">
              <NavLink
                to="/settings"
                className={`${({ isActive }) =>
                  isActive
                    ? "active"
                    : ""}} flex items-center gap-[5px] font-fontThree pl-3`}
              >
                <FiSettings />
                <span>Settings</span>
              </NavLink>
            </li>

            <li className="text-[16.83px] leading-[22.72px] font-normal text-[#EB4E4E] mt-[250px]">
              <NavLink
                to="/"
                className="flex items-center gap-[5px] font-fontThree pl-3"
              >
                <BiLogOut color="#EB4E4E" />
                <span>Logout</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
