import { FaPeopleGroup } from "react-icons/fa6";
import { GrTransaction } from "react-icons/gr";
import { useUserData } from "../../contexts/UserDataProvider";
import { useEffect } from "react";

const DashBoardCards = () => {
  const { state: userData, getMetrics, getRecentTransactions } = useUserData();

  useEffect(() => {
    getMetrics();
    getRecentTransactions();
  }, []);

  const totalTransactions = userData.metrics?.totalTransactions || 0;
  const totalAmountProcessed = userData.metrics?.totalAmountProcessed || 0;
  const completedPayouts = userData.metrics?.completedPayouts || 0;

  return (
    <section className="flex flex-col md:flex-row items-center justify-start gap-[25px]">
      <div className="bg-white flex border border-[#ACACAC] md:border-0 items-center shadow-[0px_0px_10.9px_0px_rgba(0,0,0,0.1)] justify-center gap-5 w-[301.19px] h-[110px] rounded-[15.43px]">
        <div className="">
          <h1 className="text-[17.23px] md:text-[15.76px] leading-[21.09px] md:leading-[19.29px] font-medium text-[#475467]">
            Total transactions
          </h1>
          <p className="text-[20.79px] leading-[100%] md:text-[19.01px] md:leading-[28.93px] font-semibold">
            {`${totalTransactions.toLocaleString()}`}
          </p>
        </div>
        <div className="bg-[#264697] p-2 rounded-full">
          <GrTransaction size="30" color="#fff" />
        </div>
      </div>

      <div className="bg-white border border-[#ACACAC] md:border-0 flex items-center shadow-[0px_0px_10.9px_0px_rgba(0,0,0,0.1)] justify-center gap-5 w-[301.19px] h-[110px] rounded-[15.43px]">
        <div className="">
          <h1 className="text-[17.23px] leading-[21.09px] md:text-[15.76px] md:leading-[19.29px]  font-medium text-[#475467]">
            Total Amount Processed
          </h1>
          <p className="text-[20.79px] md:text-[19.01px] leading-[31.63px] md:leading-[28.93px] font-semibold">
            {`$${totalAmountProcessed.toLocaleString()}`}
          </p>
        </div>
        <div className="bg-[#264697] p-2 rounded-full">
          <img src="/circular.png" alt="circular-png" className="w-[30px]" />
        </div>
      </div>

      <div className="w-[301.19px] h-[110px] rounded-[15.43px] border border-[#ACACAC] md:border-0 bg-white shadow-[0px_0px_10.9px_0px_rgba(0,0,0,0.1)] flex items-center justify-center gap-5">
        <div className="">
          <h1 className="md:text-[15.76px] text-[17.23px] leading-[100%] font-medium text-[#475467]">
            Completed Pay-outs
          </h1>
          <p className="md:text-[19.01px] text-[20.79px] leading-[31.63px] md:leading-[28.93px] font-semibold ">
            {`${completedPayouts}`}
          </p>
        </div>
        <div className="bg-[#264697] p-2 rounded-full">
          <FaPeopleGroup size="30" color="#fff" />
        </div>
      </div>
    </section>
  );
};

export default DashBoardCards;
