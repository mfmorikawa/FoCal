import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function PrivateRoutes() {
    let auth = { 'token': true };
    return (
        <>
            <Navbar />
            {auth.token ? <Outlet /> : <Navigate to="/" />}
        </>
    );
};
