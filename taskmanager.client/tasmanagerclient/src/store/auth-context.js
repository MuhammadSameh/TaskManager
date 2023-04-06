
import React, { useState } from "react";

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    id: '',
    role: '',
    login: (token, id, role) => {},
    logout:() => {}
});

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(initialToken);
    const [id, setId] = useState(null);
    const [role, setRole] = useState(null);
    const userLoggedIn = !!token;
    const loginHandler = (token, id, role) => {
        setToken(token);
        setId(id);
        setRole(role);
        localStorage.setItem('token', token);
    };

    const logoutHandler = () => {
        setToken(null);
        setId(null);
        setRole(null);
        
    }

    const contextValue = {
        token: token,
        isLoggedIn: userLoggedIn,
        id: id,
        role: role,
        login: loginHandler,
        logout: logoutHandler
    };

    return (
    <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
    )
}

export default AuthContext;