import toast from "react-hot-toast";
import { useNavigate } from "react-router";

function OnBoarding() {
  const navigate = useNavigate();

  const onClickTheGoogle = () => {
    toast.success("Coming Soon 🤩");
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen p-4">
      <div className="flex flex-col items-center justify-center gap-2 w-full max-w-md">
        <div
          className="w-32 sm:w-40 md:w-48 lg:w-52 cursor-pointer transition-transform hover:scale-105"
          onClick={() => navigate("/")}
        >
          <img src="/ArkPay.png" alt="ArkPay Logo" className="w-full h-auto" />
        </div>

        <p className="font-semibold text-xl sm:text-2xl md:text-3xl text-center mt-2 mb-6 text-gray-800">
          Let&apos;s get started
        </p>

        <div className="flex flex-col gap-4 sm:gap-5 w-full">
          <button
            onClick={() => navigate("/signup")}
            className="bg-[#020267] hover:bg-[#030380] active:bg-[#010156] text-white font-medium text-base sm:text-lg md:text-xl w-full h-12 sm:h-14 md:h-16 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#020267] focus:ring-offset-2"
          >
            Sign Up
          </button>

          <button
            onClick={() => navigate("/login")}
            className="text-[#020267] hover:bg-[#020267] hover:text-white active:bg-[#030380] font-semibold text-base sm:text-lg md:text-xl border-2 border-[#020267] w-full h-12 sm:h-14 md:h-16 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#020267] focus:ring-offset-2"
          >
            Continue with an account
          </button>

          <div className="flex items-center justify-center gap-3 sm:gap-4 my-2">
            <span className="border-t-2 flex-1 max-w-[80px] sm:max-w-[100px] border-black"></span>
            <p className="font-semibold text-lg sm:text-xl md:text-2xl text-black px-2">
              Or
            </p>
            <span className="border-t-2 flex-1 max-w-[80px] sm:max-w-[100px] border-black"></span>
          </div>

          <button
            onClick={onClickTheGoogle}
            className="text-[#020267] hover:bg-[#020267] active:bg-gray-100 font-semibold text-base sm:text-lg md:text-xl border-2 border-[#020267] hover:border-[#020267] w-full h-12 sm:h-14 md:h-16 rounded-lg transition-all duration-200 flex items-center justify-center gap-3 focus:outline-none focus:ring-2 focus:ring-[#020267] focus:ring-offset-2"
          >
            <img
              src="/google.svg"
              className="w-6 h-6 sm:w-6 sm:h-6 md:w-7 md:h-7"
              alt="Google Logo"
            />
            Continue with Gmail
          </button>
        </div>
      </div>
    </div>
  );
}

export default OnBoarding;
