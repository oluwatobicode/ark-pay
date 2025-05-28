import Table from "../../ui/Table";

const DashboardTransaction = () => {
  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-[22.59px] leading-[150%] font-semibold">
          Recent Transactions
        </h1>

        <div className="">
          <p>50 000 users</p>
        </div>
      </div>

      <Table />
    </div>
  );
};

export default DashboardTransaction;
