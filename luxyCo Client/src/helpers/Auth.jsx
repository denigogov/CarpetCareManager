import { createContext, useContext, useState } from 'react';

// Define AuthContext with initial value null
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('accessKey') ?? null);
  const [userInfo, setUserInfo] = useState(null);

  const login = token => {
    if (token && token.length) {
      localStorage.setItem('accessKey', token);
      setToken(token);
    }
  };

  const info = userInfo => {
    setUserInfo(userInfo);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('accessKey');
  };

  return (
    <AuthContext.Provider value={{ info, userInfo, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
