import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthProvider';
import Header from '../other/Header';
import TaskListNumbers from '../other/TaskListNumbers';
import TaskList from '../TaskList/TaskList';
import {fetchTasks} from '../../utils/api';

const EmployeeDashboard = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasksfun = async () => {
      try {
        const response = await fetchTasks();
        setTasks(response.data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchTasksfun();
  }, [user]);


  const refreshTasks = async () => {
    try {
      const response = await fetchTasks();
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