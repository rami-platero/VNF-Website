import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Application";
import "./index.css";
import { AuthContextProvider } from "./context/authContext";
import { SongsContextProvider } from "./context/SongsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <SongsContextProvider>
      <App />
    </SongsContextProvider>
  </AuthContextProvider>
);
