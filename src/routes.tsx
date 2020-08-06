import React from "react";
import LoginPage from "./components/Pages/LoginPage/LoginPage";
import ComputersPage from "./components/Pages/ComputersPage/ComputersPage";
import ComputerDetailsPage from "./components/Pages/ComputerDetailsPage/ComputerDetailsPage";

const routes = [
  {
    path: "/",
    page: <LoginPage />,
  },
  {
    path: "/computers",
    page: <ComputersPage />,
  },
  {
    path: "/computers/:computerId",
    page: <ComputerDetailsPage />,
  },
];

export default routes;
