import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';

// Import components
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import ProductRegister from './pages/ProductRegister';
import ProductVerify from './pages/ProductVerify';
import TransactionList from './pages/TransactionList';
import SupplyChain from './pages/SupplyChain';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import Help from './pages/Help';
import NotFound from './pages/NotFound';

// Role-specific pages
import SeedBatches from './pages/SeedBatches';
import SeedInventory from './pages/SeedInventory';
import FarmManagement from './pages/FarmManagement';
import BuyFromFarmers from './pages/BuyFromFarmers';
import TraderInventory from './pages/TraderInventory';
import ProcessingRecords from './pages/ProcessingRecords';
import PurchaseHistory from './pages/PurchaseHistory';
import UserManagement from './pages/UserManagement';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        
        {/* Protected Routes */}
        <Route path="dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="products" element={
          <ProtectedRoute>
            <ProductList />
          </ProtectedRoute>
        } />
        <Route path="products/:id" element={
          <ProtectedRoute>
            <ProductDetail />
          </ProtectedRoute>
        } />
        <Route path="products/register" element={
          <ProtectedRoute>
            <ProductRegister />
          </ProtectedRoute>
        } />
        <Route path="verify" element={<ProductVerify />} />
        <Route path="transactions" element={
          <ProtectedRoute>
            <TransactionList />
          </ProtectedRoute>
        } />
        <Route path="supply-chain/:qrCode" element={<SupplyChain />} />
        <Route path="analytics" element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        } />
        <Route path="profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        
        {/* Seed Producer Routes */}
        <Route path="seed-batches" element={
          <ProtectedRoute>
            <SeedBatches />
          </ProtectedRoute>
        } />
        <Route path="seed-inventory" element={
          <ProtectedRoute>
            <SeedInventory />
          </ProtectedRoute>
        } />
        
        {/* Farmer Routes */}
        <Route path="farm-management" element={
          <ProtectedRoute>
            <FarmManagement />
          </ProtectedRoute>
        } />
        
        {/* Trader Routes */}
        <Route path="buy-from-farmers" element={
          <ProtectedRoute>
            <BuyFromFarmers />
          </ProtectedRoute>
        } />
        <Route path="trader-inventory" element={
          <ProtectedRoute>
            <TraderInventory />
          </ProtectedRoute>
        } />
        
        {/* Processor Routes */}
        <Route path="processing-records" element={
          <ProtectedRoute>
            <ProcessingRecords />
          </ProtectedRoute>
        } />
        
        {/* Consumer Routes */}
        <Route path="purchase-history" element={
          <ProtectedRoute>
            <PurchaseHistory />
          </ProtectedRoute>
        } />
        
        {/* Admin Routes */}
        <Route path="users" element={
          <ProtectedRoute>
            <UserManagement />
          </ProtectedRoute>
        } />
        
        {/* Public Pages */}
        <Route path="contact" element={<Contact />} />
        <Route path="help" element={<Help />} />
        
        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
