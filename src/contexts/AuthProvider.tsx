import React, {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from "react";
import axios, { AxiosError } from "axios";

interface User {
  id?: string;
  name?: string;
  email?: string;
  country?: string;
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

interface ApiUsage {
  dates: { [date: string]: number };
  totalCalls: number;
}

interface UserData {
  user: {
    id: string;
    email: string;
    country: string;
    bankName: string | null;
    accountName: string | null;
    bankAccountNumber: number | null;
    firstName?: string | null;
    lastName?: string | null;
    institutionCode: string | null;
    apiUsage: ApiUsage;
    transactions: Transaction[];
  };
}

interface AuthState {
  user: User | null;
  userData: UserData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  success: string | null;
}

interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthContextType {
  state: AuthState;
  login: (loginData: LoginData) => Promise<void>;
  signup: (signUpData: SignUpData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  checkAuthStatus: () => Promise<void>;
}

const initialState: AuthState = {
  user: null,
  userData: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  success: null,
};

type AuthAction =
  | { type: "AUTH_START" }
  | { type: "AUTH_SUCCESS"; payload: User }
  | { type: "AUTH_USER_DATA"; payload: UserData }
  | { type: "AUTH_ERROR"; payload: string }
  | { type: "LOGOUT" }
  | { type: "CLEAR_ERROR" };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, isLoading: true, error: null };
    case "AUTH_USER_DATA":
      return {
        ...state,
        isLoading: false,
        userData: action.payload,
        error: null,
      };
    case "AUTH_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case "AUTH_ERROR":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const axiosInstance = axios.create({
    baseURL: "https://arkpay.onrender.com/v1/api",
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });

  const login = async (loginData: LoginData) => {
    dispatch({ type: "AUTH_START" });
    try {
      const response = await axiosInstance.post("/auth/signin", loginData);
      console.log("Login response:", response.data);

      dispatch({
        type: "AUTH_SUCCESS",
        payload: {
          email: response.data.user?.email || loginData.email,
        },
      });

      try {
        const userDataResponse = await axiosInstance.get("/auth/me");
        console.log("User data response:", userDataResponse.data);
        if (userDataResponse.data) {
          dispatch({ type: "AUTH_USER_DATA", payload: userDataResponse.data });
        }
      } catch (userDataError) {
        console.error("Failed to fetch user data after login:", userDataError);
      }
    } catch (error) {
      const err = error as AxiosError<{ error?: string }>;
      const errorMessage = err.response?.data?.error || "Login failed";
      dispatch({ type: "AUTH_ERROR", payload: errorMessage });
      throw error;
    }
  };

  const signup = async (signUpData: SignUpData) => {
    dispatch({ type: "AUTH_START" });
    try {
      const { confirmPassword, ...apiData } = signUpData;
      const response = await axiosInstance.post("/auth/signup", apiData);
      dispatch({
        type: "AUTH_SUCCESS",
        payload: {
          id: response.data.user.id,
          name: response.data.user.name,
          email: response.data.user.email,
          country: response.data.user.country,
        },
      });
    } catch (error) {
      const err = error as AxiosError<{ error?: string }>;
      const errorMessage = err.response?.data?.error || "Signup failed";
      dispatch({ type: "AUTH_ERROR", payload: errorMessage });
      throw error;
    }
  };

  const logout = async () => {
    try {
      const response = await axiosInstance.post("/auth/signout");
      console.log("Logout response:", response.data);
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.error("Logout error:", error);
      dispatch({ type: "LOGOUT" });
    }
  };

  const checkAuthStatus = async () => {
    if (state.isAuthenticated || state.isLoading) return;
    dispatch({ type: "AUTH_START" });
    try {
      console.log("Checking auth status...");
      const response = await axiosInstance.get("/auth/me");
      console.log("Auth check response:", response.status, response.data);

      if (response.data) {
        console.log(response.data);
        dispatch({ type: "AUTH_USER_DATA", payload: response.data });
      } else {
        console.log("Invalid user data structure:", response.data);
      }
    } catch (error) {
      const err = error as AxiosError<{ error?: string }>;
      console.error(
        "Auth check error:",
        err.response?.status,
        err.response?.data
      );
      if (err.response?.status === 401 || err.response?.status === 403) {
        // dispatch({ type: "LOGOUT" });
        console.log("hi");
      } else {
        dispatch({
          type: "AUTH_ERROR",
          payload:
            err.response?.data?.error || "Unable to verify authentication.",
        });
      }
    }
  };

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  const value: AuthContextType = {
    state,
    login,
    signup,
    logout,
    clearError,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("It must be used within the context API");
  }
  return context;
};
