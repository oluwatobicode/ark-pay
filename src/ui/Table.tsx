import type React from "react";
import { useState, useEffect, useMemo } from "react";
import Status from "./Status";
import { useUserData } from "../contexts/UserDataProvider";
import { useNavigate } from "react-router";

const Table: React.FC = () => {
  const { state, getRecentTransactions } = useUserData();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    getRecentTransactions();
  }, []);

  const userTransactions = state.transactions?.userTransactions || [];

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  const getPaymentStatus = (validUntil: string | undefined) => {
    if (!validUntil) return "Unknown";
    const now = new Date();
    const validDate = new Date(validUntil);
    return now > validDate ? "Expired" : "Active";
  };

  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = userTransactions.filter((transaction) => {
      const matchesSearch =
        searchTerm === "" ||
        (transaction.orderId &&
          transaction.orderId
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (transaction.token &&
          transaction.token.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (transaction.network &&
          transaction.network.toLowerCase().includes(searchTerm.toLowerCase()));

      const transactionDate = transaction.createdAt
        ? new Date(transaction.createdAt)
        : null;
      const matchesDateRange =
        !transactionDate ||
        ((!dateRange.startDate ||
          transactionDate >= new Date(dateRange.startDate)) &&
          (!dateRange.endDate ||
            transactionDate <= new Date(dateRange.endDate)));

      return matchesSearch && matchesDateRange;
    });

    filtered.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sortBy) {
        case "amount":
          aValue = a.amount || 0;
          bValue = b.amount || 0;
          break;
        case "token":
          aValue = a.token || "";
          bValue = b.token || "";
          break;
        case "network":
          aValue = a.network || "";
          bValue = b.network || "";
          break;
        case "status":
          aValue = getPaymentStatus(a.validUntil || "");
          bValue = getPaymentStatus(b.validUntil || "");
          break;
        case "orderId":
          aValue = a.orderId || "";
          bValue = b.orderId || "";
          break;
        default: // createdAt
          // Handle potentially undefined createdAt
          aValue = a.createdAt ? new Date(a.createdAt) : new Date(0);
          bValue = b.createdAt ? new Date(b.createdAt) : new Date(0);
      }

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [userTransactions, searchTerm, dateRange, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(
    filteredAndSortedTransactions.length / itemsPerPage
  );
  const paginatedTransactions = filteredAndSortedTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle sort column click
  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="md:text-[22.59px] md:leading-[100%] text-[17px] leading-[100%] font-semibold">
          Recent Transactions
        </h2>
        <span className="md:text-[18px] md:leading-[100%] text-[10.23px] leading-[10.23px] font-medium text-black">
          {filteredAndSortedTransactions.length} transactions
        </span>
      </div>

      {/* Table Operations */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Find transaction..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Date Range Filter */}
          <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <input
              type="date"
              className="border-none outline-none text-sm date-input"
              value={dateRange.startDate}
              onChange={(e) =>
                setDateRange((prev) => ({ ...prev, startDate: e.target.value }))
              }
            />
            <span className="text-gray-400">-</span>
            <input
              type="date"
              className="border-none outline-none text-sm date-input"
              value={dateRange.endDate}
              onChange={(e) =>
                setDateRange((prev) => ({ ...prev, endDate: e.target.value }))
              }
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
              />
            </svg>
            <select
              className="border-none outline-none text-sm bg-transparent"
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [column, order] = e.target.value.split("-");
                setSortBy(column);
                setSortOrder(order as "asc" | "desc");
              }}
            >
              <option value="createdAt-desc">Date (Newest)</option>
              <option value="createdAt-asc">Date (Oldest)</option>
              <option value="amount-desc">Amount (High to Low)</option>
              <option value="amount-asc">Amount (Low to High)</option>
              <option value="token-asc">Token (A-Z)</option>
              <option value="network-asc">Network (A-Z)</option>
              <option value="status-asc">Status</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden md:overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#F7F8F7]">
            <tr>
              <th
                className="px-6 py-3 text-[14.05px] text-left text-xs font-semibold text-black uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("createdAt")}
              >
                Date Created
              </th>
              <th
                className="px-6 py-3 text-[14.05px] text-left text-xs font-semibold text-black uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("amount")}
              >
                Amount
              </th>
              <th
                className="hidden md:inline-block px-6 py-3 text-[14.05px] text-left text-xs font-semibold text-black uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("token")}
              >
                Token
              </th>
              <th
                className="hidden md:inline-block px-6 py-3 text-[14.05px] text-left text-xs font-semibold text-black uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("network")}
              >
                Network
              </th>
              <th
                className="hidden md:inline-block px-6 py-3 text-[14.05px] text-left text-xs font-semibold text-black uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("status")}
              >
                Status
              </th>
              <th
                className="hidden md:inline-block px-6 py-3 text-[14.05px] text-left text-xs font-semibold text-black uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("orderId")}
              >
                Order ID
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {paginatedTransactions.map((transaction) => (
              <tr key={transaction._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-[14.05px] leading-[100%] text-[#333333]">
                  {formatDate(transaction.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-[14.05px] leading-[100%]">
                  {transaction.amount} {transaction.token}
                </td>
                <td className="hidden md:block px-6 py-4 whitespace-nowrap font-medium text-[14.05px] leading-[100%]">
                  {transaction.token}
                </td>
                <td className="hidden md:block px-6 py-4 whitespace-nowrap font-medium text-[14.05px] leading-[100%]">
                  {transaction.network}
                </td>
                <td className="hidden md:block px-6 py-4 whitespace-nowrap">
                  <Status types={getPaymentStatus(transaction.validUntil)}>
                    {getPaymentStatus(transaction.validUntil)}
                  </Status>
                </td>
                <td className="hidden md:block px-6 py-4 whitespace-nowrap font-medium text-[14.05px] leading-[100%] text-sm">
                  {transaction.orderId
                    ? transaction.orderId.substring(0, 8) + "..."
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {state.isLoading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading transactions...</p>
          </div>
        )}

        {!state.isLoading && filteredAndSortedTransactions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            {searchTerm || dateRange.startDate || dateRange.endDate
              ? "No transactions match your filters"
              : "No transactions found"}
          </div>
        )}
      </div>

      {filteredAndSortedTransactions.length > 0 && (
        <div className="flex items-center justify-between mt-6 px-6 py-3 bg-white border-t border-gray-200">
          <div className="text-sm text-gray-700">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(
              currentPage * itemsPerPage,
              filteredAndSortedTransactions.length
            )}{" "}
            of {filteredAndSortedTransactions.length} results
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              ←
            </button>

            <div className="flex space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1 border rounded-md text-sm ${
                      currentPage === pageNum
                        ? "bg-blue-600 text-white border-blue-600"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              →
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-end md:hidden">
        <button
          onClick={() => {
            navigate("/transactions");
          }}
          className="text-white w-[100px] h-[32px] rounded-[4px] bg-[#020267]"
        >
          View All
        </button>
      </div>
    </div>
  );
};

export default Table;
