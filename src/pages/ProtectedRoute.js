// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Sử dụng named import

const ProtectedRoute = ({ element }) => {
    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp > currentTime) {
            return element;
        } else {
            localStorage.removeItem('token');
            return <Navigate to="/login" />;
        }
    } else {
        return <Navigate to="/login" />;
    }
};


export default ProtectedRoute;
