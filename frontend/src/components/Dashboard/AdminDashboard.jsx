import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthProvider';
import Header from '../other/Header';
import CreateTask from '../other/CreateTask';
import AllTask from '../other/AllTask';
import { fetchTasks, fetchUsers } from '../../utils/api';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tasksRes, usersRes] = await Promise.all([
          fetchTasks(),
          fetchUsers()
        ]);
        setTasks(tasksRes.data);
        setEmployees(usersRes.data.filter(u => u.role === 'employee'));
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const refreshTasks = async () => {
    try {
      const tasksRes = await fetchTasks();
      setTasks(tasksRes.data);
    } catch (error) {
      console.error('Failed to refresh tasks:', error);
    }
  };

  if (loading) {
    return (
      <div className="p-10 bg-[#1C1C1C] h-screen flex items-center justify-center">
        <div className="text-white">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className='h-screen w-full p-7 bg-[#1C1C1C]'>
      <Header user={user} logout={logout} />
      <CreateTask employees={employees} refreshTasks={refreshTasks} />
      <AllTask tasks={tasks} employees={employees} refreshTasks={refreshTasks} />
    </div>
  );
};

export default AdminDashboard;


