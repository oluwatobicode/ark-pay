import { useForm, type SubmitHandler } from "react-hook-form";
import { useAuth } from "../../contexts/AuthProvider";
import { useEffect } from "react";

interface UserFormData {
  FirstName: string;
  LastName: string;
  Email: string;
  Country: string;
  UserId: number | string;
  BankName: string;
  AccountNumber: number | string;
  AccountName: string;
}

const UserForm = ({
  FirstName = "",
  LastName = "",
  Email = "",
  Country = "",
  UserId = "",
  BankName = "",
  AccountName = "",
  AccountNumber = "",
}: Partial<UserFormData>) => {
  const { state } = useAuth();
  const userData = state.userData?.user;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormData>({
    defaultValues: {
      FirstName,
      LastName,
      Email,
      Country,
      UserId,
      BankName,
      AccountName,
      AccountNumber,
    },
  });

  useEffect(() => {
    console.log("useEffect triggered, userData:", userData);
    if (userData) {
      reset({
        FirstName: "",
        LastName: "",
        Email: userData.email || "",
        Country: userData.country || "",
        UserId: userData.id || "",
        BankName: userData.bankName || "",
        AccountName: userData.accountName || "",
        AccountNumber: userData.bankAccountNumber?.toString() || "",
      });
    } else {
      console.log("userData is null/undefined");
    }
  }, [userData, reset]);

  const onSubmit: SubmitHandler<UserFormData> = (data) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="px-[2rem] pt-[1rem]">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        User Information
      </h2>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row gap-[25px] flex-wrap">
          <div>
            <label
              htmlFor="FirstName"
              className="block text-sm text-gray-700 mb-2"
            >
              FirstName
            </label>
            <input
              id="FirstName"
              type="text"
              placeholder="Enter your first name"
              className="w-[450.5px] px-3 py-2 border border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("FirstName", {
                required: "First name is required",
                minLength: {
                  value: 2,
                  message: "First name must be at least 2 characters!",
                },
              })}
            />
            {errors.FirstName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.FirstName.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="LastName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Last Name
            </label>
            <input
              id="LastName"
              type="text"
              placeholder="Enter your last name"
              className="w-[450.5px]  px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              {...register("LastName", {
                required: "Last name is required!",
                minLength: {
                  value: 2,
                  message: "Last name must be at least 2 characters",
                },
              })}
            />
            {errors?.LastName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.LastName.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="Email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-[450.5px]  px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              id="Email"
              {...register("Email", {
                required: "Email is required!",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors?.Email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.Email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="Country"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Country
            </label>
            <input
              id="Country"
              type="text"
              placeholder="Country"
              className="w-[450.5px]  px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              {...register("Country", {
                required: "Country is required!",
                minLength: {
                  value: 2,
                  message: "Country must be at least 2 characters",
                },
              })}
            />
            {errors?.Country && (
              <p className="mt-1 text-sm text-red-600">
                {errors.Country.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="UserId"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              User Id
            </label>
            <input
              id="UserId"
              type="text"
              placeholder="Enter your User Id"
              className="w-[450.5px]  px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              {...register("UserId", {
                required: "User Id is required!",
                min: {
                  value: 1,
                  message: "User ID must be greater than 0",
                },
              })}
            />
            {errors?.UserId && (
              <p className="mt-1 text-sm text-red-600">
                {errors.UserId.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="BankName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Bank name
            </label>
            <input
              id="BankName"
              type="text"
              placeholder="Enter bank name"
              className="w-[450.5px]  px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              {...register("BankName", {
                required: "Bank name is required!",
                minLength: {
                  value: 1,
                  message: "BankName must be at least 2 characters",
                },
              })}
            />
            {errors?.BankName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.BankName.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="AccountNumber"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Account Number
            </label>
            <input
              id="AccountNumber"
              type="text"
              placeholder="Enter bank account"
              className="w-[450.5px]  px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              {...register("AccountNumber", {
                required: "Account number is required!",
                min: {
                  value: 1,
                  message: "Account number must be valid",
                },
              })}
            />
            {errors?.AccountNumber && (
              <p className="mt-1 text-sm text-red-600">
                {errors.AccountNumber.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="AccountName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Account Name
            </label>
            <input
              id="AccountName"
              type="text"
              placeholder="Enter account name"
              className="w-[450.5px]  px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              {...register("AccountName", {
                required: "Account name is required!",
              })}
            />
            {errors?.AccountName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.AccountName.message}
              </p>
            )}
          </div>

          <div className="ml-auto">
            <button
              type="submit"
              className="bg-[#020267] cursor-pointer text-white py-2 px-10 rounded-[4px] hover:bg-[#020267] focus:outline-none focus:ring-2 focus:ring-[#020267] focus:ring-offset-2 transition duration-200"
            >
              Edit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
