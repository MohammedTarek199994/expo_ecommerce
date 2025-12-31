import {
  SignedIn,
  SignedOut,
  SignInButton,
  useAuth,
  UserButton,
} from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./lib/axios";
import { Navigate, Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProductsPage from "./pages/ProductsPage";
import OrdersPage from "./pages/OrdersPage";
import CustomerPage from "./pages/CustomersPage";
import DashboardLayout from "./layout/DashboardLayout";
import CustomersPage from "./pages/CustomersPage";
import { LoaderIcon } from "lucide-react";
function App() {
  const { isSignedIn, isLoaded } = useAuth(); // Replace with actual authentication logic
  console.log("isSignedIn ::", isSignedIn);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderIcon className="animate-spin size-12" />
      </div>
    );
  }
  return (
    <Routes>
      <Route
        path="/login"
        element={isSignedIn ? <Navigate to="/dashboard" /> : <LoginPage />}
      />
      <Route
        path="/"
        element={isSignedIn ? <DashboardLayout /> : <Navigate to="/login" />}
      >
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="customers" element={<CustomersPage />} />
      </Route>
    </Routes>
  );
}

export default App;
