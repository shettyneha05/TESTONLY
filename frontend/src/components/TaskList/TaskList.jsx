import React from 'react';
import { updateTaskStatus } from '../../utils/api';
import AcceptTask from './AcceptTask';
import NewTask from './NewTask';
import CompleteTask from './CompleteTask';
import FailedTask from './FailedTask';

const TaskList = ({ user, tasks, updateTaskInState }) => {
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTaskStatus(taskId, newStatus);
      updateTaskInState(taskId, newStatus);
    } catch (error) {
      console.error('Error updating task status:', error);
      alert('Failed to update task status');
    }
  };

  return (
    <div
      id="tasklist"
      className="h-[50%] overflow-x-auto flex items-center justify-start gap-5 flex-nowrap w-full py-1 mt-16"
    >
      {tasks.map((task) => {
        if (task.status === 'in-progress') {
          return (
            <AcceptTask
              key={task._id}
              data={task}
              onComplete={() => handleStatusChange(task._id, 'completed')}
              onFail={() => handleStatusChange(task._id, 'failed')}
            />
          );
        }
        if (task.status === 'new') {
          return (
            <NewTask
              key={task._id}
              data={task}
              onAccept={() => handleStatusChange(task._id, 'in-progress')}
            />
          );
        }
        if (task.status === 'completed') {
          return <CompleteTask key={task._id} data={task} />;
        }
        if (task.status === 'failed') {
          return <FailedTask key={task._id} data={task} />;
        }
        return null;
      })}
    </div>
  );
};

export default TaskList;

