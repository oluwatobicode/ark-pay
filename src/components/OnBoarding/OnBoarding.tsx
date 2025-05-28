import { useNavigate } from "react-router";

function OnBoarding() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="flex flex-col items-center justify-center gap-2 ">
        <div className="w-[200px]" onClick={() => navigate("/")}>
          <img src="/ArkPay.png" alt="apollo  " />
        </div>
        <p className="font-semibold leading-[43.12px] text-[20.37px]">
          Let&apos;s get started
        </p>

        <div className="flex flex-col gap-5">
          <button
            onClick={() => navigate("/signup")}
            className="bg-[#020267] cursor-pointer  text-[20px] font-semiBold leading-[25.6px] text-[#ffff] w-[350px] h-[50px] rounded-lg"
          >
            Sign Up
          </button>
          <button
            onClick={() => navigate("/login")}
            className="text-[#020267] cursor-pointer text-[20px] font-semiBold leading-[25.6px]  border-2 border-[#020267] w-[350px] h-[50px] rounded-lg"
          >
            Continue with an account
          </button>

          <div className="flex items-center justify-center gap-5">
            <span className="border-t-2 w-[100px] border-textColor "></span>
            <p className="font-semibold leading-[27.6px] text-[22.64px]">Or</p>
            <span className="border-t-2 w-[100px] border-textColor "></span>
          </div>

          <button className="text-textColor cursor-pointer text-[20px] font-semiBold leading-[25.6px] border-2 flex items-center justify-center border-textColor w-[350px] h-[50px] rounded-lg">
            <img src="/google.svg" className="w-[50px]" alt="" />
            Continue with gmail
          </button>
        </div>
      </div>
    </div>
  );
}
export default OnBoarding;
