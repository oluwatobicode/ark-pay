import { useForm, type SubmitHandler } from "react-hook-form";
import { useAuth } from "../../contexts/AuthProvider";
import { useEffect, useState } from "react";
import { useUserData } from "../../contexts/UserDataProvider";
import toast from "react-hot-toast";

interface UserFormData {
  FirstName: string;
  LastName: string;
  Email: string;
  Country: string;
  UserId: string;
  BankName: string;
  AccountNumber: string;
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
  const { updateUser } = useUserData();
  const userData = state.userData?.user;

  const [hasChanges, setHasChanges] = useState(false);
  const [originalData, setOriginalData] = useState<Partial<UserFormData>>({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
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

  const watchedFields = watch();

  useEffect(() => {
    console.log("useEffect triggered, userData:", userData);
    if (userData) {
      const formData = {
        FirstName: userData.firstName || "",
        LastName: userData.lastName || "",
        Email: userData.email || "",
        Country: userData.country || "",
        UserId: userData.id?.toString() || "",
        BankName: userData.bankName || "",
        AccountName: userData.accountName || "",
        AccountNumber: userData.bankAccountNumber?.toString() || "",
      };

      reset(formData);
      setOriginalData(formData);
    } else {
      console.log("userData is null/undefined");
    }
  }, [userData, reset]);

  useEffect(() => {
    if (Object.keys(originalData).length > 0) {
      const hasFormChanges = Object.keys(watchedFields).some(
        (key) =>
          watchedFields[key as keyof UserFormData] !==
          originalData[key as keyof UserFormData]
      );
      setHasChanges(hasFormChanges);
    }
  }, [watchedFields, originalData]);

  const onSubmit: SubmitHandler<UserFormData> = async (data) => {
    console.log("Form submitted with data:", data);
    console.log("Original data:", originalData);
    console.log("Has changes:", hasChanges);

    if (hasChanges) {
      const changedFields = Object.keys(data).reduce((changes, key) => {
        const fieldKey = key as keyof UserFormData;
        if (data[fieldKey] !== originalData[fieldKey]) {
          changes[fieldKey] = data[fieldKey];
        }
        return changes;
      }, {} as Partial<UserFormData>);

      console.log("Changed fields:", changedFields);

      try {
        await updateUser(changedFields);

        setOriginalData(data);
        setHasChanges(false);

        toast.success("User data updated successfully!");
      } catch (error) {
        toast.error("Error updating user data");
      }
    } else {
      toast.error("No changes to save");
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-4 max-w-7xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">
        User Information
      </h2>

      <form
        className="space-y-4 sm:space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          <div className="col-span-1">
            <label
              htmlFor="FirstName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              First Name
            </label>
            <input
              id="FirstName"
              type="text"
              placeholder="Enter your first name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

          <div className="col-span-1">
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

          <div className="col-span-1">
            <label
              htmlFor="Email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

          <div className="col-span-1">
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

          <div className="col-span-1">
            <label
              htmlFor="UserId"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              User ID
            </label>
            <input
              id="UserId"
              type="text"
              placeholder="Enter your User ID"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              {...register("UserId", {
                required: "User ID is required!",
              })}
            />
            {errors?.UserId && (
              <p className="mt-1 text-sm text-red-600">
                {errors.UserId.message}
              </p>
            )}
          </div>

          <div className="col-span-1">
            <label
              htmlFor="BankName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Bank Name
            </label>
            <input
              id="BankName"
              type="text"
              placeholder="Enter bank name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              {...register("BankName", {
                required: "Bank name is required!",
                minLength: {
                  value: 2,
                  message: "Bank name must be at least 2 characters",
                },
              })}
            />
            {errors?.BankName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.BankName.message}
              </p>
            )}
          </div>

          <div className="col-span-1">
            <label
              htmlFor="AccountNumber"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Account Number
            </label>
            <input
              id="AccountNumber"
              type="text"
              placeholder="Enter account number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              {...register("AccountNumber", {
                required: "Account number is required!",
              })}
            />
            {errors?.AccountNumber && (
              <p className="mt-1 text-sm text-red-600">
                {errors.AccountNumber.message}
              </p>
            )}
          </div>

          <div className="col-span-1">
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={!hasChanges}
            className={`py-2 px-6 sm:px-8 lg:px-10 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-200 text-sm sm:text-base ${
              hasChanges
                ? "bg-[#020267] hover:bg-[#020267] text-white cursor-pointer focus:ring-[#020267]"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {hasChanges ? "Save Changes" : "Edit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
