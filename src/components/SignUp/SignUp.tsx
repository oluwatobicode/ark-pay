import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthProvider";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

interface signUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
}

function SignUp({
  firstName = "",
  lastName = "",
  email = "",
  password = "",
  confirmPassword = "",
  country = "",
}: Partial<signUpFormData>) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<signUpFormData>({
    defaultValues: {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      country,
    },
  });

  const { state, signup } = useAuth();
  const navigate = useNavigate();
  const Password = watch("password");

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const onSubmit: SubmitHandler<signUpFormData> = async (data) => {
    try {
      await signup(data);
      console.log(data);
      toast.success("Signup successful! Kindly log-in");
      navigate("/login");
    } catch (error) {
      toast.error(state.error);
    }
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <input
                id="firstName"
                type="firstName"
                placeholder="First name"
                className={`w-full max-w-[443px] px-4 py-3 border-2 ${
                  errors.firstName ? "border-red-500" : "border-[#020267]"
                } rounded-lg bg-transparent placeholder:text-gray-500 placeholder:font-medium text-base focus:outline-none focus:ring-2 focus:ring-[#020267] focus:border-transparent transition duration-200`}
                {...register("firstName", {
                  required: "Name is required!",
                  minLength: {
                    value: 2,
                    message: "Enter a name",
                  },
                })}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="mb-5">
              <input
                id="lastName"
                type="lastName"
                placeholder="Last Name"
                className={`w-full max-w-[443px] px-4 py-3 border-2 ${
                  errors.lastName ? "border-red-500" : "border-[#020267]"
                } rounded-lg bg-transparent placeholder:text-gray-500 placeholder:font-medium text-base focus:outline-none focus:ring-2 focus:ring-[#020267] focus:border-transparent transition duration-200`}
                {...register("lastName", {
                  required: "your last name is required!",
                  minLength: {
                    value: 2,
                    message: "Enter a last name",
                  },
                })}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.lastName.message}
                </p>
              )}
            </div>
            <div className="mb-5">
              <input
                id="email"
                type="email"
                placeholder="Enter your email address"
                className={`w-full max-w-[443px] px-4 py-3 border-2 ${
                  errors.password ? "border-red-500" : "border-[#020267]"
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
            <div className="mb-5">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter a password"
                  id="password"
                  className={`w-full max-w-[443px] px-4 py-3 border-2 ${
                    errors.password ? "border-red-500" : "border-[#020267]"
                  } rounded-lg bg-transparent placeholder:text-gray-500 placeholder:font-medium text-base focus:outline-none focus:ring-2 focus:ring-[#020267] focus:border-transparent transition duration-200`}
                  {...register("password", {
                    required: "Password is required!",
                    pattern: {
                      value: passwordRegex,
                      message:
                        "Password must be at least 8 characters, including uppercase, lowercase, number and special character",
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
            </div>
            <div className="mb-5">
              <div className="relative">
                <input
                  className={`w-full max-w-[443px] px-4 py-3 border-2 ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-[#020267]"
                  } rounded-lg bg-transparent placeholder:text-gray-500 placeholder:font-medium text-base focus:outline-none focus:ring-2 focus:ring-[#020267] focus:border-transparent transition duration-200`}
                  id="confirmPassword"
                  placeholder="Confirm password"
                  type={showPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === Password || "Passwords do not match",
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
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <div className="mb-5">
              <input
                id="country"
                type="text"
                placeholder="Country"
                className={`w-full max-w-[443px] px-4 py-3 border-2 ${
                  errors.country ? "border-red-500" : "border-[#020267]"
                } rounded-lg bg-transparent placeholder:text-gray-500 placeholder:font-medium text-base focus:outline-none focus:ring-2 focus:ring-[#020267] focus:border-transparent transition duration-200`}
                {...register("country", {
                  required: "Country is required!",
                  minLength: {
                    value: 2,
                    message: "Country must be at least 2 characters",
                  },
                })}
              />
              {errors?.country && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.country.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={Object.keys(errors).length > 0}
              className="cursor-pointer w-[443px] h-[50px] text-textColorSec bg-[#020267] text-white font-medium rounded-md text-[16px]"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-[30px] text-center">
            <button
              onClick={() => navigate("/login")}
              className="text-[14px] text-[#969696] text-center leading-[100%] cursor-pointer"
            >
              Have an account? <span className="text-[#020267]">Log in</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
