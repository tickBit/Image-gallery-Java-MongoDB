// AuthContext.jsx
import { createContext, useContext, useState } from "react";
import axios from "axios";

// Luodaan konteksti
const AuthContext = createContext(null);


// Provider
export function AuthProvider({ children }) {
  const [token, setToken] = useState(null); // token vain muistissa
  const [authUsername, setAuthUsername] = useState('');

  const login = async (username, password) => {
    await axios.post("http://localhost:8080/api/v1/auth/login",
    { username, password },
      { headers: { "Content-Type": "application/json" } }
  ).then((res) => {
        console.log(res);
        setToken(res.data.token);
        setAuthUsername(username);

    }).catch((err) => {
      throw err;
    });
  };

const register = async (username, email, password) => {
    await axios.post("http://localhost:8080/api/v1/auth/register",
    { username, email, password },
      { headers: { "Content-Type": "application/json" } }
    ).then((res) => {
        console.log(res);
        setToken(res.data.token);
        setAuthUsername(username);

    }).catch((err) => {
      throw err;
    });
  };


  const logout = () => {
    setToken(null);
    setAuthUsername('');
  };

  return (
    <AuthContext.Provider value={{ token, authUsername, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}
// Custom hook
export const useAuth = () => useContext(AuthContext);