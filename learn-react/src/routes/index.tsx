import type { RouteObject } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";
import ProfilePage from "../pages/Profile";
import RegisterPage from "../pages/Register";
import Validate2faPage from "../pages/Validate2fa";

const authRoutes: RouteObject = {
  path: "*",
  children: [
    {
      path: "login",
      children: [
        {
          path: "",
          element: <LoginPage />,
        },
        {
          path: "validateOtp",
          element: <Validate2faPage />,
        },
      ],
    },
    {
      path: "register",
      element: <RegisterPage />,
    },
  ],
};

const normalRoutes: RouteObject = {
  path: "*",
  element: <Layout />,
  children: [
    {
      index: true,
      element: <HomePage />,
    },
    {
      path: "profile",
      element: <ProfilePage />,
    },
  ],
};

const routes: RouteObject[] = [authRoutes, normalRoutes];

export default routes;