import { BrowserRouter, Route, Routes } from "react-router";
import LogIn from "./pages/LogIn";
import UserSignUp from "./pages/UserSignUp";
import Home from "./pages/Home";
import VerifyUser from "./pages/VerifyUser";
import AppLayout from "./ui/AppLayout";
import ProtectedRoutes from "./ui/ProtectedRoutes";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Documentation from "./pages/Documentation";
import Settings from "./pages/Settings";
import User from "./pages/User";
import ResetPassword from "./pages/ResetPassoword";
import NewPassword from "./pages/NewPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/otp" element={<VerifyUser />} />
        <Route path="/verifyemail" element={<ResetPassword />} />
        <Route path="/resetpassword" element={<NewPassword />} />
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
