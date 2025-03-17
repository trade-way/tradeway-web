import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * A wrapper component for routes that require authentication.
 * If the user is not authenticated, they will be redirected to the login page.
 * 
 * @returns {React.ReactElement} Either the protected component or a redirect to login
 */
const PrivateRoute = () => {
    const { currentUser } = useSelector((state) => state.user); 
    
    // If the user is authenticated, render the child routes
    // Otherwise, redirect to the login page
    return currentUser ? <Outlet /> : <Navigate to="/Sign-In" />;
};

export default PrivateRoute;