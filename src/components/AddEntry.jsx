import React, { useState } from 'react';

function AddEntry({ onAddEntry, onClose }) {
  const [project, setProject] = useState('');
  const [typeOfWork, setTypeOfWork] = useState('Bug fixes');
  const [taskDescription, setTaskDescription] = useState('');
  const [hours, setHours] = useState(1);
  const [errors, setErrors] = useState({});

  // Validations for the form fields
  const validateForm = () => {
    const newErrors = {};
    if (!project) newErrors.project = 'Project is required';
    if (!typeOfWork) newErrors.typeOfWork = 'Type of work is required';
    if (!taskDescription) newErrors.taskDescription = "Task Description is required";
    if (hours < 1) newErrors.hours = 'Hours must be at least 1';
    return newErrors;
  };

  // Handles submission of the form
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const newEntry = {
        
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        tasks: [`${typeOfWork} - ${taskDescription}`],
        hours: [hours], 
        project: project,
      };
      
      onAddEntry(newEntry);
      // The modal will be closed by the parent component after the API call is complete
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Entry</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="project" className="block text-sm font-medium text-gray-700">Select Project *</label>
            <select
              id="project"
              value={project}
              onChange={(e) => {
                setProject(e.target.value);
                setErrors({ ...errors, project: '' });
              }}
              className={`mt-1 block w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.project ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Project Name</option>
              <option value="Project 1">Project 1</option>
              <option value="Project 2">Project 2</option>
              <option value="New Project">New Project</option>
            </select>
            {errors.project && <p className="text-red-500 text-xs mt-1">{errors.project}</p>}
          </div>

          <div>
            <label htmlFor="typeOfWork" className="block text-sm font-medium text-gray-700">Type of Work *</label>
            <select
              id="typeOfWork"
              value={typeOfWork}
              onChange={(e) => {
                setTypeOfWork(e.target.value);
                setErrors({ ...errors, typeOfWork: '' });
              }}
              className={`mt-1 block w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.typeOfWork ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select Type</option>
              <option value="Bug fixes">Bug fixes</option>
              <option value="Development">Development</option>
            </select>
            {errors.typeOfWork && <p className="text-red-500 text-xs mt-1">{errors.typeOfWork}</p>}
          </div>

          <div>
            <label htmlFor="taskDescription" className="block text-sm font-medium text-gray-700">Task Description *</label>
            <textarea
              id="taskDescription"
              value={taskDescription}
              onChange={(e) => {
                setTaskDescription(e.target.value);
                setErrors({ ...errors, taskDescription: '' });
              }}
              className={`mt-1 block w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.taskDescription ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Write task description..."
              rows="3"
            />
            {errors.taskDescription && <p className="text-red-500 text-xs mt-1">{errors.taskDescription}</p>}
          </div>

          <div>
            <label htmlFor="hours" className="block text-sm font-medium text-gray-700">Hours *</label>
            <div className={`mt-1 flex items-center border rounded-md ${errors.hours ? 'border-red-500' : 'border-gray-300'}`}>
              <button
                type="button"
                onClick={() => {
                  setHours(Math.max(1, hours - 1));
                  setErrors({ ...errors, hours: '' });
                }}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-l-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                -
              </button>
              <span className="px-4 py-1 border-l border-r border-gray-300 text-gray-900 font-medium">{hours}</span>
              <button
                type="button"
                onClick={() => {
                  setHours(hours + 1);
                  setErrors({ ...errors, hours: '' });
                }}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-r-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                +
              </button>
            </div>
            {errors.hours && <p className="text-red-500 text-xs mt-1">{errors.hours}</p>}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEntry;
