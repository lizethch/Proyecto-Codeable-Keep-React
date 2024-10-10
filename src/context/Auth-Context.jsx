import { createContext, useContext, useEffect, useState } from "react";
import { tokenKey } from "../config";
import * as auth from "../services/auth-service";
import { getUser } from "../services/user-service";


const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUser().then(setUser).catch(console.log);
    }, []);

    function login(credentials) {
        auth.login(credentials).then(setUser).catch(console.log);
    };
    function signup(userData) {
        auth.createUser(userData)
            .then((user) => setUser(user))
            .catch((error) => console.log(error));
    }
    function logout() {
        auth.logout().then(() => {
            sessionStorage.removeItem(tokenKey);
            setUser(null);
        });
    }
    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                signup,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
function useAuth() {
    return useContext(AuthContext);
}

export { AuthProvider, useAuth };