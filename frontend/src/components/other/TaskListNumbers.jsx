import React from 'react';

const TaskListNumbers = ({ tasks }) => {
  const counts = {
    new: 0,
    inProgress: 0,
    completed: 0,
    failed: 0,
  };
  
  tasks.forEach(task => {
    if (task.status === 'new') counts.new++;
    if (task.status === 'in-progress') counts.inProgress++;
    if (task.status === 'completed') counts.completed++;
    if (task.status === 'failed') counts.failed++;
  });

  return (
    <div className='flex mt-10 justify-between gap-5 screen'>
      <div className='rounded-xl w-[45%] py-6 px-9 bg-blue-400'>
        <h2 className='text-3xl font-bold'>{counts.new}</h2>
        <h3 className='text-xl mt-0.5 font-medium'>New Task</h3>
      </div>
      <div className='rounded-xl w-[45%] py-6 px-9 bg-green-400'>
        <h2 className='text-3xl font-bold'>{counts.completed}</h2>
        <h3 className='text-xl mt-0.5 font-medium'>Completed Task</h3>
      </div>
      <div className='rounded-xl w-[45%] py-6 px-9 bg-yellow-400 '>
        <h2 className='text-3xl text-black font-bold'>{counts.inProgress}</h2>
        <h3 className='text-xl mt-0.5 text-black font-medium'>In Progress</h3>
      </div>
      <div className='rounded-xl w-[45%] py-6 px-9 bg-red-400'>
        <h2 className='text-3xl font-bold'>{counts.failed}</h2>
        <h3 className='text-xl mt-0.5 font-medium'>Failed Task</h3>
      </div>
    </div>
  );
};

export default TaskListNumbers;
