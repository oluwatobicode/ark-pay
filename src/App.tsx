import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";
import LogIn from "./pages/LogIn";
import UserSignUp from "./pages/UserSignUp";
import Home from "./pages/Home";
import AppLayout from "./ui/AppLayout";
import ProtectedRoutes from "./ui/ProtectedRoutes";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Documentation from "./pages/Documentation";
import Settings from "./pages/Settings";
import User from "./pages/User";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 8000,
          },
          error: {
            duration: 8000,
          },
          style: {
            background: "#020267",
            color: "#FFFFFF",
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/resetpassword" element={<ResetPassword />} />

        <Route
          element={
            <ProtectedRoutes>
              <AppLayout />
            </ProtectedRoutes>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user" element={<User />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
