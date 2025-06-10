import React, { useState } from "react";

const PaymentOptions: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] =
    useState<string>("Payout Currency");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [autoOffRamp, setAutoOffRamp] = useState<boolean>(false);

  const currencies: string[] = ["NGN", "COMING SOON", "COMING SOON"];

  const handleCurrencySelect = (currency: string): void => {
    setSelectedCurrency(currency);
    setIsDropdownOpen(false);
  };

  return (
    <div className="mt-5">
      <h1 className="text-[24px] leading-[100%] font-semibold mb-5">
        Payout Options
      </h1>

      <div className="bg-[#EDEDED] rounded-[6px] p-[16px]">
        <div className="mb-4">
          <h1 className="text-[14px] font-medium text-gray-700 leading-[100%] mb-3">
            Active Payment Methods
          </h1>

          {/* Payout Currency Dropdown */}
          <div className="relative mb-4">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full bg-white border border-gray-300 rounded-[6px] px-3 py-2 text-left text-[14px] text-gray-900 flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <span>{selectedCurrency}</span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown Options */}
            {isDropdownOpen && (
              <div className=" top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-[6px] shadow-lg z-10">
                {currencies.map((currency) => (
                  <button
                    key={currency}
                    onClick={() => handleCurrencySelect(currency)}
                    className={`w-full px-3 py-2 text-left text-[14px] hover:bg-gray-50 focus:outline-none focus:bg-gray-50 first:rounded-t-[6px] last:rounded-b-[6px] ${
                      currency === selectedCurrency
                        ? "text-[#333333]"
                        : "text-[#888888]"
                    }`}
                  >
                    {currency}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Auto Offramp Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-[14px] font-medium text-gray-700 leading-[100%]">
            Auto offramp
          </span>
          <button
            disabled={true}
            onClick={() => setAutoOffRamp(!autoOffRamp)}
            className={`cursor-not-allowed relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              autoOffRamp ? "bg-[#020267]" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                autoOffRamp ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;
