import { BiCategory, BiLogOut, BiWalletAlt } from "react-icons/bi";
import { GrTransaction } from "react-icons/gr";
import { NavLink, useNavigate } from "react-router";
import { FiSettings } from "react-icons/fi";
import Modal from "./Modal";
import { IoExit } from "react-icons/io5";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <Modal>
      <aside className="h-full bg-white row-span-full">
        <div className="flex h-screen flex-col px-[2rem] py-[2rem] w-[305.27px] shadow-md">
          <img
            src="/ArkPay.png"
            className="w-[150px] cursor-pointer"
            alt="Cuddle-me-logo"
            onClick={() => (window.location.href = "/dashboard")}
          />

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

              <Modal.Open opens="open">
                <li className="text-[16.83px] leading-[22.72px] font-normal text-[#EB4E4E] mt-[250px]">
                  <button className="flex items-center gap-[5px] font-fontThree pl-3 cursor-pointer">
                    <BiLogOut color="#EB4E4E" />
                    <span>Logout</span>
                  </button>
                </li>
              </Modal.Open>

              <Modal.Window name="open">
                <div className="flex flex-col items-center justify-center">
                  <div className="flex items-center justify-center">
                    <IoExit size="120px" color="#020267" />
                  </div>

                  <p className="leading-[100%] text-[21.24px] text-center font-medium w-[243px]">
                    Oh no! You’re leaving... Are you sure?
                  </p>

                  <div className="flex flex-col gap-[13.22px]">
                    <button
                      className="w-[317px] h-[54.63px] bg-[#020267] text-[#fff] rounded-[6.79px] cursor-pointer mt-5"
                      onClick={() => navigate("/dashboard")}
                    >
                      Nah, just kidding
                    </button>

                    <button
                      className="w-[317px] h-[54.63px] border-2 border-[#020267] text-[#020267] rounded-[6.79px] cursor-pointer"
                      onClick={() => navigate("/login")}
                    >
                      Yes, log me out
                    </button>
                  </div>
                </div>
              </Modal.Window>
            </ul>
          </div>
        </div>
      </aside>
    </Modal>
  );
};

export default Sidebar;
