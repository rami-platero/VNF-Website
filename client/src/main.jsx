import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthContextProvider } from "./context/authContext";
import { SongsContextProvider } from "./context/SongsContext";
import { ThemeContextProvider } from "./context/themeContext";
import { ErrorContextProvider } from "./context/errorsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ErrorContextProvider>
    <AuthContextProvider>
      <ThemeContextProvider>
        <SongsContextProvider>
          <App />
        </SongsContextProvider>
      </ThemeContextProvider>
    </AuthContextProvider>
  </ErrorContextProvider>
);
