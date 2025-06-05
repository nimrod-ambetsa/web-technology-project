import React from 'react';
import { useNavigate } from 'react-router';

export default function HireeDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };
  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-10 text-center">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Welcome, {user?.firstName || 'User'}!</h2>
      <button onClick={handleLogout} className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 font-semibold">Logout</button>
    </div>
  );
} 