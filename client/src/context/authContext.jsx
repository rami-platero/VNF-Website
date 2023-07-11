import { createContext, useEffect, useReducer} from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  /* if (
    !window.__ALLOW_REACT_DEVTOOLS__ &&
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__ &&
    typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === "object"
    ) {
      for (let [key, value] of Object.entries(window.__REACT_DEVTOOLS_GLOBAL_HOOK__)) {
        window.__REACT_DEVTOOLS_GLOBAL_HOOK__[key] = typeof value == "function" ? ()=>{} : null;
      }
    }  
    
    delete window.__ALLOW_REACT_DEVTOOLS__;   */

  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch({
        type: "LOGIN",
        payload: JSON.parse(localStorage.getItem("user")),
      });
    }
  }, []); 

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
