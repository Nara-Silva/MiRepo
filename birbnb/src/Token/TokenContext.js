import { useState, createContext, useContext } from "react";
import {jwtDecode} from "jwt-decode";

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
    const [token, setToken] = useState(() => {
        const storedToken = sessionStorage.getItem("kc_token");
        return storedToken ? jwtDecode(storedToken) : null;
    });

    return (
        <TokenContext.Provider value={{token, setToken}}>
            {children}
        </TokenContext.Provider>
    );
};

export const useToken = () => useContext(TokenContext);
