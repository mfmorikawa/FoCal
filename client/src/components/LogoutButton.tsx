import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button 
        className="rounded-md shadow flex items-center justify-center border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
        onClick={() => logout({ returnTo: "http://localhost:5173/" })}
    >
      Log Out
    </button>
  );
};

export default LogoutButton;