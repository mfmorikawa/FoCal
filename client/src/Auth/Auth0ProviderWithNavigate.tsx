import { useNavigate } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { ReactNode } from "react";

export default function Auth0ProviderWithNavigate(children: any) {
    const domain = String(process.env.FOCALAPP_AUTH0_DOMAIN);
    const clientId = String(process.env.FOCALAPP_AUTH0_CLIENT_ID);

    const navigate = useNavigate();

    const onRedirectCallback = (appState: any) => {
        navigate(appState?.returnTo || window.location.pathname)
    }

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            redirectUri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    )

}