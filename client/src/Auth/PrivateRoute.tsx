import { Outlet, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth0 } from '@auth0/auth0-react';

export default function PrivateRoutes() {
    const { isAuthenticated } = useAuth0();
    
    return (
        <>
            <Navbar />
            {
                isAuthenticated ? 
                <Outlet /> : 
                <Navigate to="/" />
            }
        </>
    );
};
