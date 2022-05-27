import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN;
const API_AUDIENCE = process.env.REACT_APP_API_AUDIENCE;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const BASE_DOMAIN = process.env.REACT_APP_BASE_DOMAIN;


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain={AUTH0_DOMAIN}
    clientId={CLIENT_ID}
    redirectUri={BASE_DOMAIN}
    audience={API_AUDIENCE}
    useRefreshTokens={true}
  >
    <Router>
      <App />
    </Router>
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
