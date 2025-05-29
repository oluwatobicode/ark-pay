import { useState } from "react";
import { useNavigate } from "react-router";

interface logInState {
  email: string;
  password: string;
}

function Login() {
  const [loginFormData, setLoginFormData] = useState<logInState>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFormData((prevData) => ({ ...prevData, [name]: value }));
    console.log(name);
    console.log(value);
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(loginFormData);
    //LOGIN API lOGIC GOES HERE
    // navigate("/app");
  };

  return (
    <div className="m-10">
      <div className="flex items-center justify-center pt-10">
        <div className="" onClick={() => navigate("/")}>
          <img src="/ArkPay.png" className="w-[200px]" alt="nav-logo" />
        </div>
      </div>
      <div className="flex flex-col h-fit p-5  items-center justify-center">
        <h1 className="md:text-[36px] text-[20px] text-[#020267] font-bold mt-2 mb-5">
          Sign In
        </h1>
        <p className="font-medium text-[20px] leading-[100%] mb-5">
          <span className="font-bold">ArkPay</span> welcome's you back
        </p>
        <div className="flex flex-col">
          <form action="" onSubmit={handleSubmit}>
            <div className="mb-5">
              <input
                className="active:bg-transparent w-[350px] placeholder:semi-bold placeholder:text-[15px] pl-2 h-[50px] bg-transparent  border-2 border-[#020267] rounded-md font-normal text-[16px]
                  "
                placeholder="Email"
                type="email"
                onChange={handleChange}
                value={loginFormData.email}
                name="email"
              />
            </div>
            <div className="mb-5 flex flex-col">
              <input
                className="w-[350px] placeholder:semi-bold placeholder:text-[15px] pl-2 h-[50px] bg-transparent  border-2 border-[#020267] rounded-md font-normal text-[16px]
                  "
                placeholder="Password"
                type="password"
                onChange={handleChange}
                value={loginFormData.password}
                name="password"
              />
              <button
                onClick={() => navigate("/resetpassword")}
                className="text-right mt-2 underline font-normal text-[#020267] leading-[20.72px] text-[13px] cursor-pointer"
              >
                Forgot Password? Reset
              </button>
            </div>

            <button
              onClick={() => navigate("/dashboard")}
              className="w-[350px] h-[50px] text-[#fff] rounded-md font-normal text-[16px] bg-[#020267] cursor-pointer"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;
