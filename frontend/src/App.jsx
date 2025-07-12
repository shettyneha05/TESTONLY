import React from 'react';
import { AuthProvider, useAuth } from './context/AuthProvider';
import Login from './components/Auth/Login';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex h-screen items-center justify-center bg-gray-900 text-white">Loading...</div>;
  }

  return user ? (
    user.role === 'admin' ? 
      <AdminDashboard /> : 
      <EmployeeDashboard />
  ) : <Login />;
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;


