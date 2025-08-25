import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./page/login/Login";
import Unauthorized from "./page/login/Unauthorized";
import Layout from "./component/Layout";
import ErrorPage from "./page/errorPage/ErrorPage";
import AdminDashboard from "./page/admin/AdminDashboard";
import VenderDashboard from "./page/vender/VenderDashboard";
import CompanyDashboard from "./page/company/CompanyDashboard";
import ProtectedRoute from "./component/ProtectedRoute";
import Register from "./page/login/Register";
import FAQ from "./page/faq/FAQ";
import Category from "./page/category/Category";
import Review from "./page/review/Review";
import Service from "./page/service/Service";
import Subcategory from "./page/subcategory/Subcategory";
import Products from "./page/product/Products";
import AdminHome from "./page/admin/AdminHome";
import EyeCheck from "./page/eyeCheck/Eyecheck";

function App() {
  return (
    <Routes>
      {/* ---------- public routes ---------- */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/register"
        element={
          <Register />
        }
      />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* ---------- protected layout ---------- */}
      <Route element={<Layout />}>
        {/* ------------ admin ------------ */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<AdminHome />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="category" element={<Category />} />
          <Route path="subCategory" element={<Subcategory />} />
          <Route path="product" element={<Products />} />
          <Route path="review" element={<Review />} />
          <Route path="service" element={<Service />} />
          <Route path="eyeCheck" element={<EyeCheck />} />
        </Route>

        <Route
          path="/vender-dashboard"
          element={
            <ProtectedRoute allowedRoles={["vender"]}>
              <VenderDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company-dashboard"
          element={
            <ProtectedRoute allowedRoles={["company"]}>
              <CompanyDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <ErrorPage />
          }
        />
      </Route>
    </Routes>




  );
}

export default App;

