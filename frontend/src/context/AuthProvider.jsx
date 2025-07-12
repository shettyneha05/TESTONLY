import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCurrentUser, login as apiLogin } from '../utils/api'; // ✅ named imports

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() =>{
    console.log("hhh",user);
  },[user]);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token');
      console.log(token);
      if (token) {
        try {
          const response = await getCurrentUser(); // ✅ using named function
          console.log(response);
          setUser(response.data);
        } catch (e){
          console.log(e);
        }
      }
      setLoading(false);
    };
    validateToken();
  }, []);

  const login = async (email, password) => {
    const response = await apiLogin({ email, password }); // ✅ using named function
    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
    return response.data.user;
  };

  const logout = () => {
   // localStorage.removeItem('token');
   console.log("logged out");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
