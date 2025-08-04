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

  const cardData = [
    {
      title: "Total transactions",
      value: totalTransactions.toLocaleString(),
      icon: (
        <GrTransaction
          size="24"
          color="#fff"
          className="sm:w-6 sm:h-6 md:w-7 md:h-7"
        />
      ),
      bgColor: "bg-[#264697]",
    },
    {
      title: "Total Amount Processed",
      value: `$${totalAmountProcessed.toLocaleString()}`,
      icon: (
        <img
          src="/circular.png"
          alt="circular-png"
          className="w-6 h-6 sm:w-7 sm:h-7"
        />
      ),
      bgColor: "bg-[#264697]",
    },
    {
      title: "Completed Pay-outs",
      value: completedPayouts.toString(),
      icon: (
        <FaPeopleGroup
          size="24"
          color="#fff"
          className="sm:w-6 sm:h-6 md:w-7 md:h-7"
        />
      ),
      bgColor: "bg-[#264697]",
    },
  ];

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto px-4 sm:px-0">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="bg-white border border-gray-300 md:border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl p-4 sm:p-6 min-h-[110px] flex items-center justify-between w-full"
          >
            <div className="flex-1 pr-4">
              <h1 className="text-sm sm:text-base font-medium text-gray-600 mb-2 leading-tight">
                {card.title}
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 leading-tight break-all">
                {card.value}
              </p>
            </div>
            <div className={`${card.bgColor} p-3 rounded-full flex-shrink-0`}>
              {card.icon}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DashBoardCards;
