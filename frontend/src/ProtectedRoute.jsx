import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const token = localStorage.getItem('token'); // Recuperar el token de localStorage

    return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
