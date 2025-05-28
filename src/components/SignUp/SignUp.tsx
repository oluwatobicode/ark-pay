import { useState } from "react";
import { useNavigate } from "react-router";

interface signUpFormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
}

function SignUp() {
  const [signUpFormData, setSignUpFormData] = useState<signUpFormState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(signUpFormData);

    //SIGN UP LOGIN GOES HERE
  };

  return (
    <div className="m-10">
      <div className="flex items-center justify-center pt-10">
        <div className="" onClick={() => navigate("/")}>
          <img src="/ArkPay.png" className="w-[200px]" alt="nav-logo" />
        </div>
      </div>
      <div className="flex flex-col h-fit p-4  items-center justify-center">
        <h1 className="text-[36px] font-bold text-[#020267]">Sign up</h1>
        <p className="font-medium text-[15px] mb-5">
          Create an account with <span className="font-bold">ArkPay</span>
        </p>
        <div className="flex flex-col">
          <form action="" onSubmit={handleSubmit}>
            <div className="mb-5">
              <input
                className="w-[300px] placeholder:font-medium placeholder:text-[15px] pl-2 h-[50px] bg-transparent  border-2 border-[#020267] text-[#020267] rounded-md font-normal text-[16px]
                "
                placeholder="Name"
                type="name"
                name="name"
                onChange={handleChange}
                value={signUpFormData.name}
              />
            </div>
            <div className="mb-5">
              <input
                className="w-[300px] placeholder:font-medium placeholder:text-[15px] pl-2 h-[50px] bg-transparent  border-2 border-[#020267] rounded-md font-normal text-[16px]
                "
                placeholder="Email"
                type="email"
                name="email"
                onChange={handleChange}
                value={signUpFormData.email}
              />
            </div>
            <div className="mb-5">
              <input
                className="w-[300px]  placeholder:font-medium placeholder:text-[15px] pl-2 h-[50px] bg-transparent  border-2 border-[#020267] rounded-md font-normal text-[16px]
                "
                placeholder="Password"
                type="password"
                name="password"
                onChange={handleChange}
                value={signUpFormData.password}
              />
            </div>
            <div className="mb-5">
              <input
                className="w-[300px] placeholder:font-medium placeholder:text-[15px] pl-2 h-[50px] bg-transparent  border-2 border-[#020267] rounded-md font-normal text-[16px]
                "
                placeholder="Confirm password"
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                value={signUpFormData.confirmPassword}
              />
            </div>
            <div className="mb-5">
              <input
                className="w-[300px] placeholder:font-medium placeholder:text-[15px] pl-2 h-[50px] bg-transparent  border-2 border-[#020267] rounded-md font-normal text-[16px]
                "
                placeholder="Country"
                type="country"
                name="country"
                onChange={handleChange}
                value={signUpFormData.country}
              />
            </div>

            <button className="w-[300px] h-[50px] text-textColorSec bg-[#020267] text-white font-medium rounded-md text-[16px]">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
