import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LinearProgress } from '@mui/material';
import Home from './views/pages/Home';
import NotFoundPage from './views/pages/NotFoundPage';
import ProtectedRoute from './components/protected-route';

// LAZY IMPORTS
const AboutPage = lazy(() => import('./views/pages/AboutPage'));
const DashboardDefaultContent = lazy(
  () => import('./views/dashboard/dashboard-default-content'),
);
const Dashboard = lazy(() => import('./layouts/dashboard-layout'));
const ProductListView = lazy(
  () => import('./views/dashboard/product/ProductListView'),
);
const ProductCreateView = lazy(
  () => import('./views/dashboard/product/ProductCreateView'),
);

const CalendarView = lazy(
  () => import('./views/dashboard/calendar/CalendarView/'),
);

const LoginPage = lazy(() => import('./views/pages/auth/LoginPage'));
const PricingPage = lazy(() => import('./views/pages/pricing/PricingPage'));
const AccountView = lazy(() => import('./views/account/AccountView'));

const Router = () => {
  return (
    <Suspense fallback={<LinearProgress style={{ margin: '10rem' }} />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="pricing" element={<PricingPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />}>
            <Route path="" element={<DashboardDefaultContent />} />
            <Route path="list-products" element={<ProductListView />} />
            <Route path="create-product" element={<ProductCreateView />} />
            <Route path="calendar" element={<CalendarView />} />
            <Route path="account" element={<AccountView />} />
          </Route>
        </Route>
        <Route path="not-found" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="not-found" replace />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
