import { useAuth } from "../../contexts/AuthProvider";
import AreaCharts from "../charts/AreaCharts";

const Metrics = () => {
  const { state } = useAuth();
  const { apiUsage } = state.userData?.user || {};

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex flex-col gap-[24px]">
        <h1 className="text-[24px] font-semibold leading-[100%]">Metrics</h1>
        <div className="bg-[#EDEDED] w-full h-[51px] rounded-[6px] cursor-pointer px-3 py-4">
          <p className="text-[16px] leading-[100%] font-normal">
            {`Total Api Calls: ${apiUsage?.totalCalls}`}
          </p>
        </div>
      </div>

      <AreaCharts />
    </div>
  );
};

export default Metrics;
