import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Application";
import "./index.css";
import { AuthContextProvider } from "./context/authContext";
import { SongsContextProvider } from "./context/SongsContext";
import {ThemeContextProvider} from './context/themeContext';

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <ThemeContextProvider>
      <SongsContextProvider>
        <App />
      </SongsContextProvider>
    </ThemeContextProvider>
  </AuthContextProvider>
);
