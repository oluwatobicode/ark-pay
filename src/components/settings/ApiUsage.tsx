const ApiUsage = () => {
  return (
    <div className="mt-5 mb-5 flex flex-col gap-[24px]">
      <div className="mb-2">
        <h1 className="text-[24px] font-semibold leading-[100%]">API Usage</h1>
      </div>

      <button className="bg-[#020267] text-[#fff] w-full h-[51px] rounded-[6px] cursor-pointer">
        <p className="text-left px-3 py-4 text-[16px] leading-[100%] font-semibold">
          Generate New API key
        </p>
      </button>
    </div>
  );
};
export default ApiUsage;
