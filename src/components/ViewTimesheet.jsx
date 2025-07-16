import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEntriesByDate } from '../apiService'; // Import API function

function ViewTimesheet({ token }) {
  const { date } = useParams();
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [menuOpen, setMenuOpen] = useState(true);
  const [error,setError] = useState(null);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    const fetchEntries = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getEntriesByDate(date, token);
        setEntries(data);
      }catch (err) {
        setError(err.message || 'Failed to fetch entries.');
        console.error("Error fetching entries:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
   }, [date,token]);

   const totalHours = entries.reduce((sum,entry) => {
    if (Array.isArray(entry.hours)) {
      return sum + entry.hours.reduce((taskSum,hour) => taskSum + hour, 0);
    }
    return sum + (entry.hours || 0);
   }, 0);

   const weeklyTargetHours = 40;

   const handleMenuToggle =(id) => {
    setMenuOpen(menuOpen === id ? null:id);
   };

   const handleClose= () => navigate('/dashboard');

   //displays the loading state
   if(loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 font-inter">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto flex items-center justify-center">
          <p className="text-gray-700 text-lg">Loading entries..</p>
        </div>
      </div>
    );
   }

   return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 font-inter">
       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">This week's timesheet</h2>
          <button
          onClick={handleClose}
          className="bg-indigo-600 text-white px-5 py-2 rounded-md text-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out">
            
       Close
          </button>
        </div>
        <div className="flex justify-between items-center mb-4">
          <p className="text-base text-gray-600">{date}</p>
          <div className="text-right text-sm text-gray-700">
            {totalHours}/{weeklyTargetHours} hrs
            <span className="ml-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
              {((totalHours / weeklyTargetHours) * 100).toFixed(0)}%
            </span>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-300">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">Date</th>
                <th scope="col" className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">Tasks</th>
                <th scope="col" className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">Hours</th>
                <th scope="col" className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {entries.length > 0 ? (
                entries.map((entry, entryIndex) => (
                  <tr key={entryIndex} className="hover:bg-gray-50">
                    <td className="p-3 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200 align-top">
                      {entry.date}
                    </td>
                    <td className="p-3 text-sm text-gray-900 border-r border-gray-200">
                      {/* Display each task */}
                      {entry.tasks.map((task, taskIndex) => (
                        <div key={taskIndex} className="mb-1">
                          <span>{task}</span>
                        </div>
                      ))}
                      {/* "Add new task" button below all tasks for this date */}
                      <button
                        className="mt-2 text-blue-600 text-xs font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        onClick={() => console.log('Add new task clicked for:', entry.date)}
                      >
                        + Add new task
                      </button>
                    </td>
                    <td className="p-3 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200 align-top">
                      {/* Display each hour entry */}
                      {Array.isArray(entry.hours) ? entry.hours.map((hour, hourIndex) => (
                        <div key={hourIndex} className="mb-1">{hour} hrs {entry.project && `Project name`}</div>
                      )) : `${entry.hours || 0} hrs ${entry.project && `Project name`}`} {/* Handle single hour value */}
                    </td>
                    <td className="p-3 whitespace-nowrap text-sm text-gray-900 align-top">
                      {/* Actions for each task (if multiple tasks, show multiple action buttons) */}
                      {entry.tasks.map((_, taskIndex) => (
                        <div key={taskIndex} className="relative mb-1">
                          <button
                            onClick={() => handleMenuToggle(`${entryIndex}-${taskIndex}`)}
                            className="text-gray-500 hover:text-gray-700 text-lg font-bold focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                          >
                            &#x22EE; {/* Vertical ellipsis character */}
                          </button>
                          {menuOpen === `${entryIndex}-${taskIndex}` && (
                            <div className="absolute right-0 mt-1 w-28 bg-white border border-gray-200 rounded-md shadow-lg z-10 py-1">
                              <button className="block w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-100">Edit</button>
                              <button className="block w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-gray-100">Delete</button>
                            </div>
                          )}
                        </div>
                      ))}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-500">No entries for this date.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewTimesheet;