import React from 'react';
import { deleteTask } from '../../utils/api';


const EmployeeTaskDetails = ({ employee, tasks, onClose, onTaskDeleted }) => {
  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(`${taskId}`);
        onTaskDeleted(taskId);
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Failed to delete task');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'failed': return 'bg-red-500';
      case 'in-progress': return 'bg-yellow-500';
      case 'new': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'failed': return 'Failed';
      case 'in-progress': return 'In Progress';
      case 'new': return 'New Task';
      default: return 'Unknown';
    }
  };

  const taskCounts = {
    new: tasks.filter(t => t.status === 'new').length,
    active: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    failed: tasks.filter(t => t.status === 'failed').length,
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1C1C1C] rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            {employee.name}'s Tasks ({tasks.length} total)
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-red-400 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-600 p-3 rounded text-center">
            <div className="text-2xl font-bold text-white">{taskCounts.new}</div>
            <div className="text-sm text-white">New Tasks</div>
          </div>
          <div className="bg-yellow-600 p-3 rounded text-center">
            <div className="text-2xl font-bold text-white">{taskCounts.active}</div>
            <div className="text-sm text-white">Active Tasks</div>
          </div>
          <div className="bg-green-600 p-3 rounded text-center">
            <div className="text-2xl font-bold text-white">{taskCounts.completed}</div>
            <div className="text-sm text-white">Completed</div>
          </div>
          <div className="bg-red-600 p-3 rounded text-center">
            <div className="text-2xl font-bold text-white">{taskCounts.failed}</div>
            <div className="text-sm text-white">Failed</div>
          </div>
        </div>

        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              No tasks assigned to this employee
            </div>
          ) : (
            tasks.map((task) => (
              <div key={task._id} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{task.title}</h3>
                      <span className={`px-2 py-1 rounded text-xs text-white ${getStatusColor(task.status)}`}>
                        {getStatusText(task.status)}
                      </span>
                      <span className="px-2 py-1 bg-gray-600 rounded text-xs text-white">
                        {task.category}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-2">{task.description}</p>
                    <p className="text-sm text-gray-400">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="ml-4 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTaskDetails;
