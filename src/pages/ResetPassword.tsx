import { useState } from "react";
import UserVerifyEmail from "../components/user/UserVerifyEmail";
import UserResetPassword from "../components/user/UserResetPassword";
import VerifyOtp from "./VerifyOtp";

const ResetPassword = () => {
  const [currForm, setCurrForm] = useState<number>(1);
  switch (currForm) {
    case 1:
      return <UserVerifyEmail setCurrForm={setCurrForm} />;
    case 2:
      return <VerifyOtp setCurrForm={setCurrForm} />;
    case 3:
      return <UserResetPassword setCurrForm={setCurrForm} />;
  }
};

export default ResetPassword;
