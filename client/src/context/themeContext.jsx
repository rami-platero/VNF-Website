import { createContext, useEffect, useState } from "react";

export const themecontext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  const handleTheme = (theme) => {
    setTheme(theme);
    localStorage.setItem("theme", theme);
  };

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      handleTheme(localStorage.getItem("theme"));
      localStorage.setItem("theme", localStorage.getItem("theme"));
    } else {
      localStorage.setItem("theme", "dark");
      handleTheme("dark");
    }
  }, []);

  return (
    <themecontext.Provider value={{theme, handleTheme}}>
      {children}
    </themecontext.Provider>
  );
};

