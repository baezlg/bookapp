import React from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { saveClaimsAction } from 'features/auth/authSlice';
import { ClaimsType } from 'models/claims-type';

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  if (!token) {
    localStorage.clear();
    return <Navigate to={{ pathname: '/login' }} />;
  }
  const decoded: ClaimsType = jwt_decode(token);
  const expiresAt = decoded.exp * 1000;
  const dateNow = Date.now();
  const isValid = dateNow <= expiresAt;
  dispatch(saveClaimsAction(decoded));
  if (isValid) {
    return <Outlet />;
  }
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
