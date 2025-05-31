import UserVerifyEmail from "../components/user/UserVerifyEmail";
import UserResetPassword from "../components/user/UserResetPassword";
import VerifyOtp from "./VerifyOtp";
import { useResetPassword } from "../contexts/ResetPasswordProvider";

const ResetPassword = () => {
  const { currentStep } = useResetPassword();

  switch (currentStep) {
    case 1:
      return <UserVerifyEmail />;
    case 2:
      return <VerifyOtp />;
    case 3:
      return <UserResetPassword />;
  }
};

export default ResetPassword;
