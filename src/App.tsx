import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Dashboard } from './pages/Dashboard';
import { SiteRenderer } from './pages/SiteRenderer';
import { SiteResourceProxy } from './pages/SiteResourceProxy';
import { AppLayout } from './layouts/AppLayout';
import { SiteLayout } from './layouts/SiteLayout';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Main app routes with navigation */}
          <Route element={<AppLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Route>

          {/* Clean website routes without navigation */}
          <Route element={<SiteLayout />}>
            <Route path="/sites/:websiteId" element={<SiteRenderer />} />
            <Route path="/sites/:websiteId/*" element={<SiteResourceProxy />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;