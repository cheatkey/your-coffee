import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./features/Home/pages";
import LoginPage from "./features/Auth/LoginPage";
import SignupPage from "./features/Auth/SignupPage";
import ProtectedRoute from "./features/Auth/ProtectedRoute";
import { Toaster } from "sonner";
import { ApolloProvider } from "@apollo/client";
import client from "./lib/apollo";
import DetailPage from "./features/Detail/DetailPage";
import RecommendPage from "./features/Recommend/RecommendPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "/detail/:id",
        element: <DetailPage />,
      },
      {
        path: "/recommend",
        element: <RecommendPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <Toaster />
      <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode>
);
