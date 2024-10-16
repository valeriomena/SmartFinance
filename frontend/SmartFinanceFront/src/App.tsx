import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/Auth/AuthContext';

// Componentes públicos
import Home from './components/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

// Componentes privados
import Dashboard from '@components/Indicators/Dashboard';
import BusinessList from './components/Business/BusinessList';
import BusinessDetail from './components/Business/BusinessDetail';
import BusinessForm from './components/Business/BusinessForm';
import SalesList from './components/Sales/SalesList';
import SalesDetail from './components/Sales/SalesDetail';
import SalesProjection from './components/Sales/SalesProjection';
import SalesForm from './components/Sales/SalesForm';
import ProductList from './components/Products/ProductList';
import ProductDetail from './components/Products/ProductDetail';
import ProductForm from './components/Products/ProductForm';
import CostList from './components/Costs/CostList';
import CostDetail from './components/Costs/CostDetail';
import CostForm from './components/Costs/CostForm';
import ReportsList from './components/Reports/ReportsList';
import ReportDetail from './components/Reports/ReportDetail';
import ReportForm from './components/Reports/ReportForm';
import IndicatorList from './components/Indicators/IndicatorList';
import IndicatorDetail from './components/Indicators/IndicatorDetail';
import IndicatorForm from './components/Indicators/IndicatorForm';

// Componentes de Layout y protección
import Layout from './components/Layout/Layout';
import PrivateRoute from '@components/Routes/PrivateRoute';

import './App.css';

const handleClose = () => {
  console.log('Cerrar Login');
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onClose={handleClose} />} />
            <Route path="/register" element={<Register onClose={handleClose} />} />

            {/* Rutas privadas (protegidas) */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/business"
              element={
                <PrivateRoute>
                  <BusinessList />
                </PrivateRoute>
              }
            />
            <Route
              path="/business/:id"
              element={
                <PrivateRoute>
                  <BusinessDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="/business/new"
              element={
                <PrivateRoute>
                  <BusinessForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/sales"
              element={
                <PrivateRoute>
                  <SalesList />
                </PrivateRoute>
              }
            />
            <Route
              path="/sales/:id"
              element={
                <PrivateRoute>
                  <SalesDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="/sales/new"
              element={
                <PrivateRoute>
                  <SalesForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/sales/projection"
              element={
                <PrivateRoute>
                  <SalesProjection />
                </PrivateRoute>
              }
            />
            <Route
              path="/products"
              element={
                <PrivateRoute>
                  <ProductList />
                </PrivateRoute>
              }
            />
            <Route
              path="/products/:id"
              element={
                <PrivateRoute>
                  <ProductDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="/products/new"
              element={
                <PrivateRoute>
                  <ProductForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/costs"
              element={
                <PrivateRoute>
                  <CostList />
                </PrivateRoute>
              }
            />
            <Route
              path="/costs/:id"
              element={
                <PrivateRoute>
                  <CostDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="/costs/new"
              element={
                <PrivateRoute>
                  <CostForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <PrivateRoute>
                  <ReportsList />
                </PrivateRoute>
              }
            />
            <Route
              path="/reports/:id"
              element={
                <PrivateRoute>
                  <ReportDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="/reports/new"
              element={
                <PrivateRoute>
                  <ReportForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/indicators"
              element={
                <PrivateRoute>
                  <IndicatorList />
                </PrivateRoute>
              }
            />
            <Route
              path="/indicators/:id"
              element={
                <PrivateRoute>
                  <IndicatorDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="/indicators/new"
              element={
                <PrivateRoute>
                  <IndicatorForm />
                </PrivateRoute>
              }
            />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
};

export default App;
