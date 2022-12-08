import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function PrivateRoutes() {
  const isAuthenticated = true;

  return (
    <>
      <Navbar />
      {isAuthenticated ? <Outlet /> : <Navigate to="/" />}
    </>
  );
}
