import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import Modal from "../ui/Modal";
import { FaCheck } from "react-icons/fa6";
import { useResetPassword } from "../contexts/ResetPasswordProvider";
import toast from "react-hot-toast";

type InputProps = {
  length?: number;
  onComplete?: (pin: string) => void;
  disabled?: boolean;
};

function OTPInput({ length = 6, onComplete, disabled = false }: InputProps) {
  const inputRef = useRef<HTMLInputElement[]>(Array(length).fill(null));
  const [OTP, setOTP] = useState<string[]>(Array(length).fill(""));
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();
  const { email, setOtp, goToNextStep, isLoading, setIsLoading } =
    useResetPassword();

  const handleTextChange = (input: string, index: number) => {
    if (disabled || isLoading) return;

    const newPin = [...OTP];
    newPin[index] = input;
    setOTP(newPin);

    // it helps to move to next input if digit entered
    if (input.length === 1 && index < length - 1) {
      inputRef.current[index + 1]?.focus();
    }

    console.log(isVerifying);

    // it helps to move to previous input if backspace
    if (input.length === 0 && index > 0) {
      inputRef.current[index - 1]?.focus();
    }

    // This is an auto-submit for when all digits are filled
    if (newPin.every((digit) => digit !== "")) {
      const pinString = newPin.join("");
      if (onComplete) {
        onComplete(pinString);
      }
    }
  };

  const handleVerifyClick = async () => {
    const pinString = OTP.join("");
    if (pinString.length !== length) {
      toast.error("Please enter the complete OTP");
      return;
    }

    try {
      setIsVerifying(true);
      setOtp(pinString);
      console.log("OTP collected:", pinString, "for email:", email);

      // this is a brief delay for UX
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error("Error:", error);
      setIsVerifying(false);
    }
  };

  const handleResendOTP = async () => {
    if (disabled || isLoading) return;

    try {
      setIsLoading(true);
      console.log("Resending OTP to:", email);

      const response = await fetch(
        "https://arkpay.onrender.com/v1/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email: email }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to resend OTP");
      }

      // Clear current OTP and show success message
      setOTP(Array(length).fill(""));
      inputRef.current[0]?.focus();
      toast.success("OTP sent successfully! Please check your email.");
    } catch (error) {
      console.error("Failed to resend OTP:", error);
      toast.error("Failed to resend OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPasswordClick = () => {
    setIsVerifying(false);
    setIsLoading(false);
    goToNextStep(); // Move to reset password step
  };

  return (
    <Modal>
      <div className="m-5">
        <div className="flex items-center justify-center mt-20">
          <div className="cursor-pointer" onClick={() => navigate("/")}>
            <img src="/ArkPay.png" className="w-[200px]" alt="nav-logo" />
          </div>
        </div>
        <div className="flex flex-col h-fit p-5 items-center justify-center">
          <div className="mb-8 text-center">
            <h1 className="text-[47px] font-bold leading-[58px] text-[#020267]">
              OTP
            </h1>
            <p className="font-medium text-[20px]">
              Please enter the OTP sent to {email}!
            </p>
          </div>
          <div className="flex flex-row items-center mt-2 mb-5">
            {Array.from({ length }, (_, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={OTP[index]}
                disabled={disabled || isLoading}
                onChange={(e) => handleTextChange(e.target.value, index)}
                ref={(ref) => {
                  inputRef.current[index] = ref as HTMLInputElement;
                }}
                className={`border-2 border-solid rounded-lg text-3xl border-[#020267] p-5 outline-none w-[75px] h-[70px] bg-transparent disabled:opacity-50 disabled:cursor-not-allowed`}
                style={{ marginRight: index === length - 1 ? "0" : "10px" }}
              />
            ))}
          </div>
          <div className="flex flex-col items-center mb-5">
            <p className="text-[23.88px] font-normal leading-[29.12px] mb-2 text-[#11100BA6]">
              Didn't receive an OTP?
            </p>
            <button
              onClick={handleResendOTP}
              disabled={disabled || isLoading}
              className="disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <p className="underline text-[20px] font-normal leading-[29.12px] text-textColor">
                {isLoading ? "Resending..." : "Resend OTP?"}
              </p>
            </button>
          </div>

          <Modal.Open opens="verify">
            <button
              className="md:w-[350px] w-[300px] h-[50px] bg-[#020267] cursor-pointer text-[#ffff] rounded-md mb-5 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleVerifyClick}
              disabled={
                disabled || isLoading || OTP.some((digit) => digit === "")
              }
            >
              {isLoading ? "Verifying..." : "Verify"}
            </button>
          </Modal.Open>

          <Modal.Window name="verify">
            <div className="flex flex-col items-center justify-center gap-[10px]">
              <div className="bg-[#020267] w-[80px] h-[80px] rounded-full flex items-center justify-center">
                <FaCheck color="#fff" size="50px" />
              </div>
              <h1 className="leading-[100%] text-[32px] font-semibold">
                Verification Complete
              </h1>
              <p className="text-[14.46px] text-[#000000A6] leading-[100%]">
                Your OTP has been successfully verified
              </p>
              <button
                className="w-[317px] h-[54.63px] bg-[#020267] text-[#fff] rounded-[28.12px] cursor-pointer mt-10"
                onClick={handleResetPasswordClick}
              >
                Reset Password
              </button>
            </div>
          </Modal.Window>
        </div>
      </div>
    </Modal>
  );
}

export default OTPInput;
