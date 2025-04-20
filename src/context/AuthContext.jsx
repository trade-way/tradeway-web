import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('auth_token'));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refresh_token'));
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('auth_token') || !!localStorage.getItem('refresh_token'));

  const updateAuthTokens = (newAuthToken, newRefreshToken) => {
    setAuthToken(newAuthToken);
    setRefreshToken(newRefreshToken);
    localStorage.setItem('auth_token', newAuthToken);
    localStorage.setItem('refresh_token', newRefreshToken);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setAuthToken(null);
    setRefreshToken(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    setIsLoggedIn(false);
  };

  useEffect(() => {
    // Initial check for login status on component mount
    setIsLoggedIn(!!localStorage.getItem('auth_token') || !!localStorage.getItem('refresh_token'));
  }, []);

  return (
    <AuthContext.Provider value={{ authToken, refreshToken, isLoggedIn, updateAuthTokens, logout }}>
      {children}
    </AuthContext.Provider>
  );
};