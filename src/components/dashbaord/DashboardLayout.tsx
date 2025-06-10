import DashBoardCards from "./DashboardCards";
import DashboardTransaction from "./DashboardTransaction";

const DashboardLayout = () => {
  return (
    <div className="space-y-8">
      <div>
        <DashBoardCards />
      </div>

      <div>
        <DashboardTransaction />
      </div>
    </div>
  );
};

export default DashboardLayout;
