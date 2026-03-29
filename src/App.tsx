import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Layout } from './components/Layout';
import { ErrorBoundary } from './components/ErrorBoundary';

// Pages (to be created)
import Home from './pages/Home';
import Login from './pages/Login';
import RoleSelection from './pages/RoleSelection';
import Marketplace from './pages/Marketplace';
import SellerDashboard from './pages/SellerDashboard';
import GroupOrders from './pages/GroupOrders';
import AiAssistant from './pages/AiAssistant';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  return user ? <>{children}</> : <Navigate to="/login" />;
}

function RoleCheck({ children }: { children: React.ReactNode }) {
  const { profile, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (!profile) return <Navigate to="/role-selection" />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/role-selection" element={<PrivateRoute><RoleSelection /></PrivateRoute>} />
        
        <Route path="/marketplace" element={
          <PrivateRoute>
            <RoleCheck>
              <Marketplace />
            </RoleCheck>
          </PrivateRoute>
        } />
        
        <Route path="/groups" element={
          <PrivateRoute>
            <RoleCheck>
              <GroupOrders />
            </RoleCheck>
          </PrivateRoute>
        } />
        
        <Route path="/seller" element={
          <PrivateRoute>
            <RoleCheck>
              <SellerDashboard />
            </RoleCheck>
          </PrivateRoute>
        } />
        
        <Route path="/ai" element={
          <PrivateRoute>
            <RoleCheck>
              <AiAssistant />
            </RoleCheck>
          </PrivateRoute>
        } />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

