import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import { useNavigate } from "react-router";
import Modal from "../ui/Modal";
import { FaCheck } from "react-icons/fa6";

type InputProps = {
  length?: number;
  onComplete?: (pin: string) => void;
  setCurrForm?: Dispatch<SetStateAction<number>>;
};

function OTPInput({ length = 4, onComplete, setCurrForm }: InputProps) {
  const inputRef = useRef<HTMLInputElement[]>(Array(length).fill(null));
  const [OTP, setOTP] = useState<string[]>(Array(length).fill(null));
  const navigate = useNavigate();

  const handleTextChange = (input: string, index: number) => {
    const newPin = [...OTP];
    newPin[index] = input;
    setOTP(newPin);

    //checking if the user has entered the first digit, if they have automatically focus on the next input filed and so on.

    if (input.length === 1 && index < input.length - 1) {
      inputRef.current[index + 1]?.focus();
    }

    if (input.length === 0 && index > 0) {
      inputRef.current[index - 1]?.focus();
    }

    //if user has entered alll the digits , grab the digits and set as an argument to the onComplete function

    if (newPin.every((digit) => digit != " ")) {
      onComplete(newPin.join(""));
    }
  };

  return (
    <Modal>
      <div className="m-5">
        <div className="flex items-center justify-center mt-20">
          <div className="" onClick={() => navigate("/")}>
            <img src="/ArkPay.png" className="w-[200px]" alt="nav-logo" />
          </div>
        </div>
        <div className="flex flex-col h-fit p-5 items-center justify-center">
          <div className="mb-8 text-center">
            <h1 className="text-[47px] font-bold leading-[58px] text-[#020267]">
              OTP
            </h1>
            <p className="font-medium text-[20px]">
              Please enter the OTP sent to your email !
            </p>
          </div>
          <div className="flex flex-row items-center mt-2 mb-5">
            {Array.from({ length }, (_, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={OTP[index]}
                onChange={(e) => handleTextChange(e.target.value, index)}
                ref={(ref) =>
                  (inputRef.current[index] = ref as HTMLInputElement)
                }
                className={`border-2 border-solid rounded-lg text-3xl border-[#020267]  p-5 outline-none w-[75px] h-[70px] bg-transparent`}
                style={{ marginRight: index === length - 1 ? "0" : "10px" }}
              />
            ))}
          </div>
          <div className="flex flex-col items-center mb-5">
            <p className="text-[23.88px] font-normal leading-[29.12px] mb-2 text-[#11100BA6]">
              Didn’t receive an OTP?
            </p>
            <button>
              <p className="underline text-[20px] font-normal leading-[29.12px] text-textColor">
                Resend OTP?
              </p>
            </button>
          </div>

          <Modal.Open opens="open">
            <button className="md:w-[350px] w-[300px] h-[50px] bg-[#020267] cursor-pointer text-[#ffff] rounded-md mb-5">
              Verify
            </button>
          </Modal.Open>

          <Modal.Window name="open">
            <div className="flex flex-col items-center justify-center gap-[10px]">
              <div className="bg-[#020267] w-[80px] h-[80px] rounded-full flex items-center justify-center">
                <FaCheck color="#fff" size="50px" />
              </div>
              <h1 className="leading-[100%] text-[32px] font-semibold">
                Verification Complete
              </h1>
              <p className="text-[14.46px] text-[#000000A6] leading-[100%]">
                Your email has been successfully verified
              </p>
              <button
                className="w-[317px] h-[54.63px] bg-[#020267] text-[#fff] rounded-[28.12px] cursor-pointer mt-10"
                onClick={() => setCurrForm(3)}
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
