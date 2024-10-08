import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import BusinessList from './components/Business/BusinessList';
import BusinessDetail from './components/Business/BusinessDetail';
import BusinessForm from './components/Business/BusinessForm';
import Dashboard from '@components/Indicators/Dashboard';
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
import Layout from './components/Layout/Layout';
import { AuthProvider } from './components/Auth/AuthContext';
import './App.css';

const App: React.FC = () => {
  const handleClose = () => {
    // Lógica para cerrar el modal o hacer alguna acción específica
  };

  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login onClose={handleClose} />} />
            <Route path="/register" element={<Register onClose={handleClose} />} />
            <Route path="/business" element={<BusinessList />} />
            <Route path="/business/:id" element={<BusinessDetail />} />
            <Route path="/business/new" element={<BusinessForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/sales" element={<SalesList />} />
            <Route path="/sales/:id" element={<SalesDetail />} />
            <Route path="/sales/new" element={<SalesForm />} />
            <Route path="/sales/projection" element={<SalesProjection />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/products/new" element={<ProductForm />} />
            <Route path="/costs" element={<CostList />} />
            <Route path="/costs/:id" element={<CostDetail />} />
            <Route path="/costs/new" element={<CostForm />} />
            <Route path="/reports" element={<ReportsList />} />
            <Route path="/reports/:id" element={<ReportDetail />} />
            <Route path="/reports/new" element={<ReportForm />} />
            <Route path="/indicators" element={<IndicatorList />} />
            <Route path="/indicators/:id" element={<IndicatorDetail />} />
            <Route path="/indicators/new" element={<IndicatorForm />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;
