import { FaPeopleGroup } from "react-icons/fa6";
import { GrTransaction } from "react-icons/gr";

const DashBoardCards = () => {
  return (
    <section className="flex flex-row items-center justify-start gap-[25px]">
      <div className="bg-white flex items-center shadow-[0px_0px_10.9px_0px_rgba(0,0,0,0.1)] justify-center gap-5 w-[301.19px] h-[110px] rounded-[15.43px]">
        <div className="">
          <h1 className="text-[15.76px] leading-[19.29px] font-medium text-[#475467]">
            Total transactions
          </h1>
          <p className="text-[19.01px] leading-[28.93px] font-semibold">
            100,000
          </p>
        </div>
        <div className="bg-[#264697] p-2 rounded-full">
          <GrTransaction size="30" color="#fff" />
        </div>
      </div>

      <div className="bg-white flex items-center shadow-[0px_0px_10.9px_0px_rgba(0,0,0,0.1)] justify-center gap-5 w-[301.19px] h-[110px] rounded-[15.43px]">
        <div className="">
          <h1 className="text-[15.76px] leading-[19.29px]  font-medium text-[#475467]">
            Total Amount Processed
          </h1>
          <p className="text-[19.01px] leading-[28.93px] font-semibold">
            500,000
          </p>
        </div>
        <div className="bg-[#264697] p-2 rounded-full">
          <img src="/circular.png" alt="circular-png" className="w-[30px]" />
        </div>
      </div>

      <div className="w-[301.19px] h-[110px] rounded-[15.43px] bg-white shadow-[0px_0px_10.9px_0px_rgba(0,0,0,0.1)] flex items-center justify-center gap-5">
        <div className="">
          <h1 className="text-[15.76px] leading-[19.29px] font-medium text-[#475467]">
            Completed Pay-outs
          </h1>
          <p className="text-[19.01px] leading-[28.93px] font-semibold ">
            N 500,000
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
