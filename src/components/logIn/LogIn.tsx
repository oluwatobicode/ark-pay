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
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="mb-8">
        <div className="cursor-pointer" onClick={() => navigate("/")}>
          <img
            src="/ArkPay.png"
            className="w-[180px] md:w-[200px] mx-auto"
            alt="nav-logo"
          />
        </div>
      </div>

      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-[32px] md:text-[36px] text-[#020267] font-bold mb-4">
            Sign In
          </h1>
          <p className="font-medium text-[16px] md:text-[20px] leading-[100%]">
            <span className="font-bold text-[16px] md:text-[23px]">ArkPay</span>{" "}
            welcome's you back
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <input
              id="email"
              type="email"
              disabled={state.isLoading}
              placeholder="Enter your email address"
              className={`w-full h-[60px] md:h-[67.2px] px-4 py-3 border-2 ${
                errors.email ? "border-red-500" : "border-[#020267]"
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

          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter a password"
                id="password"
                disabled={state.isLoading}
                className={`w-full h-[60px] md:h-[67.2px] px-4 py-3 pr-12 border-2 ${
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
                {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}

            <div className="text-right mt-2">
              <button
                onClick={() => navigate("/resetpassword")}
                type="button"
                className="underline font-normal text-[#020267] leading-[20.72px] text-[13px] md:text-[17px] cursor-pointer hover:text-[#020267]/80 transition-colors"
              >
                Forgot Password? Reset
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={state.isLoading}
            className={`w-full h-[58px] md:h-[50px] text-[#fff] rounded-md font-normal text-[16px] bg-[#020267] transition-all duration-200 ${
              state.isLoading
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:bg-[#020267]/90"
            }`}
          >
            {state.isLoading ? <MiniLoader /> : "Sign In"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            className="text-[14px] md:text-[17px] text-[#969696] leading-[100%] cursor-pointer hover:text-[#969696]/80 transition-colors"
            onClick={() => navigate("/signup")}
          >
            Don't have an account?{" "}
            <span className="text-[#020267] hover:text-[#020267]/80 transition-colors">
              Sign up
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
