import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Application";
import "./index.css";
import { AuthContextProvider } from "./context/authContext";
import { SongsContext } from "./context/SongsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <SongsContext>
      <App />
    </SongsContext>
  </AuthContextProvider>
);
