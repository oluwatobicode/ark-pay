import OTPInput from "../auth/OTPInput";
import { useResetPassword } from "../contexts/ResetPasswordProvider";

function VerifyOtp() {
  const { setOtp, isLoading } = useResetPassword();

  const handleComplete = (pin: string) => {
    setOtp(pin);
  };

  return (
    <OTPInput length={6} onComplete={handleComplete} disabled={isLoading} />
  );
}

export default VerifyOtp;
