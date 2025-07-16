import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'; // Import useNavigate for explicit navigation
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ViewTimesheet from './components/ViewTimesheet';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');

  // Handles successful login
  const handleLogin = (authToken) => {
    setIsLoggedIn(true);
    setToken(authToken);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-inter">
      <Routes>
        {/* Route for the login page */}
        <Route path="/" element={<Login onLogin={handleLogin} />} />

        {/* Dashboard route */}
        {/* If logged in, renders Dashboard; otherwise, redirects to Login */}
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard token={token} /> : <Login onLogin={handleLogin} />}
        />

        {/* ViewTimesheet route  */}
        {/* If logged in, renders ViewTimesheet; otherwise, redirects to Login */}
        <Route
          path="/view-timesheet/:date"
          element={isLoggedIn ? <ViewTimesheet token={token} /> : <Login onLogin={handleLogin} />}
        />
      </Routes>
    </div>
  );
}

export default App;