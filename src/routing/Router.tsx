import {createBrowserRouter } from "react-router-dom";
import React from "react";
import UserDataRequestForm from "../components/UserDataRequestForm/UserDataRequestForm";
import UserDataDisplayPage from "../components/UserDataDisplayPage/UserDataDisplayPage";

/**
 * A rather standard method of mapping routes and path variables components we want to render.
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <UserDataRequestForm />,
  },
  {
    path: "user/:userId",
    element: <UserDataDisplayPage />,
  }
]);

export default router;