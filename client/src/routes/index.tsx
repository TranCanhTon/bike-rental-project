import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "@/pages/auth/login/login";
import { BikePage } from "@/pages/bike/bike";
import { BikeDetailPage } from "@/pages/bike/components/bike-detail-page";
import { RegisterPage } from "@/pages/auth/register/register";
import { CreateBikePage } from "@/pages/bike/components/create-bike-page";
import { EditBikePage } from "@/pages/bike/components/edit-bike-page";
import { ProfilePage } from "@/pages/profile/profile";
import { VerifyEmail } from "@/pages/auth/verify-email/verify-email";
import { ChangePasswordPage } from "@/pages/profile/change-password";
import { ForgotPassword } from "@/pages/auth/forgot-password/forgot-password";
import { ResetPassword } from "@/pages/auth/forgot-password/reset-password";
import { CheckOutPage } from "@/pages/bike/components/checkout-page";
import { Layout } from "@/layout";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/checkout" element={<CheckOutPage />} />
      <Route element={<Layout />}>
        <Route path="/bikes/:id" element={<BikeDetailPage />} />
        <Route path="/bikes/:id/edit" element={<EditBikePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route
          path="/profile/change-password"
          element={<ChangePasswordPage />}
        />
        <Route path="/bikes" element={<BikePage />} />
        <Route path="/bikes/new" element={<CreateBikePage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
