import axios, { AxiosError } from "axios";
import { createContext, useContext, useReducer, type ReactNode } from "react";

interface Metrics {
  totalTransactions: number;
  totalAmountProcessed: number;
  completedPayouts: number;
}

interface Transaction {
  _id: string;
  orderId: string;
  amount: number;
  rate: number;
  token: string;
  network: string;
  receiveAddress: string;
  validUntil: string;
  createdAt?: string;
}

interface TransactionsResponse {
  userTransactions: Transaction[];
}

interface UserDataState {
  metrics: Metrics | null;
  transactions: TransactionsResponse | null;
  apiKey: string | null;
  isLoading: boolean;
  error: string | null;
  payoutCurrency: string | null;
  updatedUserData: UpdateUserData | null;
}

interface UpdateCurrencyData {
  payoutCurrency: string;
}

interface UpdateUserData {
  FirstName?: string;
  LastName?: string;
  Email?: string;
  Country?: string;
  BankName?: string;
  AccountName?: string;
  AccountNumber?: string;
  UserId?: string;
}

interface UserDataContextType {
  state: UserDataState;
  getMetrics: () => Promise<void>;
  getRecentTransactions: () => Promise<void>;
  updatePayout: (data: UpdateCurrencyData) => Promise<void>;
  resetApiKey: () => Promise<void>;
  updateUser: (data: Partial<UpdateUserData>) => Promise<void>;
  clearError: () => void;
}

type UserDataAction =
  | { type: "SET_PAYOUT_CURRENCY"; payLoad: string }
  | { type: "SET_LOADING"; payLoad: boolean }
  | { type: "SET_UPDATED_USER"; payLoad: UpdateUserData }
  | { type: "SET_METRICS"; payLoad: Metrics }
  | { type: "SET_API_KEY"; payLoad: string }
  | { type: "SET_TRANSACTIONS"; payLoad: TransactionsResponse }
  | { type: "SET_ERROR"; payLoad: string }
  | { type: "CLEAR_ERROR" }
  | { type: "UPDATE_USER_SUCCESS" };

const initialState: UserDataState = {
  metrics: null,
  transactions: null,
  apiKey: null,
  isLoading: false,
  error: null,
  updatedUserData: null,
  payoutCurrency: null,
};

const userDataReducer = (
  state: UserDataState,
  action: UserDataAction
): UserDataState => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payLoad,
        error: action.payLoad ? null : state.error,
      };

    case "SET_METRICS":
      return {
        ...state,
        metrics: action.payLoad,
        isLoading: false,
        error: null,
      };

    case "SET_TRANSACTIONS":
      return {
        ...state,
        transactions: action.payLoad,
        isLoading: false,
        error: null,
      };

    case "SET_API_KEY":
      return {
        ...state,
        apiKey: action.payLoad,
        isLoading: false,
        error: null,
      };

    case "SET_UPDATED_USER":
      return {
        ...state,
        updatedUserData: action.payLoad,
        isLoading: false,
        error: null,
      };

    case "SET_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payLoad,
      };

    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };

    case "SET_PAYOUT_CURRENCY":
      return {
        ...state,
        isLoading: false,
        payoutCurrency: action.payLoad,
      };

    case "UPDATE_USER_SUCCESS":
      return {
        ...state,
        isLoading: false,
        error: null,
      };

    default:
      return state;
  }
};

const UserDataContext = createContext<UserDataContextType | undefined>(
  undefined
);

