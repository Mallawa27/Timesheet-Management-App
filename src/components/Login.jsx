import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { login } from '../apiService'; //login API endpoint server

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password , setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for login
  const navigate = useNavigate();

  //Form submisstion for login page 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true); //loads the login page when attempt starts

    try {
      const response = await login(email,password); // calls the api service 
      if(response.success) {
        onLogin(response.user.token);
        navigate('/dashboard'); //this line confirms succesfull login and directs to dashboard page
      }else {
        setErrorMessage(response.message); // if unsuccesfull login then displays invalid credentials 
      }
    } catch (err) {
      setErrorMessage(err.message || 'An unexcepted error occured during login.');
      console.error("Login error:" ,err);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gray-200 font-inter">
      <div className="w-full lg:w-1/2 max-w-md p-8 bg-white shadow-lg rounded-lg mx-4 my-8 lg:my-0">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Welcome back</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="name@example.com"
              required
              disabled={loading} // Disable input while loading
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              disabled={loading} // Disable input while loading
            />
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="remember" className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" disabled={loading} />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-700">Remember me</label>
          </div>
          {errorMessage && (
            <p className="text-red-600 text-sm text-center">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out font-semibold"
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Signing in...' : 'Sign in'} {/* Change button text while loading */}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">© 2024 tentwenty</p>
      </div>
      <div className="w-full lg:w-1/2 h-64 lg:h-screen bg-indigo-600 text-white p-8 flex items-center justify-center text-center lg:text-left">
        <div className="max-w-md">
          <h1 className="text-5xl font-extrabold mb-4 leading-tight">ticktock</h1>
          <p className="text-lg leading-relaxed">
            Introducing ticktock, our cutting-edge timesheet web application designed to revolutionize how you manage employee work hours. With ticktock, you can effortlessly track and monitor employee attendance and productivity from anywhere, anytime, using any internet-connected device.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
