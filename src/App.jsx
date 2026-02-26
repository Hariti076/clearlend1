import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import MainDashboard from './pages/MainDashboard';
import { BorrowerDashboard, LenderDashboard, AdminDashboard } from './pages/RoleDashboards';
import Settings from './pages/Settings';
import Auth from './pages/Auth';

const PrivateRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, currentUser, loading } = useAuth();

  if (loading) return null; // Wait for initial localstorage check
  if (!isAuthenticated) return <Navigate to="/auth" />;

  if (allowedRoles && !allowedRoles.includes(currentUser?.role)) {
    return <Navigate to="/" />; // Redirect if logged in but wrong role
  }

  return children;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />

            <Route path="/" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
              <Route index element={<MainDashboard />} />
              <Route path="borrowers" element={<PrivateRoute allowedRoles={['borrower', 'admin']}><BorrowerDashboard /></PrivateRoute>} />
              <Route path="lenders" element={<PrivateRoute allowedRoles={['lender', 'admin']}><LenderDashboard /></PrivateRoute>} />
              <Route path="admin" element={<PrivateRoute allowedRoles={['admin']}><AdminDashboard /></PrivateRoute>} />
              <Route path="settings" element={<Settings />} />
              {/* Fallback routes */}
              <Route path="history" element={<div className="p-6"><h2>Transaction History Directory mapping...</h2></div>} />
              <Route path="*" element={<div className="p-6"><h2>404 - Page Module Not Found</h2></div>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
