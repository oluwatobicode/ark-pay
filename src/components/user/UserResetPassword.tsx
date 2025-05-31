import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { useResetPassword } from "../../contexts/ResetPasswordProvider";
import toast from "react-hot-toast";

interface ResetPasswordData {
  Password: string;
  confirmPassword: string;
}

const UserResetPassword = () => {
  const navigate = useNavigate();
  const { email, otp, resetFlow, isLoading, setIsLoading } = useResetPassword();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordData>({
    defaultValues: {
      Password: "",
      confirmPassword: "",
    },
  });

  // Watch the password field to compare with confirm password
  const password = watch("Password");

  const onSubmit: SubmitHandler<ResetPasswordData> = async (data) => {
    try {
      setIsLoading(true);
      console.log("Resetting password for:", email, "with OTP:", otp);

      const response = await fetch(
        "https://arkpay.onrender.com/v1/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: email,
            code: otp,
            newPassword: data.Password,
          }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to reset password");
      }

      // Show success message
      toast.success("Password reset successfully!");
      // Reset the flow and navigate to login
      resetFlow();
      navigate("/login");
    } catch (error) {
      console.error("Failed to reset password:", error);
      toast.error("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Password validation regex
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center">
          <div className="cursor-pointer" onClick={() => navigate("/")}>
            <img src="/ArkPay.png" className="w-[200px]" alt="ArkPay Logo" />
          </div>
        </div>

        <div className="text-center space-y-1">
          <h1 className="text-[30px] font-semibold text-gray-900">
            Reset Password
          </h1>
          <p className="text-[17px] font-medium text-gray-600">
            Enter a new password for {email}
          </p>
        </div>

        <form
          className="flex flex-col gap-[10px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <input
              type="password"
              placeholder="New password"
              id="Password"
              disabled={isLoading}
              {...register("Password", {
                required: "Password is required",
                pattern: {
                  value: passwordRegex,
                  message:
                    "Password must contain at least 8 characters, including uppercase, lowercase, number and special character",
                },
              })}
              className={`w-full max-w-[433px] px-4 py-3 border-2 ${
                errors.Password ? "border-red-500" : "border-[#020267]"
              } rounded-lg bg-transparent placeholder:text-gray-500 placeholder:font-medium text-base focus:outline-none focus:ring-2 focus:ring-[#020267] focus:border-transparent transition duration-200 disabled:opacity-50`}
            />
            {errors.Password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.Password.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirm password"
              id="confirmPassword"
              disabled={isLoading}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className={`w-full max-w-[433px] px-4 py-3 border-2 ${
                errors.confirmPassword ? "border-red-500" : "border-[#020267]"
              } rounded-lg bg-transparent placeholder:text-gray-500 placeholder:font-medium text-base focus:outline-none focus:ring-2 focus:ring-[#020267] focus:border-transparent transition duration-200 disabled:opacity-50`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Password Requirements */}
          <div className="text-sm text-gray-600 bg-gray-100 p-3 rounded-lg">
            <p className="font-medium mb-2">Password must contain:</p>
            <ul className="space-y-1">
              <li
                className={`${
                  password && /[a-z]/.test(password)
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                ✓ At least one lowercase letter
              </li>
              <li
                className={`${
                  password && /[A-Z]/.test(password)
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                ✓ At least one uppercase letter
              </li>
              <li
                className={`${
                  password && /\d/.test(password)
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                ✓ At least one number
              </li>
              <li
                className={`${
                  password && /[@$!%*?&]/.test(password)
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                ✓ At least one special character (@$!%*?&)
              </li>
              <li
                className={`${
                  password && password.length >= 8
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                ✓ At least 8 characters long
              </li>
            </ul>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading || Object.keys(errors).length > 0}
              className="w-full max-w-[433px] cursor-pointer bg-[#020267] text-white font-medium py-3 px-4 rounded-lg hover:bg-[#030299] focus:outline-none focus:ring-2 focus:ring-[#020267] focus:ring-offset-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Resetting..." : "Confirm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserResetPassword;
