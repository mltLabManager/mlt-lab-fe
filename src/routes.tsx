import React from "react";
import LoginPage from "./components/Pages/LoginPage/LoginPage";
import ComputersPage from "./components/Pages/ComputersPage/ComputersPage";
import ComputerDetailsPage from "./components/Pages/ComputerDetailsPage/ComputerDetailsPage";
import DeliveryPage from "./components/Pages/DeliveryPage/DeliveryPage";
import Test from "./components/Pages/Barcode/Test";

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
  {
    path: "/delivery",
    page: <DeliveryPage />,
  },
  {
    path: "/delivery/:isPhone",
    page: <DeliveryPage />,
  },
  {
    path: "/barcode",
    page: <Test />,
  },
];

export default routes;
