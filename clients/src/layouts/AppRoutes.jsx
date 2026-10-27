import { Routes, Route } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import NotFound from "../pages/not-found/NotFound";
import DashboardLayout from "./DashboardLayout";
import Inventory from "../pages/dashboard/Inventory";
import Overview from "../pages/dashboard/Overview";
import Categories from "../pages/dashboard/Categories";


export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Overview />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="categories" element={<Categories />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}