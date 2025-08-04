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
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      <div className="mb-6 sm:mb-8 lg:mb-10">
        <div className="cursor-pointer" onClick={() => navigate("/")}>
          <img
            src="/ArkPay.png"
            className="w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px] xl:w-[220px] mx-auto transition-all duration-200"
            alt="nav-logo"
          />
        </div>
      </div>

      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl text-[#020267] font-bold mb-3 sm:mb-4 leading-tight">
            Sign In
          </h1>
          <p className="font-medium text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-black">
            <span className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl text-black">
              ArkPay{" "}
            </span>
            welcomes you back
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 sm:space-y-5 lg:space-y-6"
        >
          <div>
            <input
              id="email"
              type="email"
              disabled={state.isLoading}
              placeholder="Enter your email address"
              className={`w-full h-12 sm:h-14 md:h-16 lg:h-[60px] px-3 sm:px-4 py-3 border-2 ${
                errors.email ? "border-red-500" : "border-[#020267]"
              } ${
                state.isLoading ? "opacity-50 cursor-not-allowed" : ""
              } rounded-lg bg-transparent placeholder:text-gray-500 placeholder:font-medium text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#020267] focus:border-transparent transition-all duration-200`}
              {...register("email", {
                required: "Email is required!",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors?.email && (
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600">
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
                className={`w-full h-12 sm:h-14 md:h-16 lg:h-[60px] px-3 sm:px-4 py-3 pr-10 sm:pr-12 border-2 ${
                  errors.password ? "border-red-500" : "border-[#020267]"
                } ${
                  state.isLoading ? "opacity-50 cursor-not-allowed" : ""
                } rounded-lg bg-transparent placeholder:text-gray-500 placeholder:font-medium text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#020267] focus:border-transparent transition-all duration-200`}
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
                className="absolute cursor-pointer right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#020267] transition-colors disabled:opacity-50 disabled:cursor-not-allowed p-1"
              >
                {showPassword ? (
                  <FaEye size={16} className="sm:w-[18px] sm:h-[18px]" />
                ) : (
                  <FaEyeSlash size={16} className="sm:w-[18px] sm:h-[18px]" />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-xs sm:text-sm mt-1 sm:mt-2">
                {errors.password.message}
              </p>
            )}

            <div className="text-right mt-2 sm:mt-3">
              <button
                onClick={() => navigate("/resetpassword")}
                type="button"
                className="underline font-normal text-[#020267] text-xs sm:text-sm md:text-base lg:text-[17px] cursor-pointer hover:text-[#020267]/80 transition-colors leading-relaxed"
              >
                Forgot Password? Reset
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={state.isLoading}
            className={`w-full h-12 sm:h-14 md:h-[50px] lg:h-[58px] text-white rounded-md font-medium text-sm sm:text-base bg-[#020267] transition-all duration-200 ${
              state.isLoading
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:bg-[#020267]/90 hover:shadow-lg transform hover:-translate-y-0.5"
            }`}
          >
            {state.isLoading ? <MiniLoader /> : "Sign In"}
          </button>
        </form>

        <div className="mt-6 sm:mt-8 text-center">
          <button
            className="text-xs sm:text-sm md:text-base lg:text-[17px] text-[#969696] leading-relaxed cursor-pointer hover:text-[#969696]/80 transition-colors"
            onClick={() => navigate("/signup")}
          >
            Don't have an account?{" "}
            <span className="text-[#020267] hover:text-[#020267]/80 transition-colors font-medium">
              Sign up
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
