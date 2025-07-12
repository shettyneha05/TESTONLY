import React from 'react';
import { AuthProvider, useAuth } from './context/AuthProvider';
import Login from './components/Auth/Login';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';
import { useState } from 'react';
import { useEffect } from 'react';

const AppContent = () => {
  const { user, loading } = useAuth();
  const [userData, setUserData]=useState({});
  console.log("----------",user);

  useEffect(()=>{
    if(user!==null)
    setUserData(user);
  },[user]);

  if (loading) {
    return <div className="flex h-screen items-center justify-center bg-gray-900 text-white">Loading...</div>;
  }

   return userData ? (
     userData.role == 'admin' ? 
       <AdminDashboard /> : 
       <EmployeeDashboard />
   ) : <Login />;
  // return (
  //   <>
  //     {userData ? (
  //       <>
  //         <h1 className='text-white'>{userData.role}</h1>
  //       </>
  //     ) : (
  //       <Login />
  //     )}
  //   </>
  // )
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;


