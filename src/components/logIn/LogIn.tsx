import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthProvider";
import toast from "react-hot-toast";
import MiniLoader from "../../ui/MiniLoader";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface logInData {
  email: string;
  password: string;
}

function Login({ email, password }: Partial<logInData>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<logInData>({
    defaultValues: {
      email,
      password,
    },
  });

  const { state, login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const onSubmit: SubmitHandler<logInData> = async (data) => {
    try {
      await login(data);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(state.error);
      console.log(error);
    }
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <input
                id="email"
                type="email"
                disabled={state.isLoading}
                placeholder="Enter your email address"
                className={`w-full max-w-[443px] px-4 py-3 border-2 ${
                  errors.password ? "border-red-500" : "border-[#020267]"
                } ${
                  state.isLoading ? "opacity-50 cursor-not-allowed" : ""
                } rounded-lg bg-transparent placeholder:text-gray-500 placeholder:font-medium text-base focus:outline-none focus:ring-2 focus:ring-[#020267] focus:border-transparent transition duration-200`}
                {...register("email", {
                  required: "Email is required!",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors?.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors?.email.message}
                </p>
              )}
            </div>
            <div className="mb-5 flex flex-col ">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter a password"
                  id="password"
                  disabled={state.isLoading}
                  className={`w-full max-w-[443px] px-4 py-3 border-2 ${
                    errors.password ? "border-red-500" : "border-[#020267]"
                  } ${
                    state.isLoading ? "opacity-50 cursor-not-allowed" : ""
                  } rounded-lg bg-transparent placeholder:text-gray-500 placeholder:font-medium text-base focus:outline-none focus:ring-2 focus:ring-[#020267] focus:border-transparent transition duration-200`}
                  {...register("password", {
                    required: "Password is required!",
                    pattern: {
                      value: passwordRegex,
                      message: "Password is required!",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  disabled={state.isLoading}
                  className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#020267] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {showPassword ? (
                    <FaEye size={18} />
                  ) : (
                    <FaEyeSlash size={18} />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-sm mt-1 w-[350px]">
                  {errors.password.message}
                </p>
              )}
              <button
                onClick={() => navigate("/resetpassword")}
                type="button"
                className="text-right mt-2 underline font-normal text-[#020267] leading-[20.72px] text-[13px] cursor-pointer"
              >
                Forgot Password? Reset
              </button>
            </div>

            <button
              type="submit"
              disabled={state.isLoading}
              className={`w-[350px] h-[50px] text-[#fff] rounded-md font-normal text-[16px] bg-[#020267]  ${
                state.isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              {state.isLoading ? <MiniLoader /> : "Sign In"}
            </button>
          </form>

          <div className="mt-[30px] text-center">
            <button
              className="text-[14px] text-[#969696] text-center leading-[100%] cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Don’t have an account?{" "}
              <span className="text-[#020267]">Sign up</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
