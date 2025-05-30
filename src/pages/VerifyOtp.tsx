import type { Dispatch, SetStateAction } from "react";
import OTPInput from "../auth/OTPInput";

interface VerifyOtpProps {
  setCurrForm?: Dispatch<SetStateAction<number>>;
}

function VerifyOtp({ setCurrForm }: VerifyOtpProps) {
  const handleSubmit = (pin: string) => {
    console.log(pin);

    //LOGIC GOES HERE FOR THE APP
  };
  return (
    <div>
      <OTPInput
        length={4}
        setCurrForm={setCurrForm}
        onComplete={handleSubmit}
      />
    </div>
  );
}

export default VerifyOtp;
