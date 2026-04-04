import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import FundraiserPage from "./pages/FundraiserPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import CreateFundraiserPage from "./pages/CreateFundraiserPage.jsx";
import EditFundraiserPage from "./pages/EditFundraiserPage.jsx";
import CreateAccountPage from "./pages/CreateAccountPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import NavBar from "./components/NavBar.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
      path: "/",
      element: <NavBar />,
      children: [
          { path: "/", element: <HomePage /> },
          { path: "/login", element: <LoginPage /> },
          { path: "/signup", element: <CreateAccountPage /> },
          { path: "/fundraiser/:id", element: <FundraiserPage /> },
          { path: "/fundraiser/:id/edit", element: <EditFundraiserPage /> },
          { path: "/create-fundraiser", element: <CreateFundraiserPage /> },
          { path: "*", element: <NotFoundPage /> },
      ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     {/* Here we wrap our app in the router provider so they render */}
     <RouterProvider router={router} />
  </React.StrictMode>
);