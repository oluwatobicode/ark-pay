import { useNavigate } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useResetPassword } from "../../contexts/ResetPasswordProvider";
import toast from "react-hot-toast";

interface UserResetData {
  email: string;
}

const UserVerifyEmail = () => {
  const navigate = useNavigate();
  const { email, setEmail, goToNextStep, isLoading, setIsLoading } =
    useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserResetData>({
    defaultValues: {
      email,
    },
  });

  const onSubmit: SubmitHandler<UserResetData> = async (formData) => {
    setEmail(formData.email);
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://arkpay.onrender.com/v1/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email: formData.email }),
        }
      );

      const responseData = await response.json();
      console.log(responseData);

      if (!response.ok) {
        toast.error(responseData.message || "Failed to send reset email");
        throw new Error(responseData.message || "Failed to send reset email");
      }

      toast.success(
        `Reset instructions sent to your email, Please check your inbox.`
      );
      goToNextStep();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center">
          <div className="cursor-pointer" onClick={() => navigate("/")}>
            <img src="/ArkPay.png" className="w-[200px]" alt="ArkPay Logo" />
          </div>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-gray-900">
            Reset Password
          </h1>
          <p className="text-sm font-medium text-gray-600">
            Enter your email to reset password
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              id="email"
              type="email"
              placeholder="Email"
              disabled={isLoading}
              className={`w-full max-w-[433px] px-4 py-3 border-2 ${
                errors.email ? "border-red-500" : "border-[#020267]"
              } rounded-lg bg-transparent placeholder:text-gray-500 placeholder:font-medium text-base focus:outline-none focus:ring-2 focus:ring-[#020267] focus:border-transparent transition duration-200 disabled:opacity-50`}
              {...register("email", {
                required: "An email is required!",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading || Object.keys(errors).length > 0}
              className="w-full max-w-[433px] cursor-pointer bg-[#020267] text-white font-medium py-3 px-4 rounded-lg hover:bg-[#030299] focus:outline-none focus:ring-2 focus:ring-[#020267] focus:ring-offset-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Sending..." : "Next"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserVerifyEmail;
