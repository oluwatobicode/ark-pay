import React, {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from "react";

// const apiUrl = process.env.REACT_API_URL;

interface User {
  id: string;
  name: string;
  email: string;
  country: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  success: string | null;
}

interface SignUpData {
  name: string;
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
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  success: null,
};

type AuthAction =
  | { type: "AUTH_START" }
  | { type: "AUTH_SUCCESS"; payload: User }
  | { type: "AUTH_ERROR"; payload: string }
  | { type: "LOGOUT" }
  | { type: "CLEAR_ERROR" };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "AUTH_START":
      return {
        ...state,
        isLoading: true,
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
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (loginData: LoginData) => {
    dispatch({ type: "AUTH_START" });

    try {
      const response = await fetch(
        "https://arkpay.onrender.com/v1/api/auth/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log(data);

      if (data?.token) {
        localStorage.setItem("authToken", data.token);
      }

      dispatch({
        type: "AUTH_SUCCESS",
        payload: {
          id: "",
          name: "",
          email: loginData.email,
          country: "",
        },
      });

      return data.message || "There is a bug here!";
    } catch (error) {
      dispatch({
        type: "AUTH_ERROR",
        payload: error instanceof Error ? error.message : "Login failed",
      });
      throw error;
    }
  };

  //   SIGN UP FUNCTION
  const signup = async (signUpData: SignUpData) => {
    dispatch({ type: "AUTH_START" });

    try {
      const { confirmPassword, ...apiData } = signUpData;

      const response = await fetch(
        "https://arkpay.onrender.com/v1/api/auth/signup",
        {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify(apiData),
        }
      );

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      const data = await response.json();
      console.log(data);

      if (data.token) {
        localStorage.setItem("authToken", data.token);
      }

      dispatch({
        type: "AUTH_SUCCESS",
        payload: {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          country: data.user.country,
        },
      });
    } catch (error) {
      dispatch({
        type: "AUTH_ERROR",
        payload: "Signup failed",
      });
      throw error;
    }
  };

  //   logout
  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  //   for errors
  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  const value: AuthContextType = {
    state,
    login,
    signup,
    logout,
    clearError,
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
