import { useNavigate } from "react-router-dom";
import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { PropsWithChildren, ReactNode } from "react";
import process from "process";

type Auth0ProviderWithConfigProps = {
    children: ReactNode
}

export default function Auth0ProviderWithNavigate({
    children
} : PropsWithChildren<Auth0ProviderWithConfigProps>) : JSX.Element | null {

    const domain = String(process.env.FOCALAPP_AUTH0_DOMAIN);
    const clientId = String(process.env.FOCALAPP_AUTH0_CLIENT_ID);

    const navigate = useNavigate();

    const onRedirectCallback = (appState?: AppState) => {
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