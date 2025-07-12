import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthProvider';
import Header from '../other/Header';
import TaskListNumbers from '../other/TaskListNumbers';
import TaskList from '../TaskList/TaskList';
import api from '../../utils/api';

const EmployeeDashboard = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetchTasks('/tasks/my-tasks'+);
        setTasks(response.data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [user]);

  const refreshTasks = async () => {
    try {
      const response = await api.get('/tasks/my-tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to refresh tasks:', error);
    }
  };

  if (loading) {
    return (
      <div className="p-10 bg-[#1C1C1C] h-screen flex items-center justify-center">
        <div className="text-white">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className='p-10 bg-[#1C1C1C] h-screen'>
      <Header user={user} logout={logout} />
      <TaskListNumbers tasks={tasks} />
      <TaskList tasks={tasks} refreshTasks={refreshTasks} />
    </div>
  );
};

export default EmployeeDashboard;

