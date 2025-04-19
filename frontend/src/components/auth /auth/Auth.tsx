import { useNavigate } from 'react-router-dom';  
import { createContext, PropsWithChildren, useState, useEffect } from 'react';

interface AuthContextInterface {
  jwt: string;
  role: string;
  newLogin(jwt: string, role: string): void;
  logout(): void;
}

export const AuthContext = createContext<AuthContextInterface | null>(null);

export default function Auth({ children }: PropsWithChildren) {
  const JWT_KEY_NAME = "jwt";
  const ROLE_KEY_NAME = "role";
  const navigate = useNavigate(); 

  const [jwt, setJwt] = useState(localStorage.getItem(JWT_KEY_NAME) || "");
  const [role, setRole] = useState(localStorage.getItem(ROLE_KEY_NAME) || "");

  useEffect(() => {
    const storedJwt = localStorage.getItem(JWT_KEY_NAME);
    const storedRole = localStorage.getItem(ROLE_KEY_NAME);
    if (storedJwt && storedRole) {
      setJwt(storedJwt);
      setRole(storedRole);
    }
  }, []);

 
  function newLogin(jwt: string, role: string) {
    const normalizedRole = role?.toLowerCase?.() || "user"
    setJwt(jwt);
    setRole(normalizedRole);
    localStorage.setItem(JWT_KEY_NAME, jwt);
    localStorage.setItem(ROLE_KEY_NAME, normalizedRole);
  }

  function logout() {
    localStorage.removeItem(JWT_KEY_NAME);
    localStorage.removeItem(ROLE_KEY_NAME);
    setJwt("");
    setRole("");

    navigate("/login");  
  }

  return (
    <AuthContext.Provider value={{ jwt, role, newLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
