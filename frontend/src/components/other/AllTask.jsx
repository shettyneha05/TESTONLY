import React, { useState } from 'react';
import EmployeeTaskDetails from './EmployeeTaskDetails';
import api from '../../utils/api';

const AllTask = ({ tasks, employees, refreshTasks }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showTaskDetails, setShowTaskDetails] = useState(false);

  const getTaskCounts = (userId) => {
    const userTasks = tasks.filter(task => task.assignedTo === userId);
    return {
      newTask: userTasks.filter(task => task.status === 'new').length,
      active: userTasks.filter(task => task.status === 'in-progress').length,
      completed: userTasks.filter(task => task.status === 'completed').length,
      failed: userTasks.filter(task => task.status === 'failed').length,
    };
  };

  const handleShowTasks = (employee) => {
    setSelectedEmployee(employee);
    setShowTaskDetails(true);
  };

  const handleTaskDeleted = (taskId) => {
    refreshTasks();
  };

  return (
    <div className='p-5 bg-[#1C1C1C] mt-5 rounded'>
      <div className='bg-yellow-600 mb-2 py-2 px-4 flex justify-between rounded text-white'>
        <h1 className='text-xl font-medium w-1/6'>Employee name</h1>
        <h3 className='text-xl font-medium w-1/6'>New Task</h3>
        <h5 className='text-xl font-medium w-1/6'>Active Task</h5>
        <h5 className='text-xl font-medium w-1/6'>Completed Task</h5>
        <h5 className='text-xl font-medium w-1/6'>Failed Task</h5>
        <h5 className='text-xl font-medium w-1/6'>Actions</h5>
      </div>

      <div className='h-[80%] overflow-auto'>
        {employees.map((employee) => {
          const taskCounts = getTaskCounts(employee._id);
          return (
            <div key={employee._id} className='mb-2 py-2 px-4 flex justify-between items-center rounded text-white border-2 border-emerald-900'>
              <h1 className='text-xl font-medium w-1/6'>{employee.name}</h1>
              <h3 className='text-xl font-medium w-1/6 text-blue-600'>{taskCounts.newTask}</h3>
              <h5 className='text-xl font-medium w-1/6 text-yellow-400'>{taskCounts.active}</h5>
              <h5 className='text-xl font-medium w-1/6 text-white'>{taskCounts.completed}</h5>
              <h5 className='text-xl font-medium w-1/6 text-red-600'>{taskCounts.failed}</h5>
              <div className='w-1/6'>
                <button 
                  onClick={() => handleShowTasks(employee)}
                  className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm'
                >
                  Show All Tasks
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {showTaskDetails && selectedEmployee && (
        <EmployeeTaskDetails 
          employee={selectedEmployee}
          tasks={tasks.filter(task => task.assignedTo === selectedEmployee._id)}
          onClose={() => setShowTaskDetails(false)}
          onTaskDeleted={handleTaskDeleted}
        />
      )}
    </div>
  );
};

export default AllTask;
