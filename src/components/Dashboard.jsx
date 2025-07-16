import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddEntry from './AddEntry';
import { getTimesheets, addEntry } from '../apiService'; // Imports API service

function Dashboard ({ token }) {
  const [timesheets, setTimesheets] = useState([]); 
  const [showAddEntry, setShowAddEntry] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Function to fetch timesheets from the API service
  const fetchTimesheets = async () => {
    setLoading(true);
    setError(null);
    try{
      const data = await getTimesheets(token);
      setTimesheets(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch timesheets.');
      console.error("Error fetching timesheets:", err);
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimesheets();
  },[token]);

  const handleView = (date) => navigate(`/view-timesheet/${date}`);

  // Opens the add new entry modal
  const handleCreate = () => setShowAddEntry(true); // Removed unused 'data' parameter

  // Handles the closing button for the add new entry modal
  const handleCloseAddEntryModal = () => setShowAddEntry(false);

  // Handles the adding of a new entry by calling the api service
  const handleAddNewEntry = async (newEntry) => {
    setLoading(true);
    setError(null);
    try {
      // Calls the api service to add new entry
      await addEntry(newEntry,token);
      await fetchTimesheets(); 
      navigate(`/view-timesheet/${newEntry.date}`); // Navigates to the new entry's timesheet view
      setShowAddEntry(false); // Close the modal
    } catch (err) {
      setError(err.message || 'Failed to add new entry.');
      console.error("Error adding new entry:",err);
    } finally {
      setLoading(false);
    }
  };

  if(loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 font-inter">
        <p className="text-gray-700 text-lg">Loading timesheets..</p>
      </div>
    );
  }

  if (error) { // Display error state if there is an error
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 font-inter">
        <p className="text-red-600 text-lg">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-inter">
      <h2 className="text-3xl font-bold mb-6 text-gray-800"> Weekly Timesheets</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Week</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {timesheets.map((sheet,index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sheet.week}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sheet.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    sheet.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                    sheet.status === 'INCOMPLETE' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {sheet.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => handleView(sheet.date)} 
                    className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    View
                  </button>
                  <button
                    onClick={handleCreate}
                    className="text-blue-600 hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Create
                  </button>
                  <button
                    onClick={() => handleUpdate(sheet)}
                    className="text-green-600 hover:text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
      onClick={handleCreate}
      className="mt-8 bg-indigo-600 text-white px-6 py-3 rounded-md shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out"
        >
      Add New Entry
      </button>

      {showAddEntry && <AddEntry onAddEntry={handleAddNewEntry} onClose={handleCloseAddEntryModal} />}
    </div>
  );
}

export default Dashboard;
