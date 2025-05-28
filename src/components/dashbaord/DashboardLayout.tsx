import DashBoardCards from "./DashboardCards";
import DashboardTransaction from "./DashboardTransaction";

const DashboardLayout = () => {
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
