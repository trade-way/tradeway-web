// lib/privateRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

export default function PrivateRoute({ children }) {
  const { isLoggedIn } = useContext(AuthContext);

  return isLoggedIn ? children : <Navigate to='/login' replace />;
}