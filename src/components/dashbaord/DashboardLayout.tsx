import toast from "react-hot-toast";
import { useUserData } from "../../contexts/UserDataProvider";
import DashBoardCards from "./DashboardCards";
import DashboardTransaction from "./DashboardTransaction";
import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthProvider";

const DashboardLayout = () => {
  // const {
  //   state: userData,
  //   getMetrics,
  //   getRecentTransactions,
  //   clearError,
  // } = useUserData();
  // const { state: authState } = useAuth();

  // useEffect(() => {
  //   getMetrics();
  // }, []);

  return (
    <div className="px-[2rem] pt-[1rem]">
      <div className="flex flex-row it justify-between">
        <div className="">
          <DashBoardCards />
        </div>
      </div>

      <div className="mt-[50px]">
        <DashboardTransaction />
      </div>
    </div>
  );
};

export default DashboardLayout;
