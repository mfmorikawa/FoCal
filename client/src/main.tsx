import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { store } from "./app/store";
import { Provider } from "react-redux";
import Auth0ProviderWithNavigate from './Auth/Auth0ProviderWithNavigate'

const domain = String(process.env.FOCALAPP_AUTH0_DOMAIN);
const clientId = String(process.env.FOCALAPP_AUTH0_CLIENT_ID);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Auth0ProviderWithNavigate>
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0ProviderWithNavigate>
  </BrowserRouter>
);
