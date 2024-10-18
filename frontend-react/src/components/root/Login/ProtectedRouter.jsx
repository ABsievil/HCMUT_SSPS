import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  const jwtToken = Cookies.get('jwt');

  if (!jwtToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;