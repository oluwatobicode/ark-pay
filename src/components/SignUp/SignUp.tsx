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
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
    <div className="min-h-screen">
      <div className="container mt-5 mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="flex justify-center mb-6 sm:mb-12">
          <div
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => navigate("/")}
          >
            <img
              src="/ArkPay.png"
              className="h-7 sm:h-16 md:h-10 w-auto"
              alt="ArkPay Logo"
            />
          </div>
        </div>

        <div className="max-w-md mx-auto lg:max-w-lg xl:max-w-xl">
          <div className="text-center mb-3 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#020267] mb-3 sm:mb-4">
              Sign up
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-[#000]">
              Create an account with{" "}
              <span className="font-bold text-[#020267]">ArkPay</span>
            </p>
          </div>

          {/* Form Card */}
          <div className="p-3 sm:p-8 lg:p-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <input
                    id="firstName"
                    type="text"
                    placeholder="First name"
                    className={`w-full h-12 sm:h-14 px-4 py-3 border-2 border-[#020267] rounded-xl bg-white transition-all duration-200 text-sm sm:text-base
                      ${
                        errors.firstName
                          ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                          : "border-[#020267] focus:border-[#020267] focus:ring-blue-100 hover:border-gray-300"
                      } 
                      placeholder:text-gray-400 focus:outline-none focus:ring-4`}
                    {...register("firstName", {
                      required: "First name is required",
                      minLength: {
                        value: 2,
                        message: "First name must be at least 2 characters",
                      },
                      pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message: "First name can only contain letters",
                      },
                    })}
                  />
                  {errors.firstName && (
                    <p className="mt-2 text-xs sm:text-sm text-red-600 flex items-center">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Last name"
                    className={`w-full border-2 h-12 sm:h-14 px-4 py-3 rounded-xl bg-white transition-all duration-200 text-sm sm:text-base
                      ${
                        errors.lastName
                          ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                          : "border-[#020267] focus:border-[#020267] focus:ring-blue-100 hover:border-gray-300"
                      } 
                      placeholder:text-gray-400 focus:outline-none focus:ring-4`}
                    {...register("lastName", {
                      required: "Last name is required",
                      minLength: {
                        value: 2,
                        message: "Last name must be at least 2 characters",
                      },
                      pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message: "Last name can only contain letters",
                      },
                    })}
                  />
                  {errors.lastName && (
                    <p className="mt-2 text-xs sm:text-sm text-red-600 flex items-center">
                      <span className="mr-1">⚠</span>
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  className={`w-full h-12 sm:h-14 px-4 py-3 border-2 rounded-xl bg-white transition-all duration-200 text-sm sm:text-base
                    ${
                      errors.email
                        ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                        : "border-[#020267] focus:border-[#020267] focus:ring-blue-100 hover:border-gray-300"
                    } 
                    placeholder:text-gray-400 focus:outline-none focus:ring-4`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="mt-2 text-xs sm:text-sm text-red-600 flex items-center">
                    <span className="mr-1">⚠</span>
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter a password"
                    id="password"
                    className={`w-full h-12 sm:h-14 px-4 py-3 pr-12 border-2 rounded-xl bg-white transition-all duration-200 text-sm sm:text-base
                      ${
                        errors.password
                          ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                          : "border-[#020267] focus:border-[#020267] focus:ring-blue-100 hover:border-gray-300"
                      } 
                      placeholder:text-gray-400 focus:outline-none focus:ring-4`}
                    {...register("password", {
                      required: "Password is required",
                      pattern: {
                        value: passwordRegex,
                        message:
                          "Password must be at least 8 characters with uppercase, lowercase, number and special character",
                      },
                    })}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    disabled={state.isLoading}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#020267] transition-colors p-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {showPassword ? (
                      <FaEye size={18} />
                    ) : (
                      <FaEyeSlash size={18} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-xs sm:text-sm text-red-600 flex items-start">
                    <span className="mr-1 mt-0.5">⚠</span>
                    <span className="flex-1">{errors.password.message}</span>
                  </p>
                )}
              </div>

              <div>
                <div className="relative">
                  <input
                    className={`w-full h-12 sm:h-14 px-4 py-3 pr-12 border-2 rounded-xl bg-white transition-all duration-200 text-sm sm:text-base
                      ${
                        errors.confirmPassword
                          ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                          : "border-[#020267] focus:border-[#020267] focus:ring-blue-100 hover:border-gray-300"
                      } 
                      placeholder:text-gray-400 focus:outline-none focus:ring-4`}
                    id="confirmPassword"
                    placeholder="Confirm password"
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === Password || "Passwords do not match",
                    })}
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    disabled={state.isLoading}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#020267] transition-colors p-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {showConfirmPassword ? (
                      <FaEye size={18} />
                    ) : (
                      <FaEyeSlash size={18} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-2 text-xs sm:text-sm text-red-600 flex items-center">
                    <span className="mr-1">⚠</span>
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  id="country"
                  type="text"
                  placeholder="Enter your country"
                  className={`w-full h-12 sm:h-14 px-4 py-3 border-2 rounded-xl bg-white transition-all duration-200 text-sm sm:text-base
                    ${
                      errors.country
                        ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                        : "border-[#020267] focus:border-[#020267] focus:ring-blue-100 hover:border-gray-300"
                    } 
                    placeholder:text-gray-400 focus:outline-none focus:ring-4`}
                  {...register("country", {
                    required: "Country is required",
                    minLength: {
                      value: 2,
                      message: "Country must be at least 2 characters",
                    },
                  })}
                />
                {errors.country && (
                  <p className="mt-2 text-xs sm:text-sm text-red-600 flex items-center">
                    <span className="mr-1">⚠</span>
                    {errors.country.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={state.isLoading || Object.keys(errors).length > 0}
                className="w-full h-12 sm:h-14 bg-[#020267] hover:bg-[#020267]/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl text-sm sm:text-base transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-200 shadow-lg hover:shadow-xl"
              >
                {state.isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-8 text-center">
              <button
                onClick={() => navigate("/login")}
                className="text-sm sm:text-base text-gray-600 hover:text-[#020267] transition-colors duration-200"
              >
                Already have an account?{" "}
                <span className="font-semibold text-[#020267] hover:underline">
                  Log in
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
