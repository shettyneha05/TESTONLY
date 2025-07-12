import React, { useState } from 'react';
import { createTask } from '../../utils/api';

const CreateTask = ({ employees, refreshTasks }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [assignTo, setAssignTo] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (!taskTitle || !taskDate || !assignTo || !category) {
      alert('Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      const taskData = {
        title: taskTitle,
        description: taskDescription,
        dueDate: taskDate,
        category,
        assignedTo: assignTo,
        status: 'new'
      };

      await createTask( taskData);
      
      // Reset form
      setTaskTitle('');
      setTaskDescription('');
      setTaskDate('');
      setAssignTo('');
      setCategory('');
      
      refreshTasks();
    } catch (error) {
      console.error('Error creating task:', error);
      alert(`Failed to create task: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-5 bg-[#1C1C1C] mt-7 rounded text-white'>
      <form onSubmit={submitHandler} className='flex flex-wrap w-full items-start justify-between'>
        <div className='w-1/2'>
          <div>
            <h3 className='text-sm text-gray-300 mb-0.5'>Task Title*</h3>
            <input
              value={taskTitle}
              onChange={e => setTaskTitle(e.target.value)}
              className='text-sm px-2 py-1 w-4/5 rounded outline-none bg-transparent border-[1px] mb-4'
              type="text"
              placeholder='Make a new project etc..'
              required
            />
          </div>
          <div>
            <h3 className='text-sm text-gray-300 mb-0.5'>Date*</h3>
            <input
              value={taskDate}
              onChange={e => setTaskDate(e.target.value)}
              className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4'
              type="date"
              required
            />
          </div>
          <div>
            <h3 className='text-sm text-gray-300 mb-0.5'>Assign to*</h3>
            <select
              value={assignTo}
              onChange={e => setAssignTo(e.target.value)}
              className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4'
              required
            >
              <option value="">Select Employee</option>
              {employees.map(user => (
                <option key={user._id} value={user._id} className="bg-gray-800">
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h3 className='text-sm text-gray-300 mb-0.5'>Category*</h3>
            <input
              value={category}
              onChange={e => setCategory(e.target.value)}
              className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4'
              type="text"
              placeholder='Design, dev, etc..'
              required
            />
          </div>
        </div>
        <div className='w-2/5 flex flex-col item-start'>
          <h3 className='text-sm text-gray-300 mb-0.5'>Description</h3>
          <textarea
            value={taskDescription}
            onChange={e => setTaskDescription(e.target.value)}
            className='w-full h-44 text-sm py-2 px-4 rounded outline-none bg-transparent border-[1px] border-gray-400'
            placeholder="Task description..."
          ></textarea>
          <button 
            type="submit"
            disabled={loading}
            className={`py-3 px-5 rounded text-sm mt-4 w-full ${
              loading 
                ? 'bg-gray-500 cursor-not-allowed' 
                : 'bg-emerald-500 hover:bg-emerald-600 hover:cursor-pointer'
            }`}
          >
            {loading ? 'Creating...' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;