export const UserDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(userDataReducer, initialState);

  const axiosInstance = axios.create({
    baseURL: "https://arkpay.onrender.com/v1/api",
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });

  const getMetrics = async () => {
    dispatch({ type: "SET_LOADING", payLoad: true });
    try {
      const response = await axiosInstance.get("/dashboard/");

      if (response) {
        console.log(response.data);
        dispatch({ type: "SET_METRICS", payLoad: response.data });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: "SET_ERROR",
        payLoad:
          error instanceof Error ? error.message : "Failed to fetch metrics",
      });
      throw new Error("Failed to load metrics data");
    }
  };

  const getRecentTransactions = async () => {
    dispatch({ type: "SET_LOADING", payLoad: true });

    try {
      const response = await axiosInstance.get("transactions/");
      if (response.data) {
        dispatch({ type: "SET_TRANSACTIONS", payLoad: response.data });
        console.log("transactions are being fetched!");
        console.log(response.data);
      } else {
        console.log(
          "Invalid data format received for transactions",
          response.data
        );
      }
    } catch (error) {
      const err = error as AxiosError<{ error?: string }>;
      console.log(err);
    }
  };

  const resetApiKey = async () => {
    dispatch({ type: "SET_LOADING", payLoad: true });
    try {
      const response = await axiosInstance.post("/wallets/generate-api-key");

      if (response.data) {
        console.log(response);
        dispatch({ type: "SET_API_KEY", payLoad: response.data.message });
      } else {
        throw new Error("No data received from server");
      }
    } catch (error) {
      const err = error as AxiosError<{ error?: string }>;
      console.log("API Key reset error:", err);
      const errorMessage =
        err.response?.data?.error ||
        err.message ||
        "Failed to generate API key";
      dispatch({ type: "SET_ERROR", payLoad: errorMessage });
      throw error;
    }
  };

  const updatePayout = async (data: UpdateCurrencyData) => {
    dispatch({ type: "SET_LOADING", payLoad: true });
    try {
      const response = await axiosInstance.post("/payout/update", data);

      if (response.data) {
        console.log(response);
        dispatch({ type: "SET_PAYOUT_CURRENCY", payLoad: data.payoutCurrency });
      } else {
        throw new Error("There is an error");
      }
    } catch (error) {
      const err = error as AxiosError<{ error?: string }>;
      console.log("error over here!");
      const errorMessage =
        err.response?.data?.error ||
        err.message ||
        "Failed to update the currency!";
      dispatch({ type: "SET_ERROR", payLoad: errorMessage });
      throw error;
    }
  };

  const updateUser = async (userData: Partial<UpdateUserData>) => {
    dispatch({ type: "SET_LOADING", payLoad: true });

    try {
      // Field mapping from form fields to API fields
      const fieldMapping: Record<keyof UpdateUserData, string> = {
        FirstName: "firstName",
        LastName: "lastName",
        Email: "email",
        Country: "country",
        BankName: "bankName",
        AccountName: "accountName",
        AccountNumber: "bankAccountNumber",
        UserId: "userId", // Add this if needed by your API
      };

      // Only include fields that have values (not undefined)
      const apiData: Record<string, any> = {};

      Object.entries(userData).forEach(([key, value]) => {
        if (value !== undefined) {
          const apiFieldName = fieldMapping[key as keyof UpdateUserData];
          if (apiFieldName) {
            apiData[apiFieldName] = value;
          }
        }
      });

      console.log("Sending user data to API:", apiData);

      const response = await axiosInstance.post("/user/update-user", apiData);

      if (response.data) {
        console.log("User updated successfully:", response.data);
        dispatch({ type: "UPDATE_USER_SUCCESS" });
      } else {
        throw new Error("There was an error updating your profile!");
      }
    } catch (error) {
      const err = error as AxiosError<{ error?: string }>;
      console.error("Update user error:", err);
      const errMessage =
        err.response?.data?.error ||
        err.message ||
        "Failed to update your profile!";
      dispatch({ type: "SET_ERROR", payLoad: errMessage });
      throw error;
    }
  };

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  const value: UserDataContextType = {
    state,
    getMetrics,
    getRecentTransactions,
    updatePayout,
    updateUser,
    resetApiKey,
    clearError,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = (): UserDataContextType => {
  const context = useContext(UserDataContext);

  if (context === undefined) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }

  return context;
};
