import type React from "react";
import Status from "./Status";

interface TableData {
  id: number;
  date: string;
  amount: string;
  paymentStatus: string;
  accountStatus: string;
}

const data: TableData[] = [
  {
    id: 1,
    date: "01/02/2025",
    amount: "500",
    accountStatus: "Active",
    paymentStatus: "Pending",
  },
  {
    id: 2,
    date: "03/02/2025",
    amount: "300",
    accountStatus: "Active",
    paymentStatus: "Completed",
  },
  {
    id: 3,
    date: "03/02/2025",
    amount: "1100",
    accountStatus: "Active",
    paymentStatus: "Completed",
  },
  {
    id: 4,
    date: "03/05/2025",
    amount: "3000",
    accountStatus: "Active",
    paymentStatus: "Completed",
  },
  {
    id: 5,
    date: "03/02/2025",
    amount: "25",
    accountStatus: "Active",
    paymentStatus: "Completed",
  },
  {
    id: 6,
    date: "03/02/2025",
    amount: "700",
    accountStatus: "Active",
    paymentStatus: "Completed",
  },
  {
    id: 7,
    date: "03/02/2025",
    amount: "2700",
    accountStatus: "Active",
    paymentStatus: "Completed",
  },
  {
    id: 8,
    date: "03/02/2025",
    amount: "700",
    accountStatus: "Active",
    paymentStatus: "Completed",
  },
  {
    id: 9,
    date: "03/02/2025",
    amount: "7",
    accountStatus: "Active",
    paymentStatus: "Pending",
  },
  {
    id: 10,
    date: "03/02/2025",
    amount: "70",
    accountStatus: "Active",
    paymentStatus: "Completed",
  },
  {
    id: 11,
    date: "03/02/2025",
    amount: "1700",
    accountStatus: "Active",
    paymentStatus: "Pending",
  },
];

const Table: React.FC = () => {
  return (
    <div className="overflow-x-auto mt-10">
      <div className=""></div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#F7F8F7]">
          <tr>
            <th className="px-6 py-3 text-[14.05px] text-left text-xs font-semibold text-black uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-[14.05px] text-left text-xs font-semibold text-black uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-[14.05px] text-left text-xs font-semibold text-black uppercase tracking-wider">
              Payment Status
            </th>
            <th className="px-6 py-3 text-[14.05px] text-left text-xs font-semibold text-black uppercase tracking-wider">
              Account State
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap font-medium text-[14.05px] leading-[100%] text-[#333333]">
                {item.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap font-medium  text-[14.05px] leading-[100%]">
                ${item.amount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Status types={item.paymentStatus}>{item.paymentStatus}</Status>
              </td>
              <td className="px-6 py-4 whitespace-nowrap font-medium text-[14.05px] leading-[100%]">
                {item.accountStatus}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
