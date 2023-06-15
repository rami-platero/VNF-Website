import { createContext, useState } from "react";

export const errorContext = createContext()

const initState = {error: false, message: ""}

export const ErrorContextProvider = ({children}) => {
    const [responseError, setResponseError] = useState(initState)

    return <errorContext.Provider value={{setResponseError, responseError}}>
        {children}
    </errorContext.Provider>
}